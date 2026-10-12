document.documentElement.classList.add("js");
const menu = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");
menu.hidden = false;
function closeMenu() {
  navigation.classList.remove("is-open");
  menu.setAttribute("aria-expanded", "false");
}
menu.addEventListener("click", () => {
  const open = navigation.classList.toggle("is-open");
  menu.setAttribute("aria-expanded", String(open));
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
const themes = document.querySelectorAll("[data-theme]");
function setTheme(theme) {
  if (!["lime", "blue", "coral"].includes(theme)) return;
  document.documentElement.dataset.theme = theme;
  themes.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.theme === theme)),
  );
}
try {
  setTheme(localStorage.getItem("portfolio-theme"));
} catch {}
themes.forEach((button) =>
  button.addEventListener("click", () => {
    setTheme(button.dataset.theme);
    try {
      localStorage.setItem("portfolio-theme", button.dataset.theme);
    } catch {}
  }),
);
const contactForm = document.getElementById("myForm");
const status = document.getElementById("form-status");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (
    !contactForm.reportValidity() ||
    contactForm.getAttribute("aria-busy") === "true"
  )
    return;
  const button = contactForm.querySelector("[type=submit]");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  button.disabled = true;
  contactForm.setAttribute("aria-busy", "true");
  status.textContent = "Enviando sua mensagem…";
  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/playlucas.hlz@gmail.com",
      {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      },
    );
    const data = await response.json();
    if (!response.ok || ![true, "true"].includes(data.success))
      throw new Error("Envio não confirmado");
    status.textContent =
      "Mensagem recebida pelo serviço de envio. Obrigado pelo contato!";
    contactForm.reset();
  } catch {
    status.textContent =
      "Não foi possível confirmar o envio. Sua mensagem continua aqui. Tente novamente ou fale comigo pelo e-mail ou LinkedIn.";
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    contactForm.removeAttribute("aria-busy");
  }
});
