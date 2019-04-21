const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

module.exports = class ReplacerSettingWindow {
  constructor() {
    this.window = null
    this.replacer = null
  }

  setReplacer(replacer) {
    this.replacer = replacer
  }

  setCurrentReplacers() {
    this.window.webContents.executeJavaScript(`setReplacer(${JSON.stringify(this.replacer.settings)});`)
    ipcMain.on(`from-apply`, (sender, newReplacer) => {
      this.replacer.save(newReplacer)
    })
  }

  show(parent) {
    this.window = this.window || new BrowserWindow({ parent: parent, show: false })
    this.window.webContents.executeJavaScript('var { ipcRenderer } = require("electron")')
    this.window.once('ready-to-show', () => this.window.show())
    this.window.webContents.on('did-finish-load', () => this.setCurrentReplacers())
    this.window.on('closed', () => { this.window = null })
    this.window.loadURL('file://' + __dirname + '/../../renderer/replacesetting.html')
    this.window.webContents.openDevTools()
  }
}

