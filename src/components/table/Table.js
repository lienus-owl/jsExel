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
        return createTable(30)
    }

    onMousedown(event)
    {
        if (event.target.dataset.resize)
        {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const cords = $parent.getCords()
            const type = $resizer.data.resize

            console.log(type)

            // получим текущий id ячейки
            // console.log($parent.data.col)

            document.onmousemove = e =>
            {
                if (type === 'col')
                {
                    const delta = e.pageX - cords.right
                    const value = Math.floor(cords.width + delta)
                    const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]` )
                    $parent.$el.style.width = value + 'px'
                    cells.forEach( el => el.style.width = value + 'px' )
                }
                else
                {
                    const delta = e.pageY - cords.bottom
                    const value = Math.floor(cords.height + delta)
                    $parent.$el.style.height = value + 'px'
                }
            }

            // чтобы перестало отслеживать положение курсора
            // после перетаскивания ячейки
            document.onmouseup = () =>
            {
                document.onmousemove = null
            }
        }
    }
}