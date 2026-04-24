// Flash Time
function keyPressed(event) {
    var player = event.player;
    if(player.getStoredData("countdown") != null) return;

    var key = event.getKey();
    switch (key) {
        case 35: // H
            
            var world = player.getWorld();
            var now = world.getTotalTime();

            player.setStoredData("countdown", 48);
            player.setStoredData("countdownTime", now);
            break;
        default:
            return;
    }
}
function tick(event) {
    var player = event.player;
    var world = player.getWorld();

    var now = world.getTotalTime();

    // --- Init ---
    var count = player.getStoredData("countdown");
    var lastTick = player.getStoredData("countdownTime");

    if (count == null) {
        return;
    }

    // --- Run every 20 ticks (1 second) ---
    if ((now - lastTick) >= 20) {
        count = count - 1;
        player.setStoredData("countdown", count);
        player.setStoredData("countdownTime", now);

        player.sendMessage("Countdown: " + count);
    }

    if(count == 38) player.sendMessage("Power End");

    // --- End ---
    if (count <= 0) {
        player.sendMessage("Power Refreshed");
        player.removeStoredData("countdown");
        player.removeStoredData("countdownTime");
    }
}