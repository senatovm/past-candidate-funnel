const COLORS = {
  red: { 1: "#FFF5F7", 2: "#FDECEF", 3: "#FDDBE1", 5: "#EF687E", 6: "#E23B55", 7: "#C42B45" },
  orange: { 1: "#FFF7ED", 2: "#FFEFDC", 3: "#FFDEBA", 5: "#E67600", 6: "#D15F00" },
  yellow: { 1: "#FEF9DC", 2: "#FEF2BA", 4: "#D9B500", 5: "#C49A00" },
  green: { 1: "#EFFAF7", 2: "#E0F4EE", 3: "#C7EBE1", 4: "#66CAAF", 5: "#3AA686", 6: "#1F7A64", 7: "#0E6352", 9: "#032C24" },
  blue: { 1: "#F5F9FF", 2: "#E9F2FF", 3: "#D0E4FF", 4: "#8EBAF8", 6: "#2372E2", 7: "#0B5AD4", 8: "#003785" },
  grey: { 3: "#E1E3EA", 9: "#222533" }
};

const STAGES = [
  {
    name: "Applied/Added",
    value: 42,
    backgroundColor: COLORS.red[2],
    backgroundColorActive: COLORS.red[3],
    richFill: COLORS.red[5],
    richHover: COLORS.red[6],
    color: COLORS.red[5],
    tint100: COLORS.red[1],
    tint200: COLORS.red[2],
    reportTitle: "Apply/added candidates",
    candidates: ["Jeanette J. Gipson", "Emilio N. Snyder", "Julia J. Speaks", "Franklin B. Cronin"]
  },
  {
    name: "Application screening",
    value: 17,
    backgroundColor: COLORS.orange[2],
    backgroundColorActive: COLORS.orange[3],
    richFill: COLORS.orange[5],
    richHover: COLORS.orange[6],
    color: COLORS.orange[5],
    tint100: COLORS.orange[1],
    tint200: COLORS.orange[2],
    reportTitle: "candidates who completed a step in Application screening stage",
    candidates: ["Jeanette J. Gipson", "Emilio N. Snyder", "Wilma T. Hill"]
  },
  {
    name: "Screening interviews",
    value: 12,
    backgroundColor: COLORS.yellow[1],
    backgroundColorActive: COLORS.yellow[2],
    richFill: COLORS.yellow[4],
    richHover: COLORS.yellow[5],
    color: COLORS.yellow[4],
    tint100: COLORS.yellow[1],
    tint200: COLORS.yellow[2],
    reportTitle: "candidates who completed a step in Screening interviews stage",
    candidates: ["Jeanette J. Gipson", "Thomas B. Stainbrook"]
  },
  {
    name: "Assessment",
    value: 9,
    backgroundColor: COLORS.green[1],
    backgroundColorActive: COLORS.green[2],
    richFill: COLORS.green[5],
    richHover: COLORS.green[6],
    color: COLORS.green[5],
    tint100: COLORS.green[1],
    tint200: COLORS.green[2],
    reportTitle: "candidates who completed a step in Assessment stage",
    candidates: ["Jeanette J. Gipson", "Vera J. Johnson"]
  },
  {
    name: "Advanced interviews",
    value: 4,
    backgroundColor: COLORS.green[2],
    backgroundColorActive: COLORS.green[3],
    richFill: COLORS.green[6],
    richHover: COLORS.green[7],
    color: COLORS.green[6],
    tint100: COLORS.green[1],
    tint200: COLORS.green[2],
    reportTitle: "candidates who completed a step in Advanced interviews stage",
    candidates: ["Jeanette J. Gipson", "Toni R. Roberson"]
  },
  {
    name: "Reference",
    value: 3,
    backgroundColor: COLORS.green[3],
    backgroundColorActive: COLORS.green[4],
    richFill: COLORS.green[6],
    richHover: COLORS.green[7],
    color: COLORS.green[6],
    tint100: COLORS.green[1],
    tint200: COLORS.green[2],
    reportTitle: "candidates who completed a step in Reference stage",
    candidates: ["Jeanette J. Gipson"]
  },
  {
    name: "Offer",
    value: 2,
    backgroundColor: COLORS.blue[3],
    backgroundColorActive: COLORS.blue[4],
    richFill: COLORS.blue[6],
    richHover: COLORS.blue[7],
    color: COLORS.blue[6],
    tint100: COLORS.blue[1],
    tint200: COLORS.blue[2],
    reportTitle: "candidates who completed a step in Offer stage",
    candidates: ["Jeanette J. Gipson"]
  },
  {
    name: "Hired",
    value: 2,
    backgroundColor: COLORS.blue[2],
    backgroundColorActive: COLORS.blue[3],
    richFill: COLORS.blue[6],
    richHover: COLORS.blue[8],
    color: COLORS.blue[6],
    tint100: COLORS.blue[1],
    tint200: COLORS.blue[2],
    reportTitle: "hired candidates",
    candidates: ["Jeanette J. Gipson"]
  }
];

