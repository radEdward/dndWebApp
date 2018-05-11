var menuBarSwitch = 0;
var mapWindowSwitch = 0;
var iconWindowSwitch = 0;
var iconMenuSwitch = 0;
var placeImageSwitch = 0; var removeImageSwitch = 0; var moveImageSwitch = 0; var rotateImageSwitch = 0;
var markMapSwitch = 0; var measureMapSwitch = 0; var hideMapSwitch = 0; var zoomMapSwitch = 0; var showMapSwitch = 0;
var backGroundImage;

var idNo = 0; var hideIdNo = 0;
var colorPicker = 0;

var rotation = 0; var zoom = 100;

var gamePiece; var imageToSet;

var x; var y;

var fromX; var fromY; var toX; var toY;



function mapControl() {
    
    x = event.pageX;
    y = event.pageY;
    
    iconControl();
    
    if (placeImageSwitch === 1) {

            document.getElementById("iconsGoHere").appendChild(gamePiece);

            gamePiece.style.position = "absolute";
            gamePiece.style.left = (x - gamePiece.getAttribute("width")/2) + "px";
            gamePiece.style.top = (y - gamePiece.getAttribute("height")/2) + "px";
            
            if (markMapSwitch === 1) { markMap(); placeImageSwitch = 0; }
            
            document.getElementById("sizeIcon").value = "Size:";

    };
    
    
    
    if (zoomMapSwitch === 1) {
        
            zoom -= 10;
        
            document.getElementById("map").style.zoom = zoom + "%";
            document.getElementById("iconsGoHere").style.zoom = zoom + "%";
        
    }
    
    
    
    if (measureMapSwitch === 2) {
        
            measureMap();
        
    }
    
    placeImageSwitch = 0;

}
function iconControl() {
    
    gamePiece = document.createElement("IMG");
    gamePiece.setAttribute("id", idNo);
    
            idNo++;
            
            if (markMapSwitch === 1) { imageToSet = "https://image.ibb.co/bHaGFd/markMap.png"; document.getElementById("sizeIcon").value = "Large"; placeImageSwitch = 1;}
            
    gamePiece.setAttribute("src", imageToSet);
    gamePiece.setAttribute("draggable", false);
            
            if (document.getElementById("sizeIcon").value === "Normal" || document.getElementById("sizeIcon").value === "Size:") { gamePiece.setAttribute("width", "100"); gamePiece.setAttribute("height", "100"); }
            if (document.getElementById("sizeIcon").value === "Large") { gamePiece.setAttribute("width", "200"); gamePiece.setAttribute("height", "200"); }
            if (document.getElementById("sizeIcon").value === "Huge") { gamePiece.setAttribute("width", "400"); gamePiece.setAttribute("height", "400"); }
            
    gamePiece.onclick = function() {
        
            if (removeImageSwitch === 1) { document.getElementById("iconsGoHere").removeChild(document.getElementById(this.id)); }
            if (rotateImageSwitch === 1) { rotation += 90;
                                          document.getElementById(this.id).style.transform = "rotate(" + rotation + "deg)";
                                          if (rotation === 360) { rotation = 0; } }

    };
    
    gamePiece.ondblclick = function() {
        
            if ( colorPicker === 6 ) { colorPicker = 0; }
        
            var borderColors = ["#000000", "#FF0000", "#4169E1", "#B8860B", "#008B8B", "#008000"];
            
            document.getElementById(this.id).style.border = "10px solid transparent";
            document.getElementById(this.id).style.borderLeftColor = borderColors[colorPicker];
            
            colorPicker++;
        
    };
            
    moveElement(gamePiece);
    
}



function mouseDownFunctions() {
    
    if (measureMapSwitch === 1) {
        
            fromX = event.pageX;
            fromY = event.pageY;
            
            measureMapSwitch++;
            
            document.getElementById("measureMap").style.background = "lightgray";
            
            var measureDisplay = document.createElement("div");
            document.getElementById("iconsGoHere").appendChild(measureDisplay);
            measureDisplay.setAttribute("id", "measureDisplay");
            measureDisplay.style.position = "absolute";
            measureDisplay.style.width = "30px";
            measureDisplay.style.height = "25px";
            measureDisplay.style.background = "white";
            measureDisplay.style.fontWeight = "bold";
        
    }
    
    if (hideMapSwitch === 1) {
        
            fromX = event.pageX;
            fromY = event.pageY;
            
            var hideSquare = document.createElement("IMG");
            hideSquare.setAttribute("id", "hideSquare" + hideIdNo);
            hideSquare.setAttribute("src", "hideMap.png");
            document.getElementById("iconsGoHere").appendChild(hideSquare);
            hideSquare.style.position = "absolute";
            hideSquare.style.width = "100px";
            hideSquare.style.height = "100px";
            hideSquare.style.top = fromY - 15 + "px";
            hideSquare.style.left = fromX - 15 + "px";
            hideSquare.setAttribute("draggable", false);
            
            hideSquare.ondblclick = function() {
                
                document.getElementById("iconsGoHere").removeChild(document.getElementById(this.id));
                
            };
            
            
            hideSquare.onmousemove = function() {
                
                toX = event.pageX + 3;
                toY = event.pageY + 3;
            
                if (hideMapSwitch === 1) {
                                           document.getElementById("hideSquare" + hideIdNo).style.width = Math.abs(toX - fromX + 30) + "px"; document.getElementById("hideSquare" + hideIdNo).style.height = Math.abs(toY - fromY + 30) + "px";
                                         }
                
            };

            
            hideSquare.onmouseup = function() {
                
                hideIdNo++;
                hideMapSwitch++;
                hideMap();
                
            };
        
    }
    
}
function mouseMoveFunctions() {
    
    if (measureMapSwitch === 2) {
            
            toX = event.pageX;
            toY = event.pageY;
            
            document.getElementById("measureDisplay").style.top = toY - 25 + "px";
            document.getElementById("measureDisplay").style.left = toX - 3 + "px";
            
            document.getElementById("measureDisplay").innerHTML = Math.round(getDistance(fromX, toX, fromY, toY)) + "ft";
        
    }
    
}



function getDistance(x1, x2, y1, y2) {
    
    return Math.sqrt(((x2 - x1)/20.0)*((x2 - x1)/20.0) + ((y2 - y1)/20.0)*((y2 - y1)/20.0));
    
}
function moveElement(elmnt) {

        var fromX = 0, fromY = 0, toX = 0, toY = 0;
        elmnt.onmousedown = mouseDownOnElement;

        function mouseDownOnElement() {
          fromX = event.pageX;
          fromY = event.pageY;
          document.onmouseup = stopMovingElement;
          document.onmousemove = mouseMoveOnElement;
        }

        function mouseMoveOnElement() {
          toX = fromX - event.pageX;
          toY = fromY - event.pageY;
          fromX = event.pageX;
          fromY = event.pageY;
          elmnt.style.top = (elmnt.offsetTop - toY) + "px";
          elmnt.style.left = (elmnt.offsetLeft - toX) + "px";
        }

        function stopMovingElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }

}



function mapSwitch() {
    
    idNo++;
    
}
function generateBoard() {
    
    document.getElementById("menuBar").style.display = "block";
    document.getElementById("welcomeBox").style.display = "none";
    document.getElementById("welcomeBanner").style.display = "none";
    
    backGroundImage = document.createElement("IMG");
    
    if (idNo === 0) { backGroundImage.src = "https://image.ibb.co/gUivAd/default_Map.jpg"; }
    if (idNo > 0) { backGroundImage.src = document.getElementById("myFile").files[0].name; }
    
    document.getElementById("map").src = backGroundImage.src;
    document.getElementById("map").setAttribute("draggable", false);
    
    backGroundImage.onload = function() {
        
        document.getElementById("iconsGoHere").style.width = backGroundImage.width + "px";
        document.getElementById("iconsGoHere").style.height = backGroundImage.height + "px";
        
    };
    
}



