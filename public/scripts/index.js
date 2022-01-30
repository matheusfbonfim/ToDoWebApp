console.log("Modal: " + modal)

// Selecionando as listas
const lists = document.querySelectorAll('.lists .list')
const deleteForm = document.querySelector('#delete-list')

console.log("List: " + lists)
console.log("Delete Form: " + deleteForm)


for (let list of lists) {
  // Informação do id da lista 
  const listId = list.dataset.id;

  console.log("List ID: " + listId);

  // Seleciona o botao de deletar
  const deleteButton = list.querySelector('.button-list.delete-icon')
  
  console.log("Delete Button: " + deleteButton);

  // Ao clicar 
  deleteButton.onclick = () => {
    // Abre a pagina de deletar
    modal.open()
    deleteForm.setAttribute('action', '/list/delete/' + listId)
  }
}


// Função Submit - Delete
function myFunction() {
  document.getElementById("delete-list").submit();
}