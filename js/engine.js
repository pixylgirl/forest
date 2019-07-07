// engine.js declares some of the core groundwork
// surrounding how data is passed around and used.

Tabs = {
    amount: 1,
    names: ["new game"],
    selected: 0,
    getContent: function() {
        return {
            amount: this.amount,
            names: this.names,
            selected: this.selected
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

/**
 * Will find and draw page content for a given a tab name.
 * @param {String} name Name of the content to find
 */
function tabContentManager(name) {
    // remove page content
    clearPage();
    
    // Find the appropiate content handler for this tab
    if (name == "new game") {
        console.log("Loading game from reload");
        SaveContent = load();
        save(SaveContent);
        setInterval(getTickContent().onTick, 500);
        Tabs.loadTab(Tabs.selected);
    }
    else {
        SaveContent.Content.initTabContent(name);
    }
}
