import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const tableauEmbeddingApiUrl =
  'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'

if (!document.querySelector(`script[src="${tableauEmbeddingApiUrl}"]`)) {
  const tableauScript = document.createElement('script')
  tableauScript.type = 'module'
  tableauScript.src = tableauEmbeddingApiUrl
  document.head.appendChild(tableauScript)
}

createApp(App).mount('#app')
