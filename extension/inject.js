```javascript
// Inject.js
const composeWindow = document.getElementById('composeWindow');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'createPoll') {
        injectPoll(request.pollData);
    }
});

// Function to inject the poll into the email body
function injectPoll(pollData) {
    const pollQuestion = pollData.question;
    const pollOptions = pollData.options;

    let pollHtml = `<h3>${pollQuestion}</h3><ul>`;
    pollOptions.forEach((option, index) => {
        pollHtml += `<li><a href="https://your-extension-url.com/track/${index}">${option}</a></li>`;
    });
    pollHtml += '</ul>';

    composeWindow.innerHTML += pollHtml;
}
```