/**
 * Uygulamanın Başlangıç Noktası (Entry Point)
 */

import { Dashboard } from './Pages/Dashboard.js';

// DOM yüklendiğinde Dashboard'u başlat
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
  console.log("Brewly Admin Panel başlatıldı!");
});