function showIcons() {
        
        document.getElementById("minisGoHere").innerHTML = "";
        
        var playerCharacters = ["Adventurer_Dead_22.png", "Adventurer_Dead_28.png", "Adventurer_Dead_32.png", "Archer_40.png", "Cleric_Blue_48.png", "Cleric_Red_47.png", "Dwarven_fighter_hammer_03.png", "Elven_Blue_fighter_09.png", "Elven_Green_Archer_02.png", "Fighter_36.png", "Fighter_39.png", "Fighter_45.png", "Fighter_blue_07.png", "Fighter_Blue_Female_06.png", "Fighter_Blue_Spear_30.png", "Fighter_Blue_Sword_26.png", "Fighter_Female_35.png", "Fighter_Female_Dagger_34.png", "Fighter_Gold_11.png", "Fighter_Green_15.png", "Fighter_Mace_24.png", "Fighter_Metal_18.png", "Fighter_Silver_10.png", "Fighter_Spear_Purple_29.png", "Fighter_Sword_25.png", "Fighter_Sword_Buckler_31.png", "Halfling_05.png", "Halfling_fighter_41.png", "Knight_49.png", "Magicuser_01.png", "Magicuser_16.png", "Magicuser_17.png", "Magicuser_19.png", "Magicuser_27.png", "Magicuser_37.png", "Magicuser_38.png", "Magicuser_43.png", "Magicuser_44.png", "Magicuser_Green_08.png", "Thief_Daggers_21.png", "Villager_Female_04.png", "Whipper_50.png"];
        var goblinsKobolds = ["goblin_archer.png", "goblin_archer2.png", "goblin_axeman.png", "goblin_crossbow.png", "goblin_crossbow2.png", "goblin_crossbow3.png", "goblin_crossbow4.png", "goblin_daggers.png", "goblin_dead_33.png", "goblin_dead_34.png", "goblin_fighter.png", "goblin_mace.png", "goblin_shaman.png", "goblin_shaman2.png", "goblin_shaman3.png", "goblin_shaman4.png", "goblin_spearman.png", "goblin_swordsman.png", "kobold_archer.png", "kobold_archer2.png", "kobold_dead_06.png", "kobold_dead_12.png", "kobold_fighter.png", "kobold_fighter2.png", "kobold_fighter3.png", "kobold_fighter4.png", "kobold_fighter5.png", "kobold_shaman1.png", "kobold_shaman2.png", "kobold_shaman3.png", "kobold_spearman.png", "kobold_spearman2.png", "worg_22.png", "worg_36.png", "worg_38.png", "worg_40.png", "worg_dead_31.png", "worg_rider_35.png", "worg_rider_37.png", "worg_rider_39.png"];
        var orcsTrolls = ["CaveTroll_fighter5.png", "Hill_Troll_dead_28.png", "Hill_troll_fighter4.png", "Hill_Troll_fighter6.png", "Ogre_berserker.png", "Ogre_dead_29.png", "Ogre_fighter.png", "Ogre_fighter2.png", "Ogre_fighter3.png", "Ogre_shaman.png", "Ogre_shaman2.png", "Orc_archer.png", "Orc_chieftan.png", "Orc_chieftan2.png", "Orc_crossbowman.png", "Orc_fighter.png", "Orc_fighter2.png", "Orc_fighter3.png", "Orc_fighter4.png", "Orc_fighter5.png", "Orc_fighter6.png", "Orc_fighter7.png", "Orc_shaman.png", "Troll_dead_27.png", "Troll_fighter.png", "Troll_fighter1.png", "Troll_fighter2.png", "Troll_fighter3.png", "Troll_fighter4.png"];
        var wereCreatures = ["bear_22.png", "bear_24.png", "boar_04.png", "boar_10.png", "boar_16.png", "boar_17.png", "rat_07.png", "rat_11.png", "rat_swarm.png", "servant.png", "tiger_27.png", "tiger_dark_28.png", "victim_female_33.png", "victim_female_34.png", "victim_male_29.png", "victim_male_30.png", "victim_male_31.png", "victim_male_35.png", "werebear_20.png", "werebear_21.png", "werebear_25.png", "wereboar_15.png", "wereboar_fighter_09.png", "wererat_03.png", "wererat_05.png", "wererat_06.png", "wererat_fighter_08.png", "weretiger_23.png", "weretiger_26.png", "werewolf_12.png", "werewolf_13.png", "werewolf_fighter_14.png", "wolf_18.png", "wolf_19.png"];
        var DMEssentials1 = ["DME_Ankheg.png", "DME_Ankheg_Breaching.png", "DME_Basilisk.png", "DME_Basilisk_2.png", "DME_Behir.png", "DME_Blue_Slime.png", "DME_Carrion_Crawler_2.png", "DME_Cockatrice.png", "DME_Cockatrice_2.png", "DME_Gargoyle.png", "DME_Gargoyle_2.png", "DME_Gelatinous_Cube.png", "DME_Gelatinous_Cube_2.png", "DME_Green_Slime.png", "DME_Green_Slime_2.png", "DME_Grey_Ooze.png", "DME_Grey_Ooze_2.png", "DME_Grick.png", "DME_Grick_2.png", "DME_Owlbear.png", "DME_Owlbear_2.png", "DME_Pink_Slime.png", "DME_PurpleWorm.png", "DME_PurpleWorm_2.png", "DME_RustMonster.png", "DME_Shambling_Mound.png", "DME_Shambling_Mound_2.png", "DME_Spider_Giant.png", "DME_Spider_Giant_2.png", "DME_Spider_Giant_3.png", "DME_Spider_Giant_4.png", "DME_Undead_Carrion_Crawler.png"];
        var familiars = ["FS1_Badger.png", "FS1_Badger_Celestial.png", "FS1_Bat_Giant.png", "FS1_Bear_Brown.png", "FS1_Cat.png", "FS1_Cat_2.png", "FS1_Cat_Black.png", "FS1_Cat_Yellow.png", "FS1_Dire_Badger.png", "FS1_Dire_Bear.png", "FS1_Dire_Boar.png", "FS1_Dire_Rat.png", "FS1_Dire_Tiger.png", "FS1_Dire_wolf.png", "FS1_Djinni.png", "FS1_Djinni_2.png", "FS1_Dog.png", "FS1_Eagle.png", "FS1_Fairy_Dragon.png", "FS1_Ferret.png", "FS1_Frog_2.png", "FS1_Hawk.png", "FS1_Lizard.png", "FS1_Mule.png", "FS1_Mule_Packed.png", "FS1_Owl.png", "FS1_Owl_Barn.png", "FS1_Owl_Snowy.png", "FS1_Panther.png", "FS1_Psuedo_Dragon_Blue.png", "FS1_Psuedo_Dragon_Green.png", "FS1_Psuedo_Dragon_Light.png", "FS1_Psuedo_Dragon_red.png", "FS1_Rat.png", "FS1_Rat_2.png", "FS1_Raven.png", "FS1_Snake.png", "FS1_Snake_Giant.png", "FS1_Spider.png", "FS1_Wolf.png"];
        var samurai = ["Ninja_Blowgun.png", "Ninja_Nunchucks.png", "Ninja_Shuriken.png", "Ninja_sword.png", "Samurai_30.png", "Samurai_31.png", "Samurai_32.png", "Samurai_33.png", "Samurai_34.png", "Samurai_35.png", "Samurai_Archer_Blue.png", "Samurai_Archer_Gold.png", "Samurai_Archer_Green.png", "Samurai_Archer_Purple.png", "Samurai_Archer_Red.png", "Samurai_Armored_Archer.png", "Samurai_Armored_Grey.png", "Samurai_Armored_Silver.png", "Samurai_Armored_Spearman.png", "Samurai_Armored_Spearman_Green.png", "Samurai_blue_kneeling.png", "Samurai_Blue_slashing.png", "Samurai_Brown_Dual_wielding.png", "Samurai_Dual_Wielding.png", "Samurai_Gold_Armored_Archer.png", "Samurai_Gold_kneeling.png", "Samurai_Green_Archer.png", "Samurai_Green_Drawing.png", "Samurai_Grey.png", "Samurai_grey_kneeling.png", "Samurai_Lady_green.png", "Samurai_Red.png", "Samurai_Red_Lady.png", "Samurai_Rifleman.png", "Samurai_Rifleman_Blue.png", "Samurai_Rifleman_Gold.png", "Samurai_Rifleman_Green.png", "Samurai_Rifleman_Purple.png", "Samurai_Rifleman_Red.png", "Samurai_Spearman_Blue.png", "Samurai_Spearman_gold.png", "Samurai_Spearman_Green.png", "Samurai_Spearman_Purple.png", "Samurai_Spearman_Red.png", "Samurai_White_Slashing.png", "Samurai_Yellow_Kneeling.png"];
        var caverns = ["Crocodile.png", "crocodile_2.png", "crocodile_5.png", "crocodile_partially_submerged.png", "Frog_giant_dead.png", "frog_giant_green.png", "Frog_giant_red.png", "lizardman_axe_shield.png", "lizardman_axe_spear.png", "lizardman_chieftan.png", "lizardman_chieftan_2.png", "lizardman_dead.png", "lizardman_green_brawler_2.png", "lizardman_green_chief.png", "lizardman_green_claws.png", "lizardman_green_dead.png", "lizardman_green_dead_2.png", "lizardman_green_dead_3.png", "lizardman_green_shaman.png", "lizardman_green_spear.png", "lizardman_green_spear_axe.png", "lizardman_green_stoneaxe_shield.png", "lizardman_grey_axe_shield.png", "lizardman_grey_brawler.png", "lizardman_grey_dead.png", "lizardman_grey_dead_2.png", "lizardman_grey_spear.png", "lizardman_grey_spear_2.png", "lizardman_grey_sword_shield.png", "lizardman_grey_wrestler.png", "lizardman_shaman.png", "lizardman_spear.png", "lizardman_swimming.png", "lizard_giant.png", "lizard_giant_grey.png", "lizard_red.png", "lizard_spotted.png", "lizard_spotted_2.png", "lizard_spotted_giant.png", "Turtle_giant.png", "YuanTi_Axe_buckler.png", "YuanTi_green_spear_shield.png", "YuanTi_Green_Sword.png", "YuanTi_priestess.png", "YuanTi_Purple_sword_buckler.png", "YuanTi_shield_spear.png", "YuanTi_sword_buckler.png"];
        var campsite = ["adventurer_elf_meditating.png", "adventurer_elf_resting.png", "adventurer_resting_dwarf.png", "adventurer_sleeping.png", "adventurer_sleeping_cloaked.png", "adventurer_sleeping_cloaked_green.png", "adventurer_sleeping_dwarf.png", "adventurer_sleeping_dwarf_2.png", "adventurer_sleeping_dwarf_priest.png", "adventurer_sleeping_elf.png", "adventurer_sleeping_female.png", "adventurer_sleeping_female_2.png", "adventurer_sleeping_female_3.png", "adventurer_sleeping_female_wizard.png", "adventurer_sleeping_fighter.png", "adventurer_sleeping_fighter_2.png", "adventurer_sleeping_halfling.png", "adventurer_sleeping_thief_halfling.png", "adventurer_sleeping_wizard.png", "beartrap.png", "beartrap_2.png", "campfire_dying.png", "campfire_lit.png", "campfire_unlit.png", "dear_dead.png", "dog_pitbull.png", "dog_pitbull_2.png", "dog_wolfhound.png", "foul_dead.png", "foul_dead_2.png", "horse_saddled.png", "horse_wild.png", "horse_wild_2.png", "horse_wild_3.png", "horse_wild_4.png", "panther_resting.png", "tent.png", "tent_2.png"];
        var undead = ["female_ghost_blue_2.png", "ghost_female_blue.png", "ghost_white_evil.png", "ghost_wolf_silver.png", "lich_blue.png", "lich_masked_mage.png", "lich_skull_evil.png", "skeleton_archer_red.png", "skeleton_archer_walking.png", "skeleton_axe.png", "skeleton_axe_shield.png", "skeleton_crawling_legless.png", "skeleton_crossbow.png", "skeleton_crossbow_armored.png", "skeleton_dagger.png", "skeleton_mace.png", "skeleton_sword_shield.png", "wight_bone.png", "wight_bone_club.png", "wight_rusty_sword.png", "wight_shovel.png", "zombie_female_green.png", "zombie_female_red.png", "zombie_male_crawling.png", "zombie_male_footdragging.png", "zombie_male_green.png", "zombie_male_yellow.png", "zombie_wolf.png"];
        var underdark = ["Dark_Dwarf_Axe_shield.png", "Dark_Dwarf_Crossbow.png", "Dark_Dwarf_doubleaxe.png", "Dark_Dwarf_doublehammer.png", "Dark_Dwarf_Hammers.png", "Dark_Dwarf_Longaxe.png", "Dark_Dwarf_Longhammer.png", "Dark_Dwarf_Morningstar.png", "Dark_Dwarf_Pick.png", "Dark_Dwarf_Shiled-Hammer.png", "Dark_Dwarf_Sword.png", "Dark_Dwarf_warhammer.png", "Dark_Elf_Acolyte.png", "Dark_Elf_Assassin.png", "Dark_Elf_Captain.png", "Dark_Elf_cleric.png", "Dark_Elf_Cleric_2.png", "Dark_Elf_Dual_wielding.png", "Dark_Elf_Duelist.png", "Dark_Elf_fighter.png", "Dark_Elf_Fighter_2.png", "Dark_Elf_Fighter_3.png", "Dark_Elf_fighter_doublesword.png", "Dark_Elf_high_priestess.png", "Dark_Elf_male_wizard.png", "Dark_Elf_Priest.png", "Dark_Elf_Priestess_Squid.png", "Dark_Elf_Thief.png", "Driders_dark_07.png", "Driders_mage_04.png", "fungus_man.png", "fungus_man_purple.png", "Hookbeast.png", "hook_beast_dark.png", "roper_darkgrey.png", "roper_grey.png", "umber_hulk_1.png", "umber_hulk_2.png"];
        var pirates = ["dog_hound.png", "female_blacksmith_hammer.png", "female_captian_sword.png", "female_cleaver.png", "female_lady_dress.png", "female_long_knife.png", "female_mage_spell.png", "female_shortsword.png", "female_sword_tattoo.png", "female_wild_mage.png", "female_young_running.png", "male_axe_fighter.png", "male_blunderbus_canon.png", "male_captain_sword.png", "male_captain_trident.png", "male_crossbow.png", "male_crossbow_large.png", "male_grappling_hook_boarder.png", "male_katana_eyepatch.png", "male_knife_urchin.png", "male_mage.png", "male_noble_diplomat.png", "male_pirate_crossbow.png", "male_pirate_swrod_shield.png", "male_purple_rapier.png", "male_rapier_figher.png", "male_red_sword.png", "male_rowers_left.png", "male_rowers_right.png", "male_rower_left.png", "male_rower_middle.png", "male_rower_oars.png", "male_rower_right.png", "male_sunburnt_brawler.png", "male_sword.png", "male_swordsman_scimitar.png", "male_sword_dagger.png", "male_sword_hook.png", "male_sword_stalker.png", "male_viking_axe.png", "male_viking_axe_shiled.png"];
        var DMEssentials2 = ["bullman_poleaxe.png", "chimera.png", "gryphon.png", "harpy_1.png", "harpy_brown_flying.png", "harpy_purple.png", "harpy_purple_flying.png", "hippogriff.png", "hydra2_1head.png", "hydra2_2headed.png", "hydra2_8head.png", "hydra_1head.png", "hydra_2head.png", "hydra_5head.png", "hydra_8head.png", "jhydra2_5head.png", "lion.png", "lion_winged.png", "manticore_flying.png", "manticore_ground.png", "medusa_red.png", "medusa_tan.png", "minotaur_axe.png", "minotaur_axe_2.png", "minotaur_axe_3.png", "satyr_axe.png", "satyr_staff.png", "satyr_staff_2.png", "satyr_whip.png", "wyvern_2headed.png", "wyvern_blue.png", "wyvern_blue_flying.png", "wyvern_blue_ground.png", "wyvern_green.png", "wyvern_green_flying.png", "wyvern_green_sitting.png", "wyvern_purple.png", "wyvern_tan_flying.png"];
        var dwarves = ["dwarf_female_axe_shield.png", "dwarf_female_axe_shield_2.png", "dwarf_female_fighter_axe.png", "dwarf_female_hammer_shield.png", "dwarf_female_pick_plate.png", "dwarf_female_spear.png", "dwarf_male_axe_shield_2.png", "dwarf_male_axe_shield_gold.png", "dwarf_male_axe_shield_green.png", "dwarf_male_axe_shield_silver.png", "dwarf_male_blunderbus_canon.png", "dwarf_male_brawler.png", "dwarf_male_cleric_yellow.png", "dwarf_male_copper_hammer.png", "dwarf_male_crossbow_2.png", "dwarf_male_crossbow_red.png", "dwarf_male_crosswbow_green_3.png", "dwarf_male_doubleaxe.png", "dwarf_male_doubleaxe_shield.png", "dwarf_male_doubleaxe_shield_mail.png", "dwarf_male_fighter_mace.png", "dwarf_male_fighter_mage.png", "dwarf_male_fighter_scythe.png", "dwarf_male_flag_standard.png", "dwarf_male_hammer_shield.png", "dwarf_male_hammer_shield_green.png", "dwarf_male_handaxes_red.png", "dwarf_male_mace_hammer_red.png", "dwarf_male_monk.png", "dwarf_male_pale_axe.png", "dwarf_male_pick_shield.png", "dwarf_male_plate_flail_shield.png", "dwarf_male_plate_hammer_shield.png", "dwarf_male_poleaxe.png", "dwarf_male_priest_longhammer.png", "dwarf_male_red_priest.png", "dwarf_male_shield_axe.png", "dwarf_male_spear.png", "dwarf_male_spear_blue.png", "dwarf_male_spear_green.png", "dwarf_male_swords.png", "dwarf_male_thief_dagger.png", "dwarf_male_thief_flail.png", "dwarf_male_thief_longaxe.png", "dwarf_male_veteran_spear_shield.png", "dwarf_male_warhammer.png", "dwarf_male_wizard.png", "dwarf_male_wizard_staff.png"];
        var playerCharacters2 = ["Cat_Warrior_Sword-Sword.png", "Dwarf_Barbarian_Axe.png", "Dwarf_Cleric_Morningstar.png", "Dwarf_Monk_Fist.png", "Dwarf_warrior_Axe_Plate.png", "Dwarf_Warrior_Crossbow_Leather.png", "Dwarf_Warrior_Mace.png", "Elf_Druid_Sickle.png", "Elf_Druid_Sickle_Leather.png", "Elf_Monk_Fist-2.png", "Elf_Monk_Fist.png", "Elf_Rogue_Bow.png", "Elf_Rogue_Crossbow-Spell.png", "Elf_Rogue_Crossbow.png", "Elf_Rogue_Sword-Crossbow.png", "Elf_Rogue_two-swords.png", "Elf_Warrior-Archer_Bow.png", "Elf_Warrior-Archer_Bow_Leather-2.png", "Elf_Warrior-Archer_Bow_Leather-3.png", "Elf_Warrior-Archer_Bow_Leather-4.png", "Elf_Warrior-Archer_Bow_Leather-5.png", "Elf_Warrior-Archer_Bow_Leather.png", "Elf_Warrior_Sword-Shield.png", "Elf_Warrior_Sword.png", "Gnome_Warrior_Sword-Shield.png", "Half-elf_Wizard_Staff.png", "Half-Orc_Warrior_Hammer-Mace.png", "Half-Orc_Warrior_PoleArm-Shield.png", "Half-Orc_Warrior_PoleArm.png", "Half-Orc_Warrior_Sword.png", "Halfling_Rogue_Daggers.png", "Human_Barbarian_Claws.png", "Human_Barbarian_Sword-Shield.png", "Human_Cleric_Flail-Shield_Plate.png", "Human_Cleric_HolySymbol-Shield_Plate.png", "Human_Cleric_Mace-Shield_Plate.png", "Human_Mage.png", "Human_Mage_Masked.png", "Human_Mage_Staff-2.png", "Human_Mage_Staff-3.png", "Human_Mage_Staff-4.png", "Human_Mage_Staff-5.png", "Human_Mage_Staff-6.png", "Human_Mage_Staff.png", "Human_Mage_Staff_Masked.png", "Human_Rogue_Crossbow.png", "Human_Rogue_Rapier-Crossbow.png", "Human_Rogue_Rapier-Dagger.png", "Human_Warrior_Polearm.png", "Human_Warrior_Spear_Masked.png", "Human_Warrior_Staff_Masked.png", "Human_Warrior_Sword-Shield-2.png", "Human_Warrior_Sword-Shield.png", "Human_Warrior_Sword-Shield_Plate-2.png", "Human_Warrior_Sword-Shield_Plate-3.png", "Human_Warrior_Sword-Shield_Plate.png", "Human_Warrior_Sword_Masked.png", "Human_Warrior_Sword_Plate.png", "Human_Witch_Book.png", "Thief_Rogue_Daggers.png", "Thief_Rogue_Sword.png"];
        var hairyOrcsAndGoblins = ["Goblin_Shaman_Rod_Fur.png", "Goblin_Shaman_Staff-Shield_Fur.png", "Goblin_Warrior_Axe-Shield_Fur-2.png", "Goblin_Warrior_Axe-Shield_Fur.png", "Goblin_Warrior_Axe_Fur-2.png", "Goblin_Warrior_Axe_Fur-3.png", "Goblin_Warrior_Axe_Fur-4.png", "Goblin_Warrior_Axe_Fur.png", "Goblin_Warrior_Bow_Fur-3.png", "Goblin_Warrior_Bow_Fur-4.png", "Goblin_Warrior_Bow_Fur.png", "Goblin_Warrior_Club_Fur-3.png", "Goblin_Warrior_Club_Fur.png", "Goblin_Warrior_Mace-Shield_Fur.png", "Goblin_Warrior_Mace_Fur.png", "Goblin_Warrior_Spear-Shield_Fur-2.png", "Goblin_Warrior_Spear-Shield_Fur-3.png", "Goblin_Warrior_Spear-Shield_Fur-4.png", "Goblin_Warrior_Spear-Shield_Fur.png", "Goblin_Warrior_Staff_Fur-3.png", "Goblin_Warrior_Staff_Fur.png", "Goblin_Warrior_Sword-Shield_Fur.png", "Goblin_Warrior_Sword_Fur.png", "Orc_Assassin_Dagger-2.png", "Orc_Assassin_Dagger.png", "Orc_Mutant_Tenticles.png", "Orc_Shamen.png", "Orc_Shamen_Staff-2.png", "Orc_Shamen_Staff.png", "Orc_Warrior_Axe-2.png", "Orc_Warrior_Axe-Shield.png", "Orc_Warrior_Axe-Shield_Helmet.png", "Orc_Warrior_Axe.png", "Orc_Warrior_Axe_Helmet.png", "Orc_Warrior_Bow-2.png", "Orc_Warrior_Bow-Flaming.png", "Orc_Warrior_Bow.png", "Orc_Warrior_Bow_Helmet-2.png", "Orc_Warrior_Bow_Helmet.png", "Orc_Warrior_Crossbow.png", "Orc_Warrior_Crossbow_Helmet.png", "Orc_Warrior_Hammer-3.png", "Orc_Warrior_Hammer-4.png", "Orc_Warrior_Hammer.png", "Orc_Warrior_Hammer_Helmet.png", "Orc_Warrior_Pick-Hammer-2.png", "Orc_Warrior_Pick-Hammer.png", "Orc_Warrior_Spear-Shield.png", "Orc_Warrior_Spear-Shield_Helmet-2.png", "Orc_Warrior_Sword-Shield.png", "Orc_Warrior_Sword-Shield_Helmet-2.png", "Orc_Warrior_Sword-Shield_Helmet.png"];
        var guardsAndNobles = ["Human_Alchemist_Flasks_Green.png", "Human_Alchemist_Flasks_Red.png", "Human_Guard-Commander.png", "Human_Guard-Commander_Helmet.png", "Human_Guard-Commander_Purple.png", "Human_Guard-commander_Spear_Purple.png", "Human_Guard-Commander_Sword.png", "Human_Guard-Commander_Sword_Helmet.png", "Human_Guard_Axe-2.png", "Human_Guard_Axe-3.png", "Human_Guard_Axe.png", "Human_Guard_Axe_Helmet-2.png", "Human_Guard_Axe_Helmet-3.png", "Human_Guard_Axe_Helmet.png", "Human_Guard_Axe_Purple-2.png", "Human_Guard_Axe_Purple-3.png", "Human_Guard_Axe_Purple.png", "Human_Guard_Bow.png", "Human_Guard_Bow_Helmet.png", "Human_Guard_Bow_Purple.png", "Human_Guard_Crossbow-2.png", "Human_Guard_Crossbow.png", "Human_Guard_Crossbow_Helmet-2.png", "Human_Guard_Crossbow_Helmet.png", "Human_Guard_Crossbow_Purple-2.png", "Human_Guard_Crossbow_Purple.png", "Human_Guard_Shield.png", "Human_Guard_Shield_Helmet.png", "Human_Guard_Spear-Shield.png", "Human_Guard_Spear-Shield_Helmet.png", "Human_Guard_Spear-Shield_Purple.png", "Human_Guard_Spear_Purple.png", "Human_Guard_Sword-Shield-2.png", "Human_Guard_Sword-Shield.png", "Human_Guard_Sword-Shield_Helmet-2.png", "Human_Guard_Sword-Shield_Helmet.png", "Human_Guard_Sword-Shield_Purple-2.png", "Human_Guard_Sword-Shield_Purple.png", "Human_Guard_Sword.png", "Human_Guard_Sword_Helmet.png", "Human_Guard_Sword_Purple.png", "Human_Jester.png", "Human_Lady_Blue.png", "Human_Lady_Purple.png", "Human_Lady_Sitting_Pink.png", "Human_Lady_Sitting_Purple.png", "Human_Lord-Rogue_Sword.png", "Human_Lord_Purple.png", "Human_Lord_Red.png", "Human_Lord_Rod_Purple.png", "Human_Nomad_Bow-2.png", "Human_Nomad_Bow.png", "Human_Nomad_Scimitar-Shield-2.png", "Human_Nomad_Scimitar-Shield.png", "Human_Nomad_Scimitar.png", "Human_Nomad_Scimitars.png", "Human_Nomad_Spear-Shield.png", "Human_Nomad_Spear.png", "Human_Witch_Black.png", "Human_Witch_Blue.png", "Human_Witch_Green.png", "Human_Witch_Staff_Red.png"];
        
        var foldersArray = [playerCharacters, playerCharacters2, goblinsKobolds, dwarves, guardsAndNobles, DMEssentials1, DMEssentials2, underdark, orcsTrolls, wereCreatures, familiars, samurai, caverns, campsite, undead, pirates, hairyOrcsAndGoblins];
        var folderNames = ["TP1Characters", "TP16Characters2",  "TP2GoblinsKobolds", "TP15Dwarves", "TP18GuardsandNobles", "TP5DMEssentials1", "TP14DMEssentials2", "TP12DarkDwellers", "TP3OrcsandTrolls", "TP4Werecreatures", "TP6Familiars", "TP7Samurai", "TP8WetCaverns", "TP9TheCamp", "TP11BasicUndead", "TP13Pirates", "TP17HairyOrcsGoblins"];
        
        var looper;
        
        var chosenFolder = document.getElementById("tabChoices").value;

        for (looper = 0; looper < foldersArray[chosenFolder].length; looper++) {

            var img = document.createElement("IMG");
            
            img.setAttribute("src", "dndPicsPng2/" + folderNames[chosenFolder] + "/" + foldersArray[chosenFolder][looper]);
            img.setAttribute("width", "100");
            img.setAttribute("height", "100");
            img.setAttribute("draggable", false);

            img.setAttribute("id", "dndPicsPng2/" + folderNames[chosenFolder] + "/" + foldersArray[chosenFolder][looper]);
            
//            img.onclick = function() {
//                
//                    imageToSet = this.id;
//                                      
//                    if (placeImageSwitch === 1) { document.getElementById("preview").setAttribute("src", document.getElementById(this.id).id);
//                                                  document.getElementById("preview").style.width = "100px";
//                                                  document.getElementById("preview").style.height = "100px"; }
//            };
                                      
            img.onmousedown = function() {
                
                    imageToSet = this.id;
                    placeImageSwitch = 1;
                
            };

            document.getElementById("minisGoHere").appendChild(img); }
        

    
}
function showIcons2() {
        
        document.getElementById("minisGoHere").innerHTML = "";
        
        var playerCharacters = ["https://image.ibb.co/hZJYTn/Whipper_50.png", "https://image.ibb.co/fV5rES/Villager_Female_04.png", "https://image.ibb.co/dnChM7/Thief_Daggers_21.png", "https://image.ibb.co/fhArES/Magicuser_Green_08.png", "https://image.ibb.co/eZgbg7/Magicuser_44.png", "https://image.ibb.co/eQBL8n/Magicuser_43.png", "https://image.ibb.co/gpJduS/Magicuser_38.png", "https://image.ibb.co/jPZJuS/Magicuser_37.png", "https://image.ibb.co/cKejZS/Magicuser_27.png", "https://image.ibb.co/cJsSon/Magicuser_19.png", "https://image.ibb.co/b8eU17/Magicuser_17.png", "https://image.ibb.co/nJ6L8n/Magicuser_16.png", "https://image.ibb.co/i3hGg7/Magicuser_01.png", "https://image.ibb.co/fgKwg7/Knight_49.png", "https://image.ibb.co/mrvrES/Halfling_fighter_41.png", "https://image.ibb.co/kw8p17/Halfling_05.png", "https://image.ibb.co/h6bL8n/Fighter_Sword_Buckler_31.png", "https://image.ibb.co/f96bg7/Fighter_Sword_25.png", "https://image.ibb.co/iDVPZS/Fighter_Spear_Purple_29.png", "https://image.ibb.co/k1mbg7/Fighter_Silver_10.png", "https://image.ibb.co/gGDNM7/Fighter_Metal_18.png", "https://image.ibb.co/g8eU17/Fighter_Mace_24.png", "https://image.ibb.co/e3Rnon/Fighter_Green_15.png", "https://image.ibb.co/enDYTn/Fighter_Gold_11.png", "https://image.ibb.co/mUQ2M7/Fighter_Female_Dagger_34.png", "https://image.ibb.co/cqwWES/Fighter_Female_35.png", "https://image.ibb.co/eOUU17/Fighter_Blue_Sword_26.png", "https://image.ibb.co/dahhM7/Fighter_Blue_Spear_30.png", "https://image.ibb.co/bHmnon/Fighter_Blue_Female_06.png", "https://image.ibb.co/b0YYTn/Fighter_blue_07.png", "https://image.ibb.co/bs4JuS/Fighter_45.png", "https://image.ibb.co/d2PjZS/Fighter_39.png", "https://image.ibb.co/ewdBES/Fighter_36.png", "https://image.ibb.co/c5Jp17/Elven_Green_Archer_02.png", "https://image.ibb.co/ibKwg7/Elven_Blue_fighter_09.png", "https://image.ibb.co/jOZ7on/Dwarven_fighter_hammer_03.png", "https://image.ibb.co/hCcSon/Cleric_Red_47.png", "https://image.ibb.co/eM6yuS/Cleric_Blue_48.png", "https://image.ibb.co/bOrWES/Archer_40.png", "https://image.ibb.co/krG917/Adventurer_Dead_32.png", "https://image.ibb.co/fDiBES/Adventurer_Dead_22.png", "https://image.ibb.co/ndk2M7/Adventurer_Dead_28.png"];
        var goblinsKobolds = ["https://image.ibb.co/bLyQ8n/worg_22.png", "https://image.ibb.co/gS4Mg7/kobold_spearman2.png", "https://image.ibb.co/iEKXon/kobold_spearman.png", "https://image.ibb.co/nDk58n/kobold_shaman3.png", "https://image.ibb.co/ixM1g7/kobold_shaman2.png", "https://image.ibb.co/bWmZ17/kobold_shaman1.png", "https://image.ibb.co/dYO3uS/kobold_fighter5.png", "https://image.ibb.co/nmROuS/kobold_fighter4.png", "https://image.ibb.co/jSnk8n/kobold_fighter3.png", "https://image.ibb.co/hNY3uS/kobold_fighter2.png", "https://image.ibb.co/jHku17/kobold_fighter.png", "https://image.ibb.co/h5oE17/kobold_dead_12.png", "https://image.ibb.co/cvOQ8n/kobold_dead_06.png", "https://image.ibb.co/ipn7M7/kobold_archer2.png", "https://image.ibb.co/ccZyTn/kobold_archer.png", "https://image.ibb.co/duxJTn/goblin_swordsman.png", "https://image.ibb.co/kh83uS/goblin_spearman.png", "https://image.ibb.co/hVBOuS/goblin_shaman4.png", "https://image.ibb.co/eGW1g7/goblin_shaman3.png", "https://image.ibb.co/bAZbES/goblin_shaman2.png", "https://image.ibb.co/kJdgg7/goblin_shaman.png", "https://image.ibb.co/gY5SM7/goblin_mace.png", "https://image.ibb.co/f7RZ17/goblin_fighter.png", "https://image.ibb.co/c9C7M7/goblin_dead_34.png", "https://image.ibb.co/eKWZ17/goblin_dead_33.png", "https://image.ibb.co/j4Fu17/goblin_daggers.png", "https://image.ibb.co/crbOuS/goblin_crossbow4.png", "https://image.ibb.co/mS0iuS/goblin_crossbow3.png", "https://image.ibb.co/j7L58n/goblin_crossbow2.png", "https://image.ibb.co/cQLiuS/goblin_crossbow.png", "https://image.ibb.co/ivVu17/goblin_axeman.png", "https://image.ibb.co/cNAu17/goblin_archer2.png", "https://image.ibb.co/fKsk8n/goblin_archer.png", "https://image.ibb.co/dFd3uS/worg_rider_39.png", "https://image.ibb.co/nyYE17/worg_rider_37.png", "https://image.ibb.co/eFp9ZS/worg_rider_35.png", "https://image.ibb.co/cBaSM7/worg_dead_31.png", "https://image.ibb.co/gXAu17/worg_40.png", "https://image.ibb.co/kjJgg7/worg_36.png", "https://image.ibb.co/de4nM7/worg_38.png"];
        var orcsTrolls = ["https://image.ibb.co/gfntTn/Orc_shaman.png", "https://image.ibb.co/eDaPZS/Orc_fighter7.png", "https://image.ibb.co/iBwL8n/Orc_fighter6.png", "https://image.ibb.co/mNJp17/Orc_fighter5.png", "https://image.ibb.co/kSjU17/Orc_fighter4.png", "https://image.ibb.co/gSmL8n/Orc_fighter3.png", "https://image.ibb.co/iNjU17/Orc_fighter2.png", "https://image.ibb.co/nCS4ZS/Orc_fighter.png", "https://image.ibb.co/hJTBES/Orc_crossbowman.png", "https://image.ibb.co/fEEU17/Orc_chieftan2.png", "https://image.ibb.co/j46917/Orc_chieftan.png", "https://image.ibb.co/idSGg7/Orc_archer.png", "https://image.ibb.co/jvrbg7/Ogre_shaman2.png", "https://image.ibb.co/g4K7on/Ogre_shaman.png", "https://image.ibb.co/cC4wg7/Ogre_fighter3.png", "https://image.ibb.co/eEzjZS/Ogre_fighter2.png", "https://image.ibb.co/hZpU17/Ogre_fighter.png", "https://image.ibb.co/duRbg7/Ogre_dead_29.png", "https://image.ibb.co/kMB917/Ogre_berserker.png", "https://image.ibb.co/ju0f8n/Hill_Troll_fighter6.png", "https://image.ibb.co/g3htTn/Hill_troll_fighter4.png", "https://image.ibb.co/cmWWES/Hill_Troll_dead_28.png", "https://image.ibb.co/exwbg7/Cave_Troll_fighter5.png", "https://image.ibb.co/dvBOuS/Troll_fighter4.png", "https://image.ibb.co/nuXUZS/Troll_fighter3.png", "https://image.ibb.co/hk8gg7/Troll_fighter2.png", "https://image.ibb.co/dFF58n/Troll_fighter1.png", "https://image.ibb.co/c527M7/Troll_dead_27.png", "https://image.ibb.co/fQtson/Troll_fighter.png"];
        var wereCreatures = ["https://image.ibb.co/hgNouS/wererat_fighter_08.png", "https://image.ibb.co/nL6sM7/wererat_06.png", "https://image.ibb.co/d4mEZS/wererat_05.png", "https://image.ibb.co/dZsouS/wererat_03.png", "https://image.ibb.co/mcPq8n/wereboar_fighter_09.png", "https://image.ibb.co/d1OiTn/wereboar_15.png", "https://image.ibb.co/jZ7XM7/werebear_25.png", "https://image.ibb.co/bKkK17/werebear_21.png", "https://image.ibb.co/b9Vmg7/werebear_20.png", "https://image.ibb.co/mHfrES/victim_male_35.png", "https://image.ibb.co/gbctTn/victim_male_31.png", "https://image.ibb.co/cr5f8n/victim_male_30.png", "https://image.ibb.co/miip17/victim_male_29.png", "https://image.ibb.co/gwStTn/victim_female_34.png", "https://image.ibb.co/e0w917/victim_female_33.png", "https://image.ibb.co/jsNSon/tiger_dark_28.png", "https://image.ibb.co/eyOYTn/tiger_27.png", "https://image.ibb.co/m20DTn/servant.png", "https://image.ibb.co/bNS4ZS/rat_swarm.png", "https://image.ibb.co/khS4ZS/rat_11.png", "https://image.ibb.co/hVVPZS/rat_07.png", "https://image.ibb.co/eHq2M7/boar_17.png", "https://image.ibb.co/kJxhM7/boar_16.png", "https://image.ibb.co/fXgnon/boar_10.png", "https://image.ibb.co/fWuU17/boar_04.png", "https://image.ibb.co/igJYTn/bear_24.png", "https://image.ibb.co/i4bWES/bear_22.png", "https://image.ibb.co/b6ADTn/wolf_19.png", "https://image.ibb.co/enR917/wolf_18.png", "https://image.ibb.co/eQFf8n/werewolf_fighter_14.png", "https://image.ibb.co/gpaf8n/werewolf_13.png", "https://image.ibb.co/iiYp17/werewolf_12.png", "https://image.ibb.co/nLYBES/weretiger_23.png", "https://image.ibb.co/eEfDTn/weretiger_26.png"];
        var DMEssentials1 = ["https://image.ibb.co/cvxcon/DME_Purple_Worm.png", "https://image.ibb.co/eD4e17/DME_Pink_Slime.png", "https://image.ibb.co/nQG3Tn/DME_Owlbear_2.png", "https://image.ibb.co/enWEZS/DME_Owlbear.png", "https://image.ibb.co/dbXz17/DME_Grick_2.png", "https://image.ibb.co/feD6g7/DME_Grick.png", "https://image.ibb.co/k2WEZS/DME_Grey_Ooze_2.png", "https://image.ibb.co/kQuq8n/DME_Grey_Ooze.png", "https://image.ibb.co/hKwRg7/DME_Green_Slime_2.png", "https://image.ibb.co/kVDHon/DME_Green_Slime.png", "https://image.ibb.co/mVPOTn/DME_Gelatinous_Cube_2.png", "https://image.ibb.co/crwsM7/DME_Gelatinous_Cube.png", "https://image.ibb.co/cysXM7/DME_Gargoyle_2.png", "https://image.ibb.co/jumEZS/DME_Gargoyle.png", "https://image.ibb.co/kJsXM7/DME_Cockatrice_2.png", "https://image.ibb.co/ho0xon/DME_Cockatrice.png", "https://image.ibb.co/ksQmg7/DME_Carrion_Crawler_2.png", "https://image.ibb.co/deTuZS/DME_Blue_Slime.png", "https://image.ibb.co/bUFxon/DME_Behir.png", "https://image.ibb.co/k5gsM7/DME_Basilisk_2.png", "https://image.ibb.co/cDEq8n/DME_Basilisk.png", "https://image.ibb.co/hgze17/DME_Ankheg_Breaching.png", "https://image.ibb.co/dg0V8n/DME_Ankheg.png", "https://image.ibb.co/dRXz17/DME_Undead_Carrion_Crawler.png", "https://image.ibb.co/inFV8n/DME_Spider_Giant_4.png", "https://image.ibb.co/dtHcon/DME_Spider_Giant_3.png", "https://image.ibb.co/bTdiTn/DME_Spider_Giant_2.png", "https://image.ibb.co/cq0K17/DME_Spider_Giant.png", "https://image.ibb.co/e0POTn/DME_Shambling_Mound_2.png", "https://image.ibb.co/kY9CM7/DME_Shambling_Mound.png", "https://image.ibb.co/b7i6g7/DME_Purple_Worm_2.png", "https://image.ibb.co/n2pe17/DME_Rust_Monster.png"];
        var familiars = ["https://image.ibb.co/eo47on/FS1_Panther.png", "https://image.ibb.co/jwwL8n/FS1_Owl_Snowy.png", "https://image.ibb.co/e2xSon/FS1_Owl_Barn.png", "https://image.ibb.co/nOjjZS/FS1_Owl.png", "https://image.ibb.co/cTpJuS/FS1_Mule_Packed.png", "https://image.ibb.co/h5qf8n/FS1_Mule.png", "https://image.ibb.co/fWTp17/FS1_Lizard.png", "https://image.ibb.co/hJxhM7/FS1_Hawk.png", "https://image.ibb.co/nRjJuS/FS1_Frog_2.png", "https://image.ibb.co/d2hhM7/FS1_Ferret.png", "https://image.ibb.co/k5JNM7/FS1_Fairy_Dragon.png", "https://image.ibb.co/nkrbg7/FS1_Eagle.png", "https://image.ibb.co/ePFPZS/FS1_Dog.png", "https://image.ibb.co/iVPwg7/FS1_Djinni_2.png", "https://image.ibb.co/kAw917/FS1_Djinni.png", "https://image.ibb.co/gQPwg7/FS1_Dire_wolf.png", "https://image.ibb.co/c9DYTn/FS1_Dire_Tiger.png", "https://image.ibb.co/kqZ7on/FS1_Dire_Rat.png", "https://image.ibb.co/d8ZjZS/FS1_Dire_Boar.png", "https://image.ibb.co/n8vrES/FS1_Dire_Bear.png", "https://image.ibb.co/nbHhM7/FS1_Dire_Badger.png", "https://image.ibb.co/jd2Gg7/FS1_Cat_Yellow.png", "https://image.ibb.co/kQHSon/FS1_Cat_Black.png", "https://image.ibb.co/hgkDTn/FS1_Cat_2.png", "https://image.ibb.co/dKNtTn/FS1_Cat.png", "https://image.ibb.co/c1RyuS/FS1_Bear_Brown.png", "https://image.ibb.co/if5PZS/FS1_Bat_Giant.png", "https://image.ibb.co/ndWyuS/FS1_Badger_Celestial.png", "https://image.ibb.co/gioNM7/FS1_Badger.png", "https://image.ibb.co/cyG917/FS1_Wolf.png", "https://image.ibb.co/j2tp17/FS1_Spider.png", "https://image.ibb.co/fmhSon/FS1_Snake_Giant.png", "https://image.ibb.co/b1ADTn/FS1_Snake.png", "https://image.ibb.co/kk5PZS/FS1_Raven.png", "https://image.ibb.co/hnryuS/FS1_Rat_2.png", "https://image.ibb.co/cGwL8n/FS1_Rat.png", "https://image.ibb.co/mFHSon/FS1_Psuedo_Dragon_red.png", "https://image.ibb.co/imB917/FS1_Psuedo_Dragon_Light.png", "https://image.ibb.co/myKwg7/FS1_Psuedo_Dragon_Blue.png", "https://image.ibb.co/db02M7/FS1_Psuedo_Dragon_Green.png"];
        var samurai = ["https://image.ibb.co/fSSXM7/Samurai_Rifleman_Gold.png", "https://image.ibb.co/hV9e17/Samurai_Rifleman_Blue.png", "https://image.ibb.co/nFsz17/Samurai_Rifleman.png", "https://image.ibb.co/d6FK17/Samurai_Red_Lady.png", "https://image.ibb.co/eOee17/Samurai_Red.png", "https://image.ibb.co/bPPCM7/Samurai_Lady_green.png", "https://image.ibb.co/dQT6g7/Samurai_grey_kneeling.png", "https://image.ibb.co/iRcMES/Samurai_Grey.png", "https://image.ibb.co/cbu1ES/Samurai_Green_Drawing.png", "https://image.ibb.co/jRoTuS/Samurai_Green_Archer.png", "https://image.ibb.co/nbCXM7/Samurai_Gold_kneeling.png", "https://image.ibb.co/cgJ6g7/Samurai_Gold_Armored_Archer.png", "https://image.ibb.co/ebGEZS/Samurai_Dual_Wielding.png", "https://image.ibb.co/kua8uS/Samurai_Brown_Dual_wielding.png", "https://image.ibb.co/fiP1ES/Samurai_Blue_slashing.png", "https://image.ibb.co/jhkxon/Samurai_blue_kneeling.png", "https://image.ibb.co/eviiTn/Samurai_Armored_Spearman_Green.png", "https://image.ibb.co/mqq8uS/Samurai_Armored_Spearman.png", "https://image.ibb.co/isbgES/Samurai_Armored_Silver.png", "https://image.ibb.co/fOSouS/Samurai_Armored_Grey.png", "https://image.ibb.co/dJSouS/Samurai_Armored_Archer.png", "https://image.ibb.co/fgwsM7/Samurai_Archer_Red.png", "https://image.ibb.co/mqXouS/Samurai_Archer_Purple.png", "https://image.ibb.co/eFhouS/Samurai_Archer_Green.png", "https://image.ibb.co/bXtHon/Samurai_Archer_Gold.png", "https://image.ibb.co/jUWgES/Samurai_Archer_Blue.png", "https://image.ibb.co/hAr3Tn/Samurai_35.png", "https://image.ibb.co/f6JYTn/Samurai_34.png", "https://image.ibb.co/cGn4ZS/Samurai_33.png", "https://image.ibb.co/ee74ZS/Samurai_32.png", "https://image.ibb.co/i8PU17/Samurai_31.png", "https://image.ibb.co/kB6bg7/Samurai_30.png", "https://image.ibb.co/mpu7on/Ninja_sword.png", "https://image.ibb.co/dqj7on/Ninja_Shuriken.png", "https://image.ibb.co/ngNGg7/Ninja_Nunchucks.png", "https://image.ibb.co/hRyBES/Ninja_Blowgun.png", "https://image.ibb.co/eLw917/Samurai_Yellow_Kneeling.png", "https://image.ibb.co/bEzjZS/Samurai_White_Slashing.png", "https://image.ibb.co/c7DBES/Samurai_Spearman_Red.png", "https://image.ibb.co/iufDTn/Samurai_Spearman_Purple.png", "https://image.ibb.co/cyyduS/Samurai_Spearman_Green.png", "https://image.ibb.co/dN4wg7/Samurai_Spearman_gold.png", "https://image.ibb.co/jXfrES/Samurai_Spearman_Blue.png", "https://image.ibb.co/f1qrES/Samurai_Rifleman_Red.png", "https://image.ibb.co/g2nGg7/Samurai_Rifleman_Green.png", "https://image.ibb.co/meoduS/Samurai_Rifleman_Purple.png"];
        var caverns = ["https://image.ibb.co/hWrnon/lizardman_shaman.png", "https://image.ibb.co/idnSon/lizardman_grey_wrestler.png", "https://image.ibb.co/eXq2M7/lizardman_grey_sword_shield.png", "https://image.ibb.co/bAfPZS/lizardman_grey_spear_2.png", "https://image.ibb.co/d5dYTn/lizardman_grey_spear.png", "https://image.ibb.co/hfvDTn/lizardman_grey_dead_2.png", "https://image.ibb.co/mXMWES/lizardman_grey_dead.png", "https://image.ibb.co/farbg7/lizardman_grey_brawler.png", "https://image.ibb.co/mjRWES/lizardman_grey_axe_shield.png", "https://image.ibb.co/hFLDTn/lizardman_green_stoneaxe_shield.png", "https://image.ibb.co/jAJNM7/lizardman_green_spear_axe.png", "https://image.ibb.co/hEoduS/lizardman_green_spear.png", "https://image.ibb.co/cZTNM7/lizardman_green_shaman.png", "https://image.ibb.co/mAuJuS/lizardman_green_dead_3.png", "https://image.ibb.co/eS308n/lizardman_green_dead_2.png", "https://image.ibb.co/gif2M7/lizardman_green_dead.png", "https://image.ibb.co/ikM917/lizardman_green_claws.png", "https://image.ibb.co/k3TBES/lizardman_green_chief.png", "https://image.ibb.co/fHCGg7/lizardman_green_brawler_2.png", "https://image.ibb.co/jkmyuS/lizardman_dead.png", "https://image.ibb.co/iqzwg7/lizardman_chieftan_2.png", "https://image.ibb.co/gmkDTn/lizardman_chieftan.png", "https://image.ibb.co/jM2tTn/lizardman_axe_spear.png", "https://image.ibb.co/gGmgES/lizardman_axe_shield.png", "https://image.ibb.co/cbRRg7/lizard_spotted_giant.png", "https://image.ibb.co/hOtTuS/lizard_spotted_2.png", "https://image.ibb.co/nFLmg7/lizard_spotted.png", "https://image.ibb.co/iO4ZZS/lizard_red.png", "https://image.ibb.co/gRZq8n/lizard_giant_grey.png", "https://image.ibb.co/hpwRg7/lizard_giant.png", "https://image.ibb.co/fkiiTn/Frog_giant_red.png", "https://image.ibb.co/bzKZZS/frog_giant_green.png", "https://image.ibb.co/bNhA8n/Frog_giant_dead.png", "https://image.ibb.co/cUqxon/crocodile_partially_submerged.png", "https://image.ibb.co/c5vmg7/crocodile_5.png", "https://image.ibb.co/eO2ouS/crocodile_2.png", "https://image.ibb.co/mwncon/Crocodile.png", "https://image.ibb.co/mnHMES/Yuan_Ti_sword_buckler.png", "https://image.ibb.co/gtJTuS/Yuan_Ti_shield_spear.png", "https://image.ibb.co/mcBsM7/Yuan_Ti_Purple_sword_buckler.png", "https://image.ibb.co/cUXcon/Yuan_Ti_priestess.png", "https://image.ibb.co/fJVV8n/Yuan_Ti_Green_Sword.png", "https://image.ibb.co/iccXM7/Yuan_Ti_green_spear_shield.png", "https://image.ibb.co/hCw3Tn/Yuan_Ti_Axe_buckler.png", "https://image.ibb.co/kkU1ES/Turtle_giant.png", "https://image.ibb.co/e4MRg7/lizardman_spear.png", "https://image.ibb.co/j3y6g7/lizardman_swimming.png"];
        var campsite = ["https://image.ibb.co/gXyNM7/dog_wolfhound.png", "https://image.ibb.co/n3vrES/dog_pitbull_2.png", "https://image.ibb.co/kE74ZS/dog_pitbull.png", "https://image.ibb.co/mswbg7/dear_dead.png", "https://image.ibb.co/eui08n/campfire_unlit.png", "https://image.ibb.co/cxCGg7/campfire_lit.png", "https://image.ibb.co/dyAf8n/campfire_dying.png", "https://image.ibb.co/fsMWES/beartrap_2.png", "https://image.ibb.co/dfQrES/beartrap.png", "https://image.ibb.co/deZwg7/adventurer_sleeping_wizard.png", "https://image.ibb.co/fL3YTn/adventurer_sleeping_thief_halfling.png", "https://image.ibb.co/khd08n/adventurer_sleeping_halfling.png", "https://image.ibb.co/iPh4ZS/adventurer_sleeping_fighter_2.png", "https://image.ibb.co/mRZJuS/adventurer_sleeping_fighter.png", "https://image.ibb.co/nLpjZS/adventurer_sleeping_female_wizard.png", "https://image.ibb.co/dfLDTn/adventurer_sleeping_female_3.png", "https://image.ibb.co/c08BES/adventurer_sleeping_female_2.png", "https://image.ibb.co/mbLPZS/adventurer_sleeping_female.png", "https://image.ibb.co/gq4U17/adventurer_sleeping_elf.png", "https://image.ibb.co/chONM7/adventurer_sleeping_dwarf_priest.png", "https://image.ibb.co/iVZ7on/adventurer_sleeping_dwarf_2.png", "https://image.ibb.co/fG7Son/adventurer_sleeping_dwarf.png", "https://image.ibb.co/eMLPZS/adventurer_sleeping_cloaked_green.png", "https://image.ibb.co/cmFrES/adventurer_sleeping_cloaked.png", "https://image.ibb.co/h2kPZS/adventurer_sleeping.png", "https://image.ibb.co/kEtBES/adventurer_resting_dwarf.png", "https://image.ibb.co/iAeU17/adventurer_elf_resting.png", "https://image.ibb.co/hFsSon/adventurer_elf_meditating.png", "https://image.ibb.co/itgyuS/tent_2.png", "https://image.ibb.co/f29U17/tent.png", "https://image.ibb.co/f8LrES/panther_resting.png", "https://image.ibb.co/n4DYTn/horse_wild_4.png", "https://image.ibb.co/hJyduS/horse_wild_3.png", "https://image.ibb.co/iZGL8n/horse_wild_2.png", "https://image.ibb.co/neg917/horse_wild.png", "https://image.ibb.co/bxUwg7/horse_saddled.png", "https://image.ibb.co/kw4jZS/foul_dead.png", "https://image.ibb.co/hq6L8n/foul_dead_2.png"];
        var undead = ["https://image.ibb.co/jEPCM7/wight_shovel.png", "https://image.ibb.co/dBze17/wight_rusty_sword.png", "https://image.ibb.co/jLje17/wight_bone_club.png", "https://image.ibb.co/ddiHon/wight_bone.png", "https://image.ibb.co/nc4OTn/skeleton_sword_shield.png", "https://image.ibb.co/jQ8iTn/skeleton_mace.png", "https://image.ibb.co/bZggES/skeleton_dagger.png", "https://image.ibb.co/izhXM7/skeleton_crossbow_armored.png", "https://image.ibb.co/k97con/skeleton_crossbow.png", "https://image.ibb.co/bEKe17/skeleton_crawling_legless.png", "https://image.ibb.co/d9HouS/skeleton_axe_shield.png", "https://image.ibb.co/ntCz17/skeleton_axe.png", "https://image.ibb.co/dFSA8n/skeleton_archer_walking.png", "https://image.ibb.co/b3VV8n/skeleton_archer_red.png", "https://image.ibb.co/nrt6g7/lich_skull_evil.png", "https://image.ibb.co/dMrEZS/lich_masked_mage.png", "https://image.ibb.co/jF1EZS/lich_blue.png", "https://image.ibb.co/j6mgES/ghost_wolf_silver.png", "https://image.ibb.co/de7con/ghost_white_evil.png", "https://image.ibb.co/bUue17/ghost_female_blue.png", "https://image.ibb.co/hO4e17/female_ghost_blue_2.png", "https://image.ibb.co/hqtuZS/zombie_wolf.png", "https://image.ibb.co/cSmsM7/zombie_male_yellow.png", "https://image.ibb.co/j7Ee17/zombie_male_green.png", "https://image.ibb.co/cndTuS/zombie_male_footdragging.png", "https://image.ibb.co/fNv8uS/zombie_male_crawling.png", "https://image.ibb.co/jpPCM7/zombie_female_green.png", "https://image.ibb.co/cELV8n/zombie_female_red.png"];
        var underdark = ["https://image.ibb.co/ehc4ZS/Dark_Elf_Thief.png", "https://image.ibb.co/h96917/Dark_Elf_Priestess_Squid.png", "https://image.ibb.co/m7XhM7/Dark_Elf_Priest.png", "https://image.ibb.co/eQWL8n/Dark_Elf_male_wizard.png", "https://image.ibb.co/jmKU17/Dark_Elf_high_priestess.png", "https://image.ibb.co/kJ9jZS/Dark_Elf_fighter_doublesword.png", "https://image.ibb.co/eb8NM7/Dark_Elf_Fighter_3.png", "https://image.ibb.co/cfdduS/Dark_Elf_Fighter_2.png", "https://image.ibb.co/muQf8n/Dark_Elf_fighter.png", "https://image.ibb.co/hHVK17/Dark_Elf_Duelist.png", "https://image.ibb.co/iZue17/Dark_Elf_Dual_wielding.png", "https://image.ibb.co/mWaV8n/Dark_Elf_Cleric_2.png", "https://image.ibb.co/jBwsM7/Dark_Elf_cleric.png", "https://image.ibb.co/cMCXM7/Dark_Elf_Captain.png", "https://image.ibb.co/koy6g7/Dark_Elf_Assassin.png", "https://image.ibb.co/mSVK17/Dark_Elf_Acolyte.png", "https://image.ibb.co/jczq8n/Dark_Dwarf_warhammer.png", "https://image.ibb.co/d4Q8uS/Dark_Dwarf_Sword.png", "https://image.ibb.co/n4mEZS/Dark_Dwarf_Shiled_Hammer.png", "https://image.ibb.co/gOQxon/Dark_Dwarf_Pick.png", "https://image.ibb.co/facA8n/Dark_Dwarf_Morningstar.png", "https://image.ibb.co/f5iiTn/Dark_Dwarf_Longhammer.png", "https://image.ibb.co/ennouS/Dark_Dwarf_Longaxe.png", "https://image.ibb.co/eQaK17/Dark_Dwarf_Hammers.png", "https://image.ibb.co/kRTHon/Dark_Dwarf_doublehammer.png", "https://image.ibb.co/gvsz17/Dark_Dwarf_doubleaxe.png", "https://image.ibb.co/gmOiTn/Dark_Dwarf_Crossbow.png", "https://image.ibb.co/cmPZZS/Dark_Dwarf_Axe_shield.png", "https://image.ibb.co/m17z17/umber_hulk_2.png", "https://image.ibb.co/hHamg7/umber_hulk_1.png", "https://image.ibb.co/nPSz17/roper_grey.png", "https://image.ibb.co/jZvV8n/roper_darkgrey.png", "https://image.ibb.co/hiP1ES/Hookbeast.png", "https://image.ibb.co/iWeCM7/hook_beast_dark.png", "https://image.ibb.co/gKhXM7/fungus_man_purple.png", "https://image.ibb.co/jjXXM7/fungus_man.png", "https://image.ibb.co/ea8iTn/Driders_mage_04.png", "https://image.ibb.co/exVK17/Driders_dark_07.png"];
        var pirates = ["https://image.ibb.co/mTH4ZS/male_rower_middle.png", "https://image.ibb.co/ku9wg7/male_rower_left.png", "https://image.ibb.co/fjyp17/male_red_sword.png", "https://image.ibb.co/ioJ08n/male_rapier_figher.png", "https://image.ibb.co/bUfDTn/male_purple_rapier.png", "https://image.ibb.co/eQN4ZS/male_pirate_swrod_shield.png", "https://image.ibb.co/jQk2M7/male_pirate_crossbow.png", "https://image.ibb.co/irOBES/male_noble_diplomat.png", "https://image.ibb.co/cwgbg7/male_mage.png", "https://image.ibb.co/dxd08n/male_knife_urchin.png", "https://image.ibb.co/c2ryuS/male_katana_eyepatch.png", "https://image.ibb.co/c9i08n/male_grappling_hook_boarder.png", "https://image.ibb.co/gVHSon/male_crossbow_large.png", "https://image.ibb.co/g6NGg7/male_crossbow.png", "https://image.ibb.co/fBpwg7/male_captain_trident.png", "https://image.ibb.co/c5rWES/male_captain_sword.png", "https://image.ibb.co/hqarES/male_blunderbus_canon.png", "https://image.ibb.co/dDmbg7/male_axe_fighter.png", "https://image.ibb.co/hYZjZS/female_young_running.png", "https://image.ibb.co/epxtTn/female_wild_mage.png", "https://image.ibb.co/ckiBES/female_sword_tattoo.png", "https://image.ibb.co/mOe7on/female_shortsword.png", "https://image.ibb.co/jJQPZS/female_mage_spell.png", "https://image.ibb.co/nN4wg7/female_long_knife.png", "https://image.ibb.co/cvWL8n/female_lady_dress.png", "https://image.ibb.co/jUDYTn/female_cleaver.png", "https://image.ibb.co/cGHhM7/female_captian_sword.png", "https://image.ibb.co/f5Gbg7/female_blacksmith_hammer.png", "https://image.ibb.co/fCCGg7/dog_hound.png", "https://image.ibb.co/bxoBES/male_viking_axe_shiled.png", "https://image.ibb.co/gKL2M7/male_viking_axe.png", "https://image.ibb.co/navDTn/male_swordsman_scimitar.png", "https://image.ibb.co/dwP7on/male_sword_stalker.png", "https://image.ibb.co/hXYYTn/male_sword_hook.png", "https://image.ibb.co/jSXhM7/male_sword_dagger.png", "https://image.ibb.co/caJNM7/male_sword.png", "https://image.ibb.co/eGZJuS/male_sunburnt_brawler.png", "https://image.ibb.co/j91bg7/male_rowers_right.png", "https://image.ibb.co/gJip17/male_rowers_left.png", "https://image.ibb.co/eqLDTn/male_rower_right.png", "https://image.ibb.co/bWgbg7/male_rower_oars.png"];
        var DMEssentials2 = ["https://image.ibb.co/fkCMES/satyr_staff_2.png", "https://image.ibb.co/f8axon/satyr_staff.png", "https://image.ibb.co/iC0mg7/satyr_axe.png", "https://image.ibb.co/eLfxon/minotaur_axe_3.png", "https://image.ibb.co/d9Sz17/minotaur_axe_2.png", "https://image.ibb.co/fpzCM7/minotaur_axe.png", "https://image.ibb.co/mNj1ES/medusa_tan.png", "https://image.ibb.co/kSxz17/medusa_red.png", "https://image.ibb.co/ibeCM7/manticore_ground.png", "https://image.ibb.co/k9CA8n/manticore_flying.png", "https://image.ibb.co/gQfxon/lion_winged.png", "https://image.ibb.co/m2fK17/lion.png", "https://image.ibb.co/iovK17/jhydra2_5head.png", "https://image.ibb.co/c0wgES/hydra2_8head.png", "https://image.ibb.co/hWxouS/hydra2_2headed.png", "https://image.ibb.co/mhJHon/hydra2_1head.png", "https://image.ibb.co/g4kK17/hydra_8head.png", "https://image.ibb.co/ir0V8n/hydra_5head.png", "https://image.ibb.co/cvJuZS/hydra_2head.png", "https://image.ibb.co/nCpe17/hydra_1head.png", "https://image.ibb.co/dom3Tn/hippogriff.png", "https://image.ibb.co/nRcMES/harpy_purple_flying.png", "https://image.ibb.co/jKue17/harpy_purple.png", "https://image.ibb.co/h7xz17/harpy_brown_flying.png", "https://image.ibb.co/db7z17/harpy_1.png", "https://image.ibb.co/ijzCM7/gryphon.png", "https://image.ibb.co/bQ8iTn/chimera.png", "https://image.ibb.co/cnVK17/bullman_poleaxe.png", "https://image.ibb.co/eCZ1ES/wyvern_tan_flying.png", "https://image.ibb.co/duYTuS/wyvern_purple.png", "https://image.ibb.co/kpuZZS/wyvern_green_sitting.png", "https://image.ibb.co/nzKe17/wyvern_green_flying.png", "https://image.ibb.co/bJ6Rg7/wyvern_green.png", "https://image.ibb.co/d5Ncon/wyvern_blue_ground.png", "https://image.ibb.co/kHgEZS/wyvern_blue_flying.png", "https://image.ibb.co/cHWEZS/wyvern_blue.png", "https://image.ibb.co/dRCcon/satyr_whip.png", "https://image.ibb.co/mk9ZZS/wyvern_2headed.png"];
        var dwarves = ["https://image.ibb.co/eST08n/dwarf_male_spear_green.png", "https://image.ibb.co/n9tBES/dwarf_male_spear_blue.png", "https://image.ibb.co/iPMyuS/dwarf_male_spear.png", "https://image.ibb.co/chMbg7/dwarf_male_shield_axe.png", "https://image.ibb.co/cCfrES/dwarf_male_red_priest.png", "https://image.ibb.co/cA7Gg7/dwarf_male_priest_longhammer.png", "https://image.ibb.co/g1qrES/dwarf_male_poleaxe.png", "https://image.ibb.co/fDvrES/dwarf_male_plate_hammer_shield.png", "https://image.ibb.co/dXq2M7/dwarf_male_plate_flail_shield.png", "https://image.ibb.co/idyYTn/dwarf_male_pick_shield.png", "https://image.ibb.co/kBWWES/dwarf_male_pale_axe.png", "https://image.ibb.co/fuPjZS/dwarf_male_monk.png", "https://image.ibb.co/knq2M7/dwarf_male_mace_hammer_red.png", "https://image.ibb.co/ftr917/dwarf_male_handaxes_red.png", "https://image.ibb.co/fjNtTn/dwarf_male_hammer_shield_green.png", "https://image.ibb.co/dvZ7on/dwarf_male_hammer_shield.png", "https://image.ibb.co/dA97on/dwarf_male_flag_standard.png", "https://image.ibb.co/nHDBES/dwarf_male_fighter_scythe.png", "https://image.ibb.co/fC4wg7/dwarf_male_fighter_mage.png", "https://image.ibb.co/k4VDTn/dwarf_male_fighter_mace.png", "https://image.ibb.co/djv2M7/dwarf_male_doubleaxe_shield_mail.png", "https://image.ibb.co/jWKU17/dwarf_male_doubleaxe_shield.png", "https://image.ibb.co/gs7hM7/dwarf_male_doubleaxe.png", "https://image.ibb.co/mWrnon/dwarf_male_crosswbow_green_3.png", "https://image.ibb.co/eJyYTn/dwarf_male_crossbow_red.png", "https://image.ibb.co/d8mbg7/dwarf_male_crossbow_2.png", "https://image.ibb.co/jYnSon/dwarf_male_copper_hammer.png", "https://image.ibb.co/gfXGg7/dwarf_male_cleric_yellow.png", "https://image.ibb.co/dMtduS/dwarf_male_brawler.png", "https://image.ibb.co/dxxSon/dwarf_male_blunderbus_canon.png", "https://image.ibb.co/e6dp17/dwarf_male_axe_shield_silver.png", "https://image.ibb.co/gkA2M7/dwarf_male_axe_shield_green.png", "https://image.ibb.co/ivUU17/dwarf_male_axe_shield_gold.png", "https://image.ibb.co/f5y08n/dwarf_male_axe_shield_2.png", "https://image.ibb.co/n1shM7/dwarf_female_spear.png", "https://image.ibb.co/hNKjZS/dwarf_female_pick_plate.png", "https://image.ibb.co/daGWES/dwarf_female_hammer_shield.png", "https://image.ibb.co/cfUU17/dwarf_female_fighter_axe.png", "https://image.ibb.co/fWC4ZS/dwarf_female_axe_shield_2.png", "https://image.ibb.co/g91bg7/dwarf_female_axe_shield.png", "https://image.ibb.co/gcNSon/dwarf_male_wizard_staff.png", "https://image.ibb.co/nA3duS/dwarf_male_wizard.png", "https://image.ibb.co/d99wg7/dwarf_male_warhammer.png", "https://image.ibb.co/kxLf8n/dwarf_male_veteran_spear_shield.png", "https://image.ibb.co/d8bL8n/dwarf_male_thief_longaxe.png", "https://image.ibb.co/m5EjZS/dwarf_male_thief_flail.png", "https://image.ibb.co/i7zJuS/dwarf_male_swords.png", "https://image.ibb.co/jc5rES/dwarf_male_thief_dagger.png"];
        var playerCharacters2 = ["https://image.ibb.co/mrt6g7/Human_Warrior_Staff_Masked.png", "https://image.ibb.co/nj7XM7/Human_Warrior_Spear_Masked.png", "https://image.ibb.co/bZnA8n/Human_Warrior_Polearm.png", "https://image.ibb.co/ebTHon/Human_Rogue_Rapier_Dagger.png", "https://image.ibb.co/k1V8uS/Human_Rogue_Rapier_Crossbow.png", "https://image.ibb.co/k8SouS/Human_Rogue_Crossbow.png", "https://image.ibb.co/hn3TuS/Human_Mage_Staff_6.png", "https://image.ibb.co/fEcz17/Human_Mage_Staff_5.png", "https://image.ibb.co/kEmEZS/Human_Mage_Staff_4.png", "https://image.ibb.co/d9cz17/Human_Mage_Staff_3.png", "https://image.ibb.co/nGg3Tn/Human_Mage_Staff_2.png", "https://image.ibb.co/mUcz17/Human_Mage_Staff_Masked.png", "https://image.ibb.co/bRzZZS/Human_Mage_Staff.png", "https://image.ibb.co/iyy6g7/Human_Mage_Masked.png", "https://image.ibb.co/doYHon/Human_Mage.png", "https://image.ibb.co/fiWRg7/Human_Cleric_Mace_Shield_Plate.png", "https://image.ibb.co/if9e17/Human_Cleric_Holy_Symbol_Shield_Plate.png", "https://image.ibb.co/fLU1ES/Human_Cleric_Flail_Shield_Plate.png", "https://image.ibb.co/bDouZS/Human_Barbarian_Sword_Shield.png", "https://image.ibb.co/kSpe17/Human_Barbarian_Claws.png", "https://image.ibb.co/gwze17/Half_Orc_Warrior_Sword.png", "https://image.ibb.co/iaWsM7/Half_Orc_Warrior_Pole_Arm_Shield.png", "https://image.ibb.co/mRDTuS/Half_Orc_Warrior_Pole_Arm.png", "https://image.ibb.co/gHpe17/Half_Orc_Warrior_Hammer_Mace.png", "https://image.ibb.co/c1PZZS/Halfling_Rogue_Daggers.png", "https://image.ibb.co/eKSz17/Half_elf_Wizard_Staff.png", "https://image.ibb.co/eopq8n/Gnome_Warrior_Sword_Shield.png", "https://image.ibb.co/iQpCM7/Elf_Warrior_Archer_Bow_Leather_5.png", "https://image.ibb.co/nFXouS/Elf_Warrior_Archer_Bow_Leather_4.png", "https://image.ibb.co/h67z17/Elf_Warrior_Archer_Bow_Leather_3.png", "https://image.ibb.co/bYYHon/Elf_Warrior_Archer_Bow_Leather_2.png", "https://image.ibb.co/b2v8uS/Elf_Warrior_Archer_Bow_Leather.png", "https://image.ibb.co/fkvmg7/Elf_Warrior_Archer_Bow.png", "https://image.ibb.co/hobsM7/Elf_Warrior_Sword_Shield.png", "https://image.ibb.co/ks1gES/Elf_Warrior_Sword.png", "https://image.ibb.co/gihMES/Elf_Rogue_two_swords.png", "https://image.ibb.co/jYQxon/Elf_Rogue_Sword_Crossbow.png", "https://image.ibb.co/jeduZS/Elf_Rogue_Crossbow_Spell.png", "https://image.ibb.co/fmOiTn/Elf_Rogue_Crossbow.png", "https://image.ibb.co/kmXz17/Elf_Rogue_Bow.png", "https://image.ibb.co/gYscon/Elf_Monk_Fist_2.png", "https://image.ibb.co/cYtTuS/Elf_Monk_Fist.png", "https://image.ibb.co/egZq8n/Elf_Druid_Sickle_Leather.png", "https://image.ibb.co/iBXSon/Elf_Druid_Sickle.png", "https://image.ibb.co/nAy08n/Dwarf_Warrior_Mace.png", "https://image.ibb.co/cbUjZS/Dwarf_Warrior_Crossbow_Leather.png", "https://image.ibb.co/entp17/Dwarf_warrior_Axe_Plate.png", "https://image.ibb.co/gDip17/Dwarf_Monk_Fist.png", "https://image.ibb.co/mqiBES/Dwarf_Cleric_Morningstar.png", "https://image.ibb.co/j9dNM7/Dwarf_Barbarian_Axe.png", "https://image.ibb.co/mBKU17/Cat_Warrior_Sword_Sword.png", "https://image.ibb.co/c3ip17/Thief_Rogue_Sword.png", "https://image.ibb.co/cYoNM7/Thief_Rogue_Daggers.png", "https://image.ibb.co/kVM917/Human_Witch_Book.png", "https://image.ibb.co/nmyBES/Human_Warrior_Sword_Shield_2.png", "https://image.ibb.co/d8DNM7/Human_Warrior_Sword_Shield_Plate_3.png", "https://image.ibb.co/h7ewg7/Human_Warrior_Sword_Shield_Plate_2.png", "https://image.ibb.co/nbwL8n/Human_Warrior_Sword_Shield_Plate.png", "https://image.ibb.co/mxaDTn/Human_Warrior_Sword_Shield.png", "https://image.ibb.co/cwgWES/Human_Warrior_Sword_Masked.png", "https://image.ibb.co/nxmL8n/Human_Warrior_Sword_Plate.png"];
        var hairyOrcsAndGoblins = ["https://image.ibb.co/gV5SM7/Orc_Warrior_Hammer_3.png", "https://image.ibb.co/iOW1g7/Orc_Warrior_Hammer_2.png", "https://image.ibb.co/k33E17/Orc_Warrior_Hammer_Helmet.png", "https://image.ibb.co/fudQ8n/Orc_Warrior_Hammer.png", "https://image.ibb.co/fjbZ17/Orc_Warrior_Crossbow_Helmet.png", "https://image.ibb.co/imdson/Orc_Warrior_Crossbow.png", "https://image.ibb.co/cD49ZS/Orc_Warrior_Bow_Flaming.png", "https://image.ibb.co/fYvu17/Orc_Warrior_Bow_3.png", "https://image.ibb.co/cZu9ZS/Orc_Warrior_Bow_2.png", "https://image.ibb.co/gm2wES/Orc_Warrior_Bow_Helmet_2.png", "https://image.ibb.co/mXd3uS/Orc_Warrior_Bow_Helmet.png", "https://image.ibb.co/fTCUZS/Orc_Warrior_Bow.png", "https://image.ibb.co/itGCon/Orc_Warrior_Axe_Shield_Helmet.png", "https://image.ibb.co/cxZbES/Orc_Warrior_Axe_Shield.png", "https://image.ibb.co/eGgdTn/Orc_Warrior_Axe_2.png", "https://image.ibb.co/jGqu17/Orc_Warrior_Axe_Helmet.png", "https://image.ibb.co/cJcJTn/Orc_Warrior_Axe.png", "https://image.ibb.co/h9Dgg7/Orc_Shamen_Staff_2.png", "https://image.ibb.co/iP3Q8n/Orc_Shamen_Staff.png", "https://image.ibb.co/i08E17/Orc_Shamen.png", "https://image.ibb.co/hp9yTn/Orc_Mutant_Tenticles.png", "https://image.ibb.co/kmrpZS/Orc_Assassin_Dagger_2.png", "https://image.ibb.co/b0O3uS/Orc_Assassin_Dagger.png", "https://image.ibb.co/b7LiuS/Goblin_Warrior_Sword_Shield_Fur.png", "https://image.ibb.co/giU9ZS/Goblin_Warrior_Sword_Fur.png", "https://image.ibb.co/i8mZ17/Goblin_Warrior_Staff_Fur_3.png", "https://image.ibb.co/jGgdTn/Goblin_Warrior_Staff_Fur.png", "https://image.ibb.co/fOQSM7/Goblin_Warrior_Spear_Shield_Fur_4.png", "https://image.ibb.co/eUdQ8n/Goblin_Warrior_Spear_Shield_Fur_3.png", "https://image.ibb.co/f6b1g7/Goblin_Warrior_Spear_Shield_Fur_2.png", "https://image.ibb.co/dbuXon/Goblin_Warrior_Spear_Shield_Fur.png", "https://image.ibb.co/ecswES/Goblin_Warrior_Mace_Shield_Fur.png", "https://image.ibb.co/cfau17/Goblin_Warrior_Mace_Fur.png", "https://image.ibb.co/j6LSM7/Goblin_Warrior_Club_Fur_3.png", "https://image.ibb.co/jMzZZS/Goblin_Warrior_Club_Fur.png", "https://image.ibb.co/hPUq8n/Goblin_Warrior_Bow_Fur_4.png", "https://image.ibb.co/mjKZZS/Goblin_Warrior_Bow_Fur_3.png", "https://image.ibb.co/gMCXM7/Goblin_Warrior_Bow_Fur_2.png", "https://image.ibb.co/icpZZS/Goblin_Warrior_Bow_Fur.png", "https://image.ibb.co/gwkmg7/Goblin_Warrior_Axe_Shield_Fur_2.png", "https://image.ibb.co/mAZe17/Goblin_Warrior_Axe_Shield_Fur.png", "https://image.ibb.co/iBhz17/Goblin_Warrior_Axe_Fur_4.png", "https://image.ibb.co/mVYiTn/Goblin_Warrior_Axe_Fur_3.png", "https://image.ibb.co/bTvK17/Goblin_Warrior_Axe_Fur_2.png", "https://image.ibb.co/cDSouS/Goblin_Warrior_Axe_Fur.png", "https://image.ibb.co/mSSXM7/Goblin_Shaman_Staff_Shield_Fur.png", "https://image.ibb.co/fdjCM7/Goblin_Shaman_Rod_Fur.png", "https://image.ibb.co/h3ZCM7/Orc_Warrior_Sword_Shield_Helmet_2.png", "https://image.ibb.co/k0G3Tn/Orc_Warrior_Sword_Shield_Helmet.png", "https://image.ibb.co/hmkmg7/Orc_Warrior_Sword_Shield.png", "https://image.ibb.co/gyuOTn/Orc_Warrior_Spear_Shield_Helmet_2.png", "https://image.ibb.co/iFF8uS/Orc_Warrior_Spear_Shield_Helmet.png", "https://image.ibb.co/dBEOTn/Orc_Warrior_Spear_Shield.png", "https://image.ibb.co/mmdHon/Orc_Warrior_Pick_Hammer_2.png", "https://image.ibb.co/hXyuZS/Orc_Warrior_Pick_Hammer.png", "https://image.ibb.co/czduZS/Orc_Warrior_Hammer_4.png"];
        var guardsAndNobles = ["https://image.ibb.co/mawj17/Human_Nomad_Bow_2.png", "https://image.ibb.co/cgzhon/Human_Nomad_Bow.png", "https://image.ibb.co/mZLYuS/Human_Lord_Rogue_Sword.png", "https://image.ibb.co/cXqcM7/Human_Lord_Rod_Purple.png", "https://image.ibb.co/iAZhon/Human_Lord_Red.png", "https://image.ibb.co/jBkoTn/Human_Lord_Purple.png", "https://image.ibb.co/bZxP17/Human_Lady_Sitting_Purple.png", "https://image.ibb.co/corj17/Human_Lady_Sitting_Pink.png", "https://image.ibb.co/nASDuS/Human_Lady_Purple.png", "https://image.ibb.co/foKRES/Human_Lady_Blue.png", "https://image.ibb.co/f99RES/Human_Jester.png", "https://image.ibb.co/iTEtuS/Human_Guard_Commander_Sword_Helmet.png", "https://image.ibb.co/jgGHM7/Human_Guard_Commander_Sword.png", "https://image.ibb.co/mNmv8n/Human_Guard_commander_Spear_Purple.png", "https://image.ibb.co/dZANon/Human_Guard_Commander_Purple.png", "https://image.ibb.co/i2qYuS/Human_Guard_Commander_Helmet.png", "https://image.ibb.co/hNURES/Human_Guard_Commander.png", "https://image.ibb.co/jmpRES/Human_Guard_Sword_Shield_2.png", "https://image.ibb.co/kuiWg7/Human_Guard_Sword_Shield_Purple_2.png", "https://image.ibb.co/fxaoTn/Human_Guard_Sword_Shield_Purple.png", "https://image.ibb.co/gxXDuS/Human_Guard_Sword_Shield_Helmet_2.png", "https://image.ibb.co/iVKtuS/Human_Guard_Sword_Shield_Helmet.png", "https://image.ibb.co/kY0zZS/Human_Guard_Sword_Shield.png", "https://image.ibb.co/gY2rg7/Human_Guard_Sword_Purple.png", "https://image.ibb.co/eywHM7/Human_Guard_Sword_Helmet.png", "https://image.ibb.co/jqOa8n/Human_Guard_Sword.png", "https://image.ibb.co/cWfBg7/Human_Guard_Spear_Shield_Purple.png", "https://image.ibb.co/hrTKZS/Human_Guard_Spear_Shield_Helmet.png", "https://image.ibb.co/gxgHM7/Human_Guard_Spear_Shield.png", "https://image.ibb.co/dEtmES/Human_Guard_Spear_Purple.png", "https://image.ibb.co/b9tmES/Human_Guard_Shield_Helmet.png", "https://image.ibb.co/d4rv8n/Human_Guard_Shield.png", "https://image.ibb.co/c0VzZS/Human_Guard_Crossbow_2.png", "https://image.ibb.co/evT8Tn/Human_Guard_Crossbow_Purple_2.png", "https://image.ibb.co/j3LNon/Human_Guard_Crossbow_Purple.png", "https://image.ibb.co/myJWg7/Human_Guard_Crossbow_Helmet_2.png", "https://image.ibb.co/h63KZS/Human_Guard_Crossbow_Helmet.png", "https://image.ibb.co/jGSP17/Human_Guard_Crossbow.png", "https://image.ibb.co/m4ia8n/Human_Guard_Bow_Purple.png", "https://image.ibb.co/dgcP17/Human_Guard_Bow_Helmet.png", "https://image.ibb.co/kbW6ES/Human_Guard_Bow.png", "https://image.ibb.co/jheRES/Human_Guard_Axe_3.png", "https://image.ibb.co/hcRj17/Human_Guard_Axe_2.png", "https://image.ibb.co/dOz417/Human_Guard_Axe_Purple_3.png", "https://image.ibb.co/jYazZS/Human_Guard_Axe_Purple_2.png", "https://image.ibb.co/n5NeZS/Human_Guard_Axe_Purple.png", "https://image.ibb.co/d4TxM7/Human_Guard_Axe_Helmet_3.png", "https://image.ibb.co/jaU417/Human_Guard_Axe_Helmet_2.png", "https://image.ibb.co/iSviuS/Human_Guard_Axe_Helmet.png", "https://image.ibb.co/c6WdTn/Human_Guard_Axe.png", "https://image.ibb.co/j2PMg7/Human_Alchemist_Flasks_Red.png", "https://image.ibb.co/iFLGES/Human_Alchemist_Flasks_Green.png", "https://image.ibb.co/irQ58n/Human_Witch_Staff_Red.png", "https://image.ibb.co/kmcwES/Human_Witch_Green.png", "https://image.ibb.co/hv5SM7/Human_Witch_Blue.png", "https://image.ibb.co/exmOuS/Human_Witch_Black.png", "https://image.ibb.co/joROuS/Human_Nomad_Spear_Shield.png", "https://image.ibb.co/c6R1g7/Human_Nomad_Spear.png", "https://image.ibb.co/mMD3uS/Human_Nomad_Scimitar_Shield_2.png", "https://image.ibb.co/c5tQ8n/Human_Nomad_Scimitar_Shield.png", "https://image.ibb.co/hLUbES/Human_Nomad_Scimitars.png", "https://image.ibb.co/jOAiuS/Human_Nomad_Scimitar.png"];
        
        var foldersArray = [playerCharacters, playerCharacters2, goblinsKobolds, dwarves, guardsAndNobles, DMEssentials1, DMEssentials2, underdark, orcsTrolls, wereCreatures, familiars, samurai, caverns, campsite, undead, pirates, hairyOrcsAndGoblins];
        
        var looper;
        
        var chosenFolder = document.getElementById("tabChoices").value;

        for (looper = 0; looper < foldersArray[chosenFolder].length; looper++) {

            var btn = document.createElement("BUTTON");
            
            btn.style.background = "url(" + foldersArray[chosenFolder][looper] + ")";
            btn.style.backgroundSize = "contain";
            btn.setAttribute("id", foldersArray[chosenFolder][looper]);
            
            btn.onclick = function() {
                                      imageToSet = this.id;
                                      
                                      if (placeImageSwitch === 1) { document.getElementById("preview").setAttribute("src", document.getElementById(this.id).id);
                                                                    document.getElementById("preview").style.width = "100px";
                                                                    document.getElementById("preview").style.height = "100px"; }
                                      };

            document.getElementById("minisGoHere").appendChild(btn); }
        

    
}



