let chatHeaderButton = document.querySelector('.chat__more-button')
let chatHeaderMenu = document.querySelector('.chat__header-menu')

chatHeaderButton.addEventListener('click', function (evt) {
  evt.preventDefault()
  chatHeaderMenu.classList.toggle('chat__header-menu--close')
  chatHeaderMenu.classList.toggle('chat__header-menu--open')

}
)
