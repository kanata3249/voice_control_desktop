var FFI = require('ffi')
var ref = require('ref')
var os = require('os')

module.exports = class NativeWindow {
  constructor() {
    this.nativeApi = null
    if (os.type().toString().match('Windows')) {
      this.nativeApi = new Win32Api()
    }
  }

  paste(text) {
    return this.nativeApi && this.nativeApi.paste(text)
  }
}

var int32ptr = ref.refType('int32')

const WM_KEYDOWN = 0x0100
const WM_KEYUP = 0x0101
//const WM_CHAR = 0x0102
const WM_IME_CHAR = 0x0286

class Win32Api {
  constructor() {
    this.user32 = new FFI.Library('user32', {
      'GetFocus': [
        'int32', []
      ],
      'GetForegroundWindow': [
        'int32', []
      ],
      'GetWindowThreadProcessId': [
        'int32', ['int32', int32ptr]
      ],
      'AttachThreadInput': [
        'int32', ['int32', 'int32', 'int32'],
      ],
      "PostMessageW": [
        'int32', ['int32', 'int32', 'int32', 'uint32'],
      ]
    })

    this.kernel32 = new FFI.Library('kernel32', {
      'GetCurrentThreadId': [
        'int32', []
      ]
    })
  }

  getFocusWindow() {
    var fgProcessIdPtr = ref.alloc('int32')
    var focusWindow;

    const fgWindow = this.user32.GetForegroundWindow()
    const fgThreadId = this.user32.GetWindowThreadProcessId(fgWindow, fgProcessIdPtr)
    const myThreadId = this.kernel32.GetCurrentThreadId()
    const need_detach = this.user32.AttachThreadInput(myThreadId, fgThreadId, true)

    focusWindow = this.user32.GetFocus()
    if (need_detach) {
      this.user32.AttachThreadInput(myThreadId, fgThreadId, false)
    }
    if (focusWindow == 0) {
      focusWindow = fgWindow
    }
    return focusWindow
  }

  getApplicationName() {
  }

  sendTextWithDelay(focusWindow, text, delay) {
    if (text.length == 0) {
      return
    }

    const keyCodeTable = {
      0x0a: [0x0d, 0x1c],   // '\n'
      0x09: [0x09, 0x0f],   // '\t'
      0x2f: [0xbf, 0x35]    // '/'
    }

    const charCode = text.charCodeAt(0)
    const keyCode = keyCodeTable[charCode]
    if (keyCode) {
      this.user32.PostMessageW(focusWindow, WM_KEYDOWN, keyCode[0], 0x00000000 | ((keyCode[1] << 16)) >>> 0)
      this.user32.PostMessageW(focusWindow, WM_KEYUP, keyCode[0], (0xc0000000 | (keyCode[1] << 16)) >>> 0)
    } else {
      this.user32.PostMessageW(focusWindow, WM_IME_CHAR, charCode, 0)
    }
    setTimeout(this.sendTextWithDelay.bind(this), delay, focusWindow, text.slice(1), delay)
  }
  
  paste(text) {
    const focusWindow = this.getFocusWindow()
    this.sendTextWithDelay(focusWindow, text, 20)
  }
}
