# Developer Guide

## Project Structure

The project is structured into two main parts: the Chrome extension and the server.

### Chrome Extension

The Chrome extension is composed of several JavaScript, HTML, and CSS files:

- `background.js`: Handles the main logic of the extension, including creating polls and recording responses.
- `popup.html` and `popup.js`: Define the user interface for creating a poll.
- `options.html` and `options.js`: Define the user interface for exporting poll data.
- `content.js` and `inject.js`: Inject the poll creation interface into Gmail's compose window.
- `styles.css`: Contains all the styles for the extension's user interface.
- `manifest.json`: Defines the extension's metadata and permissions.

### Server

The server is a Node.js application composed of several JavaScript files:

- `server.js`: Sets up the server and routes.
- `routes/polls.js` and `routes/responses.js`: Define the endpoints for creating polls and recording responses.
- `models/Poll.js` and `models/Response.js`: Define the data schemas for polls and responses.
- `utils/googleSheets.js`: Contains the logic for updating the Google Sheet with new responses.
- `utils/emailIntegration.js`: Contains the logic for sending emails with the poll.
- `utils/dataExport.js`: Contains the logic for exporting poll data.

## Shared Dependencies

The project uses several shared dependencies across multiple files:

- Exported Variables: `pollData` and `responseData`
- Data Schemas: `PollSchema` and `ResponseSchema`
- DOM Element IDs: `composeWindow`, `pollQuestion`, `pollOptions`, and `sendPoll`
- Message Names: `createPoll`, `recordResponse`, and `updateSheet`
- Function Names: `createPoll()`, `recordResponse()`, `updateSheet()`, `sendEmail()`, and `exportData()`

## Setup

To set up the project for development:

1. Clone the repository.
2. Run `npm install` to install the server's dependencies.
3. Load the extension into Chrome by going to `chrome://extensions/`, enabling Developer mode, clicking "Load unpacked", and selecting the `extension` directory.
4. Start the server by running `node server/server.js`.

## Documentation

For more information on how to use the extension, see the user guide (`docs/userGuide.md`).
