## DA-SHARE MULTIPLAY 3

<strong>[MultiPlay](https://www.da-share.com/software/multiplay/)</strong> is a Windows based program designed to play cues for theatre or corporate use written by [David Duffy](da-share.com).

This module controls the program by OSC messages as described on the [on-line help](https://da-share.com/help/multiplay3/) (version 3.0.196.0 and above).

This module was not created nor is it run by David Duffy. For Issues or feature requests regarding this module please head to its [GitHub repository](https://github.com/bitfocus/companion-module-dashare-multiplay3).

If you however have questions or suggestions regarding Multiplay itself, please contact the developer directly ideally via the [Multiplay forum](https://www.da-share.com/forum/).

---

<strong>CONFIGURATION GUIDE</strong>

To <strong>Enable OSC Control Support</strong> open the settings menu in MultiPlay:
* Click on the **yellow gear icon (⚙️)** located in the top menu bar of the main MultiPlay application.
* Alternatively, navigate through the top menu bar to:
  > **File** > **Preferences** > **OSC Control**

<strong>Connection Settings</strong>
* **Target IP:** Use `127.0.0.1` if both **MultiPlay** and **Bitfocus Companion** are running on the same device.
    * If Companion is running on a separate **remote device**, enter the specific local IP address of the target machine running MultiPlay (e.g., `192.168.1.50`). Ensure both devices are connected to the same local network.
* **Target Port:** Choose any available port number (e.g., `7000`). Ensure this port is not being utilized by any other software running on that machine.
* **Feedback Port:** To get the full functionality of this plugin you need to enable the **Remote (Outgoing)** option to allow MultiPlay to send real-time status updates back to Bitfocus Companion.
    > (Note that the **Feedback port** must be **different** from the **Target port**).


<strong>Presets should include all the necessary buttons to handle at least the basic functionality of the program.</strong>

---


<strong>ACTIONS</strong>

- GO (current, specific cue). Optional one-by-one behaviour.
- STOP (all active, current, specific cue)
- PAUSE (all active, current, specific cue)
- RESTART (all active, current, specific cue)
- RESUME (if possible) (all active, current, specific cue)
- FADE (all active, current, specific cue)

<strong>CUE SELECTION</strong>

- FIRST
- LAST
- NEXT
- PREVIOUS

<strong>CUE ADJUSTMENTS</strong>

> Note: The target cue must be active. The adjustments don't affect the settings of the cue.

- PAN
- SPEED
- VOLUME (supports hold to repeat)
- JUMP TO SPECIFIC TIME
- SELECT AN SPECIFIC CUE POINT
- MOVE INSIDE A LIST CUE

<strong>STOPWATCH CONTROL</strong>

- START
- STOP
- RESET

<strong>FEEDBACKS</strong>

> <strong>Note:</strong> To get an accurate state of the program, start companion module before open Multiplay or activate 'GO' and move play head across the cue list to force Multiplay to send status messages.

- TIME REMAINING (and warning time)
- TIME ELAPSED
- AVAILABILITY OF THE GLOBAL ACTIONS (go, stop all, fade all, move to next cue, back to previous cue)
- ACTIVATION STATUS OF CURRENT CUE

<strong>DESIGN & COLORS</strong>

You can customize the colors for different states in the connection settings:
- Choose a **Design Theme** (Default, Black, Cyan, Blue, Red, Green, White, or Custom).
- Configure the **Number of custom themes** to create additional custom color slots.
- For each **Custom** theme, you can individually set colors for:
    - **Inactive:** Buttons that are currently not usable or in a default state.
    - **Available:** Buttons for actions that are currently available to be triggered (e.g., GO).
    - **Active:** Status of the currently running cue.
    - **Info:** Background for informational displays (e.g., volume, stopwatch).

<strong>PRESETS</strong>
