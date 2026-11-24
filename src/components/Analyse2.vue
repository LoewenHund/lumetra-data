
<template>
  <div class="analysis-two-container">

    <!-- HEADER -->
    <header class="analysis-two-header">
      <p class="analysis-label">
        04 / ANALYSE 02 · TICKETABSCHLÜSSE
      </p>

      <h2>
        Wie viele Tickets<br />
        <span>werden geschlossen?</span>
      </h2>

      <p class="analysis-description">
        Nachdem wir uns das eingehende Ticketvolumen angesehen haben,
        schauen wir uns nun an, wie viele Tickets pro Woche
        abgeschlossen werden.

        Dafür verwenden wir das Abschlussdatum der jeweiligen Tickets.
        So können wir nachvollziehen, wie sich die Anzahl der
        abgeschlossenen Tickets im Laufe der Wochen verändert
        und wie viele Tickets noch offen geblieben sind.
      </p>
    </header>

    <!-- TABLEAU -->
    <section class="closed-tickets-card">
      <h3>Wöchentliche Ticketabschlüsse</h3>

      <p>
        Hier sehen wir die geschlossenen und offen gebliebenen
        Tickets im wöchentlichen Vergleich.
      </p>

      <div class="tableau-wrapper">
        <tableau-viz
          :src="closedTicketsUrl"
          toolbar="bottom"
          hide-tabs
          class="closed-chart"
        ></tableau-viz>
      </div>
    </section>

    <!-- INTERPRETATION -->
    <section class="ticket-insights">
      <span class="insights-label">DATENINTERPRETATION</span>

      <h3>Was verraten uns geschlossene und offene Tickets?</h3>

      <p>
        Die Anzahl geschlossener Tickets gibt uns einen ersten
        Einblick in die abgeschlossenen Vorgänge eines Supportteams.
        Wir erkennen, wie viele Tickets innerhalb eines bestimmten
        Zeitraums abgeschlossen wurden und wie sich diese Anzahl
        im Laufe der Wochen verändert.
      </p>

      <div class="insights-highlight">
        <span>WICHTIG ZU VERSTEHEN</span>
        <p>
          Eine hohe Anzahl geschlossener Tickets bedeutet nicht
          automatisch, dass sämtliche Probleme schnell oder
          effizient gelöst wurden.
        </p>
      </div>

      <p>
        Denn nicht jedes Ticket stellt dieselben Anforderungen.
        Während sich manche Anfragen innerhalb weniger Minuten
        bearbeiten lassen, können komplexe technische Probleme
        mehrere Stunden oder sogar Tage in Anspruch nehmen.
      </p>

      <p>
        Die Schwierigkeit eines Tickets, der erforderliche
        Arbeitsaufwand und mögliche Abhängigkeiten können
        die Bearbeitungsdauer erheblich beeinflussen.
      </p>
    </section>

    <!-- OFFENE TICKETS -->
    <section class="open-tickets-section">
      <span class="insights-label">MÖGLICHE EINFLUSSFAKTOREN</span>

      <h3>Warum bleiben manche Tickets offen?</h3>

      <p class="section-description">
        Ein offenes Ticket bedeutet nicht zwangsläufig,
        dass es unbearbeitet bleibt oder das Supportteam
        überlastet ist. Unterschiedliche Faktoren können
        dazu führen, dass ein Vorgang noch nicht
        abgeschlossen werden kann.
      </p>

      <div class="factors-grid">
        <article
          v-for="factor in factors"
          :key="factor.number"
          class="factor-card"
        >
          <span class="factor-number">
            {{ factor.number }}
          </span>

          <h4>{{ factor.title }}</h4>
          <p>{{ factor.description }}</p>
        </article>
      </div>
    </section>
    

<!-- Aufklappbarer Informationshinweis -->
<details class="analysis-info">
  <summary class="analysis-info-header">
    <span class="info-icon">ⓘ</span>

    <span class="info-heading">
      <strong>Hinweis zur Aussagekraft der Daten</strong>
      <small>Grenzen unserer Ticketanalyse</small>
    </span>

    <span class="info-arrow">⌄</span>
  </summary>

  <div class="analysis-info-content">
    <p>
      Die Anzahl geschlossener Tickets gibt uns einen
      Einblick in das Abschlussvolumen, lässt jedoch
      keine direkten Rückschlüsse auf die Qualität
      des IT-Supports zu.
    </p>

    <p>
      Faktoren wie Ticketkomplexität, Bearbeitungsdauer
      und Kundenzufriedenheit werden in dieser Auswertung
      nicht berücksichtigt.
    </p>

    <p>
      Daher konzentrieren wir uns auf die statistische
      Entwicklung der Ticketabschlüsse, ohne unbelegte
      Annahmen über die tatsächliche Qualität
      der Bearbeitung zu treffen.
    </p>
  </div>
