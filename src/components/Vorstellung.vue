
<template>
  <div class="about-container">

    <!-- Persönliche Vorstellung -->
    <div class="about-content">

      <p class="about-label">01 / ÜBER MICH</p>

      <h2>
        Hey, ich bin <span>Kate.</span>
      </h2>

      <p class="about-description">
        Ich bin jemand, der Dinge gerne erst einmal
        beobachtet, bevor ich mir ein Urteil bilde.
        Mich fasziniert es, komplexe Systeme zu
        verstehen, Zusammenhänge zu erkennen und
        dieses Wissen zu nutzen, um Probleme zu lösen.
      </p>

      <p class="about-description">
        Besonders in der IT gefällt mir, dass es
        immer etwas Neues zu entdecken gibt.
        Ich möchte nicht einfach nur wissen,
        wie etwas funktioniert, sondern auch warum.
      </p>

      <p class="about-description">
        Meine Art? Wahrscheinlich eine Mischung
        aus ruhiger Beobachterin und neugieriger
        Problemlöserin. Ich beschäftige mich gerne
        intensiv mit Themen, die mich interessieren.
      </p>

      <p class="about-description">
      Aber abseits davon genieße ich auch das Leben und schätze ein harmonisches Miteinander. 
      Manchmal muss ich auch über meine eigenen Fehler lachen können, bevor ich sie behebe. 
      Genau diese Gelassenheit und den Humor wünsche ich mir auch von meinem Umfeld.
      </p>

      <p class="about-highlight">
        "Ich weiß, dass ich nichts weiß."  
        <br> Sokrates
      </p>

    </div>

    <!-- Rechte Seite: Persönlichkeit -->
    <div class="personality-card">

      <h3>Ein bisschen mehr über mich</h3>

      <div class="personality-item">
        <span class="personality-icon">🧠</span>

        <div>
          <h4>Komplexität verstehen</h4>
          <p>
            Ich mag Herausforderungen,
            bei denen ich wirklich nachdenken muss.
          </p>
        </div>
      </div>

      <div class="personality-item">
        <span class="personality-icon">🐈‍⬛</span>

        <div>
          <h4>Black Cat Energy</h4>
          <p>
            Erst beobachten, dann verstehen.
            Am liebsten in Ruhe.
          </p>
        </div>
      </div>

      <div class="personality-item">
        <span class="personality-icon">😄</span>

        <div>
          <h4>Humor gehört dazu</h4>
          <p>
            Das Leben ist schon ernst genug.
            Man darf auch einfach Spaß haben.
          </p>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 100px 24px;

  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 80px;
}

/* Linke Seite */
.about-label {
  color: #22d3ee;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

h2 {
  font-size: clamp(40px, 5vw, 70px);
  line-height: 1.1;
  letter-spacing: -2px;
  color: #f5f7fa;
  margin: 0 0 30px;
}

h2 span {
  color: #b5fa35;
}

.about-description {
  color: #a6b0bb;
  font-size: 17px;
  line-height: 1.8;
  margin-bottom: 20px;
}

.about-highlight {
  color: #22d3ee;
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
}

/* Rechte Seite */
.personality-card {
  background: rgba(14, 25, 32, 0.85);
  border: 1px solid #203640;
  border-radius: 16px;
  padding: 36px;
}

.personality-card h3 {
  color: #22d3ee;
  font-size: 20px;
  margin: 0 0 30px;
}

.personality-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 20px 0;
  border-bottom: 1px solid #263b45;
}

.personality-item:last-child {
  border-bottom: none;
}

.personality-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.personality-item h4 {
  color: #f5f7fa;
  font-size: 17px;
  margin: 0 0 8px;
}

.personality-item p {
  color: #a6b0bb;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

/* Mobile Ansicht */
@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr;
    padding: 70px 24px;
    gap: 40px;
  }

  .personality-card {
    padding: 24px;
  }

  .about-description {
    font-size: 16px;
  }
}
</style>
