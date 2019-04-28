const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const loadDevtool = require('electron-load-devtool')

const ReplacerSetting = require('../lib/ReplacerSetting')
const ButtonSetting = require('../lib/ButtonSetting')

module.exports = class SettingWindow {
  constructor(settings) {
    this.window = null
    this.activeTab = ''
    this.settings = settings
  }

  setTargetType(targetType) {
    if (this.currentTargetType != targetType) {
      this.currentTargetType = targetType
      this.buttonSetting = new ButtonSetting(targetType)
      this.buttonSetting.load()
      this.replacerSetting = new ReplacerSetting(targetType)
      this.replacerSetting.load()
      }
  }

  setActiveTab(tabName) {
    if (this.activeTab != tabName) {
      const urls = {
        Network: '/../../renderer/networksetting.html',
        Buttons: '/../../renderer/buttonsetting.html',
        Replacer: '/../../renderer/replacesetting.html',
      }

      this.activeTab = tabName
      this.window.loadURL('file://' + __dirname + urls[tabName])
    }
  }
  
  showCurrentNetworkSettings() {
    this.window.webContents.executeJavaScript('document.settings.ipaddr.value = "' + this.settings.settings.hostIPAddress + '";')
    this.window.webContents.executeJavaScript('document.settings.port.value = "' + this.settings.settings.portNo + '";')
    this.window.webContents.executeJavaScript('updateHostUrl();')
  }

  showCurrentButtonSetting() {
    this.window.webContents.executeJavaScript(`setButtonSetting(${JSON.stringify(this.buttonSetting.settings)},
                                                                ${JSON.stringify(this.settings.settings.targetTypes)},
                                                                "${this.currentTargetType}");`)
  }

  showCurrentReplacerSetting() {
    this.window.webContents.executeJavaScript(`setReplacer(${JSON.stringify(this.replacerSetting.settings)},
                                                           ${JSON.stringify(this.settings.settings.targetTypes)},
                                                           "${this.currentTargetType}");`)
  }

  registerEventHandlers() {
    ipcMain.on(`tab-active`, (sender, tabName) => {
      this.setActiveTab(tabName)
    })
    ipcMain.on(`network-apply`, (sender, newNetworkSettings) => {
      newNetworkSettings.targetTypes = this.settings.settings.targetTypes
      this.settings.save(newNetworkSettings)
    })
    ipcMain.on('buttons-apply', (sender, newButtonSettings) => {
      this.settings.save(this.settings.settings)
      this.buttonSetting.save(newButtonSettings)
    })
    ipcMain.on('buttons-targettype', (sender, newTargetType) => {
      if (!this.settings.settings.targetTypes.includes(newTargetType)) {
        this.settings.settings.targetTypes.push(newTargetType)
      }
      this.setTargetType(newTargetType)
      this.showCurrentButtonSetting()
    })
    ipcMain.on(`replacer-apply`, (sender, newReplacer) => {
      this.settings.save(this.settings.settings)
      this.replacerSetting.save(newReplacer)
    })
    ipcMain.on(`replacer-targettype`, (sender, newTargetType) => {
      if (!this.settings.settings.targetTypes.includes(newTargetType)) {
        this.settings.settings.targetTypes.push(newTargetType)
      }
      this.setTargetType(newTargetType)
      this.showCurrentReplacerSetting()
    })
  }

  onFinishLoad() {
    const showCurrentValueProc = {
      'Network': this.showCurrentNetworkSettings.bind(this),
      'Buttons': this.showCurrentButtonSetting.bind(this),
      'Replacer': this.showCurrentReplacerSetting.bind(this),
    };
    showCurrentValueProc[this.activeTab]()
  }

  show(parent, targetType) {
    this.window = this.window || new BrowserWindow({ parent: parent, show: false })
    this.window.once('ready-to-show', () => this.window.show())
    this.window.webContents.on('did-finish-load', this.onFinishLoad.bind(this))
    this.window.on('closed', () => { this.window = null })
    loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS)
    // this.window.webContents.openDevTools()

    this.registerEventHandlers()
  
    this.setTargetType(targetType)
    this.setActiveTab('Network')
  }
}

