const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const dialog = electron.dialog

const loadDevtool = require('electron-load-devtool')
const path = require('path')

const ReplacerSetting = require('../lib/ReplacerSetting')
const ButtonSetting = require('../lib/ButtonSetting')

module.exports = class SettingWindow {
  constructor(settings, onChange) {
    this.window = null
    this.activeTab = ''
    this.settings = settings
    this.onChange = onChange
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

  isFocused() {
    return this.window && this.window.isFocused()
  }

  setActiveTab(tabName) {
    if (this.activeTab != tabName) {
      this.activeTab = tabName
      this.showCurrentSetting()
    }
  }
  
  showCurrentNetworkSettings() {
    this.window.webContents.executeJavaScript(`setHostUrl("${this.settings.settings.hostIPAddress}",
                                                          ${this.settings.settings.portNo});`)
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
      this.onChange('network')
    })
    ipcMain.on('buttons-apply', (sender, newButtonSettings) => {
      this.settings.save(this.settings.settings)
      this.buttonSetting.save(newButtonSettings)
      this.onChange('buttons')
    })
    ipcMain.on('buttons-targettype', (sender, newTargetType) => {
      if (!this.settings.settings.targetTypes.includes(newTargetType)) {
        this.settings.settings.targetTypes.push(newTargetType)
      }
      this.settings.save(this.settings.settings)
      this.setTargetType(newTargetType)
      this.showCurrentButtonSetting()
      this.onChange('buttons')
    })
    ipcMain.on(`replacer-apply`, (sender, newReplacer) => {
      this.settings.save(this.settings.settings)
      this.replacerSetting.save(newReplacer)
      this.onChange('replacer')
    })
    ipcMain.on(`replacer-targettype`, (sender, newTargetType) => {
      if (!this.settings.settings.targetTypes.includes(newTargetType)) {
        this.settings.settings.targetTypes.push(newTargetType)
      }
      this.settings.save(this.settings.settings)
      this.setTargetType(newTargetType)
      this.showCurrentReplacerSetting()
      this.onChange('replacer')
    })
    ipcMain.on('buttons-export', () => {
      electron.clipboard.writeText( JSON.stringify(this.buttonSetting.settings) )
    })
    ipcMain.on('buttons-import', () => {
      const data = electron.clipboard.readText()
      let newSetting = null
      try {
        newSetting = JSON.parse(data || "null")
      }
      catch(e) {
        // nop
      }
      finally {
        if ( newSetting && newSetting.tab ) {
          this.buttonSetting.settings = newSetting
          this.showCurrentButtonSetting()
          this.buttonSetting.save(newSetting)
        } else {
          dialog.showErrorBox('Copy from clipboard', 'Clipboard data was not valid format.' )
        }
      }
    })
    ipcMain.on('replacer-export', () => {
      electron.clipboard.writeText( JSON.stringify(this.replacerSetting.settings) )
    })
    ipcMain.on('replacer-import', () => {
      const data = electron.clipboard.readText()
      let newSetting = null
      try {
        newSetting = JSON.parse(data || "null")
      }
      catch(e) {
        // nop
      }
      finally {
        if ( newSetting && newSetting.replacers ) {
          this.replacerSetting.settings = newSetting
          this.showCurrentReplacerSetting()
          this.replacerSetting.save(newSetting)
        } else {
          dialog.showErrorBox('Copy from clipboard', 'Clipboard data was not valid format.' )
        }
      }
    })
  }

  showCurrentSetting() {
    const showCurrentSettingProc = {
      'network': this.showCurrentNetworkSettings.bind(this),
      'buttons': this.showCurrentButtonSetting.bind(this),
      'replacer': this.showCurrentReplacerSetting.bind(this),
    };
    showCurrentSettingProc[this.activeTab]()
  }

  show(parent, targetType) {
    this.window = this.window || new BrowserWindow({ parent: parent, width: 700, height: 500, show: false, icon: path.join(__dirname, '../assets/application.png') })
    this.window.once('ready-to-show', () => this.window.show())
    this.window.webContents.on('did-finish-load', this.showCurrentSetting.bind(this))
    this.window.on('closed', () => { this.window = null })
    loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS)
    // this.window.webContents.openDevTools()

    this.registerEventHandlers()
  
    this.setTargetType(targetType)
    this.setActiveTab('network')

    this.window.loadURL('file://' + __dirname + '/../../renderer/setting.html')
  }
}

