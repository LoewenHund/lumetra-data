
<script setup>
import { ref } from 'vue'

// Steuert, ob das Dropdown geöffnet ist
const isDropdownOpen = ref(false)
const baseUrl = import.meta.env.BASE_URL

function closeDropdown() {
  isDropdownOpen.value = false
}
</script>

<template>
  <header class="navbar">

    <!-- Logo links -->
    <a href="#home" class="navbar-logo">
      <img
        :src="`${baseUrl}Tiger_Logo.png`"
        alt="Lumetra Data Logo"
      />
      <span>LUMETRA DATA</span>
    </a>

    <!-- Navigation rechts -->
    <nav class="navbar-links" aria-label="Hauptnavigation">

      <a href="#home">Home</a>

      <a href="#about">Über mich</a>

      <a href="#project">Über das Projekt</a>

      <!-- Dropdown für Analysen -->
      <div class="dropdown">
        <button
          type="button"
          class="dropdown-button"
          :aria-expanded="isDropdownOpen"
          aria-controls="analysis-menu"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          Analyse
          <span>⌄</span>
        </button>

        <div
          v-if="isDropdownOpen"
          id="analysis-menu"
          class="dropdown-menu"
        >
          <a href="#analysis-1" @click="closeDropdown">
            Analyse 1
          </a>

          <a href="#analysis-2" @click="closeDropdown">
            Analyse 2
          </a>

          <a href="#analysis-3" @click="closeDropdown">
            Analyse 3
          </a>

          <a href="#analysis-4" @click="closeDropdown">
            Analyse 4
          </a>
        </div>
      </div>

    </nav>
  </header>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 80px;
  padding: 0 6%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(5, 8, 11, 0.85);
  border-bottom: 1px solid rgba(0, 200, 220, 0.12);

  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 12px;

  color: #22d3ee;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
}

.navbar-logo img {
  width: 54px;
  height: 54px;
  object-fit: contain;
}

/* Navigation */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar-links a,
.dropdown-button {
  color: #cbd5e1;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar-links a:hover,
.dropdown-button:hover {
  color: #b5fa35;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 18px);
  right: 0;

  min-width: 160px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  background: #101b23;
  border: 1px solid #243b45;
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.dropdown-menu a {
  padding: 10px 12px;
  border-radius: 6px;
}

.dropdown-menu a:hover {
  background: #1b3039;
}

/* Kleinere Bildschirme */
@media (max-width: 768px) {
  .navbar {
    height: auto;
    min-height: 80px;
    padding: 12px 5%;
    flex-wrap: wrap;
    gap: 16px;
  }

  .navbar-links {
    width: 100%;
    gap: 16px;
    flex-wrap: wrap;
  }
}
</style>
