const form = document.getElementById("calcForm");
const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
function splitBill(value, percent, people) {
  if (
    !Number.isFinite(value) ||
    value < 0.01 ||
    value > 1000000 ||
    ![0, 5, 10, 15, 20].includes(percent) ||
    !Number.isInteger(people) ||
    people < 1 ||
    people > 1000
  )
    throw new Error("Valores inválidos");
  const bill = Math.round(value * 100);
  const tip = Math.round((bill * percent) / 100);
  const total = bill + tip;
  return {
    tip,
    total,
    base: Math.floor(total / people),
    remainder: total % people,
  };
}
function clearResult() {
  ["pessoatip", "tip", "fulltip"].forEach(
    (id) => (document.getElementById(id).textContent = "R$ —"),
  );
  document.getElementById("rounding").textContent =
    "Preencha os valores e calcule novamente.";
}
form.addEventListener("input", clearResult);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  try {
    const people = Number(document.getElementById("people").value);
    const result = splitBill(
      Number(document.getElementById("conta").value),
      Number(document.getElementById("serviceQuali").value),
      people,
    );
    document.getElementById("tip").textContent = money.format(
      result.tip / people / 100,
    );
    document.getElementById("pessoatip").textContent = money.format(
      result.total / people / 100,
    );
    document.getElementById("fulltip").textContent = money.format(
      result.total / 100,
    );
    document.getElementById("rounding").textContent = result.remainder
      ? "Para fechar a conta: " +
        result.remainder +
        " pessoa(s) pagam " +
        money.format((result.base + 1) / 100) +
        " e " +
        (people - result.remainder) +
        " pagam " +
        money.format(result.base / 100) +
        "."
      : "Divisão exata: todos pagam o mesmo valor.";
  } catch {
    clearResult();
    document.getElementById("rounding").textContent =
      "Confira o valor da conta e informe uma quantidade inteira de pessoas entre 1 e 1.000.";
  }
});
