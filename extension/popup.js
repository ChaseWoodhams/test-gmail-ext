```javascript
let pollData = {};

document.getElementById('sendPoll').addEventListener('click', function() {
    let pollQuestion = document.getElementById('pollQuestion').value;
    let pollOptions = document.getElementById('pollOptions').value.split(',');

    pollData = {
        question: pollQuestion,
        options: pollOptions
    };

    chrome.runtime.sendMessage({type: 'createPoll', data: pollData}, function(response) {
        console.log(response);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'pollCreated') {
        console.log('Poll created successfully');
    }
});
```