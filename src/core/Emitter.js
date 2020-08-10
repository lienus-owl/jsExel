export class Emitter {
    constructor()
    {
        this.listeners = {}

    }

    // dispatch, fire, trigger
    // уведомляем слушателей если они есть
    // table.emit('table:select', {a: 1})
    emit(event, ...args)
    {
        if (!Array.isArray(this.listeners[event]))
        {
            return false
        }

        this.listeners[event].forEach(listener =>
        {
            listener(...args)
        })

        return true
    }

    // on, listen
    // подписываемся на уведомления или добавдяем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn)
    {
        this.listeners[event] = this.listeners[event] || [] // если ключа нет то массив будет пустой
        this.listeners[event].push(fn)

        return () =>
        {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }

}


// test
// const emitter = new Emitter()
// const unsub = emitter.subscribe('lienusowl', data => console.log('подписался: ', data))
//
// setTimeout(() =>
// {
//     emitter.emit('lienusowl', '69 lmao')
// }, 1500)
//
// setTimeout(() =>
// {
//     emitter.emit('lienusowl', '100500')
// }, 2000)
//
// setTimeout(() =>
// {
//     emitter.emit('lienusowl', 'kek')
// }, 2500)
//
// setTimeout(() =>
// {
//     emitter.emit('lienusowl', 'kek')
// }, 3000)