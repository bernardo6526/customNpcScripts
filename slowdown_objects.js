function tick(event) {
  var player = event.player;

  var entities = player.getSurroundingEntities(10);

  if (entities.length > 0) {

    for (var i = 0; i < entities.length; i++) {
      var e = entities[i];

      if (e != player) {

        var vx = e.getMotionX();
        var vy = e.getMotionY();
        var vz = e.getMotionZ();

        var min = 0.05; // minimum velocity threshold

        // Only slow if above threshold
        if (Math.abs(vx) > min) vx *= 0.3;
        if (Math.abs(vy) > min) vy *= 0.3;
        if (Math.abs(vz) > min) vz *= 0.3;

        e.setMotionX(vx);
        e.setMotionY(vy);
        e.setMotionZ(vz);
      }
    }

    event.API.executeCommand(player.getWorld(), "effect @p 15 1 1");
  }
}