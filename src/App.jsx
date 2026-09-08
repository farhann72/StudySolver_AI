import { useState } from "react";

function App() {
  const [problem, setProblem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!problem.trim()) {
      alert("Ceritakan dulu masalah belajar kamu!");
      return;
    }

    alert("Oke! AI akan menganalisis masalah belajar kamu.");
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
            placeholder="Contoh: Saya kelas 11 dan besok ujian fisika. Saya masih belum paham hukum Newton dan cuma punya waktu 2 jam untuk belajar..."
          />

          <button type="submit">
            🔍 Analisis Masalah Belajar
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
