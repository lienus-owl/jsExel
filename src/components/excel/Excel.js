import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";

export class Excel
{

    constructor(selector, options)
    {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    // переносим верстку в
    getRoot()
    {
        const $root = $.create('div', 'excel')
        const componentOptions = {emitter: this.emitter}

        this.components = this.components.map( Component =>
        {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)

            $el.html(component.toHTML())
            $root.append($el)

            return component
        })

        return $root
    }

    // что то складываем в шаблон
    render()
    {
        // console.log(console.log(this.$el))
        // insertAdjacentHTML может быть 4х видов - afterbegin, afterend, beforeend, beforebegin
        // this.$el.insertAdjacentHTML('afterbegin', 'html код в наш #app')
        // const node = document.createElement('h1')
        // node.textContent = 'тест'
        // this.$el.append(node)

        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }

}