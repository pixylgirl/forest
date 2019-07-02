thisVersion = 1.039;
// handles saving and loading

function save(Game) {
    // remove old cookie
    Cookies.remove('gamesave');
    // add new cookie
    Cookies.set(
        'gamesave',
        Game,
        {
            expires: 265,
            path: ''
        }
    );
}

function makeNewSave() {
    var newTabs = Tabs;
    Tabs.amount = 1;
    newTabs.remove(0);
    newTabs.addNew("The Forest");
    var Game = {
        version: thisVersion,
        Tabs: newTabs,
        Content: getContent(),
        Data: {
            ForestContent: {
                state: 0, // the state of things in the forest
                treesCut: 0,
                hasFire: false,
                hasCamp: false,
                clayPit: false,
                tabsBackup: {},
                campTabs: {
                    amount: 5,
                    names: ["Camp", "Population", "Research", "Storage", "Info"],
                    selected: 0
                }
            },
            CampContent: {
                Population: {
                    total: 0,
                    young: 0,
                    normal: 0,
                    old: 0
                },
                housing: 0
            },
            BagContent: {
                rustedAxeHead: 0,
                wood: 0,
                leaves: 0,
                rocks: 0,
                clay: 0,
                axe: 0,
                axeDurability: 0,
                shovel: 0,
                shovelDurability: 0
            }
        }
    };
    Game.Tabs.display();
    save(Game);
    console.log("Game has been created and saved.");
    return Game;
}

function fixMissing(Tame) {
    console.log("fixing data!");
    Tame.Tabs.addNew = Tabs.addNew;
    Tame.Tabs.remove = Tabs.remove;
    Tame.Tabs.display = Tabs.display;
    Tame.Tabs.loadTab = Tabs.loadTab;
    Tame.Tabs.hasTab = Tabs.hasTab;
    Tame.Tabs.insert = Tabs.insert;
    Tame.Tabs.find = Tabs.find;
    Tame.Tabs.getContent = Tabs.getContent;
    Tame.Tabs.setContent = Tabs.setContent;
    Tame.Content = getContent();
    Tabs = Tame.Tabs;
    
    return Tame;
}

function load() {
    // grab data from cookie
    var Game = Cookies.getJSON('gamesave');
    console.log("here is Game: " + Game);
    if (Game === undefined) {
        console.log("Game came out as undefined, initalise new game!");
        var Game = makeNewSave();
        return Game;
    }
    if (Game.version === null) {
        console.log("Game.version came out as null, initalise new game!");
        var Game = makeNewSave();
        return Game;
    }
    if (Game.version === undefined) {
        console.log("Game.version was undefined, initalise new game!");
        var Game = makeNewSave();
        return Game;
    }
    Game = fixMissing(Game);
    if (Game.version != thisVersion) {
        Game = requestUpdate(Game);
        console.log("An update is avalable.");
    }
    // game was loaded
    console.log("Game.version is " + Game.version + ", loading save!");
    Game.Tabs.display();
    return Game;
}

function requestUpdate(save) {
    console.log("Incompatible save, updating.");
    save = makeNewSave();
    return save;
}
