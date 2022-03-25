
exports.up = function(knex) {
  return knex.scheme.createTable("exotics", tbl =>{
      tbl.increments();
      tbl.string("Name", 25).unique().notNullable()
      tbl.string("Weapontype", 20).notNullable()
      tbl.string("AmmoType", 25).notNullable()
      tbl.string("ExoticPerk").notNullable()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("exotics");
};
