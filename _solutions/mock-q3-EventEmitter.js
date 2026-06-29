export default class EventEmitter {
  constructor() {
    this.events = new Map() // eventName -> array of listeners
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) this.events.set(eventName, [])
    this.events.get(eventName).push(listener)
    return () => this.off(eventName, listener)
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName)
    if (!listeners) return
    this.events.set(
      eventName,
      listeners.filter((l) => l !== listener),
    )
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper)
      listener(...args)
    }
    return this.on(eventName, wrapper)
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName)
    if (!listeners || listeners.length === 0) return false
    // copy so once()/off() during emit doesn't disturb this iteration
    ;[...listeners].forEach((l) => l(...args))
    return true
  }
}
