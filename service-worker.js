
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.tabs.create({url: `advanced/pricing.html?${request.price_info}`})
    }
);