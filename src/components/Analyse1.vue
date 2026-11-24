
<template>
  <div class="analysis-container">

    <!-- Einleitung -->
    <header class="analysis-header">
      <p class="analysis-label">
        03 / ANALYSE 01
      </p>

      <h2>
        Wie viele Tickets<br />
        <span>gehen eigentlich ein?</span>
      </h2>

      <p class="analysis-description">
        Bevor wir Prozesse verbessern können,
        müssen wir erst einmal verstehen,
        wann und wie viel Arbeit überhaupt anfällt.

        In dieser Analyse schauen wir uns an,
        wie viele Tickets pro Woche eröffnet
        werden und welche Schwankungen dabei
        auftreten.
      </p>
    </header>

    <!-- Ticket Eröffnungen -->
    <section class="analysis-card">
      <h3>Wöchentliche Ticketanalyse</h3>

      <p>
        Hier sehen wir die Anzahl der Tickets, die pro Woche eröffnet wurden.
      </p>

      <div class="tableau-wrapper">
        <tableau-viz
          src="https://public.tableau.com/views/Custumer_Support_Example/Blatt1?:showVizHome=no"
          toolbar="bottom"
          hide-tabs
        ></tableau-viz>
      </div>
      
    </section>

<!-- Analyse und Handlungsempfehlungen -->
<section class="insights-section">
  <div class="insights-header">
    <span class="insights-label">DATENINTERPRETATION</span>
    <h3>Was lässt sich aus der Ticketanalyse ableiten?</h3>
  </div>

  <div class="insights-text">
    <p>
      Anhand der wöchentlichen Ticketzahlen lässt sich nachvollziehen,
      in welchen Zeiträumen ein erhöhtes Ticketaufkommen auftritt
      und wann möglicherweise freie Kapazitäten entstehen.
    </p>

    <p>
      Unser Datensatz umfasst lediglich zwei Jahre.
      Dennoch können wir versuchen, bestimmte Muster zu erkennen,
      beispielsweise in den letzten Dezemberwochen der Jahre
      <strong>2024 und 2025</strong>.
    </p>

    <p>
      Auch Auffälligkeiten, wie am
      <strong>20. Oktober 2025</strong> oder in der Woche ab dem
      <strong>17. November 2025</strong>, lassen sich genauer untersuchen.
    </p>

    <p>
      In der Praxis können solche Abweichungen auf äußere Faktoren
      zurückzuführen sein. Ohne zusätzliche Hintergrundinformationen
      können wir über deren Ursachen jedoch nur Vermutungen anstellen.
    </p>

    <div class="insights-note">
      <span class="note-title">Einordnung der Daten</span>
      <p>
        Die limettengrüne Linie zeigt den gleitenden Durchschnitt
        der vorherigen vier Wochen und dient als Orientierung.
        Um wiederkehrende Muster zuverlässig zu identifizieren,
        benötigen wir Daten aus weiteren Jahren.
      </p>
    </div>
  </div>

  <div class="insights-actions">
    <span class="insights-label">HANDLUNGSEMPFEHLUNGEN</span>
    <h3>Welche Maßnahmen können wir daraus ableiten?</h3>
    <p class="actions-intro">
      Die gewonnenen Erkenntnisse können Unternehmen dabei unterstützen,
      ihre Ressourcen gezielter einzusetzen und betriebliche
      Abläufe zu optimieren.
    </p>

    <div class="actions-grid">
      <article class="action-card">
        <span class="action-number">01</span>
        <h4>Personalplanung</h4>
        <p>
          Personelle Ressourcen entsprechend dem erwarteten
          Ticketaufkommen einplanen, um mögliche Engpässe
          frühzeitig zu berücksichtigen.
        </p>
      </article>

      <article class="action-card">
        <span class="action-number">02</span>
        <h4>Urlaubsplanung</h4>
        <p>
          Zeiträume mit geringerem Ticketaufkommen
          bei der Planung und Abstimmung von
          Urlaubszeiten berücksichtigen.
        </p>
      </article>

      <article class="action-card">
        <span class="action-number">03</span>
        <h4>Weiterbildung</h4>
        <p>
          Ruhigere Phasen gezielt für Schulungen,
          Weiterbildungsmaßnahmen und die fachliche
          Entwicklung der Mitarbeitenden nutzen.
        </p>
      </article>

      <article class="action-card">
        <span class="action-number">04</span>
        <h4>Interne Projekte</h4>
        <p>
          Verfügbare Kapazitäten für interne Projekte,
          Prozessoptimierungen und die Verbesserung
          bestehender Dokumentationen einsetzen.
        </p>
      </article>
    </div>
  </div>
</section>

   

    <!-- Optimierung -->
    <section class="optimization-card">
      <p class="analysis-label">
        OPTIMIERUNGSPOTENZIAL
      </p>

      <h3>Und was machen wir mit diesen Informationen?</h3>

      <p>
        Wenn wir wissen, wann besonders viele
        Tickets eingehen, können wir überlegen,
        wie sich der Support besser darauf
        vorbereiten lässt.
      </p>

      <p>
        Eine Möglichkeit wäre, in regelmäßig
        stark belasteten Zeiträumen zusätzliche
        personelle Kapazitäten einzuplanen.
        In ruhigeren Phasen könnten dagegen
        andere Aufgaben stärker berücksichtigt
        werden.
      </p>

      <p class="analysis-highlight">
        Dabei geht es nicht darum, sofort eine
        Lösung festzulegen, sondern erst zu
        verstehen, ob und wo eine Anpassung
        überhaupt sinnvoll wäre.
      </p>
    </section>

  </div>
