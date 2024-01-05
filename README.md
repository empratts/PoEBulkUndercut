# PoE Bulk Undercut

PoE Bulk Undercut is a browser extension that interacts with the official Path of Exile bulk trade website. It provides a button on each search result that assists in bulk pricing your items to show up above the selected listing.

## Problem Example

A player has been farming essences in maps and has 20+ of each type of Screaming and Screeching Essence. The player wants to list all of those items to sell on the trade site maximizing profit while making as few trades as possible. Focusing in on a single type: Screaming Essence of Greed. If the player searches the bulk trade section, they see that players with more than 20 in stock are mostly listing them for 4c each. If the player lists their stack at 4c each not only will their listing be mixed in with all the other players selling at that price, but also they have the possibility of having to deal with people that only want to buy 3. Therefore, listing at 92/23c will let buyers know you only want to sell in bulk. This has the downside that the player has to do math for each stack, and the listing will still be mixed in with everyone else selling at 4c.

## Solution

Add an "Undercut" button to each listing on the trade site. Hovering over your 23 Screaming Essence of Greed in your essence tab and pressing Ctrl-C will copy a description of that item to the clipboard (including the stack size). Clicking the "Undercut" button on a listing for 4c Essences of greed will them populate the clipboard with "~price 91/23 chaos" (without quotes). This text can be pasted into the "Note" section on your essences. This saves any clicks of having to choose the "Exact Price" from the dropdown and then put the cursor into the price textbox. Also of note, this prices the item at 3.9567c each (1c off the entire stack price), Ensuring that that your listing will always appear above everyone selling at 4c, making it more visible.

## Workflow

- Use a trade tool to open a search for the item with a minimum stock set (or do it manually)
  - Ensure that the tool leaves the item description on the clipboard
- Choose the listing that you want to undercut
- Right Click on the item in-game (assuming it is in a public tab)
- Paste
- Press Enter
