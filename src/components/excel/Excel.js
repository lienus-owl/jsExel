import {$} from "@core/dom";


export class Excel
{

    constructor(selector, options)
    {
        this.$el = $(selector)
        this.components = options.components || []
    }

    // переносим верстку в
    getRoot()
    {
        const $root = $.create('div', 'excel')

        this.components.forEach( Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)

            $el.html(component.toHTML())
            $root.append($el)
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


    }

}