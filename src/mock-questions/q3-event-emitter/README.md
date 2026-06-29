# Q3 — EventEmitter  (JavaScript / Logic)

> Mock HackerRank JS question. These appear alongside React in front-end tests —
> a pure-JavaScript data-structure/logic task. Implement the class so the tests
> pass. **Don't rename the class or its methods.**

## Task

Implement a classic **publish/subscribe** `EventEmitter` in `EventEmitter.js`.

## API

```js
const ee = new EventEmitter()

ee.on(eventName, listener)    // subscribe; RETURNS an unsubscribe function
ee.off(eventName, listener)   // remove a specific listener
ee.once(eventName, listener)  // subscribe; auto-removes after the first emit
ee.emit(eventName, ...args)   // call every listener for eventName with args,
                              // in subscription order; RETURNS true if there
                              // were listeners, otherwise false
```

## Requirements

- `on` registers a listener and returns a function that, when called, removes it.
- Multiple listeners for the same event fire in the order they were added.
- `emit` passes all extra args through to each listener.
- `emit` on an event with no listeners returns `false` and does not throw.
- `off` removes only the given listener; removing an unknown listener is a no-op.
- `once` fires the listener at most once, then removes it automatically.
- Listeners for different event names are independent.

## Run

```bash
npx vitest run src/mock-questions/q3-event-emitter
```

Reference solution: `_solutions/mock-q3-EventEmitter.js`.
