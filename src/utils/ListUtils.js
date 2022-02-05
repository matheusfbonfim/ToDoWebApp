module.exports = {
  getTotalItens(List) {
    let totalItens = 0;

    // Loop das listas
    for (let list of List) {
      let itens = list.itens;

      if (itens != null) {
        totalItens += itens.length;
      }
    }

    return totalItens;
  },
};
