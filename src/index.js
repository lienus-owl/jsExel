import './sccs/index.scss'
import {Excel} from "@core/components/excel/Excel"
import {Header} from "@core/components/header/Header"
import {ToolBar} from "@core/components/toolbar/ToolBar"
import {Formula} from "@core/components/formula/Formula"
import {Table} from "@core/components/table/Table"
import {createStore} from "@core/createStore"
import {rootReducer} from "@core/store/rootReducer"
import {debounce, storage} from "@core/utils"
import {defaultState} from "@core/initialState";

const store = createStore(rootReducer,
    storage('excel-state') ? storage('excel-state') : defaultState
)


const stateListener = debounce(state => {
  console.log('STATE')
  storage('excel-state', state)
}, 500)


store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, ToolBar, Formula, Table],
  store
})
excel.render()
