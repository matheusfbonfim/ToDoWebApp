// ============================================
// ============= PROFILE CONTROLLER  ==========
// ============================================

// Importando Model
const Profile = require('../model/Profile')

module.exports = {
    index(request,response){
      return response.render("profile", {profile: Profile.get()});
    },
    update(request, response){
      // Req body para pegar os dados
      const data = request.body;

      // Update
      Profile.update({
        ...Profile.get(),
        ...data
      })
      
      return response.redirect('/profile');
    }
}