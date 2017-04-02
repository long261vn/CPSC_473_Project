(function(window) {
        'use strict';

        var App = window.App || {};
        var $ = window.jQuery;

        function Photo(selector) {
            if (!selector) {
                throw new Error('selectro provided');
            }
            // Disable auto discover for all elements:
            Dropzone.autoDiscover = false;
            this.$myForm = $('#myForm');
            this.$element = $(selector);
            console.log(this.$element);
            if (this.$element.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }

        Photo.prototype.addClickHandler = function() {
            this.$element.on('click', function(event) {
                    event.preventDefault();
                    $('#uploadModal').modal('show');
                    //var mydropzone = $('#photoUpload').dropzone({ url: "/file/post" });
                    var myForm = this.$myForm;
                    $(document).ready(function() {
                            var mydz = $("#photoUpload").dropzone({
                                    url: "http://localhost:3000/photos",
                                    method: 'POST',
                                    dataType: 'JSON',
                                    maxFiles: 1,
                                    autoProcessQueue: false,
                                    addRemoveLinks: true,
                                    clickable: true,
                                    headers: {
                                        "photoName": "test"
                                    },
                                    maxfilesexceeded: function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    },

                                    init: function() {
                                        var myDropzone = this;
                                        myDropzone.on("sending", function(files, xhr, formData) {
                                            var attaches = $("input[type=text]").filter(function() {
                                            return this.files.length > 0;
                                        });)
                                                // Here's the change from enyo's tutorial...
                                        $("#submit-all").click(function(e) {
                                            var myForm = $("myForm");
                                            e.preventDefault();
                                            e.stopPropagation();

                                            myDropzone.processQueue();
                                        });
                                    },
                                    success: function(file, response) {
                                        console.log("respnse" + response);
                                        var imgName = response;
                                        file.previewElement.classList.add("dz-success");
                                        console.log("Successfully uploaded :" + imgName);

                                    }
                                    });
                            });
                    });
            };

            Photo.prototype.addSubmitHandler = function() {


                this.$myForm.on('submit', function(event) {
                    evnt.preventDefault();
                    var data = {};
                    console.log("Submit!!! " + this.$myForm);
                })
                /*
                var form = this;
                console.log('Setting submit handler for form');
                this.$formElement.on('submit', function (event) {
                    event.preventDefault();
                    var data = {};
                    $(this).serializeArray().forEach(function(item) {
                        data[item.name] = item.value;
                        console.log(item.name + ' is ' + item.value);
                    });
                    console.log(data);
                    this.reset();
                    this.elements[0].focus();
                });
                */
            };









            App.Photo = Photo;
            window.App = App;
        })(window);
