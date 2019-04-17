const os = require('os')
const storage = require('electron-json-storage-sync')

const getLocalIpAddresses = (address_family) =>
{
  var interfaces = os.networkInterfaces();
  var addresses = [];

  for (var ifName in interfaces) {
    for (var index in interfaces[ifName]) {
      var address = interfaces[ifName][index]
      if (!address.internal && address.family === address_family) {
        addresses.push( address.address )
      }
    }
  }
  return addresses
}

module.exports = class Settings {
  constructor(filePath) {
    this.settings = null
    this.filePath = filePath
    this.handler = null
  }

  setChangeHandler(handler) {
    this.handler = handler
  }

  loadDefault() {
    var localIPAddress = getLocalIpAddresses('IPv4')[0]
    var portNo = 4192
    return {
      hostURL: `https://${localIPAddress}:${portNo}`,
      hostIPAddress: localIPAddress,
      portNo: portNo
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
}

