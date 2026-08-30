const COLORS = {
  red: { 2: "#FDECEF", 3: "#FDDBE1", 5: "#EF687E" },
  orange: { 2: "#FFEFDC", 3: "#FFDEBA", 5: "#E67600" },
  yellow: { 1: "#FEF9DC", 2: "#FEF2BA", 4: "#D9B500" },
  green: { 1: "#EFFAF7", 2: "#E0F4EE", 3: "#C7EBE1", 4: "#66CAAF", 5: "#3AA686", 6: "#1F7A64", 7: "#0E6352", 9: "#032C24" },
  blue: { 2: "#E9F2FF", 3: "#D0E4FF", 4: "#8EBAF8", 6: "#2372E2", 8: "#003785" },
  grey: { 9: "#222533" }
};

const STAGES = [
  {
    name: "Applied/Added",
    value: 42,
    backgroundColor: COLORS.red[2],
    backgroundColorActive: COLORS.red[3],
    richFill: COLORS.red[3],
    richHover: COLORS.red[5],
    color: COLORS.red[5],
    reportTitle: "Apply/added candidates",
    candidates: ["Jeanette J. Gipson", "Emilio N. Snyder", "Julia J. Speaks", "Franklin B. Cronin"]
  },
  {
    name: "Application screening",
    value: 17,
    backgroundColor: COLORS.orange[2],
    backgroundColorActive: COLORS.orange[3],
    richFill: COLORS.orange[3],
    richHover: COLORS.orange[5],
    color: COLORS.orange[5],
    reportTitle: "candidates who completed a step in Application screening stage",
    candidates: ["Jeanette J. Gipson", "Emilio N. Snyder", "Wilma T. Hill"]
  },
  {
    name: "Screening interviews",
    value: 12,
    backgroundColor: COLORS.yellow[1],
    backgroundColorActive: COLORS.yellow[2],
    richFill: COLORS.yellow[2],
    richHover: COLORS.yellow[4],
    color: COLORS.yellow[4],
    reportTitle: "candidates who completed a step in Screening interviews stage",
    candidates: ["Jeanette J. Gipson", "Thomas B. Stainbrook"]
  },
  {
    name: "Assessment",
    value: 9,
    backgroundColor: COLORS.green[1],
    backgroundColorActive: COLORS.green[2],
    richFill: COLORS.green[3],
    richHover: COLORS.green[4],
    color: COLORS.green[4],
    reportTitle: "candidates who completed a step in Assessment stage",
    candidates: ["Jeanette J. Gipson", "Vera J. Johnson"]
  },
  {
    name: "Advanced interviews",
    value: 4,
    backgroundColor: COLORS.green[2],
    backgroundColorActive: COLORS.green[3],
    richFill: COLORS.green[4],
    richHover: COLORS.green[5],
    color: COLORS.green[7],
    reportTitle: "candidates who completed a step in Advanced interviews stage",
    candidates: ["Jeanette J. Gipson", "Toni R. Roberson"]
  },
  {
    name: "Reference",
    value: 3,
    backgroundColor: COLORS.green[3],
    backgroundColorActive: COLORS.green[4],
    richFill: COLORS.green[5],
    richHover: COLORS.green[6],
    color: COLORS.green[9],
    reportTitle: "candidates who completed a step in Reference stage",
    candidates: ["Jeanette J. Gipson"]
  },
  {
    name: "Offer",
    value: 2,
    backgroundColor: COLORS.blue[3],
    backgroundColorActive: COLORS.blue[4],
    richFill: COLORS.blue[4],
    richHover: COLORS.blue[6],
    color: COLORS.blue[8],
    reportTitle: "candidates who completed a step in Offer stage",
    candidates: ["Jeanette J. Gipson"]
  },
  {
    name: "Hired",
    value: 2,
    backgroundColor: COLORS.blue[2],
    backgroundColorActive: COLORS.blue[3],
    richFill: COLORS.blue[3],
    richHover: COLORS.blue[4],
    color: COLORS.blue[6],
    reportTitle: "hired candidates",
    candidates: ["Jeanette J. Gipson"]
  }
];

