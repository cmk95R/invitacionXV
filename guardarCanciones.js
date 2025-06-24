
document.getElementById("songForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("songTitle").value.trim();
    const artist = document.getElementById("songArtist").value.trim();
    const message = document.getElementById("songMessage").value.trim();

    if (!title || !artist) {
        alert("¡Faltan datos! Canción y Artista son obligatorios.");
        return;
    }

    const button = e.target.querySelector("button");
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbz9mKwt9jAJk8szbFquv2rv-tla_LI6DIJvtps8assnJIX7agq4Lk12ZS00EW8j0X6b/exec", {
            method: "POST",
            body: JSON.stringify({ title, artist, message }),
            headers: { "Content-Type": "application/json" },
            mode: "no-cors", // Si aún es necesario
        });

        // Asume éxito si no hay error de red (por el no-cors)
        addSongToUI(title, artist);
        e.target.reset();
        showSuccessModal(); // Muestra el modal de éxito

    } catch (error) {
        alert("Error de conexión. Intenta de nuevo más tarde.");
    } finally {
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-music mr-2"></i> Añadir Canción';
    }
});

function addSongToUI(title, artist) {
    const songList = document.getElementById("songList");
    const songItem = document.createElement("div");
    songItem.className = "song-item bg-white bg-opacity-30 rounded-lg p-3 flex items-center glow-on-hover";
    songItem.innerHTML = `
    <div class="bg-white rounded-full p-2 mr-3">
      <i class="fas fa-music text-purple-800"></i>
    </div>
    <div>
      <h4 class="font-semibold">${title}</h4>
      <p class="text-sm">${artist}</p>
    </div>
  `;
    songList.prepend(songItem);
}
