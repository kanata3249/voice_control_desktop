const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

module.exports = class SettingWindow {
  constructor() {
    this.window = null
    this.settings = null
  }

  setSettings(settings) {
    this.settings = settings
  }

  setCurrentSettings() {
    this.window.webContents.executeJavaScript('document.settings.ipaddr.value = "' + this.settings.settings.hostIPAddress + '";')
    this.window.webContents.executeJavaScript('document.settings.port.value = "' + this.settings.settings.portNo + '";')

    this.window.webContents.executeJavaScript('updateHostUrl();')
  }

  show(parent) {
    this.window = this.window || new BrowserWindow({ parent: parent, show: false })
    this.window.webContents.executeJavaScript('var { ipcRenderer } = require("electron")')
    this.window.once('ready-to-show', () => this.window.show())
    this.window.webContents.on('did-finish-load', () => this.setCurrentSettings())
    this.window.on('closed', () => { this.window = null })
    this.window.loadURL('file://' + __dirname + '/setting.html')

    ipcMain.on(`from-apply`, (sender, newSettings) => {
      this.settings.save(newSettings)
    })
  }
}

