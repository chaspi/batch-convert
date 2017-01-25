"use strict";

var fs = require('fs');
var gm = require('gm');
var pa = require('path');

var quality = 100;
var format = 'jpg';

function countingCallback(array, callback) {
    var i = 0;
    return function () {
        if (++i == array.length) {
            callback();
        }
    }
}

exports.convert = function (inputDir, outputDir, options, callback) {
    if (fs.lstatSync(outputDir).isDirectory() && !fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    if (fs.lstatSync(inputDir).isFile()) {
        var file = pa.basename(inputDir)
        inputDir = pa.dirname(inputDir)
        processFile(inputDir, outputDir, options, file, callback);
    } else {
        var files = fs.readdirSync(inputDir);
        var cc = countingCallback(files, callback);
        files.forEach(function (file) {
            if (fs.lstatSync(inputDir + '/' + file).isFile()) {
                processFile(inputDir, outputDir, options, file, cc);
            } else {
                cc();
            }
        });
    }
};

function processFile(inputDir, outputDir, options, file, callback) {
    var fileName = file.substring(0, file.lastIndexOf('.'))
    var fileType = file.substring(file.lastIndexOf('.') + 1)
    if (options) {
        var cc = countingCallback(options, callback);
        options.forEach(function (option) {
            process(inputDir, outputDir, fileName, fileType, option, cc);
        })
    } else {
        process(inputDir, outputDir, fileName, fileType, option, callback);
    }
}

function process(inputDir, outputDir, fileName, fileType, option, callback) {
    var input = inputDir + '/' + fileName + '.' + fileType;
    var output = outputDir + '/' + fileName + (option.postfix ? option.postfix : '') + '.' + format;
    console.log('convert ' + input + ' to ' + output + '. ...');
    var image = gm(input);
    if (option) {
        image = image.resize(option.width, option.height);
    }
    image.quality(quality).setFormat(format).write(output, function (err) {
        console.log('... ' + (err ? err : output) + ' successfully converted.');
        if (callback) {
            callback();
        }
    });
}