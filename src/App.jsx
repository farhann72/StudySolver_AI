import { useState } from "react";

function App() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!problem.trim()) {
      alert("Ceritakan dulu masalah belajar kamu!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menganalisis.");
      }

      setResult(data.result);
    } catch (error) {
      setResult("❌ Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="hero">
        <h1>StudySolver AI</h1>

        <p>
          Punya masalah belajar? Biar AI bantu cari jalan keluarnya.
        </p>
      </section>

      <section className="card">
        <h2>🎯 Apa yang sedang kamu kesulitan pelajari?</h2>

        <p>
          Ceritakan materi, tugas, atau masalah belajar yang sedang kamu
          hadapi.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Contoh: Saya belum paham hukum Newton dan besok ada ujian..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "🤖 AI sedang menganalisis..." : "🔍 Analisis Masalah Belajar"}
          </button>
        </form>
      </section>

      {result && (
        <section className="card">
          <h2>🧠 Hasil Analisis AI</h2>

          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.7" }}>
            {result}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
