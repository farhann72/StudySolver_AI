export async function onRequestPost({ request, env }) {
  try {
    const { problem } = await request.json();

    if (!problem || !problem.trim()) {
      return new Response(
        JSON.stringify({
          error: "Masalah belajar belum diisi."
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const response = await fetch(
      "https://ai-gateway.edgeone.link/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.MAKERS_MODELS_KEY}`
        },
        body: JSON.stringify({
          model: "@makers/deepseek-v4-flash",
          messages: [
            {
              role: "system",
              content:
                "Kamu adalah StudySolver AI, tutor belajar yang membantu siswa memahami masalah belajar mereka. Analisis masalah dengan bahasa Indonesia yang sederhana dan berikan solusi yang praktis."
            },
            {
              role: "user",
              content: `Analisis masalah belajar berikut:

${problem}

Berikan:
1. Mata pelajaran
2. Topik yang kemungkinan belum dipahami
3. Tingkat kesulitan
4. Kemungkinan penyebab kesulitan
5. Rencana belajar yang disarankan
6. Langkah pertama yang harus dilakukan siswa`
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "Gagal menghubungi AI.",
          detail: data
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const result = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({
        result
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan pada server.",
        detail: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
