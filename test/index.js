"use strict";

var fs = require('fs');
var bc = require('../index.js');
var expect = require('chai').expect;

var options = [
    {
        'height': 116,
        'postfix': '_dir'
    }
];

describe('Covert pdf into image', function () {
    it('Create jpg file from folder', function (done) {
        this.timeout(10000);
        bc.convert("test/input", "test/output", options, function () {
            expect(fs.existsSync("test/output/test_dir.jpg")).to.be.true
            done();
        })
    })
    it('Create jpg file from file', function (done) {
        this.timeout(10000);
        options[0].postfix = '_file'
        bc.convert("test/input/test.pdf", "test/output", options, function () {
            expect(fs.existsSync("test/output/test_file.jpg")).to.be.true
            done();
        })
    })
});