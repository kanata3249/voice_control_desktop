const storage = require('electron-json-storage-sync')
const Settings = require('./Settings')
const ApiServer = require('./ApiServer')
const SettingWindow = require('./SettingWindow')

require('console')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

let apiServer = null
let settings = null
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
  onRemoteEvent('clipboard', 'onclick', (event) => {
    event.sender.send('input', electron.clipboard.readText())
  })
  onRemoteEvent('setting', 'onclick', () => {
    settingWindow.show(mainWindow, settings)
  })

  onRemoteIPC('input', (event, arg) => { document.getElementById("message").value = arg })
}

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  const settings = new Settings('config')
  settings.load()

  mainWindow = new BrowserWindow({ width: 800, height: 600, show: false })
  mainWindow.webContents.executeJavaScript('var { ipcRenderer } = require("electron")')
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.webContents.on('did-finish-load', registerEventHandlers)
  mainWindow.on('closed', () => { mainWindow = null })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // mainWindow.webContents.openDevTools()
  const api_handler = {
    "input": (data) => {
      mainWindow.webContents.send('input', data)
      return true
    },
    "buttons": () => {
      const result = storage.get('buttons')
      if (result.status) {
        return result.data
      }
      return {}
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
  settingWindow.setSettings(settings)
})
