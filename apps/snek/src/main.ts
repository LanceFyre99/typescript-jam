import { app } from './app/App';
import { setupControls } from './app/controller';
import { Segment } from './app/Segment';
import { settings } from './app/settings';
import { foodState, gameState, inputState } from './app/state';

let gameLoop = null;

// Listen for application load
document.addEventListener('DOMContentLoaded', onDOMLoaded, false);
function onDOMLoaded() {
  app.start();
}

// Runs an individual frame tick
