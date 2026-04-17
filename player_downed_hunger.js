// PLAYER DOWNED CODE HUNGER VERSION

var timeLeft = 10;
var bar_size = 100;

function downedAnimation(current_event,p_armors){
    // INIT DATA, DEFINE STATUS AND CREATE NPC
    var event = current_event;
    var world = event.player.getWorld();
    var position = event.player.getPosition();
    spidey = world.spawnClone(position,1,"Spidey",world);
    event.player.setTempData("downed",{id:spidey.getEntityId(),awakebar:0});

    // NPC BEHAVIOUR
    spidey.setImmune(timeLeft*20);
    spidey.setReturnToHome(false);
    spidey.setLivingAnimation(false);
    spidey.setMovingType(0);
    spidey.setAnimation(2);
    for(var i=0; i < 4; i++){
        spidey.setArmor(i,p_armors[3-i]);
    }

    // PLAYER BEHAVIOUR
    event.player.setMode(1);
    var pos = [event.player.getX(),event.player.getY(),event.player.getZ()];
    event.player.setPosition(pos[0],0,pos[2]); // set first person view
    var item = event.player.getHeldItem();
    event.API.executeCommand(world,"replaceitem entity @p slot.weapon minecraft:stone_button 1");
    if(item){
        event.player.giveItem(item,item.getStackSize());
    }
    event.API.executeCommand(world,'title @p title {"text":"Down","bold":true,"color":"dark_red"}');
    event.API.executeCommand(world,"effect @p 9 10");
    event.API.executeCommand(world,'tellraw @p {"text":"Spam space bar to wake up before time runs out!","color":"green"}');
}

function downed(current_event){
    var event = current_event;
    var world = event.player.getWorld();
    var spidey = world.getEntityByID(event.player.getTempData("downed").id);
    var spidey_pos = [spidey.getX(),spidey.getY(),spidey.getZ()];
    event.player.setPosition(spidey_pos[0],spidey_pos[1],spidey_pos[2]);
}

function awake(current_event){
    var event = current_event;
    var world = event.player.getWorld();

    // REMOVE NPC
    var spidey = world.getEntityByID(event.player.getTempData("downed").id);
    spidey.despawn();

    // RESET PLAYER STATUS
    event.API.executeCommand(world,'title @p title {"text":"Awake!","bold":true,"color":"green"}');
    event.player.removeTempData("downed");
    event.player.setImmune(1*20);
    event.player.setMode(0);
    event.player.removeItem("minecraft:stone_button",0,1);

    // HEAL PLAYER
    event.player.setStoredData("health", 25);
    event.player.setStoredData("stamina", event.player.getStoredData("stamina") - 25);
}

function damaged(event) {
    var p_armors = [];
    var downed = 0;
    
    for(var i=0; i < 4; i++){
        armor = event.player.getArmor(i);
        p_armors.push(armor);
    }

    if(event.player.getStoredData("health") <= 0 && !event.player.hasTempData("downed")){
        downedAnimation(event, p_armors);
        timeLeft = event.player.getStoredData("stamina");
        event.player.timers.forceStart(0,timeLeft*20,false);
        event.player.timers.forceStart(1,(timeLeft+10)*20,false);
    }
}

function tick(event){
    //STUCK IF DOWNED AND NO DEATH ANIMATION PLAYING
    if(event.player.hasTempData("downed")){
        downed(event);
    }

    //SHOW TIME LEFT BEFORE DEATH
    if(event.player.timers.has(0) && event.player.hasTempData("downed")){
        var world = event.player.getWorld();
        if(event.player.timers.ticks(0) % 2 == 0){
            event.API.executeCommand(world,'tellraw @p {"text":"'+Math.ceil(event.player.timers.ticks(0)/20)+'","color":"red"}');
        }
        
    } 
}

function keyPressed(event) {
    // SPACEBAR
    if(event.getKey() == 57 && event.player.hasTempData("downed") && event.player.timers.has(0)){
        // INCREMENT AWAKE BAR
        var downed_object = event.player.getTempData("downed");
        downed_object.awakebar += 1;

        // DRAW AWAKE BAR
        var bar = "";
        var bar_progress = downed_object.awakebar*(55/bar_size); // max char in title is 55 + 2 chars ([])
        for(var i=0;i<55;i++){ // max char in title is 55 + 2 chars ([])
            if(bar_progress > i){
                bar += "|";
            }else{
                bar += "_"; 
            }
        }        
        var world = event.player.getWorld();
        event.API.executeCommand(world,'title @p title {"text":"['+bar+']","bold":true,"color":"green"}');

        // AWAKE IF BAR FULL
        if(downed_object.awakebar >= bar_size){
            awake(event);
        }

    }
}

function timer(event){
    //DEATH ANIMATION
    if(!event.player.timers.has(0) && event.player.hasTempData("downed")){
        var world = event.player.getWorld();
        event.API.executeCommand(world,"effect @p 15 10");
        event.API.executeCommand(world,'title @p title {"text":"Game Over","bold":true,"color":"red"}');
    }
    //DEATH IF TIMER ENDS
    if(!event.player.timers.has(1) && event.player.hasTempData("downed")){
        var world = event.player.getWorld();
        var spidey = world.getEntityByID(event.player.getTempData("downed").id);
        event.player.setMode(0);
        event.player.removeItem("minecraft:stone_button",0,1);
        event.API.executeCommand(world,"execute @p ~ ~ ~ kill @p");
        spidey.despawn();
        event.player.removeTempData("downed");
    }
}