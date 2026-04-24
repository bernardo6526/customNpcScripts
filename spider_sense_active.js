// SPIDER SENSE SCRIPT ACTIVE
var TICKS_PER_SECOND = 20;

// --- CONFIG (in seconds) ---
var COOLDOWN_TIME = 2.8;
var SENSE_DURATION = 2.8;

function spiderSense(event) {
  var player = event.player;
  var world = player.getWorld();
  var entities = player.getSurroundingEntities(10);

  if (entities.length > 0) {
    var slowedSomething = false;

    for (var i = 0; i < entities.length; i++) {
      var e = entities[i];

      if (e != player /*&& e.getType() == 2 && e.getTitle() == "Shooter"*/) {
        var vx = e.getMotionX();
        var vy = e.getMotionY();
        var vz = e.getMotionZ();
        var min = 0.05;

        if (Math.abs(vx) > min) { vx *= 0.3; slowedSomething = true; }
        if (Math.abs(vy) > min) { vy *= 0.3; slowedSomething = true; }
        if (Math.abs(vz) > min) { vz *= 0.3; slowedSomething = true; }

        e.setMotionX(vx);
        e.setMotionY(vy);
        e.setMotionZ(vz);
      }
    }

    if (slowedSomething) {
      event.API.executeCommand(world, "effect @p 15 1 1"); // blindness for vfx
      event.API.executeCommand(world, "effect @p 1 1 8"); // speed
      event.API.executeCommand(world, "effect @p 8 1 2"); // jump
    }
  }
}

function tick(event) {
  var player = event.player;
  var world = player.getWorld();

  var now = world.getTotalTime();
  var durationTicks = SENSE_DURATION * TICKS_PER_SECOND;
  var cooldownTicks = COOLDOWN_TIME * TICKS_PER_SECOND;

  var senseReady = player.getTempData("senseReady");
  var senseStart = player.getTempData("senseStart");

  if(senseReady == null ){
    player.setTempData("senseReady", true);
    senseReady = player.getTempData("senseReady");
  }

  var isInSpiderSense = senseStart != null && (now - senseStart) < durationTicks;
  var isCooldownOver = senseStart != null && (now - senseStart) >= durationTicks+cooldownTicks;

  if (isInSpiderSense) {
    spiderSense(event);
    return;
  }

  if (isCooldownOver) player.setTempData("senseReady", true);
}

function detectEntities(player) {
  var entities = player.getSurroundingEntities(2);
  if (entities.length > 0) return true;
  return false;
}

function keyPressed(event) {
  var key_press = event.getKey();

  switch (key_press) {
    case 56: // LEFT ALT
      var player = event.player;
      var now = player.getWorld().getTotalTime();

      if (detectEntities(player) && player.getTempData("senseReady")) {
        spiderSense(event);
        player.setTempData("senseStart", now);
        player.setTempData("senseReady", false);
      }
      break;
    default:
      return;
  }
}