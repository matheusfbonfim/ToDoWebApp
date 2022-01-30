// ============================================
// ============= MODEL PROFILE ================
// ============================================


// Model retorna dados

// Object Literal - Objeto com propriedades para o PERFIL
let data = {
  name: "Matheus",
  avatar: "https://avatars.githubusercontent.com/u/64151259?s=400&u=fbe601800b4d997f5caab8f7f6372543512f0047&v=4",
};


module.exports = {
    get(){
        return data;
    },
    update(newData){
      data = newData;
    }
}
