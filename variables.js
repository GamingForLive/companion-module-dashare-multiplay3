export default async function (self) {
	const variableDefinitions = [
		{ variableId: 't_remain', name: 'Active cue time remaining' },
		{ variableId: 't_elapsed', name: 'Active cue time elapsed' },
		{ variableId: 'q_description', name: 'Selected cue description' },
		{ variableId: 'st_fadeAll', name: 'Fade all available' },
		{ variableId: 'st_go', name: 'Go status available' },
		{ variableId: 'st_stopAll', name: 'Stop all available' },
		{ variableId: 'st_prev', name: 'Previous cue available' },
		{ variableId: 'st_next', name: 'Next cue available' },
		{ variableId: 'v_current', name: 'Current volume' },
		{ variableId: 'v_current_db', name: 'Current volume (dB)' },
		{ variableId: 'v_current_percent', name: 'Current volume (%)' },
		{ variableId: 'p_current', name: 'Current pan' },
		{ variableId: 's_current', name: 'Current speed' },
		{ variableId: 'sw_time', name: 'Stopwatch time' },
		{ variableId: 'color_inactive_bg', name: 'Theme Color: Inactive Background (Current)' },
		{ variableId: 'color_inactive_text', name: 'Theme Color: Inactive Text (Current)' },
		{ variableId: 'color_active_bg', name: 'Theme Color: Active Background (Current)' },
		{ variableId: 'color_active_text', name: 'Theme Color: Active Text (Current)' },
		{ variableId: 'color_available_bg', name: 'Theme Color: Available Background (Current)' },
		{ variableId: 'color_available_text', name: 'Theme Color: Available Text (Current)' },
		{ variableId: 'color_info_bg', name: 'Theme Color: Info Background (Current)' },
		{ variableId: 'color_info_text', name: 'Theme Color: Info Text (Current)' },
	]

	// Add variables for each custom theme slot
	const themeCount = self.config?.theme_count ?? 0
	for (let i = 1; i <= themeCount; i++) {
		const prefix = `theme${i}`
		variableDefinitions.push(
			{ variableId: `${prefix}_inactive_bg`, name: `Theme ${i} Color: Inactive Background` },
			{ variableId: `${prefix}_inactive_text`, name: `Theme ${i} Color: Inactive Text` },
			{ variableId: `${prefix}_active_bg`, name: `Theme ${i} Color: Active Background` },
			{ variableId: `${prefix}_active_text`, name: `Theme ${i} Color: Active Text` },
			{ variableId: `${prefix}_available_bg`, name: `Theme ${i} Color: Available Background` },
			{ variableId: `${prefix}_available_text`, name: `Theme ${i} Color: Available Text` },
			{ variableId: `${prefix}_info_bg`, name: `Theme ${i} Color: Info Background` },
			{ variableId: `${prefix}_info_text`, name: `Theme ${i} Color: Info Text` }
		)
	}

	self.setVariableDefinitions(variableDefinitions)
}
