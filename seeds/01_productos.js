/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('productos').del()
    await knex('productos').insert([
      {id: 1, nombre: 'coca', precio: 250},
      {id: 2,  nombre: 'agua', precio: 250}
    ]);
  };