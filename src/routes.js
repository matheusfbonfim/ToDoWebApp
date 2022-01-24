// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const routes = express.Router();

// ======================================================
// =============ROTAS====================================
// ======================================================

// __dirname -> Caminho no diretorio para enviar o HTML
const views = __dirname + '/views/'  // -> EJS ja sabe que está nesse caminho (padrão)

// Requisição GET - Página Home
routes.get("/", (request, response) => {
  // Respondendo a page home
  return response.render(views + "index");
})

// Requisição GET - Página Adicionar Item
routes.get("/item", (request, response) => {
  return response.render(views + "item");
})

// Requisição GET - Página Adiciionar List
routes.get("/list", (request, response) => {
  return response.render(views + "list");
})


// Requisição GET - Página Edita Item
routes.get("/item/edit", (request, response) => {
  return response.render(basePath + "item-edit");
})

// Requisição GET - Página Edita List
routes.get("/list/edit", (request, response) => {
  return response.render(basePath + "list-edit.html");
})

// Exportando 
module.exports = routes;