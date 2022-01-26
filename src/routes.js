// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const routes = express.Router();

// ======================================================
// Variaveis temporarias - "BANCO DE DADOS"

// Perfil
const profile = {
  name:"Fillipe",
  avatar: "https://media-exp1.licdn.com/dms/image/D4E35AQEroDYURewRXg/profile-framedphoto-shrink_800_800/0/1639072813228?e=1643076000&v=beta&t=rItBvDvcyTFHg0IMrYLSF2OfYAVorgHRtnhwIiokeZM"
}

// Listas
const lists = [
  {
    id: 1,
    name: "To Do",
    itens: [
      {
        id: 1,
        name:"Fazer ToDo para o desafio da V360"
      },
      {
        id: 2,
        name:"Não esquecer"
      },

    ]
  },
  {
    id: 2,
    name: "Lista 2",
    itens: [
      {
        id: 1,
        name:"Fazer ToDo para o desafio da V360"
      },
    ]
  }
]

// ------------------------------------------------------
// ======================================================
// =============ROTAS====================================
// ======================================================

// __dirname -> Caminho no diretorio para enviar o HTML
const views = __dirname + '/views/'  // -> EJS ja sabe que está nesse caminho (padrão)


//======================================================
// GETS

// Requisição GET - Página Home
routes.get("/", (request, response) => {
  // Respondendo a page home
  // Passando para dentro da pagina as informações do "banco"
  return response.render(views + "index", {lists});
})

// Requisição GET - Página Adicionar Item
routes.get("/item", (request, response) => {
  return response.render(views + "item");
})

// Requisição GET - Página Adiciionar List
routes.get("/list", (request, response) => {
  return response.render(views + "list");
})


// Requisição GET - Página Editar Item
routes.get("/item/edit", (request, response) => {
  return response.render(views + "item-edit");
})

// Requisição GET - Página Editar List
routes.get("/list/edit", (request, response) => {
  return response.render(views + "list-edit");
})

// Requisição GET - Página Profile
routes.get("/profile", (request, response) => {
  return response.render(views + "profile", {profile:profile});
})


//======================================================
// POST

// Requisição POST - Página List
routes.post("/list", (request, response) => {
  // request.body = {name: "dasdsa"}
  const lastId = lists[lists.length - 1] ? lists[lists.length - 1] : 1;

  lists.push({
    id: lastId + 1,
    name:request.body.name});     // ADD na lista

  return response.redirect("/") // Redireciona para /
})

// Requisição POST - Página Item
routes.post("/item", (request, response) => {
  // ADD Item
  lists[0].itens.push({name:request.body.name})
  console.log(lists)   
  return response.redirect("/") // Redireciona para /
})



// ------------------------------------------------------


// Exportando 
module.exports = routes;