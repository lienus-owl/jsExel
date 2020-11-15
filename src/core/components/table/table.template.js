import {stylesToString} from "@core/utils";
import {defaultStyles} from "@/constants";
import {parse} from '@core/parse'

const CODE = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
const DEFAULT_CELL_VALUE = ''

function createColl(content, index, state) {
    const width = getWidth(state, index)
    return `<div class="column" data-type="resizable" data-col-index="${index}" style="width: ${width}">
                ${content}
                <div class="col-resize" data-resize="col"></div>
           </div>`
}

function getWidth(state, id) {
    return (state.colState[id] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, id) {
    return (state.rowState[id] || DEFAULT_HEIGHT) + 'px'
}

function createCell(rowId, state) {
    return (_, index) => {
        const id = `${rowId}:${index}`
        const stylesObj = {...defaultStyles, ...state.styleState[id]}
        const value = state.dataState[id] || DEFAULT_CELL_VALUE
        const styles = stylesToString(stylesObj)
        return `<div
                    class="cell" 
                    contenteditable
                    data-cell-index="${index}"
                    data-type="cell"
                    data-id="${id}"
                    style="${styles};width: ${getWidth(state, index)}"
               >${parse(value) || ''}</div>`
    }
}


function createRow(content, index, state) {
    let height = DEFAULT_HEIGHT
    if (index) {
        height = getHeight(state, index)
    }

    const resize = index ?
        `<div class="row-resize" data-resize="row" ></div>` : ''
    return `
        <div class="row" data-type="resizable" data-row-id="${index}" style="height:${height}">
            <div class="row-info" data-row-index="${index}" >
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data" data-row-data-index="${index}">${content ? content : ''}</div>
        </div>
    `
}

function initCol(state) {
    return (el, index) => {
        return createColl(el, index, state)
    }
}

function toChar(_, index) {
    return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount = 15, state) {
    const rows = []
    const colsCount = CODE.Z - CODE.A + 1
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(initCol(state))
        .join('')
    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill(null)
            .map(createCell(i, state))
            .join('')
        rows.push(createRow(cells, i + 1, state))
    }


    return rows.join('')
}
