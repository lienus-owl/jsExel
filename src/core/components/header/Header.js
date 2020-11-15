import {ExcelComponent} from "@core/ExcelComponent";
import {changeTableName} from "@core/store/actions";
export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            subscribe: ['tableName'],
            listeners: ['input'],
            ...options
        });
    }

    onInput(event) {
        if (event.target.dataset.input === 'table-name') {
            this.$dispatch(changeTableName(event.target.value));
        }
    }

    storeChanged({tableName}) {
        console.log('storeChanged', tableName)
    }

    toHTML() {
        const {tableName} = this.store.getState()
        return `
            <input type="text" class="input" value="${tableName}" data-input="table-name" />

            <div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>

            </div>
        `
    }
}
