
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const loadDevtool = require('electron-load-devtool')

const Settings = require('../lib/Settings')
const ApiServer = require('../lib/ApiServer')
const ReplacerSetting = require('../lib/ReplacerSetting')
const ButtonSetting = require('../lib/ButtonSetting')
const NativeWindow = require('../lib/NativeWindow')
const SettingWindow = require('./SettingWindow')

let nativeWindow = new NativeWindow()
let apiServer = null
let settings = null
let replacerSetting = null
let buttonSetting = null
let currentTargetType

let mainWindow = null
let settingWindow = null

const prepareApiServer = () => {
  const api_handler = {
    "input": (data) => {
      const translated_text = replacerSetting.replace("appName", data)
      mainWindow.webContents.send('input', `${translated_text}`)
      nativeWindow.paste(translated_text)
      return true
    },
    "buttons": () => {
      return buttonSetting.settings
    },
    "targetTypes": () => {
      return { targetTypes: settings.settings.targetTypes }
    }
  }
  apiServer = new ApiServer()
  apiServer.setSettings(settings)
  apiServer.setApiHandler(api_handler)
  apiServer.start()
  settings.setChangeHandler(() => {
    apiServer.stop()
    apiServer.start()
  })
}

const setTargetType = (targetType) => {
  if (currentTargetType != targetType) {
    currentTargetType = targetType
    replacerSetting = new ReplacerSetting(currentTargetType)
    replacerSetting.load()
    buttonSetting = new ButtonSetting(currentTargetType)
    buttonSetting.load()
  }
}

const registerEventHandlers = () => {
  ipcMain.on('main-setting', () => {
    settingWindow = settingWindow || new SettingWindow(settings)
    settingWindow.show(mainWindow, currentTargetType)
  })
  ipcMain.on('main-targettype', (sender, targetType) => {
    setTargetType(targetType)
  })
}

const onFinishLoad = () => {
  mainWindow.webContents.executeJavaScript(`setTargetTypes(${JSON.stringify(settings.settings.targetTypes)},
                                                           "${currentTargetType}");`)
}

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  settings = new Settings('config')
  settings.load()

  setTargetType(settings.settings.targetTypes[0])
  prepareApiServer()

  mainWindow = new BrowserWindow({ width: 800, height: 600, show: false })
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.webContents.on('did-finish-load', onFinishLoad)
  mainWindow.on('closed', () => { mainWindow = null })
  loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS)
  // mainWindow.webContents.openDevTools()

  registerEventHandlers()

  mainWindow.loadURL('file://' + __dirname + '/../../renderer/index.html')
})
