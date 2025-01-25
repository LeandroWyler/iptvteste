document.getElementById("loadBtn").addEventListener("click", loadPlaylist);

async function loadPlaylist() {
  const url = document.getElementById("m3uUrl").value;

  if (!url) {
    alert("Por favor, insira o link da lista M3U!");
    return;
  }

  try {
    const response = await fetch(`/api/m3u?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error(`Erro ao acessar a URL: ${response.status}`);
    }

    const m3uContent = await response.json();
    displayPlaylist(m3uContent.playlist);
  } catch (error) {
    console.error("Erro ao carregar a playlist:", error);
    alert("Erro ao carregar a playlist. Verifique o link e tente novamente.");
  }
}

function displayPlaylist(playlist) {
  const playlistContainer = document.getElementById("playlistItems");
  playlistContainer.innerHTML = "";

  playlist.forEach((url, index) => {
    const li = document.createElement("li");
    li.textContent = `Canal ${index + 1}`;
    li.dataset.url = url;

    li.addEventListener("click", () => playStream(url));

    playlistContainer.appendChild(li);
  });
}

function playStream(url) {
  const videoPlayer = document.getElementById("videoPlayer");
  videoPlayer.src = url;
  videoPlayer.play();
}
