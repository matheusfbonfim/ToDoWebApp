// ============================================
// ========== DASHBOARD CONTROLLER  ===========
// ============================================

// Responsável pelas informações principais da tela principal

// Importando model
const List = require('../model/List')
const Profile = require('../model/Profile')

// Utilitarios
const ListUtils = require('../utils/ListUtils');

module.exports = {
  index(request, response) {
    // Informações do profile e das listas
    const profile = Profile.get();
    const lists = List.get();

    // Objeto com valores para o sumário
    let statusCount = {
      totalItens: ListUtils.getTotalItens(List.get()),
      done: 0,
      progress: 0
    }

    // Atualizando valores do statusCount conforme o banco
    lists.map((list) => {
      list.itens.map((item) => {
        let status = item.status == 'green' ? 'done' : 'progress';
  
        // Somando a quantidade de status
        statusCount[status] += 1;
      })  
    })

    console.log("===== LISTA ====")
    console.log(List.get())
    console.log("\n")
    List.get().forEach(list => {console.log(list.itens)})

    // Retorna Pagina Home - Respondendo a page home
    // Passando para dentro da pagina as informações do "banco"
    return response.render("index", { lists: List.get(), profile: profile, statusCount: statusCount });
  },
}
