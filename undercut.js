let clipText = "";
let target = document.getElementById("app");

let windowObserver = new MutationObserver(windowListener);

let filterObserver = null;

let sellable = [
    {name: "Currency", data: ["Orb of Alteration", "Orb of Fusing", "Orb of Alchemy", "Chaos Orb", "Gemcutter's Prism", "Exalted Orb", "Chromatic Orb", "Jeweller's Orb", "Engineer's Orb", "Infused Engineer's Orb", "Orb of Chance", "Cartographer's Chisel", "Orb of Scouring", "Blessed Orb", "Orb of Regret", "Regal Orb", "Divine Orb", "Vaal Orb", "Orb of Annulment", "Orb of Binding", "Ancient Orb", "Orb of Horizons", "Harbinger's Orb", "Fracturing Orb", "Scroll of Wisdom", "Portal Scroll", "Armourer's Scrap", "Blacksmith's Whetstone", "Glassblower's Bauble", "Orb of Transmutation", "Orb of Augmentation", "Mirror of Kalandra", "Eternal Orb", "Rogue's Marker", "Facetor's Lens", "Prime Regrading Lens", "Secondary Regrading Lens", "Tempering Orb", "Tailoring Orb", "Awakened Sextant", "Elevated Sextant", "Surveyor's Compass", "Orb of Unmaking", "Blessing of Xoph", "Blessing of Tul", "Blessing of Esh", "Blessing of Uul-Netol", "Blessing of Chayula", "Veiled Chaos Orb", "Enkindling Orb", "Instilling Orb", "Sacred Orb", "Stacked Deck", "Gold"]},
    {name: "Exotic Currency", data: ["Crusader's Exalted Orb", "Redeemer's Exalted Orb", "Hunter's Exalted Orb", "Warlord's Exalted Orb", "Awakener's Orb", "Orb of Dominance", "Eldritch Chaos Orb", "Eldritch Exalted Orb", "Eldritch Orb of Annulment", "Lesser Eldritch Ember", "Greater Eldritch Ember", "Grand Eldritch Ember", "Exceptional Eldritch Ember", "Lesser Eldritch Ichor", "Greater Eldritch Ichor", "Grand Eldritch Ichor", "Exceptional Eldritch Ichor", "Orb of Conflict", "Tainted Chromatic Orb", "Tainted Orb of Fusing", "Tainted Jeweller's Orb", "Tainted Chaos Orb", "Tainted Exalted Orb", "Tainted Mythic Orb", "Tainted Armourer's Scrap", "Tainted Blacksmith's Whetstone", "Tainted Divine Teardrop", "Tainted Blessing", "Wild Crystallised Lifeforce", "Vivid Crystallised Lifeforce", "Primal Crystallised Lifeforce", "Sacred Crystallised Lifeforce", "Armour Recombinator", "Weapon Recombinator", "Jewellery Recombinator"]},
    {name: "Shards &amp; Splinters", data: ["Chaos Shard", "Exalted Shard", "Engineer's Shard", "Regal Shard", "Annulment Shard", "Binding Shard", "Ancient Shard", "Horizon Shard", "Harbinger's Shard", "Fracturing Shard", "Mirror Shard", "Splinter of Xoph", "Splinter of Tul", "Splinter of Esh", "Splinter of Uul-Netol", "Splinter of Chayula", "Timeless Eternal Empire Splinter", "Timeless Karui Splinter", "Timeless Vaal Splinter", "Timeless Templar Splinter", "Timeless Maraketh Splinter", "Simulacrum Splinter", "Crescent Splinter", "Ritual Splinter"]}, 
    {name: "Fragments &amp; Sets", data: ["Sacrifice at Dusk", "Sacrifice at Midnight", "Sacrifice at Dawn", "Sacrifice at Noon", "Mortal Grief", "Mortal Rage", "Mortal Hope", "Mortal Ignorance", "Fragment of the Hydra", "Fragment of the Phoenix", "Fragment of the Minotaur", "Fragment of the Chimera", "Fragment of Enslavement", "Fragment of Eradication", "Fragment of Constriction", "Fragment of Purification", "Fragment of Terror", "Fragment of Emptiness", "Fragment of Shape", "Fragment of Knowledge", "Al-Hezmin's Crest", "Baran's Crest", "Drox's Crest", "Veritania's Crest", "Victorious Fate", "Deadly End", "Will of Chaos", "Ignominious Fate", "Offering to the Goddess", "Tribute to the Goddess", "Gift to the Goddess", "Dedication to the Goddess", "Sacrifice Set", "Mortal Set", "Key to the Crucible", "Key to Decay", "Maddening Object", "Crest of the Elderslayers", "Xoph's Breachstone", "Tul's Breachstone", "Esh's Breachstone", "Uul-Netol's Breachstone", "Chayula's Breachstone", "Xoph's Flawless Breachstone", "Tul's Flawless Breachstone", "Esh's Flawless Breachstone", "Uul-Netol's Flawless Breachstone", "Chayula's Flawless Breachstone", "Timeless Eternal Emblem", "Timeless Karui Emblem", "Timeless Vaal Emblem", "Timeless Templar Emblem", "Timeless Maraketh Emblem", "Unrelenting Timeless Eternal Emblem", "Unrelenting Timeless Karui Emblem", "Unrelenting Timeless Vaal Emblem", "Unrelenting Timeless Templar Emblem", "Unrelenting Timeless Maraketh Emblem", "Simulacrum", "Sacred Blossom", "Ritual Vessel", "Maven's Invitation: The Atlas", "Maven's Invitation: The Formed", "Maven's Invitation: The Twisted", "Maven's Invitation: The Forgotten", "Maven's Invitation: The Hidden", "Maven's Invitation: The Feared", "Maven's Invitation: The Elderslayers", "The Maven's Writ", "Writhing Invitation", "Screaming Invitation", "Polaric Invitation", "Incandescent Invitation", "Ancient Reliquary Key", "Timeworn Reliquary Key", "Vaal Reliquary Key", "Forgotten Reliquary Key", "Visceral Reliquary Key", "Shiny Reliquary Key", "Archive Reliquary Key", "Oubliette Reliquary Key", "Cosmic Reliquary Key", "Decaying Reliquary Key", "Voidborn Reliquary Key", "Divine Vessel"]}, 
    {name: "Expedition Currency", data: ["Astragali", "Exotic Coinage", "Scrap Metal", "Burial Medallion"]},
    {name: "Delirium Orbs", data: [
    "Fine Delirium Orb", "Singular Delirium Orb", "Thaumaturge's Delirium Orb", "Blacksmith's Delirium Orb", "Armoursmith's Delirium Orb", "Cartographer's Delirium Orb", "Jeweller's Delirium Orb", "Abyssal Delirium Orb", "Kalguuran Delirium Orb", "Foreboding Delirium Orb", "Obscured Delirium Orb", "Whispering Delirium Orb", "Fragmented Delirium Orb", "Skittering Delirium Orb", "Fossilised Delirium Orb", "Diviner's Delirium Orb", "Primal Delirium Orb", "Imperial Delirium Orb", "Timeless Delirium Orb", "Blighted Delirium Orb", "Amorphous Delirium Orb"]}, 
    {name: "Catalysts", data: [
    "Turbulent Catalyst", "Imbued Catalyst", "Abrasive Catalyst", "Tempering Catalyst", "Fertile Catalyst", "Prismatic Catalyst", "Intrinsic Catalyst", "Noxious Catalyst", "Accelerating Catalyst", "Unstable Catalyst"]}, 
    {name: "Oils &amp; Extractor", data: [
    "Clear Oil", "Sepia Oil", "Amber Oil", "Verdant Oil", "Teal Oil", "Azure Oil", "Indigo Oil", "Violet Oil", "Crimson Oil", "Black Oil", "Opalescent Oil", "Silver Oil", "Golden Oil", "Tainted Oil", "Reflective Oil", "Oil Extractor"]}, 
    {name: "Incubators", data: [
    "Whispering Incubator", "Fine Incubator", "Singular Incubator", "Cartographer's Incubator", "Otherworldly Incubator", "Abyssal Incubator", "Fragmented Incubator", "Skittering Incubator", "Infused Incubator", "Fossilised Incubator", "Kalguuran Incubator", "Diviner's Incubator", "Primal Incubator", "Enchanted Incubator", "Geomancer's Incubator", "Ornate Incubator", "Time-Lost Incubator", "Celestial Armoursmith's Incubator", "Celestial Blacksmith's Incubator", "Celestial Jeweller's Incubator", "Eldritch Incubator", "Obscured Incubator", "Foreboding Incubator", "Thaumaturge's Incubator", "Mysterious Incubator", "Gemcutter's Incubator", "Feral Incubator", "Blighted Incubator", "Morphing Incubator", "Maddening Incubator"]}, 
    {name: "Scarabs", data: [
    "Rusted Breach Scarab", "Polished Breach Scarab", "Gilded Breach Scarab", "Winged Breach Scarab", "Rusted Cartography Scarab", "Polished Cartography Scarab", "Gilded Cartography Scarab", "Winged Cartography Scarab", "Rusted Reliquary Scarab", "Polished Reliquary Scarab", "Gilded Reliquary Scarab", "Winged Reliquary Scarab", "Rusted Bestiary Scarab", "Polished Bestiary Scarab", "Gilded Bestiary Scarab", "Winged Bestiary Scarab", "Farric Lure", "Saqawine Lure", "Fenumal Lure", "Craicic Lure", "Rusted Shaper Scarab", "Polished Shaper Scarab", "Gilded Shaper Scarab", "Winged Shaper Scarab", "Rusted Elder Scarab", "Polished Elder Scarab", "Gilded Elder Scarab", "Winged Elder Scarab", "Rusted Sulphite Scarab", "Polished Sulphite Scarab", "Gilded Sulphite Scarab", "Winged Sulphite Scarab", "Rusted Divination Scarab", "Polished Divination Scarab", "Gilded Divination Scarab", "Winged Divination Scarab", "Rusted Torment Scarab", "Polished Torment Scarab", "Gilded Torment Scarab", "Winged Torment Scarab", "Rusted Ambush Scarab", "Polished Ambush Scarab", "Gilded Ambush Scarab", "Winged Ambush Scarab", "Rusted Harbinger Scarab", "Polished Harbinger Scarab", "Gilded Harbinger Scarab", "Winged Harbinger Scarab", "Rusted Expedition Scarab", "Polished Expedition Scarab", "Gilded Expedition Scarab", "Winged Expedition Scarab", "Rusted Legion Scarab", "Polished Legion Scarab", "Gilded Legion Scarab", "Winged Legion Scarab", "Rusted Metamorph Scarab", "Polished Metamorph Scarab", "Gilded Metamorph Scarab", "Winged Metamorph Scarab", "Rusted Blight Scarab", "Polished Blight Scarab", "Gilded Blight Scarab", "Winged Blight Scarab", "Rusted Abyss Scarab", "Polished Abyss Scarab", "Gilded Abyss Scarab", "Winged Abyss Scarab"]}, 
    {name: "Delve Resonators", data: [
    "Primitive Chaotic Resonator", "Potent Chaotic Resonator", "Powerful Chaotic Resonator", "Prime Chaotic Resonator"]}, 
    {name: "Delve Fossils", data: [
    "Scorched Fossil", "Frigid Fossil", "Metallic Fossil", "Jagged Fossil", "Aberrant Fossil", "Pristine Fossil", "Dense Fossil", "Corroded Fossil", "Prismatic Fossil", "Aetheric Fossil", "Serrated Fossil", "Lucent Fossil", "Shuddering Fossil", "Bound Fossil", "Perfect Fossil", "Deft Fossil", "Fundamental Fossil", "Faceted Fossil", "Bloodstained Fossil", "Hollow Fossil", "Fractured Fossil", "Glyphic Fossil", "Tangled Fossil", "Sanctified Fossil", "Gilded Fossil"]}, 
    {name: "Essences", data: ["Whispering Essence of Hatred", "Muttering Essence of Hatred", "Weeping Essence of Hatred", "Wailing Essence of Hatred", "Screaming Essence of Hatred", "Shrieking Essence of Hatred", "Deafening Essence of Hatred", "Whispering Essence of Woe", "Muttering Essence of Woe", "Weeping Essence of Woe", "Wailing Essence of Woe", "Screaming Essence of Woe", "Shrieking Essence of Woe", "Deafening Essence of Woe", "Whispering Essence of Greed", "Muttering Essence of Greed", "Weeping Essence of Greed", "Wailing Essence of Greed", "Screaming Essence of Greed", "Shrieking Essence of Greed", "Deafening Essence of Greed", "Whispering Essence of Contempt", "Muttering Essence of Contempt", "Weeping Essence of Contempt", "Wailing Essence of Contempt", "Screaming Essence of Contempt", "Shrieking Essence of Contempt", "Deafening Essence of Contempt", "Muttering Essence of Sorrow", "Weeping Essence of Sorrow", "Wailing Essence of Sorrow", "Screaming Essence of Sorrow", "Shrieking Essence of Sorrow", "Deafening Essence of Sorrow", "Muttering Essence of Anger", "Weeping Essence of Anger", "Wailing Essence of Anger", "Screaming Essence of Anger", "Shrieking Essence of Anger", "Deafening Essence of Anger", "Muttering Essence of Torment", "Weeping Essence of Torment", "Wailing Essence of Torment", "Screaming Essence of Torment", "Shrieking Essence of Torment", "Deafening Essence of Torment", "Muttering Essence of Fear", "Weeping Essence of Fear", "Wailing Essence of Fear", "Screaming Essence of Fear", "Shrieking Essence of Fear", "Deafening Essence of Fear", "Weeping Essence of Suffering", "Wailing Essence of Suffering", "Screaming Essence of Suffering", "Shrieking Essence of Suffering", "Deafening Essence of Suffering", "Weeping Essence of Rage", "Wailing Essence of Rage", "Screaming Essence of Rage", "Shrieking Essence of Rage", "Deafening Essence of Rage", "Weeping Essence of Wrath", "Wailing Essence of Wrath", "Screaming Essence of Wrath", "Shrieking Essence of Wrath", "Deafening Essence of Wrath", "Weeping Essence of Doubt", "Wailing Essence of Doubt", "Screaming Essence of Doubt", "Shrieking Essence of Doubt", "Deafening Essence of Doubt", "Wailing Essence of Anguish", "Screaming Essence of Anguish", "Shrieking Essence of Anguish", "Deafening Essence of Anguish", "Wailing Essence of Loathing", "Screaming Essence of Loathing", "Shrieking Essence of Loathing", "Deafening Essence of Loathing", "Wailing Essence of Spite", "Screaming Essence of Spite", "Shrieking Essence of Spite", "Deafening Essence of Spite", "Wailing Essence of Zeal", "Screaming Essence of Zeal", "Shrieking Essence of Zeal", "Deafening Essence of Zeal", "Screaming Essence of Misery", "Shrieking Essence of Misery", "Deafening Essence of Misery", "Screaming Essence of Dread", "Shrieking Essence of Dread", "Deafening Essence of Dread", "Screaming Essence of Scorn", "Shrieking Essence of Scorn", "Deafening Essence of Scorn", "Screaming Essence of Envy", "Shrieking Essence of Envy", "Deafening Essence of Envy", "Essence of Hysteria", "Essence of Insanity", "Essence of Horror", "Essence of Delirium", "Remnant of Corruption"]} 
    ];

