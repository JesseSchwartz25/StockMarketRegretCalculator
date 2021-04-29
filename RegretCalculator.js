//jshint esversion: 6
(function() {
  "use strict";

  //api key for alphavantage
  let APIkey = 'J2KCGNYWXBE3K3OD';

  window.onload = function() {
    //your code goes here.

    //so that the user can input their data
    let addbtn = id("add-btn");
    addbtn.onclick = addStock;

    let rmvbtn = id("rmv-btn");
    rmvbtn.onclick = rmvStock;

    let date = id("date");
    let stockName = id('stock-input');



  };

  function addStock() {
    let date = id("date");
    let stockName = id('stock-input');
    let content = id('content');
    let invested = id('amountinvested');


    if(stockName.children[0].value == ''){
      //make sure they have a stock name
      alert('Please input a stock name')

    }
    else if(invested.children[0].value == ''){
      //make sure they put in a dollar amount
      alert('Please input an investment amount');
    }else if(date.value == ''){
      alert('please input a date');
      //make sure they put in a date

    }
    else{

      if (content.children.length == 0) {
        //first child, create list
        console.log('no stocks yet, creating list');

        content.appendChild(document.createElement('ul'));
        id('calculate').classList.remove('hidden');

      }

      //if all above conditions are met, add it to the list
      let newStock = document.createElement('li');
      newStock.textContent = stockName.children[0].value + ': $' + invested.children[0].value + ' on ' + date.value;
      content.appendChild(newStock);

      stockName.children[0].textContent = '';
    }


  }

  function rmvStock(){
    let date = id("date");
    let stockName = id('stock-input');
    let content = id('content');
    let invested = id('amountinvested');

    let stockToRemove = stockName.children[0].value + ': $' + invested.children[0].value + ' on ' + date.value;

    for(let i = 0; i < content.children.length; i++){
      console.log('looking for', stockToRemove, 'comparing with', content.children[i].textContent);

      if (stockToRemove === content.children[i].textContent){
        console.log('gotta remove it! v2');
        content.removeChild(content.children[i]);


      }
    }
  }


// API Key for Alpha Vantage: J2KCGNYWXBE3K3OD
//We are limited to 5/minute, 500/day




  function id(name) {
    return document.getElementById(name);
  }

})();
