// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const routes = express.Router();

// ======================================================
// =============ROTAS====================================
// ======================================================

// Requisição GET - Página Home
routes.get("/", (request, response) => {
  // __dirname -> Caminho para enviar o HTML
  // Respondendo a page home
  return response.sendFile(__dirname + "/views/index.html");
})





// Exportando 
module.exports = routes;