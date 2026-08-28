import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error("RESEND_API_KEY non è configurata nei Secrets di Supabase.");
    }

    const resend = new Resend(apiKey);
    const { subscriberEmail } = await req.json();

    const data = await resend.emails.send({
      from: "Andrea Del Guasta <onboarding@resend.dev>",
      to: ["complementiadg@gmail.com"],
      subject: "Nuovo iscritto alla Newsletter!",
      html: `<p>Un nuovo utente si è iscritto: <strong>${subscriberEmail}</strong></p>`,
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Errore Edge Function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
