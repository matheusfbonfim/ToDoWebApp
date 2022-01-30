// ============================================
// ============= MODEL PROFILE ================
// ============================================


// Model retorna dados

// Object Literal - Objeto com propriedades para o PERFIL
let data = {
  name: "Fillipe",
  avatar:
    "https://media-exp1.licdn.com/dms/image/D4E35AQEroDYURewRXg/profile-framedphoto-shrink_800_800/0/1639072813228?e=1643418000&v=beta&t=dbLobY2PQxiLeOl9NUxZpAzb6qaly4u6QdBGJ-kyNnY",
};


module.exports = {
    get(){
        return data;
    },
    update(newData){
      data = newData;
    }
}
