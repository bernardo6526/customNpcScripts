// Carry Entity
function mouseClicked(event) {
    var player = event.player;
    var world = player.getWorld();
    var pos = player.getPos();

    var button = event.getButton();
    if (button != 2) return; // mouse button 2

    // --- Debounce ---
    var now = world.getTotalTime();
    var last = player.getStoredData("carryKeyCD");
    if (last != null && (now - last) < 4) return;
    player.setStoredData("carryKeyCD", now);

    var carried = player.getTempData("carriedEntity");

    // --- If already carrying → release ---
    if (carried != null) {
        player.setTempData("carriedEntity", null);
        //player.sendMessage("Released entity");
        world.spawnParticle("reddust", pos.getX(), pos.getY() + 1, pos.getZ(), 1, 0, 0, 0, 30);
        return;
    }

    // --- Get ALL nearby entities ---
    var entities = player.getSurroundingEntities(3);

    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];

        if (e != player) {
            player.setTempData("carriedEntity", e);
            //player.sendMessage("Carrying");
            world.spawnParticle("happyVillager", pos.getX(), pos.getY() + 1, pos.getZ(), 0.4, 0.4, 0.4, 0.1, 20);
            return;
        }
    }
}

function tick(event) {
    var player = event.player;
    var world = player.getWorld();

    var entity = player.getTempData("carriedEntity");
    if (entity == null) return;

    // --- Message (once per second) ---
    var now = world.getTotalTime();
    var lastMsg = player.getStoredData("carryMsg");

    if (lastMsg == null || (now - lastMsg) > 20) {
        player.setStoredData("carryMsg", now);
    }

    // --- Follow player ---
    var pos = player.getPos();
    var yaw = player.getRotation();

    var offsetX = -Math.sin(yaw * Math.PI / 180) * 0.7;
    var offsetZ =  Math.cos(yaw * Math.PI / 180) * 0.7;

    entity.setPosition(
        pos.getX() + offsetX,
        pos.getY() + 1,
        pos.getZ() + offsetZ
    );

    entity.setMotionX(0);
    entity.setMotionY(0);
    entity.setMotionZ(0);
}