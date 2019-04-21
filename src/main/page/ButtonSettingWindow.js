const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

module.exports = class ButtonSettingWindow {
  constructor() {
    this.window = null
    this.buttonSetting = null
  }

  setButtonSetting(buttonSetting) {
    this.buttonSetting = buttonSetting
  }

  setCurrentButtonSetting() {
    this.window.webContents.executeJavaScript(`setButtonSetting(${JSON.stringify(this.buttonSetting.settings)});`)
    ipcMain.on(`from-apply`, (sender, newButtonSettings) => {
      this.buttonSetting.save(newButtonSettings)
    })
  }

  show(parent) {
    this.window = this.window || new BrowserWindow({ parent: parent, show: false })
    this.window.webContents.executeJavaScript('var { ipcRenderer } = require("electron")')
    this.window.once('ready-to-show', () => this.window.show())
    this.window.webContents.on('did-finish-load', () => this.setCurrentButtonSetting())
    this.window.on('closed', () => { this.window = null })
    this.window.loadURL('file://' + __dirname + '/../../renderer/buttonSetting.html')
    this.window.webContents.openDevTools()
  }
}

