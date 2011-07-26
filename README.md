 domFormat - v1.0 (Released July 25, 2011)
===========================================
  
### Description ###
domFormat is a simple javascript library to get DOM nodes as formatted/pretty
strings.  It provides a simple API with 2 functions:  
    domFormat.init(settings);  
    domFormat.getString(node);  
  
I created it as a way to help compare the generated source of 2 pages when
doing development.  Before creating this library, I had searched for another
library to do something similar, but everything I evaluated gave results
that were formatted slightly different than they way I wanted.  
  
This code is designed to run in the browser, and uses the browser's native 
DOM parsing to create a "prettified" string.  
  
  
### Links ###
[Source Code / Download](https://github.com/skratchdot/domFormat)  
[Examples](https://skratchdot.github.com/domFormat/examples/index-html5.html)  
  
  
### Libraries Used / Included ###
[CSS Beautify](https://github.com/senchalabs/cssbeautify)
 - Originally written by Ariya Hidayat
 - Copyright (C) 2011 Sencha Inc.  

[JS Beautifier](https://github.com/einars/js-beautify)
 - Originally written by Einar Lielmanis
  
  
### Browser Support ###
Most modern browsers are supported with the caveat that IE support/output
is somewhat strange.  
  
IE Quirks/Bugs:  
  * Tag names will be in all uppercase because IE doesn't support 
    node.prefix and node.localName when parsing DOM nodes  
  * For the same reason above, namespaces will not be printed
    correctly: <svg:svg /> will turn into <SVG />  
  * <style /> and <script /> tags lose their contents
  * Doctype nodes are treated as a comment (standards vs quirks mode)
  
  
### Bookmarklets ###

[Reload Page With Formatted Source](javascript:(function(){var%20doc%3Ddocument.cloneNode(true)%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement('script')%3Bscript.setAttribute('src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js')%3Bscript.addEventListener('load'%2Cfunction()%7Bvar%20domString%3DdomFormat.getString(doc)%3Bdocument.write(domString)%3Bdocument.close()%3B%7D%2Cfalse)%3Bdocument.body.appendChild(script)%3B}());)  

    javascript:(function() {
    	var doc = document.cloneNode(true) || document;
    	var script = document.createElement('script');
    	script.setAttribute('src', 'http://skratchdot.github.com/domFormat/domFormat.min.js');
    	script.addEventListener('load', function() {
    		var domString = domFormat.getString(doc);
    		document.write(domString);
    		document.close();
    	}, false);
    	document.body.appendChild(script);
    }());

[Show Source](javascript:(function(){var%20doc%3Ddocument.cloneNode(true)%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement('script')%3Bscript.setAttribute('src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js')%3Bscript.addEventListener('load'%2Cfunction()%7Bvar%20domString%3DdomFormat.getString(doc)%3Bdocument.write('%3Ctextarea%20id%3D%22showSource%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bwhitespace%3Anowrap%3B%22%3E%3C%2Ftextarea%3E')%3Bdocument.getElementById('showSource').value%3DdomString%3Bdocument.close()%3B%7D%2Cfalse)%3Bdocument.body.appendChild(script)%3B}());)  

    javascript:(function() {
    	var doc = document.cloneNode(true) || document;
    	var script = document.createElement('script');
    	script.setAttribute('src', 'http://skratchdot.github.com/domFormat/domFormat.min.js');
    	script.addEventListener('load', function() {
    		var domString = domFormat.getString(doc);
    		document.write('<textarea id="showSource" style="width:100%;height:100%;border:0;margin:0;padding:0;whitespace:nowrap;"></textarea>');
    		document.getElementById('showSource').value = domString;
    		document.close();
    	}, false);
    	document.body.appendChild(script);
    }());
  
  
### Version History ###

#### v1.0 - Released July 25, 2011 ####
  * Initial Release
  * Known Bugs:
    1) IE Quirks/Bugs listed in the Browser Support section above
    2) Unsupported node types:
      *  Node.ENTITY_REFERENCE_NODE === 5
      *  Node.ENTITY_NODE === 6
      *  Node.PROCESSING_INSTRUCTION_NODE === 7
      *  Node.NOTATION_NODE === 12
  
  