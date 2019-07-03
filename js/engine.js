Tabs = {
    amount: 1,
    names: ["new game"],
    selected: 0,
    getContent: function() {
        var bamount = this.amount;
        var bnames = this.names;
        var bselected = this.selected;
        return {
            amount: bamount,
            names: bnames,
            selected: bselected
        };
    },
    setContent: function(content) {
        this.amount = content.amount;
        this.names = content.names;
        this.selected = content.selected;
        this.display();
        this.loadTab(this.selected);
    },
    addNew: function(name) {
        this.amount++;
        this.names.push(name);
        this.display();
        return this.amount - 1;
    },
    hasTab: function(name) {
        for (var i = 0; i < this.amount; i++) {
            if (this.names[i] == name) {
                return true;
            }
        }
        return false;
    },
    find: function(name) {
        for (var i = 0; i < this.amount; i++) {
            if (this.names[i] == name) {
                return i;
            }
        }
        return -1;
    },
    insert: function(name) {
        var bk = this.names.pop();
        this.addNew(name);
        this.names.push(bk);
        this.display();
    },
    remove: function(id) {
        this.amount--;
        if (this.selected + 1 > this.amount) {
            this.selected = 0;
        }
        this.names.splice(id);
    },
    display: function() {
        // get tabs menu
        var tabsNode = document.getElementsByTagName("toppart")[0];
        // remove old tabs
        var child = tabsNode.lastElementChild;  
        while (child) { 
            tabsNode.removeChild(child);
            child = tabsNode.lastElementChild; 
        }
        // add new tabs
        for (let i = 0; i < this.amount; i++) {
            var node = document.createElement("button");
            var textnode = document.createTextNode(this.names[i]);
            node.appendChild(textnode);
            node.setAttribute("onclick", "Tabs.selected = " + i + "; Tabs.loadTab(" + i + ");");
            tabsNode.appendChild(node);
        }
    },
    loadTab: function(id) {
        tabContentManager(this.names[id]);
    }
};

function tabContentManager(name) {
    // remove page content
    var page = document.getElementsByTagName("botpart")[0];
    var child = page.lastElementChild;
    while (child) {
        page.removeChild(child);
        child = page.lastElementChild;
    }
    // find appropiate handler/renderer
    switch (name) {
        case "new game":
            console.log("Loading game via main tab...");
            setupSaveData();
            addTickContent();
            Tabs.loadTab(Tabs.selected);
            return;
        default:
            SaveContent.Content.initTabContent(name);
            return;
    }
}

function setupSaveData() {
    SaveContent = load();
    save(SaveContent);
}

function addTickContent() {
    setInterval(getTickContent().onTick, 500);
}
