import {APPLY_STYLES, CHANGE_TABLE_NAME, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE} from "@core/store/types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CURRENT_STYLES,
        data
    }
}

export function applyStyles(data) {
    return {
        type: APPLY_STYLES,
        data
    }
}

export function changeTableName(data) {
    return {
        type: CHANGE_TABLE_NAME,
        data
    }
}
