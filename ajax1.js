$(document).ready(function() {
    //event handler for login button
    var ii2 = document.getElementById("ii2");
    $('img').on('click', function() {
        var user = this.id;
        $.ajax({
            type: "GET",
            url: "http://localhost:3002/pics",
            dataType: 'json',
            success: function(data) {
                $.each(data, function(key, value) {
                    if (user == this.id) {
                        var image = new Image();
                        image.src = this.pic;
                        $("#myModal").modal('show');
                        ii2.appendChild(image);
                        info.innerHTML=this.info;
                        title.innerHTML=this.info;

                        $('#myModal').on('hidden.bs.modal', function() {
                            ii2.innerHTML = "";
                            $('img').on();
                        });

                    }
                });


            }
        });
    });

});
