// HP CONTROL HUNGER VERSION
function tick(event) {
    var player = event.player;
    var currentHP = player.getStoredData("health");
    if (currentHP == null) currentHP = player.getHunger();
    var percentage = currentHP / 100;
    player.setHunger(percentage * 20); // 20 = Max Hunger Bar

    // Cancel Hunger slowdown
    var world = player.getWorld();
    var hunger = player.getHunger();
    if (hunger <= 6 && player.hasTempData("sprinting")) {
        event.API.executeCommand(world, "effect @p 1 1 6");
    }
}

function damaged(event) {
    var player = event.player;
    var damage = event.getDamage();

    if (damage > 25) damage = 25; // MAX DAMAGE
    var newHP = player.getStoredData("health") - damage;
    player.setStoredData("health", newHP);

    // Set armor damage
    var p_armors = [];
    for (var i = 0; i < 4; i++) {
        p_armors.push(event.player.getArmor(i));
    }

    for (var i = 0; i < p_armors.length; i++) {
        if (p_armors[i]) {
            var itemDamage = p_armors[i].getItemDamage() + damage;
            if (itemDamage < p_armors[i].getMaxItemDamage()) p_armors[i].setItemDamage(itemDamage);
            else p_armors[i].setItemDamage(p_armors[i].getMaxItemDamage() - 1);
        }
    }
}

function respawn(event) {
    var player = event.player;
    player.setStoredData("health", 100);
}

function wakeUp(event) {
    var player = event.player;
    player.setStoredData("health", 100);
}

// Detect sprinting
function keyPressed(event) {
    var key_press = event.getKey();
    switch (key_press) {
        case 17: // W
            if (event.keyDown()) {
                event.player.setTempData("sprinting", {});
            } else {
                event.player.removeTempData("sprinting");
            }
            break;
        default:
    }
}