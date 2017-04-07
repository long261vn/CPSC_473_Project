/*eslint-disable no-unused-vars*/

// =============================== Signup ===============================
$(document).ready(function() {
    $("#btnSignup").click(function() {
        //collect userName and password entered by users
        var userName = $("#username").val();
        var passWord = $("#password").val();
        var email = $("#email").val();
        var error = true;
        //call the authenticate function
        $.ajax({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: "http://localhost:3002/signup",
            dataType: 'json',
            async: false,
            //json object to sent to the authentication url
            data: {
                "username": userName,
                "password": passWord,
                "email": email
            },
            success: function() {
                //do any process for successful authentication here
                alert("You have successfully signed up! Please log-in to upload pictures");
            }
        });
    });
});


// =============================== Login ===============================
$(document).ready(function() {
    //event handler for login button
    $("#btnLogin").click(function() {
        //collect userName and password entered by users
        var user = $("#username").val();
        var pass = $("#password").val();
        var error = true;

        $.ajax({
            type: "GET",
            url: "http://localhost:3002/signup",
            dataType: 'json',
            success: function(data) {
                $.each(data, function(key, value) {
                    if (user == value.username && pass == value.password) {
                        error = false;
                    }
                });

                if (error == false) {
                    alert("You have successfully logged in!");
                    document.location = "upload.html";
                } else {
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
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3002/pics",
        dataType: 'json',
        success: function(data) {
            var i = 0;
            $.each(data, function(key, value) {
                $("#ul").append("<li class='myff' id='" + i + "' onclick='hello(this.id)'><p>Title: " + value.info + "</p><img src=" + value.pic + " id=\"image\"/><br /><br /></li>")
                i++;
            });
        }
    });
});

// ===================================================Modal Display of Images=============================================

function hello(id) {
    console.log("Hello World");
    console.log(id);
    var ii2 = document.getElementById("ii2");
    $.ajax({
        type: "GET",
        url: "http://localhost:3002/pics",
        dataType: 'json',
        success: function(data) {
            $.each(data, function(key, value) {
                if (key == id) {
                    var image = new Image();
                    image.src = value.pic;
                    $("#myModal").modal('show');
                    ii2.appendChild(image);
                    info.innerHTML = value.info;
                    title.innerHTML = value.info;

                    $('#myModal').on('hidden.bs.modal', function() {
                        ii2.innerHTML = "";
                        //  $('ul').on();
                    });
                }
            });
        }
    });
}

// =============================== Search ===============================
$(document).ready(function () {
    $("#btnSearch").click(function () {
        var searchInfo = $("#sinfo").val();
        var found = false;
        $.ajax
        ({
            type: "GET",
            url: "http://localhost:3002/pics",
            dataType: 'json',
            success: function (data) {
                $.each(data, function(key, value){
                    if(searchInfo == value.info){

                        $("#uls").append("<li >Title: " + value.info + "</li><img src="+value.pic+" id=\"image\"/><br /><br />");
                        found = true;
                        return;
                    }

                });
                if(found == true){
                    alert("found");
                }
                else {
                    alert(" NOT found");
                }
            }
        });
    });
});
