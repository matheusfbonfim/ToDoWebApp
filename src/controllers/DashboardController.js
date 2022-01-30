// ============================================
// ========== DASHBOARD CONTROLLER  ===========
// ============================================

// Responsável pelas informações principais da tela principal

// Importando model
const List = require('../model/List')
const Profile = require('../model/Profile')

module.exports = {
  index(request, response) {
    const profile = Profile.get()
    // Retorna Pagina Home - Respondendo a page home
    // Passando para dentro da pagina as informações do "banco"
    return response.render("index", { lists: List.get(), profile: profile });
  },
}
