const defaultLocale = 'en-US'

const messages_en_US = require('./assets/locales/en-US.json')
const messages_ja_JP = require('./assets/locales/ja-JP.json')

const messagesByLocale = {
  'en-US': messages_en_US,
  'ja': messages_ja_JP,
}

const emptyMessages = {
  setLocale: (locale) => {
    for (var key in Messages) {
      delete Messages[key]
    }
    Object.assign(Messages, emptyMessages, messagesByLocale[defaultLocale], messagesByLocale[locale])
  }
}
const Messages = Object.assign({}, emptyMessages, messagesByLocale[defaultLocale])

export default Messages