document.open();
document.write("<!doctype html>\n");
document.write("<html lang=\"en\">\n");
document.write("<head>\n");
document.write("<meta charset=\"utf-8\" />\n");
document.write("<title>View Formatted Source - bookmarklet by skratchdot</title>\n");
document.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n");
document.write("<meta name=\"description\" content=\"view source, bookmarklet, bootstrap\" />\n");
document.write("<meta name=\"author\" content=\"skratchdot.com\" />\n");
document.write("\n");
document.write("<!-- Styles -->\n");
document.write("<link href=\"http://skratchdot.github.com/domFormat/bookmarklet/css/bootstrap.min.css\" rel=\"stylesheet\" />\n");
document.write("<link href=\"http://skratchdot.github.com/domFormat/bookmarklet/css/bookmarklet-helper.css\" rel=\"stylesheet\" />\n");
document.write("\n");
document.write("<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->\n");
document.write("<!--[if lt IE 9]>\n");
document.write("<script src=\"http://html5shim.googlecode.com/svn/trunk/html5.js\"></script>\n");
document.write("<![endif]-->\n");
document.write("</head>\n");
document.write("<body>\n");
document.write("<!-- navigation -->\n");
document.write("<div class=\"navbar\">\n");
document.write("<div class=\"navbar-inner\">\n");
document.write("<div class=\"container\">\n");
document.write("<ul class=\"nav\">\n");
document.write("<li data-page=\"home\" class=\"active divider-vertical\"><a href=\"javascript:void(0);\" class=\"brand\"><i class=\"icon-home\"></i> Home</a></li>\n");
document.write("<li data-page=\"formatted-source\" class=\"divider-vertical fix-left-margin\"><a href=\"javascript:void(0);\">View Formatted Source</a></li>\n");
document.write("<li data-page=\"unformatted-source\" class=\"divider-vertical fix-left-margin\"><a href=\"javascript:void(0);\">View Unformatted Source</a></li>\n");
document.write("</ul>\n");
document.write("<ul class=\"nav pull-right\">\n");
document.write("<li id=\"copy-container\" class=\"hide\"><button id=\"copy\" class=\"btn\" type=\"button\"><i class=\"icon-file\"></i> Copy Editor Text</button></li>\n");
document.write("<li><button id=\"reload\" class=\"btn\" type=\"button\"><i class=\"icon-refresh\"></i> Reload Page</button></li>\n");
document.write("</ul>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("\n");
document.write("<!-- just copied dialog -->\n");
document.write("<div id=\"just-copied\" class=\"modal hide fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n");
document.write("<div class=\"modal-header\">\n");
document.write("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&#215;</button>\n");
document.write("<h3 id=\"myModalLabel\">Copy complete!</h3>\n");
document.write("</div>\n");
document.write("<div class=\"modal-body\">\n");
document.write("<p>All of the editor contents have been copied to your clipboard.</p>\n");
document.write("</div>\n");
document.write("<div class=\"modal-footer\">\n");
document.write("<button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("\n");
document.write("<div class=\"container-fluid\">\n");
document.write("\n");
document.write("<!-- homepage -->\n");
document.write("<div id=\"home\">\n");
document.write("<div class=\"row-fluid\">\n");
document.write("<div class=\"hero-unit\">\n");
document.write("<h1>domFormat Bookmarklet</h1>\n");
document.write("<p>\n");
document.write("This is a tool for viewing the formatted source of a page.  To install\n");
document.write("it, drag the \"View Source\" link below to your bookmarks toolbar.  Visit\n");
document.write("any webpage, and click the bookmark you just saved.\n");
document.write("</p>\n");
document.write("<p>\n");
document.write("<a class=\"btn btn-primary btn-large bm-pretty\" href=\"javascript:void(0);\">-- View Source --</a>\n");
document.write("</p>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("<div class=\"row-fluid\">\n");
document.write("<div class=\"span6\">\n");
document.write("<h2>All Bookmarklets:</h2>\n");
document.write("<dl class=\"dl-horizontal\">\n");
document.write("<dt><a class=\"btn btn-primary btn-small bm-pretty\" href=\"javascript:void(0);\">View Source (pretty)</a></dt>\n");
document.write("<dd>\n");
document.write("This is the main bookmarklet. It allows you to view the formatted\n");
document.write("source as well as the original source in an editor with syntax highlighting.\n");
document.write("</dd>\n");
document.write("<br />\n");
document.write("\n");
document.write("<dt><a class=\"btn btn-primary btn-small bm-plain\" href=\"javascript:void(0);\">View Source (plain)</a></dt>\n");
document.write("<dd>\n");
document.write("This bookmarklet shows the formatted source in a &lt;textarea /&gt; element. It\n");
document.write("is quick, but does not have the extended options of the main bookmarklet.\n");
document.write("</dd>\n");
document.write("<br />\n");
document.write("\n");
document.write("<dt><a class=\"btn btn-primary btn-small bm-reload\" href=\"javascript:void(0);\">Reload Formatted</a></dt>\n");
document.write("<dd>\n");
document.write("This reloads the page with the formatted source.\n");
document.write("</dd>\n");
document.write("</dl>\n");
document.write("</div>\n");
document.write("<div class=\"span6\">\n");
document.write("<h2>Links / Credits:</h2>\n");
document.write("<p>\n");
document.write("The following libraries/tools were used in the\n");
document.write("creation of these bookmarklets:\n");
document.write("</p>\n");
document.write("<ul id=\"links\">\n");
document.write("<li><a href=\"http://skratchdot.com/projects/domFormat/\">domFormat</a></li>\n");
document.write("<li><a href=\"https://github.com/einars/js-beautify/\">JS Beautifier</a></li>\n");
document.write("<li><a href=\"https://github.com/senchalabs/cssbeautify/\">CSS Beautify</a></li>\n");
document.write("<li><a href=\"https://github.com/ajaxorg/ace/\">ACE Editor</a></li>\n");
document.write("<li><a href=\"http://twitter.github.com/bootstrap/\">Twitter Bootstrap</a></li>\n");
document.write("<li><a href=\"http://bootswatch.com/readable/\">Bootswatch (Readable Theme)</a></li>\n");
document.write("</ul>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("<div class=\"row-fluid\">\n");
document.write("<hr />\n");
document.write("<div class=\"pull-right\">\n");
document.write("&copy; 2012 <a class=\"footer-icon\" href=\"http://skratchdot.com/\">\n");
document.write("skratchdot\n");
document.write("<img width=\"16\" height=\"16\" alt=\"skratchdot\" src=\"http://skratchdot.com/favicon.ico\" />\n");
document.write("</a>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("</div>\n");
document.write("\n");
document.write("<!-- ace editor -->\n");
document.write("<div id=\"editor\"></div>\n");
document.write("\n");
document.write("</div>\n");
document.write("\n");
document.write("\n");
document.write("\n");
document.write("<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script src=\"http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script src=\"http://skratchdot.github.com/domFormat/bookmarklet/js/bootstrap.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script src=\"http://skratchdot.github.com/domFormat/bookmarklet/js/ZeroClipboard.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script src=\"http://skratchdot.github.com/domFormat/domFormat.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("<script src=\"http://skratchdot.github.com/domFormat/bookmarklet/js/bookmarklet-helper.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
document.write("</body>\n");
document.write("</html>\n");
document.close();
