var iconMenuSwitch = 0; var mouseDown = 0;
var placeImageSwitch = 0; var removeImageSwitch = 0; var moveImageSwitch = 0; var rotateImageSwitch = 0;
var measureMapSwitch = 0; var hideMapSwitch = 0; var zoomMapSwitch = 0; var showMapSwitch = 0;
var backGroundImage;
var whichMessage = 0; var pointerMove = 18;

var idNo = 0;
var colorPicker = 0;

var zoom = 100;

var gamePiece; var gamePieces = []; var imageToSet;

var x; var y;

var fromX; var fromY; var toX; var toY;



function mapControl() {
    
    x = event.pageX;
    y = event.pageY;
    document.getElementById("iconsGoHere").style.cursor = "";
    
    if (placeImageSwitch === 1) {

            iconControl();

            document.getElementById("iconsGoHere").appendChild(gamePiece);

            gamePiece.style.position = "absolute";
            gamePiece.style.left = (x - gamePiece.getAttribute("width")/2) + "px";
            gamePiece.style.top = (y - gamePiece.getAttribute("height")/2) + "px";

    };
    
    if (zoomMapSwitch === 1) {
        
            zoom -= 10;
        
            document.getElementById("map").style.zoom = zoom + "%";
            document.getElementById("iconsGoHere").style.zoom = zoom + "%";
            document.getElementById("hideLayer").style.zoom = zoom + "%";
            
            for (i = 0; i < gamePieces.length; i++) {
                
                if (gamePieces[i] !== "d") { document.getElementById(gamePieces[i]).style.zoom = zoom + "%"; }
                
            }
        
    }
    
    
    
    if (measureMapSwitch === 2) {
        
            measureMap();
        
    }

}
function iconControl() {
    
    gamePiece = document.createElement("IMG");
    gamePiece.setAttribute("id", idNo);
    gamePieces.push(gamePiece.id);
    
            idNo++;
            
    gamePiece.setAttribute("src", imageToSet);
    gamePiece.setAttribute("draggable", false);
            
            if (document.getElementById("sizeIcon").value === "Normal" || document.getElementById("sizeIcon").value === "Size:") { gamePiece.setAttribute("width", "100"); gamePiece.setAttribute("height", "100"); }
            if (document.getElementById("sizeIcon").value === "Large") { gamePiece.setAttribute("width", "200"); gamePiece.setAttribute("height", "200"); }
            if (document.getElementById("sizeIcon").value === "Huge") { gamePiece.setAttribute("width", "400"); gamePiece.setAttribute("height", "400"); }
            
    gamePiece.onclick = function() {
        
            if (removeImageSwitch === 1) { searchIds(this.id); document.getElementById("iconsGoHere").removeChild(document.getElementById(this.id)); }

    };
    
    gamePiece.onmousemove = function() {
        
            if (rotateImageSwitch === 1) {
                
                var ax = 0, ay = 0, bx = 0, by = 0, cx = 0, cy = 0, a = 0, b = 0, c = 0;

                ax = parseInt(document.getElementById(this.id).style.left, 10) + parseInt(document.getElementById(this.id).getAttribute("width"), 10)/2; ay = parseInt(document.getElementById(this.id).style.top, 10) + parseInt(document.getElementById(this.id).getAttribute("height"), 10)/2;
                bx = parseInt(document.getElementById(this.id).style.left, 10) + parseInt(document.getElementById(this.id).getAttribute("width"), 10)/2; by = parseInt(document.getElementById(this.id).style.top, 10) + parseInt(document.getElementById(this.id).getAttribute("height"), 10);
                cx = event.pageX; cy = event.pageY;

                a = getDistance(bx*20, cx*20, by*20, cy*20);
                b = getDistance(ax*20, cx*20, ay*20, cy*20);
                c = getDistance(bx*20, ax*20, by*20, ay*20);

                if (bx - cx < 0) { document.getElementById(this.id).style.transform = "rotate(" + -1*Math.acos((b*b + c*c - a*a) / (2.0*b*c)) * (180 / Math.PI) + "deg)"; }
                if (bx - cx > 0) { document.getElementById(this.id).style.transform = "rotate(" + Math.acos((b*b + c*c - a*a) / (2.0*b*c)) * (180 / Math.PI) + "deg)"; }
                
            }
        
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
            measureDisplay.style.width = "40px";
            measureDisplay.style.height = "25px";
            measureDisplay.style.background = "rgba(0, 0, 0, 0.8)";
            measureDisplay.style.color = "white";
            measureDisplay.style.borderRadius = "5px";
            measureDisplay.style.fontWeight = "bold";
            
            measureDisplay.onmouseup = function() {
                
                document.getElementById("iconsGoHere").removeChild(measureDisplay);
                
            };
        
    }

}
function mouseMoveFunctions() {
    
    if (measureMapSwitch === 2) {
            
            toX = event.pageX;
            toY = event.pageY;
            
            document.getElementById("measureDisplay").style.top = toY - 25 + "px";
            document.getElementById("measureDisplay").style.left = toX - 5 + "px";
            
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
          placeImageSwitch = 0;            
          fromX = event.pageX;
          fromY = event.pageY;
          document.onmouseup = stopMovingElement;
          if (measureMapSwitch !== 1) { document.onmousemove = mouseMoveOnElement; }
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
          placeImageSwitch = 1;
          document.onmouseup = null;
          document.onmousemove = null;
        }

}
function searchIds(match) {
    
        for (var i = 0; i < gamePieces.length; i++) { if ( gamePieces[i] === match ) { gamePieces[i] = "d"; } }
    
}



