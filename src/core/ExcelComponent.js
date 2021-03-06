import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener
{
    constructor($root, options = {})
    {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

        this.prepeare()
    }

    // возвращает шаблон компонента
    toHTML()
    {
        return ''
    }

    // настраиваем компонент до init
    prepeare()
    {

    }

    // инициализируем компонент
    // добавляем слушателей DOM
    init()
    {
        this.initDOMListeners()
    }

    // удаляем компонент
    // чистим слушателей
    destroy()
    {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }

    // фасад
    // уведомляем слушателей про событие event
    $emit(event, ...args)
    {
        this.emitter.emit(event, ...args)
    }

    // фасад
    // подписываемся на событие event
    $on(event, fn)
    {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

}