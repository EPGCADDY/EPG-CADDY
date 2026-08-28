export default async function handler(req, res) {
  const course = {
    name: "El Pulté",
    tees: "Blancas",
    par: 72,
    holes: [
      { hole: 1, par: 4, hcp: 9 },
      { hole: 2, par: 4, hcp: 5 },
      { hole: 3, par: 4, hcp: 7 },
      { hole: 4, par: 4, hcp: 11 },
      { hole: 5, par: 3, hcp: 17 },
      { hole: 6, par: 5, hcp: 3 },
      { hole: 7, par: 5, hcp: 1 },
      { hole: 8, par: 3, hcp: 15 },
      { hole: 9, par: 4, hcp: 13 },
      { hole: 10, par: 3, hcp: 18 },
      { hole: 11, par: 5, hcp: 2 },
      { hole: 12, par: 4, hcp: 8 },
      { hole: 13, par: 4, hcp: 16 },
      { hole: 14, par: 5, hcp: 4 },
      { hole: 15, par: 4, hcp: 6 },
      { hole: 16, par: 4, hcp: 12 },
      { hole: 17, par: 3, hcp: 10 },
      { hole: 18, par: 4, hcp: 14 }
    ]
  };

  // GET mantiene disponible la información del campo.
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      engine: "EPG Caddy Scoring Engine",
      version: "1.1",
      course
    });
  }

  // El escritor/calculador oficial vive únicamente en el cliente V354.
  // Esta ruta histórica sólo conserva lectura del catálogo para index.html.
  if (req.method === "POST") {
    return res.status(410).json({ ok: false, error: "LEGACY_SCORE_WRITER_RETIRED", replacement: "/index-grupal.html" });
  }

  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({
    ok: false,
    error: "Método no permitido."
  });
}
