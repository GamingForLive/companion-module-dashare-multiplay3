import CHOICES from './choices.js'
import { combineRgb } from '@companion-module/base'

export default async function (self) {
	self.setFeedbackDefinitions({
		theme_base: {
			name: 'Theme: Base Colors',
			type: 'advanced',
			description: 'Applies the current theme colors to the button',
			options: [
				{
					id: 'state',
					type: 'dropdown',
					label: 'State',
					default: 'inactive',
					choices: [
						{ id: 'inactive', label: 'Inactive' },
						{ id: 'available', label: 'Available' },
						{ id: 'active', label: 'Active' },
						{ id: 'info', label: 'Info (Inverted)' },
					],
				},
			],
			callback: (feedback) => {
				const colors = self.getThemeColors()
				switch (feedback.options.state) {
					case 'active':
						return {
							bgcolor: colors.active_bg,
							color: colors.active_text,
						}
					case 'available':
						return {
							bgcolor: colors.available_bg,
							color: colors.available_text,
						}
					case 'info':
						return {
							bgcolor: colors.info_bg,
							color: colors.info_text,
						}
					case 'inactive':
					default:
						return {
							bgcolor: colors.inactive_bg,
							color: colors.inactive_text,
						}
				}
			},
		},

		checkState: {
			name: 'Theme: Action States',
			type: 'advanced',
			label: 'Highlight buttons when action is available (GO, Next, etc)',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Select action',
					default: 0,
					choices: [
						{ id: 0, label: 'GO' },
						{ id: 1, label: 'Stop all' },
						{ id: 2, label: 'Fade all' },
						{ id: 7, label: 'Pause all' },
						{ id: 3, label: 'Previous' },
						{ id: 4, label: 'Next' },
						{ id: 5, label: 'First' },
						{ id: 6, label: 'Last' },
						{ id: 8, label: 'SW Start' },
						{ id: 9, label: 'SW Stop' },
						{ id: 10, label: 'SW Reset' },
					],
				},
			],
			callback: (feedback) => {
				const colors = self.getThemeColors()
				let isActive = false
				switch (feedback.options.action) {
					case 0:
						isActive = self.goStatus
						break
					case 1:
						isActive = self.stopAllStatus
						break
					case 2:
						isActive = self.fadeAllStatus
						break
					case 7:
						isActive = self.stopAllStatus
						break
					case 3:
						// Previous
						isActive = true
						break
					case 4:
						// Next
						isActive = true
						break
					case 5:
						// First
						isActive = true
						break
					case 6:
						// Last
						isActive = true
						break
					case 8:
						// SW Start
						isActive = true
						break
					case 9:
						// SW Stop
						isActive = true
						break
					case 10:
						// SW Reset
						isActive = true
						break
				}

				if (isActive) {
					// Use active colors (lighter) instead of available colors (green) for these buttons
					const style = {
						bgcolor: colors.active_bg,
						color: colors.active_text,
					}
					if (feedback.options.action === 0) {
						style.text = 'GO'
					}
					return style
				} else {
					// If not active, but it's the GO button, we might still want to show it in 'active' style
					// if that's what the user meant by "farbe vom richtigen stop zustand sollte auch die active farb haben"
					// "Proper stop state" usually means when it's NOT playing.
					if (feedback.options.action === 0) {
						return {
							bgcolor: colors.active_bg,
							color: colors.active_text,
							text: 'STOP',
							size: 25,
						}
					}
				}
				return {}
			},
		},

		navigation: {
			name: 'Theme: Navigation Highlight',
			type: 'advanced',
			label: 'Highlight Prev/Next when adjustable',
			options: [],
			callback: () => {
				return {}
			},
		},

		volume: {
			name: 'Theme: Volume Highlight',
			type: 'advanced',
			label: 'Highlight volume when adjustable',
			options: [],
			callback: () => {
				const colors = self.getThemeColors()
				// Highlight if a cue is selected (nextStatus) or if something is active (stopAllStatus implies active cues)
				if (self.nextStatus || self.stopAllStatus) {
					return {
						bgcolor: colors.active_bg,
						color: colors.active_text,
					}
				}
				return {}
			},
		},

		pan: {
			name: 'Theme: Pan Highlight',
			type: 'advanced',
			label: 'Highlight pan when adjustable',
			options: [],
			callback: () => {
				const colors = self.getThemeColors()
				if (self.nextStatus || self.stopAllStatus) {
					return {
						bgcolor: colors.active_bg,
						color: colors.active_text,
					}
				}
				return {}
			},
		},

		speed: {
			name: 'Theme: Speed Highlight',
			type: 'advanced',
			label: 'Highlight speed when adjustable',
			options: [],
			callback: () => {
				const colors = self.getThemeColors()
				if (self.nextStatus || self.stopAllStatus) {
					return {
						bgcolor: colors.active_bg,
						color: colors.active_text,
					}
				}
				return {}
			},
		},

		active: {
			name: 'Theme: Active Cue Highlight',
			type: 'advanced',
			label: 'Highlight when the current cue is active',
			options: [],
			callback: () => {
				const colors = self.getThemeColors()
				if (self.nextStatus || self.stopAllStatus) {
					return {
						bgcolor: colors.active_bg,
						color: colors.active_text,
					}
				}
				return {}
			},
		},

		warningTime: {
			name: 'End Warning',
			type: 'boolean',
			label: 'Set time to ends',
			defaultStyle: {
				color: combineRgb(255, 0, 0),
			},
			options: [
				{
					id: 'seconds',
					type: 'textinput',
					label: 'Seconds to warm (max 59)',
					default: 5,
				},
			],
			callback: (feedback) => {
				if (!self.timeRemaining.includes(':')) {
					return feedback.options.seconds >= parseInt(self.timeRemaining)
				}
				return false
			},
		},

		time_font_size: {
			name: 'Time font size',
			type: 'advanced',
			label: 'Dynamic font size for time displays',
			options: [
				{
					type: 'dropdown',
					id: 'type',
					label: 'Type',
					default: 'elapsed',
					choices: [
						{ id: 'elapsed', label: 'Elapsed' },
						{ id: 'remain', label: 'Remaining' },
					],
				},
			],
			callback: (feedback) => {
				const timeStr = feedback.options.type === 'elapsed' ? self.timeElapsed : self.timeRemaining
				const isPlaceholder = timeStr === 'Elapsed' || timeStr === 'Remaining'

				if (isPlaceholder) {
					return { size: 13 }
				}

				const getSeconds = (str) => {
					if (!str || typeof str !== 'string') return null
					const normalizedTime = str.replace(',', '.').trim()
					const parts = normalizedTime.split(':')
					let totalSeconds = 0
					try {
						if (parts.length === 1) {
							totalSeconds = parseFloat(parts[0].replace(/[^\d.-]/g, ''))
						} else if (parts.length === 2) {
							const mins = parseFloat(parts[0].replace(/[^\d.-]/g, ''))
							const secs = parseFloat(parts[1].replace(/[^\d.-]/g, ''))
							totalSeconds = mins * 60 + secs
						} else if (parts.length >= 3) {
							const hours = parseFloat(parts[0].replace(/[^\d.-]/g, ''))
							const mins = parseFloat(parts[1].replace(/[^\d.-]/g, ''))
							const secs = parseFloat(parts[2].replace(/[^\d.-]/g, ''))
							totalSeconds = hours * 3600 + mins * 60 + secs
						}
					} catch (e) {
						return null
					}
					return isNaN(totalSeconds) ? null : totalSeconds
				}

				const seconds = getSeconds(timeStr)
				if (seconds === null) return { size: 13 }

				if (feedback.options.type === 'remain') {
					if (seconds < 10) return { size: 44 }
					if (seconds <= 60) return { size: 30 }
					return { size: 24 }
				} else {
					if (seconds < 10) return { size: 44 }
					if (seconds < 60) return { size: 30 }
					return { size: 24 }
				}
			},
		},
	})
}
