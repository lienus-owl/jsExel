 export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach( fn => fn(...args))
        return true
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)

        return () => {
            return this.listeners = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}


 // const emitter = new Emitter()
 // const unsubscribe = emitter.subscribe('test', (n) => {
 //     console.log('hello', n)
 // })
 //
 // emitter.emit('test', 1)
 // unsubscribe()
 // emitter.emit('test', 2)
