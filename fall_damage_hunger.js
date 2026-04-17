// FALL DAMAGE CONTROL HUNGER VERSION
function tick(event) {
    var player = event.player;
    var height = player.getY();
    var lastHeight = player.getStoredData("lastHeight");
    if(!lastHeight) player.setStoredData("lastHeight", height);
    var velocityY = height - lastHeight;
    player.setStoredData("lastHeight", height);
    if (!player.getStoredData("fall")) player.setStoredData("velocityY", velocityY);
}

function fall(event) {
    var player = event.player;
    player.setStoredData("fall", true);

    var velocityY = player.getStoredData("velocityY");
    if (velocityY < -10) hurtPlayer(event, Math.abs(velocityY));

    player.setStoredData("fall", false);
}

function hurtPlayer(event, damage) {
    var player = event.player;
    var world = player.getWorld();
    var pos = player.getPos();
    var newHP = player.getStoredData("health") - damage;
    player.setStoredData("health", newHP);
    world.explode(pos, 1, false, false);
}