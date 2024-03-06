```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const pollRoutes = require('./routes/polls');
const responseRoutes = require('./routes/responses');
const googleSheets = require('./utils/googleSheets');

mongoose.connect('mongodb://localhost:27017/polls', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/polls', pollRoutes);
app.use('/responses', responseRoutes);

app.post('/updateSheet', async (req, res) => {
    const { pollData, responseData } = req.body;
    try {
        await googleSheets.updateSheet(pollData, responseData);
        res.status(200).send('Google Sheet updated successfully');
    } catch (error) {
        res.status(500).send('Error updating Google Sheet');
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```