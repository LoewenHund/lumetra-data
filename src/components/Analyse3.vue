<template>
  <div class="analysis-three-container">
    <header class="analysis-three-header">
      <p class="analysis-label">05 / ANALYSE 03 · AGENTENVERGLEICH</p>

      <h2>
        Leistung vergleichen.<br />
        <span>Stärken sichtbar machen.</span>
      </h2>

      <p class="analysis-description">
        Zwölf Support-Agenten werden anhand von fünf Kennzahlen verglichen.
        Die Ansicht zeigt Rangfolgen, Abstände zum Teamdurchschnitt und
        individuelle Leistungsprofile. Alle Elemente werden direkt in Vue
        berechnet und dargestellt.
      </p>
    </header>

    <section class="dashboard-section">
      <div class="section-heading">
        <div>
          <span class="section-label">RANGLISTE</span>
          <h3>Welche Agenten liegen vorne?</h3>
        </div>

        <p>
          Wähle eine Kennzahl. Die Top 3 und unteren 3 beziehen sich immer
          auf diese Kennzahl; die Sortierung ändert nur die Reihenfolge.
        </p>
      </div>

      <div class="metric-tabs" role="group" aria-label="Kennzahl auswählen">
        <button
          v-for="metric in metricOptions"
          :key="metric.key"
          type="button"
          :class="['metric-tab', { active: activeMetric === metric.key }]"
          :aria-pressed="activeMetric === metric.key"
          @click="activeMetric = metric.key"
        >
          <span>{{ metric.shortLabel }}</span>
          <small>{{ metric.label }}</small>
        </button>
      </div>

      <div class="ranking-controls">
        <div class="control-group">
          <span>Sortierung</span>
          <div class="segmented-control">
            <button
              type="button"
              :class="{ active: sortDirection === 'desc' }"
              @click="sortDirection = 'desc'"
            >
              Höchste Werte zuerst
            </button>
            <button
              type="button"
              :class="{ active: sortDirection === 'asc' }"
              @click="sortDirection = 'asc'"
            >
              Niedrigste Werte zuerst
            </button>
          </div>
        </div>

        <div class="control-group">
          <span>Umfang</span>
          <div class="segmented-control">
            <button
              v-for="mode in viewModes"
              :key="mode.key"
              type="button"
              :class="{ active: viewMode === mode.key }"
              @click="viewMode = mode.key"
            >
              {{ mode.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="ranking-layout">
        <div class="ranking-card">
          <div class="ranking-card-header">
            <div>
              <span>{{ activeMetricDefinition.label }}</span>
              <small>{{ visibleAgents.length }} von 12 Agenten</small>
            </div>
            <span class="team-average">
              Team Ø {{ formatScore(teamMetricAverage) }}
            </span>
          </div>

          <div class="ranking-list">
            <button
              v-for="agent in visibleAgents"
              :key="agent.id"
              type="button"
              :class="['ranking-row', { selected: isSelected(agent.id) }]"
              @click="toggleAgent(agent.id)"
            >
              <span class="rank-number">{{ rankFor(agent.id) }}</span>

              <span class="agent-identity">
                <strong>{{ agent.id }}</strong>
                <small>{{ supportingValue(agent, activeMetric) }}</small>
              </span>

              <span class="score-track" aria-hidden="true">
                <i :style="{ width: `${Math.max(2, scoreFor(agent))}%` }"></i>
              </span>

              <span class="score-block">
                <strong>{{ formatScore(scoreFor(agent)) }}</strong>
                <small :class="deltaFor(agent) >= 0 ? 'positive' : 'negative'">
                  {{ formatDelta(deltaFor(agent)) }} zum Ø
                </small>
              </span>
            </button>
          </div>
        </div>

        <aside class="metric-summary-card">
          <span class="summary-kicker">AUSGEWÄHLTE KENNZAHL</span>
          <h4>{{ activeMetricDefinition.label }}</h4>
          <p>{{ activeMetricDefinition.description }}</p>

          <dl>
            <div>
              <dt>Höchster Wert</dt>
              <dd>
                <strong>{{ activeSummary.best.id }}</strong>
                <span>{{ formatScore(activeSummary.best.value) }}</span>
              </dd>
            </div>
            <div>
              <dt>Teamdurchschnitt</dt>
              <dd>
                <strong>12 Agenten</strong>
                <span>{{ formatScore(activeSummary.average) }}</span>
              </dd>
            </div>
            <div>
              <dt>Niedrigster Wert</dt>
              <dd>
                <strong>{{ activeSummary.worst.id }}</strong>
                <span>{{ formatScore(activeSummary.worst.value) }}</span>
              </dd>
            </div>
          </dl>

          <div class="spread-indicator">
            <span>Spannweite</span>
            <strong>{{ formatScore(activeSummary.spread) }} Punkte</strong>
          </div>
        </aside>
      </div>
    </section>

    <section class="comparison-section">
      <div class="section-heading">
        <div>
          <span class="section-label">DIREKTER VERGLEICH</span>
          <h3>Bis zu drei Agenten gegenüberstellen</h3>
        </div>

        <p>
          Wähle im Karussell bis zu drei Agenten aus oder klicke sie in der Rangliste an.
          Der Teamdurchschnitt bleibt als Referenz im Diagramm sichtbar.
        </p>
      </div>

      <!-- Horizontales Agenten-Karussell: Auswahl bleibt mit der Rangliste synchron -->
      <div class="agent-carousel">
        <div class="carousel-heading">
          <div>
            <span class="carousel-kicker">AGENTEN AUSWÄHLEN</span>
            <p>{{ selectedAgentIds.length }} von maximal 3 ausgewählt</p>
          </div>
          <div class="carousel-navigation" aria-label="Agentenauswahl verschieben">
            <button type="button" aria-label="Nach links scrollen" @click="scrollAgents(-1)">←</button>
            <button type="button" aria-label="Nach rechts scrollen" @click="scrollAgents(1)">→</button>
          </div>
        </div>

        <div ref="agentCarousel" class="agent-selector" role="group" aria-label="Agenten vergleichen">
          <button
            v-for="agent in enrichedAgents"
            :key="agent.id"
            type="button"
            :class="{ active: isSelected(agent.id) }"
            :aria-pressed="isSelected(agent.id)"
            :aria-label="`${agent.id} ${isSelected(agent.id) ? 'ausgewählt' : 'zum Vergleich auswählen'}`"
            @click="toggleAgent(agent.id)"
          >
            <span class="agent-choice-id">{{ agent.id.replace('Agent-', '') }}</span>
            <span class="agent-choice-name">{{ agent.id }}</span>
            <span class="agent-choice-state" aria-hidden="true">{{ isSelected(agent.id) ? '✓ Ausgewählt' : '+ Vergleichen' }}</span>
          </button>
        </div>
        <p class="carousel-hint">Tipp: Du kannst die Agenten auch durch Wischen oder horizontales Scrollen wechseln. Bei einer vierten Auswahl wird der zuerst gewählte Agent ersetzt.</p>
      </div>

      <div class="comparison-layout">
        <div class="radar-card">
          <AgentRadar
            :agents="selectedAgents"
            :metrics="metricDefinitions"
            :team-average="teamAverage"
          />
        </div>

        <div class="selected-agent-list">
          <article
            v-for="(agent, index) in selectedAgents"
            :key="agent.id"
            class="selected-agent-card"
            :style="{ '--agent-color': comparisonColors[index] }"
          >
            <div class="selected-agent-header">
              <div>
                <span>GESAMTWERTUNG</span>
                <h4>{{ agent.id }}</h4>
              </div>
              <strong>{{ formatScore(agent.overall) }}</strong>
            </div>

            <div class="agent-highlights">
              <div>
                <span>Stärkste Kategorie</span>
                <strong>{{ insightFor(agent).strongest.label }}</strong>
                <small>{{ formatScore(insightFor(agent).strongest.value) }}</small>
              </div>
              <div>
                <span>Entwicklungsfeld</span>
                <strong>{{ insightFor(agent).weakest.label }}</strong>
                <small>{{ formatScore(insightFor(agent).weakest.value) }}</small>
              </div>
            </div>

            <div class="agent-metrics">
              <div v-for="metric in metricDefinitions" :key="metric.key">
                <span>{{ metric.shortLabel }}</span>
                <i>
                  <b :style="{ width: `${agent[metric.key]}%` }"></b>
                </i>
                <strong>{{ formatScore(agent[metric.key]) }}</strong>
              </div>
            </div>

            <p class="resolution-time">
              Durchschnittliche Lösungszeit:
              <strong>{{ formatHours(agent.averageResolutionHours) }}</strong>
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="category-section">
      <div class="section-heading">
        <div>
          <span class="section-label">KATEGORIEÜBERSICHT</span>
          <h3>Bestwert, Durchschnitt und Schlusswert</h3>
        </div>

        <p>
          Die Karten zeigen, wie weit die zwölf Agenten in jeder Kategorie
          auseinanderliegen.
        </p>
      </div>

      <div class="category-grid">
        <article
          v-for="summary in categorySummaries"
          :key="summary.key"
          class="category-card"
        >
          <div class="category-card-heading">
            <span>{{ summary.position }}</span>
            <h4>{{ summary.label }}</h4>
          </div>

          <div class="category-leader">
            <span>Höchster Wert</span>
            <strong>{{ summary.best.id }}</strong>
            <b>{{ formatScore(summary.best.value) }}</b>
          </div>

          <div class="category-scale" aria-hidden="true">
            <i :style="{ left: `${summary.worst.value}%` }"></i>
            <i class="average" :style="{ left: `${summary.average}%` }"></i>
            <i class="best" :style="{ left: `${summary.best.value}%` }"></i>
          </div>

          <div class="category-foot">
            <span>
              Niedrigster Wert
              <strong>{{ summary.worst.id }} · {{ formatScore(summary.worst.value) }}</strong>
            </span>
            <span>
              Team Ø
              <strong>{{ formatScore(summary.average) }}</strong>
            </span>
          </div>
        </article>
      </div>
    </section>

    <details class="methodology">
      <summary>
        <span class="method-icon">ⓘ</span>
        <span>
          <strong>Berechnung und Einordnung</strong>
          <small>Wie entstehen Rangfolge und Gesamtwertung?</small>
        </span>
        <b>⌄</b>
      </summary>

      <div class="methodology-content">
        <p>
          Die Gesamtwertung ist der gleichgewichtete Durchschnitt der fünf
          Kennzahlen. Jede Kategorie fließt mit 20 Prozent ein. Die Rangfolge
          beschreibt damit nur die hier ausgewählten Messgrößen.
        </p>
        <p>
          Die Lösungsgeschwindigkeit basiert auf der durchschnittlichen
          Lösungszeit. Der schnellste Agent erhält 100 Punkte, der langsamste
          0 Punkte. Alle übrigen Werte werden proportional dazwischen eingeordnet.
        </p>
        <p>
          Hohe oder niedrige Werte sollten immer zusammen mit Ticketkomplexität,
          Aufgabenverteilung und weiteren Rahmenbedingungen betrachtet werden.
        </p>
      </div>
    </details>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AgentRadar from './analysis3/AgentRadar.vue'
import { agentMetrics, metricDefinitions } from '../data/agentMetrics.js'

const comparisonColors = ['#22d3ee', '#b5fa35', '#a78bfa']

const metricOptions = [
  {
    key: 'overall',
    label: 'Gesamtwertung',
    shortLabel: 'Gesamt',
    description: 'Gleichgewichteter Durchschnitt aus allen fünf Vergleichskategorien.'
  },
  ...metricDefinitions
]

const viewModes = [
  { key: 'all', label: 'Alle 12' },
  { key: 'top', label: 'Top 3' },
  { key: 'bottom', label: 'Untere 3' }
]

const activeMetric = ref('overall')
const sortDirection = ref('desc')
const viewMode = ref('all')
const selectedAgentIds = ref(['Agent-03', 'Agent-08'])
const agentCarousel = ref(null)

function scrollAgents(direction) {
  const element = agentCarousel.value
  if (!element) return
  const card = element.querySelector('button')
  const distance = card ? card.getBoundingClientRect().width + 12 : 180
  element.scrollBy({ left: direction * distance * 3, behavior: 'smooth' })
}

const enrichedAgents = computed(() =>
  agentMetrics.map((agent) => ({
    ...agent,
    overall:
      metricDefinitions.reduce((sum, metric) => sum + agent[metric.key], 0) /
      metricDefinitions.length
  }))
)

const activeMetricDefinition = computed(
  () => metricOptions.find((metric) => metric.key === activeMetric.value) ?? metricOptions[0]
)

const teamAverage = computed(() => {
  const averages = { id: 'Teamdurchschnitt' }

  metricDefinitions.forEach((metric) => {
    averages[metric.key] = average(
      enrichedAgents.value.map((agent) => agent[metric.key])
    )
  })

  averages.overall = average(enrichedAgents.value.map((agent) => agent.overall))
  return averages
})

const teamMetricAverage = computed(() => teamAverage.value[activeMetric.value])

const descendingAgents = computed(() =>
  [...enrichedAgents.value].sort(
    (a, b) => b[activeMetric.value] - a[activeMetric.value]
  )
)

const visibleAgents = computed(() => {
  // Zuerst die Gruppe anhand der gewählten Kennzahl bestimmen.
  // Die Sortierung beeinflusst anschließend nur die Reihenfolge.
  let agents = [...descendingAgents.value]

  if (viewMode.value === 'top') agents = agents.slice(0, 3)
  if (viewMode.value === 'bottom') agents = agents.slice(-3)

  if (sortDirection.value === 'asc') agents.reverse()

  return agents
})

const selectedAgents = computed(() =>
  selectedAgentIds.value
    .map((id) => enrichedAgents.value.find((agent) => agent.id === id))
    .filter(Boolean)
)

const activeSummary = computed(() => {
  const sorted = descendingAgents.value
  const values = sorted.map((agent) => agent[activeMetric.value])

  return {
    best: { id: sorted[0].id, value: sorted[0][activeMetric.value] },
    worst: {
      id: sorted[sorted.length - 1].id,
      value: sorted[sorted.length - 1][activeMetric.value]
    },
    average: average(values),
    spread: Math.max(...values) - Math.min(...values)
  }
})

const categorySummaries = computed(() =>
  metricDefinitions.map((metric, index) => {
    const sorted = [...enrichedAgents.value].sort(
      (a, b) => b[metric.key] - a[metric.key]
    )
    const values = sorted.map((agent) => agent[metric.key])

    return {
      ...metric,
      position: String(index + 1).padStart(2, '0'),
      best: { id: sorted[0].id, value: sorted[0][metric.key] },
      worst: {
        id: sorted[sorted.length - 1].id,
        value: sorted[sorted.length - 1][metric.key]
      },
      average: average(values),
      spread: Math.max(...values) - Math.min(...values)
    }
  })
)

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function scoreFor(agent) {
  return agent[activeMetric.value]
}

function rankFor(agentId) {
  return descendingAgents.value.findIndex((agent) => agent.id === agentId) + 1
}

function deltaFor(agent) {
  return scoreFor(agent) - teamMetricAverage.value
}

function isSelected(agentId) {
  return selectedAgentIds.value.includes(agentId)
}

function toggleAgent(agentId) {
  if (isSelected(agentId)) {
    if (selectedAgentIds.value.length === 1) return
    selectedAgentIds.value = selectedAgentIds.value.filter((id) => id !== agentId)
    return
  }

  if (selectedAgentIds.value.length === 3) {
    selectedAgentIds.value = [...selectedAgentIds.value.slice(1), agentId]
    return
  }

  selectedAgentIds.value = [...selectedAgentIds.value, agentId]
}

function insightFor(agent) {
  const values = metricDefinitions
    .map((metric) => ({ ...metric, value: agent[metric.key] }))
    .sort((a, b) => b.value - a.value)

  return {
    strongest: values[0],
    weakest: values[values.length - 1]
  }
}

function supportingValue(agent, metricKey) {
  if (metricKey === 'overall') return 'Durchschnitt aus 5 Kennzahlen'
  if (metricKey === 'resolvedTickets') return `${agent.resolvedCount} abgeschlossene Tickets`
  if (metricKey === 'customerSatisfaction') {
    return `${formatDecimal(1 + agent.customerSatisfaction / 25, 2)} von 5 Punkten`
  }
  if (metricKey === 'resolutionSpeed') {
    return `${formatHours(agent.averageResolutionHours)} Lösungszeit`
  }

  return `${formatScore(agent[metricKey])} %`
}

function formatScore(value) {
  return formatDecimal(value, 1)
}

function formatHours(value) {
  return `${formatDecimal(value, 1)} Std.`
}

function formatDelta(value) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${formatDecimal(value, 1)}`
}

function formatDecimal(value, digits) {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value)
}
</script>

<style scoped>
.analysis-three-container {
  display: grid;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 110px 24px;
  box-sizing: border-box;
}

.analysis-three-header {
  max-width: 920px;
}

.analysis-label,
.section-label,
.summary-kicker {
  display: block;
  margin: 0 0 18px;
  color: #22d3ee;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.analysis-three-header h2 {
  margin: 0 0 28px;
  color: #f5f7fa;
  font-size: clamp(42px, 5vw, 70px);
  line-height: 1.08;
  letter-spacing: -2px;
}

.analysis-three-header h2 span {
  color: #b5fa35;
}

.analysis-description {
  max-width: 850px;
  margin: 0;
  color: #a6b0bb;
  font-size: 18px;
  line-height: 1.8;
}

.dashboard-section,
.comparison-section,
.category-section {
  min-width: 0;
  padding: 36px;
  box-sizing: border-box;
  background: rgba(8, 22, 28, 0.94);
  border: 1px solid #1c3440;
  border-radius: 18px;
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 1.1fr);
  gap: 42px;
  align-items: end;
}

.section-heading h3 {
  margin: 0;
  color: #f5f7fa;
  font-size: clamp(26px, 3vw, 34px);
  line-height: 1.25;
}

.section-heading p {
  margin: 0;
  color: #9eb0b9;
  font-size: 15px;
  line-height: 1.8;
}

.metric-tabs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  margin-top: 34px;
}

.metric-tab {
  min-width: 0;
  padding: 15px 12px;
  color: #8fa4ae;
  background: #0b1c24;
  border: 1px solid #193540;
  border-radius: 10px;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.metric-tab:hover {
  transform: translateY(-2px);
  border-color: #2b5a68;
}

.metric-tab.active {
  color: #e9fbff;
  background: #102a34;
  border-color: #22d3ee;
  box-shadow: inset 0 -2px 0 #22d3ee;
}

.metric-tab span,
.metric-tab small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-tab span {
  margin-bottom: 5px;
  color: #22d3ee;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.metric-tab small {
  font-size: 12px;
}

.ranking-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 24px 0;
  padding: 18px;
  background: #07151b;
  border: 1px solid #17313b;
  border-radius: 12px;
}

.control-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.control-group > span {
  color: #6f8792;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.segmented-control {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: #0b2028;
  border-radius: 8px;
}

.segmented-control button {
  padding: 8px 12px;
  color: #8ea2ad;
  background: transparent;
  border: 0;
  border-radius: 6px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.segmented-control button.active {
  color: #071116;
  background: #b5fa35;
  font-weight: 700;
}

.ranking-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(270px, 0.7fr);
  gap: 20px;
  align-items: start;
}

.ranking-card,
.metric-summary-card,
.radar-card,
.selected-agent-card,
.category-card {
  min-width: 0;
  background: #0b1d25;
  border: 1px solid #1a3641;
  border-radius: 14px;
}

.ranking-card {
  padding: 22px;
}

.ranking-card-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid #18313b;
}

.ranking-card-header > div span,
.ranking-card-header > div small {
  display: block;
}

.ranking-card-header > div span {
  color: #f5f7fa;
  font-weight: 700;
}

.ranking-card-header > div small {
  margin-top: 4px;
  color: #718893;
  font-size: 12px;
}

.team-average {
  padding: 8px 11px;
  color: #22d3ee;
  background: rgba(34, 211, 238, 0.08);
  border-radius: 7px;
  font-size: 12px;
  font-weight: 700;
}

.ranking-list {
  display: grid;
  gap: 7px;
  margin-top: 14px;
}

.ranking-row {
  display: grid;
  grid-template-columns: 34px minmax(150px, 0.8fr) minmax(110px, 1fr) 88px;
  gap: 13px;
  align-items: center;
  width: 100%;
  padding: 11px 12px;
  color: inherit;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 9px;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.ranking-row:hover,
.ranking-row.selected {
  background: #0f2832;
  border-color: #245362;
}

.ranking-row.selected {
  box-shadow: inset 3px 0 0 #22d3ee;
}

.rank-number {
  color: #22d3ee;
  font-size: 13px;
  font-weight: 700;
}

.agent-identity strong,
.agent-identity small,
.score-block strong,
.score-block small {
  display: block;
}

.agent-identity strong {
  color: #ecf4f7;
  font-size: 14px;
}

.agent-identity small {
  margin-top: 3px;
  color: #718893;
  font-size: 10px;
}

.score-track {
  height: 7px;
  overflow: hidden;
  background: #142b34;
  border-radius: 999px;
}

.score-track i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #168fa4, #22d3ee, #b5fa35);
  border-radius: inherit;
}

.score-block {
  text-align: right;
}

.score-block strong {
  color: #f5f7fa;
  font-size: 15px;
}

.score-block small {
  margin-top: 2px;
  font-size: 10px;
}

.positive {
  color: #b5fa35;
}

.negative {
  color: #f48b8b;
}

.metric-summary-card {
  position: sticky;
  top: 100px;
  padding: 26px;
}

.metric-summary-card h4 {
  margin: 0 0 14px;
  color: #f4f8fa;
  font-size: 23px;
}

.metric-summary-card > p {
  margin: 0;
  color: #8da1ab;
  font-size: 13px;
  line-height: 1.7;
}

.metric-summary-card dl {
  display: grid;
  gap: 10px;
  margin: 24px 0;
}

.metric-summary-card dl > div {
  padding: 14px;
  background: #0e2630;
  border: 1px solid #1b3b47;
  border-radius: 9px;
}

.metric-summary-card dt {
  margin-bottom: 8px;
  color: #6e8792;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.metric-summary-card dd {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 0;
  color: #eaf2f5;
  font-size: 13px;
}

.metric-summary-card dd span {
  color: #b5fa35;
  font-weight: 700;
}

.spread-indicator {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding-top: 18px;
  border-top: 1px solid #1a3540;
  color: #78909a;
  font-size: 12px;
}

.spread-indicator strong {
  color: #22d3ee;
}

.agent-selector {
  display: grid;
  grid-template-columns: repeat(12, minmax(44px, 1fr));
  gap: 8px;
  margin: 30px 0 22px;
}

.agent-selector button {
  padding: 10px 5px;
  color: #8197a1;
  background: #0a1b22;
  border: 1px solid #1a3440;
  border-radius: 8px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.agent-selector button:hover {
  border-color: #2b6170;
}

.agent-selector button.active {
  color: #071116;
  background: #22d3ee;
  border-color: #22d3ee;
  font-weight: 800;
}

.comparison-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  gap: 20px;
  align-items: start;
}

.radar-card {
  padding: 22px;
  background:
    radial-gradient(circle at center, rgba(34, 211, 238, 0.05), transparent 60%),
    #07161c;
}

.selected-agent-list {
  display: grid;
  gap: 14px;
}

.selected-agent-card {
  padding: 20px;
  border-left: 3px solid var(--agent-color);
}

.selected-agent-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.selected-agent-header span {
  display: block;
  margin-bottom: 5px;
  color: #6d858f;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.selected-agent-header h4 {
  margin: 0;
  color: #f5f7fa;
  font-size: 19px;
}

.selected-agent-header > strong {
  color: var(--agent-color);
  font-size: 28px;
}

.agent-highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  margin: 16px 0;
}

.agent-highlights > div {
  min-width: 0;
  padding: 11px;
  background: #0e2731;
  border-radius: 8px;
}

.agent-highlights span,
.agent-highlights strong,
.agent-highlights small {
  display: block;
}

.agent-highlights span {
  margin-bottom: 5px;
  color: #6f8791;
  font-size: 9px;
}

.agent-highlights strong {
  overflow: hidden;
  color: #dfeaec;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.agent-highlights small {
  margin-top: 4px;
  color: var(--agent-color);
  font-size: 11px;
  font-weight: 700;
}

.agent-metrics {
  display: grid;
  gap: 7px;
}

.agent-metrics > div {
  display: grid;
  grid-template-columns: 88px minmax(60px, 1fr) 32px;
  gap: 8px;
  align-items: center;
  color: #8499a2;
  font-size: 9px;
}

.agent-metrics i {
  height: 4px;
  overflow: hidden;
  background: #17303a;
  border-radius: 99px;
}

.agent-metrics b {
  display: block;
  height: 100%;
  background: var(--agent-color);
  border-radius: inherit;
}

.agent-metrics strong {
  color: #cbd8dd;
  text-align: right;
}

.resolution-time {
  margin: 15px 0 0;
  padding-top: 13px;
  border-top: 1px solid #18333d;
  color: #758d97;
  font-size: 10px;
}

.resolution-time strong {
  color: #d7e5e9;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 30px;
}

.category-card {
  padding: 23px;
}

.category-card:last-child {
  grid-column: 1 / -1;
}

.category-card-heading {
  display: flex;
  gap: 12px;
  align-items: center;
}

.category-card-heading > span {
  color: #22d3ee;
  font-size: 11px;
  font-weight: 700;
}

.category-card-heading h4 {
  margin: 0;
  color: #f3f7f9;
  font-size: 17px;
}

.category-leader {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  margin: 22px 0 17px;
}

.category-leader span {
  color: #718893;
  font-size: 11px;
}

.category-leader strong {
  color: #dfeaed;
  font-size: 13px;
}

.category-leader b {
  color: #b5fa35;
  font-size: 18px;
}

.category-scale {
  position: relative;
  height: 8px;
  margin: 0 4px 18px;
  background: linear-gradient(90deg, #19333d, #195d6b, #22d3ee, #b5fa35);
  border-radius: 99px;
}

.category-scale i {
  position: absolute;
  top: 50%;
  width: 2px;
  height: 16px;
  background: #f48b8b;
  transform: translate(-50%, -50%);
}

.category-scale i.average {
  background: #f5f7fa;
}

.category-scale i.best {
  background: #b5fa35;
}

.category-foot {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: #6e858f;
  font-size: 10px;
}

.category-foot span:last-child {
  text-align: right;
}

.category-foot strong {
  display: block;
  margin-top: 4px;
  color: #bccbd1;
  font-size: 11px;
}

.methodology {
  overflow: hidden;
  background: #0a1a21;
  border: 1px solid #1b3742;
  border-radius: 13px;
}

.methodology summary {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 22px 25px;
  list-style: none;
  cursor: pointer;
}

.methodology summary::-webkit-details-marker {
  display: none;
}

.methodology summary > span:nth-child(2) {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.methodology summary strong {
  color: #e8f1f4;
  font-size: 14px;
}

.methodology summary small {
  color: #788f99;
  font-size: 12px;
}

.method-icon,
.methodology summary > b {
  color: #22d3ee;
  font-size: 22px;
}

.methodology summary > b {
  transition: transform 0.2s ease;
}

.methodology[open] summary > b {
  transform: rotate(180deg);
}

.methodology-content {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  padding: 0 25px 24px 62px;
}

.methodology-content p {
  margin: 0;
  color: #91a6af;
  font-size: 12px;
  line-height: 1.75;
}

button:focus-visible,
summary:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 3px;
}

@media (max-width: 1000px) {
  .metric-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ranking-layout,
  .comparison-layout {
    grid-template-columns: 1fr;
  }

  .metric-summary-card {
    position: static;
  }

  .agent-selector {
    grid-template-columns: repeat(6, minmax(44px, 1fr));
  }

  .selected-agent-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .analysis-three-container {
    gap: 28px;
    padding: 75px 18px;
  }

  .dashboard-section,
  .comparison-section,
  .category-section {
    padding: 22px;
  }

  .section-heading {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .ranking-controls {
    align-items: flex-start;
    flex-direction: column;
  }

  .control-group {
    align-items: flex-start;
    flex-direction: column;
  }

  .ranking-row {
    grid-template-columns: 28px minmax(120px, 1fr) 72px;
  }

  .score-track {
    display: none;
  }

  .selected-agent-list,
  .category-grid,
  .methodology-content {
    grid-template-columns: 1fr;
  }

  .category-card:last-child {
    grid-column: auto;
  }

  .methodology-content {
    padding-left: 25px;
  }
}

@media (max-width: 480px) {
  .metric-tabs,
  .agent-selector {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .segmented-control {
    width: 100%;
    flex-wrap: wrap;
  }

  .ranking-card {
    padding: 14px;
  }

  .ranking-card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .ranking-row {
    grid-template-columns: 24px minmax(100px, 1fr) 60px;
    gap: 8px;
    padding-inline: 7px;
  }

  .agent-identity small {
    display: none;
  }
}


/* ============================================================
   LUMETRA DATA · ANALYSE 03 · VISUAL REFINEMENT
   Überschreibt gezielt das bisherige Styling, ohne Vue-Logik
   oder das Markup zu verändern.
   ============================================================ */

.analysis-three-container {
  --a3-surface: #0b1921;
  --a3-panel: #10232d;
  --a3-panel-hover: #142d38;
  --a3-line: #23404d;
  --a3-muted: #a9bdc8;
  --a3-text: #f1f7fa;
  --a3-cyan: #22d3ee;
  --a3-lime: #b5fa35;
  gap: 36px;
  max-width: 1240px;
}

.analysis-three-container > * { min-width: 0; }
.analysis-three-header { max-width: 970px; padding-bottom: 12px; }
.analysis-three-header h2 {
  max-width: 1000px;
  font-weight: 800;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.analysis-description { color: #b4c4cc; line-height: 1.85; }

.dashboard-section,
.comparison-section,
.category-section {
  position: relative;
  padding: clamp(24px, 3.5vw, 42px);
  background: linear-gradient(155deg, #0e2029 0%, #0a171e 75%);
  border: 1px solid var(--a3-line);
  border-radius: 20px;
  box-shadow: 0 16px 36px rgba(0,0,0,.13), inset 0 1px 0 rgba(255,255,255,.035);
}
.section-heading { align-items: start; gap: 24px; }
.section-heading h3 { letter-spacing: -.025em; text-wrap: balance; }
.section-heading p { color: var(--a3-muted); font-size: 14px; }
.section-label { margin-bottom: 12px; }

/* Kennzahlenwahl: gleichmäßige, besser lesbare Schaltflächen */
.metric-tabs { gap: 9px; margin-top: 30px; }
.metric-tab {
  min-height: 75px;
  padding: 15px 13px;
  background: #10232c;
  border-color: #26434f;
  border-radius: 12px;
  box-shadow: inset 0 1px rgba(255,255,255,.025);
}
.metric-tab:hover { background: #16323d; border-color: #3894a5; }
.metric-tab.active {
  background: linear-gradient(160deg, #173944, #10303a);
  border-color: var(--a3-cyan);
  box-shadow: inset 0 -3px 0 var(--a3-cyan), 0 0 0 1px rgba(34,211,238,.1);
}
.metric-tab span { font-size: 12px; }
.metric-tab small { color: #c1d2da; font-size: 12px; line-height: 1.4; }

.ranking-controls {
  margin: 24px 0 20px;
  padding: 16px 18px;
  background: #0b1c24;
  border-color: #27434e;
}
.control-group > span { color: #a6b9c3; }
.segmented-control { border: 1px solid #294752; }
.segmented-control button { min-height: 36px; color: #c0d0d8; transition: background .18s ease, color .18s ease; }
.segmented-control button:hover:not(.active) { background: #19323d; color: #fff; }
.segmented-control button.active { box-shadow: 0 2px 8px rgba(0,0,0,.18); }

/* Rangliste und Zusammenfassung */
.ranking-layout { gap: 18px; }
.ranking-card,
.metric-summary-card,
.radar-card,
.selected-agent-card,
.category-card {
  background: var(--a3-panel);
  border: 1px solid var(--a3-line);
  border-radius: 15px;
  box-shadow: inset 0 1px rgba(255,255,255,.025);
}
.ranking-card { padding: 20px; }
.ranking-card-header { padding: 3px 2px 19px; }
.ranking-card-header > div small { color: #a6bcc6; }
.team-average { white-space: nowrap; border: 1px solid #24525f; }
.ranking-list { gap: 4px; }
.ranking-row {
  min-height: 61px;
  grid-template-columns: 32px minmax(130px,.9fr) minmax(90px,1fr) 102px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(92,139,156,.13);
  border-radius: 8px;
}
.ranking-row:last-child { border-bottom-color: transparent; }
.ranking-row:hover { background: #17333f; border-color: #376373; }
.ranking-row.selected { background: #153541; border-color: #3a8798; box-shadow: inset 3px 0 0 var(--a3-cyan); }
.rank-number { font-variant-numeric: tabular-nums; }
.agent-identity { min-width: 0; }
.agent-identity strong { font-size: 14px; }
.agent-identity small {
  overflow: hidden;
  color: #a1b8c3;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.score-track { height: 8px; background: #213e49; }
.score-track i { transition: width .3s ease; }
.score-block strong { font-size: 17px; font-variant-numeric: tabular-nums; }
.score-block small { font-size: 11px; white-space: nowrap; }
.positive { color: #b5fa35; }
.negative { color: #ffa1a7; }

.metric-summary-card { padding: 26px; }
.metric-summary-card h4 { letter-spacing: -.02em; }
.metric-summary-card > p { color: #bed0d9; font-size: 14px; }
.metric-summary-card dl > div {
  padding: 16px;
  background: #142e38;
  border-color: #294954;
  border-radius: 10px;
}
.metric-summary-card dt { color: #a8bdc7; }
.metric-summary-card dd { font-size: 14px; }
.spread-indicator { color: #b1c4cc; }

/* Auswahl für direkten Vergleich */
.agent-selector { gap: 9px; }
.agent-selector button {
  min-height: 42px;
  background: #10242e;
  border-color: #284652;
  border-radius: 10px;
  color: #c4d4dd;
  font-weight: 600;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}
.agent-selector button:hover { background: #173744; border-color: #4c91a1; transform: translateY(-1px); }
.agent-selector button.active { box-shadow: 0 3px 14px rgba(34,211,238,.15); }
.comparison-layout { gap: 18px; }
.radar-card {
  padding: clamp(14px, 2vw, 26px);
  background: radial-gradient(circle at 50% 42%, rgba(34,211,238,.075), transparent 62%), #0c1e27;
}
.selected-agent-list { gap: 16px; }
.selected-agent-card {
  padding: 23px;
  background: linear-gradient(160deg, #122b35, #0e212a);
  border-left: 3px solid var(--agent-color);
}
.selected-agent-header { padding-bottom: 15px; border-bottom: 1px solid #294450; }
.selected-agent-header span { color: #a6bbc5; font-size: 10px; }
.selected-agent-header > strong { font-size: 32px; font-variant-numeric: tabular-nums; }
.agent-highlights { gap: 11px; margin: 18px 0; }
.agent-highlights > div { padding: 13px; background: #183540; border: 1px solid #294752; }
.agent-highlights span { color: #afc1ca; font-size: 10px; }
.agent-highlights strong { font-size: 12px; }
.agent-highlights small { font-size: 12px; }
.agent-metrics { gap: 10px; }
.agent-metrics > div { grid-template-columns: 96px minmax(35px,1fr) 40px; font-size: 11px; }
.agent-metrics i { height: 6px; background: #25424d; }
.agent-metrics strong { font-variant-numeric: tabular-nums; }
.resolution-time { color: #a4bdc8; font-size: 11px; }

/* Kategorieübersicht */
.category-grid { gap: 18px; }
.category-card {
  padding: 25px;
  background: linear-gradient(155deg, #122b35, #0f222b);
  transition: transform .2s ease, border-color .2s ease;
}
.category-card:hover { transform: translateY(-2px); border-color: #3a7380; }
.category-card-heading h4 { font-size: 18px; }
.category-leader span,
.category-foot { color: #a7bbc6; font-size: 12px; }
.category-foot strong { color: #e1edf2; font-size: 12px; }
.category-scale { height: 10px; background: linear-gradient(90deg, #23434f, #227d8f, #22d3ee, #b5fa35); }

/* Methodischer Hinweis */
.methodology {
  background: #0e222b;
  border-color: var(--a3-line);
  border-radius: 14px;
}
.methodology summary { min-height: 72px; }
.methodology summary:hover { background: #15313c; }
.methodology summary strong { font-size: 15px; }
.methodology summary small { color: #a8bdc6; }
.methodology-content { border-top: 1px solid #23414e; padding-top: 22px; }
.methodology-content p { color: #becdd5; font-size: 13px; }

@media (max-width: 1000px) {
  .analysis-three-container { gap: 30px; }
  .metric-tabs { grid-template-columns: repeat(3,minmax(0,1fr)); }
  .selected-agent-list { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (max-width: 720px) {
  .analysis-three-container { padding: 70px 18px; gap: 25px; }
  .dashboard-section, .comparison-section, .category-section { padding: 22px; border-radius: 16px; }
  .ranking-row { grid-template-columns: 28px minmax(110px,1fr) 86px; }
  .selected-agent-list { grid-template-columns: 1fr; }
  .metric-summary-card { position: static; }
  .methodology-content { grid-template-columns: 1fr; padding-left: 25px; }
}
@media (max-width: 480px) {
  .analysis-three-container { padding-inline: 14px; }
  .analysis-three-header h2 { font-size: clamp(35px, 9vw, 48px); letter-spacing: -.04em; }
  .analysis-description { font-size: 16px; }
  .dashboard-section, .comparison-section, .category-section { padding: 16px; }
  .metric-tabs { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .metric-tab { min-height: 70px; }
  .ranking-card { padding: 12px; }
  .ranking-row { gap: 7px; padding-inline: 7px; }
  .rank-number { font-size: 12px; }
  .score-block strong { font-size: 15px; }
  .score-block small { font-size: 9px; }
  .agent-selector { grid-template-columns: repeat(3,minmax(0,1fr)); }
  .agent-highlights { grid-template-columns: 1fr; }
  .agent-metrics > div { grid-template-columns: 80px minmax(25px,1fr) 34px; font-size: 10px; }
  .category-card { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .analysis-three-container *,
  .analysis-three-container *::before,
  .analysis-three-container *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}


/* Agenten-Karussell: horizontal statt zwölf enger Spalten */
.agent-carousel {
  margin: 30px 0 26px;
  padding: 18px;
  border: 1px solid #27434e;
  border-radius: 16px;
  background: linear-gradient(145deg, #0e2530, #0a1b23);
}
.carousel-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.carousel-kicker { color: #22d3ee; font-size: 11px; font-weight: 750; letter-spacing: 1.6px; }
.carousel-heading p { margin: 6px 0 0; font-size: 13px; color: #b9cbd3; }
.carousel-navigation { display: flex; gap: 8px; }
.carousel-navigation button {
  width: 38px; height: 38px; border: 1px solid #315562; border-radius: 10px;
  background: #142f3b; color: #e8f9fc; font-size: 19px;
  cursor: pointer; transition: background .2s ease, border-color .2s ease;
}
.carousel-navigation button:hover { background: #1c4654; border-color: #22d3ee; }
.agent-carousel .agent-selector {
  display: flex; gap: 12px; margin: 18px 0 0;
  overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory; scroll-behavior: smooth;
  scrollbar-width: thin; scrollbar-color: #386a79 transparent;
  padding: 2px 2px 12px;
}
.agent-carousel .agent-selector button {
  flex: 0 0 clamp(145px, 19%, 190px);
  display: flex; flex-direction: column; align-items: flex-start;
  min-height: 104px; padding: 15px 16px; text-align: left;
  scroll-snap-align: start;
  border-radius: 12px; background: #102832; border: 1px solid #2a4854;
  transition: transform .2s ease, background .2s ease, border-color .2s ease;
}
.agent-carousel .agent-selector button:hover { transform: translateY(-2px); background: #163843; }
.agent-carousel .agent-selector button.active {
  color: #eaffff; background: linear-gradient(150deg, #175061, #12333e);
  border-color: #22d3ee; box-shadow: inset 0 0 0 1px rgba(34,211,238,.16);
}
.agent-choice-id { font-size: 22px; font-weight: 800; line-height: 1; color: #e7f9fc; }
.agent-choice-name { margin-top: 8px; color: #a9bec8; font-size: 12px; }
.agent-choice-state { margin-top: auto; padding-top: 11px; color: #79c7d7; font-size: 11px; font-weight: 700; }
.agent-selector button.active .agent-choice-state { color: #b5fa35; }
.carousel-hint { margin: 6px 2px 0; font-size: 12px; line-height: 1.6; color: #9bb3be; }

/* Text in den Ranglisten-Controls darf auf kleinen Screens umbrechen */
.segmented-control button { line-height: 1.4; }
.ranking-row .agent-identity { min-width: 0; }
.ranking-row .agent-identity small { overflow-wrap: anywhere; }
@media (max-width: 720px) {
  .agent-carousel { padding: 15px; }
  .agent-carousel .agent-selector button { flex-basis: 158px; }
  .carousel-navigation button { width: 36px; height: 36px; }
}
@media (max-width: 480px) {
  .agent-carousel .agent-selector button { flex-basis: 145px; }
  .carousel-heading p { font-size: 12px; }
}

</style>
