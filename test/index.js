"use strict";

var fs = require('fs');
var bc = require('../index.js');

var options = [
    {
        'height': 116,
        'postfix': '_small'
    }
];

describe('Covert pdf into image', function () {
    it('Create jpg file', function (done) {
        bc.convert("test", "test/output", options)
        done();
    })
});