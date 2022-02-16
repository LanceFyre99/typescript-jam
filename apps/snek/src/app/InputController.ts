import * as EventEmitter from 'events';
import { KEY } from './constants';
import { inputState } from './state';

export class InputController extends EventEmitter {
  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  public setup() {
    window.addEventListener(
      'keydown',
      (event) => {
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
      (event) => {
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
            this.emit('RESET');
            break;
        }
      },
      true
    );
  }
}
