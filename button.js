let clipText = "";
let target = document.getElementById("app");

let windowObserver = new MutationObserver(windowListener);

function windowListener(mutationList) {
    for (mutation of mutationList) {
        if (mutation.target.className == 'results') {
            let rows = mutation.target.getElementsByClassName('row exchange');
            for (row of rows) {
                var hasButton = row.querySelector('.btns > .btn-group > button:last-child').innerHTML;
                if (hasButton != "Undercut") {
                    const rowID = row.getAttribute('data-id');
                    const currencyRatio = Number(row.querySelector(".per-have > span:last-child").innerText.match(/[\d\.]*/));
                    const currencyType = row.querySelector('.price-right .currency-text').innerText;
                    const sellType = row.querySelector('.price-left .currency-text').innerText;
                    
                    if (currencyType == 'Chaos Orb'){
                        let button = document.createElement("button");
                        button.innerHTML = "Undercut";
                        button.classList.add("btn", "btn-default");
                        button.name = `${rowID}_Undercut`
                        button.onclick = function () {
                            clipboardMod(currencyRatio, currencyType, sellType);
                        };
                        row.querySelector('.btns > .btn-group').append(button);
                    } 
                }
            }
        }
    }
}

async function clipboardMod(currencyRatio, currencyType, sellType) {
    if (currencyType != 'Chaos Orb') {
        return;
    }

    let itemText = await navigator.clipboard.readText();
    let clipboardContainsSellType = itemText.indexOf(sellType);
    if (clipboardContainsSellType == -1) {
        alert("Clipboard does not contain the description of the item in this result.");
        return
    }

    let stackSize = itemText.match(/Stack Size: ([\d\.,]+)/);
    if (stackSize) {
        stackSize = Number(stackSize[1].replaceAll(",", ""));
        let price = currencyRatio * stackSize;
        if (price - Math.floor(price) === 0) {
            price -= 1;
        } else {
            price = Math.floor(price);
        }

        navigator.clipboard.writeText(`~price ${price}/${stackSize} chaos`)
    } else {
        alert("Error getting stack size");
    }
    
}


windowObserver.observe(target, {childList: true, subtree: true});