</details>



  </div>
</template>

<script setup>
const closedTicketsUrl =
  'https://public.tableau.com/views/Custumer_Support_Example/GeschlosseneTickets?:showVizHome=no'

const factors = [
  {
    number: '01',
    title: 'Lieferzeiten',
    description:
      'Benötigte Hardware oder Ersatzteile sind möglicherweise noch nicht eingetroffen.'
  },
  {
    number: '02',
    title: 'Abwesenheiten',
    description:
      'Betroffene Personen können aufgrund von Urlaub oder Krankheit vorübergehend nicht erreichbar sein.'
  },
  {
    number: '03',
    title: 'Technische Komplexität',
    description:
      'Die Fehleranalyse oder die Entwicklung einer geeigneten Lösung kann zusätzliche Zeit beanspruchen.'
  },
  {
    number: '04',
    title: 'Externe Abhängigkeiten',
    description:
      'Eine Rückmeldung von Herstellern, Dienstleistern oder anderen Fachabteilungen steht möglicherweise noch aus.'
  },
  {
    number: '05',
    title: 'Priorisierung',
    description:
      'Kritische Störungen werden möglicherweise zuerst bearbeitet, während weniger dringende Anfragen zurückgestellt werden.'
  }
]
</script>

<style scoped>
/* HAUPTCONTAINER */

.analysis-two-container {
  display: grid;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px;
  box-sizing: border-box;
}

.analysis-two-header {
  max-width: 850px;
}

