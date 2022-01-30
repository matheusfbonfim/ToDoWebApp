// ============================================
// ============= MODEL LIST ===================
// ============================================

// Dados das listas
let data = [
  {
    id: 1,
    name: "To Do",
    itens: [
      {
        id: 1,
        name: "Fazer ToDo para o desafio da V360",
      },
      {
        id: 2,
        name: "Não esquecer",
      },
    ], 
  },
  {
    id: 2,
    name: "Lista 2",
    itens: [
      {
        id: 1,
        name: "Fazer ToDo para o desafio da V360",
      },
    ],
  },
];

module.exports = {
    get(){
        return data;
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
    }
}
