// PLAYER INIT CODE

function init(event) {
    var world = event.player.getWorld();
    event.API.executeCommand(world,"effect @p 11 1000000 10");
}

function respawn(event) {
    var world = event.player.getWorld();
    event.API.executeCommand(world,"effect @p 11 1000000 10");
}
