(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    //var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var SERVER_URL = 'http://localhost:3002/coffeeorders';

    var App = window.App;
    var Photo = App.Photo;

    var myphoto = new Photo('#create');

    myphoto.addClickHandler();
})(window);
