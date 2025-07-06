const toggleBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebarMenu");
const closeBtn = document.getElementById("closeMenu");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
    sidebar.classList.remove("show");
  }
});
