# AbletonLink-GMA3

AbletonLink-GMA3 is a project that integrates Ableton Link with the GrandMA3 lighting console, allowing for synchronized tempo information between Ableton Live and GrandMA3.

## Features

- Synchronize tempo information between Ableton Live and GrandMA3
- Easy setup and configuration
- Real-time tempo adjustments

## Requirements

- Ableton Link
- GrandMA3 lighting console or software
- Node.js

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

## Usage

1. Start any Ableton Link enabled software.
2. Run the AbletonLink-GMA3 script:
    ```sh
    npm start
    ```
3. If needed, change the ip address and port to where the script should send the OSC commands. As well as which speedmaster should be updated.
4. Configure the GrandMA3 console or software to receive OSC commands from the computer the script is running from:
    - Open the GrandMA3 software or console.
    - Navigate to the "Setup" menu.
    - Select "In & Out" and go to the OSC tab.
    - Insert a new OSCData line.
    - Set the OSC destination IP as well as the port to match the port specified in the AbletonLink-GMA3 script.
    - Enable OSC input.

## Contact

For any questions or suggestions, please open an issue or contact me at sil@tada.be
