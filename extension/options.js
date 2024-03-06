```javascript
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('exportData');
    link.addEventListener('click', function() {
        exportData();
    });
});

function exportData() {
    chrome.runtime.sendMessage({action: "exportData"}, function(response) {
        if(response.success) {
            alert("Data exported successfully!");
        } else {
            alert("Data export failed. Please try again.");
        }
    });
}
```