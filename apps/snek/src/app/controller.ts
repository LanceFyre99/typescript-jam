import { app } from './App';
import { KEY } from './constants';
import { IInputState } from './types';

export const setupControls = (inputState: IInputState) => {
  window.addEventListener(
    'keydown',
    function (event) {
      let code = event.code;
      switch (code) {
        case KEY.RIGHT:
        case KEY.D:
          inputState.right = true;
          break;

        case KEY.UP:
        case KEY.W:
          inputState.up = true;
          break;

        case KEY.LEFT:
        case KEY.A:
          inputState.left = true;
          break;

        case KEY.DOWN:
        case KEY.S:
          inputState.down = true;
          break;
      }
    },
    true
  );

  document.addEventListener(
    'keyup',
    function (event) {
      let code = event.code;
      switch (code) {
        case KEY.RIGHT:
        case KEY.D:
          inputState.right = false;
          break;

        case KEY.UP:
        case KEY.W:
          inputState.up = false;
          break;

        case KEY.LEFT:
        case KEY.A:
          inputState.left = false;
          break;

        case KEY.DOWN:
        case KEY.S:
          inputState.down = false;
          break;

        case KEY.SPACE:
          app.reset();
          app.start();
          break;
      }
    },
    true
  );
};