async function windowListener(mutationList) {
    for (mutation of mutationList) {
        let my_buttons = document.getElementsByClassName("btn chaos-search-button")
        if (my_buttons.length == 0) {
            let chaos_button = document.createElement("button");
            chaos_button.innerHTML = "Chaos Search";
            chaos_button.classList.add("btn", "chaos-search-button");
            chaos_button.name = "chaos_search_button";
            chaos_button.onclick = async function () {
                let clip =  await getCurrencyFromClipboard();
                selectCurrency(clip.currency_name, clip.header_text, "Chaos Orb", clip.count);
            };
            document.querySelector(".controls-center").append(chaos_button);

            let divine_button = document.createElement("button");
            divine_button.innerHTML = "Divine Search";
            divine_button.classList.add("btn", "divine-search-button");
            divine_button.name = "divine_search_button";
            divine_button.onclick = async function () {
                let clip = await getCurrencyFromClipboard();
                selectCurrency(clip.currency_name, clip.header_text, "Divine Orb", clip.count);
            };
            document.querySelector(".controls-center").append(divine_button);
        }

        if (mutation.target.className == 'results') {
            let rows = mutation.target.getElementsByClassName('row exchange');
            for (row of rows) {
                var hasButton = row.querySelector('.btn-undercut');
                if (hasButton == null) {
                    const rowID = row.getAttribute('data-id');
                    const haveRatio = Number(row.querySelector(".per-have > span:last-child").innerText.match(/[\d\.]*/));
                    const wantRatio = Number(row.querySelector(".per-want > span:last-child").innerText.match(/[\d\.]*/));
                    const currencyType = row.querySelector('.price-right .currency-text').innerText;
                    const sellType = row.querySelector('.price-left .currency-text').innerText;
                    
                    if (currencyType == 'Chaos Orb' || currencyType == 'Divine Orb'){
                        let button = document.createElement("button");
                        button.innerHTML = "Undercut";
                        button.classList.add("btn", "btn-default", "btn-undercut");
                        button.name = `${rowID}_Undercut`
                        button.onclick = function () {
                            clipboardMod(haveRatio, wantRatio, currencyType, sellType);
                        };
                        row.querySelector('.price').prepend(button);
                        
                        let adv_pricing = false;
                        await chrome.storage.sync.get(["advancedPricing"]).then((items) => {
                            adv_pricing = items.advancedPricing;
                        });
                        if (adv_pricing) {
                            button = document.createElement("button");
                            button.innerHTML = "Adv Price";
                            button.classList.add("btn", "btn-default", "btn-advanced");
                            button.name = `${rowID}_Advanced`
                            button.onclick = function () {
                                openAdvancedPricingWindow(haveRatio, wantRatio, currencyType, sellType);
                            };
                            row.querySelector('.price').prepend(button);
                        }
                    }
                }
            }
        }
    }
}

