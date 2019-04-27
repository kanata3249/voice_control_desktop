const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

module.exports = class SettingWindow {
  constructor() {
    this.window = null
    this.activeTab = ""
  }

  setNetworkSettings(settings) {
    this.networkSettings = settings
  }

  setButtonSetting(buttonSetting) {
    console.log(buttonSetting)
    this.buttonSetting = buttonSetting
  }

  setReplacerSetting(replacerSetting) {
    this.replacerSetting = replacerSetting
  }

  setCurrentNetworkSettings() {
    this.window.webContents.executeJavaScript('document.settings.ipaddr.value = "' + this.networkSettings.settings.hostIPAddress + '";')
    this.window.webContents.executeJavaScript('document.settings.port.value = "' + this.networkSettings.settings.portNo + '";')
    this.window.webContents.executeJavaScript('updateHostUrl();')
    ipcMain.on(`network-apply`, (sender, newNetworkSettings) => {
      this.networkSettings.save(newNetworkSettings)
    })
  }

  setCurrentButtonSetting() {
    this.window.webContents.executeJavaScript(`setButtonSetting(${JSON.stringify(this.buttonSetting.settings)});`)
    ipcMain.on(`buttons-apply`, (sender, newButtonSettings) => {
      this.buttonSetting.save(newButtonSettings)
    })
  }

  setCurrentReplacerSetting() {
    this.window.webContents.executeJavaScript(`setReplacer(${JSON.stringify(this.replacerSetting.settings)});`)
    ipcMain.on(`replacer-apply`, (sender, newReplacer) => {
      this.replacerSetting.save(newReplacer)
    })
  }

  onFinishLoad() {
    const setCurrentFunc = {
      "Network": this.setCurrentNetworkSettings.bind(this),
      "Buttons": this.setCurrentButtonSetting.bind(this),
      "Replacer": this.setCurrentReplacerSetting.bind(this),
    };
    setCurrentFunc[this.activeTab]()
  }

  show(parent) {
    this.window = this.window || new BrowserWindow({ parent: parent, show: false })
    this.window.once('ready-to-show', () => this.window.show())
    this.window.webContents.on('did-finish-load', this.onFinishLoad.bind(this))
    this.window.on('closed', () => { this.window = null })
    this.activeTab = "Network"
    this.window.loadURL('file://' + __dirname + '/../../renderer/networksetting.html')
    this.window.webContents.openDevTools()

    ipcMain.on(`tab-active`, (sender, tabName) => {
      if (this.activeTab != tabName) {
        if (tabName == 'Network') {
          this.window.loadURL('file://' + __dirname + '/../../renderer/networksetting.html')
        }
        if (tabName == 'Buttons') {
          this.window.loadURL('file://' + __dirname + '/../../renderer/buttonsetting.html')
        }
        if (tabName == 'Replacer') {
          this.window.loadURL('file://' + __dirname + '/../../renderer/replacesetting.html')
        }
      }
      this.activeTab = tabName
    })
  }
}

