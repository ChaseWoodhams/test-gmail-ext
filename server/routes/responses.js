```javascript
const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// Record a response
router.post('/', async (req, res) => {
    const response = new Response({
        pollId: req.body.pollId,
        answer: req.body.answer
    });

    try {
        const savedResponse = await response.save();
        res.json(savedResponse);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get all responses for a specific poll
router.get('/:pollId', async (req, res) => {
    try {
        const responses = await Response.find({ pollId: req.params.pollId });
        res.json(responses);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
```