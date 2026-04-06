import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

// Helper for CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS Preflight Responses
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable")
    }

    const payload = await req.json()
    const { type, old_record, record } = payload

    // We only process updates
    if (type !== 'UPDATE') {
      return new Response(JSON.stringify({ message: "Not an UPDATE event" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      })
    }

    const oldStatus = old_record?.status?.toLowerCase()
    const newStatus = record?.status?.toLowerCase()
    const { email, patient_name, service_type, appointment_date, appointment_time } = record

    // Check if the status transitioned exactly from 'pending' to either 'confirmed' or 'cancelled'
    if (oldStatus === 'pending' && (newStatus === 'confirmed' || newStatus === 'cancelled')) {
      
      if (!email) {
        return new Response(JSON.stringify({ error: "Missing email address in record" }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 400,
        })
      }

      let subject = ""
      let htmlBody = ""

      if (newStatus === 'confirmed') {
        subject = 'Appointment Confirmed!'
        htmlBody = `<p>Hello ${patient_name},</p><p>Your visit for <strong>${service_type || 'General'}</strong> is confirmed for <strong>${appointment_date}</strong> at <strong>${appointment_time}</strong>.</p>`
      } else if (newStatus === 'cancelled') {
        subject = 'Update: Appointment Cancelled'
        htmlBody = `<p>Hello ${patient_name},</p><p>Unfortunately, we have had to cancel your appointment. Please contact the clinic to reschedule.</p>`
      }

      // Execute external Resend API call
      const resendReq = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Clinic <onboarding@resend.dev>",
          to: [email],
          subject: subject,
          html: htmlBody,
        }),
      })

      const data = await resendReq.json()
      
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      })
    }

    // Unrelated status update
    return new Response(JSON.stringify({ message: "Status transition ignored (does not trigger email)" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
    })

  } catch (error: any) {
    console.error("Edge Function Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 400,
    })
  }
})
