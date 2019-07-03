function getContent() {
    return {
        initTabContent: function(name) {
            console.log("Checking against other content");
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
                            createText("There is a bit of a clearing where a campfire could be set up.");
                            if (!SaveContent.Data.ForestContent.hasFire) {
                                if (SaveContent.Data.BagContent.wood < 15) {
                                    createButtonInvalid("Make campfire (15 wood)");
                                }
                                else {
                                    createButton("Make campfire (15 wood)", "SaveContent.Content.ForestContent.MakeFire();");
                                }
                            }
                            else {
                                createText("There is a campfire here that makes it easier to see a bit further into the fog.");
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
                        if (SaveContent.Data.BagContent.axe) {
                            var woodtext = SaveContent.Data.BagContent.wood + " wood, ";
                            var leavestext = SaveContent.Data.BagContent.leaves + " leaves)";
                            createButton("Chop trees (" + woodtext + leavestext, "SaveContent.Content.ForestContent.ChopTree();");
                        }
                        else {
                            createButtonInvalid("Chop trees (need a axe)");
                        }
                        createBreak();
                        createButton("Pick up rocks (" + SaveContent.Data.BagContent.rocks + " rocks)", "SaveContent.Content.ForestContent.PickRocks();");
                        createBreak();
                        if (SaveContent.Data.BagContent.shovel && SaveContent.Data.ForestContent.clayPit) {
                            createButton("Dig Clay", "SaveContent.Content.ForestContent.DigClay();");
                        }
                        else if (SaveContent.Data.ForestContent.clayPit) {
                            createButtonInvalid("Dig Clay (need a shovel)");
                        }
                    }
                    return;
                case "Crafting":
                    createText("Things you know how to make:");
                    if (SaveContent.Data.BagContent.wood >= 5 && SaveContent.Data.BagContent.rustedAxeHead >= 1) {
                        createButton("Axe (5 Wood, 1 Rusted axe head)", "SaveContent.Content.CraftingContent.CraftAxe();");
                    }
                    else {
                        createButtonInvalid("Axe (5 Wood, 1 Rusted axe head)");
                    }
                    return;
                case "Bag":
                case "Storage":
                    createText("This is all the stuff you have:");
                    if (SaveContent.Data.BagContent.rustedAxeHead > 0) {
                        createText("Rusted axe head (" + SaveContent.Data.BagContent.rustedAxeHead + ")");
                    }
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
                        createText("Rotting axe (" + SaveContent.Data.BagContent.axeDurability + "/35)");
                    }
                    if (SaveContent.Data.BagContent.axe == 2) {
                        createText("Average axe (" + SaveContent.Data.BagContent.axeDurability + "/125)");
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
                    createBreak();
                    createText("Demographics");
                    createText("--------------------");
                    createText("Young: " + SaveContent.Data.CampContent.Population.young);
                    createText("Working: " + SaveContent.Data.CampContent.Population.normal);
                    createText("Old: " + SaveContent.Data.CampContent.Population.old);
                    createBreak();
                    if (SaveContent.Data.BagContent.wood >= 35 && SaveContent.Data.BagContent.leaves >= 80 && SaveContent.Data.BagContent.rocks >= 15) {
                        createButton("Make housing (35 wood, 80 leaves, 15 rocks)", "SaveContent.Content.CampContent.MakeHousing();");
                    }
                    else {
                        createButtonInvalid("Make housing (35 wood, 80 leaves, 15 rocks)");
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
                    return;
                default:
                    createText("ERROR: This content manager does not handle this tab! (ct: main)");
                    console.log("This content manager does not handle this tab! (ct: main)");
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
                    if (SaveContent.Data.BagContent.axe == 1) {
                        SaveContent.Data.BagContent.rustedAxeHead += 1;
                    }
                    if (SaveContent.Data.BagContent.axe == 2) {
                        SaveContent.Data.BagContent.rustedAxeHead += 1;
                    }
                    SaveContent.Data.BagContent.axe = 0;
                }
                SaveContent.Tabs.loadTab(0);
            },
            PickRocks: function() {
                SaveContent.Data.BagContent.rocks += 1;
                SaveContent.Tabs.loadTab(0);
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
                SaveContent.Data.BagContent.rocks -= 15;
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
                SaveContent.Data.BagContent.rustedAxeHead -= 1;
                SaveContent.Data.BagContent.axe = 2;
                SaveContent.Data.BagContent.axeDurability = 125;
                SaveContent.Tabs.loadTab(2);
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
