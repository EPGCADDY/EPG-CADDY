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

  // POST calcula una ronda completa.
  if (req.method === "POST") {
    const { scores } = req.body || {};

    if (!Array.isArray(scores) || scores.length !== 18) {
      return res.status(400).json({
        ok: false,
        error: "scores debe contener exactamente 18 resultados."
      });
    }

    const validScores = scores.every(
      score => Number.isInteger(score) && score > 0
    );

    if (!validScores) {
      return res.status(400).json({
        ok: false,
        error: "Cada score debe ser un número entero mayor que cero."
      });
    }

    const holes = course.holes.map((hole, index) => {
      const strokes = scores[index];
      const toPar = strokes - hole.par;

      return {
        ...hole,
        strokes,
        toPar
      };
    });

    const front9 = holes
      .slice(0, 9)
      .reduce((total, hole) => total + hole.strokes, 0);

    const back9 = holes
      .slice(9, 18)
      .reduce((total, hole) => total + hole.strokes, 0);

    const total = front9 + back9;
    const toPar = total - course.par;

    return res.status(200).json({
      ok: true,
      engine: "EPG Caddy Scoring Engine",
      version: "1.1",
      course: {
        name: course.name,
        tees: course.tees,
        par: course.par
      },
      round: {
        holes,
        front9,
        back9,
        total,
        toPar
      }
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({
    ok: false,
    error: "Método no permitido."
  });
}
