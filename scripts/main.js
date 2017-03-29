/*eslint-disable no-unused-vars*/

(function(window) {
    'use strict';
    var App = window.App;
    var Photo = App.Photo;

    var myphoto = new Photo('#create');
    myphoto.addClickHandler();
})(window);


// =============================== Upload Pics ===============================
//you can do this once in a page, and this function will appear in all your files
File.prototype.convertToBase64 = function(callback){
        var reader = new FileReader();
        reader.onload = function(e) {
             callback(e.target.result)
        };
        reader.onerror = function(e) {
             callback(null);
        };
        reader.readAsDataURL(this);
};

$("#input").on('change',function(){
    var selectedFile = this.files[0];
    var info = $("#info").val();
    selectedFile.convertToBase64(function(base64){
       alert(base64);
       var pic = base64;
       upload(pic, info);
    })
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
