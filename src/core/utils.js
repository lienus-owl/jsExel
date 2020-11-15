
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1).fill('')
        .map( (_, index) => start + index)
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify((data)))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function stylesToString(styles) {
    return Object.keys(styles)
        .map(key => `${camelToDash(key)}:${styles[key]}`).join(';')
}

export function debounce(fn, delay = 300) {
    let timeout
    return function(...args) {
        console.log('ARGS', ...args)
        const latter = () => {
            fn(...args)
            clearTimeout(timeout)
        }
        clearTimeout(timeout)
        timeout = setTimeout(latter, delay)
    }
}
