document.open();
document.write("<!doctype html>\n");
document.write("<html>\n");
document.write("<head>\n");
document.write("<meta charset=\"utf-8\" />\n");
document.write("<title>View Formatted Source - bookmarklet by skratchdot</title>\n");
document.write("<style type=\"text/css\">\n");
document.write("html, body, h1, div {\n");
document.write("border: 0;\n");
document.write("margin: 0;\n");
document.write("padding: 0;\n");
document.write("}\n");
document.write("body {\n");
document.write("background: #000;\n");
document.write("}\n");
document.write("h1 {\n");
document.write("font-family: Georgia,\"Palatino Linotype\",\"Times New Roman\",serif;\n");
document.write("padding: 10px;\n");
document.write("background: #ddd;\n");
document.write("clear: both;\n");
document.write("float: none;\n");
document.write("}\n");
document.write("h1 small {\n");
document.write("font-size: 12px;\n");
document.write("}\n");
document.write("h1 small a {\n");
document.write("color: #c80000;\n");
document.write("text-decoration: none;\n");
document.write("}\n");
document.write("#copy-container {\n");
document.write("width: 32px;\n");
document.write("height: 32px;\n");
document.write("float: right;\n");
document.write("cursor: pointer;\n");
document.write("position: relative;\n");
document.write("}\n");
document.write("#copy {\n");
document.write("width: 32px;\n");
document.write("height: 32px;\n");
document.write("}\n");
document.write("#editor {\n");
document.write("position: relative;\n");
document.write("}\n");
document.write("</style>\n");
document.write("</head>\n");
document.write("<body>\n");
document.write("<h1 id=\"header\">\n");
document.write("View Formatted Source\n");
document.write("<small>\n");
document.write("bookmarklet by\n");
document.write("<a href=\"http://skratchdot.com/\">skratchdot</a>\n");
document.write("/\n");
document.write("install:\n");
document.write("<a href=\"javascript:(function(d){\n");
document.write("var s, ds, doc = d.cloneNode(true) || d;\n");
document.write("l = function (u, fn) {\n");
document.write("  s = d.createElement('script'),\n");
document.write("  s.setAttribute('src', u);\n");
document.write("  s.addEventListener('load', fn, false);\n");
document.write("  d.body.appendChild(s);\n");
document.write("};\n");
document.write("l('http://skratchdot.github.com/domFormat/domFormat.min.js', function () {\n");
document.write("  ds = domFormat.getString(doc);\n");
document.write("  l('http://skratchdot.github.com/domFormat/bookmarklet/view-source.js', function () {\n");
document.write("    window.ds = ds;\n");
document.write("  });\n");
document.write("});\n");
document.write("}(document));\">View Formatted Source</a>\n");
document.write("</small>\n");
document.write("<div id=\"copy-container\">\n");
document.write("<img\n");
document.write("id=\"copy\"\n");
document.write("src=\"http://skratchdot.github.com/domFormat/bookmarklet/copy.png\"\n");
document.write("alt=\"Copy formatted source to clipboard\"\n");
document.write("title=\"Copy formatted source to clipboard\"\n");
document.write("/>\n");
document.write("</div>\n");
document.write("</h1>\n");
document.write("<div id=\"editor\">\n");
document.write("This is a bookmarklet that uses the following libraries to display\n");
document.write("the formatted html of a given page:\n");
document.write("\n");
document.write("- domFormat: https://github.com/skratchdot/domFormat/\n");
document.write("- CSS Beautify: https://github.com/senchalabs/cssbeautify/\n");
document.write("- JS Beautifier: https://github.com/einars/js-beautify/\n");
document.write("- ACE Editor: https://github.com/ajaxorg/ace/\n");
document.write("\n");
document.write("To install it, drag the red \"View Formatted Source\" link to your\n");
document.write("bookmarks toolbar.\n");
document.write("\n");
document.write("To use it, visit a webpage, and click the bookmarklet.\n");
document.write("\n");
document.write("To copy the contents of this editor, click the copy icon in the\n");
document.write("top right corner of this webpage.\n");
document.write("</div>\n");
document.write("<script src=\"http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script src=\"http://skratchdot.github.com/domFormat/bookmarklet/ZeroClipboard.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script>\n");
document.write("(function () {\n");
document.write("var elem = (document.compatMode === \"CSS1Compat\") ? document.documentElement : document.body,\n");
document.write("height = elem.clientHeight,\n");
document.write("header = document.getElementById('header'),\n");
document.write("editor = document.getElementById('editor'),\n");
document.write("copy = document.getElementById('copy'),\n");
document.write("doc = '', domString = '', clip;\n");
document.write("\n");
document.write("// Make sure our \"source\" div fills the screen.  ACE editor doesn't allow percentages\n");
document.write("editor.style.height = (height - header.clientHeight) + 'px';\n");
document.write("\n");
document.write("// Now initialize our editor\n");
document.write("window.editor = ace.edit('editor');\n");
document.write("window.editor.setTheme('ace/theme/twilight');\n");
document.write("window.editor.getSession().setMode('ace/mode/html');\n");
document.write("\n");
document.write("// Add functionality to copy button\n");
document.write("ZeroClipboard.setMoviePath('http://skratchdot.github.com/domFormat/bookmarklet/ZeroClipboard.swf');\n");
document.write("clip = new ZeroClipboard.Client();\n");
document.write("clip.setText('');\n");
document.write("clip.glue('copy', 'copy-container');\n");
document.write("clip.addEventListener('onMouseDown', function () {\n");
document.write("clip.setText(window.editor.getValue());\n");
document.write("});\n");
document.write("clip.addEventListener('onComplete', function () {\n");
document.write("alert('The editor contents have been copied to your clipboard.');\n");
document.write("window.editor.focus();\n");
document.write("});\n");
document.write("\n");
document.write("// Populate editor with domFormat string if it exists\n");
document.write("if (window.hasOwnProperty('ds')) {\n");
document.write("window.editor.setValue(ds);\n");
document.write("window.editor.clearSelection();\n");
document.write("}\n");
document.write("}());\n");
document.write("</script>\n");
document.write("</body>\n");
document.write("</html>\n");
document.close();