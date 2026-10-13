const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) return json({ error: "RESEND_API_KEY mancante" }, 500);

    const b = await req.json();
    const nome = String(b.nome ?? "").trim().slice(0, 100);
    const cognome = String(b.cognome ?? "").trim().slice(0, 100);
    const email = String(b.email ?? "").trim().slice(0, 255);
    const ordine = String(b.ordine ?? "").trim().slice(0, 100);
    const messaggio = String(b.messaggio ?? "").trim().slice(0, 3000);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Email non valida" }, 400);
    if (!messaggio) return json({ error: "Messaggio obbligatorio" }, 400);

    const html = `
      <h2>Nuovo messaggio dal Servizio Clienti</h2>
      <p><strong>Nome:</strong> ${esc(nome) || "-"}</p>
      <p><strong>Cognome:</strong> ${esc(cognome) || "-"}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Numero d'ordine:</strong> ${esc(ordine) || "-"}</p>
      <p><strong>Richiesta:</strong></p>
      <p style="white-space:pre-wrap">${esc(messaggio)}</p>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Andrea Del Guasta <info@andreadelguasta.com>",
        to: ["info@andreadelguasta.com"],
        reply_to: email,
        subject: `Richiesta clienti da ${[nome, cognome].filter(Boolean).join(" ") || email}`,
        html,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Errore Resend:", JSON.stringify(data));
      return json({ error: "Invio non riuscito" }, 502);
    }
    console.log("Email contatto inviata a info@andreadelguasta.com");
    return json({ ok: true });
  } catch (e) {
    console.error("Errore:", (e as Error).message);
    return json({ error: "Richiesta non valida" }, 400);
  }
});
