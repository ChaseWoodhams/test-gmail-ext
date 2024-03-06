```javascript
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'createPoll') {
        injectPoll(request.pollData);
    }
});

// Function to inject the poll into the Gmail compose window
function injectPoll(pollData) {
    let composeWindow = document.getElementById('composeWindow');
    let pollHTML = generatePollHTML(pollData);
    composeWindow.innerHTML += pollHTML;
}

// Function to generate the HTML for the poll
function generatePollHTML(pollData) {
    let html = `<h2>${pollData.question}</h2>`;
    pollData.options.forEach((option, index) => {
        let url = `https://ourserver.com/recordResponse?pollId=${pollData.id}&optionIndex=${index}`;
        html += `<a href="${url}">${option}</a><br>`;
    });
    return html;
}

// Listen for clicks on the poll options
document.addEventListener('click', function(event) {
    let target = event.target;
    if (target.tagName.toLowerCase() === 'a' && target.href.startsWith('https://ourserver.com/recordResponse')) {
        event.preventDefault();
        let url = new URL(target.href);
        let pollId = url.searchParams.get('pollId');
        let optionIndex = url.searchParams.get('optionIndex');
        let responseData = { pollId, optionIndex };
        chrome.runtime.sendMessage({ message: 'recordResponse', responseData });
    }
});
```