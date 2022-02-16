import { app } from './app/App';

let gameLoop = null;

// Listen for application load
document.addEventListener('DOMContentLoaded', onDOMLoaded, false);
function onDOMLoaded() {
  app.start();
}
