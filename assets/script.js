const tools = [
  { name: "Image Compressor", category: "image", link: "tools/image-compressor.html" },
  { name: "Audio to MP3", category: "audio", link: "tools/audio-to-mp3.html" },
];

function displayTools(filteredTools) {
  const container = document.getElementById("toolsGrid");
  container.innerHTML = '';
  filteredTools.forEach(tool => {
    container.innerHTML += `
      <div class="tool-card">
        <h3>${tool.name}</h3>
        <a href="${tool.link}">Open Tool</a>
      </div>
    `;
  });
}

function openCategory(category) {
  const filtered = tools.filter(t => t.category === category);
  displayTools(filtered);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = tools.filter(t => t.name.toLowerCase().includes(keyword));
  displayTools(filtered);
});

displayTools(tools);
