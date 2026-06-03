export default Object.freeze({
	TARGET_ALL_CHOICES: [
		{ id: 'current', label: 'CURRENT' },
		{ id: 'playhead', label: 'PLAYHEAD' },
		{ id: 'active', label: 'ALL ACTIVE' },
	],

	TARGET_CHOICES: [
		{ id: 'current', label: 'CURRENT' },
		{ id: 'playhead', label: 'PLAYHEAD' },
	],

	POSITION_CHOICES: [
		{ id: 'First', label: 'First' },
		{ id: 'Last', label: 'Last' },
		{ id: 'Next', label: 'Next' },
		{ id: 'Prev', label: 'Previous' },
	],

	DIRECTION_CHOICES: [
		{ id: 'back', label: 'BACK' },
		{ id: 'fwd', label: 'FORWARD' },
		{ id: 'end', label: 'END' },
	],

	PAN_CHOICES: [
		{ id: 'absolute', label: 'ABSOLUTE' },
		{ id: 'scale', label: 'SCALE (Float -1 to 1)' },
		{ id: '-', label: 'LEFT' },
		{ id: '+', label: 'RIGHT' },
		{ id: 'revert', label: 'REVERT' },
	],

	SPEED_CHOICES: [
		{ id: 'absolute', label: 'ABSOLUTE' },
		{ id: 'scale', label: 'SCALE (Float -1 to 1)' },
		{ id: 'relative', label: 'RELATIVE' },
		{ id: 'revert', label: 'REVERT' },
	],

	VOLUME_CHOICES: [
		{ id: 'absolute', label: 'ABSOLUTE (dB)' },
		{ id: 'scale', label: 'SCALE (Float 0 to 1)' },
		{ id: '-', label: 'DECREASE (dB)' },
		{ id: '+', label: 'INCREASE (dB)' },
		{ id: 'revert', label: 'REVERT' },
	],

	HOLD_ACTIONS: [
		{ id: 'none', label: 'None' },
		{ id: 'repeat', label: 'Repeat same action' },
	],

	STOPWATCH_CHOICES: [
		{ id: 'start', label: 'START' },
		{ id: 'stop', label: 'STOP' },
		{ id: 'reset', label: 'RESET' },
	],
	VOL_DISPLAY_CHOICES: [
		{ id: 'db', label: 'dB' },
		{ id: 'percent', label: '%' },
	],
	VOL_MIN_CHOICES: [
		{ id: '-60', label: '-60 dB' },
		{ id: '-90', label: '-90 dB' },
		{ id: '-120', label: '-120 dB' },
	],
})
