function getPage() {
    return document.getElementsByTagName("botpart")[0];
}

function createButton(text, callback) {
    var ctx = getPage();
    var node = document.createElement("button");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.setAttribute("onclick", callback);
    ctx.appendChild(node);
}

function createButtonInvalid(text) {
    var ctx = getPage();
    var node = document.createElement("button");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.classList.add("invalid-btn");
    ctx.appendChild(node);
}

function createText(text) {
    var ctx = getPage();
    var node = document.createElement("p");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    ctx.appendChild(node);
}

function createMeter(amnt) {
    var ctx = getPage();
    var node = document.createElement("meter");
    node.max = 100;
    node.value = amnt;
    ctx.appendChild(node);
}

function createBreak() {
    var ctx = getPage();
    var node = document.createElement("br");
    ctx.appendChild(node);
}

function clearPage() {
    var ctx = getPage();
    var child = ctx.lastElementChild;
    while (child) {
        ctx.removeChild(child);
        child = ctx.lastElementChild;
    }
}