// ============================================
// ============= LIST CONTROLLER  ==========
// ============================================

const List = require('../model/List');
const Profile = require('../model/Profile')

// Controles
module.exports = {
    index(request, response){         // Retorna Pagina Home
      // Respondendo a page home
      // Passando para dentro da pagina as informações do "banco"
      return response.render("index", {lists: List.get()});
    },
    
    create(request, response){        // Retorna Pagina para Adicionar Lista
      return response.render("list");
    },
    
    createItem(request, response){    // Retorna Pagina para Adicionar Item a Lista
      // Pegando ID específico da lista da url
      const listId = request.params.idList;
      
      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = List.get().findIndex((list) => {
        return list.id == listId;
      }) 

      let list = {
        id: listId,
        name: List.get()[indexListId].name
      };

      // Renderizando pagina passando informacão da lista especifica
      return response.render("item", { list });
    },

    save(request, response){          // Adicionando Lista ao ToDo
      // request.body = {name: "dasdsa"}

      // Criando um ID - Automatico
      const lastId = List.get()[List.get().length - 1] ? List.get()[List.get().length - 1].id + 1 : 1;
      
      List.get().push({
        id: lastId,
        name:request.body.name,
        itens: []});     // ADD na lista

      return response.redirect("/") // Redireciona para /
    },

    saveItem(request, response){      // Adicionndo Item em uma lista especifica
      // Pegando ID específico
      const listId = request.params.idList;

      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = List.get().findIndex((list) => {
        return list.id == listId;
      }) 

      // Criando um ID de Item conforme a lista - Automatico
      const Itens = List.get()[indexListId].itens; // Array de itens da lista especifica
      const lastItem = Itens[Itens.length - 1] ? Itens[Itens.length - 1].id + 1 : 1;

      // ADD Item
      List.get()[indexListId].itens.push({id: lastItem, name:request.body.name});

      return response.redirect("/") // Redireciona para /
    },

    show(request, response){          // Retorna dados específicos para pagina editar list
      // Pegando ID específico
      const listId = request.params.id;
      
      // Verifica cada dado para encontrar o ID
      const list = List.get().find(list => Number(list.id) == Number(listId));

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
      const list = List.get().find(list => Number(list.id) == Number(listId));
      
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

      return response.render("item-edit", { list, item });
    },

    update(request, response){        // Enviar dados atualizados da lista conforme o ID para o index
      // Pegando ID específico
      const listId = request.params.id;

      // Verifica cada dado para encontrar o ID
      const list = List.get().find(list => Number(list.id) == Number(listId));

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
      const newList = List.get().map( list => {
        if (Number(list.id) === Number(listId)){
          list = updateList;
        }
        return list
      });

      // Atualizando a lista
      List.update(newList);

      // Redireciona para mesma tela
      response.redirect('/');
    },

    updateItem(request, response){    // Enviar dados atualizados do item conforme o ID da lista e item para o index
      // Pegando ID específico da lista da url
      const listId = request.params.idList;

      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = List.get().findIndex((list) => {
        return list.id == listId;
      }) 

      // Pegando ID específico do item da url
      const itemId = request.params.idItem;

      // Verifica cada dado para encontrar o ID
      const list = List.get().find(list => Number(list.id) == Number(listId));

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
      const newItens = List.get()[indexListId].itens.map( item => {
        if (Number(item.id) === Number(itemId)){
          item = updateItem;
        }
        return item
      });

      // Atualiza 
      List.updateItem(indexListId, newItens);

      // Redireciona para mesma tela
      response.redirect('/');
    },

    delete(request, response){        // Deletando a lista selecionada
      const listId = request.params.id;
    
      List.delete(listId);

      return response.redirect('/');
    },

    deleteItem(request, response){    // Deletando o item selecionado
      const listId = request.params.idList;
      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
      
      List.deleteItem(listId, itemId);
      
      return response.redirect('/');
    }
}