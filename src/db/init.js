// ============================================
// ============= INIT DB ======================
// ============================================

// Configurações inicias do banco de dados
//    - Criando somente uma vez

// Importando config
const Database = require('./config.js')

// Objeto com funções
const initDb = {
  // Função inicial
  async init(){
      // Conexão com o banco de dados - Abrindo 
      const db = await Database();    // Assincrono - Espera conexão com o banco 

      // ================================
      // CRIANDO TABELAS PRINCIPAIS

      // Criando tabela Profile
      await db.exec(`
          CREATE TABLE PROFILE (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT,
            avatar TEXT
          )`
      );

      // Criando tabela List
      await db.exec(`
          CREATE TABLE LIST (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT,
            idProfile INTEGER,
            FOREIGN KEY (idProfile) REFERENCES PROFILE(id)
          )`
      );

      // Criando tabela Item
      await db.exec(`
        CREATE TABLE ITEM (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT,
          status TEXT,
          idList INTEGER,
          FOREIGN KEY (idList) REFERENCES LIST(id)
        )`
      );

      // ================================
      // POPULANDO O BANCO

      // Inserindo em Profile
      await db.run(`
          INSERT INTO PROFILE(name,avatar) 
          VALUES(
            "Matheus",
            "https://avatars.githubusercontent.com/u/64151259?s=400&u=fbe601800b4d997f5caab8f7f6372543512f0047&v=4"
          );
      `);

      // Inserindo List 01
      await db.run(`
          INSERT INTO LIST(name,idProfile)
          VALUES("Lista 01", 1);
      `);

      // Inserindo Item 
      await db.run(`
          INSERT INTO ITEM(name, status, idList)
          VALUES("Desenvolvendo To Do", "roxo", 1);
      `);

      // Fechando conexão com o banco de dados
      await db.close();
  }
}


initDb.init()