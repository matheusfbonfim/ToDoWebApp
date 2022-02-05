// ============================================
// ============= MODEL LIST ===================
// ============================================


const Database = require('../db/config.js') // Importa config. database



// // Dados das listas
// let data = [
//   {
//     id: 1,
//     name: "To Do",
//     itens: [
//       {
//         id: 1,
//         name: "Fazer ToDo para o desafio da V360",
//         status: 'roxo',
//       },
//       {
//         id: 2,
//         name: "Não esquecer",
//         status: 'roxo',
//       },
//     ], 
//   },
//   {
//     id: 2,
//     name: "Lista 2",
//     itens: [
//       {
//         id: 1,
//         name: "Fazer ToDo para o desafio da V360",
//         status: 'roxo',
//       },
//     ],
//   },
// ];

module.exports = {
    async get(){
        const db = await Database()   // Iniciando conexão com o banco

        // Consulta SQL -> All traz tudo que encontrar
        const lists = await db.all(`SELECT * FROM LIST`);       // Listas

        // Array de lista e seus respectivos itens
        const newList =  lists.map(async (list) =>{
          // Percorre o array de itens e retornando um array de itens conforme a lista
          let itens_list = await db.all(`SELECT ITEM.id, ITEM.name, ITEM.status, ITEM.idList FROM ITEM WHERE ITEM.idList = ${list.id}`); 
          
          return {
            id: list.id,
            name: list.name,
            itens: itens_list
          }
        });
        
        await db.close() // Fechando conexão do banco 
      
        return Promise.all(newList);
    },
    
    update(newList){
        data = newList;
    },

    updateItem(index, itens){
      data[index].itens =  itens;
    },

    delete(id){
      data = data.filter(list => Number(list.id) !== Number(id));
    },

    deleteItem(listId, itemId){
      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = data.findIndex((list) => {
        return list.id == listId;
      }) 
      
      // Criando uma nova lista com todos itens menos o escolhido para ser excluído
      data[indexListId].itens = data[indexListId].itens.filter(item => Number(item.id) !== Number(itemId));
    },

    checkItem(listId, itemId){
      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = data.findIndex((list) => {
        return list.id == listId;
      }) 

      // Encontrando o index no array List.data que corresponde a essa lista
      const indexItemId = data[indexListId].itens.findIndex((item) => {
        return item.id == itemId;
      }) 

      if(data[indexListId].itens[indexItemId].status == 'roxo'){
          data[indexListId].itens[indexItemId].status = 'green';
      }else if(data[indexListId].itens[indexItemId].status == 'green'){
          data[indexListId].itens[indexItemId].status = 'roxo'
      }

    },

    async create(newList){
        const db = await Database(); // Conexão com o banco de dados

        await db.run(`INSERT INTO LIST (name) VALUES ("${newList.name}")`)

        await db.close()  // Fechando conexão do banco de dados
    },

    async createItem(ListId, newItem){
        const db = await Database(); // Conexão com o banco de dados

        await db.run(`INSERT INTO ITEM (name, status, idList) VALUES ("${newItem.name}", "${newItem.status}", "${ListId}")`)

        await db.close()  // Fechando conexão do banco de dados
    }
}
