// supabase/functions/send-whatsapp-confirmation/index.ts
// Deno runtime — Supabase Edge Function
// Sends a WhatsApp appointment confirmation via Twilio Sandbox

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ─── CORS — allow calls from the React admin dashboard ────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─── Twilio Sandbox sender (WhatsApp Sandbox number) ─────────────────────────
const TWILIO_FROM = "whatsapp:+14155238886";

// ─── Helper: sanitize & format Indian phone numbers to E.164 + WA prefix ──────
function formatToWhatsApp(raw: string): string {
  // Strip every non-digit character
  let digits = raw.replace(/\D/g, "");

  // Handle leading 0 (local trunk prefix): 0XXXXXXXXXX → 91XXXXXXXXXX
  if (digits.startsWith("0")) {
    digits = "91" + digits.slice(1);
  }

  // 10-digit number with no country code → prepend +91
  if (digits.length === 10) {
    digits = "91" + digits;
  }

  return `whatsapp:+${digits}`;
}

// ─── Helper: format date string (YYYY-MM-DD) to "21 April 2025" ───────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// ─── Main handler ─────────────────────────────────────────────────────────────
serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── 1. Parse & validate request body ──────────────────────────────────────
    const body = await req.json();

    const { patientName, phoneNumber, appointmentDate, appointmentTime } =
      body as {
        patientName?: string;
        phoneNumber?: string;
        appointmentDate?: string;
        appointmentTime?: string;
      };

    if (!patientName || !phoneNumber || !appointmentDate) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Missing required fields: patientName, phoneNumber, appointmentDate",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ── 2. Read Twilio credentials from Supabase secrets ──────────────────────
    const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
    const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      console.error(
        "Missing Twilio environment variables (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)."
      );
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server misconfiguration: Twilio credentials are not set.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ── 3. Build recipient number & message ───────────────────────────────────
    const toPhone = formatToWhatsApp(phoneNumber);
    const dateLabel = formatDate(appointmentDate);
    const timeLabel = appointmentTime ?? "your scheduled time";

    // ✅ Professional confirmation message (exact format requested)
    const messageBody =
      `Hi ${patientName}, your appointment at DentCare+ Ahmedabad is CONFIRMED for ${dateLabel} at ${timeLabel}. ` +
      `Please arrive 10 minutes early. For any changes, call us at +91 91234 56789. See you soon! 😊`;

    // ── 4. POST to Twilio Messages API ────────────────────────────────────────
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    const formData = new URLSearchParams();
    formData.set("From", TWILIO_FROM);
    formData.set("To", toPhone);
    formData.set("Body", messageBody);

    const basicAuth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

    console.log(`Sending WhatsApp to ${toPhone} for patient: ${patientName}`);

    const twilioRes = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // ── 5. Handle Twilio response ─────────────────────────────────────────────
    const twilioData = await twilioRes.json();

    if (!twilioRes.ok) {
      console.error("Twilio API error:", JSON.stringify(twilioData));
      return new Response(
        JSON.stringify({
          success: false,
          error: twilioData?.message ?? "Twilio message delivery failed.",
          code: twilioData?.code,        // Twilio error code for debugging
          status: twilioData?.status,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("✅ WhatsApp message sent. SID:", twilioData.sid);

    return new Response(
      JSON.stringify({
        success: true,
        message_sid: twilioData.sid,
        to: toPhone,
        status: twilioData.status,     // e.g. "queued"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("send-whatsapp-confirmation unhandled error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Unknown server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
