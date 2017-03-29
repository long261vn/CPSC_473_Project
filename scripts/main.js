(function(window) {
    'use strict';
    var App = window.App;
    var Photo = App.Photo;

    var myphoto = new Photo('#create');
    myphoto.addClickHandler();
    myphoto.addSubmitHandler();
})(window);
