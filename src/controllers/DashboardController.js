// ============================================
// ========== DASHBOARD CONTROLLER  ===========
// ============================================

// Responsvável pelas informações principais da tela principal

// Importando model
const List = require('../model/List')


module.exports = {
  index(request, response) {
    // Retorna Pagina Home - Respondendo a page home
    // Passando para dentro da pagina as informações do "banco"
    return response.render("index", { lists: List.get() });
  },
}
