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
    rmvbtn.classList.add('hidden');

    let date = id("date");

    let endDate = id('enddate');
    endDate.defaultValue = '2021-04-29';
    endDate.step = 7;
    endDate.max = '2021-04-29';


    //date must be a friday for the data to work
    date.step = 7;
    date.max = '2021-04-29';
    let stockName = id('stock-input');
    date.defaultValue = '2011-04-29';

    let calculate = id('calculate');
    calculate.onclick = makeRequest;

    let invested = id('amountinvested');
    invested.children[0].defaultValue = '100';

    stockName.children[0].defaultValue = 'IBM';



  };

  function addStock() {
    let date = id("date");
    let stockName = id('stock-input');
    let content = id('content');
    let invested = id('amountinvested');
    let addbtn = id("add-btn");
    let rmvbtn = id("rmv-btn");




    if (stockName.children[0].value == '') {
      //make sure they have a stock name
      alert('Please input a stock name');

    } else if (invested.children[0].value == '') {
      //make sure they put in a dollar amount
      alert('Please input an investment amount');
    } else if (date.value == '') {
      alert('please input a date');
      //make sure they put in a date
    }

    else {
      //add the stock
      if (content.children.length == 0) {
        //first child, create list
        console.log('no stocks yet, creating list');

        content.appendChild(document.createElement('ul'));


      }

      //if all above conditions are met, add it to the list
      let newStock = document.createElement('li');
      newStock.textContent = stockName.children[0].value + ': $' + invested.children[0].value + ' on ' + date.value;
      content.appendChild(newStock);

      stockName.children[0].textContent = '';
      addbtn.classList.add('hidden');
      rmvbtn.classList.remove('hidden');
      id('calculate').classList.remove('hidden');

    }



  }

  function rmvStock() {
    let addbtn = id("add-btn");
    let rmvbtn = id("rmv-btn");
    let calculate = id("calculate");

    addbtn.classList.remove('hidden');
    rmvbtn.classList.add('hidden');
    calculate.classList.add('hidden')
    let date = id("date");
    let stockName = id('stock-input');
    let content = id('content');
    let invested = id('amountinvested');

    content.removeChild(content.children[1]);


    //if we add back the ability to add multiple stocks then you can add this back in

    // let stockToRemove = stockName.children[0].value + ': $' + invested.children[0].value + ' on ' + date.value;
    //
    // for (let i = 0; i < content.children.length; i++) {
    //   console.log('looking for', stockToRemove, 'comparing with', content.children[i].textContent);
    //
    //   if (stockToRemove === content.children[i].textContent) {
    //     console.log('gotta remove it! v2');
    //     content.removeChild(content.children[i]);
    //
    //
    //   }
    // }
  }




  function makeRequest() {
    // console.log(this.value);

    // let url = URL + this.value; // put url string here
    //test url, demo gives weekly IBM prices
    let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo';
    fetch(url, {
        credentials: 'omit'
      }) // include credentials for cloud9
      .then(checkStatus)
      .then(function(responseText) {
        //success: do something with the responseText
        //console.log(responseText);

        let ret = JSON.parse(responseText);

        // for(let i = 0; i < ret[1].length; i++){
        //
        // }
        let endDate = id('enddate');
        let dateval = date.value;
        let endval = endDate.value;

        // console.log(date.value, ret["Weekly Time Series"][dateval]["1. open"]);

        let startPrice = ret["Weekly Time Series"][dateval]["1. open"];
        let endPrice = ret["Weekly Time Series"][endval]["1. open"];

        let ratio = endPrice / startPrice;

        console.log(ratio);

        let startMoney = id('amountinvested').children[0].value;

        let endMoney = startMoney * ratio;

        console.log(startPrice, endPrice, startMoney, endMoney);











      })
      .catch(function(error) {
        //error: do something with error
      });

  }



  // API Key for Alpha Vantage: J2KCGNYWXBE3K3OD
  //We are limited to 5/minute, 500/day


  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  function id(name) {
    return document.getElementById(name);
  }

})();
