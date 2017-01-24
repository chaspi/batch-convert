"use strict";

var fs = require('fs');
var gm = require('gm');

var quality = 100;
var format = 'jpg';

exports.convert = function (inputDir, outputDir, options) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.readdirSync(inputDir).forEach(function (file) {
        if (fs.lstatSync(inputDir + '/' + file).isFile()) {
            var fileName = file.substring(0, file.lastIndexOf('.'))
            var fileType = file.substring(file.lastIndexOf('.') + 1)
            if (options) {
                options.forEach(function (option) {
                    process(inputDir, outputDir, fileName, fileType, option);
                })
            } else {
                process(inputDir, outputDir, fileName, fileType, option);
            }
        }
    });
};

function process(inputDir, outputDir, fileName, fileType, option) {
    var input = inputDir + '/' + fileName + '.' + fileType;
    var output = outputDir + '/' + fileName + (option.postfix ? option.postfix : '') + '.' + format;
    console.log('convert ' + input + ' to ' + output + '. ...');
    var image = gm(input);
    if (option) {
        image = image.resize(option.width, option.height);
    }
    image.quality(quality).setFormat(format).write(output, function (err) {
        console.log('... ' + (err ? err : output) + ' successfully converted.');
    });
}