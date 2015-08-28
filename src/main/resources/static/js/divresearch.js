/**
 * Created by kwang on 8/26/2015.
 */
$(function () {
    showView('research');

    $('#import-file-select').change(function (){
        processFiles(this.files);
    });

    $('#upload').on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();

        e.originalEvent.dataTransfer.dropEffect = "copy";
    });

    $('#upload').on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        processFiles(e.originalEvent.dataTransfer.files);
    });
});

var reader = new FileReader();
reader.onload = function () {
    var lines = this.result.split('\n');
    var filtered = [];
    for (var i in lines) {
        if (lines[i].trim() != '' && $.inArray(lines[i].trim(), filtered) == -1) {
            filtered.push(lines[i].trim());
        } else if (lines[i].trim() != '') {
            console.log('removing duplicate ticker: ' + lines[i]);
        }
    }
    if (lines.length > filtered.length) {
        console.log((lines.length - filtered.length) + ' duplicate/empty tickers removed!');
    }
    lines = filtered;
    if (tickers.length != 0) {
        filtered = [];
        for (var i in lines) {
            var exist = false;
            for (var j in tickers) {
                if (tickers[j].Symbol == lines[i]) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                filtered.push(lines[i]);
            }
        }
        if (lines.length > filtered.length) {
            console.log((lines.length - filtered.length) + ' existing tickers removed!');
        }
        lines = filtered;
    }
    console.log(lines.length + ' tickers to be added...');
    while (lines.length > 1000) {
        lookupTickeronYahoo(lines.splice(0, 1000));
    }
    if (lines.length > 0) {
        lookupTickeronYahoo(lines);
    }
};

reader.onprogress = function(e) {
    if (e.lengthComputable) {
        var percentage = Math.round((e.loaded * 100) / e.total);
        console.log('Loaded : ' + percentage + '%');
    }
};

function lookupTickeronYahoo(newTickers) {
    var single = '';
    if (typeof newTickers === 'string') {
        single = newTickers.trim();
        newTickers = [].concat(newTickers);
    } else if (newTickers.length == 1) {
        single = newTickers[0];
    } else {
        single = encodeURIComponent(newTickers.join("\",\""));
    }
    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'
                            + single + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
        function(response){
            if (response.query.results && response.query.results.quote) {
                tickers = tickers.concat(response.query.results.quote);
                if (newTickers.length > response.query.results.quote.length) {
                    console.log('Only ' + response.query.results.quote.length + ' out of ' + newTickers.length + ' new ticker matches found!')
                }
            }
        });
}

function processFiles(files) {
    if (files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.type != 'text/plain') {
                console.log('Only text files will be allowed!');
            } else if (file.size > 200000) {
                console.log('File cannot exceed 200KB!');
            } else {
                console.log('Processing ' + file.name);
                reader.readAsText(file);
            }
        }
    }
}

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
    };
    menu.changeTheme = function (theme) {
        $('#themeLabel').html(theme);
        if (theme.toLowerCase() == 'classic') {
            $('#bs-css').attr('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
        } else {
            $('#bs-css').attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/' + theme.toLowerCase() + '/bootstrap.min.css');
        }
        $('#themes > li.active').removeClass('active');
        $('#themes > li > a[ng-click="menu.changeTheme(\'' + theme +'\')"]').parent().addClass('active');
    }
});
