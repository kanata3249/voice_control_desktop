var FFI = require('ffi')
var ref = require('ref')

var int32ptr = ref.refType('int32')

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
  "SendMessageA": [
    'int32', ['int32', 'int32', 'int32', 'int32'],
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
    user32.SendMessageA(focusWindow, WM_IME_CHAR, text.charCodeAt(0), 0)
    setTimeout(this.sendTextWithDelay.bind(this), delay, focusWindow, text.slice(1), delay)
  }

  paste(text) {
    const focusWindow = this.getFocusWindow()
    this.sendTextWithDelay(focusWindow, text, 1)
  }
}
