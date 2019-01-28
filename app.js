let stocksList = ["AAPL", "AMZN", "TSLA", "GOOG"];
let validationList = [];
const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

// AJAX call for all stock symbols + stores them in array
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  for (let i = 0; i < response.length; i++) {
    validationList[i] = response[i]["symbol"];
  }
})


const displaystockInfo = function () {

  const stock = $(this).attr('data-name');
  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,news`;

  // Creates AJAX call for the specific stock button being clicked
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    //retrieve company name + append
    const compName = response.quote.companyName;
    const displayName = $(`<p class = "name">Name: ${compName}</p>`);
    displayName.appendTo('#stocks-view');

    //retrieve logo + append
    const logoURL = response.logo.url;
    const displayLogo = $(`<img id = "logo" src=${logoURL} alt ="${response.quote.companyName} logo">`);
    displayLogo.appendTo('#stocks-view');

    //retrieve price + append
    const price = response.quote.latestPrice;
    const displayPrice = $(`<p class = "head">Price: ${price}</p>`);
    displayPrice.appendTo('#stocks-view');

    //retrieve news article headline + append
    let newsHeadline = '';
    for (let i = 0; i < response.news.length; i++) {
      if(i > 9){
        break;
      }
      newsHeadline += `<p>${response.news[i]["headline"]}</p>`;
    }
    const displayNews = $(`<p class = "head endSection">News Articles:${newsHeadline}<p>`);
    $('#stocks-view').append(displayNews);
  });

}

const render = function () {
  //clear old buttons
  $('#buttons-view').empty();

  //add new <button> tag to html dynamically w/ class + attr; then renders
  for (let i = 0; i < stocksList.length; i++) {
    let newButton = $('<button class="btn-group btn btn-info"></button>');
    newButton.addClass('stock');
    newButton.attr('data-name', stocksList[i]);
    newButton.text(stocksList[i]);
    $('#buttons-view').append(newButton);
  }
}

const addButton = function (event) {
  event.preventDefault();

  //retrieve value from input field
  const stock = $('#stock-input').val().trim();
  for (let i = 0; i < validationList.length; i++) {
    //checks to see if input is in array of stock symbols
    if (stock.toUpperCase() === validationList[i]) {
      //if input is in array add to stocksList array
      stocksList.push(stock.toUpperCase());
      break;
    }
    //if input is not valid, alerts user to enter a valid stock symbol
    if (i === validationList.length - 1 && stock !== validationList[i]) {
      alert("Enter a valid stock symbol");
    }
  }

  //clears input field + renders buttons
  $('#stock-input').val('');
  render();
}

//clears stock info displayed on page
const clearStocks = function (event) {
  event.preventDefault();
  $('#stocks-view').empty();
}

//add event listeners on buttons
$('#add-stock').on('click', addButton);
$('#buttons-view').on('click', '.stock', displaystockInfo);
$('#clearBtn').on('click', clearStocks);
render();

