const CODES = {
    // символьный код у английской а 65 а у z 90, будем искать все буквы
    A: 65,
    Z: 90
}

function createCell()
{
    return `
    <div class="cell" contenteditable></div>
    `
}

function createCol()
{
    return `
    <div class="column"></div>
    `
}

function createRow(content)
{
    return `
    <div class="row">
        <div class="row-info"></div>
        <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 20)
{
    const colsCount = CODES.Z - CODES.A
    const rows = []

    rows.push(createRow())
    for (let i = 0; i < rowsCount; i++)
    {
        rows.push(createRow())
    }

    return rows.join('')
}