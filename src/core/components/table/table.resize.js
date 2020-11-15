export function resizeHandler(event, root) {
    return new Promise((resolve, _) => {
        const type = event.target.dataset.resize
        const resize = event.target
        const parent = event.target.closest('div[data-type="resizable"]')
        let value = 0
        if (type === 'col') {
            const index = parent.dataset.colIndex
            resize.classList.add('active-resize')
            const resizeHeightActive = document.documentElement.clientHeight - event.clientY + 'px'
            const resizeHeight = resize.clientHeight + 'px'
            resize.style.height = resizeHeightActive

            document.onmousemove = e => {
                value = e.clientX - event.clientX
                resize.style.right = -value + 'px'
            }
            document.onmouseup = () => {
                value += parent.clientWidth
                const id = parent.dataset.colIndex
                resolve({col: {id, value}})
                if (value) {
                    parent.style.width = value + 'px'
                    const cells = root.querySelectorAll(`[data-cell-index="${index}"]`)
                    cells.forEach( c => c.style.width = value + 'px')
                    resize.style.height = resizeHeight
                }
                resize.classList.remove('active-resize')
                resize.style.right = 0
                document.onmousemove = null
                document.onmouseup = null
            }
        }

        if (type === 'row') {
            const resizeWidthActive = document.documentElement.clientWidth - event.clientX + 'px'
            const resizewidth = resize.clientWidth + 'px'
            resize.style.width = resizeWidthActive
            document.onmousemove = e => {
                value = e.clientY - event.clientY
                resize.style.bottom = -value + 'px'
            }
            document.onmouseup = () => {
                value += parent.clientHeight
                const id = parent.dataset.rowId
                resolve({row: {id, value}})
                if (value) {
                    resize.classList.add('active-resize')
                    parent.style.height = value + 'px'
                }
                resize.style.width = resizewidth
                resize.style.bottom = 0
                resize.classList.remove('active-resize')
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    })
}
