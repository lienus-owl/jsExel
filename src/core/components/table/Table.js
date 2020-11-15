import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@core/components/table/table.template";
import {resizeHandler} from "@core/components/table/table.resize";
import {$} from "@core/DOM";
import {TableSelected} from "@core/components/table/TableSelected";
import {matrix, nextSelector} from "@core/components/table/table.pure.func";
import * as actions from '@core/store/actions'
import {defaultStyles} from "@/constants";
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor(root, options) {
        super(root, {
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
        this.$root = root
    }

    async tableResize(event) {
        try {
            const data = await resizeHandler(event, this.$root.$el)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.error('Resize error:', e)
        }
    }

    async onMousedown(event) {
        if (event.target.dataset.resize) {
            await this.tableResize(event)
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current).map( id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
                const styles = $target.getStyles(Object.keys(defaultStyles))
                this.$dispatch(actions.changeStyles(styles))
                this.$emit('table:select', $target)
            }
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Tab',
            'Enter'
        ]

        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(event.key, id))
            this.selection.select($next)
            this.$emit('table:select', $next)
        }
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }

    prepare() {
        this.selection = new TableSelected()
    }

    init() {
        super.init()
        const cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(cell)
        this.$emit('table:input', cell)

        this.$on('formula:input', text => {
            this.selection.current.attr('data-value', text)
                .text(parse(text))
            // this.selection.current.text(text)
            this.updateTextInStore(text)
        })

        this.$on('formula:focus', () => {
            this.selection.current.focus().placeCaretAtEnd()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            console.log(this.selection.elemIds)
            this.$dispatch(actions.applyStyles({
                value,
                ids: this.selection.elemIds
            }))
        })
    }

    toHTML() {
        return createTable(50, this.store.getState())
    }
}


