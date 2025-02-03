function healThreshold(item){
    var message = ""
    var damage_offset = 10
    //npc.executeCommand("say \""+item.getName()+"/"+item.getItemDamage()+"\"");
    if(item.getItemDamage() && item.getItemDamage() >= 751+damage_offset){
        item.setItemDamage(751+damage_offset);
        message = "You should rest...";
    } 
    else if (item.getItemDamage() && item.getItemDamage() >= 501+damage_offset){
        item.setItemDamage(501+damage_offset);
        message = "Looking ok!";
    }
    else if (item.getItemDamage() && item.getItemDamage() >= 251+damage_offset){
        item.setItemDamage(251+damage_offset);
        message = "Looking good!";
    }
    else {
        item.setItemDamage(0);
        message = "Looking great!";
    }

    return message;
}

var p = event.player.getName();
var p_items = event.player.getInventory();
var p_armors = [];
var message = ""

if (event.getDialog().getName() == "Food Interaction (Day)" || event.getDialog().getName() == "Food Interaction (Night)") {
    for(var i=0; i < 4; i++){
        p_armors.push(event.player.getArmor(i));
    }

    //npc.executeCommand("give "+p+" minecraft:beef 1");
    for(var i=0; i < p_items.length; i++){
        if (p_items[i]) {
            //print(p_items[i].getName());
            //npc.executeCommand("say "+p_items[i].getName());
            healThreshold(p_items[i]);
        }
    }

    for(var i=0; i < p_armors.length; i++){
        if (p_armors[i]) {
            //print(p_armors[i].getName());
            //npc.executeCommand("say "+p_armors[i].getName());
            message = healThreshold(p_armors[i]);
        }
    }
    npc.say(message);
}