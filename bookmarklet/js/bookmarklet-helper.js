/*global window, document, alert, jQuery, $, ace, ZeroClipboard, domFormat, s1, s2 */
/*jslint devel: false, nomen: true, maxerr: 50, indent: 4 */

// set bookmarklet version
// we will show an alert box if the version ever becomes outdated.
var BMV = '1.1';

var BM = (function () {
	'use strict';

	var api = {},
		clip,
		editor,
		// cached jquery items
		$navLinks,
		// bookmarklets
		bookmarkPretty,
		bookmarkPlain,
		bookmarkReload,
		getBookmark,
		// private functions
		initEditor,
		ensureSource,
		handleNavClick,
		handleReloadPage,
		handleResize;


	// define bookmarklet "View Source (pretty)"
	bookmarkPretty = function (d, w) {
		var doc = d.cloneNode(true) || d,
			s = d.createElement('script');
		s.setAttribute('src', 'http://projects.skratchdot.com/domFormat/domFormat.min.js');
		s.addEventListener('load', function () {
			var i;
			if (w.localStorage) {
				w.localStorage.s1 = domFormat.getString(doc);
				w.localStorage.s2 = d.getElementsByTagName('html')[0] ? d.getElementsByTagName('html')[0].outerHTML || '' : '';
			} else {
				alert('Sorry. This bookmarklet only works on browsers that support localStorage.');
			}
			d.open();
			d.write('<style>html,body,iframe{width:100%;height:100%;padding:0;margin:0;border:0}</style><iframe id="i"></iframe>');
			d.close();
			i = d.getElementById('i');
			i = i.contentWindow || i.contentDocument;
			i.document.open();
			i.document.write('<script src="http://projects.skratchdot.com/domFormat/bookmarklet/view-source.js"></script>');
			i.document.close();
		}, false);
		d.body.appendChild(s);
	};

	// define bookmarklet: "View Source (plain)"
	bookmarkPlain = function (d) {
		var doc = d.cloneNode(true) || d,
			s = d.createElement('script');
		s.setAttribute('src', 'http://projects.skratchdot.com/domFormat/domFormat.min.js');
		s.addEventListener('load', function () {
			var ds = domFormat.getString(doc);
			d.open();
			d.write('<textarea wrap="off" id="s" style="width:100%;height:100%;border:0;margin:0;padding:0;whitespace:nowrap;"></textarea>');
			d.getElementById('s').value = ds;
			d.close();
		}, false);
		d.body.appendChild(s);
	};

	// define bookmarklet: "Reload With Formatted Source"
	bookmarkReload = function (d) {
		var doc = d.cloneNode(true) || d,
			s = d.createElement('script');
		s.setAttribute('src', 'http://projects.skratchdot.com/domFormat/domFormat.min.js');
		s.addEventListener('load', function () {
			var ds = domFormat.getString(doc);
			d.open();
			d.write(ds);
			d.close();
		}, false);
		d.body.appendChild(s);
	};

	// helper function for removing whitespace from our bookmarklet code
	getBookmark = function (fnText, passWindow) {
		var js = 'javascript';
		return js + ':(' +
			fnText.replace(/\s+/gi, ' ') +
			'(document' +
			(passWindow === true ? ',window' : '') +
			'));';
	};

	ensureSource = function (type) {
		var doc, d = document;
		if (typeof window[type] !== 'string') {
			if (window.top && window.top.localStorage && typeof window.top.localStorage[type] === 'string') {
				window[type] = window.top.localStorage[type];
			} else {
				doc = d.cloneNode(true) || d;
				if (type === 's1') {
					window[type] = domFormat.getString(doc);
				} else {
					window[type] = d.getElementsByTagName('html')[0] ? d.getElementsByTagName('html')[0].outerHTML || '' : '';
				}
			}
		}
		editor.clearSelection();
		editor.setValue(window[type]);
	};

	handleNavClick = function (e) {
		var $link = $(this),
			page = $link.data('page');

		e.preventDefault();

		// show active nav link
		$navLinks.removeClass('active');
		$link.addClass('active');

		// hide pages and buttons
		$('#home, #editor, #copy-container').addClass('hide');

		// initialize and show active page
		if (page === 'home') {
			$('#home').removeClass('hide');
		} else {
			$('#editor').removeClass('hide');
			$('#copy-container').removeClass('hide');
			if (!editor) {
				handleResize();
				initEditor();
			}
			if (page === 'formatted-source') {
				ensureSource('s1');
			} else {
				ensureSource('s2');
			}
			editor.gotoLine(0, 0);
			editor.scrollToLine(0);
		}
	};

	handleReloadPage = function (e) {
		e.preventDefault();
		window.top.location = window.top.location.href;
	};

	handleResize = function () {
		var width,
			height,
			padding = 0,
			$editor = $('#editor'),
			$d = $(document);
		width = $d.width() - padding;
		height = $d.height() - $('.navbar').height() - padding;
		$editor.width(width);
		$editor.height(height);
		if (editor && editor.resize) {
			editor.resize();
		}
	};

	initEditor = function () {
		editor = ace.edit('editor');
		editor.setTheme('ace/theme/twilight');
		editor.getSession().setMode('ace/mode/html');
		editor.setShowPrintMargin(false);

		// Add functionality to copy button
		ZeroClipboard.setMoviePath('http://projects.skratchdot.com/domFormat/bookmarklet/swf/ZeroClipboard.swf');
		clip = new ZeroClipboard.Client();
		clip.setText('');
		clip.glue('copy', 'copy-container');
		clip.addEventListener('onMouseDown', function () {
			clip.setText(editor.getValue());
		});
		clip.addEventListener('onComplete', function () {
			$('#just-copied').modal();
			editor.focus();
		});
	};

	api.init = function () {
		// cache a few selectors
		$navLinks = $('[data-page]');

		// handle navigation clicks
		$navLinks.click(handleNavClick);

		// handle reload button click
		$('#reload').click(handleReloadPage);

		// handle outbound links
		$('#links a, a.footer-icon').click(function (e) {
			e.preventDefault();
			window.top.location = $(this).attr('href');
		});

		// attach our bookmarklet links
		$('.bm-pretty').attr('href', getBookmark(bookmarkPretty.toString(), true));
		$('.bm-plain').attr('href', getBookmark(bookmarkPlain.toString(), false));
		$('.bm-reload').attr('href', getBookmark(bookmarkReload.toString(), false));

		// handle browser resize
		$(window).resize(handleResize);

		// was the bookmarklet just used?
		if (window.localStorage &&
				window.top &&
				window.top !== window.self &&
				typeof window.top.localStorage.s1 === 'string' &&
				window.top.localStorage.s1.length > 0) {
			$('li[data-page="formatted-source"]').click();
		}

	};

	return api;
}());

// init our BM (bookmarklet) object once the dom is ready
$(document).ready(BM.init);