// Stamina drain
function tick(event) {
    var player = event.player;
    if (player.hasTempData("killed")) return;
    var world = player.getWorld();
    var stamina = player.getStoredData("stamina");

    if (stamina == null) stamina = player.getMaxHealth();

    var timeTicks = world.getTime() % 24000;
    var time = Math.floor((timeTicks / 1000 + 6) % 24) * 100 + Math.floor((timeTicks % 1000) * 60 / 1000);

    // drains every hour
    if (time % 100 == 0) {
        stamina = stamina - 1;
    }

    if (stamina <= 1) {
        stamina = 1;
        if(time % 10 == 0) event.API.executeCommand(world, "effect @p 9 10"); // Nausea effect
    }

    player.setMaxHealth(stamina);
    player.setHealth(stamina);
    player.setStoredData("stamina", stamina);
}

function respawn(event) {
    var player = event.player;
    player.setStoredData("stamina", 100);
    player.removeTempData("killed");
}

function wakeUp(event) {
    var player = event.player;
    player.setStoredData("stamina", 100);
}

function killed(event) {
    var player = event.player;
    player.setTempData("killed", {});
}