// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const server = express();

// Middlewware ("Homem no meio" -> Entre o get)
// Habilita os arquivos estáticos
// Servidor cria rota automatico para os arquivos públicos
server.use(express.static("public"))

// ======================================================
// =============ROTAS====================================
// ======================================================

// Requisição GET - Página Home
server.get("/", (request, response) => {
  // __dirname -> Caminho para enviar o HTML
  // Respondendo a page home
  return response.sendFile(__dirname + "/views/index.html");
})

// Ligando o servidor - Porta 3000
server.listen(3000, () => console.log("rodando"));


