/*!
 * domFormat - A simple javascript library to get DOM nodes as strings.
 * 
 * Release Date: @TIME@
 *      Version: @VERSION@
 *  Source Code: https://github.com/skratchdot/domFormat  
 *     Examples: http://skratchdot.github.com/domFormat/examples/index-html5.html  
 * 
 * Copyright (c) 2012 SKRATCHDOT.COM
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
/*jslint plusplus: true */
var domFormat = domFormat || (function () {
	'use strict';

	// Declare config variables and functions
	var config = {}, domFormat = {},
		// Functions
		polyfillIsArray, overrideConfig, getNodeName,
		isVoidElement, isNonIndentedElement, getIndentation, trim,
		fixWhitespace, htmlSpecialCharacters, formatScript, formatStyle,
		getNodeString, getElementNode, getAttributeNode, getTextNode,
		getCdataSectionNode, getEntityReferenceNode, getNodeEntityNode,
		getProcessingInstructionNode, getCommentNode, getDocumentNode,
		getDocumentTypeNode, getDocumentFragmentNode, getNotationNode;

	// Setup default config values
	config = {
		formatScriptTags : true,
		formatStyleTags : true,
		indentString : '\t',
		indentNum : 1,
		nonIndentedElements : ['html', 'head', 'body'],
		/* http://www.w3.org/TR/html-markup/syntax.html#void-element */
		voidElements : [
			'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img',
			'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
		]
	};

	domFormat.init = function (settings) {
		overrideConfig(settings, 'indentString', 'string');
		overrideConfig(settings, 'indentNum', 'number');
		overrideConfig(settings, 'nonIndentedElements', 'array');
		overrideConfig(settings, 'voidElements', 'array');
	};

	domFormat.getString = function (node) {
		return getNodeString(node, 0);
	};

	// Polyfill for Array.isArray()
	polyfillIsArray = function () {
		Array.isArray = Array.isArray || function (obj) {
			return {}.toString.call(obj) === '[object Array]';
		};
	};

	overrideConfig = function (settings, prop, type) {
		// Only override if the property exists in settings
		if (settings.hasOwnProperty(prop)) {
			// Array check
			if (type === 'array') {
				polyfillIsArray();
				if (Array.isArray(settings[prop])) {
					config[prop] = settings[prop];
				}
			} else if (typeof settings[prop] === type) {
				config[prop] = settings[prop];
			}
		}
	};

	getNodeName = function (node) {
		var str = '';
		// If the tag has a prefix
		if (typeof node.prefix === 'string') {
			str += node.prefix + ":";
		}
		// Print the name of the tag
		if (typeof node.localName === 'string') {
			str += node.localName;
		} else {
			// We should only get to this line in IE. IE loses namespace info when parsing DOM.
			str += node.nodeName;
		}
		return str;
	};

	isVoidElement = function (nodeName) {
		var i = 0;
		nodeName = nodeName.toLowerCase();

		// We could use Array.indexOf() here, but that is not supported
		// in older browsers, and there aren't *that* many voidElements
		// so no need for micro-performace
		for (i = 0; i < config.voidElements.length; i++) {
			if (config.voidElements[i] === nodeName) {
				return true;
			}
		}
		return false;
	};

	isNonIndentedElement = function (nodeName) {
		var i = 0;
		nodeName = nodeName.toLowerCase();

		// We could use Array.indexOf() here, but that is not supported
		// in older browsers.
		for (i = 0; i < config.nonIndentedElements.length; i++) {
			if (config.nonIndentedElements[i] === nodeName) {
				return true;
			}
		}
		return false;
	};

	getIndentation = function (level) {
		var i = 0, str = '';
		for (i = 0; i < (level * config.indentNum); i++) {
			str += config.indentString;
		}
		return str;
	};

	trim = function (str) {
		return str.replace(/^\s+|\s+$/g, '');
	};

	fixWhitespace = function (str) {
		return trim(str.replace(/\s+/g, ' '));
	};

	htmlSpecialCharacters = function (str, escapeQuotes) {
		str = str.replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		if (escapeQuotes === true) {
			str = str.replace(/\"/g, '&quot;').replace(/\'/g, '&#039;');
		}
		return str;
	};

	formatScript = function (str, level) {
		if (config.formatScriptTags === true) {
			str = domFormat.jsBeautify(trim(str), {
				indent_size : config.indentNum,
				indent_char : config.indentString,
				preserve_newlines : false
			});
			str = '\n' + str;
			str = str.replace(/\n/g, '\n' + getIndentation(level));
		}
		return str;
	};

	formatStyle = function (str, level) {
		if (config.formatStyleTags === true) {
			str = domFormat.cssBeautify(trim(str), {
				indent : config.indentString,
				openbrace : 'end-of-line'
			});
			str = '\n' + str;
			str = str.replace(/\n/g, '\n' + getIndentation(level));
		}
		return str;
	};

	getNodeString = function (node, level) {
		if (typeof node === 'object' && typeof node.nodeType === 'number') {
			if (node.nodeType === 1) {
				// Node.ELEMENT_NODE === 1
				return getElementNode(node, level);
			} else if (node.nodeType === 2) {
				// Node.ATTRIBUTE_NODE === 2
				return getAttributeNode(node, level);
			} else if (node.nodeType === 3) {
				// Node.TEXT_NODE === 3
				return getTextNode(node, level);
			} else if (node.nodeType === 4) {
				// Node.CDATA_SECTION_NODE === 4
				return getCdataSectionNode(node, level);
			} else if (node.nodeType === 5) {
				// Node.ENTITY_REFERENCE_NODE === 5
				return getEntityReferenceNode(node, level);
			} else if (node.nodeType === 6) {
				// Node.ENTITY_NODE === 6
				return getNodeEntityNode(node, level);
			} else if (node.nodeType === 7) {
				// Node.PROCESSING_INSTRUCTION_NODE === 7
				return getProcessingInstructionNode(node, level);
			} else if (node.nodeType === 8) {
				// Node.COMMENT_NODE === 8
				return getCommentNode(node, level);
			} else if (node.nodeType === 9) {
				// Node.DOCUMENT_NODE === 9
				return getDocumentNode(node, level);
			} else if (node.nodeType === 10) {
				// Node.DOCUMENT_TYPE_NODE === 10
				return getDocumentTypeNode(node, level);
			} else if (node.nodeType === 11) {
				// Node.DOCUMENT_FRAGMENT_NODE === 11
				return getDocumentFragmentNode(node, level);
			} else if (node.nodeType === 12) {
				// Node.NOTATION_NODE === 12
				return getNotationNode(node, level);
			}
		}
		return '';
	};

	// Node.ELEMENT_NODE === 1
	getElementNode = function (node, level) {
		var str = '', nodeName, i;
		// store the name of our element
		nodeName = getNodeName(node);
		// Print a newline if we are deeper than level 0
		if (level > 0) {
			str += '\n';
		}
		// If this is a non-indented element, set level to 0
		if (isNonIndentedElement(nodeName)) {
			level = 0;
		}
		// Now print some tabs
		str += getIndentation(level);
		// Start opening the tag
		str += '<' + nodeName;
		// Print the attributes
		for (i = 0; i < node.attributes.length; i++) {
			str += getNodeString(node.attributes[i], level + 1);
		}
		// If there are no children, we can close the tag
		if (node.childNodes.length === 0) {
			// Void elements can use the "self-closing" form.
			if (isVoidElement(nodeName)) {
				str += '/>';
			} else {
				str += '></' + nodeName + '>';
			}
		} else if (node.childNodes.length === 1 &&
				node.childNodes[0].nodeType === 3 &&
				nodeName.toLowerCase() !== 'script' &&
				nodeName.toLowerCase() !== 'style') {
			// If the only child is a text node, then don't use newlines
			str += '>' + trim(getNodeString(node.childNodes[0], level + 1)) + '</' + nodeName + '>';
		} else {
			str += '>';
			for (i = 0; i < node.childNodes.length; i++) {
				str += getNodeString(node.childNodes[i], level + 1);
			}
			str += '\n' + getIndentation(level) + '</' + nodeName + '>';
		}
		return str;
	};

	// Node.ATTRIBUTE_NODE === 2
	getAttributeNode = function (node, level) {
		var str = '';
		// if statement is needed due to IE adding attributes like onresizeend and style
		if (node.specified === true && node.nodeValue !== null) {
			str += ' ' +
				node.nodeName +
				'="' +
				htmlSpecialCharacters(node.nodeValue, true) +
				'"';
		}
		return str;
	};

	// Node.TEXT_NODE === 3
	getTextNode = function (node, level) {
		var str = '', fixedString;
		if (node.parentNode.nodeName.toLowerCase() === 'script') {
			str += formatScript(node.nodeValue, level);
		} else if (node.parentNode.nodeName.toLowerCase() === 'style') {
			str += formatStyle(node.nodeValue, level);
		} else {
			fixedString = fixWhitespace(node.nodeValue);
			if (fixedString.length > 0) {
				str += '\n' + getIndentation(level) + htmlSpecialCharacters(fixedString, false);
			}
		}
		return str;
	};

	// Node.CDATA_SECTION_NODE === 4
	getCdataSectionNode = function (node, level) {
		var str = '', fixedString;
		if (node.parentNode.nodeName.toLowerCase() === 'script') {
			str += '<[CDATA[' + formatScript(node.nodeValue, level) + ']]>';
		} else if (node.parentNode.nodeName.toLowerCase() === 'style') {
			str += '<[CDATA[' + formatStyle(node.nodeValue, level) + ']]>';
		} else {
			fixedString = fixWhitespace(node.nodeValue);
			if (fixedString.length > 0) {
				str += '\n' + getIndentation(level) + '<[CDATA[' + fixedString + ']]>';
			}
		}
		return str;
	};

	// Node.ENTITY_REFERENCE_NODE === 5
	getEntityReferenceNode = function (node, level) {
		return '';
	};

	// Node.ENTITY_NODE === 6
	getNodeEntityNode = function (node, level) {
		return '';
	};

	// Node.PROCESSING_INSTRUCTION_NODE === 7
	getProcessingInstructionNode = function (node, level) {
		return '';
	};

	// Node.COMMENT_NODE === 8
	getCommentNode = function (node, level) {
		var str = '';
		// Fix for IE treating DOCTYPE node as a comment.
		if (level > 0) {
			str += '\n' + getIndentation(level);
		}
		if (node.nodeValue) {
			str += '<!--' + node.nodeValue + '-->';
		}
		if (level === 0) {
			str += '\n';
		}
		return str;
	};

	// Node.DOCUMENT_NODE === 9
	getDocumentNode = function (node, level) {
		var str = '', i;
		if (node.childNodes && node.childNodes.length) {
			for (i = 0; i < node.childNodes.length; i++) {
				str += getNodeString(node.childNodes[i], level);
			}
		}
		return str;
	};

	// Node.DOCUMENT_TYPE_NODE === 10
	getDocumentTypeNode = function (node, level) {
		var str = '';
		str += '<!DOCTYPE';
		if (node.nodeName && node.nodeName.length > 0) {
			str += ' ' + node.nodeName;
		}
		if (node.publicId && node.publicId.length > 0) {
			str += ' PUBLIC "' + node.publicId + '"';
		}
		if (node.systemId && node.systemId.length > 0) {
			str += ' "' + node.systemId + '"';
		}
		str += '>\n';
		return str;
	};

	// Node.DOCUMENT_FRAGMENT_NODE === 11
	getDocumentFragmentNode = function (node, level) {
		var str = '', i;
		if (node.childNodes && node.childNodes.length) {
			for (i = 0; i < node.childNodes.length; i++) {
				str += getNodeString(node.childNodes[i], level);
			}
		}
		return str;
	};

	// Node.NOTATION_NODE === 12
	getNotationNode = function (node, level) {
		return '';
	};

	return domFormat;
}());
