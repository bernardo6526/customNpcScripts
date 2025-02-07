// WEB SHOOTER CODE

function tick(event) {
    var world = event.player.getWorld();
    var hunger = event.player.getHunger();

    if(hunger <= 6 && event.player.hasTempData("sprinting")){
        event.API.executeCommand(world,"effect @p 1 1 6");
    }

    if(event.player.isSprinting()){
        if(hunger%2 == 1){
            event.player.setHunger(hunger+1);
        }
    }  
}

function keyPressed(event) {
    // Find Keys Code
    //event.player.sendMessage(event.getKey());
    
    var key_press = event.getKey();
    var ammo = event.player.getHunger();
    var catridges = event.player.getExpLevel();

    switch(key_press) {
        case 17:
            if(event.keyDown()){
                event.player.setTempData("sprinting",{});
            }else{
                event.player.removeTempData("sprinting");
            }
        break;
        case 19: // R
            if(catridges > 0 && ammo > 0){
                event.player.setHunger(ammo-1);
            }else{
                event.player.sendMessage("Out of web fluid!");
                event.player.setSneaking(true);
            }
        break;
        case 33: // F
            if(event.isShiftPressed()){
                if(catridges > 1 && ammo < 5){
                    event.player.setSneaking(false);
                    event.player.setHunger(20);
                    event.player.setExpLevel(catridges-1)
                }else if(catridges<=1){
                    event.player.sendMessage("Out of web catridges!");
                }
                
            }else{
                if(catridges > 0 && ammo > 0){
                    event.player.setHunger(ammo-1);
                }else{
                    event.player.sendMessage("Out of web fluid!");
                    event.player.setSneaking(true);
                }
            }
        break;
        case 44: // Z
            if(catridges > 0 && ammo > 0){
                event.player.setHunger(0);
            }else{
                event.player.sendMessage("Out of web fluid!");
                event.player.setSneaking(true);
            }
        break;
        default:
    }

    if(catridges == 1 && ammo == 0){
        event.player.sendMessage("Go to the lab make more webs...");
        event.player.setExpLevel(0);
        event.player.setHunger(20);
    }
}