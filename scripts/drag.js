(function(){
    var $dropzone = $('.dropzone');
    var uploadedPic;
    $dropzone.on('dragover', function(event) {
        //event.preventDefault();
        //console.log(this);
        $dropzone.removeClass('dropzone');
        $dropzone.addClass('dropzone dragover');
        return false;
    })

    $dropzone.on('dragleave', function(event){
        //event.preventDefault();
        //console.log('leave');
        $dropzone.removeClass('dropzone dragover');
        $dropzone.addClass('dropzone');
        return false;
    })

    $dropzone.on('drop', function(event){
        event.preventDefault();
        //$('#input').hide();
        console.log('drop');
        $dropzone.removeClass('dropzone dragover');
        $dropzone.addClass('dropzone');
        uploadedPic=event.originalEvent.dataTransfer.files[0];
        console.log(uploadedPic);
        //console.log(event.originalEvent.dataTransfer.files[0]);
        preview(uploadedPic);
    })


    $dropzone.bind('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        if($('#preview')){
            $('#preview').hide();
            $('#preview').remove();
        }
        //$dropzone.unbind('click');
        console.log('click');
        $('#input').trigger('click');
        uploadedPic = $('#input')[0].files[0];

        preview(uploadedPic);

    })

    $('#input').on('change',function(event){
        event.stopPropagation();
        //event.preventDefault();
        uploadedPic = $('#input')[0].files[0];
        //console.log(uploadedPic);
        preview(uploadedPic);
    })

    var preview = function(data){
        $('#preview').remove();
        if (data) {
           var reader = new FileReader();

           reader.onload = function (e) {
               console.log(reader.result);
               var $prevImg = $('<img></img>')
               $prevImg.attr({
                   src:reader.result,
                   id:'preview'
               });
               $('[data-message="example"]').hide();
               $('.dropzone').append($prevImg);
           }
           reader.readAsDataURL(data);
       }

    }

    //======================submit the form=======================================
    //console.log($('[picture="form"]'));
    $('[picture="form"]').submit(function(event){
        event.preventDefault();
        var selectedFile = uploadedPic;//$('#input')[0].files[0];
        //watch the path
        var info = $("#info").val();
        selectedFile.convertToBase64(function(base64){
           //alert(base64);
           var pic = base64;
           upload(pic, info);
        })
    })


    // =============================== Upload Pics ===============================
    //you can do this once in a page, and this function will appear in all your files
    File.prototype.convertToBase64 = function(callback){
            var reader = new FileReader();
            reader.onload = function(e) {
                 callback(e.target.result);
            };
            reader.onerror = function(e) {
                 callback(null);
            };
            reader.readAsDataURL(this);
    };


    //drag and drop upload
    function upload(pic, info) {
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: "http://localhost:3002/pics",
            dataType: 'json',
            async: false,
            //json object to sent to the authentication url
            data: {"pic": pic, "info" : info},
            success: function () {
                //do any process for successful authentication here
                alert("Upload successfully!");

            }
        })
    }

}())
