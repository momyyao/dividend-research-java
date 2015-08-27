/**
 * Created by kwang on 8/26/2015.
 */
$(function () {
    $("input[name='theme']").change(function () {
        $("input[name='theme']:radio:checked").each(function() {
            var enhancement = $('#enhancement');
            var enhancementJs = enhancement.next();
            enhancement.remove();
            enhancementJs.remove();
            if ($(this).val() == 'classic') {
                $('#bs-css').attr('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
            } else {
                $('#bs-css').attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/' + $(this).val() + '/bootstrap.min.css');
            }
            $('head').append(enhancement);
            $('head').append(enhancementJs);
        });
    });

    var preview = $('#template');
    preview.id = "";
    var previewTemplate = preview.parent().html();
    preview.remove();
    var myDropzone = new Dropzone('div#upload', { // Make the whole upload block a dropzone
      url: "/upload", // Set the url
        maxFileSize: 1,
        acceptedFiles: "text/plain",
      thumbnailWidth: 80,
      thumbnailHeight: 80,
      parallelUploads: 1,
      previewTemplate: previewTemplate,
      autoQueue: false, // Make sure the files aren't queued until manually added
      previewsContainer: "#previews", // Define the container to display the previews
      clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });

    myDropzone.on("addedfile", function(file) {
      // Hookup the start button
      $(".start").click(function() { myDropzone.enqueueFile(file); });
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function(progress) {
      document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
    });

    myDropzone.on("sending", function(file) {
      // Show the total progress bar when upload starts
      document.querySelector("#total-progress").style.opacity = "1";
      // And disable the start button
      file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function(progress) {
      document.querySelector("#total-progress").style.opacity = "0";
    });

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    document.querySelector("#actions .start").onclick = function() {
      myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    };
    document.querySelector("#actions .cancel").onclick = function() {
      myDropzone.removeAllFiles(true);
    };

    showView('research');
});

function showView(view) {
    if (tickers.length == 0) {
        view ='upload';
    }
    $('.view').hide();
    $('#' + view).show();
    $('#navbar > ul:first-child > li.active').removeClass('active');
    $('#navbar > ul:first-child > li > a[ng-click="menu.show(\'' + view +'\')"]').parent().addClass('active');
}

var app = angular.module('divresearch', []);

app.controller('MenuController', function() {
    var menu = this;
    menu.show = function (view) {
        showView(view);
    }
});
