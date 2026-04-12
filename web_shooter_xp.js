// WEB SHOOTER CODE

function tick(event) {
    var player = event.player;
    var world = player.getWorld();

    // refill webAmmo trigger
    if(player.getExpLevel() > 50) { 
        world.setStoredData("webAmmo", 200); 
        player.setExpLevel(0);
        event.API.executeCommand(world, "xp " + (200 + 3381) + " @p");
    }

    // empty webAmmo trigger
    if(player.getExpLevel() == 49) {
        world.setStoredData("webAmmo", 0);
        player.setExpLevel(0);
        event.API.executeCommand(world, "xp " + 3381 + " @p");
    }
}

function keyPressed(event) {
    var player = event.player;
    var world = player.getWorld();

    var ammo = world.getStoredData("webAmmo");
    if (ammo == null) {
        ammo = 200;
        world.setStoredData("webAmmo", ammo);
    }

    var key_press = event.getKey();

    switch (key_press) {
        case 19: // R
            if (ammo > 0) {
                ammo -= 1;
            } else {
                player.sendMessage("Out of web fluid!");
                player.setSneaking(true);
            }
            break;

        case 33: // F
            if (ammo > 0) {
                ammo -= 1;
            } else {
                player.sendMessage("Out of web fluid!");
                player.setSneaking(true);
            }
            break;

        case 44: // Z
            if (ammo > 0) {
                ammo -= 5;
            } else {
                player.sendMessage("Out of web fluid!");
                player.setSneaking(true);
            }
            break;

        default:
            return; // ignore other keys
    }

    // Avoid Negative values
    if (ammo < 0) ammo = 0;

    // Out of Ammo
    if (ammo == 0) {
        player.sendMessage("Go to the lab make more webs...");
    }

    // Update XP bar
    if(ammo > 0) {
        player.setExpLevel(0);
        event.API.executeCommand(world, "xp " + (ammo + 3381) + " @p");
    }

    // Save Ammo
    world.setStoredData("webAmmo", ammo);
}