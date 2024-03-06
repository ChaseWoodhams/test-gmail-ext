```javascript
const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Route to create a new poll
router.post('/create', async (req, res) => {
    const { pollData } = req.body;
    try {
        const newPoll = new Poll(pollData);
        await newPoll.save();
        res.status(200).json({ message: 'Poll created successfully', poll: newPoll });
    } catch (error) {
        res.status(500).json({ message: 'Error creating poll', error });
    }
});

// Route to get a specific poll
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const poll = await Poll.findById(id);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }
        res.status(200).json({ poll });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching poll', error });
    }
});

module.exports = router;
```