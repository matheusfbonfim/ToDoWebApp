// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const routes = express.Router();

// Importando controllers
const ProfileController = require('./controllers/ProfileController')
const ListController = require('./controllers/ListControllers')


// ------------------------------------------------------
// ======================================================
// =============ROTAS====================================
// ======================================================

//======================================================
// GET

// Requisição GET - Página Home
routes.get("/", ListController.index)


// Requisição GET - Página Adicionar Item na lista específico
routes.get("/item/list/:idList", ListController.createItem)

// Requisição GET - Página Adicionar List
routes.get("/list", ListController.create)

// Requisição GET - Página Profile
routes.get("/profile", ListController.index)


// Requisição GET - Página Editar Item
routes.get("/list/:idList/item/:idItem", ListController.showItem)

// Requisição GET - Página Editar List
routes.get("/list/:id", ListController.show)


//======================================================
// POST

// Requisição POST - Página ADD List - POST para adicionar lista nova
routes.post("/list", ListController.save)

// Requisição POST - Página ADD Item - POST para adicionar item conforme a lista
routes.post("/item/list/:idList", ListController.saveItem)


// Requisição POST - Página Editar List - POST para atualizar lista
routes.post("/list/:id", ListController.update)

// Requisição POST - Página Editar Item
routes.post("/list/:idList/item/:idItem", ListController.updateItem)

// Requisição POST - Salvar alterações Profile
routes.post("/profile", ListController.update)


// Requisição POST -  Deletar List
routes.post("/list/delete/:id", ListController.delete)

// Requisição POST -  Deletar Item
routes.post("/delete/list/:idList/item/:idItem", ListController.deleteItem)

// ------------------------------------------------------
// Exportando 
module.exports = routes;