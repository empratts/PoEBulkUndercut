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
                    const haveRatio = Number(row.querySelector(".per-have > span:last-child").innerText.match(/[\d\.]*/));
                    const wantRatio = Number(row.querySelector(".per-want > span:last-child").innerText.match(/[\d\.]*/));
                    const currencyType = row.querySelector('.price-right .currency-text').innerText;
                    const sellType = row.querySelector('.price-left .currency-text').innerText;
                    
                    if (currencyType == 'Chaos Orb' || currencyType == 'Divine Orb'){
                        let button = document.createElement("button");
                        button.innerHTML = "Undercut";
                        button.classList.add("btn", "btn-default");
                        button.name = `${rowID}_Undercut`
                        button.onclick = function () {
                            clipboardMod(haveRatio, wantRatio, currencyType, sellType);
                        };
                        row.querySelector('.btns > .btn-group').append(button);
                    }
                }
            }
        }
    }
}

async function clipboardMod(haveRatio, wantRatio, currencyType, sellType) {
    if (currencyType != 'Chaos Orb' && currencyType != "Divine Orb") {
        return;
    }

    let orb = 'chaos'
    if (currencyType == 'Divine Orb') {
        orb = 'divine'
    }

    let itemText = await navigator.clipboard.readText();
    let clipboardContainsSellType = itemText.indexOf(sellType);
    if (clipboardContainsSellType == -1) {
        alert("Clipboard does not contain the description of the item in this result. Please re-copy from the game client.");
        return
    }

    let stackSize = itemText.match(/Stack Size: ([\d\.,]+)/);
    if (stackSize) {
        stackSize = Number(stackSize[1].replaceAll(",", ""));
        let price = 0
        if (haveRatio >= 1) {
            price = haveRatio * stackSize;
            if (price - Math.floor(price) === 0) {
                price -= 1;
            } else {
                price = Math.floor(price);
            }
        }
        else {
            price = Math.floor((stackSize - 1) / wantRatio)
            stackSize = Math.round(price * wantRatio) + 1
        }

        if (price > 0){
            navigator.clipboard.writeText(`~price ${price}/${stackSize} ${orb}`)
        }
        else {
            alert("Price is zero. Try a larger stack.")
        }
    } else {
        alert("Error getting stack size");
    }
    
}


windowObserver.observe(target, {childList: true, subtree: true});