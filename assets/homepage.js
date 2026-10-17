document.documentElement.classList.add("js-enabled");
const printButton = document.querySelector("[data-print]");
printButton.hidden = false;
printButton.addEventListener("click", () => window.print());
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.getElementById(menuToggle.getAttribute("aria-controls"));
menuToggle.hidden = false;
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  navigation.classList.toggle("is-open", expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});
navigation.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    menuToggle.focus();
  }
});
const links = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
let scheduled = false;
function updateNavigation() {
  const offset = document.querySelector(".masthead").getBoundingClientRect().height + 40;
  const current = sections.filter((section) => section.getBoundingClientRect().top <= offset).at(-1) ?? sections[0];
  for (const link of links) {
    if (link.getAttribute("href") === `#${current.id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  scheduled = false;
}
window.addEventListener("scroll", () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
updateNavigation();

const figureDialog = document.querySelector("[data-figure-dialog]");
const figureImage = figureDialog.querySelector("[data-figure-image]");
const figureCaption = figureDialog.querySelector("[data-figure-caption]");
let figureTrigger;
document.querySelectorAll("[data-figure]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    figureImage.src = image.src;
    figureImage.alt = image.alt;
    figureCaption.textContent = image.alt;
    figureTrigger = button;
    figureDialog.showModal();
    document.body.classList.add("figure-open");
  });
});
figureDialog.querySelector("[data-figure-close]").addEventListener("click", () => figureDialog.close());
figureDialog.addEventListener("click", (event) => {
  if (event.target === figureDialog) figureDialog.close();
});
figureDialog.addEventListener("close", () => {
  document.body.classList.remove("figure-open");
  figureTrigger.focus({ preventScroll: true });
});
