let chatContainer = document.querySelector('.chat__message-container')
let chatDateTemplate = document.querySelector('#chat-date')
let chatUserTemplate = document.querySelector('#chat-user-message')
let chatAdminTemplate = document.querySelector('#chat-admin-message')
let chatWindow = document.querySelector('.chat__window')
let chatButton = document.querySelector('.chat__message-form-button')
let chatText = document.querySelector('.chat__message-form-textarea')
let chatForm = document.querySelector('.chat__message-form')

let adminMessageText = 'Lörem ipsum suparad pepött då satsig och soskap metrosocial. Sapongar trenåvis i hypol innan visiskap, heterovybelt. Besav ditugen stenosade om exopagt. '
let presenceOfMessages = false
let presenceOfDate = false

let now = new Date();

const sendMessage = (messageText) => () => {
  fetch('https://example.com/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: messageText,
      // timestamp: new Date().toISOString(), // например, добавляем время
      // senderId: 'user123' // идентификатор пользователя или другая информация
    })

  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при отправке сообщения');
    }
    return response.json();
  })
  .then(data => {
    console.log('Ответ сервера:', data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

let getDate = () => {
  if (!presenceOfDate) {
    let chatDate = chatDateTemplate.content.cloneNode(true)
    let chatDateValue = chatDate.querySelector('.chat__message-date')
    let hours = String(now.getHours())
    let minutes = String(now.getMinutes())
    let time = ((hours < 10 ? '0' : '') + hours) + ':' + ((minutes < 10 ? '0' : '') + minutes)
    chatDateValue.textContent = 'Сегодня' + ', ' +  time
    chatContainer.appendChild(chatDate)
    presenceOfDate = true
  }
}


let addedAnswerMessage = () => {
  let answerMessage = chatAdminTemplate.content.cloneNode(true)
  let answerMessageText = answerMessage.querySelector('.chat__message-text')
  let answerMessageTime = answerMessage.querySelector('time')
  let hours = String(now.getHours())
  let minutes = String(now.getMinutes())
  let time = ((hours < 10 ? '0' : '') + hours) + ':' + ((minutes < 10 ? '0' : '') + minutes)
  answerMessageTime.setAttribute('datetime', (time))
  answerMessageTime.textContent = time
  answerMessageText.textContent = adminMessageText
  chatContainer.appendChild(answerMessage)
  chatContainer.scrollTop = chatContainer.scrollHeight
}

let addedMessage = () => {
  if (chatText.value !== '') {
  chatWindow.classList.remove('chat__window--empty')
  let sendMessage = chatUserTemplate.content.cloneNode(true)
  let chatMessage = chatText.value
  let chatMessageText = sendMessage.querySelector('.chat__message-text')
  let chatMessageTime = sendMessage.querySelector('time')
  let hours = String(now.getHours())
  let minutes = String(now.getMinutes())
  let time = ((hours < 10 ? '0' : '') + hours) + ':' + ((minutes < 10 ? '0' : '') + minutes)
  chatMessageTime.setAttribute('datetime', (time))
  chatMessageTime.textContent = time
  chatMessageText.textContent = chatMessage
  chatText.value = ''
  chatContainer.appendChild(sendMessage)
  chatContainer.scrollTop = chatContainer.scrollHeight
  if (!presenceOfMessages) {
    setTimeout(() => {
      addedAnswerMessage()
    }, 2000)
    presenceOfMessages = true;
  }
}
}

chatButton.addEventListener('click', function (evt) {
  evt.preventDefault()
  getDate()
  addedMessage()
  sendMessage(chatText.value)
}
)

chatText.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    evt.preventDefault()
    getDate()
    addedMessage()
    sendMessage(chatText.value)
  }
}
)

chatText.addEventListener('keydown', function (evt) {
  if (evt.code === 'NumpadEnter') {
    evt.preventDefault()
    getDate()
    addedMessage()
    sendMessage(chatText.value)
  }
}
)
