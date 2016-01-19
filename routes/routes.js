  exports.attachHandlers = function attachHandlers(server,passport) { //, passport) {

      require('../api/api.products.js')(server,passport); //, passport);  
      require('../api/api.basketItems.js')(server,passport); //, passport);  

  };