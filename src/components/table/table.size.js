import {$} from "@core/dom";

export function resizeHandler($root, event)
{
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cords = $parent.getCords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    // получим текущий id ячейки
    // console.log($parent.data.col)

    $resizer.css(
        {
            opacity: 1,
            [sideProp]: '-3000px'
        }
    )

    document.onmousemove = e =>
    {
        if (type === 'col')
        {
            const delta = e.pageX - cords.right
            value = Math.floor(cords.width + delta)
            $resizer.css(
                {
                    right: -delta + 'px'
                }
            )
        }
        else
        {
            const delta = e.pageY - cords.bottom
            value = Math.floor(cords.height + delta)
            $resizer.css(
                {
                    bottom: -delta + 'px'
                }
            )

        }
    }

    // чтобы перестало отслеживать положение курсора
    // после перетаскивания ячейки
    document.onmouseup = () =>
    {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col')
        {
            $parent.css({
                width: value + 'px'
            })
            $root.findAll(`[data-col="${$parent.data.col}"]` )
                .forEach( el => el.style.width = value + 'px' )
        }
        else
        {
            $parent.css({
                height: value + 'px'
            })
        }

        $resizer.css(
            {
                opacity: 0,
                bottom: 0,
                right: 0
            }
        )
    }
}