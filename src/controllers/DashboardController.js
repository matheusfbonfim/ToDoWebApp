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
  async index(request, response) {
    // Informações do profile e das listas
    let lists = await List.get();
    const profile = await Profile.get();

    // Objeto com valores para o sumário
    let statusCount = {
      totalItens: ListUtils.getTotalItens(lists),
      done: 0,
      progress: 0
    }

    let status = '';
  
    // Atualizando valores do statusCount conforme o banco
    lists.map((list) => {

      list.itens.map((item) => {
        // Verifica se existem itens na lista
        if (item != null) {
          status = item.status == 'green' ? 'done' : 'progress';
          // Somando a quantidade de status
          statusCount[status] += 1;  
        }
      }) 
    });


    // lists.forEach(list => {console.log(list.itens)})

    // Retorna Pagina Home - Respondendo a page home
    // Passando para dentro da pagina as informações do "banco"
    return response.render("index", { lists: lists, profile: profile, statusCount: statusCount });
  },
}