const CHART_HEIGHT = 400;
const FUNNEL_PLOT_HEIGHT = 360;
const FUNNEL_RADIUS = 12;
const VOLUME_MAX = 1000;
const CURSOR = "nesw-resize";

const VIEW_DEFAULTS = {
  current: {
    labels: "inside",
    heightMode: "floor",
    minHeightPx: 16,
    richColor: false,
    splitNumbers: true,
    numberCount: 1,
    volumes: [42, 17, 12, 9, 4, 3, 2, 2],
    addLater: true,
    neckWidth: 32,
    neckHeight: 22
  },
  funnel: {
    labels: "table",
    heightMode: "progfloor",
    minHeightPx: 16,
    richColor: true,
    splitNumbers: true,
    numberCount: 1,
    volumes: [250, 123, 133, 48, 4, 3, 2, 2],
    addLater: false,
    neckWidth: 32,
    neckHeight: 22
  },
  horizontal: {
    labels: "inside",
    heightMode: "floor",
    minHeightPx: 16,
    richColor: true,
    splitNumbers: true,
    numberCount: 1,
    volumes: [250, 123, 133, 48, 4, 3, 2, 2],
    addLater: false,
    neckWidth: 0,
    neckHeight: 0
  },
  columns: {
    labels: "inside",
    heightMode: "progfloor",
    minHeightPx: 16,
    richColor: true,
    splitNumbers: true,
    numberCount: 1,
    volumes: [250, 123, 133, 48, 4, 3, 2, 2],
    addLater: true,
    neckWidth: 0,
    neckHeight: 0
  }
};

let tableNameWidthCache = 0;

function tableNameWidth() {
  if (tableNameWidthCache) return tableNameWidthCache;
  const probe = document.createElement("span");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;font:500 12px 'Roboto Flex', 'Segoe UI', sans-serif;white-space:nowrap";
  document.body.appendChild(probe);
  let max = 0;
  STAGES.forEach((stage) => {
    probe.textContent = stage.name;
    max = Math.max(max, probe.offsetWidth);
  });
  probe.remove();
  tableNameWidthCache = Math.ceil(max);
  return tableNameWidthCache;
}

function tableNumWidth() {
  const probe = document.createElement("span");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;font:500 12px 'Roboto Flex', 'Segoe UI', sans-serif;white-space:nowrap;font-variant-numeric:tabular-nums";
  document.body.appendChild(probe);
  let sample = "8888";
  if (state.numberCount >= 2) sample += " 100%";
  if (state.numberCount >= 3) sample += " 100%";
  probe.textContent = sample;
  const w = Math.ceil(probe.offsetWidth);
  probe.remove();
  return w;
}

