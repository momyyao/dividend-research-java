/**
 * Created by kwang on 8/26/2015.
 */
$(function () {
    switchTheme($.cookie('currentTheme') == null ? 'Cyborg' : $.cookie('currentTheme'));
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
    var yql = '';
    if (typeof newTickers === 'string') {
        yql = newTickers.trim();
        newTickers = [].concat(newTickers);
    } else if (newTickers.length == 1) {
        yql = newTickers[0];
    } else {
        yql = encodeURIComponent('select symbol, Name, Currency, DividendShare, YearHigh, YearLow, ExDividendDate, DividendPayDate, DividendYield ' +
            'from yahoo.finance.quotes where symbol in ("' + newTickers.join("\",\"") + '")');
    }
    $.getJSON('https://query.yahooapis.com/v1/public/yql?q='
                            + yql + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
        function(response){
            if (response.query.results && response.query.results.quote) {
                for (var i in response.query.results.quote) {
                    var quote = response.query.results.quote[i];
                    if (quote.ExDividendDate) {
                        quote.ExDividendDate = moment(quote.ExDividendDate);
                    }
                    if (quote.DividendPayDate) {
                        quote.DividendPayDate = moment(quote.DividendPayDate);
                    }
                    var now = moment().format('YYYY-MM-DD');
                    var aYearAgo = moment().subtract(1, 'y').format('YYYY-MM-DD');
                    var historyYql = encodeURIComponent('select Date from yahoo.finance.dividendhistory where symbol = "' + quote.symbol + '" and startDate = "' + aYearAgo + '" and endDate = "' + now + '"');
                    $.getJSON('https://query.yahooapis.com/v1/public/yql?q='
                        + historyYql + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(history) {
                        if (history.query.results && history.query.results.quote) {
                            var frequency = history.query.results.quote.length;
                            if (frequency >= 12) {
                                quote.dividendFrequency = 'Monthly';
                            } else if (frequency >= 4) {
                                quote.dividendFrequency = 'Quarterly';
                            } else {
                                quote.dividendFrequency = 'Irregular';
                            }
                        } else {
                            quote.dividendFrequency = 'No Info.';
                        }
                        $.ajax({
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            'type': 'POST',
                            'url': '/add',
                            'data': JSON.stringify(quote),
                            'dataType': 'json',
                            'success': function(resp) {
                                if (resp) {
                                    console.log(resp.symbol + ' has been added!');
                                    ticker.push(resp);
                                }
                            }
                        });
                    });
                }
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

function switchTheme (theme) {
    if (theme && ($.cookie('currentTheme') != theme || !$('#themes > li > a[ng-click="menu.changeTheme(\'' + theme +'\')"]').parent().hasClass('active'))) {
        $('#themeLabel').html(theme);
        if (theme.toLowerCase() == 'classic') {
            $('#bs-css').attr('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
        } else {
            $('#bs-css').attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/' + theme.toLowerCase() + '/bootstrap.min.css');
        }
        $('#themes > li.active').removeClass('active');
        $('#themes > li > a[ng-click="menu.changeTheme(\'' + theme +'\')"]').parent().addClass('active');
        $.cookie('currentTheme', theme, {expires: 365});
    }
}

var app = angular.module('divresearch', []);

app.controller('MenuController', function() {
    var menu = this;
    menu.show = function (view) {
        showView(view);
    };
    menu.changeTheme = switchTheme;
});
