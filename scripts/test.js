(function(window){
    'use strict'
    var $ = window.jQuery;
    var title = $('#title');
    var description = $('#description');
    Dropzone.options.dzForm={

        url: "http://localhost:3002/pics",
        autoProcessQueue:false,
        sending: function(file, xhr, formData) {
            //console.log(formData);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.open("POST", 'http://localhost:3002/pics', true);
            formData.append("title", title.val());
            formData.append("description", description.val());

            for (var pair of formData.entries()) {
                console.log(pair);
                $.post('http://localhost:3002/pics', pair, function(serverResponse) {
                console.log(serverResponse);
                });
            }
            console.log(file);
        },
        init:function(){
            var dropzone = this

            $('.dropzone').submit(function( event ) {
                console.log(dropzone);
                console.log( $( dropzone ).serializeArray() );
                event.preventDefault();
                dropzone.processQueue();
            });
        }
    }



})(window);
