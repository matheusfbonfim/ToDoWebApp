// ============================================
// ============= MODEL PROFILE ================
// ============================================
// Model retorna dados

const Database = require('../db/config.js') // Importa config. database


module.exports = {
    async get(){
        const db = await Database();  // Inicia e espera conexão com o banco de dados

        // Pegar informações do profile -> Usar get para ir pegar um dado somente
        const data = await db.get(`SELECT * FROM PROFILE`);

        db.close()  // Encerra conexão

        // Retorna o objeto
        return {
          name: data.name,
          avatar: data.avatar
        };
    },

    async update(newData){
      const db = await Database();  // Inicia e espera conexão com o banco de dados
      
      // Update nos dados
      db.run(`
      UPDATE PROFILE
        SET
          name = "${newData.name}",
          avatar = "${newData.avatar}"
      `)

      db.close()  // Encerra conexão
    }
}
