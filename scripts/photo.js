(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function Photo(selector) {
        if(!selector) {
            throw new Error('selectro provided');
        }
        this.$element = $(selector);
        console.log(this.$element);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }


    Photo.prototype.addClickHandler = function () {
        this.$element.on('click', function(event) {
            event.preventDefault();
            var mydropzone = $("div#mydropzone").dropzone({ url: "/file/post" });
            console.log('create');
        });
    };

    App.Photo = Photo;
    window.App = App;
})(window);
