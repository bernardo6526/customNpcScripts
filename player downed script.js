function damaged(event) {
    var world = event.player.getWorld();
    var p_armors = [];
    var downed = 0;
    
    for(var i=0; i < 4; i++){
        armor = event.player.getArmor(i)
        p_armors.push(armor);
        if (armor && armor.getItemDamage() == 900){
            downed++;
        }
    }

    if(downed == 4 && !event.player.hasTempData("downed")){
        event.player.setTempData("downed",{});
        //event.API.executeCommand(world,"execute @p ~ ~ ~ animations set crawl");
        event.API.executeCommand(world,'title @p title {"text":"Down","bold":true,"color":"dark_red"}');
        event.API.executeCommand(world,"effect @p 9 10");
        event.API.executeCommand(world,"effect @p 2 30 4");
        event.API.executeCommand(world,"effect @p 11 30 3");
        event.player.setAbsorptionAmount(100);
        event.player.timers.forceStart(0,30*20,false);
    }
}

function timer(event){
    var world = event.player.getWorld();
    var p_armors = [];
    var downed = 0;
    
    for(var i=0; i < 4; i++){
        armor = event.player.getArmor(i)
        p_armors.push(armor);
        if (armor && armor.getItemDamage() == 900){
            downed++;
        }
    }

    if(!event.player.timers.has(0) && event.player.hasTempData("downed")){
        event.API.executeCommand(world,'title @p title {"text":"Awake!","bold":true,"color":"green"}');
        event.player.removeTempData("downed");
        for(var i=0; i < 4; i++){
            if (p_armors[i] && p_armors[i].getItemDamage() == 900){
                p_armors[i].setItemDamage(850);
            }
        }
        event.player.setImmune(5*20);
        event.player.setAbsorptionAmount(0);
    }
}