const state = {
  view: "funnel",
  ...VIEW_DEFAULTS.funnel,
  volumes: VIEW_DEFAULTS.funnel.volumes.slice(),
  byView: {
    current: { ...VIEW_DEFAULTS.current, volumes: VIEW_DEFAULTS.current.volumes.slice() },
    funnel: { ...VIEW_DEFAULTS.funnel, volumes: VIEW_DEFAULTS.funnel.volumes.slice() },
    horizontal: { ...VIEW_DEFAULTS.horizontal, volumes: VIEW_DEFAULTS.horizontal.volumes.slice() },
    columns: { ...VIEW_DEFAULTS.columns, volumes: VIEW_DEFAULTS.columns.volumes.slice() }
  },
  charts: [],
  forceRebuild: false
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

function ribbonPaint(stage) {
  if (state.richColor) return { fill: stage.richFill, hover: stage.richHover };
  return { fill: stage.backgroundColor, hover: stage.backgroundColorActive };
}

function usesLabelOverlay() {
  return state.view === "current" || state.view === "funnel";
}

function pct(n) {
  if (!Number.isFinite(n)) return "";
  return `${Math.round(100 * n)}%`;
}

function pctFine(n) {
  if (!Number.isFinite(n)) return "";
  const v = 100 * n;
  if (Math.abs(v - Math.round(v)) < 0.05) return `${Math.round(v)}%`;
  return `${v.toFixed(1)}%`;
}

function hexAlpha(hex, a) {
  const n = String(hex || "").replace("#", "");
  if (n.length !== 6) return `rgba(34, 37, 51, ${a})`;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
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
  return "linear count, then a px floor";
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
  if (state.labels === "table") return { width: "100%", center: ["50%", "50%"] };
  if (state.labels === "inside") return { width: "62%", center: ["50%", "50%"] };
  if (state.labels === "side") return { width: "48%", center: ["38%", "50%"] };
  return { width: "52%", center: ["36%", "50%"] };
}

function tableGutters() {
  return { left: tableNameWidth() + 8, right: tableNumWidth() + 8 };
}

function applyTableVars(frame) {
  if (!frame) return;
  frame.style.setProperty("--table-name-w", `${tableNameWidth()}px`);
}

function paintTableChrome(svg, slices, frame, frameBox) {
  const ns = "http://www.w3.org/2000/svg";
  const width = frame.clientWidth;
  const ready = slices.filter((s) => s.box);
  for (let i = 0; i < ready.length - 1; i++) {
    const y = (ready[i].box.bottom + ready[i + 1].box.top) / 2 - frameBox.top;
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", String(y));
    line.setAttribute("x2", String(width));
    line.setAttribute("y2", String(y));
    line.setAttribute("stroke", COLORS.grey[3]);
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
  }
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

  const table = state.labels === "table";
  const gutters = tableGutters();

  return {
    credits: { enabled: false },
    exporting: { enabled: false },
    accessibility: { enabled: false },
    chart: {
      type: "columnrange",
      inverted: true,
      height,
      animation: false,
      backgroundColor: "transparent",
      marginLeft: table ? gutters.left : 10,
      marginRight: table ? gutters.right : state.labels === "inside" ? 12 : 210,
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

function funnelOptions(stages, height) {
  const values = displayYs(stages.map((s) => s.value));
  const layout = shapeLayout();
  const table = state.labels === "table";
  const gutters = tableGutters();
  const shape = {
    type: "funnel",
    name: "Funnel",
    animation: false,
    turboThreshold: 0,
    cursor: CURSOR,
    borderWidth: 1,
    borderColor: "#fff",
    width: layout.width,
    height: "90%",
    center: layout.center,
    reversed: false,
    neckWidth: `${state.neckWidth}%`,
    neckHeight: `${state.neckHeight}%`,
    borderRadius: { radius: FUNNEL_RADIUS, scope: "stack" },
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

  return {
    credits: { enabled: false },
    exporting: { enabled: false },
    accessibility: { enabled: false },
    chart: {
      type: "funnel",
      height,
      animation: false,
      backgroundColor: "transparent",
      spacing: table ? [6, gutters.right, 6, gutters.left] : [8, 8, 8, 8],
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

function clearBridges(chart) {
  if (!chart || !chart.bridgeShapes) return;
  chart.bridgeShapes.forEach((el) => {
    if (el && el.destroy) el.destroy();
  });
  chart.bridgeShapes = [];
}

function drawColumnBridges(chart) {
  clearBridges(chart);
  if (!chart || !chart.renderer || !chart.series[0]) return;
  const points = chart.series[0].points.filter((p) => p.shapeArgs);
  if (points.length < 2) return;
  chart.bridgeShapes = [];
  const base = chart.plotTop + points[0].shapeArgs.y + points[0].shapeArgs.height;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i].shapeArgs;
    const b = points[i + 1].shapeArgs;
    const x1 = chart.plotLeft + a.x + a.width;
    const y1 = chart.plotTop + a.y;
    const x2 = chart.plotLeft + b.x;
    const y2 = chart.plotTop + b.y;
    const fill = chart.renderer
      .path(["M", x1, y1, "L", x2, y2, "L", x2, base, "L", x1, base, "Z"])
      .attr({
        fill: "rgba(34, 37, 51, 0.06)",
        zIndex: 0
      })
      .add();
    const slope = chart.renderer
      .path(["M", x1, y1, "L", x2, y2])
      .attr({
        stroke: "#8B93B4",
        "stroke-width": 1,
        "stroke-dasharray": "2,4",
        fill: "none",
        zIndex: 1
      })
      .add();
    chart.bridgeShapes.push(fill, slope);
  }
  if (chart.series[0].group && chart.series[0].group.toFront) {
    chart.series[0].group.toFront();
  }
}

function syncColumnAnno(chart, stages) {
  const anno = document.getElementById("col-anno");
  if (!anno || !chart || !chart.series[0]) return;
  const points = chart.series[0].points;
  const bits = [];
  const n = points.length;
  const colW = n ? chart.plotWidth / n : 0;
  points.forEach((point, i) => {
    const a = point.shapeArgs;
    if (!a) return;
    const stage = stages[i];
    const left = chart.plotLeft + i * colW;
    const top = chart.plotTop + chart.plotHeight + 6;
    bits.push(`<button type="button" class="col-foot" data-cstage="${i}" title="${stage.name}" style="left:${left}px;width:${colW}px;top:${top}px">
      <span class="val">${stage.value}</span>
      <span class="name">${stage.name}</span>
    </button>`);
  });
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i].shapeArgs;
    const b = points[i + 1].shapeArgs;
    if (!a || !b) continue;
    const x1 = chart.plotLeft + a.x + a.width;
    const x2 = chart.plotLeft + b.x;
    const y1 = chart.plotTop + a.y;
    const y2 = chart.plotTop + b.y;
    const base = chart.plotTop + a.y + a.height;
    const midX = (x1 + x2) / 2;
    const midY = Math.min((Math.min(y1, y2) + base) / 2, chart.plotTop + chart.plotHeight - 16);
    const rate = stages[i].passValuePercent;
    bits.push(`<span class="col-rate" style="left:${midX}px;top:${midY}px">${pct(rate)}</span>`);
  }
  anno.innerHTML = bits.join("");
  anno.classList.remove("hidden");
}

function hideColumnAnno() {
  const anno = document.getElementById("col-anno");
  if (!anno) return;
  anno.classList.add("hidden");
  anno.innerHTML = "";
}

function columnFunnelOptions(stages, height) {
  const values = displayYs(stages.map((s) => s.value));
  return {
    credits: { enabled: false },
    exporting: { enabled: false },
    accessibility: { enabled: false },
    chart: {
      type: "column",
      height,
      animation: false,
      backgroundColor: "transparent",
      marginTop: 16,
      marginRight: 10,
      marginBottom: 128,
      marginLeft: 10,
      events: {
        render() {
          const chart = this;
          requestAnimationFrame(() => {
            drawColumnBridges(chart);
            syncColumnAnno(chart, stages);
          });
        }
      }
    },
    title: { text: undefined },
    legend: { enabled: false },
    xAxis: {
      categories: stages.map((s) => s.name),
      lineWidth: 0,
      tickLength: 0,
      labels: { enabled: false }
    },
    yAxis: {
      visible: false,
      min: 0,
      startOnTick: false,
      endOnTick: false,
      maxPadding: 0.08
    },
    tooltip: sharedTooltip(),
    plotOptions: {
      column: {
        animation: false,
        cursor: CURSOR,
        borderWidth: 0,
        borderRadius: 0,
        grouping: false,
        pointPadding: 0.04,
        groupPadding: 0.16,
        crisp: false,
        states: { hover: { brightness: 0, halo: false }, inactive: { opacity: 1 } }
      }
    },
    series: [
      {
        type: "column",
        name: "Reached",
        turboThreshold: 0,
        dataLabels: { enabled: false },
        point: { events: pointEvents() },
        data: stages.map((stage, i) => {
          const p = paint(stage);
          return {
            y: values[i],
            name: stage.name,
            color: p.fill,
            custom: { type: "step", step: stage },
            states: { hover: { color: p.hover, brightness: 0 } }
          };
        })
      }
    ]
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

function spreadYs(centers, heights, minY, maxY) {
  const n = centers.length;
  if (!n) return [];
  const ys = centers.slice();
  const half = (i) => Math.max(8, heights[i] / 2);
  for (let i = 1; i < n; i++) {
    const need = ys[i - 1] + half(i - 1) + half(i) + 4;
    if (ys[i] < need) ys[i] = need;
  }
  const lastBottom = ys[n - 1] + half(n - 1);
  if (lastBottom > maxY) {
    const shift = lastBottom - maxY;
    for (let i = 0; i < n; i++) ys[i] -= shift;
  }
  for (let i = n - 2; i >= 0; i--) {
    const need = ys[i + 1] - half(i) - half(i + 1) - 4;
    if (ys[i] > need) ys[i] = need;
  }
  const firstTop = ys[0] - half(0);
  if (firstTop < minY) {
    const shift = minY - firstTop;
    for (let i = 0; i < n; i++) ys[i] += shift;
  }
  return ys;
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

function drawTableRule(svg, y, width) {
  const ns = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(ns, "line");
  line.setAttribute("x1", "0");
  line.setAttribute("y1", String(y));
  line.setAttribute("x2", String(width));
  line.setAttribute("y2", String(y));
  line.setAttribute("stroke", "#E1E3EA");
  line.setAttribute("stroke-width", "1");
  svg.appendChild(line);
}

function floatTip() {
  return document.getElementById("float-tip");
}

function showFloatTip(html, x, y) {
  const tip = floatTip();
  if (!tip) return;
  tip.innerHTML = html;
  tip.classList.remove("hidden");
  const pad = 14;
  const w = tip.offsetWidth;
  const h = tip.offsetHeight;
  let left = x + pad;
  let top = y + pad;
  if (left + w > window.innerWidth - 8) left = x - w - pad;
  if (top + h > window.innerHeight - 8) top = y - h - pad;
  tip.style.left = `${Math.max(8, left)}px`;
  tip.style.top = `${Math.max(8, top)}px`;
}

function hideFloatTip() {
  const tip = floatTip();
  if (!tip) return;
  tip.classList.add("hidden");
  tip.innerHTML = "";
}

function streamBand(x0, x1, top0, top1, bot0, bot1) {
  const mx = (x0 + x1) / 2;
  return `M ${x0} ${top0} C ${mx} ${top0}, ${mx} ${top1}, ${x1} ${top1} L ${x1} ${bot1} C ${mx} ${bot1}, ${mx} ${bot0}, ${x0} ${bot0} Z`;
}

function renderHorizontal(container, stages) {
  container.innerHTML = `
    <div class="hfunnel">
      <div class="hfunnel-head">
        ${stages
          .map(
            (stage, i) => `<button type="button" class="hfunnel-col" data-hstage="${i}" title="${stage.name}">
              <div class="meta">
                <span class="swatch" style="background:${stage.color}"></span>
                <span class="label">${stage.name}</span>
              </div>
              <div class="value">${stage.value}</div>
            </button>`
          )
          .join("")}
      </div>
      <div class="hfunnel-body">
        <div class="hfunnel-grid">${stages.map(() => "<span></span>").join("")}</div>
        <svg class="hfunnel-svg"></svg>
        <div class="hfunnel-pills"></div>
      </div>
    </div>`;
  layoutHorizontal(container, stages);
  bindHorizontal(container, stages);
}

function layoutHorizontal(container, stages) {
  const body = container.querySelector(".hfunnel-body");
  const svg = container.querySelector(".hfunnel-svg");
  const pills = container.querySelector(".hfunnel-pills");
  if (!body || !svg || !pills) return;
  const w = Math.max(1, body.clientWidth);
  const h = Math.max(1, body.clientHeight);
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  const ns = "http://www.w3.org/2000/svg";
  svg.innerHTML = "";
  pills.innerHTML = "";

  const weights = displayYs(stages.map((s) => s.value));
  const maxW = Math.max(...weights, 1);
  const maxThick = Math.max(24, Math.min(h * 0.72, h - 28));
  const minThick = 8;
  const thick = (i) => Math.max(minThick, maxThick * (weights[i] / maxW));
  const cy = h / 2;
  const colW = w / stages.length;
  const first = stages[0].value;
  const lastI = stages.length - 1;

  const glow = document.createElementNS(ns, "g");
  const core = document.createElementNS(ns, "g");
  svg.appendChild(glow);
  svg.appendChild(core);

  stages.forEach((stage, i) => {
    const x0 = i * colW;
    const x1 = (i + 1) * colW;
    const t0 = thick(i);
    const t1 = i < lastI ? thick(i + 1) : t0;
    const top0 = cy - t0 / 2;
    const bot0 = cy + t0 / 2;
    const top1 = cy - t1 / 2;
    const bot1 = cy + t1 / 2;
    const fill = ribbonPaint(stage).fill;
    [18, 10].forEach((pad, gi) => {
      const path = document.createElementNS(ns, "path");
      path.setAttribute(
        "d",
        streamBand(x0, x1, top0 - pad, top1 - pad, bot0 + pad, bot1 + pad)
      );
      path.setAttribute("fill", hexAlpha(fill, gi === 0 ? 0.1 : 0.2));
      path.setAttribute("pointer-events", "none");
      glow.appendChild(path);
    });
    const band = document.createElementNS(ns, "path");
    band.setAttribute("d", streamBand(x0, x1, top0, top1, bot0, bot1));
    band.setAttribute("fill", fill);
    band.setAttribute("class", "hfunnel-core");
    band.setAttribute("data-hstage", String(i));
    band.setAttribute("data-fill", fill);
    core.appendChild(band);

    const share = first ? stage.value / first : NaN;
    const pill = document.createElement("span");
    pill.className = "hfunnel-pill";
    pill.textContent = pctFine(share);
    pill.style.left = `${x0 + colW / 2}px`;
    pill.style.top = `${cy}px`;
    pills.appendChild(pill);
  });

  const lastFill = ribbonPaint(stages[lastI]).fill;
  const lastT = thick(lastI);
  const capX = w;
  const addCap = (parent, pad, fill, interactive) => {
    const r = lastT / 2 + pad;
    const cap = document.createElementNS(ns, "path");
    cap.setAttribute("d", `M ${capX} ${cy - r} A ${r} ${r} 0 0 1 ${capX} ${cy + r} Z`);
    cap.setAttribute("fill", fill);
    if (interactive) {
      cap.setAttribute("class", "hfunnel-core");
      cap.setAttribute("data-hstage", String(lastI));
      cap.setAttribute("data-fill", lastFill);
    } else {
      cap.setAttribute("pointer-events", "none");
    }
    parent.appendChild(cap);
  };
  addCap(glow, 18, hexAlpha(lastFill, 0.1), false);
  addCap(glow, 10, hexAlpha(lastFill, 0.2), false);
  addCap(core, 0, lastFill, true);
}

function bindHorizontal(container, stages) {
  const setHot = (i, on) => {
    const stage = stages[i];
    const cores = container.querySelectorAll(`.hfunnel-core[data-hstage="${i}"]`);
    const col = container.querySelector(`.hfunnel-col[data-hstage="${i}"]`);
    if (col) col.classList.toggle("is-hot", on);
    cores.forEach((core) => {
      const base = core.getAttribute("data-fill");
      const hot = ribbonPaint(stage).hover;
      core.setAttribute("fill", on ? hot : base);
    });
  };
  container.querySelectorAll("[data-hstage]").forEach((el) => {
    const i = Number(el.dataset.hstage);
    const stage = stages[i];
    el.addEventListener("mouseenter", (e) => {
      setHot(i, true);
      showFloatTip(tooltipHtml(stage), e.clientX, e.clientY);
    });
    el.addEventListener("mousemove", (e) => {
      showFloatTip(tooltipHtml(stage), e.clientX, e.clientY);
    });
    el.addEventListener("mouseleave", () => {
      setHot(i, false);
      hideFloatTip();
    });
    el.addEventListener("click", () => openDrawer(stage));
  });
}

function hideLabelOverlay(frame) {
  const list = frame && frame.querySelector(".label-col");
  const svg = frame && frame.querySelector(".label-lines");
  if (list) {
    list.classList.add("hidden");
    list.innerHTML = "";
  }
  if (svg) {
    svg.innerHTML = "";
    svg.style.maskImage = "";
    svg.style.webkitMaskImage = "";
  }
}

function syncLabels(chart) {
  const frame = (chart && chart.renderTo && chart.renderTo.closest && chart.renderTo.closest(".chart-frame")) ||
    document.getElementById("single");
  if (!usesLabelOverlay()) {
    hideLabelOverlay(frame);
    return;
  }
  if (!chart || !chart.series || !chart.series[0] || !chart.series[0].points) return;
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
      if (mode === "table") {
        return `<li class="hc-name" data-stage="${stage.name}"><span class="hc-row-name">${stage.name}</span><span></span>${stageNumsHtml(stage)}</li>`;
      }
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
    if (!el) return { point, el: null, box: null, cy: 0, edge: 0 };
    const face = graphicFace(el);
    const box = (face || el).getBoundingClientRect();
    const cy = box.top + box.height / 2 - frameBox.top;
    const yAbs = frameBox.top + cy;
    return { el, box, cy, edge: rightEdgeAtY(el, yAbs) - frameBox.left, point };
  });

  if (mode === "table") {
    applyTableVars(frame);
    svg.style.maskImage = "none";
    svg.style.webkitMaskImage = "none";
    slices.forEach((slice, i) => {
      const li = list.children[i];
      if (!li || !slice.el) return;
      const top = slice.box.top - frameBox.top;
      li.style.left = "0";
      li.style.right = "0";
      li.style.width = "100%";
      li.style.top = `${top}px`;
      li.style.height = `${slice.box.height}px`;
      li.style.transform = "none";
      li.style.textAlign = "left";
    });
    paintTableChrome(svg, slices, frame, frameBox);
    return;
  }

  const colLeft = (slices.length ? Math.max(...slices.map((s) => s.edge)) : 0) + CONNECTOR;

  slices.forEach((slice, i) => {
    const li = list.children[i];
    if (!li || !slice.el) return;
    const { box, edge } = slice;
    const sliceLeft = box.left - frameBox.left;
    li.style.transform = "none";
    li.style.right = "auto";
    li.style.width = "auto";
    if (mode === "inside") {
      const width = Math.max(48, box.width - 12);
      li.style.left = `${sliceLeft + box.width / 2}px`;
      li.style.width = `${width}px`;
      li.style.textAlign = "center";
    } else if (mode === "side") {
      li.style.left = `${edge + CONNECTOR}px`;
      li.style.textAlign = "left";
    } else {
      li.style.left = `${colLeft}px`;
      li.style.textAlign = "left";
    }
    li.style.top = "0";
  });

  const heights = [...list.children].map((li) => li.offsetHeight || 16);
  const placed = spreadYs(
    slices.map((s) => s.cy),
    heights,
    8,
    frame.clientHeight - 8
  );

  slices.forEach((slice, i) => {
    const li = list.children[i];
    if (!li || !slice.el) return;
    const { cy, edge } = slice;
    const ly = placed[i];
    const color = slice.point.custom.step.color;

    if (mode === "inside") {
      li.style.top = `${ly}px`;
      li.style.transform = "translate(-50%, -50%)";
      return;
    }

    li.style.top = `${ly - li.offsetHeight / 2}px`;
    if (mode === "side") {
      const left = edge + CONNECTOR;
      drawStripe(svg, edge, cy, left - 2, ly, color);
      return;
    }

    drawStripe(svg, edge, cy, colLeft - 4, ly, color);
  });
}

function destroyCharts() {
  state.charts.forEach((chart) => {
    if (chart && chart.destroy) {
      clearBridges(chart);
      chart.destroy();
    }
  });
  state.charts = [];
  hideFloatTip();
  hideColumnAnno();
  const el = document.getElementById("chart-main");
  if (el) el.innerHTML = "";
}

function specBody() {
  const type =
    state.view === "current"
      ? "columnrange (inverted)"
      : state.view === "horizontal"
        ? "custom SVG stream (not Highcharts)"
        : state.view === "columns"
          ? "column"
          : "funnel";
  const modules =
    state.view === "current"
      ? "highcharts.js, highcharts-more.js"
      : state.view === "horizontal"
        ? "none. Horizontal funnel is custom SVG. Highcharts has no horizontal funnel series."
        : state.view === "columns"
          ? "highcharts.js. Bridges are chart.renderer.path on render. No extra module."
          : "highcharts.js, modules/funnel.js";
  const height =
    state.view === "current"
      ? "equal bar height (production). Width encodes count."
      : state.view === "horizontal"
        ? `stream thickness uses Height mode (${state.heightMode}). Each stage is an equal-width column.`
        : state.view === "columns"
          ? `column height uses Height mode (${state.heightMode}). Equal-width bars. Gray trapezoid + dotted slope fill the gap.`
          : state.heightMode === "share"
            ? "raw y = count (linear / arithmetic). Thin stages (Hired=2) become a sliver."
            : state.heightMode === "progressive"
              ? "y = sqrt(count). Order stays, 42 vs 2 is ~4.6× height instead of 21×."
              : state.heightMode === "progfloor"
                ? `progressive + min height: y = sqrt(count), then reserve 8 × ${state.minHeightPx}px and split leftover by compressed share.`
                : `proportional min height: reserve 8 × ${state.minHeightPx}px, leftover plot (~${FUNNEL_PLOT_HEIGHT}px) split by count. Highcharts y is adjusted.`;
  const neck =
    state.view === "funnel"
      ? `neckWidth: '${state.neckWidth}%', neckHeight: '${state.neckHeight}%'${
          state.neckHeight === 0 ? " (truncated triangle)" : " (bottle)"
        }`
      : state.view === "horizontal"
        ? "blunt end: last column stays at last-stage thickness, floor 0% of max. Rounded cap. Never tapers to a point."
        : state.view === "columns"
          ? "n/a. Gap between bars is the drop-off. Slope can go up if the next stage is larger."
          : "n/a";
  const radius =
    state.view === "funnel"
      ? `borderRadius: { radius: ${FUNNEL_RADIUS}, scope: 'stack' } (outer silhouette)`
      : state.view === "columns"
        ? "borderRadius: 0 (square bars, LinkedIn-style)"
        : "n/a";
  const volumes = `${state.volumes.join(", ")}${
    state.addLater ? ` → stacked ${stackedVolumes().join(", ")}` : ""
  }`;
  const labelNums =
    state.numberCount === 1 ? "count" : state.numberCount === 2 ? "count + pass %" : "count + pass % + drop %";
  const labels =
    state.view === "horizontal"
      ? "column headers: name + count. White pills: share of first stage."
      : state.view === "columns"
        ? "under each bar: count + name. In the gap: pass % (this stage → next). Highcharts dataLabels off."
        : state.labels === "inside"
          ? "HTML overlay, centered in the slice. Color dot on. Highcharts dataLabels off."
          : state.labels === "side"
            ? `HTML overlay at true slice edge + ${CONNECTOR}px. Equal-length colored connectors, docked to the silhouette at mid-Y.`
            : state.labels === "table"
              ? "grey-300 rules, full opacity, no fade. Name flush left edge, count flush right edge. 8px gap to the silhouette only."
              : `HTML overlay, one vertical column at max(edge) + ${CONNECTOR}px. Colored connectors from true edge to the column. Number columns: ${state.splitNumbers ? "on (name | numbers, 8px gap)" : "off"}.`;

  return `Highcharts 12.5.0
modules: ${modules}

chart.type: ${type}

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
  combine: ${state.addLater ? "on (each y/label = this stage + all after it)" : "off"}
  labels/tooltip follow displayed counts

Hover
  fill: next token step (richHover or backgroundColorActive)
  extra stroke: none
  halo: off
  brightness: 0

Labels
  ${labels}
  numbers shown: ${state.numberCount} → ${labelNums}
  fills: ${state.richColor ? "rich tokens (step 5–6)" : "production pale tokens (step 1–2)"}

Click
  point.click → openDrawer({ reportTitle })
  whole fill is the hit target`;
}

function clampVolume(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(VOLUME_MAX, Math.max(0, Math.round(n)));
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

function setVolume(i, n) {
  state.volumes[i] = clampVolume(n);
  syncVolumeFields();
  render();
}

function viewSnapshot() {
  return {
    labels: state.labels,
    heightMode: state.heightMode,
    minHeightPx: state.minHeightPx,
    richColor: state.richColor,
    splitNumbers: state.splitNumbers,
    numberCount: state.numberCount,
    volumes: state.volumes.slice(),
    addLater: state.addLater,
    neckWidth: state.neckWidth,
    neckHeight: state.neckHeight
  };
}

function applyViewSettings(saved) {
  state.labels = saved.labels;
  state.heightMode = saved.heightMode;
  state.minHeightPx = saved.minHeightPx;
  state.richColor = saved.richColor;
  state.splitNumbers = saved.splitNumbers;
  state.numberCount = saved.numberCount;
  state.volumes = saved.volumes.slice();
  state.addLater = saved.addLater;
  state.neckWidth = saved.neckWidth;
  state.neckHeight = saved.neckHeight;
}

function syncControls() {
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.view === state.view));
  });
  document.querySelectorAll("[data-labels]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.labels === state.labels));
  });
  document.querySelectorAll("[data-height]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.height === state.heightMode));
  });
  document.querySelectorAll("[data-numbers]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(Number(btn.dataset.numbers) === state.numberCount));
  });
  document.getElementById("richColor").checked = state.richColor;
  document.getElementById("splitNumbers").checked = state.splitNumbers;
  document.getElementById("addLater").checked = state.addLater;
  document.getElementById("minHeightPx").value = String(state.minHeightPx);
  syncVolumeFields();
}

