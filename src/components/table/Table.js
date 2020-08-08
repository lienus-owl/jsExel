import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom"

export class Table extends ExcelComponent
{
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML()
    {
        return createTable(3)
    }

    onMousedown(event)
    {
        if (event.target.dataset.resize)
        {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const cords = $parent.getCords()

            console.log($parent.getCords())

            document.onmousemove = e =>
            {
                const delta = e.pageX - cords.right
                const value = Math.floor(cords.width + delta)
                $parent.$el.style.width = value + 'px'
            }

            document.onmouseup = () =>
            {
                document.onmousemove = null
            }
        }
    }
}