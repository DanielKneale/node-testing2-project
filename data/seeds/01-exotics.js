
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('exotics')
    .truncate()//deletes complete data from an existing table
    .then(function () {
      // Inserts seed entries
      return knex('exotics').insert([
        {id: 1, Name: 'Gjallarhorn', Weapontype: 'Rocket Launcher', AmmoType: 'Heavy',ExoticPerk: 'Rounds fired split into tracking cluster missiles upon detonation. Gain increased handling and reload speed when standing near allies. Firing this weapon also grants Wolfpack Rounds to nearby allies wielding non-Exotic Rocket Launchers' },
        {id: 2, Name: 'Outbreak_Perfected', Weapontype: 'Pulse Rifle', AmmoType: 'Primary',ExoticPerk: 'This weapon creates SIVA nanite swarms on rapid hits and precision kills and does more damage to enemies based on the number of SIVA nanites that attach to them' },
        {id: 3, Name: 'Dead_Messenger', Weapontype: 'Grenade Launcher', AmmoType: 'Special',ExoticPerk: 'One-shot handheld Grenade Launcher. Projectiles release a fan of three energy waves on contact with the ground. You can change damage type, cycling between Solar, Arc, and Void' },
      ]);
    });
};
