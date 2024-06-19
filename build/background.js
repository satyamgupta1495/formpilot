chrome.runtime.onInstalled.addListener(()=>{console.log("Extension Installed")});chrome.runtime.onMessage.addListener(o=>{o.action==="log"?console.log("Logging :",o):console.log("Error :",o)});
