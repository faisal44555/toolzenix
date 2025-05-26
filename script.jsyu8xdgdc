
const toggleBtn = document.querySelector(".dark-mode-toggle");
toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("searchInput")?.addEventListener("input", function () {
  const search = this.value.toLowerCase();
  const boxes = document.querySelectorAll(".tool-box");
  boxes.forEach(box => {
    const title = box.textContent.toLowerCase();
    box.style.display = title.includes(search) ? "block" : "none";
  });
});
