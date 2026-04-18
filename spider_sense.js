// SPIDER SENSE SCRIPT
var TICKS_PER_SECOND = 20;

// --- CONFIG (in seconds) ---
var COMBAT_WINDOW = 60;
var COOLDOWN_TIME = 10;
var SENSE_DURATION = 5;

function tick(event) {
  var player = event.player;
  var world = player.getWorld();

  var now = world.getTotalTime();

  var combatTicks = COMBAT_WINDOW * TICKS_PER_SECOND;
  var cooldownTicks = COOLDOWN_TIME * TICKS_PER_SECOND;
  var durationTicks = SENSE_DURATION * TICKS_PER_SECOND;

  // --- Combat check ---
  var lastCombat = player.getStoredData("inCombat");
  var isInCombat = lastCombat != null && (now - lastCombat) < combatTicks;

  if (!isInCombat) {
    player.removeStoredData("senseStart");
    player.removeStoredData("slowCD");
    player.removeStoredData("senseReady");
    return;
  }

  var senseStart = player.getStoredData("senseStart");
  var lastCooldown = player.getStoredData("slowCD");

  var isInSpiderSense = senseStart != null && (now - senseStart) < durationTicks;
  var isInCooldown = lastCooldown != null && (now - lastCooldown) < cooldownTicks;

  // --- Cooldown finished → mark ready ---
  if (!isInCooldown && lastCooldown != null) {
    player.setStoredData("senseReady", 1);
    player.removeStoredData("slowCD");
  }

  var ready = player.getStoredData("senseReady");

  // --- Activate Spider-Sense ONLY if ready ---
  if (!isInSpiderSense && !isInCooldown && ready == 1) {
    player.sendMessage("Spider-Sense START");

    player.setStoredData("senseStart", now);
    player.setStoredData("senseReady", 0);

    senseStart = now;
    isInSpiderSense = true;
  }

  // --- Run Spider-Sense ---
  if (isInSpiderSense) {

    var entities = player.getSurroundingEntities(10);

    if (entities.length > 0) {

      var slowedSomething = false;

      for (var i = 0; i < entities.length; i++) {
        var e = entities[i];

        if (e != player /*&& !e.isAlive()*/) {

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

    // --- End Spider-Sense → start cooldown ---
    if ((now - senseStart) >= durationTicks) {
      player.sendMessage("Spider-Sense END → cooldown");

      player.removeStoredData("senseStart");
      player.setStoredData("slowCD", now);
    }

    return;
  }
}

// --- Enter combat ---
function damaged(event) {
  var player = event.player;
  var now = player.getWorld().getTotalTime();

  player.setStoredData("inCombat", now);
  player.setStoredData("senseReady", 1); // allow activation
}

function attack(event) {
  var player = event.player;
  var now = player.getWorld().getTotalTime();

  player.setStoredData("inCombat", now);
  player.setStoredData("senseReady", 1); // allow activation
}