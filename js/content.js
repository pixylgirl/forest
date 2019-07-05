/// Provides the object containing the main content manager
function getContent() {
    return {
        initTabContent: function(name) {
            console.log("Checking against ct: main");
            switch (name) {
                case "The Forest":
                    if (SaveContent.Data.ForestContent.state == 0) {
                        createText("You wake up in a supposedly abandoned forest. There is nothing around but trees and an axe which lays on a nearby tree stump.");
                        createButton("Pick up the axe", "SaveContent.Content.ForestContent.PickupAxe();");
                    }
                    else if (SaveContent.Data.ForestContent.state == 1) {
                        createText("You stand in a supposedly abandoned forest. There is nothing around but trees and yourself.");
                        createText("A thick fog makes it hard to see well enough to go exploring.");
                        createText("Perhaps this would be a good place to get some wood.");
                        if (SaveContent.Data.BagContent.axe) {
                            var woodtext = SaveContent.Data.BagContent.wood + " wood, ";
                            var leavestext = SaveContent.Data.BagContent.leaves + " leaves)";
                            createButton("Chop trees (" + woodtext + leavestext, "SaveContent.Content.ForestContent.ChopTree();");
                        }
                        else {
                            createButtonInvalid("Cut down a tree (need a axe)");
                            if (!SaveContent.Tabs.hasTab("Crafting")) {
                                SaveContent.Tabs.insert("Crafting");
                            }
                        }
                        if (SaveContent.Data.ForestContent.hasFire) {
                            createBreak();
                            createButton("Pick up rocks (" + SaveContent.Data.BagContent.rocks + " rocks)", "SaveContent.Content.ForestContent.PickRocks();");
                        }
                        if (SaveContent.Data.ForestContent.treesCut < 10) {
                            createText("There is very little clear space to put things.");
                        }
                        else if (SaveContent.Data.ForestContent.treesCut < 50 || !SaveContent.Data.ForestContent.hasFire) {
                            if (!SaveContent.Data.ForestContent.hasFire) {
                                createText("There is a bit of a clearing where a campfire could be set up.");
                                if (SaveContent.Data.BagContent.wood < 15) {
                                    createButtonInvalid("Make campfire (15 wood)");
                                }
                                else {
                                    createButton("Make campfire (15 wood)", "SaveContent.Content.ForestContent.MakeFire();");
                                }
                            }
                            else {
                                createText("There is a campfire here that makes it easier to see a bit further into the fog. There are some rocks are on the ground that you could pick up you couldn't see before.");
                            }
                        }
                        else if (SaveContent.Data.ForestContent.treesCut < 150 || !SaveContent.Data.ForestContent.hasCamp) {
                            createText("A large space is cleared where a camp could be set up.");
                            createText("If you set up camp here you could try to start a village.");
                            createButton("Set up a camp", "SaveContent.Content.ForestContent.StartCamp();");
                        }
                        else {
                            createText("Missing progression: Tree clearing");
                        }
                    }
                    else if (SaveContent.Data.ForestContent.state == 2) {
                        createText("A fog filled forest surrounds you. There is a camp set up here in a clearing.");
                        createButton("Enter camp", "SaveContent.Content.ForestContent.EnterCamp();");
                        createBreak();
                        createText("There are trees here you could chop down with an axe.");
                        if (SaveContent.Data.BagContent.axe) {
                            var woodtext = SaveContent.Data.BagContent.wood + " wood, ";
                            var leavestext = SaveContent.Data.BagContent.leaves + " leaves)";
                            createButton("Chop trees (" + woodtext + leavestext, "SaveContent.Content.ForestContent.ChopTree();");
                        }
                        else {
                            createButtonInvalid("Chop trees (need a axe)");
                        }
                        createBreak();
                        createText("There are rocks you could pick up off the ground.");
                        createButton("Pick up rocks (" + SaveContent.Data.BagContent.rocks + " rocks)", "SaveContent.Content.ForestContent.PickRocks();");
                        createBreak();
                        if (SaveContent.Data.ForestContent.clayPit) {
                            createText("There is an area of clay which could be obtained with a shovel.");
                            if (SaveContent.Data.BagContent.shovel) {
                                createButton("Dig Clay (" + SaveContent.Data.BagContent.clay + " clay)", "SaveContent.Content.ForestContent.DigClay();");
                            }
                            else {
                                createButtonInvalid("Dig Clay (need a shovel)");
                            }
                        }
                    }
                    return;
                case "Crafting":
                    createText("Things you know how to make:");
                    if (SaveContent.Data.BagContent.wood >= 5 && SaveContent.Data.BagContent.rocks >= 15) {
                        createButton("Makeshift Axe (5 Wood, 15 Rocks)", "SaveContent.Content.CraftingContent.CraftAxe();");
                    }
                    else {
                        createButtonInvalid("Makeshift Axe (5 Wood, 15 Rocks)");
                    }
                    createBreak();
                    if (SaveContent.Data.BagContent.wood >= 5 && SaveContent.Data.BagContent.rocks >= 15) {
                        createButton("Makeshift Shovel (5 Wood, 15 Rocks)", "SaveContent.Content.CraftingContent.CraftShovel();");
                    }
                    else {
                        createButtonInvalid("Makeshift Shovel (5 Wood, 15 Rocks)");
                    }
                    return;
                case "Bag":
                case "Storage":
                    createText("This is all the stuff you have:");
                    if (SaveContent.Data.BagContent.wood > 0) {
                        createText("Wood (" + SaveContent.Data.BagContent.wood + ")");
                    }
                    if (SaveContent.Data.BagContent.leaves > 0) {
                        createText("Leaves (" + SaveContent.Data.BagContent.leaves + ")");
                    }
                    if (SaveContent.Data.BagContent.rocks > 0) {
                        createText("Rocks (" + SaveContent.Data.BagContent.rocks + ")");
                    }
                    if (SaveContent.Data.BagContent.clay > 0) {
                        createText("Clay (" + SaveContent.Data.BagContent.clay + ")");
                    }
                    if (SaveContent.Data.BagContent.axe == 1) {
                        createText("Rotting Axe (" + SaveContent.Data.BagContent.axeDurability + "/35)");
                    }
                    if (SaveContent.Data.BagContent.axe == 2) {
                        createText("Makeshift Axe (" + SaveContent.Data.BagContent.axeDurability + "/125)");
                    }
                    if (SaveContent.Data.BagContent.shovel == 1) {
                        createText("Makeshift Shovel (" + SaveContent.Data.BagContent.shovelDurability + "/75)");
                    }
                    return;
                case "Camp":
                    if (SaveContent.Data.CampContent.Population.total < 50) {
                        createText("Your camp is small, but well maintained.");
                        createText("Given shelter, people might come and stay for a while.");
                    }
                    createText("Buildings:");
                    createText("Basic housing (" + SaveContent.Data.CampContent.housing + ")");
                    createButton("Go outside", "SaveContent.Content.ForestContent.ExitCamp();");
                    return;
                case "Population":
                    createText("Population/Housing: " + SaveContent.Data.CampContent.Population.total + "/" + SaveContent.Data.CampContent.housing);
                    if (SaveContent.Data.BagContent.wood >= 35 && SaveContent.Data.BagContent.leaves >= 80 && SaveContent.Data.BagContent.rocks >= 15) {
                        createButton("Make housing (35 Wood, 80 Leaves, 25 Rocks)", "SaveContent.Content.CampContent.MakeHousing();");
                    }
                    else {
                        createButtonInvalid("Make housing (35 Wood, 80 Leaves, 25 Rocks)");
                    }
                    createBreak();
                    createText("Progress to next citizen: ");
                    createMeter((SaveContent.Data.CampContent.Population.popcurrent / (SaveContent.Data.CampContent.Population.popnext / 100)));
                    createText("(" + SaveContent.Data.CampContent.Population.popcurrent + "/" + SaveContent.Data.CampContent.Population.popnext + " ticks)");
                    createBreak();
                    createText("Demographics:");
                    createText("Young: " + SaveContent.Data.CampContent.Population.young);
                    createText("Working: " + SaveContent.Data.CampContent.Population.normal);
                    createText("Old: " + SaveContent.Data.CampContent.Population.old);
                    createBreak();
                    createText("avalable workers/productive citizens: (" + SaveContent.Data.CampContent.Jobs.avalable + "/" + SaveContent.Data.CampContent.Population.normal + ")");
                    createText("Jobs:");
                    createText("Inventors produce Research Points (RP) for use in the Research tab.");
                    createButtonInvalid("Inventor (" + SaveContent.Data.CampContent.Jobs.inventor + ")");
                    if (SaveContent.Data.CampContent.Jobs.inventor) {
                        createButton("-1", "SaveContent.Data.CampContent.Jobs.inventor -= 1; SaveContent.Data.CampContent.Jobs.avalable += 1; SaveContent.Tabs.loadTab(Tabs.selected);")
                    }
                    else {
                        createButtonInvalid("-1");
                    }
                    if (SaveContent.Data.CampContent.Jobs.avalable) {
                        createButton("+1", "SaveContent.Data.CampContent.Jobs.inventor += 1; SaveContent.Data.CampContent.Jobs.avalable -= 1; SaveContent.Tabs.loadTab(Tabs.selected);");
                    }
                    else {
                        createButtonInvalid("+1");
                    }
                    createText("Treecutters cut trees. They produce wood.");
                    createButtonInvalid("Treecutter (" + SaveContent.Data.CampContent.Jobs.treecutter + ")");
                    if (SaveContent.Data.CampContent.Jobs.treecutter) {
                        createButton("-1", "SaveContent.Data.CampContent.Jobs.treecutter -= 1; SaveContent.Data.CampContent.Jobs.avalable += 1; SaveContent.Tabs.loadTab(Tabs.selected);")
                    }
                    else {
                        createButtonInvalid("-1");
                    }
                    if (SaveContent.Data.CampContent.Jobs.avalable) {
                        createButton("+1", "SaveContent.Data.CampContent.Jobs.treecutter += 1; SaveContent.Data.CampContent.Jobs.avalable -= 1; SaveContent.Tabs.loadTab(Tabs.selected);");
                    }
                    else {
                        createButtonInvalid("+1");
                    }
                    createText("Stone Grabbers get stones. The produce rocks.");
                    createButtonInvalid("Stone Grabbers (" + SaveContent.Data.CampContent.Jobs.rockpicker + ")");
                    if (SaveContent.Data.CampContent.Jobs.rockpicker) {
                        createButton("-1", "SaveContent.Data.CampContent.Jobs.rockpicker -= 1; SaveContent.Data.CampContent.Jobs.avalable += 1; SaveContent.Tabs.loadTab(Tabs.selected);")
                    }
                    else {
                        createButtonInvalid("-1");
                    }
                    if (SaveContent.Data.CampContent.Jobs.avalable) {
                        createButton("+1", "SaveContent.Data.CampContent.Jobs.rockpicker += 1; SaveContent.Data.CampContent.Jobs.avalable -= 1; SaveContent.Tabs.loadTab(Tabs.selected);");
                    }
                    else {
                        createButtonInvalid("+1");
                    }
                    if (SaveContent.Data.ForestContent.clayPit) {
                        createText("Clay Diggers dig clay. They produce clay.");
                        createButtonInvalid("Clay Diggers (" + SaveContent.Data.CampContent.Jobs.claydigger + ")");
                        if (SaveContent.Data.CampContent.Jobs.claydigger) {
                            createButton("-1", "SaveContent.Data.CampContent.Jobs.claydigger -= 1; SaveContent.Data.CampContent.Jobs.avalable += 1; SaveContent.Tabs.loadTab(Tabs.selected);")
                        }
                        else {
                            createButtonInvalid("-1");
                        }
                        if (SaveContent.Data.CampContent.Jobs.avalable) {
                            createButton("+1", "SaveContent.Data.CampContent.Jobs.claydigger += 1; SaveContent.Data.CampContent.Jobs.avalable -= 1; SaveContent.Tabs.loadTab(Tabs.selected);");
                        }
                        else {
                            createButtonInvalid("+1");
                        }
                    }
                    return;
                case "Info":
                    createText("Forest v" + thisVersion);
                    createText("produced by pixylgirl");
                    createButton("Save Game", "SaveContent.Content.InfoContent.Save();");
                    createBreak();
                    createBreak();
                    createBreak();
                    createButton("Reset Game", "SaveContent.Content.InfoContent.Reset();");
                    createBreak();
                    createBreak();
                    createBreak();
                    createText("The game autosaves every 50 seconds. Progress to next autosave: ");
                    createMeter(SaveContent.autosave_ticks);
                    return;
                default:
                    createText("ERROR: This content manager does not handle this tab! (ct: main)");
                    console.log("Unable to find content, no alternative implimented. (ct: main)");
                    return;
            }
        },
        ForestContent: {
            PickupAxe: function() {
                SaveContent.Data.ForestContent.state = 1;
                SaveContent.Tabs.addNew("Bag");
                SaveContent.Data.BagContent.axe = 1;
                SaveContent.Data.BagContent.axeDurability = 35;
                SaveContent.Tabs.addNew("Info");
                SaveContent.Tabs.loadTab(0);
            },
            ChopTree: function() {
                SaveContent.Data.BagContent.wood += 1;
                SaveContent.Data.BagContent.leaves += 2;
                SaveContent.Data.ForestContent.treesCut += 1;
                SaveContent.Data.BagContent.axeDurability -= 1;
                if (SaveContent.Data.BagContent.axeDurability < 1) {
                    SaveContent.Data.BagContent.axe = 0;
                }
            },
            PickRocks: function() {
                SaveContent.Data.BagContent.rocks += 1;
            },
            MakeFire: function() {
                SaveContent.Data.BagContent.wood -= 15;
                SaveContent.Data.ForestContent.hasFire = true;
                SaveContent.Tabs.loadTab(0);
            },
            StartCamp: function() {
                SaveContent.Data.ForestContent.state = 2;
                SaveContent.Data.ForestContent.hasCamp = true;
                SaveContent.Tabs.loadTab(0);
            },
            EnterCamp: function() {
                SaveContent.Data.ForestContent.tabsBackup = SaveContent.Tabs.getContent();
                SaveContent.Tabs.setContent(SaveContent.Data.ForestContent.campTabs)
            },
            ExitCamp: function() {
                SaveContent.Data.ForestContent.campTabs = SaveContent.Tabs.getContent();
                SaveContent.Tabs.setContent(SaveContent.Data.ForestContent.tabsBackup);
            }
        },
        CampContent: {
            MakeHousing: function() {
                SaveContent.Data.BagContent.wood -= 35;
                SaveContent.Data.BagContent.leaves -= 80;
                SaveContent.Data.BagContent.rocks -= 25;
                SaveContent.Data.CampContent.housing += 1;
                if (SaveContent.Data.CampContent.Population.total < 2) {
                    SaveContent.Data.CampContent.Population.total = SaveContent.Data.CampContent.housing;
                    SaveContent.Data.CampContent.Population.normal = SaveContent.Data.CampContent.housing;
                }
                SaveContent.Tabs.loadTab(SaveContent.Tabs.find("Population"));
            }
        },
        CraftingContent: {
            CraftAxe: function() {
                SaveContent.Data.BagContent.wood -= 5;
                SaveContent.Data.BagContent.rocks -= 15;
                SaveContent.Data.BagContent.axe = 2;
                SaveContent.Data.BagContent.axeDurability = 125;
                SaveContent.Tabs.loadTab(Tabs.selected);
            },
            CraftShovel: function() {
                SaveContent.Data.BagContent.wood -= 5;
                SaveContent.Data.BagContent.rocks -= 15;
                SaveContent.Data.BagContent.shovel = 1;
                SaveContent.Data.BagContent.shovelDurability = 75;
                SaveContent.Tabs.loadTab(Tabs.selected);
            }
        },
        InfoContent: {
            Save: function() {
                save(SaveContent);
            },
            Reset: function() {
                SaveContent.version -= 1;
                save(SaveContent);
                setupSaveData();
                Tabs.loadTab(Tabs.selected);
            }
        }
    };
}

