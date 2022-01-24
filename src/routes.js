// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const routes = express.Router();

// ======================================================
// =============ROTAS====================================
// ======================================================

// __dirname -> Caminho no diretorio para enviar o HTML
const basePath = __dirname + '/views'

// Requisição GET - Página Home
routes.get("/", (request, response) => {
  // Respondendo a page home
  return response.sendFile(basePath + "/index.html");
})

// Requisição GET - Página Adicionar Item
routes.get("/item", (request, response) => {
  return response.sendFile(basePath + "/item.html");
})

// Requisição GET - Página Adiciionar List
routes.get("/list", (request, response) => {
  return response.sendFile(basePath + "/list.html");
})


// Requisição GET - Página Edita Item
routes.get("/item/edit", (request, response) => {
  return response.sendFile(basePath + "/item-edit.html");
})

// Requisição GET - Página Edita List
routes.get("/list/edit", (request, response) => {
  return response.sendFile(basePath + "/list-edit.html");
})




// Requisição GET - Página Home
routes.get("/", (request, response) => {
  // __dirname -> Caminho para enviar o HTML
  // Respondendo a page home
  return response.sendFile(__dirname + "/views/index.html");
})






// Exportando 
module.exports = routes;