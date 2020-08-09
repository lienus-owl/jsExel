import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.size";
import {shouldResize} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {isCell} from "@/components/table/table.functions";
import {$} from "@core/dom"
import {matrix} from "@/components/table/table.functions";

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

    prepeare()
    {
        this.selection = new TableSelection()
    }

    init()
    {
        super.init()

        this.selection = new TableSelection()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }

    onMousedown(event)
    {
        if (shouldResize(event))
        {
            resizeHandler(this.$root, event)
        }
        else if (isCell(event))
        {
            const $target = $(event.target)
            if (event.shiftKey)
            {
                // выбираем группу по нажатому shift
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            }
            else
            {
                this.selection.select($target)
            }
        }
    }
}

