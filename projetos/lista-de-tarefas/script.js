const key = "pedro-portfolio-tasks-v1";
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const notice = document.getElementById("storage-status");
let tasks = [];
let filter = "all";
try {
  const saved = JSON.parse(localStorage.getItem(key) || "[]");
  if (!Array.isArray(saved)) throw new Error("Formato inválido");
  const ids = new Set();
  tasks = saved.filter((task) => {
    if (
      !task ||
      typeof task.id !== "string" ||
      ids.has(task.id) ||
      typeof task.text !== "string" ||
      !task.text.trim() ||
      task.text.length > 160 ||
      typeof task.done !== "boolean"
    )
      return false;
    ids.add(task.id);
    return true;
  });
} catch {
  notice.textContent =
    "Não foi possível recuperar as tarefas. Você pode usar a lista nesta sessão.";
}
function save() {
  try {
    localStorage.setItem(key, JSON.stringify(tasks));
    notice.textContent = "";
  } catch {
    notice.textContent =
      "O navegador não permitiu salvar. As alterações ficam disponíveis apenas nesta sessão.";
  }
}
function render() {
  list.replaceChildren();
  const visible = tasks.filter(
    (task) => filter === "all" || (filter === "done" ? task.done : !task.done),
  );
  visible.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.done ? "task done" : "task";
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    const text = document.createElement("span");
    text.textContent = task.text;
    label.append(checkbox, text);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-task";
    remove.textContent = "Excluir";
    remove.setAttribute("aria-label", "Excluir tarefa: " + task.text);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      save();
      render();
      const index = tasks
        .filter(
          (t) => filter === "all" || (filter === "done" ? t.done : !t.done),
        )
        .findIndex((t) => t.id === task.id);
      (
        list.children[index]?.querySelector("input") ||
        document.querySelector("[data-filter][aria-pressed=true]")
      ).focus();
      document.getElementById("task-status").textContent = task.done
        ? "Tarefa concluída."
        : "Tarefa marcada como pendente.";
    });
    remove.addEventListener("click", () => {
      const index = Array.from(list.children).indexOf(item);
      tasks = tasks.filter((t) => t.id !== task.id);
      save();
      render();
      (
        list.children[Math.min(index, list.children.length - 1)]?.querySelector(
          "button",
        ) || input
      ).focus();
      document.getElementById("task-status").textContent = "Tarefa excluída.";
    });
    item.append(label, remove);
    list.append(item);
  });
  const pending = tasks.filter((task) => !task.done).length;
  document.getElementById("task-count").textContent =
    pending + (pending === 1 ? " pendente" : " pendentes");
  document.getElementById("empty-state").textContent = visible.length
    ? ""
    : tasks.length
      ? "Nenhuma tarefa neste filtro."
      : "Sua lista começa aqui. Adicione sua primeira tarefa acima.";
  document.getElementById("empty-state").hidden = visible.length > 0;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  input.setCustomValidity(text ? "" : "Digite uma tarefa, não apenas espaços.");
  if (!form.reportValidity()) return;
  tasks.push({ id: crypto.randomUUID(), text, done: false });
  filter = "all";
  updateFilters();
  save();
  render();
  form.reset();
  input.focus();
  document.getElementById("task-status").textContent = "Tarefa adicionada.";
});
input.addEventListener("input", () => input.setCustomValidity(""));
function updateFilters() {
  document
    .querySelectorAll("[data-filter]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === filter),
      ),
    );
}
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    updateFilters();
    render();
  }),
);
render();
