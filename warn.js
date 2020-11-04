blocked=["://www.youtube.com/watch?v=dQw4w9WgXcQ", "://www.youtube.com/watch?v=6_b7RDuLwcI", "://www.youtube.com/watch?v=TzXXHVhGXTQ", "://www.youtube.com/watch?v=oHg5SJYRHA0"] // Define blocked websites



chrome.storage.local.get(['bypass'], function(result) { // Get bypass state
if(result.bypass !== "bypass" && window.location.href !== extPage() && blockedCheck(window.location.href)){ // Check if page shall be blocked
    window.location.href = extPage(); // Redirect to block page
} else if(result.bypass !== "false"){ // Cancel bypass when on page
    setData("false")
}})

if(document.getElementById("continue") !== null){ // Register continue button and add function
    document.getElementById("continue").addEventListener("click", continueBack);
}

if(document.getElementById("back") !== null){ // Register back button and add function
    document.getElementById("back").addEventListener("click", back);
}

function setData(data){chrome.storage.local.set({"bypass": String(data)})} // Function for storing local data in chrome

function continueBack(){ // Function for going back to rick roll
    setData("bypass")
    goTo("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}

function back(){ // Function for closing tab
    chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() { });
    });
}
function goTo(url){ window.location = url } // Simple navigator function

function extPage(){return "chrome-extension://" + chrome.runtime.id + "/warn.html"} // Return extension page

function blockedCheck(link){ // Check if the link meets block criteria
    for (let i of blocked) { // Loop through blocked links
        if(link.includes(i)){ // Check if link matches
            return true // Return block
        }
    }
    return false // Return pass
}   
