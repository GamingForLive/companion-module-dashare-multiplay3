import { combineRgb } from '@companion-module/base'
import CHOICES from './choices.js'

export default function (self) {
	const RED = combineRgb(182, 0, 0)

	const PRESETS = {
		stopwatch_start: {
			type: 'button',
			category: 'STOPWATCH',
			name: `STOPWATCH START`,
			style: {
				text: `SW\\nSTART`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'stopwatch',
							options: {
								action: 'start',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 8,
					},
				},
			],
		},
		stopwatch_stop: {
			type: 'button',
			category: 'STOPWATCH',
			name: `STOPWATCH STOP`,
			style: {
				text: `SW\\nSTOP`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'stopwatch',
							options: {
								action: 'stop',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 9,
					},
				},
			],
		},
		stopwatch_reset: {
			type: 'button',
			category: 'STOPWATCH',
			name: `STOPWATCH RESET`,
			style: {
				text: `SW\\nRESET`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'stopwatch',
							options: {
								action: 'reset',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 10,
					},
				},
			],
		},
		speed_normal: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `SPEED NORMAL`,
			style: {
				text: `SPEED\\nNORM`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'absolute',
								absolute: 100,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		pan_center: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `PAN CENTER`,
			style: {
				text: `PAN\\nCENTER`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: 'absolute',
								absolute: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		pause_current: {
			type: 'button',
			category: 'ACTIONS',
			name: `PAUSE CURRENT`,
			style: {
				text: `PAUSE\\nCURR`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pause',
							options: {
								toggle: true,
								target: 'current',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		resume_current: {
			type: 'button',
			category: 'ACTIONS',
			name: `RESUME CURRENT`,
			style: {
				text: `RESUME\\nCURR`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'resume',
							options: {
								target: 'current',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
			],
		},
		volume_info: {
			type: 'button',
			category: 'INFO',
			name: `VOLUME INFO`,
			style: {
				text: `VOL\\n$(multiplay:v_current)`,
				size: 'auto',
				color: '$' + '(multiplay:color_info_text)',
				bgcolor: '$' + '(multiplay:color_info_bg)',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'info',
					},
				},
			],
		},
		pan_info: {
			type: 'button',
			category: 'INFO',
			name: `PAN INFO`,
			style: {
				text: `PAN\\n$(multiplay:p_current)`,
				size: 'auto',
				color: '$' + '(multiplay:color_info_text)',
				bgcolor: '$' + '(multiplay:color_info_bg)',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'info',
					},
				},
			],
		},
		speed_info: {
			type: 'button',
			category: 'INFO',
			name: `SPEED INFO`,
			style: {
				text: `SPD\\n$(multiplay:s_current)`,
				size: 'auto',
				color: '$' + '(multiplay:color_info_text)',
				bgcolor: '$' + '(multiplay:color_info_bg)',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'info',
					},
				},
			],
		},
		volume_scale_up: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `VOL SCALE 1.0`,
			style: {
				text: `VOL\\nFULL`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: 'scale',
								scale: 1,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'volume',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		volume_revert: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `VOL REVERT`,
			style: {
				text: `VOL\\n$(multiplay:v_current)`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: 'revert',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'volume',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		pan_scale_left: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `PAN SCALE LEFT`,
			style: {
				text: `PAN\\nLEFT`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: 'scale',
								scale: -1,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		pan_revert: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `PAN REVERT`,
			style: {
				text: `PAN\\n$(multiplay:p_current)`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: 'revert',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		speed_scale_normal: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `SPEED SCALE 1.0`,
			style: {
				text: `SPEED\\nNORM`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'scale',
								scale: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		speed_revert: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `SPEED REVERT`,
			style: {
				text: `SPEED\\n$(multiplay:s_current)`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'revert',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
		jump_default: {
			type: 'button',
			category: 'ADJUSTMENTS',
			name: `JUMP FWD DEFAULT`,
			style: {
				text: `JUMP\\nFWD`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'jump',
							options: {
								target: 'current',
								direction: 'fwd',
								amount: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
	}

	self.setPresetDefinitions({
		...PRESETS,
		go: {
			type: 'button',
			category: 'ACTIONS',
			name: `GO / STOP`,
			style: {
				text: `GO`,
				size: 'auto',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'go',
							options: {
								stopAll: false,
								target: 'current',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							actionId: 'stop',
							options: {
								target: 'current',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 0,
					},
				},
			],
		},

		stop_all: {
			type: 'button',
			category: 'ACTIONS',
			name: `STOP ALL`,
			style: {
				text: `STOP ALL`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'stop',
							options: {
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 1,
					},
				},
			],
		},

		pause_all: {
			type: 'button',
			category: 'ACTIONS',
			name: `PAUSE ALL`,
			style: {
				text: `PAUSE ALL`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pause',
							options: {
								toggle: true,
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 7,
					},
				},
			],
		},

		fade_all: {
			type: 'button',
			category: 'ACTIONS',
			name: `FADE ALL`,
			style: {
				text: `FADE ALL`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'fade',
							options: {
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 2,
					},
				},
			],
		},

		restart_all: {
			type: 'button',
			category: 'ACTIONS',
			name: `RESTART ALL`,
			style: {
				text: `RESTART ALL`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'restart',
							options: {
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 2,
					},
				},
			],
		},

		next: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT NEXT CUE`,
			style: {
				text: `NEXT`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'next',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'navigation',
					options: {},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 4,
					},
				},
			],
		},

		prev: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT PREVIOUS CUE`,
			style: {
				text: `PREV`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'prev',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
                {
                    feedbackId: 'navigation',
                    options: {},
                },
				{
					feedbackId: 'checkState',
					options: {
						action: 3,
					},
				},
			],
		},

		first: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT FIRST CUE`,
			style: {
				text: `FIRST`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'first',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'navigation',
					options: {},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 5,
					},
				},
			],
		},

		last: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT LAST CUE`,
			style: {
				text: `LAST`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'last',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'navigation',
					options: {},
				},
				{
					feedbackId: 'checkState',
					options: {
						action: 6,
					},
				},
			],
		},

		t_remaining: {
			type: 'button',
			category: 'INFO',
			name: `TIME REMAINING`,
			style: {
				text: `$(multiplay:t_remain)`,
				size: '13',
				color: '$' + '(multiplay:color_info_text)',
				bgcolor: '$' + '(multiplay:color_info_bg)',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'warningTime',
					options: {
						seconds: 5,
					},
					style: {
						color: RED,
					},
				},
				{
					feedbackId: 'time_font_size',
					options: {
						type: 'remain',
					},
				},
				{
					feedbackId: 'theme_base',
					options: {
						state: 'info',
					},
				},
			],
		},

		t_elapsed: {
			type: 'button',
			category: 'INFO',
			name: `TIME ELAPSED`,
			style: {
				text: `$(multiplay:t_elapsed)`,
				size: '13',
				color: '$' + '(multiplay:color_info_text)',
				bgcolor: '$' + '(multiplay:color_info_bg)',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'time_font_size',
					options: {
						type: 'elapsed',
					},
				},
				{
					feedbackId: 'theme_base',
					options: {
						state: 'info',
					},
				},
			],
		},

		current_cue: {
			type: 'button',
			category: 'INFO',
			name: `CURRENT CUE`,
			style: {
				text: `$(multiplay:q_description)`,
				size: '13',
				color: '$' + '(multiplay:color_info_text)',
				bgcolor: '$' + '(multiplay:color_info_bg)',
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'info',
					},
				},
			],
		},

		volume_up: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `VOL UP`,
			style: {
				text: `+`,
				size: '24',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			options: {
				stepAutoProgress: false,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: '+',
								relative: '1',
								holdAction: 'repeat',
								holdRelative: 2,
								holdDelay: 500,
								holdInterval: 100,
							},
							delay: 0,
						},
					],
					up: [
						{
							actionId: 'hold_release',
							options: {},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'volume',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

        volume_revert: {
            type: 'button',
            category: 'CURRENT CUE ADJUSTMENTS',
            name: `VOL REVERT`,
            style: {
                text: `VOL\\n$(multiplay:v_current)`,
                size: '18',
                color: '$' + '(multiplay:color_inactive_text)',
                bgcolor: '$' + '(multiplay:color_inactive_bg)',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'volume',
                            options: {
                                target: 'current',
                                behaviour: 'revert',
                            },
                        },
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    feedbackId: 'theme_base',
                    options: {
                        state: 'inactive',
                    },
                },
                {
                    feedbackId: 'volume',
                    options: {},
                },
                {
                    feedbackId: 'active',
                    options: {},
                },
            ],
        },

		volume_down: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `VOL DOWN`,
			style: {
				text: `-`,
				size: 'Auto',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			options: {
				stepAutoProgress: false,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: '-',
								relative: '1',
								holdAction: 'repeat',
								holdRelative: 2,
								holdDelay: 500,
								holdInterval: 100,
							},
							delay: 0,
						},
					],
					up: [
						{
							actionId: 'hold_release',
							options: {},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'volume',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		speed_up: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED UP`,
			style: {
				text: `+`,
				size: '24',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'relative',
								relative: '1',
								holdAction: 'repeat',
								holdDelay: 500,
								holdInterval: 100,
							},
						},
					],
					up: [
						{
							actionId: 'hold_release',
							options: {},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		speed_down: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED DOWN`,
			style: {
				text: `-`,
				size: 'Auto',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'relative',
								relative: '-1',
								holdAction: 'repeat',
								holdDelay: 500,
								holdInterval: 100,
							},
						},
					],
					up: [
						{
							actionId: 'hold_release',
							options: {},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		speed_revert: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED REVERT`,
			style: {
				text: `SPEED\\n$(multiplay:s_current)`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'revert',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		pan_left: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `PAN LEFT`,
			style: {
				text: `<`,
				size: 'Auto',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			options: {
				stepAutoProgress: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: '-',
								amount: '1',
								holdAction: 'repeat',
								holdDelay: 500,
								holdInterval: 100,
							},
							delay: 0,
						},
					],
					up: [
						{
							actionId: 'hold_release',
							options: {},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		pan_right: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `PAN RIGHT`,
			style: {
				text: `>`,
				size: 'Auto',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			options: {
				stepAutoProgress: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: '+',
								amount: '1',
								holdAction: 'repeat',
								holdDelay: 500,
								holdInterval: 100,
							},
							delay: 0,
						},
					],
					up: [
						{
							actionId: 'hold_release',
							options: {},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		pan_revert: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `PAN REVERT`,
			style: {
				text: `PAN\\n$(multiplay:p_current)`,
				size: '18',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: 'revert',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		pan_center: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `PAN CENTER`,
			style: {
				text: `PAN\\nCENTER`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: 'absolute',
								absolute: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'pan',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},

		speed_normal: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED 100%`,
			style: {
				text: `SPEED\\n100%`,
				size: '14',
				color: '$' + '(multiplay:color_inactive_text)',
				bgcolor: '$' + '(multiplay:color_inactive_bg)',
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								target: 'current',
								behaviour: 'absolute',
								absolute: 100,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'theme_base',
					options: {
						state: 'inactive',
					},
				},
				{
					feedbackId: 'speed',
					options: {},
				},
				{
					feedbackId: 'active',
					options: {},
				},
			],
		},
	})
}
