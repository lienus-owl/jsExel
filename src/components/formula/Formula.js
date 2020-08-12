import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent
{
    static className = 'excel__formula'

    constructor($root, options)
    {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    init()
    {
        super.init()

        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell =>
        {
            this.$formula.text($cell.text())
        })

        this.$on('table:input', $cell =>
        {
            this.$formula.text($cell.text())
        })
    }

    toHTML()
    {
        return `
                <div class="info">
                    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M84.375 36.5625C84.375 32.4997 83.5748 28.4767 82.02 24.7232C80.4653 20.9697 78.1864 17.5592 75.3136 14.6864C72.4408 11.8136 69.0303 9.53473 65.2768 7.97998C61.5233 6.42522 57.5003 5.625 53.4375 5.625H30.9375C24.2242 5.625 17.7859 8.29184 13.0389 13.0389C8.29184 17.7859 5.625 24.2242 5.625 30.9375V39.375C5.625 43.1046 7.10658 46.6815 9.74381 49.3187C12.381 51.9559 15.9579 53.4375 19.6875 53.4375H22.7813C23.4296 56.6138 25.1555 59.4686 27.6668 61.5187C30.1782 63.5687 33.3207 64.6882 36.5625 64.6875H40.4437L51.6937 84.375L56.5594 81.5625L45.3094 62.1844C44.8568 61.2724 44.1652 60.5003 43.3083 59.9505C42.4514 59.4007 41.4614 59.0938 40.4437 59.0625H36.5625C34.3247 59.0625 32.1786 58.1736 30.5963 56.5912C29.0139 55.0089 28.125 52.8628 28.125 50.625C28.125 48.3872 29.0139 46.2411 30.5963 44.6588C32.1786 43.0764 34.3247 42.1875 36.5625 42.1875H39.375V36.5625H36.5625C33.3207 36.5618 30.1782 37.6813 27.6668 39.7313C25.1555 41.7814 23.4296 44.6362 22.7813 47.8125H19.6875C17.4497 47.8125 15.3036 46.9236 13.7213 45.3412C12.1389 43.7589 11.25 41.6128 11.25 39.375V33.75H16.875C19.1128 33.75 21.2589 32.8611 22.8412 31.2787C24.4236 29.6964 25.3125 27.5503 25.3125 25.3125V22.5H19.6875V25.3125C19.6875 26.0584 19.3912 26.7738 18.8637 27.3012C18.3363 27.8287 17.6209 28.125 16.875 28.125H11.475C12.1507 23.4433 14.4895 19.1614 18.0634 16.0627C21.6372 12.964 26.2073 11.2555 30.9375 11.25H47.8125V16.875C47.8125 17.6209 47.5162 18.3363 46.9887 18.8637C46.4613 19.3912 45.7459 19.6875 45 19.6875H39.375V25.3125H45C47.2378 25.3125 49.3839 24.4236 50.9662 22.8412C52.5486 21.2589 53.4375 19.1128 53.4375 16.875V11.25C58.1458 11.2564 62.759 12.5759 66.7585 15.0601C70.7581 17.5443 73.9856 21.0948 76.0781 25.3125H73.125C70.8872 25.3125 68.7411 26.2014 67.1588 27.7838C65.5764 29.3661 64.6875 31.5122 64.6875 33.75V36.5625H70.3125V33.75C70.3125 33.0041 70.6088 32.2887 71.1363 31.7613C71.6637 31.2338 72.3791 30.9375 73.125 30.9375H78.1031C78.5342 32.7814 78.7513 34.6689 78.75 36.5625V39.375C78.75 43.1046 77.2684 46.6815 74.6312 49.3187C71.994 51.9559 68.4171 53.4375 64.6875 53.4375H56.25V59.0625H64.6875C67.607 59.0585 70.4891 58.4052 73.125 57.15V59.0625C73.125 61.3003 72.2361 63.4464 70.6537 65.0287C69.0714 66.6111 66.9253 67.5 64.6875 67.5H61.875V73.125H64.6875C68.4171 73.125 71.994 71.6434 74.6312 69.0062C77.2684 66.369 78.75 62.7921 78.75 59.0625V53.1281C82.3494 49.4545 84.3684 44.5181 84.375 39.375V36.5625Z" fill="black"/>
                    </svg>
                </div>
                <div id="formula" class="input" contenteditable spellcheck="false">
                
                </div>
                `
    }

    onInput(event)
    {
        console.log(this.$root)
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event)
    {
        if (event.key === 'Enter')
        {
            event.preventDefault()

            this.$emit('formula:done')
        }
    }
}