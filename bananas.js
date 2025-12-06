// money related variables
let money = 0;
let totalMoney = 0;
let cost = 10;
let payCheck;

// inventory related variables
let first;
let last;
let amount;

// easier for the innerHTML and cleaner
const language = document.getElementById("text");
const wallet = document.getElementById("currentMoney");
const inventoryDisplay = document.getElementById("inventory");

// inventory arrays
let inventory = [];
let falseInventory = [];

// the function that finds the amount of bananas
function findAmount() {
    inventory.sort(); // keeps like items together

    // find the amount of bananas you have
    first = inventory.indexOf("banana");
    last = inventory.lastIndexOf("banana") + 1;
    amount = last - first;
};

// the function to display the inventory
function displayInventory() {
    findAmount();
    if (inventory.includes("banana")) { // checks for bananas
        falseInventory[0] = (amount + "x banana");
    } else if (!inventory.includes("banana")) { // checks for no bananas
        falseInventory = [];
    };

    inventoryDisplay.innerHTML = falseInventory;
};

// the function that handles buying
function buy() {
    if (money < cost) { // checks if you're too broke
        language.innerHTML = "Not enough money poor person!";
    } else if (money >= cost) {
        // actuall buying code
        inventory.push("banana");
        money -= cost;

        // HTML changing
        language.innerHTML = "You have a banana!";
        wallet.innerHTML = ("$" + money);
        displayInventory();
    };
};

// the function that handles you "working"
function work() {
    payCheck = Math.floor(Math.random() * 10);

    if (totalMoney < 200) {
        payCheck *= 1;
    } else if (totalMoney < 1000 && totalMoney >= 200) {
        payCheck *= 2.5;
    } else if (totalMoney < 5000 && totalMoney >= 1000) {
        payCheck *= 3.95;
    };
    payCheck = Math.floor(payCheck);

    if (payCheck == 0) {
        payCheck++;
    };

    // adds the money
    money += payCheck; totalMoney += payCheck;
    wallet.innerHTML = ("$" + money);
};

// the function that handles selling
function sell() {
    sellAmount = parseInt(prompt("How many bananas would you like to sell?"));
    if (inventory.includes("banana")) {
        // inventory stuff
        findAmount();
        inventory.splice(first, sellAmount);
        
        // money portion
        money += ((Math.floor(Math.random() * 10) + 5) * sellAmount);
        language.innerHTML = "You sold " + sellAmount + " banana(s)!";
        wallet.innerHTML = ("$" + money);

        displayInventory();
    };
};

// the buttons
document.getElementById("buy").addEventListener("click", buy);
document.getElementById("sell").addEventListener("click", sell);
document.getElementById("work").addEventListener("click", work);