const CHART_HEIGHT = 400;
const FUNNEL_PLOT_HEIGHT = 360;
const FUNNEL_RADIUS = 12;
const VOLUME_MAX = 1000;
const CURSOR = "nesw-resize";
const DEFAULT_VOLUMES = STAGES.map((stage) => stage.value);

const state = {
  view: "current",
  neckWidth: 28,
  neckHeight: 0,
  heightMode: "floor",
  minHeightPx: 28,
  richColor: true,
  labels: "line",
  splitNumbers: true,
  numberCount: 2,
  volumes: DEFAULT_VOLUMES.slice(),
  addLater: false,
  charts: []
};

function stackedVolumes() {
  const vols = state.volumes.slice();
  if (!state.addLater) return vols;
  for (let i = vols.length - 2; i >= 0; i--) {
    vols[i] += vols[i + 1];
  }
  return vols;
}

function liveStages() {
  const values = stackedVolumes();
  return enrich(
    STAGES.map((stage, i) => ({
      ...stage,
      value: values[i]
    }))
  );
}

function enrich(stages) {
  const first = stages[0].value;
  const last = stages[stages.length - 1].value;
  return stages.map((stage, i) => {
    const row = { ...stage };
    if (i < stages.length - 1) {
      row.passValue = stages[i + 1].value;
      row.passValuePercent = row.value ? row.passValue / row.value : NaN;
      row.dropOffValue = row.value - row.passValue;
      row.dropOffValuePercent = row.value ? row.dropOffValue / row.value : NaN;
      row.funnelRate = last ? row.value / last : NaN;
    }
    if (i > 0) row.conversionRate = row.value ? first / row.value : NaN;
    return row;
  });
}

function paint(stage) {
  if (state.richColor) {
    return { fill: stage.richFill, hover: stage.richHover, border: stage.color };
  }
  return { fill: stage.backgroundColor, hover: stage.backgroundColorActive, border: stage.color };
}

function pct(n) {
  return Number.isFinite(n) ? `${Math.round(100 * n)}%` : "";
}

function ratio(n) {
  return Number.isFinite(n) ? `1:${Math.round(n)}` : "";
}

function withMinFloor(weights) {
  const n = weights.length;
  const min = state.minHeightPx;
  const remainder = Math.max(0, FUNNEL_PLOT_HEIGHT - n * min);
  const total = weights.reduce((sum, v) => sum + v, 0) || 1;
  return weights.map((v) => min + remainder * (v / total));
}

function displayYs(values) {
  if (state.heightMode === "equal") return values.map(() => 1);
  if (state.heightMode === "share") return values.slice();
  if (state.heightMode === "progressive") {
    return values.map((v) => Math.sqrt(Math.max(v, 0)));
  }
  if (state.heightMode === "progfloor") {
    return withMinFloor(values.map((v) => Math.sqrt(Math.max(v, 0))));
  }
  return withMinFloor(values.map((v) => Math.max(v, 0)));
}

function heightHint() {
  if (state.heightMode === "share") return "linear: height tracks count 1:1";
  if (state.heightMode === "progressive") return "sqrt(count): gaps stay, less polar";
  if (state.heightMode === "floor") return "linear count, then a px floor";
  if (state.heightMode === "progfloor") return "sqrt(count), then a px floor";
  return "same height for every stage";
}

function usesMinHeight() {
  return state.heightMode === "floor" || state.heightMode === "progfloor";
}

function numbersHint() {
  if (state.numberCount === 1) return "count";
  if (state.numberCount === 2) return "count, pass %";
  return "count, pass %, drop %";
}

function stageNumsHtml(stage) {
  const n = state.numberCount;
  const parts = [`<span class="hc-count">${stage.value}</span>`];
  if (n >= 2) {
    parts.push(
      stage.passValuePercent !== undefined
        ? `<span class="hc-pass">${pct(stage.passValuePercent)}</span>`
        : `<span class="hc-pass"></span>`
    );
  }
  if (n >= 3) {
    parts.push(
      stage.dropOffValuePercent !== undefined
        ? `<span class="hc-drop">${pct(stage.dropOffValuePercent)}</span>`
        : `<span class="hc-drop"></span>`
    );
  }
  return `<span class="hc-nums">${parts.join("")}</span>`;
}

