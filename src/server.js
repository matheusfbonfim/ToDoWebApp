// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const server = express();

// Importando rotas
const routes = require('./routes')

// Caminho
const path = require('path')

// ==================================
// SETANDO CONFIGURAÇÕES NO SERVER

// Motor de visualização - Processamento do HTML
server.set('view engine', 'ejs')

// Mudando a localização da pasta views (Padrão do EJS)
server.set('views', path.join(__dirname, 'views'))


// ==================================
// SETANDO FUNCIONALIDADES NO SERVER

// Middlewware ("Homem no meio" -> Entre o get)
// Habilita os arquivos estáticos
// Servidor cria rota automatico para os arquivos públicos
server.use(express.static("public"))

// Deixar o req body - Tem que habilitar no express
server.use(express.urlencoded({extended: true}))

// ======================================================
// =============ROTAS====================================
// ======================================================
server.use(routes)


// Ligando o servidor - Porta 3000
server.listen(3000, () => console.log("rodando"));