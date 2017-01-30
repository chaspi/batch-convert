batch-convert
=============

A small library to convert images or pdf files from a source to a target folder in a 
different format and size. For one source file the output can be several images in 
different sizes and formats by providing an array of options.

## Installation

    npm install batch-convert --save

## Usage

    var bc = require('batch-convert')
    var options = [
        {
            'height': 400,
            'postfix': '_small'
        },
        {
            'height': 1200,
            'postfix': '_big'
        }
    ];
    bc.convert("input", "output", options)

This will copy and convert all images in the folder input to the folder output by creating a small and a big version. 
The small version will get the postfix '_small' with a height of 400px and the big version with the postfix 
'_big' and 1200px height. The with will be changed depending on the ratio. By default the output format is jpg with
a quality of 100.

__possible options__:

    {
        'height': [in pixel]
        'width': [in pixel]
        'postfix': [allowed fs characters]
        'quality': [0-100], default = 100
        'format': [jpg, png, gif, ...], default = 'jpg'
    }
    

## Tests

  npm test

## Release History

* 0.1.0 - Initial release
* 0.1.1 - Typos, default value for output
* 0.1.2 - Default value for input, jsdoc