.analysis-label {
  margin: 0 0 20px;
  color: #22d3ee;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

.analysis-two-header h2 {
  margin: 0 0 28px;
  color: #f5f7fa;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 1.1;
  letter-spacing: -2px;
}

.analysis-two-header h2 span {
  color: #b5fa35;
}

.analysis-description {
  margin: 0;
  color: #a6b0bb;
  font-size: 18px;
  line-height: 1.8;
}

/* TABLEAU */

.closed-tickets-card {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 32px;
  background: #0b171d;
  border: 1px solid #1c3440;
  border-radius: 16px;
  color: #d7e3e9;
}

.closed-tickets-card h3 {
  margin: 0 0 20px;
  color: #f5f7fa;
  font-size: 26px;
}

.closed-tickets-card p {
  color: #bdcbd2;
  font-size: 1rem;
  line-height: 1.8;
  margin: 0 0 18px;
}

.tableau-wrapper {
  width: 100%;
  margin-top: 30px;
  overflow-x: auto;
  border-radius: 10px;
}

.closed-chart {
  display: block;
  width: 100%;
  height: 750px;
}

/* GEMEINSAME ABSCHNITTE */

.ticket-insights,
.open-tickets-section,
.limitations-section {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 36px;
  background: #0b171d;
  border: 1px solid #1c3440;
  border-radius: 16px;
}

.insights-label {
  display: block;
  margin-bottom: 16px;
  color: #22d3ee;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.ticket-insights h3,
.open-tickets-section h3,
.limitations-section h3 {
  margin: 0 0 24px;
  color: #f5f7fa;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.3;
}

.ticket-insights > p,
.open-tickets-section > p,
.limitations-section > p {
  color: #bdcbd2;
  font-size: 1rem;
  line-height: 1.9;
  margin: 0 0 20px;
}

/* WICHTIGER HINWEIS */

.insights-highlight {
  margin: 32px 0;
  padding: 24px 28px;
  background: #10242b;
  border-left: 4px solid #b5fa35;
  border-radius: 0 12px 12px 0;
}

.insights-highlight span {
  display: block;
  margin-bottom: 12px;
  color: #b5fa35;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.insights-highlight p {
  margin: 0;
  color: #f5f7fa;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.8;
}

/* EINFLUSSFAKTOREN */

.section-description {
  max-width: 850px;
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 30px;
}

.factor-card {
  min-width: 0;
  padding: 26px;
  box-sizing: border-box;
  background: #0e222c;
  border: 1px solid #1c3440;
  border-radius: 12px;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}

.factor-card:hover {
  border-color: #22d3ee;
  transform: translateY(-3px);
}

.factor-number {
  display: block;
  margin-bottom: 20px;
  color: #22d3ee;
  font-size: 13px;
  font-weight: 700;
}

.factor-card h4 {
  margin: 0 0 12px;
  color: #ffffff;
  font-size: 18px;
}

.factor-card p {
  margin: 0;
  color: #aabdc7;
  font-size: 15px;
  line-height: 1.8;
}

/* DATENVERGLEICH */

.data-comparison {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin: 32px 0;
}

.comparison-card {
  min-width: 0;
  padding: 26px;
  border-radius: 12px;
}

.comparison-card.available {
  background: #102522;
  border: 1px solid #24574a;
}

.comparison-card.missing {
  background: #25191c;
  border: 1px solid #593039;
}

.comparison-label {
  display: block;
  margin-bottom: 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.available .comparison-label {
  color: #b5fa35;
}

.missing .comparison-label {
  color: #f87171;
}

.comparison-card h4 {
  margin: 0 0 20px;
  color: white;
  font-size: 19px;
}

.comparison-card ul {
  margin: 0;
  padding-left: 20px;
}

.comparison-card li {
  margin-bottom: 12px;
  color: #c5d2d7;
  font-size: 15px;
  line-height: 1.6;
}

.comparison-card li:last-child {
  margin-bottom: 0;
}

/* FAZIT */

.analysis-conclusion {
  margin-top: 32px;
  padding: 30px;
  background: #0d252b;
  border: 1px solid #21606b;
  border-radius: 12px;
}

.analysis-conclusion span {
  display: block;
  margin-bottom: 14px;
  color: #22d3ee;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.analysis-conclusion h4 {
  margin: 0 0 18px;
  color: #ffffff;
  font-size: clamp(20px, 2.5vw, 26px);
  line-height: 1.4;
}

.analysis-conclusion p {
  margin: 0 0 16px;
  color: #c2d9df;
  font-size: 1rem;
  line-height: 1.8;
}

.analysis-conclusion p:last-child {
  margin-bottom: 0;
}

/* RESPONSIVE */

@media (max-width: 700px) {
  .analysis-two-container {
    gap: 28px;
    padding: 70px 20px;
  }

  .closed-tickets-card,
  .ticket-insights,
  .open-tickets-section,
  .limitations-section {
    padding: 22px;
  }

  .factors-grid,
  .data-comparison {
    grid-template-columns: 1fr;
  }

  .factor-card,
  .comparison-card {
    padding: 22px;
  }

  .insights-highlight,
  .analysis-conclusion {
    padding: 20px;
  }

  .closed-chart {
    height: 600px;
  }
}



/* Aufklappbarer Info-Block */

.analysis-info {
  width: 100%;
  box-sizing: border-box;
  background: #0b171d;
  border: 1px solid #1c3440;
  border-radius: 12px;
  overflow: hidden;
}

.analysis-info-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 26px;
  cursor: pointer;
  list-style: none;
  transition: background 0.2s ease;
}

.analysis-info-header::-webkit-details-marker {
  display: none;
}

.analysis-info-header::marker {
  content: "";
}

.analysis-info-header:hover {
  background: #10242b;
}

.info-icon {
  color: #22d3ee;
  font-size: 26px;
  line-height: 1;
}

.info-heading {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.info-heading strong {
  color: #f5f7fa;
  font-size: 15px;
  font-weight: 600;
}

.info-heading small {
  color: #8fa5b1;
  font-size: 13px;
}

.info-arrow {
  color: #22d3ee;
  font-size: 24px;
  transition: transform 0.25s ease;
}

.analysis-info[open] .info-arrow {
  transform: rotate(180deg);
}

.analysis-info-content {
  padding: 0 26px 24px 68px;
  color: #bdcbd2;
  font-size: 15px;
  line-height: 1.8;
}

.analysis-info-content p {
  margin: 0 0 14px;
}

.analysis-info-content p:last-child {
  margin-bottom: 0;
}

@media (max-width: 700px) {
  .analysis-info-header {
    padding: 18px;
    gap: 12px;
  }

  .analysis-info-content {
    padding: 0 18px 20px;
  }
}

</style>
