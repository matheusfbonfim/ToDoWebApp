function handleClick(checkbox) {
  // Se o botão estiver checado
  if(checkbox.checked){
      let idList = checkbox.dataset['idlist']; // idList
      let idItem = checkbox.dataset['iditem']  // idItem
      console.log('Id List:' + idList);
      console.log('Id Item:' + idItem);
      
      // Pai do check box - div check box
      let parent = checkbox.parentNode;
      // Avo do check box - container-checkbox-title
      let parent1 = parent.parentNode;
      // Bisavo do check box - item roxo
      let parent2 = parent1.parentNode;

      // parent2.classList.remove("roxo");
      // parent2.classList.add("green");
      console.log(checkbox.value+"True")

      let checkForm = document.querySelector('#checkboxForm')
      console.log(checkForm)
    
      checkForm.setAttribute('action', '/check/list/' + idList + '/item/' + idItem );
      checkForm.submit()      
  }
  else{
      let idList = checkbox.dataset['idlist']; // idList
      let idItem = checkbox.dataset['iditem']  // idItem

      // console.log('Id List:' + idList);
      // console.log('Id Item:' + idItem);
      
      // // Pai do check box - div check box
      // let parent = checkbox.parentNode;
      // // Avo do check box - container-checkbox-title
      // let parent1 = parent.parentNode;
      // // Bisavo do check box - item roxo
      // let parent2 = parent1.parentNode;

      // parent2.classList.remove("green");
      // parent2.classList.add("roxo");
      // console.log(checkbox.value+"False")
      let checkForm = document.querySelector('#checkboxForm')
      console.log(checkForm)
    
      checkForm.setAttribute('action', '/check/list/' + idList + '/item/' + idItem );
      checkForm.submit()    
  }
}   