function howTo(index) {
    
    var howToMessages = ["Select an image file to use as a map. \nPress 'Load Map'. \n??? \nProfit. \n\nFun fact: Distance is calculated considering 100 pixels to be five feet, so scale your map based on that. If no map file is selected, a basic, default map is used.", 
                           "You should see your map displayed! There are buttons in the top corner called Icon Functions and Map Functions. Each one pulls up a control window in the bottom left corner.  \n\nFun fact: when a button is active, its color changes to red.",
                           "Icon Menu - This will pull up a menu for available icons. \n\nPlace Icon - While active, choose an icon from the menu to place it on the map. Selected icons will display under the Icon Menu button, and will be placed wherever you click on the map. Double click an icon to produce a color marker for duplicate icons. Double click again to cycle through different colors. \n\nRemove Icon - While active, clicking on icons will remove them. \n\nMove Icon - While active, drag and drop icons to move them. \n\nRotate Icon - While active, click an icon to rotate it clockwise. \n\nSize - A drop down menu to select icon size. 'Normal Size' is 100px by 100px.",
                           "Mark - While active, a red circle will mark whatever location selected. \n\nMeasure - While active, click, drag and release the mouse to measure distance from the clicked point to the released point. Normal size icons are considered 5ft by 5ft, and this is how distance is calculated. \n\nZoom Out - While active, click anywhere on the game map to zoom out from it. \n\nHide - While active, double-click to place a small gray square. When hide is active, the squares can be moved to any desired location. When the button is inactive, the gray squares can be resized by dragging the bottom right corner. \n\nShow - While active, click any gray hiding square to remove it."];
    
    alert(howToMessages[index]);
    
}



