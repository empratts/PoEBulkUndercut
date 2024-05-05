// Saves options to chrome.storage
const saveOptions = () => {
    const search_percent = Math.max(Math.min(Math.floor(document.getElementById('search_percent').value), 100), 5);
    const advanced_pricing = document.getElementById("adv_pricing").checked;
    const debug_mode = document.getElementById("debug_mode").checked;
    const debug_item_count = Math.floor(document.getElementById("debug_item_count").value);
    const debug_item_name = document.getElementById("debug_item_name").value;
  
    chrome.storage.sync.set({ search_percent: search_percent , advanced_pricing: advanced_pricing, debug_mode: debug_mode, debug_item_count: debug_item_count, debug_item_name: debug_item_name}).then(() => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 750);
    });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(["search_percent", "advanced_pricing", "debug_mode", "debug_item_count", "debug_item_name"]).then((items) => {
        document.getElementById('search_percent').setAttribute("value", items.search_percent);
        document.getElementById("adv_pricing").checked = items.advanced_pricing;
        document.getElementById("debug_mode").checked = items.debug_mode;
        document.getElementById("debug_item_count").setAttribute("value", items.debug_item_count);
        document.getElementById("debug_item_name").setAttribute("value", items.debug_item_name);
    });
};
  
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);