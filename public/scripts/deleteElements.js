// Todas listas - Node List
const lists = document.querySelectorAll('.lists .list')

// Formulario para deletar uma lista - HTML
const deleteForm = document.querySelector('#delete-list')

// Loop das listas
for (let list of lists) {
  // Id da list atual
  const listId = list.dataset.id
  // console.log('List ID ' + listId)

  // Seleciona botão de deletar
  const deleteButton = list.querySelector('a.delete-icon')


  // Adicionar ação para deletar e fazer o submit no post - Deletar da lista
  deleteButton.onclick = () => {
    deleteForm.setAttribute('action', '/list/delete/' + listId)
    deleteForm.submit()
  }

  // Acessando o container de itens e sua lista de itens
  const containerItens = list.querySelectorAll('.container-itens .item');
  console.log("CONTAINER ITENS")
  console.log(containerItens)

  // Formulario para deletar um item da lista - HTML
  const deleteItemForm = document.querySelector('#delete-item-list')

  for (let item of containerItens){
    // Id da list atual
    const itemId = item.dataset.id;

    // Seleciona botão de deletar
    const deleteButtonItem = item.querySelector('input.deleteItem')

    
    // Adicionar ação para deletar e fazer o submit no post - Deletar da lista
    deleteButtonItem.onclick = () => {
      deleteItemForm.setAttribute('action', '/delete/list/' + listId +  '/item/' + itemId )
      deleteItemForm.submit()
    }
  }
}
