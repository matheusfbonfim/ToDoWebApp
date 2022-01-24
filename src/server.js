// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const server = express();

// Importando rotas
const routes = require('./routes')

// Middlewware ("Homem no meio" -> Entre o get)
// Habilita os arquivos estáticos
// Servidor cria rota automatico para os arquivos públicos
server.use(express.static("public"))

// ======================================================
// =============ROTAS====================================
// ======================================================
server.use(routes)



// Ligando o servidor - Porta 3000
server.listen(3000, () => console.log("rodando"));