function switchView(view) {
  if (view === state.view) return;
  state.byView[state.view] = viewSnapshot();
  state.view = view;
  applyViewSettings(state.byView[view]);
  state.forceRebuild = true;
  syncControls();
  render();
}

function chartType() {
  if (state.view === "current") return "columnrange";
  if (state.view === "funnel") return "funnel";
  if (state.view === "columns") return "column";
  return state.view;
}

function setShown(id, on) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("is-off", !on);
}

function render() {
  const stages = liveStages();
  const host = document.getElementById("chart-main");
  const frame = document.getElementById("single");
  const horizontal = state.view === "horizontal";
  const funnel = state.view === "funnel";
  const columns = state.view === "columns";
  const overlay = usesLabelOverlay();
  document.getElementById("spec-body").textContent = specBody();
  document.getElementById("numbers-hint").textContent = numbersHint();
  document.getElementById("height-hint").textContent = heightHint();
  setShown("labels-row", overlay);
  setShown("height-row", funnel || horizontal || columns);
  setShown("numbers-row", overlay);
  setShown("minpx-toggle", (funnel || horizontal || columns) && usesMinHeight());
  setShown("cols-toggle", overlay && state.labels === "line");
  frame.classList.toggle("is-horizontal", horizontal);
  frame.classList.toggle("is-columns", columns);
  frame.classList.toggle("is-table", overlay && state.labels === "table");
  if (overlay && state.labels === "table") applyTableVars(frame);
  host.classList.toggle("is-horizontal", horizontal);
  if (!overlay) hideLabelOverlay(frame);
  if (!columns) hideColumnAnno();

  if (horizontal) {
    destroyCharts();
    renderHorizontal(host, stages);
    return;
  }

  const options =
    state.view === "current"
      ? currentOptions(stages, CHART_HEIGHT)
      : state.view === "columns"
        ? columnFunnelOptions(stages, CHART_HEIGHT)
        : funnelOptions(stages, CHART_HEIGHT);
  const existing = state.charts[0];
  const rebuild =
    state.forceRebuild ||
    state.labels === "table" ||
    !existing ||
    !existing.series[0] ||
    existing.series[0].type !== chartType();
  state.forceRebuild = false;
  if (!rebuild && existing) {
    existing.update(options, true, false, false);
    requestAnimationFrame(() => syncLabels(existing));
    return;
  }
  destroyCharts();
  state.charts = [Highcharts.chart("chart-main", options)];
}

