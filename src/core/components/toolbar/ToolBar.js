import {createToolbar} from "@core/components/toolbar/toolbar.tamplate";
import {$} from "@core/DOM";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class ToolBar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'ToolBar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyles)
    }

    storeChanged({currentStyles}) {
        console.log('Changes: ', currentStyles)
        this.setState(currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            const key = Object.keys(value)[0]
            this.$emit('toolbar:applyStyle', value)
            this.setState({[key]: value[key]})
        }
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }
}
