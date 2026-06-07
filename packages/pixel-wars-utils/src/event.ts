export type Listener<T> = (event: T) => void;

export class EventHandler<T> {
  private listeners: Listener<T>[];

  constructor() {
    this.listeners = [];
  }

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }

  removeListener(listener: Listener<T>) {
    const i = this.listeners.indexOf(listener);

    if (i !== -1) this.listeners.splice(i, 1);
  }

  fire(event: T) {
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      if (listener) {
        listener(event);
      }
    }
  }
}
