# Ableton Link to GrandMA3 bridge

AbletonLink-GMA3 is a project that integrates Ableton Link with the GrandMA3 lighting console, allowing for synchronized tempo and beat information between Ableton Live and GrandMA3.

## Features

- Synchronize tempo and beat information between Ableton Live and GrandMA3
- Easy setup and configuration
- Real-time tempo adjustments

## Requirements

- Ableton Link enabled software (such as Ableton Live or Pulse)
- GrandMA3 lighting console or onPC software
- Node.js installed on your system

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/SilTada/AbletonLink-GMA3.git
    ```
2. Navigate to the project directory:
    ```sh
    cd AbletonLink-GMA3
    ```
3. Install the required dependencies:
    ```sh
    npm install
    ```

## Configuration of the Script

All settings have hardcoded default values, but can be modified by copying and renaming the `.env.default` file to `.env` in the root directory. All settings mentioned in the default `.env` file can be customized.

### Steps to Configure

1. Copy the `.env.default` file:
    ```sh
    cp .env.default .env
    ```
2. Open the newly created `.env` file in a text editor.
3. Modify the settings as needed. Refer to the table below for available settings and their descriptions.

### Available Settings

| Setting             | Description                                      | Default value                     | Available placeholders    |
|---------------------|--------------------------------------------------|-----------------------------------|---------------------------|
| **Network**         |                                                  |                                   |                           |
| `IP_ADDRESS`        | IP address of the GrandMA console or onPC software.                     | 127.0.0.1                         |                           |
| `PORT`              | Port number for the OSC messages. This should match the port configured in the GrandMA console or onPC software.                | 8000                              |                           |
| **BPM Changes**     |                                                  |                                   |                           |
| `SEND_BPM`          | Enable/disable sending BPM changes.               | true                              |                           |
| `BPM_COMMAND`       | Command template that will be sent to the GrandMA when a change in BPM value is present.                 | Master 3.1 At BPM {bpm}        | `{bpm}`           |
| **Phase (beat) changes** |                                             |                                   |                           |
| `SEND_PHASE`        | Enable/disable sending phase (beat) changes.      | true                              |                           |
| `PHASE_COMMAND`     | Command template that will be sent to the GrandMA when a change in phase (beat) is present.        | Go Macro "BPM BEAT {phase}"       | `{phase}`                 |
| **Other**           |                                                  |                                   |                           |
| `LOGGING`           | Enable/disable logging of sent OSC commands.          | false                             |                           |
| `INTERVAL`          | Interval for checking Ableton Link values (in milliseconds)  | 10                                |                           |

## Configuration of the GrandMA console or onPC software

1. Open the settings menu and go to `In & Out`.
2. Go to the `OSC` tab.
3. Set the `Preferred IP` to the IP range the desk and the script are connected through.
4. Set the `Interface` to the one that is connecting the script and the console or software.
5. Make sure that "Enable Input" is ticked.
6. Insert a new OSCData line:
    - Fill in the IP of the device from where the script is running as the Destination IP (default is 127.0.0.1), as well as the port number as the port that is specified in the `.env` file (default is 8000).
    - Make sure `Receive Command` is set to `Yes`.

## Usage of the script

1. Start any Ableton Link enabled software.
2. Run the AbletonLink-GMA3 script:
    ```sh
    npm start
    ```
3. Commands should be running from the script to the GrandMA.

## Contact

For any questions or suggestions, please open an issue or contact me at sil@tada.be
