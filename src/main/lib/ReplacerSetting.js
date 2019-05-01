const storage = require('electron-json-storage-sync')
const fs = require('fs')
const path = require('path')

module.exports = class ReplacerSetting {
  constructor(filePath) {
    this.settings = null
    this.handler = null
    this.filePath = 'replacers'
    if (filePath && filePath != 'default') {
      this.filePath = `${filePath}-replacers`
    }
  }

  setChangeHandler(handler) {
    this.handler = handler
  }

  loadDefault() {
    let defaultSetting
    try {
      defaultSetting = JSON.parse(fs.readFileSync(path.join(__dirname, '../../replacers.json'), 'utf8'))
    }
    catch(e) {
      defaultSetting = {
        "replacers": [
          {
            "key": "Enter",
            "value": "\\n"
          }
        ]
      }
    }
    return defaultSetting
  }

  load() {
    const result = storage.get(this.filePath)
    if (result.status) {
      this.settings = result.data
    }
    if (!this.settings || Object.keys(this.settings).length == 0) {
      this.settings = this.loadDefault()
    }
    this.handler && this.handler()
  }

  save(newSettings) {
    this.settings = newSettings
    storage.set(this.filePath, this.settings)
    this.handler && this.handler()
  }

  replace(application, text) {
    const replace_data_array = this.settings.replacers

    const translation = replace_data_array.find((element) => element.key === text)
    if (translation) {
      // todo substitution arguments
      return translation.value
    }
    return text
  }
}

