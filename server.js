const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/m3u", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL não fornecida." });
  }

  try {
    const response = await axios.get(url);
    const playlist = parseM3U(response.data);
    res.json({ playlist });
  } catch (error) {
    console.error("Erro ao buscar a URL M3U:", error);
    res.status(500).json({ error: "Erro ao carregar a playlist." });
  }
});

function parseM3U(content) {
  const lines = content.split("\n");
  return lines.filter((line) => line.trim() && !line.startsWith("#"));
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
