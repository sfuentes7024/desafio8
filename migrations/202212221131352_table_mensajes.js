/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('mensajes', (table) => {
        table.increments('id').primary().notNullable();
        table.string('Nombre', 255).notNullable();
        table.string('mensaje', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('mensajes')

};