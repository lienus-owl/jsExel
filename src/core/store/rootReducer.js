import {APPLY_STYLES, CHANGE_TABLE_NAME, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE} from "@core/store/types";
// import {stylesToString} from "@core/utils";

export function rootReducer(state, action) {
    const prevColState = state.colState || {}
    const prevRowState = state.rowState || {}
    const prevDataState = state.dataState || {}
    const prevStyleState = state.styleState || {}

    switch (action.type) {
        case TABLE_RESIZE:
            if (action.data.col) {
                prevColState[action.data.col.id] = action.data.col.value
            }
            if (action.data.row) {
                prevRowState[action.data.row.id] = action.data.row.value
            }
            return {...state, colState: prevColState, rowState: prevRowState}
        case CHANGE_TEXT:
            prevDataState[action.data.id] = action.data.value
            return {...state, currentText: action.data.value, dataState: prevDataState}
        case CURRENT_STYLES:
            console.log(action.data)
            return {...state, currentStyles: action.data}
        case APPLY_STYLES:
            action.data.ids.forEach(id => {
                prevStyleState[id] = {...prevStyleState[id], ...action.data.value}
            })
            return {...state, styleState: prevStyleState, currentStyles: {...action.data.value, ...state.currentStyles}}
        case CHANGE_TABLE_NAME:
            return {...state, tableName: action.data}
        default: return state
    }
}
