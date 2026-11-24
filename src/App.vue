
<script setup>
import Navbar from './components/Navbar.vue'
import Homescreen from './components/Homescreen.vue'
import Vorstellung from './components/Vorstellung.vue'
import Projekt from './components/Projekt.vue'
import Analyse1 from './components/Analyse1.vue'
import Analyse2 from './components/Analyse2.vue'
import Analyse3 from './components/Analyse3.vue'
import Analyse4 from './components/Analyse4.vue'
</script>

<template>
  <Navbar />

  <main>
    <section id="home">
      <Homescreen />
    </section>

    <section id="about">
      <Vorstellung />
    </section>

    <section id="project">
      <Projekt />
    </section>

    <section id="analysis-1">
      <Analyse1 />
    </section>

    <section id="analysis-2">
      <Analyse2 />
    </section>

    <section id="analysis-3">
      <Analyse3 />
    </section>

    <section id="analysis-4">
      <Analyse4 />
    </section>
  </main>
</template>
