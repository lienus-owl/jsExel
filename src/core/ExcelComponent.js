import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter || {}
    this.store = options.store
    this.subscribe = options.subscribe || []

    this.unsubscribers = []
    // this.storeUnsub = null

    this.prepare()
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  storeChanged() {}

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // $subscribe(fn) {
  //   this.storeUnsub = this.store.subscribe(fn)
  // }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    // this.storeUnsub.unsubscribe()
  }

  toHTML() {
    return ''
  }
}
