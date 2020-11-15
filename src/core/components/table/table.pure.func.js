import {range} from "@core/utils";

export function matrix(target, current) {
    const cells = range(current.cell, target.cell)
    const rows = range(current.row, target.row)
    return cells.reduce((acc, cel) => {
        rows.forEach(row => acc.push(`${row}:${cel}`))
        return acc
    }, [])
}

export function nextSelector(key, {row, cell}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'ArrowLeft':
            cell = cell - 1 < MIN_VALUE ? MIN_VALUE : cell - 1
            break
        case 'ArrowRight':
        case 'Tab':
            cell++
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
        case 'ArrowDown':
        case 'Enter':
            row++
            break
    }
    return `[data-id="${row}:${cell}"]`
}
