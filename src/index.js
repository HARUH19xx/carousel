import "./style.scss"

const btn = document.querySelectorAll('.btns')
const preBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        const picture = document.querySelector('.pictures').children
        const indicator = document.querySelector('.indicators').children

        const lastPictureIndex = picture.length -1
        const firstPictureIndex = 0
        const lastIndicatorIndex = indicator.length -1
        const firstIndicatorIndex = 0

        const firstItem = picture.item(firstPictureIndex)
        const lastItem = picture.item(lastPictureIndex)
        const firstIndicator = indicator.item(firstIndicatorIndex)
        const lastIndicator = indicator.item(lastIndicatorIndex)

        if (btn[i] === preBtn) {
            setTimeout(() => {
                firstItem.parentNode.insertBefore(lastItem, firstItem)
                firstIndicator.parentNode.insertBefore(firstIndicator, lastIndicator.nextSibling)
            }, 0)
        } else if (btn[i] === nextBtn) {
            setTimeout(() => {
            lastItem.parentNode.insertBefore(firstItem, lastItem.nextSibling)
            firstIndicator.parentNode.insertBefore(lastIndicator, firstIndicator)
            }, 0)
        }
    })
}