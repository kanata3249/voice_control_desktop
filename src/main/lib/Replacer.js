const storage = require('electron-json-storage-sync')

const default_key = "^_default_$"

module.exports = class Replacer {
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
      [default_key]: [
        {
          "key": "決定",
          "value": "\\r"
        }
      ]
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

  replace(application, text) {
    var replace_key = Object.keys(this.settings).find((regexp) => application.match(regexp))
    if (replace_key == undefined) {
      replace_key = default_key
    }
    const replace_data_array = this.settings[replace_key]

    const translation = replace_data_array.find((element) => element.key === text)
    if (translation) {
      // todo substitution arguments
      return translation.value
    }
    return text
  }
}

