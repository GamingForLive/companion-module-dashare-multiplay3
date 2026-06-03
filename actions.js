import CHOICES from './choices.js'

export default function (self) {
    if (!self.holdTimers) {
        self.holdTimers = {}
    }

    const sendOscMessage = (path, args) => {
        self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
        self.log('debug', `Sending Args ${JSON.stringify(args)}`)
        self.oscSend(self.config.host, self.config.port, path, args)
    }

    const stopTimer = (timerId) => {
        if (self.holdTimers[timerId]) {
            self.log('debug', `Stopping timer for ID: ${timerId}`)
            if (self.holdTimers[timerId].timeout) clearTimeout(self.holdTimers[timerId].timeout)
            if (self.holdTimers[timerId].interval) clearInterval(self.holdTimers[timerId].interval)
            delete self.holdTimers[timerId]
        }
    }

    self.setActionDefinitions({
        go: {
            name: 'GO',
            description: 'Initiates the GO action',
            options: [
                {
                    id: 'stopAll',
                    type: 'checkbox',
                    label: 'Stop all active cues first?',
                    default: false,
                },
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                if (event.options.stopAll) {
                    sendOscMessage('/cue/active/stop', [])
                }
                sendOscMessage(`/cue/${event.options.target}/go`, [])
            },
        },

        stop: {
            name: 'STOP',
            description: 'Initiates the Cue Stop action.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_ALL_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/stop`, [])
            },
        },

        select: {
            name: 'SELECT CUE',
            description: 'Moves the GO position in the main cue list.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.POSITION_CHOICES,
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/select/${event.options.target}`, [])
            },
        },

        cuepoint: {
            name: 'CUE POINT',
            description: 'The playback position of the targeted cue will jump to the value set in the specified cue point.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    allowCustom: true,
                },
                {
                    id: 'position',
                    type: 'dropdown',
                    label: 'Cue point number or select position',
                    choices: CHOICES.POSITION_CHOICES,
                    default: 'First',
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/cuepoint`, [
                    {
                        type: 's',
                        value: event.options.position,
                    },
                ])
            },
        },

        fade: {
            name: 'FADE',
            description: 'Initiates the Fade Out action',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_ALL_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/fade`, [])
            },
        },

        jump: {
            name: 'JUMP',
            description: 'The playback position will jump by a specific amount. If no amount is specified (or 0), the default from MultiPlay Preferences will be used.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_ALL_CHOICES,
                    allowCustom: true,
                },
                {
                    id: 'direction',
                    type: 'dropdown',
                    label: 'Direction',
                    choices: CHOICES.DIRECTION_CHOICES,
                    default: 'fwd',
                },
                {
                    id: 'amount',
                    type: 'number',
                    label: 'Size of the jump (optional, 0 uses MultiPlay preferences)',
                    default: 0,
                },
            ],
            callback: async (event) => {
                let args = []
                const amount = parseFloat(event.options.amount)
                if (amount !== 0) {
                    args.push({
                        type: 'f',
                        value: amount,
                    })
                }
                const action = 'Jump' + event.options.direction.charAt(0).toUpperCase() + event.options.direction.slice(1)
                sendOscMessage(`/cue/${event.options.target}/${action}`, args)
            },
        },

        pan: {
            name: 'PAN',
            description: 'Changes the pan position of the specified playing cue without changing the cue properties.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
                {
                    id: 'direction',
                    type: 'dropdown',
                    label: 'Direction',
                    choices: CHOICES.PAN_CHOICES,
                    default: '+',
                },
                {
                    id: 'amount',
                    type: 'number',
                    label: 'Pan amount (0 to 100)',
                    default: '1',
                    max: 100,
                    min: 0,
                    isVisible: (options) => options.direction === '+' || options.direction === '-',
                },
                {
                    id: 'absolute',
                    type: 'number',
                    label: 'Pan position (-100 full left, 100 full right, 0 center)',
                    max: 100,
                    min: -100,
                    default: 0,
                    isVisible: (options) => options.direction == 'absolute',
                },
                {
                    id: 'scale',
                    type: 'number',
                    label: 'Pan scale (-1 full left, 1 full right, 0 center)',
                    max: 1,
                    min: -1,
                    default: 0,
                    step: 0.1,
                    isVisible: (options) => options.direction == 'scale',
                },
                {
                    id: 'holdAction',
                    type: 'dropdown',
                    label: 'On Hold Action',
                    choices: CHOICES.HOLD_ACTIONS,
                    default: 'none',
                },
                {
                    id: 'holdDelay',
                    type: 'number',
                    label: 'Hold Delay (ms)',
                    default: 500,
                    min: 100,
                    max: 5000,
                    isVisible: (options) => options.holdAction !== 'none',
                },
                {
                    id: 'holdInterval',
                    type: 'number',
                    label: 'Repeat Interval (ms)',
                    default: 200,
                    min: 50,
                    max: 2000,
                    isVisible: (options) => options.holdAction === 'repeat',
                },
            ],
            callback: async (event) => {
                const timerId = event.controlId ?? event.id ?? 'default_pan'

                if (self.holdTimers[timerId]) return

                const handlePan = (isRepeat = false) => {
                    let message = `/cue/${event.options.target}/Pan`
                    let args = []
                    const amount = parseInt(event.options.amount ?? 1)

                    switch (event.options.direction) {
                        case '+':
                        case '-':
                            message += '/' + event.options.direction
                            args.push({ type: 'i', value: amount })
                            if (typeof self.currentPan === 'number') {
                                self.currentPan += event.options.direction === '+' ? amount : -amount
                            } else {
                                self.currentPan = event.options.direction === '+' ? amount : -amount
                            }
                            break
                        case 'absolute':
                            const absolute = parseInt(event.options.absolute ?? 0)
                            args.push({ type: 'i', value: absolute })
                            self.currentPan = absolute
                            break
                        case 'scale':
                            message += 'S'
                            const scale = parseFloat(event.options.scale ?? 0)
                            args.push({ type: 'f', value: scale })
                            self.currentPan = Math.round(scale * 100)
                            break
                        case 'revert':
                            message += '/Revert'
                            self.currentPan = 0
                            break
                    }

                    if (self.currentPan !== undefined) {
                        if (typeof self.currentPan === 'number') {
                            self.currentPan = Math.max(-100, Math.min(100, self.currentPan))
                        }
                        let panLabel =
                            self.currentPan === 0
                                ? 'Center'
                                : self.currentPan < 0
                                ? 'L' + Math.abs(self.currentPan)
                                : 'R' + self.currentPan
                        self.setVariableValues({ p_current: panLabel })
                    }

                    sendOscMessage(message, args)
                }

                handlePan(false)

                if (event.options.holdAction === 'repeat') {
                    const delay = parseInt(event.options.holdDelay) || 500
                    const interval = parseInt(event.options.holdInterval) || 200
                    const maxRunTime = 15000
                    const startTime = Date.now()

                    self.holdTimers[timerId] = {
                        timeout: setTimeout(() => {
                            const timer = self.holdTimers[timerId]
                            if (timer) {
                                handlePan(true)
                                timer.interval = setInterval(() => {
                                    if (Date.now() - startTime > maxRunTime) {
                                        stopTimer(timerId)
                                        return
                                    }
                                    handlePan(true)
                                }, interval)
                            }
                        }, delay),
                    }
                }
            },
        },

        pause: {
            name: 'PAUSE',
            description: 'The cue will be paused if possible.',
            options: [
                {
                    id: 'toggle',
                    type: 'checkbox',
                    label: 'Toggle mode',
                    default: false,
                },
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_ALL_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                const action = event.options.toggle ? 'PauseToggle' : 'Pause'
                sendOscMessage(`/cue/${event.options.target}/${action}`, [])
            },
        },

        restart: {
            name: 'RESTART',
            description: 'The cue will be restarted from the beginning.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_ALL_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/Restart`, [])
            },
        },

        resume: {
            name: 'RESUME',
            description: 'The cue will be resumed if possible.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_ALL_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/Resume`, [])
            },
        },

        position: {
            name: 'MOVE TO POSITION',
            description: 'The playback position will jump to the specified time.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    default: '',
                    allowCustom: true,
                },
                {
                    id: 'position',
                    type: 'number',
                    label: 'Position from the beginning in seconds',
                    default: 0,
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/Position`, [
                    {
                        type: 'f',
                        value: parseFloat(event.options.position),
                    },
                ])
            },
        },

        speed: {
            name: 'SPEED',
            description: 'Changes the speed of the specified playing cue without changing the cue properties',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
                {
                    id: 'behaviour',
                    type: 'dropdown',
                    label: 'Select behaviour',
                    choices: CHOICES.SPEED_CHOICES,
                    default: 'relative',
                },
                {
                    id: 'relative',
                    type: 'number',
                    label: 'Speed variation (-100 to 100)',
                    max: 100,
                    min: -100,
                    default: '0',
                    isVisible: (options) => options.behaviour == 'relative',
                },
                {
                    id: 'absolute',
                    type: 'number',
                    label: 'Speed (50 half speed, 150 1.5 speed)',
                    max: 150,
                    min: 50,
                    default: 100,
                    isVisible: (options) => options.behaviour == 'absolute',
                },
                {
                    id: 'scale',
                    type: 'number',
                    label: 'Speed scale (-1 to 1)',
                    max: 1,
                    min: -1,
                    default: 0,
                    step: 0.1,
                    isVisible: (options) => options.behaviour == 'scale',
                },
                {
                    id: 'holdAction',
                    type: 'dropdown',
                    label: 'On Hold Action',
                    choices: CHOICES.HOLD_ACTIONS,
                    default: 'none',
                },
                {
                    id: 'holdDelay',
                    type: 'number',
                    label: 'Hold Delay (ms)',
                    default: 500,
                    min: 100,
                    max: 5000,
                    isVisible: (options) => options.holdAction !== 'none',
                },
                {
                    id: 'holdInterval',
                    type: 'number',
                    label: 'Repeat Interval (ms)',
                    default: 200,
                    min: 50,
                    max: 2000,
                    isVisible: (options) => options.holdAction === 'repeat',
                },
            ],
            callback: async (event) => {
                const timerId = event.controlId ?? event.id ?? 'default_speed'

                if (self.holdTimers[timerId]) return

                const handleSpeed = (isRepeat = false) => {
                    let message = `/cue/${event.options.target}/Speed`
                    let args = []

                    switch (event.options.behaviour) {
                        case 'absolute':
                            const absolute = parseInt(event.options.absolute ?? 100)
                            args.push({ type: 'i', value: absolute })
                            self.currentSpeed = absolute
                            break
                        case 'relative':
                            const variation = parseInt(event.options.relative ?? 0)
                            variation >= 0 ? (message += '/+') : (message += '/-')
                            args.push({ type: 'i', value: Math.abs(variation) })
                            if (typeof self.currentSpeed === 'number') {
                                self.currentSpeed += variation
                            } else {
                                self.currentSpeed = 100 + variation
                            }
                            break
                        case 'scale':
                            message += 'S'
                            const scale = parseFloat(event.options.scale ?? 0)
                            args.push({ type: 'f', value: scale })
                            self.currentSpeed = 100 + Math.round(scale * 100)
                            break
                        case 'revert':
                            message += '/Revert'
                            self.currentSpeed = 100
                            break
                    }

                    if (self.currentSpeed !== undefined) {
                        self.currentSpeed = Math.max(50, Math.min(150, self.currentSpeed))
                        self.setVariableValues({ s_current: self.currentSpeed + '%' })
                    }

                    sendOscMessage(message, args)
                }

                handleSpeed(false)

                if (event.options.holdAction === 'repeat') {
                    const delay = parseInt(event.options.holdDelay) || 500
                    const interval = parseInt(event.options.holdInterval) || 200
                    const maxRunTime = 15000
                    const startTime = Date.now()

                    self.holdTimers[timerId] = {
                        timeout: setTimeout(() => {
                            const timer = self.holdTimers[timerId]
                            if (timer) {
                                handleSpeed(true)
                                timer.interval = setInterval(() => {
                                    if (Date.now() - startTime > maxRunTime) {
                                        stopTimer(timerId)
                                        return
                                    }
                                    handleSpeed(true)
                                }, interval)
                            }
                        }, delay),
                    }
                }
            },
        },

        track: {
            name: 'SELECT TRACK',
            description: 'Playback will jump to the specified track in a Play List cue.',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    default: '1',
                    allowCustom: true,
                },
                {
                    id: 'selection',
                    type: 'dropdown',
                    label: 'Select track index or label',
                    choices: CHOICES.POSITION_CHOICES,
                    default: 'First',
                },
            ],
            callback: async (event) => {
                sendOscMessage(`/cue/${event.options.target}/Track`, [
                    {
                        type: 's',
                        value: event.options.selection,
                    },
                ])
            },
        },

        volume: {
            name: 'VOLUME',
            description: 'Changes the volume of the specified playing cue without changing the cue properties',
            options: [
                {
                    id: 'target',
                    type: 'dropdown',
                    label: 'Q# (no spaces allowed) or select target',
                    choices: CHOICES.TARGET_CHOICES,
                    default: 'current',
                    allowCustom: true,
                },
                {
                    id: 'behaviour',
                    type: 'dropdown',
                    label: 'Select behaviour',
                    choices: CHOICES.VOLUME_CHOICES,
                    default: '+',
                },
                {
                    id: 'absolute',
                    type: 'number',
                    label: 'Set volume (0 to -120)',
                    default: '0',
                    max: 0,
                    min: -120,
                    isVisible: (options) => options.behaviour == 'absolute',
                },
                {
                    id: 'relative',
                    type: 'number',
                    label: 'Volume change (dB)',
                    default: 1,
                    max: 120,
                    min: -120,
                    isVisible: (options) => options.behaviour == '+' || options.behaviour == '-',
                },
                {
                    id: 'holdRelative',
                    type: 'number',
                    label: 'Repeat Volume change (dB)',
                    default: 2,
                    max: 120,
                    min: 1,
                    isVisible: (options) => (options.behaviour == '+' || options.behaviour == '-') && options.holdAction === 'repeat',
                },
                {
                    id: 'scale',
                    type: 'number',
                    label: 'Volume scale (0 to 1)',
                    max: 1,
                    min: 0,
                    default: 1,
                    step: 0.1,
                    isVisible: (options) => options.behaviour == 'scale',
                },
                {
                    id: 'holdAction',
                    type: 'dropdown',
                    label: 'On Hold Action',
                    choices: CHOICES.HOLD_ACTIONS,
                    default: 'none',
                },
                {
                    id: 'holdDelay',
                    type: 'number',
                    label: 'Hold Delay (ms)',
                    default: 500,
                    min: 100,
                    max: 5000,
                    isVisible: (options) => options.holdAction !== 'none',
                },
                {
                    id: 'holdInterval',
                    type: 'number',
                    label: 'Repeat Interval (ms)',
                    default: 200,
                    min: 50,
                    max: 2000,
                    isVisible: (options) => options.holdAction === 'repeat',
                },
            ],
            callback: async (event) => {
                const timerId = event.controlId ?? event.id ?? 'default_vol'

                if (self.holdTimers[timerId]) return

                const handleVolume = (isRepeat = false) => {
                    let message = `/cue/${event.options.target}/Volume`
                    let args = []

                    switch (event.options.behaviour) {
                        case 'absolute':
                            const absolute = parseInt(event.options.absolute ?? 0)
                            args.push({ type: 'i', value: absolute })
                            self.currentVolume = absolute
                            break
                        case '+':
                        case '-':
                            message += '/' + event.options.behaviour
                            let volRelative = Math.abs(parseInt(event.options.relative ?? 1))
                            if (isRepeat && event.options.holdAction === 'repeat') {
                                volRelative = Math.abs(parseInt(event.options.holdRelative ?? volRelative))
                            }
                            args.push({ type: 'i', value: volRelative })
                            if (typeof self.currentVolume === 'number') {
                                self.currentVolume += event.options.behaviour === '+' ? volRelative : -volRelative
                            } else {
                                self.currentVolume = event.options.behaviour === '+' ? volRelative : -volRelative
                            }
                            break
                        case 'scale':
                            message += 'S'
                            const scale = parseFloat(event.options.scale ?? 1)
                            args.push({ type: 'f', value: scale })
                            // Approximate dB from float scale
                            // 1.0 = 0dB, 0.0 = minDb
                            const minDbScale = parseFloat(self.config.volume_min_db ?? -60)
                            self.currentVolume = Math.round(minDbScale + scale * (0 - minDbScale))
                            break
                        case 'revert':
                            message += '/Revert'
                            self.currentVolume = 0
                            break
                    }

                    if (self.currentVolume !== undefined) {
                        const minDb = parseFloat(self.config.volume_min_db ?? -60)
                        self.currentVolume = Math.max(minDb, Math.min(0, self.currentVolume))
                        self.updateVolumeVariable()
                    }

                    sendOscMessage(message, args)
                }

                handleVolume(false)

                if (event.options.holdAction === 'repeat') {
                    const delay = parseInt(event.options.holdDelay) || 500
                    const interval = parseInt(event.options.holdInterval) || 200
                    const maxRunTime = 15000
                    const startTime = Date.now()

                    self.holdTimers[timerId] = {
                        timeout: setTimeout(() => {
                            const timer = self.holdTimers[timerId]
                            if (timer) {
                                handleVolume(true)
                                timer.interval = setInterval(() => {
                                    if (Date.now() - startTime > maxRunTime) {
                                        stopTimer(timerId)
                                        return
                                    }
                                    handleVolume(true)
                                }, interval)
                            }
                        }, delay)
                    }
                }
            },
        },

        volume_display: {
            name: 'VOLUME DISPLAY',
            description: 'Changes the GLOBAL volume display mode (dB or %)',
            options: [
                {
                    id: 'mode',
                    type: 'dropdown',
                    label: 'Select display mode',
                    choices: CHOICES.VOL_DISPLAY_CHOICES,
                    default: 'db',
                },
            ],
            callback: async (event) => {
                self.config.volume_display_mode = event.options.mode
                self.saveConfig(self.config)
                self.updateVolumeVariable()
            },
        },

        hold_release: {
            name: 'HOLD RELEASE (Put on Release)',
            description: 'Stops any running repeat loop (Volume, Pan, Speed). Put this under On Release!',
            options: [],
            callback: async (event) => {
                const timerId = event.controlId ?? event.id ?? 'default_hold'
                stopTimer(timerId)
                stopTimer('default_vol')
                stopTimer('default_pan')
                stopTimer('default_speed')
            }
        },

        stopwatch: {
            name: 'STOPWATCH',
            description: 'Control the stopwatch',
            options: [
                {
                    id: 'action',
                    type: 'dropdown',
                    label: 'Action',
                    default: 'start',
                    choices: [
                        { id: 'start', label: 'Start' },
                        { id: 'stop', label: 'Stop' },
                        { id: 'reset', label: 'Reset' },
                    ],
                },
            ],
            callback: async (event) => {
                const action = event.options.action
                if (action === 'start') {
                    sendOscMessage('/sw/start', [])
                    sendOscMessage('/stopwatch/start', [])
                    sendOscMessage('/sw', [{ type: 's', value: 'start' }])
                } else if (action === 'stop') {
                    sendOscMessage('/sw/stop', [])
                    sendOscMessage('/stopwatch/stop', [])
                    sendOscMessage('/sw', [{ type: 's', value: 'stop' }])
                } else if (action === 'reset') {
                    sendOscMessage('/sw/reset', [])
                    sendOscMessage('/stopwatch/reset', [])
                    sendOscMessage('/sw', [{ type: 's', value: 'reset' }])
                }
            },
        }
    })
}