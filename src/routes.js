// Importando pacote Express
const express = require('express');

// Executando express - Servidor
const routes = express.Router();


// ======================================================
// Variaveis temporarias - "BANCO DE DADOS"

// Object Literal - Objeto com propriedades para o PERFIL
const Profile = {
  data:{
    name:"Fillipe",
    avatar: "https://media-exp1.licdn.com/dms/image/D4E35AQEroDYURewRXg/profile-framedphoto-shrink_800_800/0/1639072813228?e=1643418000&v=beta&t=dbLobY2PQxiLeOl9NUxZpAzb6qaly4u6QdBGJ-kyNnY"
  },
  controllers: {
    index(request,response){
      return response.render("profile", {profile: Profile.data});
    },
    update(request, response){
      // Req body para pegar os dados
      const data = request.body;

      // Update
      Profile.data = data;

      return response.redirect('/profile');
    }
  }
}

// Object Literal - Objeto com propriedades para LISTAS
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
    index(request, response){         // Retorna Pagina Home
      // Respondendo a page home
      // Passando para dentro da pagina as informações do "banco"
      return response.render("index", {lists: List.data});
    },
    create(request, response){        // Retorna Pagina para Adicionar Lista
      return response.render("list");
    },
    createItem(request, response){    // Retorna Pagina para Adicionar Item a Lista
      // Pegando ID específico da lista da url
      const listId = request.params.idList;
      console.log("create item")
      console.log(listId);
      console.log(List.data)
      
      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = List.data.findIndex((list) => {
        return list.id == listId;
      }) 

      list = {
        id: listId,
        name: List.data[indexListId].name
      };

      // Renderizando pagina passando informacão da lista especifica
      return response.render("item", { list });
    },
    save(request, response){          // Adicionando Lista ao ToDo
      // request.body = {name: "dasdsa"}

      // Criando um ID - Automatico
      const lastId = List.data[List.data.length - 1] ? List.data[List.data.length - 1].id + 1 : 1;
      
      List.data.push({
        id: lastId,
        name:request.body.name,
        itens: []});     // ADD na lista

      return response.redirect("/") // Redireciona para /
    },
    saveItem(request, response){      // Adicionndo Item em uma lista especifica
      // Pegando ID específico
      const listId = request.params.idList;
      // console.log("save item")
      // console.log(listId)

      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = List.data.findIndex((list) => {
        return list.id == listId;
      }) 

      // console.log("LIST DATA")
      // console.log(List.data)

      // console.log("LIST INDEX")
      // console.log(indexListId)

      // Criando um ID de Item conforme a lista - Automatico
      const Itens = List.data[indexListId].itens; // Array de itens da lista especifica
      const lastItem = Itens[Itens.length - 1] ? Itens[Itens.length - 1].id + 1 : 1;
      
      // console.log(Itens)
      // console.log(lastItem)

      // ADD Item
      List.data[indexListId].itens.push({id: lastItem, name:request.body.name});
      
      // console.log(List.data)
      // console.log("==================")

      return response.redirect("/") // Redireciona para /
    },
    show(request, response){          // Retorna dados específicos para pagina editar list
      // Pegando ID específico
      const listId = request.params.id;
      
      // Verifica cada dado para encontrar o ID
      const list = List.data.find(list => Number(list.id) == Number(listId));

      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Renderiza a pagina enviando para pagina informações
      return response.render("list-edit", { list });
    },
    showItem(request, response){      // Retorna dados específicos para pagina de editar item
      // Pegando ID específico da lista da url
      const listId = request.params.idList;
      
      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
      
      // Verifica cada dado para encontrar o ID
      const list = List.data.find(list => Number(list.id) == Number(listId));
      
      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Verifica cada dado para encontrar o item
      const item = list.itens.find(item => Number(item.id) == Number(itemId));

      // Caso item nao exista
      if (!item){
        return response.send("Item Not Found!!")
      }

      console.log("LISTA: " + list + " | ITEM: " + item);

      return response.render("item-edit", { list, item });
    },
    update(request, response){        // Enviar dados atualizados da lista conforme o ID para o index
      // Pegando ID específico
      const listId = request.params.id;
  
      // Verifica cada dado para encontrar o ID
      const list = List.data.find(list => Number(list.id) == Number(listId));

      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Atualiza dados 
      const updateList = {
        ...list,
        name: request.body.name
      }

      // Percorre todas listas e atualiza somente conforme o ID
      List.data = List.data.map( list => {
        if (Number(list.id) === Number(listId)){
          list = updateList;
        }
        return list
      })

      // Redireciona para mesma tela
      response.redirect('/');
    },
    updateItem(request, response){    // Enviar dados atualizados do item conforme o ID da lista e item para o index
      // Pegando ID específico da lista da url
      const listId = request.params.idList;

      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
    
      // Verifica cada dado para encontrar o ID
      const list = List.data.find(list => Number(list.id) == Number(listId));
    
      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Verifica cada dado para encontrar o item
      const item = list.itens.find(item => Number(item.id) == Number(itemId));

      // Caso item nao exista
      if (!item){
        return response.send("Item Not Found!!")
      }

      // Atualiza dados 
      const updateItem = {
        ...item,
        name: request.body.name
      }

      // Percorre todas listas e atualiza somente conforme o ID
      List.data[listId-1].itens = List.data[listId-1].itens.map( item => {
        if (Number(item.id) === Number(itemId)){
          item = updateItem;
        }
        return item
      })

      // Redireciona para mesma tela
      response.redirect('/');
    },
    delete(request, response){        // Deletando a lista selecionada
      const listId = request.params.id;
  
      List.data = List.data.filter(list => Number(list.id) !== Number(listId));

      return response.redirect('/');
    },
    deleteItem(request, response){    // Deletando o item selecionado
      const listId = request.params.idList;
      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
      
      // Criando uma nova lista com todos itens menos o escolhido para ser excluído
      List.data[listId-1].itens = List.data[listId-1].itens.filter(item => Number(item.id) !== Number(itemId));
      
      return response.redirect('/');
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

//======================================================
// GET

// Requisição GET - Página Home
routes.get("/", List.controllers.index)

// Requisição GET - Página Adicionar Item na lista específico
routes.get("/item/list/:idList", List.controllers.createItem)

// Requisição GET - Página Adicionar List
routes.get("/list", List.controllers.create)

// Requisição GET - Página Profile
routes.get("/profile", Profile.controllers.index)


// Requisição GET - Página Editar Item
routes.get("/list/:idList/item/:idItem", List.controllers.showItem)

// Requisição GET - Página Editar List
routes.get("/list/:id", List.controllers.show)


//======================================================
// POST

// Requisição POST - Página ADD List - POST para adicionar lista nova
routes.post("/list", List.controllers.save)

// Requisição POST - Página ADD Item - POST para adicionar item conforme a lista
routes.post("/item/list/:idList", List.controllers.saveItem)


// Requisição POST - Página Editar List - POST para atualizar lista
routes.post("/list/:id", List.controllers.update)

// Requisição POST - Página Editar Item
routes.post("/list/:idList/item/:idItem", List.controllers.updateItem)

// Requisição POST - Salvar alterações Profile
routes.post("/profile", Profile.controllers.update)


// Requisição POST -  Deletar List
routes.post("/list/delete/:id", List.controllers.delete)

// Requisição POST -  Deletar Item
routes.post("/delete/list/:idList/item/:idItem", List.controllers.deleteItem)

// ------------------------------------------------------
// Exportando 
module.exports = routes;