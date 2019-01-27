let stocksList = ["AAPL", "AMZN", "TSLA", "GOOG"];
let validationList = [];
const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

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
    const compName = response.quote.companyName;
    const displayName = $(`<p>Name: ${compName}</p>`);
    displayName.appendTo('#stocks-view');

    const logoURL = response.logo.url;
    const displayLogo = $(`<img src=${logoURL} alt ="${response.quote.companyName} logo">`);
    displayLogo.appendTo('#stocks-view');

    const price = response.quote.latestPrice;
    const displayPrice = $(`<p>Price: ${price}</p>`);
    displayPrice.appendTo('#stocks-view');

    let newsHeadline = '';
    for (let i = 0; i < response.news.length; i++) {
      newsHeadline += `<p>${response.news[i]["headline"]}</p>`;
    }
    const displayNews = $(`<p>News:${newsHeadline}<p>`);
    $('#stocks-view').append(displayNews);
  });

}

const render = function () {
  $('#buttons-view').empty();

  for (let i = 0; i < stocksList.length; i++) {
    let newButton = $('<button>');
    newButton.addClass('stock');
    newButton.attr('data-name', stocksList[i]);
    newButton.text(stocksList[i]);
    $('#buttons-view').append(newButton);
  }
}

const addButton = function (event) {
  event.preventDefault();
  const stock = $('#stock-input').val().trim();
  for (let i = 0; i < validationList.length; i++) {
    if (stock.toUpperCase() === validationList[i]) {
      stocksList.push(stock.toUpperCase());
      break;
    }
    if(i === validationList.length - 1 && stock !== validationList[i]){
      alert("Enter a valid stock symbol");
    }
  }
  $('#stock-input').val('');
  render();
}

$('#add-stock').on('click', addButton);
$('#buttons-view').on('click', '.stock', displaystockInfo);
render();

