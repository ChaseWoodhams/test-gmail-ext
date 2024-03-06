const fs = require('fs');
const { google } = require('googleapis');
const keys = require('../keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected to Google Sheets API!');
    }
});

function exportData(pollData, responseData) {
    const gsapi = google.sheets({ version: 'v4', auth: client });

    const options = {
        spreadsheetId: 'your-spreadsheet-id',
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: [pollData, ...responseData] }
    };

    gsapi.spreadsheets.values.update(options, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

        fs.writeFile('pollData.csv', response.data, 'utf8', function(err) {
            if (err) {
                console.log('Error writing file: ' + err);
            } else {
                console.log('Successfully wrote file');
            }
        });
    });
}

module.exports = {
    exportData
};