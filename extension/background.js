```javascript
let pollData = {};
let responseData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'createPoll') {
    pollData = request.data;
    sendResponse({status: 'Poll created'});
  } else if (request.message === 'recordResponse') {
    responseData = request.data;
    updateSheet();
    sendResponse({status: 'Response recorded'});
  }
});

function updateSheet() {
  fetch('http://localhost:5000/updateSheet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responseData),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}
```