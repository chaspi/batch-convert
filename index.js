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
            if (callback) {
                callback();
            }
        }
    }
}

/**
 * @callback callback
 */

/**
 * Converts all files in the source folder or the source file into the destination formats
 * defined by the options into the target directory.
 * 
 * @param {string} [input=.] - the input directory or file
 * @param {string} [outputDir=.] - the output directory
 * @param {{width: number, height: number, postfix: string, quality: number, format: string}[]} options - 
 *              the convert options applied to each input.
 * @param {callback} callback - an optional callback.
 */
exports.convert = function (input = '.', outputDir = '.', options, callback) {
    // Create output dir if it does not exist already
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    if (fs.lstatSync(input).isFile()) { // Handle files
        var file = pa.basename(input)
        input = pa.dirname(input)
        processFile(input, outputDir, options, file, callback);
    } else { // Handle dirs
        var files = fs.readdirSync(input);
        var cc = countingCallback(files, callback);
        files.forEach(function (file) {
            if (fs.lstatSync(input + '/' + file).isFile()) {
                processFile(input, outputDir, options, file, cc);
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
    var output = outputDir + '/' + fileName + (option.postfix ? option.postfix : '') + '.' + (option.format || format);
    console.log('convert ' + input + ' to ' + output + '. ...');
    var image = gm(input);
    if (option) {
        image = image.resize(option.width, option.height);
    }
    image.quality(option.quality || quality).setFormat(option.format || format).write(output, function (err) {
        console.log('... ' + (err ? err : output) + ' successfully converted.');
        if (callback) {
            callback();
        }
    });
}