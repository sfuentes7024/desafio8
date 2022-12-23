
const express = require('express');
const { Router } = express;
const Contenedor = require('../utils/Contenedor');
const routerProductos = new Router();

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

const dbProductos = 'productos'
const container = new Contenedor(dbProductos)

routerProductos.get('/', async (req, res) => {
    const prod = await container.getAll()
    res.send(prod)
})

routerProductos.get("/:id", async (req, res) => {
    const id = req.params.id
    const prodById = await container.getById(id)
    res.send(prodById)
});

routerProductos.post('/', async (req, res) => {
    const { nombre, precio } = req.body
    if (nombre && precio) {
        const item = {
            nombre: nombre,
            precio: precio,
        }
        try {
            const prodAgregado = await container.save(item);
            res.send(prodAgregado)

        } catch (error) {
            console.log(error)
        }


    }
});

routerProductos.put('/:id', async (req, res) => {
    const id = req.params.id
    const { nombre, precio } = req.body
    if (nombre && precio) {
        const item = {
            nombre: nombre,
            precio: precio,
        }
        try {
            const prodModificado = await container.update(item, id);
            res.send({...prodModificado, id:id})
        } catch (error) {
            console.log(error)
        }


    }

})

routerProductos.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deletProd = await container.deletByID(id)
    res.send('prod eliminado')
})

module.exports = routerProductos