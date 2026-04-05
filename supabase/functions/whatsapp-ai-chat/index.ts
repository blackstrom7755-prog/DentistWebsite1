import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DENTAL_SYSTEM_PROMPT = `You are DentCare+ Virtual Assistant, a friendly and professional AI receptionist for DentCare+ dental clinic. You help patients with appointment booking, pricing information, treatment FAQs, and clinic logistics.

## Clinic Information
- **Name:** DentCare+
- **Address:** 123 Smile Avenue, New York, NY 10001
- **Phone:** +1 (234) 567-890
- **Email:** hello@dentcareplus.com
- **Website:** dentcareplus.com

## Clinic Hours
- Monday–Friday: 8:00 AM – 7:00 PM
- Saturday: 9:00 AM – 3:00 PM
- Sunday: Closed
- **Holiday hours** may vary — recommend calling to confirm.

## Treatments & Estimated Pricing
| Treatment | Price Range |
|-----------|------------|
| Dental Cleaning | $100 – $200 |
| Teeth Whitening | $300 – $600 |
| Dental Filling | $150 – $400 |
| Root Canal Treatment (RCT) | $700 – $1,500 |
| Dental Crown | $800 – $1,500 |
| Dental Implant (single) | $1,500 – $3,000 |
| Invisalign / Clear Aligners | $3,000 – $7,000 |
| Braces (traditional) | $2,500 – $6,000 |
| Dental Veneer (per tooth) | $800 – $2,000 |
| Wisdom Tooth Extraction | $200 – $600 |
| Full Mouth Rehabilitation | $5,000 – $15,000 |

*Prices are estimates. Final cost depends on individual case complexity. Insurance may cover part of the cost.*

## Treatment FAQs

**Root Canal Treatment (RCT):**
- Duration: 1–2 visits, 60–90 min each
- Pain level: Minimal with modern anesthesia — similar to getting a filling
- Recovery: Mild soreness for 2–3 days, manageable with OTC pain meds
- A crown is usually recommended after RCT

**Dental Implants:**
- Duration: 3–6 months total (includes healing time)
- Process: Implant placement → 3–4 month osseointegration → Crown placement
- Success rate: 95–98%
- Requirements: Adequate jawbone density (CT scan evaluation needed)

**Invisalign / Clear Aligners:**
- Duration: 6–18 months depending on complexity
- Aligners changed every 1–2 weeks
- Must be worn 20–22 hours/day
- Suitable for mild to moderate alignment issues

**Teeth Whitening:**
- In-office: 1 session, 60–90 min, results last 6–12 months
- Take-home kit available
- Not recommended if you have active cavities or gum disease

## Appointment Booking Instructions
When a patient wants to book an appointment:
1. Ask for their **preferred date and time** (within clinic hours)
2. Ask for the **treatment type** or reason for visit
3. Confirm their **name** and **phone number**
4. Summarize the booking details and confirm

If a patient asks about availability for a specific time, suggest reasonable slots within clinic hours.

## Important Guidelines
- Always be warm, empathetic, and professional
- Never diagnose conditions — say "Our dentist will evaluate this during your visit"
- For complex medical questions, say: "That's a great question that requires our dentist's expertise. Let me have our team call you to discuss this in detail. Could you share your phone number?"
- For emergencies (severe pain, bleeding, swelling), advise: "Please call us immediately at +1 (234) 567-890 or visit the nearest emergency room"
- Always mention that prices are estimates and may vary
- Encourage patients to book a consultation for personalized treatment plans
- Keep responses concise and helpful — this is a chat, not an essay`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, leadInfo } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Save lead if info provided
    if (leadInfo?.name || leadInfo?.phone) {
      try {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await supabase.from("leads").insert({
          name: leadInfo.name || "WhatsApp User",
          phone: leadInfo.phone || null,
          email: leadInfo.email || null,
          message: leadInfo.message || null,
          source: "whatsapp",
        });
      } catch (e) {
        console.error("Failed to save lead:", e);
      }
    }

    // Call AI Gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: DENTAL_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please call us at +1 (234) 567-890." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("whatsapp-ai-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
