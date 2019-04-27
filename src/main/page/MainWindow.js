const Settings = require('../lib/Settings')
const ApiServer = require('../lib/ApiServer')
const ReplacerSetting = require('../lib/ReplacerSetting')
const ButtonSetting = require('../lib/ButtonSetting')
const NativeWindow = require('../lib/NativeWindow')
const SettingWindow = require('./SettingWindow')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

let nativeWindow = new NativeWindow()
let apiServer = null
let settings = null
let replacerSetting = null
let buttonSetting = null
let mainWindow = null
let settingWindow = null

const onRemoteEvent = (elementId, eventName, handler) => {
  const script = `document.getElementById("${elementId}").${eventName} = (event) => { ipcRenderer.send("from-${elementId}", "${eventName}")}`
  mainWindow.webContents.executeJavaScript(script)
  ipcMain.on(`from-${elementId}`, handler)
}

const onRemoteIPC = (eventName, handler) => {
  const script = `ipcRenderer.on("${eventName}", ${handler})`
  mainWindow.webContents.executeJavaScript(script)
}

const registerEventHandlers = () => {
  onRemoteEvent('setting', 'onclick', () => {
    settingWindow.show(mainWindow, settings)
  })

  onRemoteIPC('input', (event, arg) => { document.getElementById("message").value += arg })
}

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  settings = new Settings('config')
  settings.load()

  replacerSetting = new ReplacerSetting('translation')
  replacerSetting.load()
  buttonSetting = new ButtonSetting('buttons')
  buttonSetting.load()

  mainWindow = new BrowserWindow({ width: 800, height: 600, show: false })
  mainWindow.webContents.executeJavaScript('var { ipcRenderer } = require("electron")')
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.webContents.on('did-finish-load', registerEventHandlers)
  mainWindow.on('closed', () => { mainWindow = null })
  mainWindow.loadURL('file://' + __dirname + '/../../renderer/index.html')
  // mainWindow.webContents.openDevTools()
  const api_handler = {
    "input": (data) => {
      const translated_text = replacerSetting.replace("appName", data)
      mainWindow.webContents.send('input', `${translated_text}`)
      nativeWindow.paste(translated_text)
      return true
    },
    "buttons": () => {
      return buttonSetting.settings;
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

  settingWindow = new SettingWindow()
  settingWindow.setNetworkSettings(settings)
  settingWindow.setReplacerSetting(replacerSetting)
  settingWindow.setButtonSetting(buttonSetting)
})
