// CLASS DAMAGE SCRIPT
function damaged(event) {
  var p_armors = [];
  var damage = 0;
  var enemy = event.getSource();
  var projectile = event.getDamageSource().isProjectile();

  if(enemy && enemy.getTitle() == "Shooter" && projectile) damage = 200;

  for (var i = 0; i < 4; i++) {
    p_armors.push(event.player.getArmor(i));
  }

  for (var i = 0; i < p_armors.length; i++) {
    if (p_armors[i]) {
      var itemDamage = p_armors[i].getItemDamage() + damage;
      if(itemDamage < p_armors[i].getMaxItemDamage()) p_armors[i].setItemDamage(itemDamage);
      else p_armors[i].setItemDamage(p_armors[i].getMaxItemDamage()-1);
    }
  }
}