</template>

<style scoped>

/* Analysebereich */
.insights-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #1c3440;
  color: #d7e3e9;
}

.insights-header {
  margin-bottom: 24px;
}

.insights-label {
  display: inline-block;
  margin-bottom: 12px;
  color: #22d3ee;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.insights-section h3 {
  margin: 0 0 20px;
  color: #ffffff;
  font-size: 1.5rem;
  line-height: 1.4;
}

.insights-text p,
.actions-intro {
  margin: 0 0 18px;
  color: #bdcbd2;
  font-size: 1rem;
  line-height: 1.9;
}

.insights-text strong {
  color: #ffffff;
  font-weight: 600;
}

/* Hinweis zum gleitenden Durchschnitt */
.insights-note {
  margin-top: 28px;
  padding: 22px 24px;
  background: #0d2029;
  border-left: 3px solid #a3e635;
  border-radius: 0 10px 10px 0;
}

.note-title {
  display: block;
  margin-bottom: 10px;
  color: #a3e635;
  font-size: 0.9rem;
  font-weight: 700;
}

.insights-note p {
  margin: 0;
  font-size: 0.95rem;
}

/* Handlungsempfehlungen  */
.insights-actions {
  margin-top: 52px;
}

.actions-intro {
  margin-bottom: 28px;
}

/* Karten */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.action-card {
  padding: 26px;
  background: #0c1c24;
  border: 1px solid #1c3440;
  border-radius: 12px;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}

.action-card:hover {
  border-color: #22d3ee;
  transform: translateY(-3px);
}

.action-number {
  display: block;
  margin-bottom: 18px;
  color: #22d3ee;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.action-card h4 {
  margin: 0 0 12px;
  color: #ffffff;
  font-size: 1.1rem;
}

.action-card p {
  margin: 0;
  color: #aabdc7;
  font-size: 0.94rem;
  line-height: 1.75;
}

/* Responsive Design */
@media (max-width: 700px) {
  .insights-section {
    margin-top: 32px;
    padding-top: 24px;
  }

  .insights-section h3 {
    font-size: 1.25rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .action-card {
    padding: 22px;
  }

  .insights-note {
    padding: 18px;
  }
}


.tableau-placeholder {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;

  background: #101b22;
  border: 1px dashed #29414a;
  border-radius: 10px;

  color: #a6b0bb;
  font-size: 16px;
}

.analysis-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px;
}

/* Einleitung */
.analysis-header {
  max-width: 850px;
  margin-bottom: 50px;
}

.analysis-label {
  color: #22d3ee;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

h2 {
  color: #f5f7fa;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 1.1;
  letter-spacing: -2px;
}

h2 span {
  color: #b5fa35;
}

.analysis-description {
  color: #a6b0bb;
  font-size: 18px;
  line-height: 1.8;
  white-space: pre-line;
}

/* Analyse-Karten */
.analysis-card {
  background: rgba(14, 25, 32, 0.75);
  border: 1px solid #203640;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 30px;
}

h3 {
  color: #f5f7fa;
  font-size: 26px;
  margin: 0 0 20px;
}

.analysis-card p,
.optimization-card p {
  color: #a6b0bb;
  font-size: 16px;
  line-height: 1.8;
}

/* Tableau */
.tableau-wrapper {
  width: 100%;
  margin-top: 30px;
  overflow-x: auto;
  border-radius: 10px;
}

tableau-viz {
  display: block;
  width: 100%;
  height: 850px;
}

/* Fragestellungen */
.questions-section {
  margin: 65px 0;
}

.question-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 30px;
}

.question-card {
  background: rgba(14, 25, 32, 0.75);
  border: 1px solid #203640;
  border-radius: 14px;
  padding: 30px;
}

.question-card span {
  color: #b5fa35;
  font-size: 22px;
  font-weight: 700;
}

.question-card h4 {
  color: #f5f7fa;
  font-size: 20px;
  margin: 20px 0 12px;
}

.question-card p {
  color: #a6b0bb;
  line-height: 1.7;
}

/* Optimierung */
.optimization-card {
  margin-top: 72px;
  background: rgba(181, 250, 53, 0.04);
  border: 1px solid #465528;
  border-radius: 16px;
  padding: 36px;
}

.optimization-card .analysis-highlight {
  color: #b5fa35;
  font-weight: 600;
  margin-top: 25px;
}

/* Mobile Ansicht */
@media (max-width: 768px) {
  .analysis-container {
    padding: 70px 20px;
  }

  .question-grid {
    grid-template-columns: 1fr;
  }

  .analysis-card,
  .question-card,
  .optimization-card {
    padding: 24px;
  }

  .optimization-card {
    margin-top: 48px;
  }

  tableau-viz {
    height: 750px;
  }
}
</style>
