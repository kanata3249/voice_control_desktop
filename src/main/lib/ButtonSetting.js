const storage = require('electron-json-storage-sync')

module.exports = class ButtonSetting {
  constructor(filePath) {
    this.settings = null
    this.filePath = filePath
    this.handler = null
  }

  setChangeHandler(handler) {
    this.handler = handler
  }

  loadDefault() {
    return {
      "tab1": {
        "title": "tab1",
        "buttons": [
          {
            "label": "action1",
            "action": "<button1>"
          }
        ]
      },
      "tab2": {
        "title": "tab2",
        "buttons": [
          {
            "label": "emote1",
            "action": "<button2>"
          }
        ]
      }
    }
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