function stageLabelHtml(stage) {
  const nums = stageNumsHtml(stage);
  const dot = state.labels === "inside"
    ? `<span class="hc-dot" style="color:${stage.color}">●</span>`
    : "";
  if (state.labels === "line" && state.splitNumbers) {
    return `<span class="hc-label-name">${stage.name}</span>${nums}`;
  }
  return `${dot}<span class="hc-label-name">${stage.name}</span> ${nums}`;
}

function paintFill(graphic, fill) {
  if (!graphic) return;
  if (graphic.attr) graphic.attr({ fill });
  const root = graphic.element;
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll("path, rect, polygon").forEach((el) => {
    el.setAttribute("fill", fill);
  });
}

function pointEvents() {
  return {
    click() {
      if (this.custom && this.custom.type === "step") clickPoint(this);
    },
    mouseOver() {
      if (!this.graphic || !this.custom || this.custom.type !== "step") return;
      paintFill(this.graphic, paint(this.custom.step).hover);
    },
    mouseOut() {
      if (!this.graphic || !this.custom || this.custom.type !== "step") return;
      paintFill(this.graphic, paint(this.custom.step).fill);
    }
  };
}

function openDrawer(stage) {
  document.getElementById("mask").classList.remove("hidden");
  const drawer = document.getElementById("drawer");
  drawer.classList.remove("hidden");
  document.getElementById("drawer-title").textContent = stage.reportTitle;
  document.getElementById("drawer-sub").textContent =
    `Drilldown of ${stage.name} · ${stage.value} candidates who reached this or a later stage`;
  const body = document.getElementById("drawer-body");
  const rows = stage.candidates
    .map(
      (name) =>
        `<tr><td>${name}</td><td>Full stack developer</td><td>${stage.name}</td></tr>`
    )
    .join("");
  body.innerHTML = `
    <p class="sub" style="margin:0 0 12px">This is a mock of the Analytics drawer. In Recruit, click opens the stage drilldown report.</p>
    <table>
      <thead><tr><th>Candidate</th><th>Position</th><th>Stage</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function closeDrawer() {
  document.getElementById("mask").classList.add("hidden");
  document.getElementById("drawer").classList.add("hidden");
}

function tooltipHtml(stage) {
  const rows = [];
  rows.push(`<tr><td><span class="metric">${stage.value}</span></td><td>Reached this or more advanced stages</td></tr>`);
  if (stage.passValue !== undefined) {
    rows.push(`<tr><td><span class="metric ok">↓ ${pct(stage.passValuePercent)}</span></td><td>Passed this stage</td></tr>`);
  }
  if (stage.dropOffValue !== undefined) {
    rows.push(`<tr><td><span class="metric bad">✕ ${pct(stage.dropOffValuePercent)}</span></td><td>Dropped at this stage</td></tr>`);
  }
  if (stage.conversionRate !== undefined) {
    rows.push(`<tr><td><span class="metric">▶ ${ratio(stage.conversionRate)}</span></td><td>Started the hiring process &amp; reached this stage</td></tr>`);
  }
  if (stage.funnelRate !== undefined) {
    rows.push(`<tr><td><span class="metric">♥ ${ratio(stage.funnelRate)}</span></td><td>Reached this stage &amp; were hired</td></tr>`);
  }
  return `<div class="tooltip">
    <div class="tooltip-title"><span style="font-size:16px;color:${stage.color}">●</span>${stage.name}</div>
    <table>${rows.join("")}</table>
  </div>`;
}

function sharedTooltip() {
  return {
    useHTML: true,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: "#EFF0F4",
    shape: "callout",
    distance: 60,
    outside: true,
    shadow: {
      color: "rgba(0, 22, 54, 0.12)",
      offsetX: 0,
      offsetY: 4,
      opacity: 1,
      width: 8
    },
    style: { fontSize: "14px", zIndex: 100 },
    formatter() {
      const stage = this.point.custom && this.point.custom.step;
      if (!stage || this.point.custom.type !== "step") return false;
      return tooltipHtml(stage);
    }
  };
}

function clickPoint(point) {
  const stage = point.custom && point.custom.step;
  if (stage) openDrawer(stage);
}

function shapeLayout() {
  if (state.labels === "inside") return { width: "62%", center: ["50%", "50%"] };
  if (state.labels === "side") return { width: "48%", center: ["38%", "50%"] };
  return { width: "52%", center: ["36%", "50%"] };
}

function currentOptions(stages, height) {
  const first = stages[0].value;
  const last = stages[stages.length - 1].value;
  const taper = 320.1;
  const pad = 40;
  const plotMax = 970;
  const bars = stages.map((stage, x) => {
    const rawT = first === last ? 0 : (first - stage.value) / (first - last);
    const t = Number.isFinite(rawT) ? Math.min(1, Math.max(0, rawT)) : 0;
    const p = paint(stage);
    return {
      low: pad + taper * t,
      high: plotMax - taper * t,
      x,
      name: stage.name,
      color: p.fill,
      custom: { type: "step", step: stage },
      states: { hover: { color: p.hover, brightness: 0, halo: false } }
    };
  });

  return {
    credits: { enabled: false },
    exporting: { enabled: false },
    accessibility: { enabled: false },
    chart: {
      type: "columnrange",
      inverted: true,
      height,
      animation: false,
      marginRight: state.labels === "inside" ? 12 : 210,
      events: {
        render() {
          const chart = this;
          requestAnimationFrame(() => syncLabels(chart));
        }
      }
    },
    title: { text: undefined },
    legend: { enabled: false },
    xAxis: [{ visible: false, min: 0, max: stages.length - 1, minPadding: 0, maxPadding: 0, startOnTick: false, endOnTick: false }],
    yAxis: [{ visible: false, min: 0, max: 1050, maxPadding: 0, startOnTick: false, endOnTick: false }],
    tooltip: sharedTooltip(),
    plotOptions: {
      series: {
        animation: false,
        cursor: CURSOR,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#fff",
        pointPadding: 0,
        groupPadding: 0.1,
        states: { hover: { brightness: 0, halo: false }, inactive: { opacity: 1 } }
      }
    },
    series: [
      {
        type: "columnrange",
        turboThreshold: 0,
        data: bars,
        dataLabels: { enabled: false },
        point: { events: pointEvents() }
      }
    ]
  };
}

function funnelOptions(stages, type, height) {
  const values = displayYs(stages.map((s) => s.value));
  const layout = shapeLayout();
  const is3d = type === "funnel3d";
  const shape = {
    type,
    name: "Funnel",
    animation: false,
    turboThreshold: 0,
    cursor: CURSOR,
    borderWidth: 1,
    borderColor: "#fff",
    width: layout.width,
    height: is3d ? "76%" : "90%",
    center: is3d ? [layout.center[0], "50%"] : layout.center,
    reversed: false,
    neckWidth: `${state.neckWidth}%`,
    neckHeight: `${state.neckHeight}%`,
    dataLabels: { enabled: false },
    point: { events: pointEvents() },
    states: { hover: { brightness: 0, halo: false }, inactive: { opacity: 1 } },
    data: stages.map((stage, i) => {
      const p = paint(stage);
      return {
        name: stage.name,
        y: values[i],
        color: p.fill,
        custom: { type: "step", step: stage },
        states: { hover: { color: p.hover, brightness: 0 } }
      };
    })
  };
  if (!is3d) shape.borderRadius = { radius: FUNNEL_RADIUS, scope: "stack" };
  if (is3d) shape.gradientForSides = true;

  return {
    credits: { enabled: false },
    exporting: { enabled: false },
    accessibility: { enabled: false },
    chart: {
      type,
      height,
      animation: false,
      spacing: is3d ? [28, 12, 32, 12] : [8, 8, 8, 8],
      options3d: is3d
        ? { enabled: true, alpha: 8, beta: 0, depth: 36, viewDistance: 60 }
        : undefined,
      events: {
        render() {
          const chart = this;
          requestAnimationFrame(() => syncLabels(chart));
        }
      }
    },
    title: { text: undefined },
    legend: { enabled: false },
    tooltip: sharedTooltip(),
    series: [shape]
  };
}

function graphicEl(point) {
  return point.graphic && point.graphic.element;
}

function graphicFace(el) {
  if (!el) return null;
  const nodes = [el, ...(el.querySelectorAll ? el.querySelectorAll("path, polygon, polyline, rect") : [])].filter(
    (n) => /^(path|polygon|polyline|rect)$/i.test(n.tagName)
  );
  if (!nodes.length) return el;
  return nodes.reduce((best, node) => {
    const a = node.getBoundingClientRect();
    const b = best.getBoundingClientRect();
    return a.width * a.height > b.width * b.height ? node : best;
  });
}

function screenPoint(node, x, y) {
  const svg = node.ownerSVGElement;
  if (!svg || !svg.createSVGPoint) return { x, y };
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const ctm = node.getScreenCTM();
  if (!ctm) return { x, y };
  const sp = pt.matrixTransform(ctm);
  return { x: sp.x, y: sp.y };
}

function nodeOutline(node) {
  if (node.tagName === "path" && node.getTotalLength) {
    const len = node.getTotalLength();
    if (!len) return [];
    const steps = Math.max(64, Math.ceil(len / 2));
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      pts.push(node.getPointAtLength((len * i) / steps));
    }
    return pts;
  }
  if (node.points && node.points.length) {
    return [...node.points].map((p) => ({ x: p.x, y: p.y }));
  }
  if (typeof node.getBBox !== "function") return [];
  const b = node.getBBox();
  return [
    { x: b.x, y: b.y },
    { x: b.x + b.width, y: b.y },
    { x: b.x + b.width, y: b.y + b.height },
    { x: b.x, y: b.y + b.height },
    { x: b.x, y: b.y }
  ];
}

function rightEdgeAtY(el, yAbs) {
  const face = graphicFace(el) || el;
  const pts = nodeOutline(face).map((p) => screenPoint(face, p.x, p.y));
  let maxX = -Infinity;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const crosses = (a.y <= yAbs && b.y >= yAbs) || (b.y <= yAbs && a.y >= yAbs);
    if (!crosses) continue;
    const t = a.y === b.y ? 0 : (yAbs - a.y) / (b.y - a.y);
    maxX = Math.max(maxX, a.x + t * (b.x - a.x));
  }
  if (!Number.isFinite(maxX) || maxX === -Infinity) {
    return face.getBoundingClientRect().right;
  }
  return maxX;
}

function drawStripe(svg, x1, y1, x2, y2, color) {
  const ns = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(ns, "line");
  line.setAttribute("x1", String(x1));
  line.setAttribute("y1", String(y1));
  line.setAttribute("x2", String(x2));
  line.setAttribute("y2", String(y2));
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", "1.5");
  line.setAttribute("stroke-linecap", "round");
  svg.appendChild(line);
}

const CONNECTOR = 12;

function syncLabels(chart) {
  const frame = chart.renderTo && chart.renderTo.closest && chart.renderTo.closest(".chart-frame");
  const list = frame && frame.querySelector(".label-col");
  const svg = frame && frame.querySelector(".label-lines");
  if (!list || !svg) return;

  const points = chart.series[0].points.filter((p) => p.custom && p.custom.type === "step");
  const mode = state.labels;
  const split = mode === "line" && state.splitNumbers;
  list.className = `label-col label-${mode}${split ? " label-split" : ""}`;
  list.classList.remove("hidden");
  list.innerHTML = points
    .map((point) => {
      const stage = point.custom.step;
      return `<li class="hc-name" data-stage="${stage.name}">${stageLabelHtml(stage)}</li>`;
    })
    .join("");

  const frameBox = frame.getBoundingClientRect();
  svg.setAttribute("width", String(frame.clientWidth));
  svg.setAttribute("height", String(frame.clientHeight));
  svg.innerHTML = "";

  if (split) {
    const maxName = Math.max(
      0,
      ...[...list.querySelectorAll(".hc-label-name")].map((el) => el.offsetWidth)
    );
    list.style.setProperty("--name-w", `${Math.ceil(maxName)}px`);
  } else {
    list.style.removeProperty("--name-w");
  }

  const slices = points.map((point) => {
    const el = graphicEl(point);
    const face = el && graphicFace(el);
    const box = (face || el).getBoundingClientRect();
    const cy = box.top + box.height / 2 - frameBox.top;
    const yAbs = frameBox.top + cy;
    const edge = el ? rightEdgeAtY(el, yAbs) - frameBox.left : 0;
    return { point, el, box, cy, edge };
  });
  const colLeft = (slices.length ? Math.max(...slices.map((s) => s.edge)) : 0) + CONNECTOR;

  slices.forEach((slice, i) => {
    const li = list.children[i];
    if (!li || !slice.el) return;
    const { box, cy, edge } = slice;
    const sliceLeft = box.left - frameBox.left;
    const color = slice.point.custom.step.color;

    li.style.transform = "none";
    li.style.right = "auto";
    li.style.width = "auto";

    if (mode === "inside") {
      const width = Math.max(48, box.width - 12);
      li.style.left = `${sliceLeft + box.width / 2}px`;
      li.style.top = `${cy}px`;
      li.style.width = `${width}px`;
      li.style.transform = "translate(-50%, -50%)";
      li.style.textAlign = "center";
      return;
    }

    if (mode === "side") {
      const left = edge + CONNECTOR;
      li.style.left = `${left}px`;
      li.style.top = `${cy - li.offsetHeight / 2}px`;
      li.style.textAlign = "left";
      drawStripe(svg, edge, cy, left - 2, cy, color);
      return;
    }

    li.style.left = `${colLeft}px`;
    li.style.top = `${cy - li.offsetHeight / 2}px`;
    li.style.textAlign = "left";
    drawStripe(svg, edge, cy, colLeft - 4, cy, color);
  });
}

function destroyCharts() {
  state.charts.forEach((chart) => {
    if (chart && chart.destroy) chart.destroy();
  });
  state.charts = [];
}

function specBody() {
  const type =
    state.view === "current" ? "columnrange (inverted)" : state.view === "funnel3d" ? "funnel3d" : "funnel";
  const modules =
    state.view === "current"
      ? "highcharts.js, highcharts-more.js"
      : state.view === "funnel3d"
        ? "highcharts.js, highcharts-3d.js, modules/cylinder.js, modules/funnel3d.js"
        : "highcharts.js, modules/funnel.js";
  const height =
    state.view === "current"
      ? "equal bar height (production). Width encodes count."
      : state.heightMode === "equal"
        ? "equal slice height. Silhouette still tapers. Pass y=1 for every stage."
        : state.heightMode === "share"
          ? "raw y = count (linear / arithmetic). Thin stages (Hired=2) become a sliver."
          : state.heightMode === "progressive"
            ? "y = sqrt(count). Order stays, 42 vs 2 is ~4.6× height instead of 21×."
            : state.heightMode === "progfloor"
              ? `progressive + min height: y = sqrt(count), then reserve 8 × ${state.minHeightPx}px and split leftover by compressed share.`
              : `proportional min height: reserve 8 × ${state.minHeightPx}px, leftover plot (~${FUNNEL_PLOT_HEIGHT}px) split by count. Highcharts y is adjusted.`;
  const neck =
    state.view === "current"
      ? "n/a"
      : `neckWidth: '${state.neckWidth}%', neckHeight: '${state.neckHeight}%'${
          state.neckHeight === 0 ? " (truncated triangle)" : " (bottle)"
        }`;
  const radius =
    state.view === "funnel"
      ? `borderRadius: { radius: ${FUNNEL_RADIUS}, scope: 'stack' } (outer silhouette)`
      : "n/a";
  const volumes = `${state.volumes.join(", ")}${
    state.addLater ? ` → stacked ${stackedVolumes().join(", ")}` : ""
  }`;
  const labelNums =
    state.numberCount === 1 ? "count" : state.numberCount === 2 ? "count + pass %" : "count + pass % + drop %";
  const labels =
    state.labels === "inside"
      ? "HTML overlay, centered in the slice. Color dot on. Highcharts dataLabels off."
      : state.labels === "side"
        ? `HTML overlay at true slice edge + ${CONNECTOR}px. Equal-length colored connectors, docked to the silhouette at mid-Y.`
        : `HTML overlay, one vertical column at max(edge) + ${CONNECTOR}px. Colored connectors from true edge to the column. Number columns: ${state.splitNumbers ? "on (name | numbers, 8px gap)" : "off"}.`;
  const threeD =
    state.view === "funnel3d"
      ? "\nchart.options3d: { enabled: true, alpha: 8, beta: 0, depth: 36, viewDistance: 60 }\nseries.height: 76%, extra chart spacing so the 3D cap stays inside the frame\nseries.gradientForSides: true"
      : "";

  return `Highcharts 12.5.0
modules: ${modules}

chart.type: ${type}${threeD}

series
  ${neck}
  ${radius}
  reversed: false
  cursor: nesw-resize
  dataLabels.enabled: false

Height
  ${height}

Volume
  entered: ${volumes}
  add later stages: ${state.addLater ? "on (each y/label = this stage + all after it)" : "off"}
  labels/tooltip follow displayed counts

Hover
  fill: next token step (richHover or backgroundColorActive)
  extra stroke: none
  halo: off
  brightness: 0

Labels
  ${labels}
  numbers shown: ${state.numberCount} → ${labelNums}
  fills: ${state.richColor ? "rich tokens (step 3–5)" : "production pale tokens (step 1–2)"}

Click
  point.click → openDrawer({ reportTitle })
  whole fill is the hit target`;
}

function clampPct(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(80, Math.max(0, Math.round(n)));
}

function clampVolume(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(VOLUME_MAX, Math.max(0, Math.round(n)));
}

function syncNeckFields() {
  document.getElementById("neckWidth").value = String(state.neckWidth);
  document.getElementById("neckWidthNum").value = String(state.neckWidth);
  document.getElementById("neckHeight").value = String(state.neckHeight);
  document.getElementById("neckHeightNum").value = String(state.neckHeight);
}

function syncVolumeFields() {
  document.querySelectorAll("[data-volume]").forEach((el) => {
    const i = Number(el.dataset.volume);
    el.value = String(state.volumes[i]);
  });
}

function renderVolumeGrid() {
  const grid = document.getElementById("volume-grid");
  grid.innerHTML = STAGES.map(
    (stage, i) => `<label class="volume-item">
      <span class="name" title="${stage.name}">${stage.name}</span>
      <input type="range" data-volume="${i}" min="0" max="${VOLUME_MAX}" value="${state.volumes[i]}" />
      <input type="number" data-volume="${i}" min="0" max="${VOLUME_MAX}" value="${state.volumes[i]}" />
    </label>`
  ).join("");
}

function setNeckWidth(n) {
  state.neckWidth = clampPct(n);
  syncNeckFields();
  render();
}

function setNeckHeight(n) {
  state.neckHeight = clampPct(n);
  syncNeckFields();
  render();
}

function setVolume(i, n) {
  state.volumes[i] = clampVolume(n);
  syncVolumeFields();
  render();
}

function chartType() {
  return state.view === "current" ? "columnrange" : state.view;
}

function render() {
  const stages = liveStages();
  document.getElementById("spec-body").textContent = specBody();
  document.getElementById("numbers-hint").textContent = numbersHint();
  document.getElementById("height-hint").textContent = heightHint();
  document.getElementById("neck-row").dataset.disabled =
    state.view === "funnel" || state.view === "funnel3d" ? "false" : "true";
  document.getElementById("height-seg").dataset.disabled = state.view === "current" ? "true" : "false";
  document.getElementById("minpx-toggle").dataset.disabled =
    state.view === "current" || !usesMinHeight() ? "true" : "false";
  document.getElementById("cols-toggle").dataset.disabled = state.labels === "line" ? "false" : "true";

  const options =
    state.view === "current"
      ? currentOptions(stages, CHART_HEIGHT)
      : funnelOptions(stages, state.view, CHART_HEIGHT);
  const existing = state.charts[0];
  if (existing && existing.series[0] && existing.series[0].type === chartType()) {
    existing.update(options, true, false, false);
    requestAnimationFrame(() => syncLabels(existing));
    return;
  }
  destroyCharts();
  state.charts = [Highcharts.chart("chart-main", options)];
}

function bind() {
  const params = new URLSearchParams(location.search);
  const viewParam = params.get("view") === "pyramid" ? "funnel3d" : params.get("view");
  if (viewParam && ["current", "funnel", "funnel3d"].includes(viewParam)) {
    state.view = viewParam;
  }
  if (params.get("neck") === "1") {
    state.neckWidth = 30;
    state.neckHeight = 25;
  }
  if (params.get("neckW")) state.neckWidth = clampPct(Number(params.get("neckW")));
  if (params.get("neckH")) state.neckHeight = clampPct(Number(params.get("neckH")));
  if (params.get("v")) {
    const parts = params.get("v").split(",").map((x) => clampVolume(Number(x)));
    if (parts.length === STAGES.length) state.volumes = parts;
  }
  if (["share", "floor", "equal", "progressive", "progfloor"].includes(params.get("height"))) {
    state.heightMode = params.get("height");
  }
  if (params.get("min")) {
    const n = Number(params.get("min"));
    if (Number.isFinite(n)) state.minHeightPx = Math.min(80, Math.max(8, Math.round(n)));
  }
  if (params.get("rich") === "0") state.richColor = false;
  if (["inside", "side", "line"].includes(params.get("labels"))) {
    state.labels = params.get("labels");
  }
  if (params.get("cols") === "0") state.splitNumbers = false;
  if (params.get("later") === "1") state.addLater = true;
  if (["1", "2", "3"].includes(params.get("numbers"))) {
    state.numberCount = Number(params.get("numbers"));
  }
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.view === state.view));
    btn.addEventListener("click", () => {
      state.view = btn.dataset.view;
      document.querySelectorAll("[data-view]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  document.querySelectorAll("[data-labels]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.labels === state.labels));
    btn.addEventListener("click", () => {
      state.labels = btn.dataset.labels;
      document.querySelectorAll("[data-labels]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  document.querySelectorAll("[data-height]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.height === state.heightMode));
    btn.addEventListener("click", () => {
      state.heightMode = btn.dataset.height;
      document.querySelectorAll("[data-height]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  document.querySelectorAll("[data-numbers]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(Number(btn.dataset.numbers) === state.numberCount));
    btn.addEventListener("click", () => {
      state.numberCount = Number(btn.dataset.numbers);
      document.querySelectorAll("[data-numbers]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  document.getElementById("richColor").checked = state.richColor;
  document.getElementById("splitNumbers").checked = state.splitNumbers;
  document.getElementById("addLater").checked = state.addLater;
  document.getElementById("minHeightPx").value = String(state.minHeightPx);
  renderVolumeGrid();
  syncNeckFields();
  document.getElementById("neckWidth").addEventListener("input", (e) => setNeckWidth(Number(e.target.value)));
  document.getElementById("neckWidthNum").addEventListener("input", (e) => {
    if (e.target.value === "") return;
    setNeckWidth(Number(e.target.value));
  });
  document.getElementById("neckHeight").addEventListener("input", (e) => setNeckHeight(Number(e.target.value)));
  document.getElementById("neckHeightNum").addEventListener("input", (e) => {
    if (e.target.value === "") return;
    setNeckHeight(Number(e.target.value));
  });
  document.getElementById("volume-grid").addEventListener("input", (e) => {
    const el = e.target.closest("[data-volume]");
    if (!el) return;
    if (el.type === "number" && el.value === "") return;
    setVolume(Number(el.dataset.volume), Number(el.value));
  });
  document.getElementById("volume-reset").addEventListener("click", () => {
    state.volumes = DEFAULT_VOLUMES.slice();
    syncVolumeFields();
    render();
  });
  document.getElementById("addLater").addEventListener("change", (e) => {
    state.addLater = e.target.checked;
    render();
  });
  document.getElementById("richColor").addEventListener("change", (e) => {
    state.richColor = e.target.checked;
    render();
  });
  document.getElementById("splitNumbers").addEventListener("change", (e) => {
    state.splitNumbers = e.target.checked;
    render();
  });
  document.getElementById("minHeightPx").addEventListener("input", (e) => {
    const n = Number(e.target.value);
    if (!Number.isFinite(n)) return;
    state.minHeightPx = Math.min(80, Math.max(8, Math.round(n)));
    if (usesMinHeight()) render();
  });
  window.addEventListener("resize", () => {
    state.charts.forEach((chart) => syncLabels(chart));
  });
  document.getElementById("mask").addEventListener("click", closeDrawer);
  document.getElementById("drawer-close").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
  document.addEventListener("click", (e) => {
    const label = e.target.closest(".hc-name");
    if (!label || state.labels === "inside") return;
    const name = label.dataset.stage;
    if (!name) return;
    const stage = liveStages().find((s) => s.name === name);
    if (stage) openDrawer(stage);
  });
}

bind();
render();
