// saves.js is just what it sounds like: tools
// for loading and saving the game as well as
// version management.

// Current game version
thisVersion = 1.048;

/**
 * Saves a passed game object.
 * @param {*} Game - A game object (SaveContent)
 */
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

/**
 * Generates a new save file.
 * @return {*} Your new save file
 */
function makeNewSave() {
    var newTabs = Tabs;
    Tabs.amount = 1;
    newTabs.remove(0);
    newTabs.addNew("The Forest");
    var Game = {
        version: thisVersion,
        autosave_ticks: 0,
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
                    old: 0,
                    popnext: 100,
                    popcurrent: 0,
                    poptoage: 1000
                },
                Jobs: {
                    avalable: 0,
                    inventor: 0,
                    treecutter: 0,
                    rockpicker: 0,
                    claydigger: 0
                },
                Research: {
                    rp: 0,
                    Tech: {
                        name: ["Torches"],
                        desc: ["It's like a fire, but portable. Maybe this way we can see further into the forest!"],
                        cost: [120],
                        amnt: 0 // maximum index, not total amounts
                    }
                },
                housing: 0
            },
            BagContent: {
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

/**
 * Replaces functions that are not saved between loads into a save file.
 * @param {*} Tame - A game object (SaveContent)
 * @returns {*} Your new save file
 */
function fixMissing(Tame) {
    console.log("Fixing data!");
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

/**
 * Loads a save file completely.
 * Completes all required checks including fixMissing and version control
 * @returns {*} Your new save file
 */
function load() {
    // grab data from cookie
    var Game = Cookies.getJSON('gamesave');
    console.log("Here is Game: " + Game);
    if (Game == undefined || Game == null || Game == undefined) {
        console.log("Game was not aquired, initalizing a new game!");
        var Game = makeNewSave();
        return Game;
    }
    Game = fixMissing(Game);
    if (Game.version != thisVersion) {
        console.log("An update is avalable, wiping save.");
        Game = makeNewSave();
    }
    // game was loaded
    console.log("Game.version is " + Game.version + ", loading save!");
    Game.Tabs.display();
    return Game;
}
