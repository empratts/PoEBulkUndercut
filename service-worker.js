
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting === "hello") {
            console.log("Got Hello.");
            chrome.tabs.create({url: "advanced/pricing.html?x=44"})
        }
    }
);