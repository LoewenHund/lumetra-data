<template>
  <div class="radar-shell">
    <svg
      class="radar-svg"
      viewBox="0 0 600 500"
      role="img"
      aria-labelledby="radar-title radar-description"
    >
      <title id="radar-title">Vergleich der ausgewählten Agenten</title>
      <desc id="radar-description">
        Radar-Diagramm mit fünf Leistungskennzahlen und dem Teamdurchschnitt.
      </desc>

      <g class="radar-grid">
        <polygon
          v-for="level in gridLevels"
          :key="level"
          :points="gridPoints(level)"
        />

        <line
          v-for="(_, index) in metrics"
          :key="`axis-${index}`"
          :x1="center.x"
          :y1="center.y"
          :x2="pointAt(100, index).x"
          :y2="pointAt(100, index).y"
        />

        <text
          v-for="level in gridLevels"
          :key="`level-${level}`"
          :x="center.x + 7"
          :y="center.y - radius * (level / 100) + 4"
          class="level-label"
        >
          {{ level }}
        </text>
      </g>

      <polygon
        :points="metricPolygon(teamAverage)"
        class="team-polygon"
      />

      <g
        v-for="(agent, agentIndex) in agents"
        :key="agent.id"
        class="agent-series"
      >
        <polygon
          :points="metricPolygon(agent)"
          :style="seriesStyle(agentIndex)"
        />

        <circle
          v-for="(metric, metricIndex) in metrics"
          :key="`${agent.id}-${metric.key}`"
          :cx="pointAt(agent[metric.key], metricIndex).x"
          :cy="pointAt(agent[metric.key], metricIndex).y"
          r="4"
          :fill="seriesColors[agentIndex]"
        >
          <title>{{ agent.id }} · {{ metric.label }}: {{ formatScore(agent[metric.key]) }}</title>
        </circle>
      </g>

      <text
        v-for="(metric, index) in metrics"
        :key="metric.key"
        :x="labelPoint(index).x"
        :y="labelPoint(index).y"
        :text-anchor="labelAnchor(index)"
        class="axis-label"
      >
        {{ metric.shortLabel }}
      </text>
    </svg>

    <div class="radar-legend" aria-label="Legende">
      <span class="legend-item team">
        <i></i>
        Teamdurchschnitt
      </span>

      <span
        v-for="(agent, index) in agents"
        :key="agent.id"
        class="legend-item"
      >
        <i :style="{ background: seriesColors[index] }"></i>
        {{ agent.id }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  agents: {
    type: Array,
    required: true
  },
  metrics: {
    type: Array,
    required: true
  },
  teamAverage: {
    type: Object,
    required: true
  }
})

const center = { x: 300, y: 235 }
const radius = 160
const gridLevels = [20, 40, 60, 80, 100]
const seriesColors = ['#22d3ee', '#b5fa35', '#a78bfa']

function pointAt(value, index, pointRadius = radius) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / props.metrics.length
  const distance = pointRadius * (Math.max(0, Math.min(100, value)) / 100)

  return {
    x: center.x + Math.cos(angle) * distance,
    y: center.y + Math.sin(angle) * distance
  }
}

function pointsFromValues(values) {
  return values
    .map((value, index) => {
      const point = pointAt(value, index)
      return `${point.x},${point.y}`
    })
    .join(' ')
}

function gridPoints(level) {
  return pointsFromValues(props.metrics.map(() => level))
}

function metricPolygon(agent) {
  return pointsFromValues(props.metrics.map((metric) => agent[metric.key]))
}

function labelPoint(index) {
  return pointAt(100, index, radius + 42)
}

function labelAnchor(index) {
  const x = labelPoint(index).x
  if (Math.abs(x - center.x) < 20) return 'middle'
  return x < center.x ? 'end' : 'start'
}

function seriesStyle(index) {
  const color = seriesColors[index]
  return {
    stroke: color,
    fill: color,
    fillOpacity: 0.1
  }
}

function formatScore(value) {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value)
}
</script>

<style scoped>
.radar-shell {
  width: 100%;
  min-width: 0;
}

.radar-svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: 560px;
  overflow: visible;
}

.radar-grid polygon {
  fill: rgba(34, 211, 238, 0.015);
  stroke: rgba(144, 180, 193, 0.2);
  stroke-width: 1;
}

.radar-grid line {
  stroke: rgba(144, 180, 193, 0.18);
  stroke-width: 1;
}

.level-label {
  fill: #617782;
  font-size: 10px;
}

.team-polygon {
  fill: rgba(148, 163, 184, 0.04);
  stroke: #64748b;
  stroke-width: 2;
  stroke-dasharray: 6 6;
}

.agent-series polygon {
  stroke-width: 3;
  stroke-linejoin: round;
  transition: opacity 0.2s ease;
}

.axis-label {
  fill: #dbe7ec;
  font-size: 13px;
  font-weight: 600;
}

.radar-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 20px;
  margin-top: -8px;
  color: #9fb1ba;
  font-size: 12px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.legend-item i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.legend-item.team i {
  background: #64748b;
}

@media (max-width: 600px) {
  .axis-label {
    font-size: 11px;
  }
}
</style>
