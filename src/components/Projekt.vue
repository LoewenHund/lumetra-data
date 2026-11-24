
<template>
  <div class="project-container">

    <div class="project-content">

      <p class="project-label">
        02 / ÜBER DAS PROJEKT
      </p>

      <h2>
        Was werden wir untersuchen ? <br />
        
        <span>Kurzer Überblick</span>
      </h2>

      <p class="project-description">
       Im weiteren Verlauf werden wir die Informationen aus Tableau auswerten,
        um daraus Erkenntnisse zu gewinnen.
      </p>
    <p class="project-description">
        Ob sich daraus tatsächlich Verbesserungsmöglichkeiten ergeben?  <br>
        Genau das werden wir uns in den einzelnen Analysen gemeinsam anschauen.
    </p>


      <p class="project-description">
        Natürlich haben wir nicht alle Informationen, die wir für eine vollständige
         Analyse bräuchten. Aber genau das macht es für mich interessant: herauszufinden,
          was wir mit den vorhandenen Daten trotzdem erkennen können und wo wir genauer hinschauen müssten.
      </p>

      <p class="project-description">
      Die Kunst besteht darin, aus den wenigen vorhandenen Daten 
      dennoch den größtmöglichen Nutzen zu ziehen und fundierte Schlussfolgerungen abzuleiten.
      </p>

    </div>

  </div>
   <section class="project-impact">

    <div class="impact-heading">
      <span class="impact-label">WARUM DATENANALYSE?</span>
      <h2>Wenn kleine Abweichungen große Folgen haben</h2>
    </div>

    <div class="impact-story">
      <p>
        Eine fehlende oder fehlerhafte Datenanalyse kann
        weitreichende Folgen haben.
      </p>

      <p class="impact-emphasis">
        Was zunächst wie eine unbedeutende Schwankung
        im Ticketaufkommen erscheint, kann sich schnell
        zu einem ernsthaften Problem entwickeln.
      </p>

      <div class="impact-warning">
        <span class="warning-label">DIE MÖGLICHEN FOLGEN</span>

        <p>
          Personelle Engpässe bleiben unentdeckt,
          die Arbeitsbelastung steigt und
          Bearbeitungszeiten verlängern sich.
        </p>

        <p>
          Die Folgen?
          <strong>
            Überlastete Mitarbeitende, unzufriedene Kunden
            und steigende Betriebskosten.
          </strong>
        </p>
      </div>

      <p class="impact-consequence">
        Aus kleinen Fehlentscheidungen können so
        erhebliche wirtschaftliche Schäden entstehen.
      </p>

      <div class="impact-solution">
        <span class="solution-label">DER MEHRWERT DER DATENANALYSE</span>

        <h3>Probleme erkennen, bevor sie entstehen.</h3>

        <p>
          Genau hier setzt die Datenanalyse an:
          Sie macht Entwicklungen sichtbar, bevor sie
          zu kostspieligen Problemen werden, und schafft
          die Grundlage, um rechtzeitig und gezielt
          zu handeln.
        </p>
      </div>
      
    </div>

  </section>
  
</template>



<style scoped>

.project-container {
  max-width: 1200px;
  min-height: 85vh;
  margin: 0 auto;
  padding: 100px 24px;

  display: flex;
  align-items: center;
}

.project-content {
  max-width: 850px;
}

.project-label {
  color: #22d3ee;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

h2 {
  color: #f5f7fa;
  font-size: clamp(38px, 5vw, 68px);
  line-height: 1.12;
  letter-spacing: -2px;
  margin: 0 0 36px;
}

h2 span {
  color: #b5fa35;
}

.project-description {
  color: #a6b0bb;
  font-size: 17px;
  line-height: 1.8;
  margin-bottom: 22px;
}

.project-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;

  margin-top: 20px;
  padding: 16px 26px;

  background: #22d3ee;
  color: #05080b;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  border-radius: 10px;

  transition: 0.2s ease;
}

.project-button:hover {
  background: #b5fa35;
  transform: translateY(-2px);
}

/* Mobile Ansicht */
@media (max-width: 768px) {
  .project-container {
    min-height: auto;
    padding: 70px 24px;
  }

  h2 {
    letter-spacing: -1px;
  }

  .project-description {
    font-size: 16px;
  }
}

.project-impact {
  width: 100%;
  max-width: 1100px;
  margin: 60px auto;
  padding: 40px;
  box-sizing: border-box;

  background: #0b171d;
  border: 1px solid #1c3440;
  border-radius: 16px;
  color: #d7e3e9;
}

.impact-heading {
  margin-bottom: 30px;
}

.impact-label,
.solution-label {
  display: block;
  margin-bottom: 14px;
  color: #22d3ee;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.impact-heading h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.35;
}

.impact-story p {
  margin: 0 0 22px;
  color: #bdcbd2;
  font-size: 1rem;
  line-height: 1.9;
}

.impact-emphasis {
  font-size: 1.15rem !important;
  color: #ffffff !important;
  font-weight: 500;
}

/* Konsequenzen */
.impact-warning {
  margin: 32px 0;
  padding: 28px;
  background: #24171b;
  border-left: 4px solid #f87171;
  border-radius: 0 12px 12px 0;
}

.warning-label {
  display: block;
  margin-bottom: 16px;
  color: #f87171;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.impact-warning p {
  color: #f0d8db;
}

.impact-warning p:last-child {
  margin-bottom: 0;
}

.impact-warning strong {
  color: #ffffff;
}

/* Höhepunkt */
.impact-consequence {
  margin: 36px 0 !important;
  color: #ffffff !important;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem) !important;
  font-weight: 700;
  line-height: 1.6 !important;
}

/* Lösung */
.impact-solution {
  margin-top: 32px;
  padding: 30px;
  background: #0d252b;
  border: 1px solid #21606b;
  border-radius: 12px;
}

.impact-solution h3 {
  margin: 0 0 16px;
  color: #ffffff;
  font-size: 1.35rem;
}

.impact-solution p {
  margin: 0;
  color: #c2d9df;
}

@media (max-width: 700px) {
  .project-impact {
    padding: 24px;
    margin: 32px auto;
  }

  .impact-warning,
  .impact-solution {
    padding: 20px;
  }
}
</style>
