class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) : selector
    }
    html(html) {
        if (html) {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.innerHTML.trim()
    }
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }
    append(node) {
        if (node.$el instanceof DOM) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node.$el)
        } else {
            this.$el.appendChild(node)
        }
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    get data() {
        return this.$el.dataset
    }

    focus() {
        this.$el.focus()
        this.$el.selectionStart = this.$el.textContent.length
        return this
    }

    id(parsed) {
        if (parsed) {
            const [row, cell] = this.data.id.split(':')
            return {
                row: +row,
                cell: +cell
            }
        }
        return this.data.id
    }

    getStyles(styles = []) {
        return styles.reduce((acc, s) => {
            acc[s] = this.$el.style[s]
            return acc
        }, {})
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return $(this.$el.querySelectorAll(selector))
    }

    each(fn) {
        this.$el.forEach(fn)
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    placeCaretAtEnd() {
        placeCaretAtEnd(this.$el)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    on(eventName, callback) {
        this.$el.addEventListener(eventName, callback)
    }

    off(eventName, callback) {
        this.$el.removeEventListener(eventName, callback)
    }

    css(styles = {}) {
        Object.keys(styles).forEach( style => {
            this.$el.style[style] = styles[style]
        })
        return this
    }

    clear() {
        this.$el.innerHTML = ''
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}


function placeCaretAtEnd(el) {
    el.focus()
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
    } else if (typeof document.body.createTextRange != "undefined") {
        const textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
    }
}
