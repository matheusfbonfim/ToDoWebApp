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

// Object Literal - Objeto com propriedades
const List = {
  // Dados das listas
  data:[
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
  ], 
  // Controles
  controllers:{
    index(req, res){
      // Respondendo a page home
      // Passando para dentro da pagina as informações do "banco"
      return response.render(views + "index", {lists: List.data});
    },
    create(req, res){
      return response.render(views + "list");
    },
    createItem(req,res){
      return response.render(views + "item");
    },
    save(req,res){
      // request.body = {name: "dasdsa"}
      const lastId = List.data[List.data.length - 1] ? List.data[List.data.length - 1] : 1;
    
      lists.push({
        id: lastId + 1,
        name:request.body.name,
        itens: []});     // ADD na lista
    
      return response.redirect("/") // Redireciona para /
    },
    saveItem(req,res){
      // ADD Item
      List.data[0].itens.push({name:request.body.name})
      console.log(List.data)   
      return response.redirect("/") // Redireciona para /
    }
  },
  // Serviços
  services:{
  },
}



// ------------------------------------------------------
// ======================================================
// =============ROTAS====================================
// ======================================================

// __dirname -> Caminho no diretorio para enviar o HTML
const views = __dirname + '/views/'  // -> EJS ja sabe que está nesse caminho (padrão)


//======================================================
// GET

// Requisição GET - Página Home
routes.get("/", List.controllers.index)

// Requisição GET - Página Adicionar Item
routes.get("/item", List.controllers.createItem)

// Requisição GET - Página Adiciionar List
routes.get("/list", List.controllers.create)

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

// Requisição POST - Página ADD List
routes.post("/list", List.controllers.save)

// Requisição POST - Página Item
routes.post("/item", List.controllers.saveItem)



// ------------------------------------------------------
// Exportando 
module.exports = routes;