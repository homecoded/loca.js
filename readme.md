loca.js
=======

This is a complete client-side localization module for web apps written in JavaScript.

It uses data-attributes to flag elements that should be translated. For texts use spans. Buttons are also supported.
Variables in the translations are supported.

Code-Example
------------

HTML:

    <!-- The span content will be automatically replaced with the entry "txt_loca_1" from the dictionary -->
    <span data-loca-id="txt_loca_1"></span>

    <!-- The button value will be automatically translated, requires an id -->
    <input type="button" id="button_example" value="txt_button">

JavaScript:

    // create a dictionary
    var loca__dictionary = {
        "txt_loca_1":
            [
                    "loca.js - a client-side localization framework in JavaScript",
                    "loca.js - eine client-seitiges Lokalisierungs-Framework in JavaScript"
            ],
        "txt_button":
            [
                    "My button",
                    "Mein Knopf"
            ]
    };

    // define the languages
    var LNG_ENGLISH = 0, LNG_GERMAN = 1;

    // initalize dictionary
    loca.setDict(loca__dictionary);

    // translate everything on the page to english (language with id 0)
    loca.applyLocalization(LNG_ENGLISH);

Compatibility
-------------

Firefox, Chrome, IE8+

License
-------

The MIT License (MIT)

Copyright (c) 2014 Manuel Rülke, homecoded

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.