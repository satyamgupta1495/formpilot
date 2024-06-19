chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'log') {
        console.log("Logging :", request);
    } else {
        console.log("Error :", request);
    }
});