function generateIconChoices() {
    
    switchOperator(0);
    
    if (iconMenuSwitch === 1) {
        document.getElementById("iconMenu").style.display = "none";
        document.getElementById("generateIconMenu").style.background = "lightgray";
        iconMenuSwitch++;
    }
    
    if (iconMenuSwitch === 0) {
        document.getElementById("iconMenu").style.display = "block";
        document.getElementById("generateIconMenu").style.background = "lightsalmon";
        iconMenuSwitch++;
    }
    
    if (iconMenuSwitch === 2) {
        iconMenuSwitch = 0;
    }
    
}
function removeIcon() {
    
    switchOperator(1);
    
    if (removeImageSwitch === 1) { document.getElementById("remove").style.background = "lightgray";
                                   removeImageSwitch++; }
    
    if (removeImageSwitch === 0) { document.getElementById("remove").style.background = "lightsalmon";
                                   removeImageSwitch++; }
    
    if (removeImageSwitch === 2) { removeImageSwitch = 0; }
    
}
function rotateIcon() {
    
    switchOperator(2);
    
    if (rotateImageSwitch === 1) { document.getElementById("rotate").style.background = "lightgray";
                                   rotateImageSwitch++; }
    
    if (rotateImageSwitch === 0) { document.getElementById("rotate").style.background = "lightsalmon";
                                   rotateImageSwitch++; }
    
    if (rotateImageSwitch === 2) { rotateImageSwitch = 0; }
    
}
function measureMap() {
    
    switchOperator(3);
    
    if (measureMapSwitch === 1) { document.getElementById("measureMap").style.background = "lightgray";
                                   measureMapSwitch++; }
    
    if (measureMapSwitch === 0) { document.getElementById("measureMap").style.background = "lightsalmon";
                                   measureMapSwitch++; }
    
    if (measureMapSwitch === 2) { measureMapSwitch = 0; }
    
}
function markMap() {
    
    switchOperator(4);
    
    if (markMapSwitch === 1) { document.getElementById("markMap").style.background = "lightgray";
                                   markMapSwitch++; }
    
    if (markMapSwitch === 0) { document.getElementById("markMap").style.background = "lightsalmon";
                                   markMapSwitch++; }
    
    if (markMapSwitch === 2) { markMapSwitch = 0; }
    
}
function zoomMap() {
    
    switchOperator(5);
    
    if (zoomMapSwitch === 1) { document.getElementById("zoomMap").style.background = "lightgray";
                                   zoomMapSwitch++; }
    
    if (zoomMapSwitch === 0) { document.getElementById("zoomMap").style.background = "lightsalmon";
                                   document.getElementById("iconsGoHere").style.cursor = "zoom-out";
                                   zoomMapSwitch++; }
    
    if (zoomMapSwitch === 2) { zoomMapSwitch = 0;
                                   zoom = 100;
                                   document.getElementById("iconsGoHere").style.cursor = "";
                                   document.getElementById("map").style.zoom = "100%";
                                   document.getElementById("iconsGoHere").style.zoom = "100%"; }
    
}
function hideMap() {
    
    switchOperator(6);
    
    if (hideMapSwitch === 1) { hideMapSwitch++; }
    
    if (hideMapSwitch === 0) { document.getElementById("hideMap").style.background = "lightsalmon";
                                   hideMapSwitch++; }
    
    if (hideMapSwitch === 2) { document.getElementById("hideMap").style.background = "lightgray";
                                   hideMapSwitch = 0; }
    
}



