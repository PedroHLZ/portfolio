// Forma procedural adaptada da referência fornecida por Pedro.
// Projeção 3D em Canvas 2D, sem CDN ou dependência da rede.
(() => {
  const canvas = document.getElementById("particle-scene");
  const toggle = document.getElementById("particle-toggle");
  const ctx = canvas?.getContext("2d", { alpha: true });
  if (!ctx) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 680px)");
  let accent =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#d4ed8a";
  let nodes = [],
    edges = [],
    projected = [];
  let width = 0,
    height = 0,
    frame = 0,
    previous = 0,
    time = 0;
  let target = 0,
    progress = 0,
    paused = false,
    pointerX = 0,
    pointerY = 0;
  let driftX = 0,
    driftY = 0,
    seed = 137;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  function createBrain() {
    seed = 137;
    nodes = [];
    edges = [];
    const count = mobile.matches ? 650 : 1600;
    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius =
        14 +
        (random() - 0.5) * 2.5 +
        Math.sin(theta * 6) * Math.cos(phi * 6) * 2.2 +
        Math.sin(phi) * Math.cos(theta) * 2.8;
      nodes.push({
        x:
          radius * Math.sin(phi) * Math.cos(theta) +
          (random() > 0.5 ? 1.8 : -1.8),
        y: radius * Math.sin(phi) * Math.sin(theta) * 0.82,
        z: radius * Math.cos(phi) * 1.15,
        size: 0.6 + random() * 0.9,
      });
    }
    // Calculadas uma vez; nenhuma busca de vizinhos a cada frame.
    const step = mobile.matches ? 1 : 2;
    const reach = mobile.matches ? 5 : 4.2;
    for (let i = 0; i < count; i += step) {
      const neighbors = [];
      for (let j = i + step; j < count; j += step) {
        const a = nodes[i],
          b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (distance < reach) neighbors.push([j, distance]);
      }
      neighbors.sort((a, b) => a[1] - b[1]);
      for (const [j, distance] of neighbors.slice(0, 4))
        edges.push([i, j, 1 - distance / reach]);
    }
    projected = nodes.map(() => ({ x: 0, y: 0, depth: 0 }));
  }
  function readScroll() {
    target = Math.max(
      0,
      Math.min(
        1,
        scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight),
      ),
    );
  }
  function resize() {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    readScroll();
    draw();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const p = progress;
    const yaw = p * Math.PI * 2.2 + time * 0.07 + driftX * 0.15;
    const pitch = -0.22 + Math.sin(p * Math.PI * 2) * 0.45 + driftY * 0.1;
    const cy = Math.cos(yaw),
      sy = Math.sin(yaw),
      cx = Math.cos(pitch),
      sx = Math.sin(pitch);
    const centerX =
      width * (mobile.matches ? 0.58 : 0.7 - Math.sin(p * Math.PI * 2) * 0.23);
    const centerY = height * (0.52 + Math.sin(p * Math.PI * 3) * 0.09);
    const scale = Math.min(
      width * (mobile.matches ? 0.031 : 0.022),
      height * 0.033,
    );
    const expansion = 1 + Math.sin(p * Math.PI) * 0.28;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i],
        out = projected[i];
      const x = n.x * cy + n.z * sy,
        z = -n.x * sy + n.z * cy;
      const y = n.y * cx - z * sx,
        depth = n.y * sx + z * cx;
      const perspective = 55 / (55 - depth);
      const pulse = 1 + Math.sin(time * 0.8 + n.x * 0.1) * 0.014;
      out.x = centerX + x * scale * perspective * expansion * pulse;
      out.y = centerY + y * scale * perspective * expansion * pulse;
      out.depth = Math.max(0.15, Math.min(1, (depth + 22) / 44));
    }
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = mobile.matches ? 0.75 : 0.9;
    ctx.strokeStyle = accent;
    for (const [i, j, strength] of edges) {
      const a = projected[i],
        b = projected[j];
      ctx.globalAlpha =
        (0.12 + strength * 0.3) * (0.45 + (a.depth + b.depth) * 0.275);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.fillStyle = accent;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i],
        out = projected[i],
        radius = n.size * (0.5 + out.depth);
      ctx.globalAlpha = 0.2 + out.depth * 0.75;
      ctx.beginPath();
      ctx.arc(out.x, out.y, radius, 0, Math.PI * 2);
      ctx.fill();
      if (i % 9 === 0) {
        ctx.globalAlpha = 0.055;
        ctx.beginPath();
        ctx.arc(out.x, out.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    canvas.dataset.accent = accent;
    canvas.dataset.scrollProgress = p.toFixed(3);
  }
  function animate(stamp) {
    frame = 0;
    if (paused || reduced.matches || document.hidden) return;
    if (stamp - previous >= 1000 / 30) {
      const delta = Math.min((stamp - previous) / 1000, 0.06);
      previous = stamp;
      time += delta;
      progress += (target - progress) * 0.085;
      driftX += (pointerX - driftX) * 0.04;
      driftY += (pointerY - driftY) * 0.04;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }
  function syncMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    const still = paused || reduced.matches;
    toggle.textContent = reduced.matches
      ? "Movimento reduzido"
      : paused
        ? "Ativar efeito"
        : "Pausar efeito";
    toggle.disabled = reduced.matches;
    toggle.setAttribute("aria-pressed", String(still));
    canvas.dataset.motion = still ? "paused" : "active";
    if (!document.hidden && !still) {
      previous = performance.now();
      frame = requestAnimationFrame(animate);
    } else if (!document.hidden) draw();
  }
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    paused = !paused;
    syncMotion();
  });
  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" || paused || reduced.matches) return;
      pointerX = (event.clientX / width) * 2 - 1;
      pointerY = (event.clientY / height) * 2 - 1;
    },
    { passive: true },
  );
  document.addEventListener("visibilitychange", syncMotion);
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame));
  window.addEventListener("pageshow", syncMotion);
  reduced.addEventListener("change", syncMotion);
  mobile.addEventListener("change", () => {
    createBrain();
    resize();
  });
  // Redesenha também quando pausado ou com movimento reduzido.
  new MutationObserver(() => {
    accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#d4ed8a";
    draw();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  createBrain();
  readScroll();
  progress = reduced.matches ? 0 : target;
  resize();
  syncMotion();
})();
