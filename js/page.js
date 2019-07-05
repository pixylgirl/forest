// page.js contains functions used by content.js to quickly
// create and distribute basic elements around the screen.

/**
 * Creates a button that calls a function when pressed.
 * @param {String} text - Text inside of the button
 * @param {Function} callback - Function called on a click
 */
function createButton(text, callback) {
    var ctx = document.getElementsByTagName("botpart")[0];
    var node = document.createElement("button");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.setAttribute("onclick", callback);
    ctx.appendChild(node);
}

/**
 * Creates a button without a event on click and darker styling.
 * @param {String} text - Text inside of the button
 */
function createButtonInvalid(text) {
    var ctx = document.getElementsByTagName("botpart")[0];
    var node = document.createElement("button");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.classList.add("invalid-btn");
    ctx.appendChild(node);
}

/**
 * Creates a generic text node.
 * @param {String} text - Text to be used
 */
function createText(text) {
    var ctx = document.getElementsByTagName("botpart")[0];
    var node = document.createElement("p");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    ctx.appendChild(node);
}

/**
 * Creates a meter with a value of amnt/100.
 * @param {Number} amnt - Amount out of 100 to fill the meter
 */ 
function createMeter(amnt) {
    var ctx = document.getElementsByTagName("botpart")[0];
    var node = document.createElement("meter");
    node.max = 100;
    node.value = amnt;
    ctx.appendChild(node);
}

/**
 * Creates a newline.
 */
function createBreak() {
    var ctx = document.getElementsByTagName("botpart")[0];
    var node = document.createElement("br");
    ctx.appendChild(node);
}

/**
 * Clears the page. (exluding tabs)
 */
function clearPage() {
    var ctx = document.getElementsByTagName("botpart")[0];
    var child = ctx.lastElementChild;
    while (child) {
        ctx.removeChild(child);
        child = ctx.lastElementChild;
    }
}