function bind() {
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });
  document.querySelectorAll("[data-labels]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.labels = btn.dataset.labels;
      state.forceRebuild = true;
      document.querySelectorAll("[data-labels]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  document.querySelectorAll("[data-height]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.heightMode = btn.dataset.height;
      document.querySelectorAll("[data-height]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  document.querySelectorAll("[data-numbers]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.numberCount = Number(btn.dataset.numbers);
      document.querySelectorAll("[data-numbers]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });
  renderVolumeGrid();
  syncControls();
  document.getElementById("volume-grid").addEventListener("input", (e) => {
    const el = e.target.closest("[data-volume]");
    if (!el) return;
    if (el.type === "number" && el.value === "") return;
    setVolume(Number(el.dataset.volume), Number(el.value));
  });
  document.getElementById("volume-reset").addEventListener("click", () => {
    state.volumes = VIEW_DEFAULTS[state.view].volumes.slice();
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
    if (state.view === "horizontal") render();
    else if (state.view === "columns") {
      state.charts.forEach((chart) => {
        if (chart && chart.reflow) chart.reflow();
        drawColumnBridges(chart);
        syncColumnAnno(chart, liveStages());
      });
    } else {
      state.charts.forEach((chart) => syncLabels(chart));
    }
  });
  document.getElementById("mask").addEventListener("click", closeDrawer);
  document.getElementById("drawer-close").addEventListener("click", closeDrawer);
  document.getElementById("col-anno").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cstage]");
    if (!btn) return;
    const stage = liveStages()[Number(btn.dataset.cstage)];
    if (stage) openDrawer(stage);
  });
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
