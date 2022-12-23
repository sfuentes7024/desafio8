const knex = require('knex');
const knexConfig = require('../knexfile');
const database = knex(knexConfig);

//SQLITE
const knexConfigSQLite = require('../knexfile');
const dbSQLite = knex(knexConfigSQLite);

class Contenedor {

    constructor(url) {
        this.url = url
    }

    /*Metodos*/
    async getAll() {

        try {
            const prod = await database(this.url).select();
            return prod
        } catch (error) {
            console.log(error)
        }
    
    }

    // AGREGAR PROD
    async save(obj) {
        try {
            const nvoProd = await database(this.url).insert(obj)
            return nvoProd
        } catch (error) {
            console.log(error)
        }

    }

    //GET BY ID
    async getById(id) {
        try {
            
            const prodYd = await database(this.url).select()
                .where('id', id);
            return prodYd
    
        } catch (error) {
            console.log(error)
        }
    }

    // DELET PROD
    async deletByID(num) {
        try {
            const prod = await database(this.url).where({id:num})
            .del()
            return prod
        } catch (error) {
            console.log(error)
    
        }
    }

    //UPDATE 
    async update(prod, id) {
        try {
            const nvoProd = await database(this.url).where({id:id})
            .update(prod)
            return nvoProd
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor
