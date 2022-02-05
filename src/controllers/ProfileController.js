// ============================================
// ============= PROFILE CONTROLLER  ==========
// ============================================

// Importando Model
const Profile = require('../model/Profile')

module.exports = {
    async index(request,response){
      return response.render("profile", {profile: await Profile.get()});
    },

    async update(request, response){
      // Req body para pegar os dados
      const data = request.body;
      
      const profile = await Profile.get();
    
      // Update
      await Profile.update({
        ...profile,
        ...data
      })
      
      return response.redirect('/profile');
    }
}