/// Provides the function to be run every tick
function getTickContent() {
    return {
        onTick: function() {
            // Autosave if this is 100, otherwise ++
            SaveContent.autosave_ticks += 1;
            if (SaveContent.autosave_ticks >= 100) {
                SaveContent.autosave_ticks = 0;
                save(SaveContent);
            }
            // If the population can increase, tick the population meter
            if (SaveContent.Data.CampContent.Population.total < SaveContent.Data.CampContent.housing) {
                SaveContent.Data.CampContent.Population.popcurrent += 1;
                // If the population meter is full, increase population and reset meter
                if (SaveContent.Data.CampContent.Population.popcurrent >= SaveContent.Data.CampContent.Population.popnext) {
                    SaveContent.Data.CampContent.Population.young += 1;
                    SaveContent.Data.CampContent.Population.total += 1;
                    SaveContent.Data.CampContent.Population.popcurrent = 0;
                    SaveContent.Data.CampContent.Population.popnext = (100 + 50 * (SaveContent.Data.CampContent.Population.total - 2));
                }
            }
            // Tick the citizen aging counter
            SaveContent.Data.CampContent.Population.poptoage -= 1;
            // If it is zero, update population ages
            if (SaveContent.Data.CampContent.Population.poptoage <= 0) {
                SaveContent.Data.CampContent.Population.poptoage = 1000;
                var childup = Math.floor(SaveContent.Data.CampContent.Population.young / 2);
                var normalup = Math.floor(SaveContent.Data.CampContent.Population.normal / 3);
                var oldup = Math.floor(SaveContent.Data.CampContent.Population.old / 2);
                SaveContent.Data.CampContent.Population.young -= childup;
                SaveContent.Data.CampContent.Population.normal += childup;
                SaveContent.Data.CampContent.Population.normal -= normalup;
                SaveContent.Data.CampContent.Population.old += normalup;
                SaveContent.Data.CampContent.Population.old -= oldup;
                SaveContent.Data.CampContent.Population.total -= oldup;
            }

            // Calculate avalable workers
            SaveContent.Data.CampContent.Jobs.avalable = (
                SaveContent.Data.CampContent.Population.normal -
                SaveContent.Data.CampContent.Jobs.inventor -
                SaveContent.Data.CampContent.Jobs.treecutter -
                SaveContent.Data.CampContent.Jobs.rockpicker -
                SaveContent.Data.CampContent.Jobs.claydigger
            );

            // Remove any extra workers we can't have
            while (SaveContent.Data.CampContent.Jobs.avalable < 0) {
                if (SaveContent.Data.CampContent.Jobs.inventor) {
                    SaveContent.Data.CampContent.Jobs.inventor -= 1;
                }
                else if (SaveContent.Data.CampContent.Jobs.treecutter) {
                    SaveContent.Data.CampContent.Jobs.treecutter -= 1;
                }
                else if (SaveContent.Data.CampContent.Jobs.rockpicker) {
                    SaveContent.Data.CampContent.Jobs.rockpicker -= 1;
                }
                else if (SaveContent.Data.CampContent.Jobs.claydigger) {
                    SaveContent.Data.CampContent.Jobs.claydigger -= 1;
                }
            }
            
            // Worker production
            SaveContent.Data.CampContent.Research.rp += SaveContent.Data.CampContent.Jobs.inventor;
            SaveContent.Data.BagContent.wood += SaveContent.Data.CampContent.Jobs.treecutter;
            SaveContent.Data.BagContent.rocks += SaveContent.Data.CampContent.Jobs.rockpicker;
            SaveContent.Data.BagContent.clay += SaveContent.Data.CampContent.Jobs.claydigger;

            // Update any changes to the current tab
            Tabs.loadTab(Tabs.selected);
        }
    }
}
