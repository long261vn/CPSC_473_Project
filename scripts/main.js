/*eslint-disable no-unused-vars*/

function readImage(inputElement) {
    var deferred = $.Deferred();

    var files = inputElement.get(0).files;
    if (files && files[0]) {
        var fr= new FileReader();
        fr.onload = function(e) {
            deferred.resolve(e.target.result);
        };
        fr.readAsDataURL( files[0] );
    } else {
        deferred.resolve(undefined);
    }

    return deferred.promise();
}

$("#input").on('change',function(){
    readImage($(this)).done(function(base64Data){
        alert(base64Data);
        var info = $("#info").val();
        var pic = base64Data;
        upload(pic, info);
    });
});

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

        }
    })
}

// =============================== Signup ===============================
$(document).ready(function () {
    $("#btnSignup").click(function () {
        //collect userName and password entered by users
        var userName = $("#username").val();
        var passWord = $("#password").val();
        var email = $("#email").val();

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
                $("ul").append("<li>Title: " + value.info + "</li><img src="+value.pic+" id=\"image\"/><br /><br />");

            });
        }
    });
});
