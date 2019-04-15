var FFI = require('ffi')
var ref = require('ref')

var int32ptr = ref.refType('int32')

const WM_KEYDOWN = 0x0100
const WM_KEYUP = 0x0101
const WM_CHAR = 0x0102
const WM_IME_CHAR = 0x0286
var user32 = new FFI.Library('user32', {
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

var kernel32 = new FFI.Library('kernel32', {
  'GetCurrentThreadId': [
    'int32', []
  ]
})

require('console')

module.exports = class NativeWindow {
  constructor() {
  }

  getFocusWindow() {
    var fgProcessIdPtr = ref.alloc('int32')
    var focusWindow;

    const fgWindow = user32.GetForegroundWindow()
    const fgThreadId = user32.GetWindowThreadProcessId(fgWindow, fgProcessIdPtr)
    const myThreadId = kernel32.GetCurrentThreadId()
    const need_detach = user32.AttachThreadInput(myThreadId, fgThreadId, true)

    focusWindow = user32.GetFocus()
    if (need_detach) {
      user32.AttachThreadInput(myThreadId, fgThreadId, false)
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
    const charCode = text.charCodeAt(0)
    if (charCode == 0x0d) {
      user32.PostMessageW(focusWindow, WM_KEYDOWN, charCode, 0)
      user32.PostMessageW(focusWindow, WM_KEYUP, charCode, 0xc0000000)
    } else {
      user32.PostMessageW(focusWindow, WM_IME_CHAR, charCode, 0)
    }
    setTimeout(this.sendTextWithDelay.bind(this), delay, focusWindow, text.slice(1), delay)
  }

  paste(text) {
    const focusWindow = this.getFocusWindow()
    this.sendTextWithDelay(focusWindow, text, 1)
  }
}
