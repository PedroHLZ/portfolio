const trigger = document.querySelector(".botao-trailer");
const modal = document.querySelector(".modal");
const close = document.querySelector(".fechar-modal");
const video = document.getElementById("video");
const background = document.querySelector(".fundo-video video");
const backgroundButton = document.getElementById("toggle-background");
const surroundings = [
  document.querySelector(".cabecalho"),
  document.querySelector(".informacoes"),
];
function closeModal() {
  modal.hidden = true;
  modal.classList.remove("aberto");
  video.removeAttribute("src");
  surroundings.forEach((element) => (element.inert = false));
  document.body.style.overflow = "";
  trigger.focus();
}
trigger.addEventListener("click", () => {
  modal.hidden = false;
  modal.classList.add("aberto");
  video.src = video.dataset.src;
  surroundings.forEach((element) => (element.inert = true));
  document.body.style.overflow = "hidden";
  close.focus();
});
close.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("conteudo-modal")
  )
    closeModal();
});
document.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab") {
    if (event.shiftKey && document.activeElement === close) {
      event.preventDefault();
      video.focus();
    } else if (!event.shiftKey && document.activeElement === video) {
      event.preventDefault();
      close.focus();
    }
  }
});
backgroundButton.addEventListener("click", async () => {
  if (background.paused) {
    try {
      await background.play();
      backgroundButton.textContent = "Pausar fundo";
    } catch {
      backgroundButton.textContent = "Tentar reproduzir fundo";
    }
  } else {
    background.pause();
    backgroundButton.textContent = "Reproduzir fundo";
  }
});