function mapSwitch() {
    
        document.getElementById("menuBar").style.display = "block";
        document.getElementById("welcomeBox").style.display = "none";
        document.getElementById("welcomeBanner").style.display = "none";

        backGroundImage = document.createElement("IMG");

        var seed = Math.floor(4*Math.random());
        var testMaps = ["defaultMap.jpg", "testMap1.png", "testMap2.png", "testMap3.jpg"];
        
        backGroundImage.src = testMaps[seed];
        document.getElementById("map").src = testMaps[seed];

        document.getElementById("map").setAttribute("draggable", false);

        backGroundImage.onload = function() {

            document.getElementById("iconsGoHere").style.width = backGroundImage.width + "px";
            document.getElementById("iconsGoHere").style.height = backGroundImage.height + "px";
            
            var c = document.getElementById("hideLayer");
            
            c.width = backGroundImage.width;
            c.height = backGroundImage.height;
            
            var ctx = c.getContext("2d");
            
            ctx.beginPath();
            ctx.rect(0, 0, backGroundImage.width, backGroundImage.height);
            ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
            ctx.fill();
            ctx.globalCompositeOperation='destination-out';
            
            document.getElementById("hideLayer").onmousedown = function() {
                mouseDown = 1;
            };

            document.getElementById("hideLayer").onmouseup = function() {
                mouseDown = 0;
            };

            document.getElementById("hideLayer").onmousemove = function() {

                    var mouseX = event.pageX;
                    var mouseY = event.pageY;

                    if (mouseDown === 1) {
                    ctx.beginPath();
                    ctx.arc(mouseX,mouseY,50,0,2*Math.PI);
                    ctx.stroke();

                    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
                    ctx.fill();}

            };

        };
    
}
function generateBoard(map) {
    
        document.getElementById("menuBar").style.display = "block";
        document.getElementById("welcomeBox").style.display = "none";
        document.getElementById("welcomeBanner").style.display = "none";

        backGroundImage = document.createElement("IMG");

        var reader = new FileReader();
        reader.onload = function(e) {

            backGroundImage.src = e.target.result;
            document.getElementById("map").src = e.target.result;

        };
        reader.readAsDataURL(map.files[0]);

        document.getElementById("map").setAttribute("draggable", false);

        backGroundImage.onload = function() {

            document.getElementById("iconsGoHere").style.width = backGroundImage.width + "px";
            document.getElementById("iconsGoHere").style.height = backGroundImage.height + "px";
            
            document.getElementById("hideLayer").style.width = backGroundImage.width + "px";
            document.getElementById("hideLayer").style.height = backGroundImage.height + "px";

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
        var markers = ["blueArrow.png", "blueBolt.png", "blueCircle.png", "greenArrow.png", "greenBolt.png", "greenCircle.png", "lightBlueArrow.png", "lightBlueBolt.png", "lightBlueCircle.png", "pinkArrow.png", "pinkBolt.png", "pinkCircle.png", "redArrow.png", "redBolt.png", "redCircle.png", "yellowArrow.png", "yellowBolt.png", "yellowCircle.png"];
        
        var foldersArray = [playerCharacters, playerCharacters2, goblinsKobolds, dwarves, guardsAndNobles, DMEssentials1, DMEssentials2, underdark, orcsTrolls, wereCreatures, familiars, samurai, caverns, campsite, undead, pirates, hairyOrcsAndGoblins, markers];
        var folderNames = ["TP1Characters", "TP16Characters2",  "TP2GoblinsKobolds", "TP15Dwarves", "TP18GuardsandNobles", "TP5DMEssentials1", "TP14DMEssentials2", "TP12DarkDwellers", "TP3OrcsandTrolls", "TP4Werecreatures", "TP6Familiars", "TP7Samurai", "TP8WetCaverns", "TP9TheCamp", "TP11BasicUndead", "TP13Pirates", "TP17HairyOrcsGoblins", "markers"];
        
        var looper;
        
        var chosenFolder = document.getElementById("tabChoices").value;

        for (looper = 0; looper < foldersArray[chosenFolder].length; looper++) {

            var img = document.createElement("IMG");
            
            img.setAttribute("src", "dndPicsPng2/" + folderNames[chosenFolder] + "/" + foldersArray[chosenFolder][looper]);
            img.setAttribute("width", "100");
            img.setAttribute("height", "100");
            img.setAttribute("draggable", false);

            img.setAttribute("id", "dndPicsPng2/" + folderNames[chosenFolder] + "/" + foldersArray[chosenFolder][looper]);
                                      
            img.onclick = function() {
                
                    imageToSet = this.id;
                    document.getElementById("iconsGoHere").style.cursor = "-webkit-grabbing";
                
            };

            document.getElementById("minisGoHere").appendChild(img); }
        

    
}



function welcome() {
    
    document.getElementById("welcomeHelp").style.display = "block";
    
}
function howTo() {

        if (whichMessage === 0) { 
                                    document.getElementById("info").style.background = "lightsalmon"; document.getElementById("helpScreen").style.display = "block"; helpActive = 1;
                                    document.getElementById("helpText").innerHTML = "Let's go through the controls, and get your adventure started! Click Next to cycle through explanations. <br><br>Fun fact: When a button is red, it's active and will perform its assigned function.";
                                }
                                
        if (whichMessage > 0) { document.getElementById("info").style.background = "lightgray"; document.getElementById("helpScreen").style.display = "none"; whichMessage = 0; document.getElementById("helpText").innerHTML = ""; pointerMove = 18; document.getElementById("pointer").style.display = "none";}

}
function nextHelp() { 
    
        if (whichMessage === 0) { document.getElementById("pointer").style.left = pointerMove + "px"; document.getElementById("pointer").style.display = "block"; }
        
        if (whichMessage === 1) {  }
        
        if (whichMessage === 7) { document.getElementById("pointer").style.display = "none";  }
        
        if (whichMessage === 8) { howTo(); pointerMove = 18; return; }
        
        if (whichMessage > 0) { pointerMove += 55; document.getElementById("pointer").style.left = pointerMove + "px"; }

        var howToMessages = ["Click here to pull up the icon menu at the bottom of the screen. Click again to make it go away. <br><br>Use the drop down boxes in the icon menu to pick which kind of icon to choose from, and set their size. Scroll right in the icon menu to see all of the icons available. <br><br>Click the icon you'd like to place, then click where you want it on the board. <br><br>Once placed, icons can be dragged and moved anywhere on the board. Double clicking an icon will mark it with a border. Double click again to cycle through different colors for the border.", 
                             "Click here to activate the delete function. <br><br> While active, click on an icon to make it go away.", 
                             "Click here to activate the rotate function. <br><br> While active, hover the mouse over an icon to rotate it to whatever direction desired. Default is icon facing down.", 
                             "Click here to activate the measure function. <br><br> While active, click on a spot you'd like to measure from and drag to a spot you'd like to measure to. You should see numbers above the mouse tracking your distance. When the mouse is released, measuring will stop and the number will still be displayed. Click the box to make it go away. <br><br> Every 100 pixels is counted as 5 feet. This is how distance is calculated.", 
                             "Click here to activate the zoom-out function. <br><br> While active, the mouse cursor should change to a magnifying glass. Click anywhere on the board to zoom-out and get a better look at the overall map. <br><br> Click the button again to deactivate and reset the zoom level to normal.", 
                             "Click here to activate the hide map function. <br><br> The map should be blacked out. Click again to reveal the entire map. The next buttons function allows you to \"erase\" away blacked out areas. <br><br> The eye on the button changes when pressed. When there is no slash through the eye, clicking will reveal the map. When there is a slash through the eye, clicking will hide the map.",
                             "Click here to activate the show map function. <br><br> When pressed, click and drag the mouse over the blacked out layer to reveal parts of the map.", 
                             "Game on! Any questions or concerns can be sent to me at: virtualTableTop@outlook.com"];

        document.getElementById("helpText").innerHTML = howToMessages[whichMessage];
        
        whichMessage++;

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
        iconMenuSwitch++; placeImageSwitch = 1; document.getElementById("sizeIcon").value = "Size:";
    }
    
    if (iconMenuSwitch === 2) {
        iconMenuSwitch = 0; placeImageSwitch = 0;
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
function zoomMap() {
    
    switchOperator(4);
    
    if (zoomMapSwitch === 1) { document.getElementById("zoomMap").style.background = "lightgray";
                                   zoomMapSwitch++; }
    
    if (zoomMapSwitch === 0) { document.getElementById("zoomMap").style.background = "lightsalmon";
                                   document.getElementById("iconsGoHere").style.cursor = "zoom-out";
                                   zoomMapSwitch++; }
    
    if (zoomMapSwitch === 2) { zoomMapSwitch = 0;
                                   zoom = 100;
                                   document.getElementById("iconsGoHere").style.cursor = "";
                                   document.getElementById("map").style.zoom = "100%";
                                   document.getElementById("iconsGoHere").style.zoom = "100%";
                                   document.getElementById("hideLayer").style.zoom = "100%";
                               
                                   for (i = 0; i < gamePieces.length; i++) { if (gamePieces[i] !== "d") { document.getElementById(gamePieces[i]).style.zoom = "100%"; } }

    }
    
}
function hideMap() {
    
    switchOperator(5);
    
    if (hideMapSwitch === 1) { hideMapSwitch++; }
    
    if (hideMapSwitch === 0) { hideMapSwitch++;
                                document.getElementById("hideLayer").style.display = "block"; 
                                document.getElementById("hideMap").innerHTML = "<i class='far fa-eye'></i>";
    }
    
    if (hideMapSwitch === 2) { hideMapSwitch = 0;
                                document.getElementById("hideLayer").style.display = "none";
                                document.getElementById("hideMap").innerHTML = "<i class='far fa-eye-slash'></i>";}
    
}
function showMap() {
    
    switchOperator(6);
    
    if (showMapSwitch === 1) { document.getElementById("showMap").style.background = "lightgray";
                                    document.getElementById("hideLayer").style.pointerEvents = "none";
                                    showMapSwitch++; }
    
    if (showMapSwitch === 0) { document.getElementById("showMap").style.background = "lightsalmon";
                                    document.getElementById("hideLayer").style.pointerEvents = "auto";
                                    showMapSwitch++; }
    
    if (showMapSwitch === 2) { showMapSwitch = 0; }
    
}



function switchOperator(e) {
    
    var buttonIDs = ["generateIconMenu", "remove", "rotate", "measureMap", "zoomMap", "hideMap", "showMap"];
        
    if (e !== 0) { iconMenuSwitch = 0; document.getElementById(buttonIDs[0]).style.background = "lightgray"; placeImageSwitch = 0; document.getElementById("iconMenu").style.display = "none";}
    if (e !== 1) { removeImageSwitch = 0; document.getElementById(buttonIDs[1]).style.background = "lightgray"; }
    if (e !== 2) { rotateImageSwitch = 0; document.getElementById(buttonIDs[2]).style.background = "lightgray"; rotation = 0; }
    if (e !== 3) { measureMapSwitch = 0; document.getElementById(buttonIDs[3]).style.background = "lightgray"; }
    if (e !== 4) { zoomMapSwitch = 0; document.getElementById(buttonIDs[4]).style.background = "lightgray"; zoom = 100;
                    document.getElementById("map").style.zoom = "100%"; document.getElementById("iconsGoHere").style.zoom = "100%"; 
                    for (var i = 0; i < gamePieces.length; i++) { if ( gamePieces[i] !== "d" ) { document.getElementById(gamePieces[i]).style.zoom = "100%"; } } }
    if (e !== 5) {  }
    if (e !== 6) { showMapSwitch = 0; document.getElementById(buttonIDs[6]).style.background = "lightgray"; document.getElementById("hideLayer").style.pointerEvents = "none"; }
    
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



window.onclick = function(event) {
    if (event.target !== document.getElementById("questions")) {
        document.getElementById("welcomeHelp").style.display = "none";
    }
};