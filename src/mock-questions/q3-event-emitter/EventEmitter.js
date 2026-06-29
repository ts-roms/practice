/**
 * Q3 — EventEmitter (publish/subscribe). See README.md.
 *
 * Implement: on, off, once, emit (see the test file for exact behavior).
 */
export default class EventEmitter {
  constructor() {
    // TODO: store listeners keyed by event name (e.g. a Map or plain object).
  }

  on(eventName, listener) {
    // TODO: register listener; return an unsubscribe function.
  }

  off(eventName, listener) {
    // TODO: remove the given listener for eventName.
  }

  once(eventName, listener) {
    // TODO: subscribe a wrapper that removes itself after firing once.
  }

  emit(eventName, ...args) {
    // TODO: call each listener with args (in order); return true if any existed.
  }
}