function switchOperator(e) {
    
    var buttonIDs = ["generateIconMenu", "remove", "rotate", "measureMap", "markMap", "zoomMap", "hideMap"];
        
    if (e !== 0) { iconMenuSwitch = 0; document.getElementById(buttonIDs[0]).style.background = "lightgray"; placeImageSwitch = 0; document.getElementById("iconMenu").style.display = "none"; }
    if (e !== 1) { removeImageSwitch = 0; document.getElementById(buttonIDs[1]).style.background = "lightgray"; }
    if (e !== 2) { rotateImageSwitch = 0; document.getElementById(buttonIDs[2]).style.background = "lightgray"; rotation = 0; }
    if (e !== 3) { measureMapSwitch = 0; document.getElementById(buttonIDs[3]).style.background = "lightgray"; }
    if (e !== 4) { markMapSwitch = 0; document.getElementById(buttonIDs[4]).style.background = "lightgray"; }
    if (e !== 5) { zoomMapSwitch = 0; document.getElementById(buttonIDs[5]).style.background = "lightgray"; zoom = 100;
                    document.getElementById("map").style.zoom = "100%"; document.getElementById("iconsGoHere").style.zoom = "100%";}
    if (e !== 6) { hideMapSwitch = 0; document.getElementById(buttonIDs[6]).style.background = "lightgray"; }
    
}



function welcomeGreeting() {
    
    var seed;
    seed = Math.floor(6*Math.random());
    
    var greetings = ["\"The Lich is convinced you were friends in school...\"",
                     "\"After the barbarian failed to break in the door, the wizard slaps it off the hinges...\"", 
                     "\"You successfully hide by putting a bucket over your head...\"", 
                     "\"You've intimidated the brutish dragon by hissing like a cat...\"", 
                     "\"You successfully dodge the poisonous air in the room...\"", 
                     "\"Through grunting and hand gestures, you have decieved the royal court into thinking you are not a bear...\""];
             
    document.getElementById("welcomeText").innerHTML = greetings[seed];
    
}