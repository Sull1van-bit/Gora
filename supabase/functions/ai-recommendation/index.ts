const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { weather, plots, actions } = body;

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in Edge Function secrets.");
    }

    const prompt = `
Anda adalah AI asisten pertanian pintar untuk aplikasi "Gora".
Analisis data berikut:
Cuaca Hari Ini: ${JSON.stringify(weather)}
Tanaman (Plots): ${JSON.stringify(plots)}
Tugas Hari Ini: ${JSON.stringify(actions)}

Berdasarkan data di atas, berikan saran singkat untuk pengguna tentang apa yang perlu diperhatikan hari ini (misal: "Hujan turun, tunda penyiraman").
Dan berikan rekomendasi maksimal 3 tugas baru (suggested_tasks) yang harus dilakukan pengguna (jika perlu). 
Format JSON strict:
{
  "message": "string (pesan saran harian)",
  "suggested_tasks": [
    {
      "title": "string (nama tugas)",
      "description": "string (deskripsi tugas singkat)",
      "priority": "low | medium | high",
      "plot_id": "string (id plot yang relevan, ambil dari data Tanaman, atau kosongkan jika umum)",
      "plot_name": "string (nama plot)",
      "komoditas_icon": "string (ikon komoditas dari plot)",
      "activity_type": "Watering | Fertilizing | Observation | Issue Handling | General Task"
    }
  ]
}
Hanya kembalikan JSON, tanpa markdown formatting.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error("Failed to fetch from AI provider");
    }

    const aiData = await response.json();
    const textResponse = aiData.candidates[0].content.parts[0].text;
    const parsedResponse = JSON.parse(textResponse);

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in ai-recommendation:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
