"use strict";

var fs = require('fs');
var gm = require('gm');

var inputDir = 'events';
var outputDir = 'public/events';
var quality = 100;
var format = 'jpg';

var options = [
    {
        'height': 116,
        'postfix': '_small'
    },
    {
        'height': 1160,
    }
];

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(function (file) {
    if (fs.lstatSync(inputDir + '/' + file).isFile()) {
        var fileName = file.substring(0, file.lastIndexOf('.'))
        var fileType = file.substring(file.lastIndexOf('.') + 1)
        options.forEach(function (option) {
            process(inputDir, outputDir, fileName, fileType, option);
        })
    }
});

function process(inputDir, outputDir, fileName, fileType, option) {
    var input = inputDir + '/' + fileName + '.' + fileType;
    var output = outputDir + '/' + fileName + (option.postfix ? option.postfix : '') + '.' + format;
    console.log('convert ' + input + ' to ' + output + '. ...')
    gm(input).resize(option.width, option.height).quality(quality).setFormat(format).write(output, function (err) {
        console.log('... ' + (err ? err : output) + ' successfully converted.');
    });
}