function until(conditionFunction) {
    const poll = resolve => {
        if(conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 100);
    }

    return new Promise(poll);
}


async function getCurrencyFromClipboard() {
    
    item_text = await navigator.clipboard.readText();

    let header_text = "";
    let currency_name = "";

    for (row of sellable) {
        for (d of row["data"]) {
            if (item_text.includes(d)) {
                header_text = row["name"];
                currency_name = d;

                break;
            }
        }
        if ("" != header_text) {
            break;
        }
    }

    let count = item_text.match(/Stack Size: ([\d\.,]+)/);
    if (count) {
        count = Number(count[1].replaceAll(",", ""));
    }
    else {
        count = 0;
    }

    return {currency_name, header_text, count};
}

async function selectCurrency(currency_name, header_text, sell_for, count) {
    //Validate that we got good input from the clipboard
    if (currency_name == "" || header_text == "" || count == 0) {
        alert("Failed getting bulk item info from the clipboard. Please re-copy from the game client.");
        return;
    }
    //Get the search percentage setting
    let search_percent = 100;
    await chrome.storage.sync.get(["searchPercent"]).then((items) => {
        search_percent = items.searchPercent;
    });
    
    //Step 1, press clear
    document.querySelector('.btn.clear-btn').click();

    await until(_ => document.querySelector(".exchange-filter-item.active") == null);

    //minimum stock
    let e = new Event("change");
    let stock = document.querySelector(".form-control.minmax");
    stock.value = Math.ceil(count * (search_percent / 100.0));
    stock.dispatchEvent(e);

    //Step 2, Check if the "Item I Want" sub menu for the item is already open
    //get the brown panes - the first is the "want" and the second is the "have"
    brown_panes = document.getElementsByClassName("search-advanced-pane brown");

    //get all the filter-title-clickable elements on the want side
    want_filters = brown_panes.item(0).querySelectorAll('.filter-group-body .filter');
    for (want of want_filters) {
        //find the filter that matches the header for our currency item
        if (want.querySelector('span:first-child').innerHTML.includes(header_text)) {
            //if it is not open, click it and wait for it to be open
            if (want.childElementCount == 1) {
                want.firstElementChild.click();
                await until(_ => want.childElementCount == 2);
            }
            //step 3 click the currency
            filter_options = want.lastElementChild.children
            for (option of filter_options) {
                if (option.title == currency_name || option.getAttribute("data-original-title") == currency_name) {
                    option.click();
                    await until(_ => option.classList.length == 2);
                    break;
                }
            }
            break;
        }
    }

    have_filters = brown_panes.item(1).querySelectorAll('.filter-group-body .filter');
    for (have of have_filters) {

        if (have.querySelector('span:first-child').innerHTML.includes("Currency")) {
            if (have.childElementCount == 1) {
                have.firstElementChild.click();
                await until(_ => want.childElementCount == 2);
            }
            filter_options = have.lastElementChild.children
            for (option of filter_options) {
                if (option.title == sell_for || option.getAttribute("data-original-title") == sell_for) {
                    option.click();
                    await until(_ => option.classList.length == 2);
                    break;
                }
            }
            break;
        }
    }

    //search
    document.querySelector(".btn.search-btn").click();
}

async function openAdvancedPricingWindow(haveRatio, wantRatio, currencyType, sellType) {
    
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
        await chrome.runtime.sendMessage({price_info: `stack=${stackSize}&have=${haveRatio}&want=${wantRatio}&currency=${sellType}`});
    } else {
        alert("Error getting stack size");
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