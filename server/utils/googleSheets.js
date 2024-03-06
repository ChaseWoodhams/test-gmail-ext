```javascript
const { google } = require('googleapis');
const keys = require('../keys.json');

const client = new google.auth.JWT(
    keys.client_email, 
    null, 
    keys.private_key, 
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens) {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('Connected to Google Sheets!');
    }
});

const gsapi = google.sheets({ version: 'v4', auth: client });

async function updateSheet(pollData, responseData) {
    const updateOptions = {
        spreadsheetId: 'Your_Spreadsheet_ID',
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[pollData, responseData]] }
    };

    let res = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(res);
}

module.exports = { updateSheet };
```