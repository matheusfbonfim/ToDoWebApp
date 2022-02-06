// ============================================
// ============= MODEL LIST ===================
// ============================================


const Database = require('../db/config.js') // Importa config. database


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
    
    async update(updatedList, listId){
        const db = await Database();  // Conexão do banco

        await db.run(`
        UPDATE LIST 
          SET
          name = "${updatedList.name}"
          WHERE id = "${listId}"
      `); 

        await db.close(); // Fechando conexão
    },

    async updateItem(itemId, listId, updatedItem){
      const db = await Database();  // Conexão do banco

      await db.run(`
      UPDATE ITEM 
        SET
        name = "${updatedItem.name}",
        idList = ${listId}
        WHERE id = ${itemId}
      `); 

      await db.close(); // Fechando conexão
    },

    async delete(id){
      const db = await Database(); // Conexão com o banco de dados

      db.run(`DELETE FROM LIST WHERE ID = ${id}`)

      await db.close(); // Fechando a conexão com o banco de dados
    },

    async deleteItem(listId, itemId){
      const db = await Database(); // Conexão com o banco de dados
      console.log("LIST ID:" + listId + " Item" + " ID:" + itemId);

      db.run(`DELETE FROM ITEM WHERE id = ${itemId} AND idList = ${listId} `);

      await db.close();
    },

    async checkItem(itemId){
      const db = await Database(); // Conexão com banco de dados

      const item = await db.get(`SELECT * FROM ITEM WHERE id = ${itemId}`);
      
      console.log(itemId)
      console.log(item);

      if(item.status == 'roxo'){
        await db.run(`
        UPDATE ITEM 
          SET
          status = "green"
          WHERE id = ${itemId}
        `); 
      }else if(item.status == 'green'){
        await db.run(`
        UPDATE ITEM 
          SET
          status = "roxo"
          WHERE id = ${itemId}
        `); 
      }

      await db.close();
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
