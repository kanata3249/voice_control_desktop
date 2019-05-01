const storage = require('electron-json-storage-sync')
const fs = require('fs')
const path = require('path')

module.exports = class ButtonSetting {
  constructor(filePath) {
    this.settings = null
    this.handler = null
    this.filePath = 'buttons'
    if (filePath && filePath != 'default') {
      this.filePath = `${filePath}-buttons`
    }
  }

  setChangeHandler(handler) {
    this.handler = handler
  }

  loadDefault() {
    let defaultSetting
    try {
      defaultSetting = JSON.parse(fs.readFileSync(path.join(__dirname, '../../buttons.json'), 'utf8'))
    }
    catch(e) {
      defaultSetting = {
        "tab": [
          {
            "label": "tab1",
            "buttons": [
              {
                "label": "action1",
                "action": "action text"
              }
            ]
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
}

