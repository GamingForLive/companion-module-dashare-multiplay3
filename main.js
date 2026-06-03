import { InstanceBase, Regex, runEntrypoint, InstanceStatus, combineRgb } from '@companion-module/base'
import UpgradeScripts from './upgrades.js'
import UpdateActions from './actions.js'
import UpdateFeedbacks from './feedbacks.js'
import UpdateVariableDefinitions from './variables.js'
import UpdatePresets from './presets.js'

import CHOICES from './choices.js'
import { THEMES } from './themes.js'

import { Server } from 'node-osc'

class MultiplayInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets()
		this.initOsc()
		this.initVariables()
		this.holdTimers = {}
	}

	initOsc() {
		const self = this

		self.ready = true

		if (self.listener) {
			self.listener.close()
		}

		if (!self.config.feedback_port) return

		self.listener = new Server(self.config.feedback_port, '0.0.0.0', () => {})

		self.listener.on('message', function (message) {
			switch (message[0]) {
				case '/status/elapsed':
					self.timeElapsed = message[1] || 'Elapsed'
					self.setVariableValues({ t_elapsed: self.timeElapsed })
					self.checkFeedbacks('time_font_size')
					break
				case '/status/remaining':
					self.timeRemaining = message[1] || 'Remaining'
					self.setVariableValues({ t_remain: self.timeRemaining })
					self.checkFeedbacks('time_font_size', 'warningTime')
					break
				case '/status/current/qdesc':
				case '/status/current/QDesc':
					self.currentCue = message[1] || 'Description'
					self.setVariableValues({ q_description: self.currentCue })
					break
				case '/status/stopall':
					self.stopAllStatus = message[1] === true
					self.setVariableValues({ st_stopAll: self.stopAllStatus })
					self.checkFeedbacks()
					break
				case '/status/fadeall':
					self.fadeAllStatus = message[1] === true
					self.setVariableValues({ st_fadeAll: self.fadeAllStatus })
					self.checkFeedbacks()
					break
				case '/status/go':
					// self.goStatus = message[1] === true
					self.goStatus = !!message[1]
					self.setVariableValues({ st_go: self.goStatus })
					self.checkFeedbacks()
					break
				case '/status/select/prev':
					self.prevStatus = message[1] === true
					self.setVariableValues({ st_prev: self.prevStatus })
					self.checkFeedbacks()
					break
				case '/status/select/next':
					self.nextStatus = message[1] === true
					self.setVariableValues({ st_next: self.nextStatus })
					self.checkFeedbacks()
					break
				case '/status/current/volume':
				case '/status/volume':
				case '/status/current/Volume':
				case '/status/Volume':
					if (typeof message[1] === 'number') {
						const minDb = parseFloat(self.config.volume_min_db ?? -60)
						self.currentVolume = Math.max(minDb, message[1])
						self.updateVolumeVariable()
					} else {
						self.currentVolume = message[1]
						self.setVariableValues({ v_current: self.currentVolume })
					}
					self.checkFeedbacks('volume')
					break
				case '/status/current/pan':
				case '/status/pan':
				case '/status/current/Pan':
				case '/status/Pan':
					if (typeof message[1] === 'number') {
						self.currentPan = message[1]
						let panLabel = self.currentPan
						if (self.currentPan === 0) panLabel = 'Center'
						else if (self.currentPan < 0) panLabel = 'L' + Math.abs(self.currentPan)
						else panLabel = 'R' + self.currentPan
						self.setVariableValues({ p_current: panLabel })
					} else {
						self.currentPan = message[1]
						self.setVariableValues({ p_current: self.currentPan })
					}
					self.checkFeedbacks('pan')
					break
				case '/status/current/speed':
				case '/status/speed':
				case '/status/current/Speed':
				case '/status/Speed':
					if (typeof message[1] === 'number') {
						self.currentSpeed = message[1]
						self.setVariableValues({ s_current: self.currentSpeed + '%' })
					} else {
						self.currentSpeed = message[1]
						self.setVariableValues({ s_current: self.currentSpeed })
					}
					self.checkFeedbacks('speed')
					break
				case '/status/sw':
					self.stopwatchTime = message[1]
					self.setVariableValues({ sw_time: self.stopwatchTime })
					break
				case '/status/stopwatch':
					self.stopwatchTime = message[1]
					self.setVariableValues({ sw_time: self.stopwatchTime })
					break
				case '/status/Stopwatch':
					self.stopwatchTime = message[1]
					self.setVariableValues({ sw_time: self.stopwatchTime })
					break
			}
			self.checkFeedbacks()
		})
	}

	initVariables() {
		const self = this

		//Action enabled states

		self.goStatus = false
		self.stopAllStatus = false
		self.fadeAllStatus = false
		self.fadingOutStatus = false
		self.prevStatus = false
		self.nextStatus = false
		self.timeRemaining = 'Remaining'
		self.timeElapsed = 'Elapsed'
		self.currentCue = 'Description'
		self.currentVolume = 0
		self.currentPan = 0
		self.currentSpeed = 100
		self.stopwatchTime = ''

		this.updateColorVariables()
		this.updateVolumeVariable()

		this.setVariableValues({
			t_remain: self.timeRemaining,
			t_elapsed: self.timeElapsed,
			q_description: self.currentCue,
			p_current: 'Center',
			s_current: self.currentSpeed + '%',
		})
	}

	// When module gets deleted
	async destroy() {
		const self = this

		if (self.listener) {
			self.listener.close()
		}

		// Clear all hold timers
		if (self.holdTimers) {
			for (const id in self.holdTimers) {
				const timer = self.holdTimers[id]
				if (timer.timeout) clearTimeout(timer.timeout)
				if (timer.interval) clearInterval(timer.interval)
			}
			self.holdTimers = {}
		}

		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

		this.updateColorVariables()
		this.updateVolumeVariable()

		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresets()
		
		// Re-init OSC if port changed
		this.initOsc()
		
		this.checkFeedbacks()
	}

	updateColorVariables() {
		const variables = {}

		// Current selected theme colors
		const currentColors = this.getThemeColors()
		variables['color_inactive_bg'] = currentColors.inactive_bg
		variables['color_inactive_text'] = currentColors.inactive_text
		variables['color_active_bg'] = currentColors.active_bg
		variables['color_active_text'] = currentColors.active_text
		variables['color_available_bg'] = currentColors.available_bg
		variables['color_available_text'] = currentColors.available_text
		variables['color_info_bg'] = currentColors.info_bg
		variables['color_info_text'] = currentColors.info_text

		// Colors for each theme slot
		const themeCount = this.config?.theme_count ?? 0
		for (let i = 1; i <= themeCount; i++) {
			const themeId = i === 1 ? 'custom' : `custom${i}`
			const colors = this.getThemeColors({ theme: themeId })
			const prefix = `theme${i}`

			variables[`${prefix}_inactive_bg`] = colors.inactive_bg
			variables[`${prefix}_inactive_text`] = colors.inactive_text
			variables[`${prefix}_active_bg`] = colors.active_bg
			variables[`${prefix}_active_text`] = colors.active_text
			variables[`${prefix}_available_bg`] = colors.available_bg
			variables[`${prefix}_available_text`] = colors.available_text
			variables[`${prefix}_info_bg`] = colors.info_bg
			variables[`${prefix}_info_text`] = colors.info_text
		}

		this.setVariableValues(variables)
	}

	updateVolumeVariable() {
		const minDb = parseFloat(this.config.volume_min_db ?? -60)
		const currentVol = typeof this.currentVolume === 'number' ? this.currentVolume : 0

		const volDb = currentVol + ' dB'
		let percent = Math.round(((currentVol - minDb) / (0 - minDb)) * 100)
		percent = Math.max(0, Math.min(100, percent))
		const volPercent = percent + '%'

		const displayMode = this.config.volume_display_mode ?? 'db'
		const volLabel = displayMode === 'percent' ? volPercent : volDb

		this.setVariableValues({
			v_current: volLabel,
			v_current_db: volDb,
			v_current_percent: volPercent,
		})

		this.checkFeedbacks('volume')
	}

	getThemeColors(config) {
		const theme = (config || this.config || {}).theme || 'default'

		if (theme.startsWith('custom')) {
			const slotNum = theme === 'custom' ? 1 : parseInt(theme.replace('custom', ''))
			const suffix = slotNum === 1 ? '' : `_${slotNum}`
			const defaultColors = THEMES.default

			return {
				inactive_text: (config || this.config || {})[`color_inactive_text${suffix}`] ?? defaultColors.inactive_text,
				inactive_bg: (config || this.config || {})[`color_inactive_bg${suffix}`] ?? defaultColors.inactive_bg,
				active_text: (config || this.config || {})[`color_active_text${suffix}`] ?? defaultColors.active_text,
				active_bg: (config || this.config || {})[`color_active_bg${suffix}`] ?? defaultColors.active_bg,
				available_text: (config || this.config || {})[`color_available_text${suffix}`] ?? defaultColors.available_text,
				available_bg: (config || this.config || {})[`color_available_bg${suffix}`] ?? defaultColors.available_bg,
				info_text: (config || this.config || {})[`color_info_text${suffix}`] ?? defaultColors.info_text,
				info_bg: (config || this.config || {})[`color_info_bg${suffix}`] ?? defaultColors.info_bg,
			}
		}

		return THEMES[theme] || THEMES.default
	}

	getConfigFields() {
		const themeChoices = [
			{ id: 'default', label: 'Default (Purple)' },
			{ id: 'black', label: 'Black' },
			{ id: 'cyan', label: 'Cyan' },
			{ id: 'blue', label: 'Blue' },
			{ id: 'red', label: 'Red' },
			{ id: 'green', label: 'Green' },
			{ id: 'white', label: 'White' },
		]

		const themeCount = this.config?.theme_count ?? 0
		const customChoices = []
		for (let i = 1; i <= themeCount; i++) {
			customChoices.push({ id: i === 1 ? 'custom' : `custom${i}`, label: `Custom ${i}` })
		}

		const fields = [
			{
				type: 'static-text',
				id: 'info_conn',
				width: 12,
				label: 'Connection Settings',
				value: 'Configure the network connection to MultiPlay.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
			},
			{
				type: 'textinput',
				id: 'feedback_port',
				label: 'Feedback Port',
				width: 4,
				regex: Regex.PORT,
			},
			{
				type: 'static-text',
				id: 'hr1',
				width: 12,
				label: '',
				value: '<hr />',
			},
			{
				type: 'static-text',
				id: 'info_vol',
				width: 12,
				label: 'Volume Settings',
				value: 'Configure how volume values are processed and displayed.',
			},
			{
				type: 'dropdown',
				id: 'volume_display_mode',
				label: 'Volume Display',
				default: 'db',
				width: 6,
				choices: CHOICES.VOL_DISPLAY_CHOICES,
			},
			{
				type: 'dropdown',
				id: 'volume_min_db',
				label: 'Min Volume (dB)',
				default: '-60',
				width: 6,
				choices: CHOICES.VOL_MIN_CHOICES,
			},
			{
				type: 'static-text',
				id: 'hr2',
				width: 12,
				label: '',
				value: '<hr />',
			},
			{
				type: 'static-text',
				id: 'info_theme',
				width: 12,
				label: 'Theme Settings',
				value: 'Choose a design or configure custom color slots.',
			},
			{
				type: 'dropdown',
				id: 'theme',
				label: 'Design Theme (Current)',
				default: 'default',
				width: 6,
				choices: [...themeChoices, ...customChoices],
			},
			{
				type: 'number',
				id: 'theme_count',
				label: 'Number of custom themes',
				default: 0,
				min: 0,
				max: 20,
				width: 6,
			},
			{
				type: 'static-text',
				id: 'theme_info',
				label: 'Manage Themes',
				value: 'Increase the count to create a new theme slot.',
				width: 12,
			},
		]

		// Add fields for each custom theme
		for (let i = 1; i <= themeCount; i++) {
			const t = i === 1 ? 'custom' : `custom${i}`
			const slotNum = i
			const suffix = slotNum === 1 ? '' : `_${slotNum}`
			const labelSuffix = ` (Slot ${slotNum})`

			fields.push(
				{
					type: 'static-text',
					id: `hr_theme${suffix}`,
					width: 12,
					label: '',
					value: `<hr /> <strong>Theme ${slotNum} Konfiguration</strong>`,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_inactive_text${suffix}`,
					label: `Inactive Text${labelSuffix}`,
					default: combineRgb(182, 182, 182),
					width: 4,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_inactive_bg${suffix}`,
					label: `Inactive BG${labelSuffix}`,
					default: combineRgb(102, 0, 102),
					width: 4,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_active_text${suffix}`,
					label: `Active Text${labelSuffix}`,
					default: combineRgb(204, 204, 204),
					width: 4,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_active_bg${suffix}`,
					label: `Active BG${labelSuffix}`,
					default: combineRgb(153, 0, 153),
					width: 4,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_available_text${suffix}`,
					label: `Available Text${labelSuffix}`,
					default: combineRgb(204, 204, 204),
					width: 4,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_available_bg${suffix}`,
					label: `Available BG${labelSuffix}`,
					default: combineRgb(0, 204, 0),
					width: 4,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_info_text${suffix}`,
					label: `Info Text${labelSuffix}`,
					default: combineRgb(102, 0, 102),
					width: 6,
					isVisible: (config) => config.theme === t || config.advanced,
				},
				{
					type: 'colorpicker',
					id: `color_info_bg${suffix}`,
					label: `Info BG${labelSuffix}`,
					default: combineRgb(182, 182, 182),
					width: 6,
					isVisible: (config) => config.theme === t || config.advanced,
				},
			)
		}

		return fields
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}
}

runEntrypoint(MultiplayInstance, UpgradeScripts)
