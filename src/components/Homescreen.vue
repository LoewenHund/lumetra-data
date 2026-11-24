
<script setup>
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="home-container">

    <!-- Linke Seite -->
    <div class="home-content">

      <p class="home-label">
        LUMETRA DATA · Auswertung der Daten
      </p>

      <h1>
        Supportdaten<br />
        analysieren.<br />

        <span>
          Aus 2024 und 2025.
        </span>
      </h1>

      <p class="home-description">
        Es handelt sich hier um eine Fiktive Auswertung von Supportdaten, die im Rahmen eines Projektes erstellt wurde. 
        Das Projekt soll zeigen, wie man Supportdaten analysieren kann und welche Erkenntnisse man daraus gewinnen kann.

      </p>

      <a href="#analysis-1" class="home-button">
        Auswertung öffnen
      </a>

    </div>

    <!-- Rechte Seite -->
    <div class="home-image">
      <img
        :src="`${baseUrl}Tiger_Home.png`"
        alt="Lumetra Data Tiger"
      />

      <span class="home-tag">
        Kate - 2026
      </span>
    </div>

  </div>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 80px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;

  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  gap: 60px;
}

/* Linke Seite */
.home-label {
  color: #22d3ee;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

h1 {
  font-size: clamp(48px, 6vw, 96px);
  line-height: 1.03;
  letter-spacing: -3px;
  color: #f5f7fa;
  margin: 0;
}

h1 span {
  color: #b5fa35;
}

.home-description {
  max-width: 650px;
  color: #a6b0bb;
  font-size: 19px;
  line-height: 1.6;
  margin: 30px 0;
}

.home-button {
  display: inline-block;
  padding: 16px 24px;
  background: #22d3ee;
  color: #05080b;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.2s ease;
}

.home-button:hover {
  background: #b5fa35;
  transform: translateY(-2px);
}

/* Rechte Seite */
.home-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.home-image img {
  width: 100%;
  max-width: 380px;
  height: auto;
  object-fit: contain;
}

.home-tag {
  border: 1px solid #187f93;
  border-radius: 30px;
  padding: 10px 16px;
  color: #a6b0bb;
  font-size: 12px;
  letter-spacing: 1px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-container {
    grid-template-columns: 1fr;
    padding: 60px 24px;
    gap: 40px;
  }

  h1 {
    letter-spacing: -1px;
  }

  .home-description {
    font-size: 16px;
  }

  .home-image img {
    max-width: 270px;
  }
}
</style>
