let stocksList = [AAPL, AMZN, TSLA];

const displaystockInfo = function () {

    const stock = $(this).attr('data-name');
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`;
  
    // Creates AJAX call for the specific stock button being clicked
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
    
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

  const addButton = function(event) {
    event.preventDefault();
    const stock = $('#stock-input').val().trim();
    stocks.push(stock);
    $('#stock-input').val('');
    render();
  }
  
  $('#add-stock').on('click', addButton);
  $('#buttons-view').on('click', '.stock', displaystockInfo);
  render();
  
  