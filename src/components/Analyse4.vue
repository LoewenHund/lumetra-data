<template>

<!-- DEMO-HINWEIS -->
<section class="demo-notice">
  <div class="demo-header">
    <span class="demo-badge">DEMO-VERSION</span>
  </div>

  <h3>Lumetra Data befindet sich in der Entwicklung</h3>

  <p>
    Diese Webseite wurde vorab als Demo-Version
    veröffentlicht, um einen ersten Einblick in
    das Projekt und die bisherigen Datenanalysen
    zu ermöglichen.
  </p>

  
<div class="tableau-link-section">
  <p>
    Du möchtest einen genaueren Einblick in die
    verwendeten Daten und Visualisierungen erhalten?
    Entdecke die veröffentlichten Analysen direkt
    auf meinem Tableau-Public-Profil.
  </p>

  <a
    href="https://public.tableau.com/app/profile/katerina.kogiou"
    target="_blank"
    rel="noopener noreferrer"
    class="tableau-button"
    aria-label="Tableau-Public-Profil in neuem Tab öffnen"
  >
    Tableau Public entdecken
    <span aria-hidden="true">↗</span>
  </a>
</div>


  <div class="demo-status">
    <span class="status-dot"></span>
    Weitere Analysen in Planung
  </div>
</section>

  </template>
<style scoped>

/* DEMO-HINWEIS */

.demo-notice {
  width: 100%;
  box-sizing: border-box;
  margin-top: 48px;
  padding: 32px;
  background: #0b171d;
  border: 1px solid #1c3440;
  border-radius: 16px;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.demo-icon {
  color: #22d3ee;
  font-size: 26px;
}

.demo-badge {
  padding: 6px 12px;
  color: #22d3ee;
  background: #102b35;
  border: 1px solid #21606b;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.demo-notice h3 {
  margin: 0 0 20px;
  color: #f5f7fa;
  font-size: clamp(22px, 3vw, 28px);
  line-height: 1.4;
}

.demo-notice p {
  margin: 0 0 16px;
  color: #bdcbd2;
  font-size: 15px;
  line-height: 1.9;
}

.demo-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #1c3440;
  color: #b5fa35;
  font-size: 13px;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  background: #b5fa35;
  border-radius: 50%;
}

@media (max-width: 700px) {
  .demo-notice {
    padding: 22px;
    margin-top: 32px;
  }
}


.tableau-link-section {
  margin-top: 24px;
}

.tableau-link-section p {
  max-width: 750px;
  color: #bdcbd2;
  line-height: 1.8;
  margin-bottom: 20px;
}

.tableau-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;

  background: #102b35;
  color: #22d3ee;
  border: 1px solid #21606b;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease;
}

.tableau-button:hover {
  background: #16414e;
  border-color: #22d3ee;
  transform: translateY(-2px);
}

.tableau-button:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.tableau-button span {
  font-size: 18px;
}

@media (max-width: 700px) {
  .tableau-button {
    width: 100%;
    box-sizing: border-box;
  }
}


</style>