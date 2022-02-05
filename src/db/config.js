// ============================================
// ============= CONFIG DB ====================
// ============================================

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

module.exports = () => 
  // Abrindo a conexão com o banco de dados
  open({ 
    // DIreciona arquivo do banco de dados a ser salvo
    filename: './database.sqlite',
    // Motor do banco de dados
    driver: sqlite3.Database 
  });

// Open do SQLITE tem regras para ser chamada, conforme a estrutura acima