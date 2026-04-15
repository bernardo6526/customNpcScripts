// HP CONTROL
function tick(event) {
    var player = event.player;
    var currentHP = player.getHealth();
    var maxHP = player.getMaxHealth();
    var ratioHP = currentHP / maxHP;

    if (ratioHP == 1) return;

    player.setMaxHealth(maxHP + 2);
    if (maxHP >= 1000) {
        player.setMaxHealth(101);
        player.setHealth(ratioHP * 100);
    }
}

function damaged(event) {
    var player = event.player;
    var damage = event.getDamage();

    if (damage > 25) damage = 25; // MAX DAMAGE

    // Convert damage based on max HP
    var ratio = damage / 100;
    var convertedDamage = player.getMaxHealth() * ratio;

    var newHP = player.getHealth() - convertedDamage;
    if (newHP <= 0) newHP = 1;

    player.setHealth(newHP);

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
    var maxHP = 101;
    player.setMaxHealth(maxHP);
    player.setHealth(maxHP);
}

function wakeUp(event) {
    var player = event.player;
    var maxHP = 101;
    player.setMaxHealth(maxHP);
    player.setHealth(maxHP);
}