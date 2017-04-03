/*eslint-disable no-unused-vars*/

// function readImage(inputElement) {
//     var deferred = $.Deferred();
//
//     var files = inputElement.get(0).files;
//     if (files && files[0]) {
//         var fr= new FileReader();
//         fr.onload = function(e) {
//             deferred.resolve(e.target.result);
//         };
//         fr.readAsDataURL( files[0] );
//     } else {
//         deferred.resolve(undefined);
//     }
//
//     return deferred.promise();
// }
//
// $("#input").on('change',function(){
//     readImage($(this)).done(function(base64Data){
//         //alert(base64Data);
//         var info = $("#info").val();
//         var pic = base64Data;
//         upload(pic, info);
//     });
// });
//
// function upload(pic, info) {
//     $.ajax
//     ({
//         type: "POST",
//         //the url where you want to sent the userName and password to
//         url: "http://localhost:3002/pics",
//         dataType: 'json',
//         async: false,
//         //json object to sent to the authentication url
//         data: {"pic": pic, "info" : info},
//         success: function () {
//             //do any process for successful authentication here
//             alert("Upload successfully!");
//
//         }
//     })
// }

// =============================== Signup ===============================
$(document).ready(function () {
    $("#btnSignup").click(function () {
        //collect userName and password entered by users
        var userName = $("#username").val();
        var passWord = $("#password").val();
        var email = $("#email").val();
        var error = true;
        //call the authenticate function
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: "http://localhost:3002/signup",
            dataType: 'json',
            async: false,
            //json object to sent to the authentication url
            data: {"username": userName , "password" : passWord , "email" : email },
            success: function () {
                //do any process for successful authentication here
                alert("You have successfully signed up! Please log-in to upload pictures");
            }
        });
    });
});


// =============================== Login ===============================
$(document).ready(function () {
    //event handler for login button
    $("#btnLogin").click(function () {
        //collect userName and password entered by users
        var user = $("#username").val();
        var pass = $("#password").val();
        var error = true;

        $.ajax
        ({
            type: "GET",
            url: "http://localhost:3002/signup",
            dataType: 'json',
            success: function (data) {
                $.each(data, function(key, value){
                    if(user == value.username && pass == value.password){
                        error = false;
                    }
                });

                if(error == false){
                    alert("You have successfully logged in!");
                    document.location="upload.html";
                }
                else {
                    $("#username").val('');
                    $("#password").val('');
                    alert("wrong user or password!");
                }
            }
        });

        return false;
    });
});

// =============================== Read pics and display to screen ===============================
$(document).ready(function () {
    $.ajax
    ({
        type: "GET",
        url: "http://localhost:3002/pics",
        dataType: 'json',
        success: function (data) {
            $.each(data, function (key, value) {
                $("#ul").append("<li >Title: " + value.info + "</li><img src="+value.pic+" id=\"image\"/><br /><br />");
                // $("ul").append('<li class="thumbnail-item"> ', +
                // '    <a href='+ value.pic +' data-image-role="trigger" data-image-title="Night Fever" data-image-url='+ value.pic +'> ', +
                // '        <img class="thumbnail-image" src= '+ value.pic +' id=\"image\" alt= '+ value.info + '> ', +
                // '        <span class="thumbnail-title">Lesley</span> ', +
                // '    </a> ', +
                // '</li> ' );

                //$("image").append('<img class="btn btn-default" data-toggle="modal" data-target="#myModal src='+ value.pic +' alt= '+ value.info +' width="300" height="200">');
            });
        }
    });
});

// ===================================================Modal Display of Images=============================================
$(document).ready(function() {
    //event handler for login button
    var ii2 = document.getElementById("ii2");
    $('ul').on('click', function() {
        $.ajax({
            type: "GET",
            url: "http://localhost:3002/pics",
            dataType: 'json',
            success: function(data) {
                $.each(data, function(key, value) {
                    var image = new Image();
                    image.src = value.pic;
                    $("#myModal").modal('show');
                    ii2.appendChild(image);
                    info.innerHTML = value.info;
                    title.innerHTML = value.info;

                    $('#myModal').on('hidden.bs.modal', function() {
                        ii2.innerHTML = "";
                        $('ul').on();
                    });

                });
            }
        });
    });
});
