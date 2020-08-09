import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener
{
    constructor($root, options = {})
    {
        super($root, options.listeners)
        this.name = options.name || ''

        this.prepeare()
    }

    // Возвращает шаблон компонента
    toHTML()
    {
        return ''
    }

    prepeare()
    {

    }

    init()
    {
        this.initDOMListeners()
    }

    destroy()
    {
        this.removeDOMListeners()
    }
}