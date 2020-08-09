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
            const sideProp = type === 'col' ? 'bottom' : 'right'
            let value

            // получим текущий id ячейки
            // console.log($parent.data.col)

            $resizer.css(
                {
                    opacity: 1,
                    [sideProp]: '-2000px'
                }
            )

            document.onmousemove = e =>
            {
                if (type === 'col')
                {
                    const delta = e.pageX - cords.right
                    value = Math.floor(cords.width + delta)
                    $resizer.css(
                        {
                            right: -delta + 'px'
                        }
                    )
                }
                else
                {
                    const delta = e.pageY - cords.bottom
                    value = Math.floor(cords.height + delta)
                    $resizer.css(
                        {
                            bottom: -delta + 'px'
                        }
                    )

                }
            }

            // чтобы перестало отслеживать положение курсора
            // после перетаскивания ячейки
            document.onmouseup = () =>
            {
                document.onmousemove = null
                document.onmouseup = null

                if (type === 'col')
                {
                    $parent.css({
                        width: value + 'px'
                    })
                    this.$root.findAll(`[data-col="${$parent.data.col}"]` )
                        .forEach( el => el.style.width = value + 'px' )
                }
                else
                {
                    $parent.css({
                        height: value + 'px'
                    })
                }

                $resizer.css(
                    {
                        opacity: 0,
                        bottom: 0,
                        right: 0
                    }
                )
            }

        }
    }
}