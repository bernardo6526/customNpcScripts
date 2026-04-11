// College Grades
function getFactionIdByName(name, event) {
    var factions = event.API.getFactions().list();

    for (var i = 0; i < factions.length; i++) {
        var faction = factions[i];
        if (faction.getName() == name) {
            return faction.getId();
        }
    }

    return -1; // not found
}

function tick(event) {
    var player = event.player;
    var world = player.getWorld();

    var timeTicks = world.getTime() % 24000;
    var time = Math.floor((timeTicks / 1000 + 6) % 24) * 100 + Math.floor((timeTicks % 1000) * 60 / 1000);

    if (time != 1200) return;

    var nearbyNPCs = player.getSurroundingEntities(10, 2); // radius = 10 blocks, type 2 = NPCs
    var faction = getFactionIdByName("Grades", event);
    var missedClass = true;

    for (var i = 0; i < nearbyNPCs.length; i++) {
        var npc = nearbyNPCs[i];
        if (npc.getName() == "Teacher") {
            player.sendMessage("You arrived just in time!");
            player.addFactionPoints(faction, 50);
            missedClass = false;
        }
    }

    if(missedClass){
        player.sendMessage("You missed the class");
        player.addFactionPoints(faction, -50);
    } 
}