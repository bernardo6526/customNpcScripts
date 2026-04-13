// HP CONTROL
function tick(event) {
    var player = event.player;
    var last = player.getStoredData("lastHealth");
    var current = player.getHealth();

    if (last == null) {
        player.setStoredData("lastHealth", current);
        return;
    }

    // If player healed → cancel it
    if (current > last) {
        player.setHealth(last);
    } else {
        player.setStoredData("lastHealth", current);
    }
}

function damaged(event) {
    var damageValue = event.getDamage();

    // MAX DAMAGE
    if(damageValue > 25) damageValue = 25;
    
    // MIN HP
    var newHP = event.player.getHealth() - damageValue;
    if(newHP <= 0 ) newHP = 1;

    event.player.setHealth(newHP);
}
function respawn(event) {
   event.player.setStoredData("lastHealth", 101);
   event.player.setMaxHealth(101);
   event.player.setHealth(101);
}