/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */



 +function ($) {
 	'use strict';

	// TOGGLE PUBLIC CLASS DEFINITION
	// ==============================

	var Toggle = function (element, options) {
		this.$element  = $(element)
		this.options   = $.extend({}, this.defaults(), options)
		this.render()
	}

	Toggle.VERSION  = '2.2.0'

	Toggle.DEFAULTS = {
		on: 'On',
		off: 'Off',
		onstyle: 'primary',
		offstyle: 'default',
		size: 'normal',
		style: '',
		width: null,
		height: null
	}

	Toggle.prototype.defaults = function() {
		return {
			on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
			off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
			onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
			offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
			size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
			style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
			width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
			height: this.$element.attr('data-height') || Toggle.DEFAULTS.height
		}
	}

	Toggle.prototype.render = function () {
		this._onstyle = 'btn-' + this.options.onstyle
		this._offstyle = 'btn-' + this.options.offstyle
		var size = this.options.size === 'large' ? 'btn-lg'
			: this.options.size === 'small' ? 'btn-sm'
			: this.options.size === 'mini' ? 'btn-xs'
			: ''
		var $toggleOn = $('<label class="btn">').html(this.options.on)
			.addClass(this._onstyle + ' ' + size)
		var $toggleOff = $('<label class="btn">').html(this.options.off)
			.addClass(this._offstyle + ' ' + size + ' active')
		var $toggleHandle = $('<span class="toggle-handle btn btn-default">')
			.addClass(size)
		var $toggleGroup = $('<div class="toggle-group">')
			.append($toggleOn, $toggleOff, $toggleHandle)
		var $toggle = $('<div class="toggle btn" data-toggle="toggle">')
			.addClass( this.$element.prop('checked') ? this._onstyle : this._offstyle+' off' )
			.addClass(size).addClass(this.options.style)

		this.$element.wrap($toggle)
		$.extend(this, {
			$toggle: this.$element.parent(),
			$toggleOn: $toggleOn,
			$toggleOff: $toggleOff,
			$toggleGroup: $toggleGroup
		})
		this.$toggle.append($toggleGroup)

		var width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth())+($toggleHandle.outerWidth()/2)
		var height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight())
		$toggleOn.addClass('toggle-on')
		$toggleOff.addClass('toggle-off')
		this.$toggle.css({ width: width, height: height })
		if (this.options.height) {
			$toggleOn.css('line-height', $toggleOn.height() + 'px')
			$toggleOff.css('line-height', $toggleOff.height() + 'px')
		}
		this.update(true)
		this.trigger(true)
	}

	Toggle.prototype.toggle = function () {
		if (this.$element.prop('checked')) this.off()
		else this.on()
	}

	Toggle.prototype.on = function (silent) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass(this._offstyle + ' off').addClass(this._onstyle)
		this.$element.prop('checked', true)
		if (!silent) this.trigger()
	}

	Toggle.prototype.off = function (silent) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + ' off')
		this.$element.prop('checked', false)
		if (!silent) this.trigger()
	}

	Toggle.prototype.enable = function () {
		this.$toggle.removeAttr('disabled')
		this.$element.prop('disabled', false)
	}

	Toggle.prototype.disable = function () {
		this.$toggle.attr('disabled', 'disabled')
		this.$element.prop('disabled', true)
	}

	Toggle.prototype.update = function (silent) {
		if (this.$element.prop('disabled')) this.disable()
		else this.enable()
		if (this.$element.prop('checked')) this.on(silent)
		else this.off(silent)
	}

	Toggle.prototype.trigger = function (silent) {
		this.$element.off('change.bs.toggle')
		if (!silent) this.$element.change()
		this.$element.on('change.bs.toggle', $.proxy(function() {
			this.update()
		}, this))
	}

	Toggle.prototype.destroy = function() {
		this.$element.off('change.bs.toggle')
		this.$toggleGroup.remove()
		this.$element.removeData('bs.toggle')
		this.$element.unwrap()
	}

	// TOGGLE PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.toggle')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.toggle', (data = new Toggle(this, options)))
			if (typeof option == 'string' && data[option]) data[option]()
		})
	}

	var old = $.fn.bootstrapToggle

	$.fn.bootstrapToggle             = Plugin
	$.fn.bootstrapToggle.Constructor = Toggle

	// TOGGLE NO CONFLICT
	// ==================

	$.fn.toggle.noConflict = function () {
		$.fn.bootstrapToggle = old
		return this
	}

	// TOGGLE DATA-API
	// ===============

	$(function() {
		$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle()
	})

	$(document).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
		var $checkbox = $(this).find('input[type=checkbox]')
		$checkbox.bootstrapToggle('toggle')
		e.preventDefault()
	})

}(jQuery);
(function ($) {
  var ready = $.fn.ready;
  $.fn.ready = function (fn) {
    if (this.context === undefined) {
      // The $().ready(fn) case.
      ready(fn);
    } else if (this.selector) {
      ready($.proxy(function(){
        $(this.selector, this.context).each(fn);
      }, this));
    } else {
      ready($.proxy(function(){
        $(this).each(fn);
      }, this));
    }
  }
})(jQuery);
// jQuery Mask Plugin v1.14.0
// github.com/igorescobar/jQuery-Mask-Plugin
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):"object"===typeof exports?module.exports=b(require("jquery")):b(jQuery||Zepto)})(function(b){var y=function(a,e,d){var c={invalid:[],getCaret:function(){try{var r,b=0,e=a.get(0),d=document.selection,f=e.selectionStart;if(d&&-1===navigator.appVersion.indexOf("MSIE 10"))r=d.createRange(),r.moveStart("character",-c.val().length),b=r.text.length;else if(f||"0"===f)b=f;return b}catch(g){}},setCaret:function(r){try{if(a.is(":focus")){var c,
b=a.get(0);b.setSelectionRange?(b.focus(),b.setSelectionRange(r,r)):(c=b.createTextRange(),c.collapse(!0),c.moveEnd("character",r),c.moveStart("character",r),c.select())}}catch(e){}},events:function(){a.on("keydown.mask",function(c){a.data("mask-keycode",c.keyCode||c.which)}).on(b.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)}).on("change.mask",function(){a.data("changed",!0)}).on("blur.mask",function(){n===
c.val()||a.data("changed")||a.trigger("change");a.data("changed",!1)}).on("blur.mask",function(){n=c.val()}).on("focus.mask",function(a){!0===d.selectOnFocus&&b(a.target).select()}).on("focusout.mask",function(){d.clearIfNotMatch&&!p.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],c,b,d,f,l=0;l<e.length;l++)(c=g.translation[e.charAt(l)])?(b=c.pattern.toString().replace(/.{1}$|^.{1}/g,""),d=c.optional,(c=c.recursive)?(a.push(e.charAt(l)),f={digit:e.charAt(l),pattern:b}):a.push(d||
c?b+"?":b)):a.push(e.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");f&&(a=a.replace(new RegExp("("+f.digit+"(.*"+f.digit+")?)"),"($1)?").replace(new RegExp(f.digit,"g"),f.pattern));return new RegExp(a)},destroyEvents:function(){a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(c){var b=a.is("input")?"val":"text";if(0<arguments.length){if(a[b]()!==c)a[b](c);b=a}else b=a[b]();return b},getMCharsBeforeCount:function(a,c){for(var b=0,d=0,
f=e.length;d<f&&d<a;d++)g.translation[e.charAt(d)]||(a=c?a+1:a,b++);return b},caretPos:function(a,b,d,h){return g.translation[e.charAt(Math.min(a-1,e.length-1))]?Math.min(a+d-b-h,d):c.caretPos(a+1,b,d,h)},behaviour:function(d){d=d||window.event;c.invalid=[];var e=a.data("mask-keycode");if(-1===b.inArray(e,g.byPassKeys)){var m=c.getCaret(),h=c.val().length,f=c.getMasked(),l=f.length,k=c.getMCharsBeforeCount(l-1)-c.getMCharsBeforeCount(h-1),n=m<h;c.val(f);n&&(8!==e&&46!==e&&(m=c.caretPos(m,h,l,k)),
c.setCaret(m));return c.callbacks(d)}},getMasked:function(a,b){var m=[],h=void 0===b?c.val():b+"",f=0,l=e.length,k=0,n=h.length,q=1,p="push",u=-1,t,w;d.reverse?(p="unshift",q=-1,t=0,f=l-1,k=n-1,w=function(){return-1<f&&-1<k}):(t=l-1,w=function(){return f<l&&k<n});for(;w();){var x=e.charAt(f),v=h.charAt(k),s=g.translation[x];if(s)v.match(s.pattern)?(m[p](v),s.recursive&&(-1===u?u=f:f===t&&(f=u-q),t===u&&(f-=q)),f+=q):s.optional?(f+=q,k-=q):s.fallback?(m[p](s.fallback),f+=q,k-=q):c.invalid.push({p:k,
v:v,e:s.pattern}),k+=q;else{if(!a)m[p](x);v===x&&(k+=q);f+=q}}h=e.charAt(t);l!==n+1||g.translation[h]||m.push(h);return m.join("")},callbacks:function(b){var g=c.val(),m=g!==n,h=[g,b,a,d],f=function(a,b,c){"function"===typeof d[a]&&b&&d[a].apply(this,c)};f("onChange",!0===m,h);f("onKeyPress",!0===m,h);f("onComplete",g.length===e.length,h);f("onInvalid",0<c.invalid.length,[g,b,a,c.invalid,d])}};a=b(a);var g=this,n=c.val(),p;e="function"===typeof e?e(c.val(),void 0,a,d):e;g.mask=e;g.options=d;g.remove=
function(){var b=c.getCaret();c.destroyEvents();c.val(g.getCleanVal());c.setCaret(b-c.getMCharsBeforeCount(b));return a};g.getCleanVal=function(){return c.getMasked(!0)};g.getMaskedVal=function(a){return c.getMasked(!1,a)};g.init=function(e){e=e||!1;d=d||{};g.clearIfNotMatch=b.jMaskGlobals.clearIfNotMatch;g.byPassKeys=b.jMaskGlobals.byPassKeys;g.translation=b.extend({},b.jMaskGlobals.translation,d.translation);g=b.extend(!0,{},g,d);p=c.getRegexMask();!1===e?(d.placeholder&&a.attr("placeholder",d.placeholder),
a.data("mask")&&a.attr("autocomplete","off"),c.destroyEvents(),c.events(),e=c.getCaret(),c.val(c.getMasked()),c.setCaret(e+c.getMCharsBeforeCount(e,!0))):(c.events(),c.val(c.getMasked()))};g.init(!a.is("input"))};b.maskWatchers={};var A=function(){var a=b(this),e={},d=a.attr("data-mask");a.attr("data-mask-reverse")&&(e.reverse=!0);a.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===a.attr("data-mask-selectonfocus")&&(e.selectOnFocus=!0);if(z(a,d,e))return a.data("mask",new y(this,
d,e))},z=function(a,e,d){d=d||{};var c=b(a).data("mask"),g=JSON.stringify;a=b(a).val()||b(a).text();try{return"function"===typeof e&&(e=e(a)),"object"!==typeof c||g(c.options)!==g(d)||c.mask!==e}catch(n){}};b.fn.mask=function(a,e){e=e||{};var d=this.selector,c=b.jMaskGlobals,g=c.watchInterval,c=e.watchInputs||c.watchInputs,n=function(){if(z(this,a,e))return b(this).data("mask",new y(this,a,e))};b(this).each(n);d&&""!==d&&c&&(clearInterval(b.maskWatchers[d]),b.maskWatchers[d]=setInterval(function(){b(document).find(d).each(n)},
g));return this};b.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};b.fn.unmask=function(){clearInterval(b.maskWatchers[this.selector]);delete b.maskWatchers[this.selector];return this.each(function(){var a=b(this).data("mask");a&&a.remove().removeData("mask")})};b.fn.cleanVal=function(){return this.data("mask").getCleanVal()};b.applyDataMask=function(a){a=a||b.jMaskGlobals.maskElements;(a instanceof b?a:b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A)};var p={maskElements:"input,td,span,div",
dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d}("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};b.jMaskGlobals=b.jMaskGlobals||{};p=b.jMaskGlobals=b.extend(!0,{},p,b.jMaskGlobals);
p.dataMask&&b.applyDataMask();setInterval(function(){b.jMaskGlobals.watchDataMask&&b.applyDataMask()},p.watchInterval)});
/*
 Highstock JS v6.0.1 (2017-10-05)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(Q,L){"object"===typeof module&&module.exports?module.exports=Q.document?L(Q):L:Q.Highcharts=L(Q)})("undefined"!==typeof window?window:this,function(Q){var L=function(){var a=Q.document,E=Q.navigator&&Q.navigator.userAgent||"",D=a&&a.createElementNS&&!!a.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(E)&&!Q.opera,C=/Firefox/.test(E),r=C&&4>parseInt(E.split("Firefox/")[1],10);return Q.Highcharts?Q.Highcharts.error(16,!0):{product:"Highstock",
version:"6.0.1",deg2rad:2*Math.PI/360,doc:a,hasBidiBug:r,hasTouch:a&&void 0!==a.documentElement.ontouchstart,isMS:F,isWebKit:/AppleWebKit/.test(E),isFirefox:C,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(E),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:D,win:Q,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var E=[],D=a.charts,F=a.doc,C=a.win;a.error=function(r,h){r=a.isNumber(r)?"Highcharts error #"+
r+": www.highcharts.com/errors/"+r:r;if(h)throw Error(r);C.console&&console.log(r)};a.Fx=function(a,h,p){this.options=h;this.elem=a;this.prop=p};a.Fx.prototype={dSetter:function(){var a=this.paths[0],h=this.paths[1],p=[],n=this.now,u=a.length,z;if(1===n)p=this.toD;else if(u===h.length&&1>n)for(;u--;)z=parseFloat(a[u]),p[u]=isNaN(z)?a[u]:n*parseFloat(h[u]-z)+z;else p=h;this.elem.attr("d",p,null,!0)},update:function(){var a=this.elem,h=this.prop,p=this.now,n=this.options.step;if(this[h+"Setter"])this[h+
"Setter"]();else a.attr?a.element&&a.attr(h,p,null,!0):a.style[h]=p+this.unit;n&&n.call(a,p,this)},run:function(a,h,p){var n=this,u=function(a){return u.stopped?!1:n.step(a)},r=C.requestAnimationFrame||function(a){setTimeout(a,13)},e=function(){var a;for(a=0;a<E.length;a++)E[a]()||E.splice(a--,1);E.length&&r(e)};a===h?delete this.options.curAnim[this.prop]:(this.startTime=+new Date,this.start=a,this.end=h,this.unit=p,this.now=this.start,this.pos=0,u.elem=this.elem,u.prop=this.prop,u()&&1===E.push(u)&&
r(e))},step:function(r){var h=+new Date,p,n=this.options,u=this.elem,z=n.complete,e=n.duration,l=n.curAnim;u.attr&&!u.element?r=!1:r||h>=e+this.startTime?(this.now=this.end,this.pos=1,this.update(),p=l[this.prop]=!0,a.objectEach(l,function(a){!0!==a&&(p=!1)}),p&&z&&z.call(u),r=!1):(this.pos=n.easing((h-this.startTime)/e),this.now=this.start+(this.end-this.start)*this.pos,this.update(),r=!0);return r},initPath:function(r,h,p){function n(a){var c,b;for(m=a.length;m--;)c="M"===a[m]||"L"===a[m],b=/[a-zA-Z]/.test(a[m+
3]),c&&b&&a.splice(m+1,0,a[m+1],a[m+2],a[m+1],a[m+2])}function u(a,b){for(;a.length<w;){a[0]=b[w-a.length];var k=a.slice(0,c);[].splice.apply(a,[0,0].concat(k));v&&(k=a.slice(a.length-c),[].splice.apply(a,[a.length,0].concat(k)),m--)}a[0]="M"}function z(a,k){for(var m=(w-a.length)/c;0<m&&m--;)q=a.slice().splice(a.length/H-c,c*H),q[0]=k[w-c-m*c],b&&(q[c-6]=q[c-2],q[c-5]=q[c-1]),[].splice.apply(a,[a.length/H,0].concat(q)),v&&m--}h=h||"";var e,l=r.startX,f=r.endX,b=-1<h.indexOf("C"),c=b?7:3,w,q,m;h=
h.split(" ");p=p.slice();var v=r.isArea,H=v?2:1,B;b&&(n(h),n(p));if(l&&f){for(m=0;m<l.length;m++)if(l[m]===f[0]){e=m;break}else if(l[0]===f[f.length-l.length+m]){e=m;B=!0;break}void 0===e&&(h=[])}h.length&&a.isNumber(e)&&(w=p.length+e*H*c,B?(u(h,p),z(p,h)):(u(p,h),z(h,p)));return[h,p]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,h){var r;a||(a={});for(r in h)a[r]=h[r];
return a};a.merge=function(){var r,h=arguments,p,n={},u=function(n,e){"object"!==typeof n&&(n={});a.objectEach(e,function(l,f){!a.isObject(l,!0)||a.isClass(l)||a.isDOMElement(l)?n[f]=e[f]:n[f]=u(n[f]||{},l)});return n};!0===h[0]&&(n=h[1],h=Array.prototype.slice.call(h,2));p=h.length;for(r=0;r<p;r++)n=u(n,h[r]);return n};a.pInt=function(a,h){return parseInt(a,h||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===
a||"[object Array Iterator]"===a};a.isObject=function(r,h){return!!r&&"object"===typeof r&&(!h||!a.isArray(r))};a.isDOMElement=function(r){return a.isObject(r)&&"number"===typeof r.nodeType};a.isClass=function(r){var h=r&&r.constructor;return!(!a.isObject(r,!0)||a.isDOMElement(r)||!h||!h.name||"Object"===h.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,h){for(var r=a.length;r--;)if(a[r]===h){a.splice(r,1);break}};a.defined=function(a){return void 0!==a&&null!==
a};a.attr=function(r,h,p){var n;a.isString(h)?a.defined(p)?r.setAttribute(h,p):r&&r.getAttribute&&(n=r.getAttribute(h)):a.defined(h)&&a.isObject(h)&&a.objectEach(h,function(a,n){r.setAttribute(n,a)});return n};a.splat=function(r){return a.isArray(r)?r:[r]};a.syncTimeout=function(a,h,p){if(h)return setTimeout(a,h,p);a.call(0,p)};a.pick=function(){var a=arguments,h,p,n=a.length;for(h=0;h<n;h++)if(p=a[h],void 0!==p&&null!==p)return p};a.css=function(r,h){a.isMS&&!a.svg&&h&&void 0!==h.opacity&&(h.filter=
"alpha(opacity\x3d"+100*h.opacity+")");a.extend(r.style,h)};a.createElement=function(r,h,p,n,u){r=F.createElement(r);var z=a.css;h&&a.extend(r,h);u&&z(r,{padding:0,border:"none",margin:0});p&&z(r,p);n&&n.appendChild(r);return r};a.extendClass=function(r,h){var p=function(){};p.prototype=new r;a.extend(p.prototype,h);return p};a.pad=function(a,h,p){return Array((h||2)+1-String(a).length).join(p||0)+a};a.relativeLength=function(a,h,p){return/%$/.test(a)?h*parseFloat(a)/100+(p||0):parseFloat(a)};a.wrap=
function(a,h,p){var n=a[h];a[h]=function(){var a=Array.prototype.slice.call(arguments),h=arguments,e=this;e.proceed=function(){n.apply(e,arguments.length?arguments:h)};a.unshift(n);a=p.apply(this,a);e.proceed=null;return a}};a.getTZOffset=function(r){var h=a.Date;return 6E4*(h.hcGetTimezoneOffset&&h.hcGetTimezoneOffset(r)||h.hcTimezoneOffset||0)};a.dateFormat=function(r,h,p){if(!a.defined(h)||isNaN(h))return a.defaultOptions.lang.invalidDate||"";r=a.pick(r,"%Y-%m-%d %H:%M:%S");var n=a.Date,u=new n(h-
a.getTZOffset(h)),z=u[n.hcGetHours](),e=u[n.hcGetDay](),l=u[n.hcGetDate](),f=u[n.hcGetMonth](),b=u[n.hcGetFullYear](),c=a.defaultOptions.lang,w=c.weekdays,q=c.shortWeekdays,m=a.pad,n=a.extend({a:q?q[e]:w[e].substr(0,3),A:w[e],d:m(l),e:m(l,2," "),w:e,b:c.shortMonths[f],B:c.months[f],m:m(f+1),y:b.toString().substr(2,2),Y:b,H:m(z),k:z,I:m(z%12||12),l:z%12||12,M:m(u[n.hcGetMinutes]()),p:12>z?"AM":"PM",P:12>z?"am":"pm",S:m(u.getSeconds()),L:m(Math.round(h%1E3),3)},a.dateFormats);a.objectEach(n,function(a,
c){for(;-1!==r.indexOf("%"+c);)r=r.replace("%"+c,"function"===typeof a?a(h):a)});return p?r.substr(0,1).toUpperCase()+r.substr(1):r};a.formatSingle=function(r,h){var p=/\.([0-9])/,n=a.defaultOptions.lang;/f$/.test(r)?(p=(p=r.match(p))?p[1]:-1,null!==h&&(h=a.numberFormat(h,p,n.decimalPoint,-1<r.indexOf(",")?n.thousandsSep:""))):h=a.dateFormat(r,h);return h};a.format=function(r,h){for(var p="{",n=!1,u,z,e,l,f=[],b;r;){p=r.indexOf(p);if(-1===p)break;u=r.slice(0,p);if(n){u=u.split(":");z=u.shift().split(".");
l=z.length;b=h;for(e=0;e<l;e++)b&&(b=b[z[e]]);u.length&&(b=a.formatSingle(u.join(":"),b));f.push(b)}else f.push(u);r=r.slice(p+1);p=(n=!n)?"}":"{"}f.push(r);return f.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(r,h,p,n,u){var z,e=r;p=a.pick(p,1);z=r/p;h||(h=u?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===n&&(1===p?h=a.grep(h,function(a){return 0===a%1}):.1>=p&&(h=[1/p])));for(n=0;n<h.length&&!(e=h[n],u&&e*p>=r||!u&&
z<=(h[n]+(h[n+1]||h[n]))/2);n++);return e=a.correctFloat(e*p,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,h){var p=a.length,n,u;for(u=0;u<p;u++)a[u].safeI=u;a.sort(function(a,e){n=h(a,e);return 0===n?a.safeI-e.safeI:n});for(u=0;u<p;u++)delete a[u].safeI};a.arrayMin=function(a){for(var h=a.length,p=a[0];h--;)a[h]<p&&(p=a[h]);return p};a.arrayMax=function(a){for(var h=a.length,p=a[0];h--;)a[h]>p&&(p=a[h]);return p};a.destroyObjectProperties=function(r,h){a.objectEach(r,function(a,
n){a&&a!==h&&a.destroy&&a.destroy();delete r[n]})};a.discardElement=function(r){var h=a.garbageBin;h||(h=a.createElement("div"));r&&h.appendChild(r);h.innerHTML=""};a.correctFloat=function(a,h){return parseFloat(a.toPrecision(h||14))};a.setAnimation=function(r,h){h.renderer.globalAnimation=a.pick(r,h.options.chart.animation,!0)};a.animObject=function(r){return a.isObject(r)?a.merge(r):{duration:r?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,
year:314496E5};a.numberFormat=function(r,h,p,n){r=+r||0;h=+h;var u=a.defaultOptions.lang,z=(r.toString().split(".")[1]||"").split("e")[0].length,e,l,f=r.toString().split("e");-1===h?h=Math.min(z,20):a.isNumber(h)||(h=2);l=(Math.abs(f[1]?f[0]:r)+Math.pow(10,-Math.max(h,z)-1)).toFixed(h);z=String(a.pInt(l));e=3<z.length?z.length%3:0;p=a.pick(p,u.decimalPoint);n=a.pick(n,u.thousandsSep);r=(0>r?"-":"")+(e?z.substr(0,e)+n:"");r+=z.substr(e).replace(/(\d{3})(?=\d)/g,"$1"+n);h&&(r+=p+l.slice(-h));f[1]&&
(r+="e"+f[1]);return r};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(r,h,p){if("width"===h)return Math.min(r.offsetWidth,r.scrollWidth)-a.getStyle(r,"padding-left")-a.getStyle(r,"padding-right");if("height"===h)return Math.min(r.offsetHeight,r.scrollHeight)-a.getStyle(r,"padding-top")-a.getStyle(r,"padding-bottom");C.getComputedStyle||a.error(27,!0);if(r=C.getComputedStyle(r,void 0))r=r.getPropertyValue(h),a.pick(p,"opacity"!==h)&&(r=a.pInt(r));return r};a.inArray=
function(r,h){return(a.indexOfPolyfill||Array.prototype.indexOf).call(h,r)};a.grep=function(r,h){return(a.filterPolyfill||Array.prototype.filter).call(r,h)};a.find=Array.prototype.find?function(a,h){return a.find(h)}:function(a,h){var p,n=a.length;for(p=0;p<n;p++)if(h(a[p],p))return a[p]};a.map=function(a,h){for(var p=[],n=0,u=a.length;n<u;n++)p[n]=h.call(a[n],a[n],n,a);return p};a.reduce=function(r,h,p){return(a.reducePolyfill||Array.prototype.reduce).call(r,h,p)};a.offset=function(a){var h=F.documentElement;
a=a.getBoundingClientRect();return{top:a.top+(C.pageYOffset||h.scrollTop)-(h.clientTop||0),left:a.left+(C.pageXOffset||h.scrollLeft)-(h.clientLeft||0)}};a.stop=function(a,h){for(var p=E.length;p--;)E[p].elem!==a||h&&h!==E[p].prop||(E[p].stopped=!0)};a.each=function(r,h,p){return(a.forEachPolyfill||Array.prototype.forEach).call(r,h,p)};a.objectEach=function(a,h,p){for(var n in a)a.hasOwnProperty(n)&&h.call(p,a[n],n,a)};a.addEvent=function(r,h,p){var n=r.hcEvents=r.hcEvents||{},u=r.addEventListener||
a.addEventListenerPolyfill;u&&u.call(r,h,p,!1);n[h]||(n[h]=[]);n[h].push(p);return function(){a.removeEvent(r,h,p)}};a.removeEvent=function(r,h,p){function n(e,b){var c=r.removeEventListener||a.removeEventListenerPolyfill;c&&c.call(r,e,b,!1)}function u(){var f,b;r.nodeName&&(h?(f={},f[h]=!0):f=e,a.objectEach(f,function(a,w){if(e[w])for(b=e[w].length;b--;)n(w,e[w][b])}))}var z,e=r.hcEvents,l;e&&(h?(z=e[h]||[],p?(l=a.inArray(p,z),-1<l&&(z.splice(l,1),e[h]=z),n(h,p)):(u(),e[h]=[])):(u(),r.hcEvents={}))};
a.fireEvent=function(r,h,p,n){var u;u=r.hcEvents;var z,e;p=p||{};if(F.createEvent&&(r.dispatchEvent||r.fireEvent))u=F.createEvent("Events"),u.initEvent(h,!0,!0),a.extend(u,p),r.dispatchEvent?r.dispatchEvent(u):r.fireEvent(h,u);else if(u)for(u=u[h]||[],z=u.length,p.target||a.extend(p,{preventDefault:function(){p.defaultPrevented=!0},target:r,type:h}),h=0;h<z;h++)(e=u[h])&&!1===e.call(r,p)&&p.preventDefault();n&&!p.defaultPrevented&&n(p)};a.animate=function(r,h,p){var n,u="",z,e,l;a.isObject(p)||(l=
arguments,p={duration:l[2],easing:l[3],complete:l[4]});a.isNumber(p.duration)||(p.duration=400);p.easing="function"===typeof p.easing?p.easing:Math[p.easing]||Math.easeInOutSine;p.curAnim=a.merge(h);a.objectEach(h,function(f,b){a.stop(r,b);e=new a.Fx(r,p,b);z=null;"d"===b?(e.paths=e.initPath(r,r.d,h.d),e.toD=h.d,n=0,z=1):r.attr?n=r.attr(b):(n=parseFloat(a.getStyle(r,b))||0,"opacity"!==b&&(u="px"));z||(z=f);z&&z.match&&z.match("px")&&(z=z.replace(/px/g,""));e.run(n,z,u)})};a.seriesType=function(r,
h,p,n,u){var z=a.getOptions(),e=a.seriesTypes;z.plotOptions[r]=a.merge(z.plotOptions[h],p);e[r]=a.extendClass(e[h]||function(){},n);e[r].prototype.type=r;u&&(e[r].prototype.pointClass=a.extendClass(a.Point,u));return e[r]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),h=0;return function(){return"highcharts-"+a+"-"+h++}}();C.jQuery&&(C.jQuery.fn.highcharts=function(){var r=[].slice.call(arguments);if(this[0])return r[0]?(new (a[a.isString(r[0])?r.shift():"Chart"])(this[0],
r[0],r[1]),this):D[a.attr(this[0],"data-highcharts-chart")]})})(L);(function(a){var E=a.each,D=a.isNumber,F=a.map,C=a.merge,r=a.pInt;a.Color=function(h){if(!(this instanceof a.Color))return new a.Color(h);this.init(h)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[r(a[1]),r(a[2]),r(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[r(a[1]),
r(a[2]),r(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(h){var p,n,u,z;if((this.input=h=this.names[h&&h.toLowerCase?h.toLowerCase():""]||h)&&h.stops)this.stops=F(h.stops,function(e){return new a.Color(e[1])});else if(h&&h.charAt&&"#"===h.charAt()&&(p=h.length,h=parseInt(h.substr(1),16),7===p?n=[(h&16711680)>>16,(h&65280)>>8,h&255,1]:4===p&&(n=[(h&3840)>>4|(h&3840)>>8,(h&240)>>4|h&240,(h&15)<<4|h&15,1])),!n)for(u=this.parsers.length;u--&&!n;)z=this.parsers[u],
(p=z.regex.exec(h))&&(n=z.parse(p));this.rgba=n||[]},get:function(a){var h=this.input,n=this.rgba,u;this.stops?(u=C(h),u.stops=[].concat(u.stops),E(this.stops,function(n,e){u.stops[e]=[u.stops[e][0],n.get(a)]})):u=n&&D(n[0])?"rgb"===a||!a&&1===n[3]?"rgb("+n[0]+","+n[1]+","+n[2]+")":"a"===a?n[3]:"rgba("+n.join(",")+")":h;return u},brighten:function(a){var h,n=this.rgba;if(this.stops)E(this.stops,function(n){n.brighten(a)});else if(D(a)&&0!==a)for(h=0;3>h;h++)n[h]+=r(255*a),0>n[h]&&(n[h]=0),255<n[h]&&
(n[h]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,p){var n=this.rgba,h=a.rgba;h.length&&n&&n.length?(a=1!==h[3]||1!==n[3],p=(a?"rgba(":"rgb(")+Math.round(h[0]+(n[0]-h[0])*(1-p))+","+Math.round(h[1]+(n[1]-h[1])*(1-p))+","+Math.round(h[2]+(n[2]-h[2])*(1-p))+(a?","+(h[3]+(n[3]-h[3])*(1-p)):"")+")"):p=a.input||"none";return p}};a.color=function(h){return new a.Color(h)}})(L);(function(a){var E,D,F=a.addEvent,C=a.animate,r=a.attr,h=a.charts,p=a.color,n=a.css,
u=a.createElement,z=a.defined,e=a.deg2rad,l=a.destroyObjectProperties,f=a.doc,b=a.each,c=a.extend,w=a.erase,q=a.grep,m=a.hasTouch,v=a.inArray,H=a.isArray,B=a.isFirefox,K=a.isMS,k=a.isObject,A=a.isString,J=a.isWebKit,x=a.merge,d=a.noop,t=a.objectEach,G=a.pick,g=a.pInt,y=a.removeEvent,P=a.stop,M=a.svg,O=a.SVG_NS,N=a.symbolSizes,R=a.win;E=a.SVGElement=function(){return this};c(E.prototype,{opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
init:function(a,g){this.element="span"===g?u(g):f.createElementNS(this.SVG_NS,g);this.renderer=a},animate:function(I,g,y){g=a.animObject(G(g,this.renderer.globalAnimation,!0));0!==g.duration?(y&&(g.complete=y),C(this,I,g)):(this.attr(I,null,y),g.step&&g.step.call(this));return this},colorGradient:function(g,y,d){var I=this.renderer,c,k,m,q,M,S,e,w,f,v,G=[],A;g.radialGradient?k="radialGradient":g.linearGradient&&(k="linearGradient");k&&(m=g[k],M=I.gradients,e=g.stops,v=d.radialReference,H(m)&&(g[k]=
m={x1:m[0],y1:m[1],x2:m[2],y2:m[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===k&&v&&!z(m.gradientUnits)&&(q=m,m=x(m,I.getRadialAttr(v,q),{gradientUnits:"userSpaceOnUse"})),t(m,function(a,g){"id"!==g&&G.push(g,a)}),t(e,function(a){G.push(a)}),G=G.join(","),M[G]?v=M[G].attr("id"):(m.id=v=a.uniqueKey(),M[G]=S=I.createElement(k).attr(m).add(I.defs),S.radAttr=q,S.stops=[],b(e,function(g){0===g[1].indexOf("rgba")?(c=a.color(g[1]),w=c.get("rgb"),f=c.get("a")):(w=g[1],f=1);g=I.createElement("stop").attr({offset:g[0],
"stop-color":w,"stop-opacity":f}).add(S);S.stops.push(g)})),A="url("+I.url+"#"+v+")",d.setAttribute(y,A),d.gradient=G,g.toString=function(){return A})},applyTextOutline:function(g){var I=this.element,y,d,c,t,k;-1!==g.indexOf("contrast")&&(g=g.replace(/contrast/g,this.renderer.getContrast(I.style.fill)));g=g.split(" ");d=g[g.length-1];if((c=g[0])&&"none"!==c&&a.svg){this.fakeTS=!0;g=[].slice.call(I.getElementsByTagName("tspan"));this.ySetter=this.xSetter;c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,
g,I){return 2*g+I});for(k=g.length;k--;)y=g[k],"highcharts-text-outline"===y.getAttribute("class")&&w(g,I.removeChild(y));t=I.firstChild;b(g,function(a,g){0===g&&(a.setAttribute("x",I.getAttribute("x")),g=I.getAttribute("y"),a.setAttribute("y",g||0),null===g&&I.setAttribute("y",0));a=a.cloneNode(1);r(a,{"class":"highcharts-text-outline",fill:d,stroke:d,"stroke-width":c,"stroke-linejoin":"round"});I.insertBefore(a,t)})}},attr:function(a,g,y,d){var I,c=this.element,b,k=this,m,x;"string"===typeof a&&
void 0!==g&&(I=a,a={},a[I]=g);"string"===typeof a?k=(this[a+"Getter"]||this._defaultGetter).call(this,a,c):(t(a,function(g,I){m=!1;d||P(this,I);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(I)&&(b||(this.symbolAttr(a),b=!0),m=!0);!this.rotation||"x"!==I&&"y"!==I||(this.doTransform=!0);m||(x=this[I+"Setter"]||this._defaultSetter,x.call(this,g,I,c),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(I)&&this.updateShadows(I,g,x))},this),this.afterSetters());
y&&y();return k},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,g,y){for(var I=this.shadows,d=I.length;d--;)y.call(I[d],"height"===a?Math.max(g-(I[d].cutHeight||0),0):"d"===a?this.d:g,a,I[d])},addClass:function(a,g){var I=this.attr("class")||"";-1===I.indexOf(a)&&(g||(a=(I+(I?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==v(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",
(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var g=this;b("x y r start end width height innerR anchorX anchorY".split(" "),function(I){g[I]=G(a[I],g[I])});g.attr({d:g.renderer.symbols[g.symbolName](g.x,g.y,g.width,g.height,g)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,g){var I=this,y={},d;g=g||a.strokeWidth||0;d=Math.round(g)%2/2;a.x=Math.floor(a.x||I.x||0)+d;a.y=Math.floor(a.y||I.y||0)+d;a.width=Math.floor((a.width||
I.width||0)-2*d);a.height=Math.floor((a.height||I.height||0)-2*d);z(a.strokeWidth)&&(a.strokeWidth=g);t(a,function(a,g){I[g]!==a&&(I[g]=y[g]=a)});return y},css:function(a){var y=this.styles,I={},d=this.element,b,k="",m,x=!y,q=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);y&&t(a,function(a,g){a!==y[g]&&(I[g]=a,x=!0)});x&&(y&&(a=c(y,I)),b=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===d.nodeName.toLowerCase()&&g(a.width),this.styles=a,b&&!M&&this.renderer.forExport&&delete a.width,
K&&!M?n(this.element,a):(m=function(a,g){return"-"+g.toLowerCase()},t(a,function(a,g){-1===v(g,q)&&(k+=g.replace(/([A-Z])/g,m)+":"+a+";")}),k&&r(d,"style",k)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,g){var y=this,I=y.element;m&&"click"===a?(I.ontouchstart=function(a){y.touchEventFired=Date.now();a.preventDefault();g.call(I,a)},
I.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(y.touchEventFired||0))&&g.call(I,a)}):I["on"+a]=g;return this},setRadialReference:function(a){var g=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;g&&g.radAttr&&g.animate(this.renderer.getRadialAttr(a,g.radAttr));return this},translate:function(a,g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=
this.translateX||0,g=this.translateY||0,y=this.scaleX,d=this.scaleY,c=this.inverted,b=this.rotation,t=this.matrix,k=this.element;c&&(a+=this.width,g+=this.height);a=["translate("+a+","+g+")"];z(t)&&a.push("matrix("+t.join(",")+")");c?a.push("rotate(90) scale(-1,1)"):b&&a.push("rotate("+b+" "+G(this.rotationOriginX,k.getAttribute("x"),0)+" "+G(this.rotationOriginY,k.getAttribute("y")||0)+")");(z(y)||z(d))&&a.push("scale("+G(y,1)+" "+G(d,1)+")");a.length&&k.setAttribute("transform",a.join(" "))},toFront:function(){var a=
this.element;a.parentNode.appendChild(a);return this},align:function(a,g,y){var d,c,I,b,t={};c=this.renderer;I=c.alignedObjects;var k,m;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!y||A(y))this.alignTo=d=y||"renderer",w(I,this),I.push(this),y=null}else a=this.alignOptions,g=this.alignByTranslate,d=this.alignTo;y=G(y,c[d],c);d=a.align;c=a.verticalAlign;I=(y.x||0)+(a.x||0);b=(y.y||0)+(a.y||0);"right"===d?k=1:"center"===d&&(k=2);k&&(I+=(y.width-(a.width||0))/k);t[g?"translateX":"x"]=Math.round(I);
"bottom"===c?m=1:"middle"===c&&(m=2);m&&(b+=(y.height-(a.height||0))/m);t[g?"translateY":"y"]=Math.round(b);this[this.placed?"animate":"attr"](t);this.placed=!0;this.alignAttr=t;return this},getBBox:function(a,g){var y,d=this.renderer,I,t=this.element,k=this.styles,m,x=this.textStr,q,M=d.cache,w=d.cacheKeys,f;g=G(g,this.rotation);I=g*e;m=k&&k.fontSize;void 0!==x&&(f=x.toString(),-1===f.indexOf("\x3c")&&(f=f.replace(/[0-9]/g,"0")),f+=["",g||0,m,k&&k.width,k&&k.textOverflow].join());f&&!a&&(y=M[f]);
if(!y){if(t.namespaceURI===this.SVG_NS||d.forExport){try{(q=this.fakeTS&&function(a){b(t.querySelectorAll(".highcharts-text-outline"),function(g){g.style.display=a})})&&q("none"),y=t.getBBox?c({},t.getBBox()):{width:t.offsetWidth,height:t.offsetHeight},q&&q("")}catch(T){}if(!y||0>y.width)y={width:0,height:0}}else y=this.htmlGetBBox();d.isSVG&&(a=y.width,d=y.height,k&&"11px"===k.fontSize&&17===Math.round(d)&&(y.height=d=14),g&&(y.width=Math.abs(d*Math.sin(I))+Math.abs(a*Math.cos(I)),y.height=Math.abs(d*
Math.cos(I))+Math.abs(a*Math.sin(I))));if(f&&0<y.height){for(;250<w.length;)delete M[w.shift()];M[f]||w.push(f);M[f]=y}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var g=this;g.animate({opacity:0},{duration:a||150,complete:function(){g.attr({y:-9999})}})},add:function(a){var g=this.renderer,y=this.element,d;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&
g.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:g.box).appendChild(y);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var g=a.parentNode;g&&g.removeChild(a)},destroy:function(){var a=this,g=a.element||{},y=a.renderer.isSVG&&"SPAN"===g.nodeName&&a.parentGroup,d=g.ownerSVGElement;g.onclick=g.onmouseout=g.onmouseover=g.onmousemove=g.point=null;P(a);a.clipPath&&d&&(b(d.querySelectorAll("[clip-path]"),function(g){-1<g.getAttribute("clip-path").indexOf(a.clipPath.element.id+
")")&&g.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(d=0;d<a.stops.length;d++)a.stops[d]=a.stops[d].destroy();a.stops=null}a.safeRemoveChild(g);for(a.destroyShadows();y&&y.div&&0===y.div.childNodes.length;)g=y.parentGroup,a.safeRemoveChild(y.div),delete y.div,y=g;a.alignTo&&w(a.renderer.alignedObjects,a);t(a,function(g,y){delete a[y]});return null},shadow:function(a,g,y){var d=[],c,t,b=this.element,k,I,m,x;if(!a)this.destroyShadows();else if(!this.shadows){I=G(a.width,
3);m=(a.opacity||.15)/I;x=this.parentInverted?"(-1,-1)":"("+G(a.offsetX,1)+", "+G(a.offsetY,1)+")";for(c=1;c<=I;c++)t=b.cloneNode(0),k=2*I+1-2*c,r(t,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":m*c,"stroke-width":k,transform:"translate"+x,fill:"none"}),y&&(r(t,"height",Math.max(r(t,"height")-k,0)),t.cutHeight=k),g?g.element.appendChild(t):b.parentNode&&b.parentNode.insertBefore(t,b),d.push(t);this.shadows=d}return this},destroyShadows:function(){b(this.shadows||[],function(a){this.safeRemoveChild(a)},
this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=G(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,y){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[g]!==a&&(y.setAttribute(g,a),this[g]=a)},dashstyleSetter:function(a){var y,d=this["stroke-width"];"inherit"===d&&(d=1);if(a=
a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(y=a.length;y--;)a[y]=g(a[y])*d;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,
g,y){this[g]=a;y.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=f.createElementNS(this.SVG_NS,"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(f.createTextNode(String(G(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,g,y){"string"===typeof a?y.setAttribute(g,a):a&&this.colorGradient(a,
g,y)},visibilitySetter:function(a,g,y){"inherit"===a?y.removeAttribute(g):this[g]!==a&&y.setAttribute(g,a);this[g]=a},zIndexSetter:function(a,y){var d=this.renderer,c=this.parentGroup,t=(c||d).element||d.box,b,k=this.element,m,x,d=t===d.box;b=this.added;var q;z(a)&&(k.zIndex=a,a=+a,this[y]===a&&(b=!1),this[y]=a);if(b){(a=this.zIndex)&&c&&(c.handleZ=!0);y=t.childNodes;for(q=y.length-1;0<=q&&!m;q--)if(c=y[q],b=c.zIndex,x=!z(b),c!==k)if(0>a&&x&&!d&&!q)t.insertBefore(k,y[q]),m=!0;else if(g(b)<=a||x&&
(!z(a)||0<=a))t.insertBefore(k,y[q+1]||null),m=!0;m||(t.insertBefore(k,y[d?3:0]||null),m=!0)}return m},_defaultSetter:function(a,g,y){y.setAttribute(g,a)}});E.prototype.yGetter=E.prototype.xGetter;E.prototype.translateXSetter=E.prototype.translateYSetter=E.prototype.rotationSetter=E.prototype.verticalAlignSetter=E.prototype.rotationOriginXSetter=E.prototype.rotationOriginYSetter=E.prototype.scaleXSetter=E.prototype.scaleYSetter=E.prototype.matrixSetter=function(a,g){this[g]=a;this.doTransform=!0};
E.prototype["stroke-widthSetter"]=E.prototype.strokeSetter=function(a,g,y){this[g]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",y),y.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===g&&0===a&&this.hasStroke&&(y.removeAttribute("stroke"),this.hasStroke=!1)};D=a.SVGRenderer=function(){this.init.apply(this,arguments)};c(D.prototype,{Element:E,SVG_NS:O,init:function(a,g,y,d,c,t){var b;d=this.createElement("svg").attr({version:"1.1",
"class":"highcharts-root"}).css(this.getStyle(d));b=d.element;a.appendChild(b);-1===a.innerHTML.indexOf("xmlns")&&r(b,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=b;this.boxWrapper=d;this.alignedObjects=[];this.url=(B||J)&&f.getElementsByTagName("base").length?R.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(f.createTextNode("Created with Highstock 6.0.1"));this.defs=this.createElement("defs").add();
this.allowHTML=t;this.forExport=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,y,!1);var k;B&&a.getBoundingClientRect&&(g=function(){n(a,{left:0,top:0});k=a.getBoundingClientRect();n(a,{left:Math.ceil(k.left)-k.left+"px",top:Math.ceil(k.top)-k.top+"px"})},g(),this.unSubPixelFix=F(R,"resize",g))},getStyle:function(a){return this.style=c({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},
isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();l(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,a);return g},draw:d,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-a[2]/2+g.cy*a[2],r:g.r*a[2]}},getSpanWidth:function(a,g){var y=
a.getBBox(!0).width;!M&&this.forExport&&(y=this.measureSpanWidth(g.firstChild.data,a.styles));return y},applyEllipsis:function(a,g,y,d){var c=a.rotation,t=y,b,k=0,m=y.length,x=function(a){g.removeChild(g.firstChild);a&&g.appendChild(f.createTextNode(a))},q;a.rotation=0;t=this.getSpanWidth(a,g);if(q=t>d){for(;k<=m;)b=Math.ceil((k+m)/2),t=y.substring(0,b)+"\u2026",x(t),t=this.getSpanWidth(a,g),k===m?k=m+1:t>d?m=b-1:k=b;0===m&&x("")}a.rotation=c;return q},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;",
"\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot"},buildText:function(a){var y=a.element,d=this,c=d.forExport,k=G(a.textStr,"").toString(),m=-1!==k.indexOf("\x3c"),x=y.childNodes,w,e,I,v,A=r(y,"x"),l=a.styles,B=a.textWidth,N=l&&l.lineHeight,P=l&&l.textOutline,H=l&&"ellipsis"===l.textOverflow,h=l&&"nowrap"===l.whiteSpace,J=l&&l.fontSize,K,R,u=x.length,l=B&&!a.added&&this.box,p=function(a){var c;c=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:J||d.style.fontSize||12;return N?g(N):d.fontMetrics(c,
a.getAttribute("style")?a:y).h},z=function(a){t(d.escapes,function(g,y){a=a.replace(new RegExp(g,"g"),y)});return a};K=[k,H,h,N,P,J,B].join();if(K!==a.textCache){for(a.textCache=K;u--;)y.removeChild(x[u]);m||P||H||B||-1!==k.indexOf(" ")?(w=/<.*class="([^"]+)".*>/,e=/<.*style="([^"]+)".*>/,I=/<.*href="([^"]+)".*>/,l&&l.appendChild(y),k=m?k.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
"\x3c/span\x3e").split(/<br.*?>/g):[k],k=q(k,function(a){return""!==a}),b(k,function(g,t){var k,m=0;g=g.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");k=g.split("|||");b(k,function(g){if(""!==g||1===k.length){var b={},x=f.createElementNS(d.SVG_NS,"tspan"),q,G;w.test(g)&&(q=g.match(w)[1],r(x,"class",q));e.test(g)&&(G=g.match(e)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),r(x,"style",G));I.test(g)&&!c&&(r(x,"onclick",'location.href\x3d"'+g.match(I)[1]+
'"'),r(x,"class","highcharts-anchor"),n(x,{cursor:"pointer"}));g=z(g.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==g){x.appendChild(f.createTextNode(g));m?b.dx=0:t&&null!==A&&(b.x=A);r(x,b);y.appendChild(x);!m&&R&&(!M&&c&&n(x,{display:"block"}),r(x,"dy",p(x)));if(B){b=g.replace(/([^\^])-/g,"$1- ").split(" ");q=1<k.length||t||1<b.length&&!h;var l=[],N,P=p(x),S=a.rotation;for(H&&(v=d.applyEllipsis(a,x,g,B));!H&&q&&(b.length||l.length);)a.rotation=0,N=d.getSpanWidth(a,x),g=N>B,void 0===v&&(v=g),
g&&1!==b.length?(x.removeChild(x.firstChild),l.unshift(b.pop())):(b=l,l=[],b.length&&!h&&(x=f.createElementNS(O,"tspan"),r(x,{dy:P,x:A}),G&&r(x,"style",G),y.appendChild(x)),N>B&&(B=N)),b.length&&x.appendChild(f.createTextNode(b.join(" ").replace(/- /g,"-")));a.rotation=S}m++}}});R=R||y.childNodes.length}),v&&a.attr("title",a.textStr),l&&l.removeChild(y),P&&a.applyTextOutline&&a.applyTextOutline(P)):y.appendChild(f.createTextNode(z(k)))}},getContrast:function(a){a=p(a).rgba;return 510<a[0]+a[1]+a[2]?
"#000000":"#FFFFFF"},button:function(a,g,y,d,b,k,t,m,q){var M=this.label(a,g,y,q,null,null,null,null,"button"),f=0;M.attr(x({padding:8,r:2},b));var w,e,I,v;b=x({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},b);w=b.style;delete b.style;k=x(b,{fill:"#e6e6e6"},k);e=k.style;delete k.style;t=x(b,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},t);I=t.style;delete t.style;m=x(b,{style:{color:"#cccccc"}},m);v=m.style;delete m.style;
F(M.element,K?"mouseover":"mouseenter",function(){3!==f&&M.setState(1)});F(M.element,K?"mouseout":"mouseleave",function(){3!==f&&M.setState(f)});M.setState=function(a){1!==a&&(M.state=f=a);M.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);M.attr([b,k,t,m][a||0]).css([w,e,I,v][a||0])};M.attr(b).css(c({cursor:"default"},w));return M.on("click",function(a){3!==f&&d.call(M,a)})},crispLine:function(a,g){a[1]===
a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g={fill:"none"};H(a)?g.d=a:k(a)&&c(g,a);return this.createElement("path").attr(g)},circle:function(a,g,y){a=k(a)?a:{x:a,y:g,r:y};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,y){y.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,y,d,b,c){k(a)?(d=a,g=d.y,y=d.r,a=d.x):d={innerR:d,start:b,end:c};a=this.symbol("arc",a,g,y,y,d);a.r=y;return a},rect:function(a,
g,y,d,b,c){b=k(a)?a.r:b;var t=this.createElement("rect");a=k(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(y,0),height:Math.max(d,0)};void 0!==c&&(a.strokeWidth=c,a=t.crisp(a));a.fill="none";b&&(a.r=b);t.rSetter=function(a,g,y){r(y,{rx:a,ry:a})};return t.attr(a)},setSize:function(a,g,y){var d=this.alignedObjects,b=d.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:G(y,!0)?
void 0:0});b--;)d[b].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,g,y,d,b){var t={preserveAspectRatio:"none"};1<arguments.length&&c(t,{x:g,y:y,width:d,height:b});t=this.createElement("image").attr(t);t.element.setAttributeNS?t.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):t.element.setAttribute("hc-svg-href",a);return t},symbol:function(a,g,y,d,t,k){var m=this,x,q=/^url\((.*?)\)$/,M=q.test(a),w=!M&&(this.symbols[a]?
a:"circle"),e=w&&this.symbols[w],v=z(g)&&e&&e.call(this.symbols,Math.round(g),Math.round(y),d,t,k),l,A;e?(x=this.path(v),x.attr("fill","none"),c(x,{symbolName:w,x:g,y:y,width:d,height:t}),k&&c(x,k)):M&&(l=a.match(q)[1],x=this.image(l),x.imgwidth=G(N[l]&&N[l].width,k&&k.width),x.imgheight=G(N[l]&&N[l].height,k&&k.height),A=function(){x.attr({width:x.width,height:x.height})},b(["width","height"],function(a){x[a+"Setter"]=function(a,g){var y={},d=this["img"+g],b="width"===g?"translateX":"translateY";
this[g]=a;z(d)&&(this.element&&this.element.setAttribute(g,d),this.alignByTranslate||(y[b]=((this[g]||0)-d)/2,this.attr(y)))}}),z(g)&&x.attr({x:g,y:y}),x.isImg=!0,z(x.imgwidth)&&z(x.imgheight)?A():(x.attr({width:0,height:0}),u("img",{onload:function(){var a=h[m.chartIndex];0===this.width&&(n(this,{position:"absolute",top:"-999em"}),f.body.appendChild(this));N[l]={width:this.width,height:this.height};x.imgwidth=this.width;x.imgheight=this.height;x.element&&A();this.parentNode&&this.parentNode.removeChild(this);
m.imgCount--;if(!m.imgCount&&a&&a.onload)a.onload()},src:l}),this.imgCount++));return x},symbols:{circle:function(a,g,y,d){return this.arc(a+y/2,g+d/2,y/2,d/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,g,y,d){return["M",a,g,"L",a+y,g,a+y,g+d,a,g+d,"Z"]},triangle:function(a,g,y,d){return["M",a+y/2,g,"L",a+y,g+d,a,g+d,"Z"]},"triangle-down":function(a,g,y,d){return["M",a,g,"L",a+y,g,a+y/2,g+d,"Z"]},diamond:function(a,g,y,d){return["M",a+y/2,g,"L",a+y,g+d/2,a+y/2,g+d,a,g+d/2,"Z"]},arc:function(a,
g,y,d,b){var t=b.start,c=b.r||y,k=b.r||d||y,x=b.end-.001;y=b.innerR;d=G(b.open,.001>Math.abs(b.end-b.start-2*Math.PI));var m=Math.cos(t),q=Math.sin(t),M=Math.cos(x),x=Math.sin(x);b=.001>b.end-t-Math.PI?0:1;c=["M",a+c*m,g+k*q,"A",c,k,0,b,1,a+c*M,g+k*x];z(y)&&c.push(d?"M":"L",a+y*M,g+y*x,"A",y,y,0,b,0,a+y*m,g+y*q);c.push(d?"":"Z");return c},callout:function(a,g,y,d,b){var c=Math.min(b&&b.r||0,y,d),t=c+6,k=b&&b.anchorX;b=b&&b.anchorY;var x;x=["M",a+c,g,"L",a+y-c,g,"C",a+y,g,a+y,g,a+y,g+c,"L",a+y,g+d-
c,"C",a+y,g+d,a+y,g+d,a+y-c,g+d,"L",a+c,g+d,"C",a,g+d,a,g+d,a,g+d-c,"L",a,g+c,"C",a,g,a,g,a+c,g];k&&k>y?b>g+t&&b<g+d-t?x.splice(13,3,"L",a+y,b-6,a+y+6,b,a+y,b+6,a+y,g+d-c):x.splice(13,3,"L",a+y,d/2,k,b,a+y,d/2,a+y,g+d-c):k&&0>k?b>g+t&&b<g+d-t?x.splice(33,3,"L",a,b+6,a-6,b,a,b-6,a,g+c):x.splice(33,3,"L",a,d/2,k,b,a,d/2,a,g+c):b&&b>d&&k>a+t&&k<a+y-t?x.splice(23,3,"L",k+6,g+d,k,g+d+6,k-6,g+d,a+c,g+d):b&&0>b&&k>a+t&&k<a+y-t&&x.splice(3,3,"L",k-6,g,k,g-6,k+6,g,y-c,g);return x}},clipRect:function(g,y,d,
b){var c=a.uniqueKey(),k=this.createElement("clipPath").attr({id:c}).add(this.defs);g=this.rect(g,y,d,b,0).add(k);g.id=c;g.clipPath=k;g.count=0;return g},text:function(a,g,y,d){var b={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,g,y);b.x=Math.round(g||0);y&&(b.y=Math.round(y));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);d||(a.xSetter=function(a,g,y){var d=y.getElementsByTagName("tspan"),b,c=y.getAttribute(g),k;for(k=0;k<d.length;k++)b=d[k],b.getAttribute(g)===c&&b.setAttribute(g,
a);y.setAttribute(g,a)});return a},fontMetrics:function(a,y){a=a||y&&y.style&&y.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?g(a):/em/.test(a)?parseFloat(a)*(y?this.fontMetrics(null,y.parentNode).f:16):12;y=24>a?a+3:Math.round(1.2*a);return{h:y,b:Math.round(.8*y),f:a}},rotCorr:function(a,g,y){var d=a;g&&y&&(d=Math.max(d*Math.cos(g*e),4));return{x:-a/3*Math.sin(g*e),y:d}},label:function(g,d,k,t,m,q,M,w,f){var e=this,v=e.g("button"!==f&&"label"),l=v.text=e.text("",0,0,M).attr({zIndex:1}),
G,A,B=0,N=3,n=0,P,H,h,J,I,K={},R,u,O=/^url\((.*?)\)$/.test(t),p=O,r,S,Y,W;f&&v.addClass("highcharts-"+f);p=O;r=function(){return(R||0)%2/2};S=function(){var a=l.element.style,g={};A=(void 0===P||void 0===H||I)&&z(l.textStr)&&l.getBBox();v.width=(P||A.width||0)+2*N+n;v.height=(H||A.height||0)+2*N;u=N+e.fontMetrics(a&&a.fontSize,l).b;p&&(G||(v.box=G=e.symbols[t]||O?e.symbol(t):e.rect(),G.addClass(("button"===f?"":"highcharts-label-box")+(f?" highcharts-"+f+"-box":"")),G.add(v),a=r(),g.x=a,g.y=(w?-u:
0)+a),g.width=Math.round(v.width),g.height=Math.round(v.height),G.attr(c(g,K)),K={})};Y=function(){var a=n+N,g;g=w?0:u;z(P)&&A&&("center"===I||"right"===I)&&(a+={center:.5,right:1}[I]*(P-A.width));if(a!==l.x||g!==l.y)l.attr("x",a),void 0!==g&&l.attr("y",g);l.x=a;l.y=g};W=function(a,g){G?G.attr(a,g):K[a]=g};v.onAdd=function(){l.add(v);v.attr({text:g||0===g?g:"",x:d,y:k});G&&z(m)&&v.attr({anchorX:m,anchorY:q})};v.widthSetter=function(g){P=a.isNumber(g)?g:null};v.heightSetter=function(a){H=a};v["text-alignSetter"]=
function(a){I=a};v.paddingSetter=function(a){z(a)&&a!==N&&(N=v.padding=a,Y())};v.paddingLeftSetter=function(a){z(a)&&a!==n&&(n=a,Y())};v.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==B&&(B=a,A&&v.attr({x:h}))};v.textSetter=function(a){void 0!==a&&l.textSetter(a);S();Y()};v["stroke-widthSetter"]=function(a,g){a&&(p=!0);R=this["stroke-width"]=a;W(g,a)};v.strokeSetter=v.fillSetter=v.rSetter=function(a,g){"r"!==g&&("fill"===g&&a&&(p=!0),v[g]=a);W(g,a)};v.anchorXSetter=function(a,g){m=v.anchorX=
a;W(g,Math.round(a)-r()-h)};v.anchorYSetter=function(a,g){q=v.anchorY=a;W(g,a-J)};v.xSetter=function(a){v.x=a;B&&(a-=B*((P||A.width)+2*N));h=Math.round(a);v.attr("translateX",h)};v.ySetter=function(a){J=v.y=Math.round(a);v.attr("translateY",J)};var ba=v.css;return c(v,{css:function(a){if(a){var g={};a=x(a);b(v.textProps,function(y){void 0!==a[y]&&(g[y]=a[y],delete a[y])});l.css(g)}return ba.call(v,a)},getBBox:function(){return{width:A.width+2*N,height:A.height+2*N,x:A.x-N,y:A.y-N}},shadow:function(a){a&&
(S(),G&&G.shadow(a));return v},destroy:function(){y(v.element,"mouseenter");y(v.element,"mouseleave");l&&(l=l.destroy());G&&(G=G.destroy());E.prototype.destroy.call(v);v=e=S=Y=W=null}})}});a.Renderer=D})(L);(function(a){var E=a.attr,D=a.createElement,F=a.css,C=a.defined,r=a.each,h=a.extend,p=a.isFirefox,n=a.isMS,u=a.isWebKit,z=a.pInt,e=a.SVGRenderer,l=a.win,f=a.wrap;h(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,
this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=h(this.styles,a);F(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,c=this.element,f=this.translateX||0,q=this.translateY||0,m=this.x||0,v=this.y||0,e=this.textAlign||"left",l={left:0,center:.5,right:1}[e],n=this.styles;F(c,
{marginLeft:f,marginTop:q});this.shadows&&r(this.shadows,function(a){F(a,{marginLeft:f+1,marginTop:q+1})});this.inverted&&r(c.childNodes,function(d){a.invertChild(d,c)});if("SPAN"===c.tagName){var k=this.rotation,A=z(this.textWidth),h=n&&n.whiteSpace,x=[k,e,c.innerHTML,this.textWidth,this.textAlign].join();x!==this.cTT&&(n=a.fontMetrics(c.style.fontSize).b,C(k)&&this.setSpanRotation(k,l,n),F(c,{width:"",whiteSpace:h||"nowrap"}),c.offsetWidth>A&&/[ \-]/.test(c.textContent||c.innerText)&&F(c,{width:A+
"px",display:"block",whiteSpace:h||"normal"}),this.getSpanCorrection(c.offsetWidth,n,l,k,e));F(c,{left:m+(this.xCorr||0)+"px",top:v+(this.yCorr||0)+"px"});u&&(n=c.offsetHeight);this.cTT=x}}else this.alignOnAdd=!0},setSpanRotation:function(a,c,e){var b={},m=this.renderer.getTransformKey();b[m]=b.transform="rotate("+a+"deg)";b[m+(p?"Origin":"-origin")]=b.transformOrigin=100*c+"% "+e+"px";F(this.element,b)},getSpanCorrection:function(a,c,e){this.xCorr=-a*e;this.yCorr=-c}});h(e.prototype,{getTransformKey:function(){return n&&
!/Edge/.test(l.navigator.userAgent)?"-ms-transform":u?"-webkit-transform":p?"MozTransform":l.opera?"-o-transform":""},html:function(a,c,e){var b=this.createElement("span"),m=b.element,v=b.renderer,w=v.isSVG,l=function(a,b){r(["opacity","visibility"],function(c){f(a,c+"Setter",function(a,c,d,k){a.call(this,c,d,k);b[d]=c})})};b.textSetter=function(a){a!==m.innerHTML&&delete this.bBox;m.innerHTML=this.textStr=a;b.htmlUpdateTransform()};w&&l(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=
function(a,c){"align"===c&&(c="textAlign");b[c]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(c),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});m.style.whiteSpace="nowrap";b.css=b.htmlCss;w&&(b.add=function(a){var c,q=v.box.parentNode,e=[];if(this.parentGroup=a){if(c=a.div,!c){for(;a;)e.push(a),a=a.parentGroup;r(e.reverse(),function(a){function d(g,y){a[y]=g;t[v.getTransformKey()]="translate("+a.x+"px,"+a.y+"px)";a.doTransform=!0}
var t,k=E(a.element,"class");k&&(k={className:k});c=a.div=a.div||D("div",k,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},c||q);t=c.style;h(a,{classSetter:function(a){this.element.setAttribute("class",a);c.className=a},on:function(){e[0].div&&b.on.apply({element:e[0].div},arguments);return a},translateXSetter:d,translateYSetter:d});l(a,t)})}}else c=q;c.appendChild(m);b.added=!0;b.alignOnAdd&&
b.htmlUpdateTransform();return b});return b}})})(L);(function(a){function E(){var n=a.defaultOptions.global,h=p.moment;if(n.timezone){if(h)return function(a){return-h.tz(a,n.timezone).utcOffset()};a.error(25)}return n.useUTC&&n.getTimezoneOffset}function D(){var n=a.defaultOptions.global,u,z=n.useUTC,e=z?"getUTC":"get",l=z?"setUTC":"set",f="Minutes Hours Day Date Month FullYear".split(" "),b=f.concat(["Milliseconds","Seconds"]);a.Date=u=n.Date||p.Date;u.hcTimezoneOffset=z&&n.timezoneOffset;u.hcGetTimezoneOffset=
E();u.hcMakeTime=function(a,b,q,m,e,f){var c;z?(c=u.UTC.apply(0,arguments),c+=C(c)):c=(new u(a,b,h(q,1),h(m,0),h(e,0),h(f,0))).getTime();return c};for(n=0;n<f.length;n++)u["hcGet"+f[n]]=e+f[n];for(n=0;n<b.length;n++)u["hcSet"+b[n]]=l+b[n]}var F=a.color,C=a.getTZOffset,r=a.merge,h=a.pick,p=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",
months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},
itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,
animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:F("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(n){a.defaultOptions=r(!0,a.defaultOptions,n);D();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;D()})(L);
(function(a){var E=a.correctFloat,D=a.defined,F=a.destroyObjectProperties,C=a.isNumber,r=a.merge,h=a.pick,p=a.deg2rad;a.Tick=function(a,h,p,e){this.axis=a;this.pos=h;this.type=p||"";this.isNewLabel=this.isNew=!0;p||e||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,u=a.options,p=a.chart,e=a.categories,l=a.names,f=this.pos,b=u.labels,c=a.tickPositions,w=f===c[0],q=f===c[c.length-1],l=e?h(e[f],l[f],f):f,e=this.label,c=c.info,m;a.isDatetimeAxis&&c&&(m=u.dateTimeLabelFormats[c.higherRanks[f]||
c.unitName]);this.isFirst=w;this.isLast=q;u=a.labelFormatter.call({axis:a,chart:p,isFirst:w,isLast:q,dateTimeLabelFormat:m,value:a.isLog?E(a.lin2log(l)):l,pos:f});D(e)?e&&e.attr({text:u}):(this.labelLength=(this.label=e=D(u)&&b.enabled?p.renderer.text(u,0,0,b.useHTML).css(r(b.style)).add(a.labelGroup):null)&&e.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var n=this.axis,z=a.x,e=n.chart.chartWidth,
l=n.chart.spacing,f=h(n.labelLeft,Math.min(n.pos,l[3])),l=h(n.labelRight,Math.max(n.pos+n.len,e-l[1])),b=this.label,c=this.rotation,w={left:0,center:.5,right:1}[n.labelAlign],q=b.getBBox().width,m=n.getSlotWidth(),v=m,H=1,B,K={};if(c)0>c&&z-w*q<f?B=Math.round(z/Math.cos(c*p)-f):0<c&&z+w*q>l&&(B=Math.round((e-z)/Math.cos(c*p)));else if(e=z+(1-w)*q,z-w*q<f?v=a.x+v*(1-w)-f:e>l&&(v=l-a.x+v*w,H=-1),v=Math.min(m,v),v<m&&"center"===n.labelAlign&&(a.x+=H*(m-v-w*(m-Math.min(q,v)))),q>v||n.autoRotation&&(b.styles||
{}).width)B=v;B&&(K.width=B,(n.options.labels.style||{}).textOverflow||(K.textOverflow="ellipsis"),b.css(K))},getPosition:function(a,h,p,e){var l=this.axis,f=l.chart,b=e&&f.oldChartHeight||f.chartHeight;return{x:a?l.translate(h+p,null,null,e)+l.transB:l.left+l.offset+(l.opposite?(e&&f.oldChartWidth||f.chartWidth)-l.right-l.left:0),y:a?b-l.bottom+l.offset-(l.opposite?l.height:0):b-l.translate(h+p,null,null,e)-l.transB}},getLabelPosition:function(a,h,z,e,l,f,b,c){var w=this.axis,q=w.transA,m=w.reversed,
v=w.staggerLines,n=w.tickRotCorr||{x:0,y:0},B=l.y;D(B)||(B=0===w.side?z.rotation?-8:-z.getBBox().height:2===w.side?n.y+8:Math.cos(z.rotation*p)*(n.y-z.getBBox(!1,0).height/2));a=a+l.x+n.x-(f&&e?f*q*(m?-1:1):0);h=h+B-(f&&!e?f*q*(m?1:-1):0);v&&(z=b/(c||1)%v,w.opposite&&(z=v-z-1),h+=w.labelOffset/v*z);return{x:a,y:Math.round(h)}},getMarkPath:function(a,h,p,e,l,f){return f.crispLine(["M",a,h,"L",a+(l?0:-p),h+(l?p:0)],e)},renderGridLine:function(a,h,p){var e=this.axis,l=e.options,f=this.gridLine,b={},
c=this.pos,w=this.type,q=e.tickmarkOffset,m=e.chart.renderer,v=w?w+"Grid":"grid",n=l[v+"LineWidth"],B=l[v+"LineColor"],l=l[v+"LineDashStyle"];f||(b.stroke=B,b["stroke-width"]=n,l&&(b.dashstyle=l),w||(b.zIndex=1),a&&(b.opacity=0),this.gridLine=f=m.path().attr(b).addClass("highcharts-"+(w?w+"-":"")+"grid-line").add(e.gridGroup));if(!a&&f&&(a=e.getPlotLinePath(c+q,f.strokeWidth()*p,a,!0)))f[this.isNew?"attr":"animate"]({d:a,opacity:h})},renderMark:function(a,p,z){var e=this.axis,l=e.options,f=e.chart.renderer,
b=this.type,c=b?b+"Tick":"tick",w=e.tickSize(c),q=this.mark,m=!q,v=a.x;a=a.y;var n=h(l[c+"Width"],!b&&e.isXAxis?1:0),l=l[c+"Color"];w&&(e.opposite&&(w[0]=-w[0]),m&&(this.mark=q=f.path().addClass("highcharts-"+(b?b+"-":"")+"tick").add(e.axisGroup),q.attr({stroke:l,"stroke-width":n})),q[m?"attr":"animate"]({d:this.getMarkPath(v,a,w[0],q.strokeWidth()*z,e.horiz,f),opacity:p}))},renderLabel:function(a,p,z,e){var l=this.axis,f=l.horiz,b=l.options,c=this.label,w=b.labels,q=w.step,m=l.tickmarkOffset,v=!0,
H=a.x;a=a.y;c&&C(H)&&(c.xy=a=this.getLabelPosition(H,a,c,f,w,m,e,q),this.isFirst&&!this.isLast&&!h(b.showFirstLabel,1)||this.isLast&&!this.isFirst&&!h(b.showLastLabel,1)?v=!1:!f||l.isRadial||w.step||w.rotation||p||0===z||this.handleOverflow(a),q&&e%q&&(v=!1),v&&C(a.y)?(a.opacity=z,c[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(c.attr("y",-9999),this.isNewLabel=!0))},render:function(a,p,z){var e=this.axis,l=e.horiz,f=this.getPosition(l,this.pos,e.tickmarkOffset,p),b=f.x,c=f.y,e=l&&b===
e.pos+e.len||!l&&c===e.pos?-1:1;z=h(z,1);this.isActive=!0;this.renderGridLine(p,z,e);this.renderMark(f,z,e);this.renderLabel(f,p,z,a);this.isNew=!1},destroy:function(){F(this,this.axis)}}})(L);var aa=function(a){var E=a.addEvent,D=a.animObject,F=a.arrayMax,C=a.arrayMin,r=a.color,h=a.correctFloat,p=a.defaultOptions,n=a.defined,u=a.deg2rad,z=a.destroyObjectProperties,e=a.each,l=a.extend,f=a.fireEvent,b=a.format,c=a.getMagnitude,w=a.grep,q=a.inArray,m=a.isArray,v=a.isNumber,H=a.isString,B=a.merge,K=
a.normalizeTickInterval,k=a.objectEach,A=a.pick,J=a.removeEvent,x=a.splat,d=a.syncTimeout,t=a.Tick,G=function(){this.init.apply(this,arguments)};a.extend(G.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,
startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,
enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,y){var g=y.isX,d=this;d.chart=
a;d.horiz=a.inverted&&!d.isZAxis?!g:g;d.isXAxis=g;d.coll=d.coll||(g?"xAxis":"yAxis");d.opposite=y.opposite;d.side=y.side||(d.horiz?d.opposite?0:2:d.opposite?1:3);d.setOptions(y);var b=this.options,c=b.type;d.labelFormatter=b.labels.formatter||d.defaultLabelFormatter;d.userOptions=y;d.minPixelPadding=0;d.reversed=b.reversed;d.visible=!1!==b.visible;d.zoomEnabled=!1!==b.zoomEnabled;d.hasNames="category"===c||!0===b.categories;d.categories=b.categories||d.hasNames;d.names=d.names||[];d.plotLinesAndBandsGroups=
{};d.isLog="logarithmic"===c;d.isDatetimeAxis="datetime"===c;d.positiveValuesOnly=d.isLog&&!d.allowNegativeLog;d.isLinked=n(b.linkedTo);d.ticks={};d.labelEdge=[];d.minorTicks={};d.plotLinesAndBands=[];d.alternateBands={};d.len=0;d.minRange=d.userMinRange=b.minRange||b.maxZoom;d.range=b.range;d.offset=b.offset||0;d.stacks={};d.oldStacks={};d.stacksTouched=0;d.max=null;d.min=null;d.crosshair=A(b.crosshair,x(a.options.tooltip.crosshairs)[g?0:1],!1);y=d.options.events;-1===q(d,a.axes)&&(g?a.axes.splice(a.xAxis.length,
0,d):a.axes.push(d),a[d.coll].push(d));d.series=d.series||[];a.inverted&&!d.isZAxis&&g&&void 0===d.reversed&&(d.reversed=!0);k(y,function(a,g){E(d,g,a)});d.lin2log=b.linearToLogConverter||d.lin2log;d.isLog&&(d.val2lin=d.log2lin,d.lin2val=d.lin2log)},setOptions:function(a){this.options=B(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],B(p[this.coll],a))},
defaultLabelFormatter:function(){var g=this.axis,d=this.value,c=g.categories,k=this.dateTimeLabelFormat,t=p.lang,m=t.numericSymbols,t=t.numericSymbolMagnitude||1E3,x=m&&m.length,q,e=g.options.labels.format,g=g.isLog?Math.abs(d):g.tickInterval;if(e)q=b(e,this);else if(c)q=d;else if(k)q=a.dateFormat(k,d);else if(x&&1E3<=g)for(;x--&&void 0===q;)c=Math.pow(t,x+1),g>=c&&0===10*d%c&&null!==m[x]&&0!==d&&(q=a.numberFormat(d/c,-1)+m[x]);void 0===q&&(q=1E4<=Math.abs(d)?a.numberFormat(d,-1):a.numberFormat(d,
-1,void 0,""));return q},getSeriesExtremes:function(){var a=this,d=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();e(a.series,function(g){if(g.visible||!d.options.chart.ignoreHiddenSeries){var y=g.options,b=y.threshold,c;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=b&&(b=null);if(a.isXAxis)y=g.xData,y.length&&(g=C(y),v(g)||g instanceof Date||(y=w(y,function(a){return v(a)}),g=C(y)),a.dataMin=Math.min(A(a.dataMin,y[0]),
g),a.dataMax=Math.max(A(a.dataMax,y[0]),F(y)));else if(g.getExtremes(),c=g.dataMax,g=g.dataMin,n(g)&&n(c)&&(a.dataMin=Math.min(A(a.dataMin,g),g),a.dataMax=Math.max(A(a.dataMax,c),c)),n(b)&&(a.threshold=b),!y.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,d,b,c,t,k){var g=this.linkedParent||this,y=1,x=0,m=c?g.oldTransA:g.transA;c=c?g.oldMin:g.min;var q=g.minPixelPadding;t=(g.isOrdinal||g.isBroken||g.isLog&&t)&&g.lin2val;m||(m=g.transA);b&&(y*=-1,x=g.len);g.reversed&&
(y*=-1,x-=y*(g.sector||g.len));d?(a=(a*y+x-q)/m+c,t&&(a=g.lin2val(a))):(t&&(a=g.val2lin(a)),a=v(c)?y*(a-c)*m+x+y*q+(v(k)?m*k:0):void 0);return a},toPixels:function(a,d){return this.translate(a,!1,!this.horiz,null,!0)+(d?0:this.pos)},toValue:function(a,d){return this.translate(a-(d?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,d,b,c,t){var g=this.chart,y=this.left,k=this.top,m,x,q=b&&g.oldChartHeight||g.chartHeight,e=b&&g.oldChartWidth||g.chartWidth,f;m=this.transB;var w=function(a,
g,d){if(a<g||a>d)c?a=Math.min(Math.max(g,a),d):f=!0;return a};t=A(t,this.translate(a,null,null,b));a=b=Math.round(t+m);m=x=Math.round(q-t-m);v(t)?this.horiz?(m=k,x=q-this.bottom,a=b=w(a,y,y+this.width)):(a=y,b=e-this.right,m=x=w(m,k,k+this.height)):(f=!0,c=!1);return f&&!c?null:g.renderer.crispLine(["M",a,m,"L",b,x],d||1)},getLinearTickPositions:function(a,d,b){var g,y=h(Math.floor(d/a)*a);b=h(Math.ceil(b/a)*a);var c=[];if(this.single)return[d];for(d=y;d<=b;){c.push(d);d=h(d+a);if(d===g)break;g=d}return c},
getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?A(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,d=a.options,b=a.tickPositions,c=a.minorTickInterval,t=[],k=a.pointRangePadding||0,m=a.min-k,k=a.max+k,x=k-m;if(x&&x/c<a.len/3)if(a.isLog)e(this.paddedTicks,function(g,d,y){d&&t.push.apply(t,a.getLogTickPositions(c,y[d-1],y[d],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())t=t.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c),
m,k,d.startOfWeek));else for(d=m+(b[0]-m)%c;d<=k&&d!==t[0];d+=c)t.push(d);0!==t.length&&a.trimTicks(t);return t},adjustForMinRange:function(){var a=this.options,d=this.min,b=this.max,c,t,k,m,x,q,v,f;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(n(a.min)||n(a.max)?this.minRange=null:(e(this.series,function(a){q=a.xData;for(m=v=a.xIncrement?1:q.length-1;0<m;m--)if(x=q[m]-q[m-1],void 0===k||x<k)k=x}),this.minRange=Math.min(5*k,this.dataMax-this.dataMin)));b-d<this.minRange&&(t=this.dataMax-this.dataMin>=
this.minRange,f=this.minRange,c=(f-b+d)/2,c=[d-c,A(a.min,d-c)],t&&(c[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),d=F(c),b=[d+f,A(a.max,d+f)],t&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=C(b),b-d<f&&(c[0]=b-f,c[1]=A(a.min,b-f),d=F(c)));this.min=d;this.max=b},getClosest:function(){var a;this.categories?a=1:e(this.series,function(g){var d=g.closestPointRange,y=g.visible||!g.chart.options.chart.ignoreHiddenSeries;!g.noSharedTooltip&&n(d)&&y&&(a=n(a)?Math.min(a,d):d)});return a},
nameToX:function(a){var g=m(this.categories),d=g?this.categories:this.names,b=a.options.x,c;a.series.requireSorting=!1;n(b)||(b=!1===this.options.uniqueNames?a.series.autoIncrement():q(a.name,d));-1===b?g||(c=d.length):c=b;void 0!==c&&(this.names[c]=a.name);return c},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,e(this.series||[],function(g){g.xIncrement=null;if(!g.points||g.isDirtyData)g.processData(),g.generatePoints();e(g.points,function(d,
y){var b;d.options&&(b=a.nameToX(d),void 0!==b&&b!==d.x&&(d.x=b,g.xData[y]=b))})}))},setAxisTranslation:function(a){var g=this,d=g.max-g.min,b=g.axisPointRange||0,c,t=0,k=0,m=g.linkedParent,x=!!g.categories,q=g.transA,f=g.isXAxis;if(f||x||b)c=g.getClosest(),m?(t=m.minPointOffset,k=m.pointRangePadding):e(g.series,function(a){var d=x?1:f?A(a.options.pointRange,c,0):g.axisPointRange||0;a=a.options.pointPlacement;b=Math.max(b,d);g.single||(t=Math.max(t,H(a)?0:d/2),k=Math.max(k,"on"===a?0:d))}),m=g.ordinalSlope&&
c?g.ordinalSlope/c:1,g.minPointOffset=t*=m,g.pointRangePadding=k*=m,g.pointRange=Math.min(b,d),f&&(g.closestPointRange=c);a&&(g.oldTransA=q);g.translationSlope=g.transA=q=g.options.staticScale||g.len/(d+k||1);g.transB=g.horiz?g.left:g.bottom;g.minPixelPadding=q*t},minFromRange:function(){return this.max-this.range},setTickInterval:function(g){var d=this,b=d.chart,t=d.options,k=d.isLog,m=d.log2lin,x=d.isDatetimeAxis,q=d.isXAxis,w=d.isLinked,l=t.maxPadding,G=t.minPadding,B=t.tickInterval,H=t.tickPixelInterval,
J=d.categories,p=d.threshold,u=d.softThreshold,z,r,D,C;x||J||w||this.getTickAmount();D=A(d.userMin,t.min);C=A(d.userMax,t.max);w?(d.linkedParent=b[d.coll][t.linkedTo],b=d.linkedParent.getExtremes(),d.min=A(b.min,b.dataMin),d.max=A(b.max,b.dataMax),t.type!==d.linkedParent.options.type&&a.error(11,1)):(!u&&n(p)&&(d.dataMin>=p?(z=p,G=0):d.dataMax<=p&&(r=p,l=0)),d.min=A(D,z,d.dataMin),d.max=A(C,r,d.dataMax));k&&(d.positiveValuesOnly&&!g&&0>=Math.min(d.min,A(d.dataMin,d.min))&&a.error(10,1),d.min=h(m(d.min),
15),d.max=h(m(d.max),15));d.range&&n(d.max)&&(d.userMin=d.min=D=Math.max(d.dataMin,d.minFromRange()),d.userMax=C=d.max,d.range=null);f(d,"foundExtremes");d.beforePadding&&d.beforePadding();d.adjustForMinRange();!(J||d.axisPointRange||d.usePercentage||w)&&n(d.min)&&n(d.max)&&(m=d.max-d.min)&&(!n(D)&&G&&(d.min-=m*G),!n(C)&&l&&(d.max+=m*l));v(t.softMin)&&(d.min=Math.min(d.min,t.softMin));v(t.softMax)&&(d.max=Math.max(d.max,t.softMax));v(t.floor)&&(d.min=Math.max(d.min,t.floor));v(t.ceiling)&&(d.max=
Math.min(d.max,t.ceiling));u&&n(d.dataMin)&&(p=p||0,!n(D)&&d.min<p&&d.dataMin>=p?d.min=p:!n(C)&&d.max>p&&d.dataMax<=p&&(d.max=p));d.tickInterval=d.min===d.max||void 0===d.min||void 0===d.max?1:w&&!B&&H===d.linkedParent.options.tickPixelInterval?B=d.linkedParent.tickInterval:A(B,this.tickAmount?(d.max-d.min)/Math.max(this.tickAmount-1,1):void 0,J?1:(d.max-d.min)*H/Math.max(d.len,H));q&&!g&&e(d.series,function(a){a.processData(d.min!==d.oldMin||d.max!==d.oldMax)});d.setAxisTranslation(!0);d.beforeSetTickPositions&&
d.beforeSetTickPositions();d.postProcessTickInterval&&(d.tickInterval=d.postProcessTickInterval(d.tickInterval));d.pointRange&&!B&&(d.tickInterval=Math.max(d.pointRange,d.tickInterval));g=A(t.minTickInterval,d.isDatetimeAxis&&d.closestPointRange);!B&&d.tickInterval<g&&(d.tickInterval=g);x||k||B||(d.tickInterval=K(d.tickInterval,null,c(d.tickInterval),A(t.allowDecimals,!(.5<d.tickInterval&&5>d.tickInterval&&1E3<d.max&&9999>d.max)),!!this.tickAmount));this.tickAmount||(d.tickInterval=d.unsquish());
this.setTickPositions()},setTickPositions:function(){var a=this.options,d,b=a.tickPositions;d=this.getMinorTickInterval();var c=a.tickPositioner,t=a.startOnTick,k=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===d&&this.tickInterval?this.tickInterval/5:d;this.single=this.min===this.max&&n(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=d=b&&b.slice();
!d&&(d=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),d.length>this.len&&(d=[d[0],d.pop()]),this.tickPositions=d,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=d=c);this.paddedTicks=d.slice(0);this.trimTicks(d,t,k);this.isLinked||
(this.single&&2>d.length&&(this.min-=.5,this.max+=.5),b||c||this.adjustTickAmount())},trimTicks:function(a,d,b){var g=a[0],c=a[a.length-1],t=this.minPointOffset||0;if(!this.isLinked){if(d&&-Infinity!==g)this.min=g;else for(;this.min-t>a[0];)a.shift();if(b)this.max=c;else for(;this.max+t<a[a.length-1];)a.pop();0===a.length&&n(g)&&a.push((c+g)/2)}},alignToOthers:function(){var a={},d,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||this.isLog||e(this.chart[this.coll],function(g){var b=
g.options,b=[g.horiz?b.left:b.top,b.width,b.height,b.pane].join();g.series.length&&(a[b]?d=!0:a[b]=1)});return d},getTickAmount:function(){var a=this.options,d=a.tickAmount,b=a.tickPixelInterval;!n(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(d=2);!d&&this.alignToOthers()&&(d=Math.ceil(this.len/b)+1);4>d&&(this.finalTickAmt=d,d=5);this.tickAmount=d},adjustTickAmount:function(){var a=this.tickInterval,d=this.tickPositions,b=this.tickAmount,c=this.finalTickAmt,
t=d&&d.length;if(t<b){for(;d.length<b;)d.push(h(d[d.length-1]+a));this.transA*=(t-1)/(b-1);this.max=d[d.length-1]}else t>b&&(this.tickInterval*=2,this.setTickPositions());if(n(c)){for(a=b=d.length;a--;)(3===c&&1===a%2||2>=c&&0<a&&a<b-1)&&d.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,d;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();d=this.len!==this.oldAxisLength;e(this.series,function(d){if(d.isDirtyData||d.isDirty||d.xAxis.isDirty)a=
!0});d||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=d||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,d,b,c,t){var g=this,k=g.chart;b=A(b,!0);e(g.series,function(a){delete a.kdTree});
t=l(t,{min:a,max:d});f(g,"setExtremes",t,function(){g.userMin=a;g.userMax=d;g.eventArgs=t;b&&k.redraw(c)})},zoom:function(a,d){var g=this.dataMin,b=this.dataMax,c=this.options,t=Math.min(g,A(c.min,g)),c=Math.max(b,A(c.max,b));if(a!==this.min||d!==this.max)this.allowZoomOutside||(n(g)&&(a<t&&(a=t),a>c&&(a=c)),n(b)&&(d<t&&(d=t),d>c&&(d=c))),this.displayBtn=void 0!==a||void 0!==d,this.setExtremes(a,d,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var d=this.chart,b=this.options,c=b.offsets||
[0,0,0,0],t=this.horiz,k=this.width=Math.round(a.relativeLength(A(b.width,d.plotWidth-c[3]+c[1]),d.plotWidth)),m=this.height=Math.round(a.relativeLength(A(b.height,d.plotHeight-c[0]+c[2]),d.plotHeight)),x=this.top=Math.round(a.relativeLength(A(b.top,d.plotTop+c[0]),d.plotHeight,d.plotTop)),b=this.left=Math.round(a.relativeLength(A(b.left,d.plotLeft+c[3]),d.plotWidth,d.plotLeft));this.bottom=d.chartHeight-m-x;this.right=d.chartWidth-k-b;this.len=Math.max(t?k:m,0);this.pos=t?b:x},getExtremes:function(){var a=
this.isLog,d=this.lin2log;return{min:a?h(d(this.min)):this.min,max:a?h(d(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var d=this.isLog,g=this.lin2log,b=d?g(this.min):this.min,d=d?g(this.max):this.max;null===a?a=b:b>a?a=b:d<a&&(a=d);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(A(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var d=this.options,
g=d[a+"Length"],b=A(d[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(b&&g)return"inside"===d[a+"Position"]&&(g=-g),[g,b]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,d=this.horiz,b=this.tickInterval,c=b,t=this.len/(((this.categories?1:0)+this.max-this.min)/b),k,m=a.rotation,x=this.labelMetrics(),
q,f=Number.MAX_VALUE,v,w=function(a){a/=t||1;a=1<a?Math.ceil(a):1;return a*b};d?(v=!a.staggerLines&&!a.step&&(n(m)?[m]:t<A(a.autoRotationLimit,80)&&a.autoRotation))&&e(v,function(a){var d;if(a===m||a&&-90<=a&&90>=a)q=w(Math.abs(x.h/Math.sin(u*a))),d=q+Math.abs(a/360),d<f&&(f=d,k=a,c=q)}):a.step||(c=w(x.h));this.autoRotation=v;this.labelRotation=A(k,m);return c},getSlotWidth:function(){var a=this.chart,d=this.horiz,b=this.options.labels,c=Math.max(this.tickPositions.length-(this.categories?0:1),1),
t=a.margin[3];return d&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/c||!d&&(b.style&&parseInt(b.style.width,10)||t&&t-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,d=a.renderer,b=this.tickPositions,c=this.ticks,t=this.options.labels,k=this.horiz,m=this.getSlotWidth(),x=Math.max(1,Math.round(m-2*(t.padding||5))),q={},f=this.labelMetrics(),v=t.style&&t.style.textOverflow,w,l=0,G,A;H(t.rotation)||(q.rotation=t.rotation||0);e(b,function(a){(a=c[a])&&a.labelLength>
l&&(l=a.labelLength)});this.maxLabelLength=l;if(this.autoRotation)l>x&&l>f.h?q.rotation=this.labelRotation:this.labelRotation=0;else if(m&&(w={width:x+"px"},!v))for(w.textOverflow="clip",G=b.length;!k&&G--;)if(A=b[G],x=c[A].label)x.styles&&"ellipsis"===x.styles.textOverflow?x.css({textOverflow:"clip"}):c[A].labelLength>m&&x.css({width:m+"px"}),x.getBBox().height>this.len/b.length-(f.h-f.f)&&(x.specCss={textOverflow:"ellipsis"});q.rotation&&(w={width:(l>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+
"px"},v||(w.textOverflow="ellipsis"));if(this.labelAlign=t.align||this.autoLabelAlign(this.labelRotation))q.align=this.labelAlign;e(b,function(a){var d=(a=c[a])&&a.label;d&&(d.attr(q),w&&d.css(B(w,d.specCss)),delete d.specCss,a.rotation=q.rotation)});this.tickRotCorr=d.rotCorr(f.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||n(this.min)&&n(this.max)&&!!this.tickPositions},addTitle:function(a){var d=this.chart.renderer,g=this.horiz,b=this.opposite,c=this.options.title,
t;this.axisTitle||((t=c.textAlign)||(t=(g?{low:"left",middle:"center",high:"right"}:{low:b?"right":"left",middle:"center",high:b?"left":"right"})[c.align]),this.axisTitle=d.text(c.text,0,0,c.useHTML).attr({zIndex:7,rotation:c.rotation||0,align:t}).addClass("highcharts-axis-title").css(c.style).add(this.axisGroup),this.axisTitle.isNew=!0);c.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var d=this.ticks;d[a]?d[a].addLabel():
d[a]=new t(this,a)},getOffset:function(){var a=this,d=a.chart,b=d.renderer,c=a.options,t=a.tickPositions,m=a.ticks,x=a.horiz,q=a.side,f=d.inverted&&!a.isZAxis?[1,0,3,2][q]:q,v,w,l=0,G,B=0,h=c.title,H=c.labels,J=0,p=d.axisOffset,d=d.clipOffset,K=[-1,1,1,-1][q],u=c.className,z=a.axisParent,r=this.tickSize("tick");v=a.hasData();a.showAxis=w=v||A(c.showEmpty,!0);a.staggerLines=a.horiz&&H.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:c.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+
"-grid "+(u||"")).add(z),a.axisGroup=b.g("axis").attr({zIndex:c.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(u||"")).add(z),a.labelGroup=b.g("axis-labels").attr({zIndex:H.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(u||"")).add(z));v||a.isLinked?(e(t,function(d,g){a.generateTick(d,g)}),a.renderUnsquish(),!1===H.reserveSpace||0!==q&&2!==q&&{1:"left",3:"right"}[q]!==a.labelAlign&&"center"!==a.labelAlign||e(t,function(a){J=Math.max(m[a].getLabelSize(),J)}),a.staggerLines&&
(J*=a.staggerLines,a.labelOffset=J*(a.opposite?-1:1))):k(m,function(a,d){a.destroy();delete m[d]});h&&h.text&&!1!==h.enabled&&(a.addTitle(w),w&&!1!==h.reserveSpace&&(a.titleOffset=l=a.axisTitle.getBBox()[x?"height":"width"],G=h.offset,B=n(G)?0:A(h.margin,x?5:10)));a.renderLine();a.offset=K*A(c.offset,p[q]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===q?-a.labelMetrics().h:2===q?a.tickRotCorr.y:0;B=Math.abs(J)+B;J&&(B=B-b+K*(x?A(H.y,a.tickRotCorr.y+8*K):H.x));a.axisTitleMargin=A(G,B);p[q]=Math.max(p[q],
a.axisTitleMargin+l+K*a.offset,B,v&&t.length&&r?r[0]+K*a.offset:0);c=c.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);d[f]=Math.max(d[f],c)},getLinePath:function(a){var d=this.chart,g=this.opposite,b=this.offset,c=this.horiz,t=this.left+(g?this.width:0)+b,b=d.chartHeight-this.bottom-(g?this.height:0)+b;g&&(a*=-1);return d.renderer.crispLine(["M",c?this.left:t,c?b:this.top,"L",c?d.chartWidth-this.right:t,c?b:d.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,d=this.left,b=this.top,c=this.len,t=this.options.title,k=a?d:b,m=this.opposite,x=this.offset,q=t.x||0,f=t.y||0,v=this.axisTitle,e=this.chart.renderer.fontMetrics(t.style&&t.style.fontSize,v),v=Math.max(v.getBBox(null,0).height-e.h-1,0),c={low:k+(a?0:c),middle:k+c/2,high:k+(a?c:0)}[t.align],d=(a?b+this.height:d)+(a?1:-1)*(m?-1:1)*this.axisTitleMargin+[-v,
v,e.f,-v][this.side];return{x:a?c+q:d+(m?this.width:0)+x+q,y:a?d+f-(m?this.height:0)+x:c+f}},renderMinorTick:function(a){var d=this.chart.hasRendered&&v(this.oldMin),g=this.minorTicks;g[a]||(g[a]=new t(this,a,"minor"));d&&g[a].isNew&&g[a].render(null,!0);g[a].render(null,!1,1)},renderTick:function(a,d){var b=this.isLinked,g=this.ticks,c=this.chart.hasRendered&&v(this.oldMin);if(!b||a>=this.min&&a<=this.max)g[a]||(g[a]=new t(this,a)),c&&g[a].isNew&&g[a].render(d,!0,.1),g[a].render(d)},render:function(){var g=
this,b=g.chart,c=g.options,m=g.isLog,x=g.lin2log,q=g.isLinked,f=g.tickPositions,w=g.axisTitle,l=g.ticks,G=g.minorTicks,A=g.alternateBands,B=c.stackLabels,h=c.alternateGridColor,H=g.tickmarkOffset,n=g.axisLine,J=g.showAxis,p=D(b.renderer.globalAnimation),K,u;g.labelEdge.length=0;g.overlap=!1;e([l,G,A],function(a){k(a,function(a){a.isActive=!1})});if(g.hasData()||q)g.minorTickInterval&&!g.categories&&e(g.getMinorTickPositions(),function(a){g.renderMinorTick(a)}),f.length&&(e(f,function(a,d){g.renderTick(a,
d)}),H&&(0===g.min||g.single)&&(l[-1]||(l[-1]=new t(g,-1,null,!0)),l[-1].render(-1))),h&&e(f,function(d,c){u=void 0!==f[c+1]?f[c+1]+H:g.max-H;0===c%2&&d<g.max&&u<=g.max+(b.polar?-H:H)&&(A[d]||(A[d]=new a.PlotLineOrBand(g)),K=d+H,A[d].options={from:m?x(K):K,to:m?x(u):u,color:h},A[d].render(),A[d].isActive=!0)}),g._addedPlotLB||(e((c.plotLines||[]).concat(c.plotBands||[]),function(a){g.addPlotBandOrLine(a)}),g._addedPlotLB=!0);e([l,G,A],function(a){var g,c=[],t=p.duration;k(a,function(a,d){a.isActive||
(a.render(d,!1,0),a.isActive=!1,c.push(d))});d(function(){for(g=c.length;g--;)a[c[g]]&&!a[c[g]].isActive&&(a[c[g]].destroy(),delete a[c[g]])},a!==A&&b.hasRendered&&t?t:0)});n&&(n[n.isPlaced?"animate":"attr"]({d:this.getLinePath(n.strokeWidth())}),n.isPlaced=!0,n[J?"show":"hide"](!0));w&&J&&(c=g.getTitlePosition(),v(c.y)?(w[w.isNew?"attr":"animate"](c),w.isNew=!1):(w.attr("y",-9999),w.isNew=!0));B&&B.enabled&&g.renderStackTotals();g.isDirty=!1},redraw:function(){this.visible&&(this.render(),e(this.plotLinesAndBands,
function(a){a.render()}));e(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var d=this,b=d.stacks,g=d.plotLinesAndBands,c;a||J(d);k(b,function(a,d){z(a);b[d]=null});e([d.ticks,d.minorTicks,d.alternateBands],function(a){z(a)});if(g)for(a=g.length;a--;)g[a].destroy();e("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){d[a]&&(d[a]=d[a].destroy())});for(c in d.plotLinesAndBandsGroups)d.plotLinesAndBandsGroups[c]=
d.plotLinesAndBandsGroups[c].destroy();k(d,function(a,b){-1===q(b,d.keepProps)&&delete d[b]})},drawCrosshair:function(a,d){var b,g=this.crosshair,c=A(g.snap,!0),t,k=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(n(d)||!c)?(c?n(d)&&(t=this.isXAxis?d.plotX:this.len-d.plotY):t=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),n(t)&&(b=this.getPlotLinePath(d&&(this.isXAxis?d.x:A(d.stackY,d.y)),null,null,null,t)||null),n(b)?(d=this.categories&&!this.isRadial,k||(this.cross=
k=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(d?"category ":"thin ")+g.className).attr({zIndex:A(g.zIndex,2)}).add(),k.attr({stroke:g.color||(d?r("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":A(g.width,1)}).css({"pointer-events":"none"}),g.dashStyle&&k.attr({dashstyle:g.dashStyle})),k.show().attr({d:b}),d&&!g.width&&k.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&
this.cross.hide()}});return a.Axis=G}(L);(function(a){var E=a.Axis,D=a.Date,F=a.dateFormat,C=a.defaultOptions,r=a.defined,h=a.each,p=a.extend,n=a.getMagnitude,u=a.getTZOffset,z=a.normalizeTickInterval,e=a.pick,l=a.timeUnits;E.prototype.getTimeTicks=function(a,b,c,w){var q=[],m={},f=C.global.useUTC,H,B=new D(b-Math.max(u(b),u(c))),n=D.hcMakeTime,k=a.unitRange,A=a.count,J,x;if(r(b)){B[D.hcSetMilliseconds](k>=l.second?0:A*Math.floor(B.getMilliseconds()/A));if(k>=l.second)B[D.hcSetSeconds](k>=l.minute?
0:A*Math.floor(B.getSeconds()/A));if(k>=l.minute)B[D.hcSetMinutes](k>=l.hour?0:A*Math.floor(B[D.hcGetMinutes]()/A));if(k>=l.hour)B[D.hcSetHours](k>=l.day?0:A*Math.floor(B[D.hcGetHours]()/A));if(k>=l.day)B[D.hcSetDate](k>=l.month?1:A*Math.floor(B[D.hcGetDate]()/A));k>=l.month&&(B[D.hcSetMonth](k>=l.year?0:A*Math.floor(B[D.hcGetMonth]()/A)),H=B[D.hcGetFullYear]());if(k>=l.year)B[D.hcSetFullYear](H-H%A);if(k===l.week)B[D.hcSetDate](B[D.hcGetDate]()-B[D.hcGetDay]()+e(w,1));H=B[D.hcGetFullYear]();w=B[D.hcGetMonth]();
var d=B[D.hcGetDate](),t=B[D.hcGetHours]();if(D.hcTimezoneOffset||D.hcGetTimezoneOffset)x=(!f||!!D.hcGetTimezoneOffset)&&(c-b>4*l.month||u(b)!==u(c)),B=B.getTime(),J=u(B),B=new D(B+J);f=B.getTime();for(b=1;f<c;)q.push(f),f=k===l.year?n(H+b*A,0):k===l.month?n(H,w+b*A):!x||k!==l.day&&k!==l.week?x&&k===l.hour?n(H,w,d,t+b*A,0,0,J)-J:f+k*A:n(H,w,d+b*A*(k===l.day?1:7)),b++;q.push(f);k<=l.hour&&1E4>q.length&&h(q,function(a){0===a%18E5&&"000000000"===F("%H%M%S%L",a)&&(m[a]="day")})}q.info=p(a,{higherRanks:m,
totalRange:k*A});return q};E.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];b=c[c.length-1];var f=l[b[0]],q=b[1],m;for(m=0;m<c.length&&!(b=c[m],f=l[b[0]],q=b[1],c[m+1]&&a<=(f*q[q.length-1]+l[c[m+1][0]])/2);m++);f===l.year&&a<5*f&&(q=[1,2,5]);a=z(a/f,q,"year"===b[0]?Math.max(n(a/f),1):1);return{unitRange:f,
count:a,unitName:b[0]}}})(L);(function(a){var E=a.Axis,D=a.getMagnitude,F=a.map,C=a.normalizeTickInterval,r=a.pick;E.prototype.getLogTickPositions=function(a,p,n,u){var h=this.options,e=this.len,l=this.lin2log,f=this.log2lin,b=[];u||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),b=this.getLinearTickPositions(a,p,n);else if(.08<=a)for(var e=Math.floor(p),c,w,q,m,v,h=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];e<n+1&&!v;e++)for(w=h.length,c=0;c<w&&!v;c++)q=f(l(e)*h[c]),q>p&&(!u||m<=
n)&&void 0!==m&&b.push(m),m>n&&(v=!0),m=q;else p=l(p),n=l(n),a=u?this.getMinorTickInterval():h.tickInterval,a=r("auto"===a?null:a,this._minorAutoInterval,h.tickPixelInterval/(u?5:1)*(n-p)/((u?e/this.tickPositions.length:e)||1)),a=C(a,null,D(a)),b=F(this.getLinearTickPositions(a,p,n),f),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return b};E.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};E.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a,E){var D=a.arrayMax,
F=a.arrayMin,C=a.defined,r=a.destroyObjectProperties,h=a.each,p=a.erase,n=a.merge,u=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=e,this.id=e.id)};a.PlotLineOrBand.prototype={render:function(){var h=this,e=h.axis,l=e.horiz,f=h.options,b=f.label,c=h.label,w=f.to,q=f.from,m=f.value,v=C(q)&&C(w),H=C(m),B=h.svgElem,p=!B,k=[],A=f.color,J=u(f.zIndex,0),x=f.events,k={"class":"highcharts-plot-"+(v?"band ":"line ")+(f.className||"")},d={},t=e.chart.renderer,G=v?"bands":"lines",g=e.log2lin;
e.isLog&&(q=g(q),w=g(w),m=g(m));H?(k={stroke:A,"stroke-width":f.width},f.dashStyle&&(k.dashstyle=f.dashStyle)):v&&(A&&(k.fill=A),f.borderWidth&&(k.stroke=f.borderColor,k["stroke-width"]=f.borderWidth));d.zIndex=J;G+="-"+J;(A=e.plotLinesAndBandsGroups[G])||(e.plotLinesAndBandsGroups[G]=A=t.g("plot-"+G).attr(d).add());p&&(h.svgElem=B=t.path().attr(k).add(A));if(H)k=e.getPlotLinePath(m,B.strokeWidth());else if(v)k=e.getPlotBandPath(q,w,f);else return;p&&k&&k.length?(B.attr({d:k}),x&&a.objectEach(x,function(a,
d){B.on(d,function(a){x[d].apply(h,[a])})})):B&&(k?(B.show(),B.animate({d:k})):(B.hide(),c&&(h.label=c=c.destroy())));b&&C(b.text)&&k&&k.length&&0<e.width&&0<e.height&&!k.flat?(b=n({align:l&&v&&"center",x:l?!v&&4:10,verticalAlign:!l&&v&&"middle",y:l?v?16:10:v?6:-4,rotation:l&&!v&&90},b),this.renderLabel(b,k,v,J)):c&&c.hide();return h},renderLabel:function(a,e,l,f){var b=this.label,c=this.axis.chart.renderer;b||(b={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(l?"band":
"line")+"-label "+(a.className||"")},b.zIndex=f,this.label=b=c.text(a.text,0,0,a.useHTML).attr(b).add(),b.css(a.style));f=e.xBounds||[e[1],e[4],l?e[6]:e[1]];e=e.yBounds||[e[2],e[5],l?e[7]:e[2]];l=F(f);c=F(e);b.align(a,!1,{x:l,y:c,width:D(f)-l,height:D(e)-c});b.show()},destroy:function(){p(this.axis.plotLinesAndBands,this);delete this.axis;r(this)}};a.extend(E.prototype,{getPlotBandPath:function(a,e){var l=this.getPlotLinePath(e,null,null,!0),f=this.getPlotLinePath(a,null,null,!0),b=this.horiz,c=1;
a=a<this.min&&e<this.min||a>this.max&&e>this.max;f&&l?(a&&(f.flat=f.toString()===l.toString(),c=0),f.push(b&&l[4]===f[4]?l[4]+c:l[4],b||l[5]!==f[5]?l[5]:l[5]+c,b&&l[1]===f[1]?l[1]+c:l[1],b||l[2]!==f[2]?l[2]:l[2]+c,"z")):f=null;return f},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(h,e){var l=(new a.PlotLineOrBand(this,h)).render(),f=this.userOptions;l&&(e&&(f[e]=f[e]||[],f[e].push(h)),
this.plotLinesAndBands.push(l));return l},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,l=this.options,f=this.userOptions,b=e.length;b--;)e[b].id===a&&e[b].destroy();h([l.plotLines||[],f.plotLines||[],l.plotBands||[],f.plotBands||[]],function(c){for(b=c.length;b--;)c[b].id===a&&p(c,c[b])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(L,aa);(function(a){var E=a.dateFormat,D=a.each,F=a.extend,C=a.format,r=
a.isNumber,h=a.map,p=a.merge,n=a.pick,u=a.splat,z=a.syncTimeout,e=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,f){this.chart=a;this.options=f;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=f.split&&!a.inverted;this.shared=f.shared||this.split},cleanSplit:function(a){D(this.chart.series,function(f){var b=f&&f.tt;b&&(!b.isActive||a?f.tt=b.destroy():b.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,f=this.options;
this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,f.shape||"callout",null,null,f.useHTML,null,"tooltip").attr({padding:f.padding,r:f.borderRadius}),this.label.attr({fill:f.backgroundColor,"stroke-width":f.borderWidth}).css(f.style).shadow(f.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();p(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,p(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());
this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,f,b,c){var e=this,q=e.now,m=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(a-q.x)||1<Math.abs(f-q.y)),v=e.followPointer||1<e.len;F(q,{x:m?(2*q.x+a)/3:a,y:m?(q.y+f)/2:f,anchorX:v?void 0:m?(2*q.anchorX+b)/3:b,anchorY:v?void 0:m?(q.anchorY+c)/2:c});e.getLabel().attr(q);m&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&
e.move(a,f,b,c)},32))},hide:function(a){var f=this;clearTimeout(this.hideTimer);a=n(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=z(function(){f.getLabel()[a?"fadeOut":"hide"]();f.isHidden=!0},a))},getAnchor:function(a,f){var b,c=this.chart,e=c.inverted,q=c.plotTop,m=c.plotLeft,v=0,l=0,B,n;a=u(a);b=a[0].tooltipPos;this.followPointer&&f&&(void 0===f.chartX&&(f=c.pointer.normalize(f)),b=[f.chartX-c.plotLeft,f.chartY-q]);b||(D(a,function(a){B=a.series.yAxis;n=a.series.xAxis;v+=a.plotX+
(!e&&n?n.left-m:0);l+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&B?B.top-q:0)}),v/=a.length,l/=a.length,b=[e?c.plotWidth-l:v,this.shared&&!e&&1<a.length&&f?f.chartY-q:e?c.plotHeight-v:l]);return h(b,Math.round)},getPosition:function(a,f,b){var c=this.chart,e=this.distance,q={},m=b.h||0,v,l=["y",c.chartHeight,f,b.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],B=["x",c.chartWidth,a,b.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],h=!this.followPointer&&n(b.ttBelow,!c.inverted===!!b.negative),
k=function(a,b,c,g,k,x){var d=c<g-e,t=g+e+c<b,f=g-e-c;g+=e;if(h&&t)q[a]=g;else if(!h&&d)q[a]=f;else if(d)q[a]=Math.min(x-c,0>f-m?f:f-m);else if(t)q[a]=Math.max(k,g+m+c>b?g:g+m);else return!1},A=function(a,b,c,g){var d;g<e||g>b-e?d=!1:q[a]=g<c/2?1:g>b-c/2?b-c-2:g-c/2;return d},J=function(a){var d=l;l=B;B=d;v=a},x=function(){!1!==k.apply(0,l)?!1!==A.apply(0,B)||v||(J(!0),x()):v?q.x=q.y=0:(J(!0),x())};(c.inverted||1<this.len)&&J();x();return q},defaultFormatter:function(a){var f=this.points||u(this),
b;b=[a.tooltipFooterHeaderFormatter(f[0])];b=b.concat(a.bodyFormatter(f));b.push(a.tooltipFooterHeaderFormatter(f[0],!0));return b},refresh:function(a,f){var b,c=this.options,e,q=a,m,v={},l=[];b=c.formatter||this.defaultFormatter;var v=this.shared,B;c.enabled&&(clearTimeout(this.hideTimer),this.followPointer=u(q)[0].series.tooltipOptions.followPointer,m=this.getAnchor(q,f),f=m[0],e=m[1],!v||q.series&&q.series.noSharedTooltip?v=q.getLabelConfig():(D(q,function(a){a.setState("hover");l.push(a.getLabelConfig())}),
v={x:q[0].category,y:q[0].y},v.points=l,q=q[0]),this.len=l.length,v=b.call(v,this),B=q.series,this.distance=n(B.tooltipOptions.distance,16),!1===v?this.hide():(b=this.getLabel(),this.isHidden&&b.attr({opacity:1}).show(),this.split?this.renderSplit(v,a):(c.style.width||b.css({width:this.chart.spacingBox.width}),b.attr({text:v&&v.join?v.join(""):v}),b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+n(q.colorIndex,B.colorIndex)),b.attr({stroke:c.borderColor||q.color||B.color||"#666666"}),
this.updatePosition({plotX:f,plotY:e,negative:q.negative,ttBelow:q.ttBelow,h:m[2]||0})),this.isHidden=!1))},renderSplit:function(e,f){var b=this,c=[],w=this.chart,q=w.renderer,m=!0,v=this.options,l=0,B=this.getLabel();a.isString(e)&&(e=[!1,e]);D(e.slice(0,f.length+1),function(a,k){if(!1!==a){k=f[k-1]||{isHeader:!0,plotX:f[0].plotX};var e=k.series||b,h=e.tt,x=k.series||{},d="highcharts-color-"+n(k.colorIndex,x.colorIndex,"none");h||(e.tt=h=q.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+
d).attr({padding:v.padding,r:v.borderRadius,fill:v.backgroundColor,stroke:v.borderColor||k.color||x.color||"#333333","stroke-width":v.borderWidth}).add(B));h.isActive=!0;h.attr({text:a});h.css(v.style).shadow(v.shadow);a=h.getBBox();x=a.width+h.strokeWidth();k.isHeader?(l=a.height,x=Math.max(0,Math.min(k.plotX+w.plotLeft-x/2,w.chartWidth-x))):x=k.plotX+w.plotLeft-n(v.distance,16)-x;0>x&&(m=!1);a=(k.series&&k.series.yAxis&&k.series.yAxis.pos)+(k.plotY||0);a-=w.plotTop;c.push({target:k.isHeader?w.plotHeight+
l:a,rank:k.isHeader?1:0,size:e.tt.getBBox().height+1,point:k,x:x,tt:h})}});this.cleanSplit();a.distribute(c,w.plotHeight+l);D(c,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:m||b.isHeader?a.x:b.plotX+w.plotLeft+n(v.distance,16),y:a.pos+w.plotTop,anchorX:b.isHeader?b.plotX+w.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+w.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var e=this.chart,b=this.getLabel(),b=(this.options.positioner||
this.getPosition).call(this,b.width,b.height,a);this.move(Math.round(b.x),Math.round(b.y||0),a.plotX+e.plotLeft,a.plotY+e.plotTop)},getDateFormat:function(a,f,b,c){var w=E("%m-%d %H:%M:%S.%L",f),q,m,v={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(m in e){if(a===e.week&&+E("%w",f)===b&&"00:00:00.000"===w.substr(6)){m="week";break}if(e[m]>a){m=l;break}if(v[m]&&w.substr(v[m])!=="01-01 00:00:00.000".substr(v[m]))break;"week"!==m&&(l=m)}m&&(q=c[m]);return q},getXDateFormat:function(a,
e,b){e=e.dateTimeLabelFormats;var c=b&&b.closestPointRange;return(c?this.getDateFormat(c,a.x,b.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(a,e){e=e?"footer":"header";var b=a.series,c=b.tooltipOptions,f=c.xDateFormat,q=b.xAxis,m=q&&"datetime"===q.options.type&&r(a.key),v=c[e+"Format"];m&&!f&&(f=this.getXDateFormat(a,c,q));m&&f&&D(a.point&&a.point.tooltipDateKeys||["key"],function(a){v=v.replace("{point."+a+"}","{point."+a+":"+f+"}")});return C(v,{point:a,series:b})},
bodyFormatter:function(a){return h(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b[(a.point.formatPrefix||"point")+"Format"])})}}})(L);(function(a){var E=a.addEvent,D=a.attr,F=a.charts,C=a.color,r=a.css,h=a.defined,p=a.each,n=a.extend,u=a.find,z=a.fireEvent,e=a.isObject,l=a.offset,f=a.pick,b=a.removeEvent,c=a.splat,w=a.Tooltip;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=
b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};w&&(a.tooltip=new w(a,b.tooltip),this.followTouchMove=f(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,q=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(q=f(c.pinchType,q));this.zoomX=a=/x/.test(q);this.zoomY=q=/y/.test(q);this.zoomHor=a&&!b||q&&b;this.zoomVert=q&&!b||a&&b;this.hasZoom=a||q},normalize:function(a,b){var c;c=a.touches?a.touches.length?a.touches.item(0):
a.changedTouches[0]:a;b||(this.chartPosition=b=l(this.chart.container));return n(a,{chartX:Math.round(c.pageX-b.left),chartY:Math.round(c.pageY-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};p(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,c){var m;p(a,function(a){var q=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(c,q);if((q=e(a,
!0))&&!(q=!e(m,!0)))var q=m.distX-a.distX,k=m.dist-a.dist,f=(a.series.group&&a.series.group.zIndex)-(m.series.group&&m.series.group.zIndex),q=0<(0!==q&&b?q:0!==k?k:0!==f?f:m.series.index>a.series.index?-1:1);q&&(m=a)});return m},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var c=a.series,m=c.xAxis,c=c.yAxis;if(m&&c)return b?{chartX:m.len+m.pos-a.clientX,chartY:c.len+c.pos-a.plotY}:{chartX:a.clientX+m.pos,chartY:a.plotY+
c.pos}},getHoverData:function(b,c,v,w,l,h,k){var m,q=[],x=k&&k.isBoosting;w=!(!w||!b);k=c&&!c.stickyTracking?[c]:a.grep(v,function(a){return a.visible&&!(!l&&a.directTouch)&&f(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(m=w?b:this.findNearestKDPoint(k,l,h))&&m.series;m&&(l&&!c.noSharedTooltip?(k=a.grep(v,function(a){return a.visible&&!(!l&&a.directTouch)&&f(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),p(k,function(a){var d=u(a.points,function(a){return a.x===m.x&&!a.isNull});
e(d)&&(x&&(d=a.getPoint(d)),q.push(d))})):q.push(m));return{hoverPoint:m,hoverSeries:c,hoverPoints:q}},runPointActions:function(b,c){var m=this.chart,e=m.tooltip&&m.tooltip.options.enabled?m.tooltip:void 0,q=e?e.shared:!1,w=c||m.hoverPoint,k=w&&w.series||m.hoverSeries,k=this.getHoverData(w,k,m.series,!!c||k&&k.directTouch&&this.isDirectTouch,q,b,{isBoosting:m.isBoosting}),l,w=k.hoverPoint;l=k.hoverPoints;c=(k=k.hoverSeries)&&k.tooltipOptions.followPointer;q=q&&k&&!k.noSharedTooltip;if(w&&(w!==m.hoverPoint||
e&&e.isHidden)){p(m.hoverPoints||[],function(b){-1===a.inArray(b,l)&&b.setState()});p(l||[],function(a){a.setState("hover")});if(m.hoverSeries!==k)k.onMouseOver();m.hoverPoint&&m.hoverPoint.firePointEvent("mouseOut");if(!w.series)return;w.firePointEvent("mouseOver");m.hoverPoints=l;m.hoverPoint=w;e&&e.refresh(q?l:w,b)}else c&&e&&!e.isHidden&&(w=e.getAnchor([{}],b),e.updatePosition({plotX:w[0],plotY:w[1]}));this.unDocMouseMove||(this.unDocMouseMove=E(m.container.ownerDocument,"mousemove",function(b){var c=
F[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));p(m.axes,function(c){var k=f(c.crosshair.snap,!0),d=k?a.find(l,function(a){return a.series[c.coll]===c}):void 0;d||!k?c.drawCrosshair(b,d):c.hideCrosshair()})},reset:function(a,b){var m=this.chart,e=m.hoverSeries,q=m.hoverPoint,f=m.hoverPoints,k=m.tooltip,w=k&&k.shared?f:q;a&&w&&p(c(w),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)k&&w&&(k.refresh(w),q&&(q.setState(q.state,!0),p(m.axes,function(a){a.crosshair&&a.drawCrosshair(null,
q)})));else{if(q)q.onMouseOut();f&&p(f,function(a){a.setState()});if(e)e.onMouseOut();k&&k.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());p(m.axes,function(a){a.hideCrosshair()});this.hoverX=m.hoverPoints=m.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,m;p(c.series,function(e){m=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&e.group&&(e.group.attr(m),e.markerGroup&&(e.markerGroup.attr(m),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(m))});
c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,e=a.chartX,q=a.chartY,f=this.zoomHor,k=this.zoomVert,w=b.plotLeft,l=b.plotTop,x=b.plotWidth,d=b.plotHeight,t,G=this.selectionMarker,g=this.mouseDownX,y=this.mouseDownY,h=c.panKey&&a[c.panKey+"Key"];G&&G.touch||(e<w?e=w:e>w+x&&(e=w+x),q<l?q=l:q>l+d&&(q=l+d),this.hasDragged=
Math.sqrt(Math.pow(g-e,2)+Math.pow(y-q,2)),10<this.hasDragged&&(t=b.isInsidePlot(g-w,y-l),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&t&&!h&&!G&&(this.selectionMarker=G=b.renderer.rect(w,l,f?1:x,k?1:d,0).attr({fill:c.selectionMarkerFill||C("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),G&&f&&(e-=g,G.attr({width:Math.abs(e),x:(0<e?0:e)+g})),G&&k&&(e=q-y,G.attr({height:Math.abs(e),y:(0<e?0:e)+y})),t&&!G&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=
this,c=this.chart,e=this.hasPinched;if(this.selectionMarker){var q={originalEvent:a,xAxis:[],yAxis:[]},f=this.selectionMarker,k=f.attr?f.attr("x"):f.x,w=f.attr?f.attr("y"):f.y,l=f.attr?f.attr("width"):f.width,x=f.attr?f.attr("height"):f.height,d;if(this.hasDragged||e)p(c.axes,function(c){if(c.zoomEnabled&&h(c.min)&&(e||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var t=c.horiz,g="touchend"===a.type?c.minPixelPadding:0,m=c.toValue((t?k:w)+g),t=c.toValue((t?k+l:w+x)-g);q[c.coll].push({axis:c,min:Math.min(m,
t),max:Math.max(m,t)});d=!0}}),d&&z(c,"selection",q,function(a){c.zoom(n(a,e?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();e&&this.scaleGroups()}c&&(r(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){F[a.hoverChartIndex]&&F[a.hoverChartIndex].pointer.drop(b)},
onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=F[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;h(a.hoverChartIndex)&&F[a.hoverChartIndex]&&F[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=
c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var c;a;){if(c=D(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||
!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,e=b.plotLeft,f=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(z(c.series,"click",n(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(n(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-e,a.chartY-f)&&z(b,"click",a)))},setDOMEvents:function(){var b=
this,c=b.chart.container,e=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};E(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&E(e,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&E(e,"touchend",b.onDocumentTouchEnd))},destroy:function(){var c=this,m=this.chart.container.ownerDocument;
c.unDocMouseMove&&c.unDocMouseMove();b(c.chart.container,"mouseleave",c.onContainerMouseLeave);a.chartCount||(b(m,"mouseup",c.onDocumentMouseUp),a.hasTouch&&b(m,"touchend",c.onDocumentTouchEnd));clearInterval(c.tooltipTimeout);a.objectEach(c,function(a,b){c[b]=null})}}})(L);(function(a){var E=a.charts,D=a.each,F=a.extend,C=a.map,r=a.noop,h=a.pick;F(a.Pointer.prototype,{pinchTranslate:function(a,h,u,r,e,l){this.zoomHor&&this.pinchTranslateDirection(!0,a,h,u,r,e,l);this.zoomVert&&this.pinchTranslateDirection(!1,
a,h,u,r,e,l)},pinchTranslateDirection:function(a,h,u,r,e,l,f,b){var c=this.chart,w=a?"x":"y",q=a?"X":"Y",m="chart"+q,v=a?"width":"height",n=c["plot"+(a?"Left":"Top")],B,p,k=b||1,A=c.inverted,J=c.bounds[a?"h":"v"],x=1===h.length,d=h[0][m],t=u[0][m],G=!x&&h[1][m],g=!x&&u[1][m],y;u=function(){!x&&20<Math.abs(d-G)&&(k=b||Math.abs(t-g)/Math.abs(d-G));p=(n-t)/k+d;B=c["plot"+(a?"Width":"Height")]/k};u();h=p;h<J.min?(h=J.min,y=!0):h+B>J.max&&(h=J.max-B,y=!0);y?(t-=.8*(t-f[w][0]),x||(g-=.8*(g-f[w][1])),u()):
f[w]=[t,g];A||(l[w]=p-n,l[v]=B);l=A?1/k:k;e[v]=B;e[w]=h;r[A?a?"scaleY":"scaleX":"scale"+q]=k;r["translate"+q]=l*n+(t-l*d)},pinch:function(a){var n=this,p=n.chart,z=n.pinchDown,e=a.touches,l=e.length,f=n.lastValidTouch,b=n.hasZoom,c=n.selectionMarker,w={},q=1===l&&(n.inClass(a.target,"highcharts-tracker")&&p.runTrackerClick||n.runChartClick),m={};1<l&&(n.initiated=!0);b&&n.initiated&&!q&&a.preventDefault();C(e,function(a){return n.normalize(a)});"touchstart"===a.type?(D(e,function(a,b){z[b]={chartX:a.chartX,
chartY:a.chartY}}),f.x=[z[0].chartX,z[1]&&z[1].chartX],f.y=[z[0].chartY,z[1]&&z[1].chartY],D(p.axes,function(a){if(a.zoomEnabled){var b=p.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,m=a.toPixels(h(a.options.min,a.dataMin)),k=a.toPixels(h(a.options.max,a.dataMax)),e=Math.max(m,k);b.min=Math.min(a.pos,Math.min(m,k)-c);b.max=Math.max(a.pos+a.len,e+c)}}),n.res=!0):n.followTouchMove&&1===l?this.runPointActions(n.normalize(a)):z.length&&(c||(n.selectionMarker=c=F({destroy:r,touch:!0},p.plotBox)),n.pinchTranslate(z,
e,w,c,m,f),n.hasPinched=b,n.scaleGroups(w,m),n.res&&(n.res=!1,this.reset(!1,0)))},touch:function(p,n){var u=this.chart,r,e;if(u.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=u.index;1===p.touches.length?(p=this.normalize(p),(e=u.isInsidePlot(p.chartX-u.plotLeft,p.chartY-u.plotTop))&&!u.openMenu?(n&&this.runPointActions(p),"touchmove"===p.type&&(n=this.pinchDown,r=n[0]?4<=Math.sqrt(Math.pow(n[0].chartX-p.chartX,2)+Math.pow(n[0].chartY-p.chartY,2)):!1),h(r,
!0)&&this.pinch(p)):n&&this.reset()):2===p.touches.length&&this.pinch(p)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(h){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(h)}})})(L);(function(a){var E=a.addEvent,D=a.charts,F=a.css,C=a.doc,r=a.extend,h=a.noop,p=a.Pointer,n=a.removeEvent,u=a.win,z=a.wrap;if(!a.hasTouch&&(u.PointerEvent||u.MSPointerEvent)){var e={},l=!!u.PointerEvent,f=function(){var b=
[];b.item=function(a){return this[a]};a.objectEach(e,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},b=function(b,e,q,m){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!D[a.hoverChartIndex]||(m(b),m=D[a.hoverChartIndex].pointer,m[e]({type:q,target:b.currentTarget,preventDefault:h,touches:f()}))};r(p.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},
onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY};e[a.pointerId].target||(e[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,"onDocumentTouchEnd","touchend",function(a){delete e[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,l?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,l?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(C,l?
"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});z(p.prototype,"init",function(a,b,e){a.call(this,b,e);this.hasZoom&&F(b.container,{"-ms-touch-action":"none","touch-action":"none"})});z(p.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(E)});z(p.prototype,"destroy",function(a){this.batchMSEvents(n);a.call(this)})}})(L);(function(a){var E=a.addEvent,D=a.css,F=a.discardElement,C=a.defined,r=a.each,h=a.isFirefox,p=a.marginNames,n=a.merge,
u=a.pick,z=a.setAnimation,e=a.stableSort,l=a.win,f=a.wrap;a.Legend=function(a,c){this.init(a,c)};a.Legend.prototype={init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),E(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=u(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=n(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=
this.maxItemWidth=0;this.symbolWidth=u(a.symbolWidth,16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(n(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;u(c,!0)&&b.redraw()},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var b=this.options,e=a.legendItem,m=a.legendLine,f=a.legendSymbol,l=this.itemHiddenStyle.color,b=c?b.itemStyle.color:l,h=c?a.color||l:l,n=a.options&&a.options.marker,k={fill:h};e&&e.css({fill:b,
color:b});m&&m.attr({stroke:h});f&&(n&&f.isMarker&&(k=a.pointAttribs(),c||(k.stroke=k.fill=l)),f.attr(k))},positionItem:function(a){var b=this.options,e=b.symbolPadding,b=!b.rtl,f=a._legendItemPos,m=f[0],f=f[1],l=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?m:this.legendWidth-m-2*e-4,f);l&&(l.x=m,l.y=f)},destroyItem:function(a){var b=a.checkbox;r(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&
(this[a]=this[a].destroy())}r(this.getAllItems(),function(b){r(["legendItem","legendGroup"],a,b)});r("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,e,f=this.clipHeight||this.legendHeight,m=this.titleHeight;b&&(e=b.translateY,r(this.allItems,function(c){var q=c.checkbox,l;q&&(l=e+m+q.y+(a||0)+3,D(q,{left:b.translateX+c.checkboxOffset+q.x-20+"px",top:l+"px",display:l>e-6&&l<e+f-6?"":"none"}))}))},
renderTitle:function(){var a=this.options,c=this.padding,e=a.title,f=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(e.style).add(this.group)),a=this.title.getBBox(),f=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:f}));this.titleHeight=f},setText:function(b){var c=this.options;b.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,b):c.labelFormatter.call(b)})},renderItem:function(a){var b=
this.chart,e=b.renderer,f=this.options,m="horizontal"===f.layout,l=this.symbolWidth,h=f.symbolPadding,B=this.itemStyle,p=this.itemHiddenStyle,k=this.padding,A=m?u(f.itemDistance,20):0,J=!f.rtl,x=f.width,d=f.itemMarginBottom||0,t=this.itemMarginTop,G=a.legendItem,g=!a.series,y=!g&&a.series.drawLegendSymbol?a.series:a,r=y.options,M=this.createCheckboxForItem&&r&&r.showCheckbox,r=l+h+A+(M?20:0),z=f.useHTML,N=a.options.className;G||(a.legendGroup=e.g("legend-item").addClass("highcharts-"+y.type+"-series highcharts-color-"+
a.colorIndex+(N?" "+N:"")+(g?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=G=e.text("",J?l+h:-h,this.baseline||0,z).css(n(a.visible?B:p)).attr({align:J?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(l=B.fontSize,this.fontMetrics=e.fontMetrics(l,G),this.baseline=this.fontMetrics.f+3+t,G.attr("y",this.baseline)),this.symbolHeight=f.symbolHeight||this.fontMetrics.f,y.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,G,z),M&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);B.width||G.css({width:(f.itemWidth||f.width||b.spacingBox.width)-r});this.setText(a);e=G.getBBox();B=a.checkboxOffset=f.itemWidth||a.legendItemWidth||e.width+r;this.itemHeight=e=Math.round(a.legendItemHeight||e.height||this.symbolHeight);m&&this.itemX-k+B>(x||b.spacingBox.width-2*k-f.x)&&(this.itemX=k,this.itemY+=t+this.lastLineHeight+d,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,B);this.lastItemY=t+this.itemY+d;this.lastLineHeight=Math.max(e,
this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];m?this.itemX+=B:(this.itemY+=t+e+d,this.lastLineHeight=e);this.offsetWidth=x||Math.max((m?this.itemX-k-(a.checkbox?0:A):B)+k,this.offsetWidth)},getAllItems:function(){var a=[];r(this.chart.series,function(b){var c=b&&b.options;b&&u(c.showInLegend,C(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});return a},adjustMargins:function(a,c){var b=this.chart,e=this.options,m=e.align.charAt(0)+e.verticalAlign.charAt(0)+
e.layout.charAt(0);e.floating||r([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,l){f.test(m)&&!C(a[l])&&(b[p[l]]=Math.max(b[p[l]],b.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*e[l%2?"x":"y"]+u(e.margin,12)+c[l]))})},render:function(){var a=this,c=a.chart,f=c.renderer,l=a.group,m,h,p,B,u=a.box,k=a.options,A=a.padding;a.itemX=A;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;l||(a.group=l=f.g("legend").attr({zIndex:7}).add(),a.contentGroup=f.g().attr({zIndex:1}).add(l),
a.scrollGroup=f.g().add(a.contentGroup));a.renderTitle();m=a.getAllItems();e(m,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});k.reversed&&m.reverse();a.allItems=m;a.display=h=!!m.length;a.lastLineHeight=0;r(m,function(b){a.renderItem(b)});p=(k.width||a.offsetWidth)+A;B=a.lastItemY+a.lastLineHeight+a.titleHeight;B=a.handleOverflow(B);B+=A;u||(a.box=u=f.rect().addClass("highcharts-legend-box").attr({r:k.borderRadius}).add(l),u.isNew=!0);u.attr({stroke:k.borderColor,
"stroke-width":k.borderWidth||0,fill:k.backgroundColor||"none"}).shadow(k.shadow);0<p&&0<B&&(u[u.isNew?"attr":"animate"](u.crisp({x:0,y:0,width:p,height:B},u.strokeWidth())),u.isNew=!1);u[h?"show":"hide"]();a.legendWidth=p;a.legendHeight=B;r(m,function(b){a.positionItem(b)});h&&l.align(n(k,{width:p,height:B}),!0,"spacingBox");c.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,e=this.chart,f=e.renderer,m=this.options,l=m.y,h=this.padding,e=e.spacingBox.height+("top"===m.verticalAlign?
-l:l)-h,l=m.maxHeight,B,n=this.clipRect,k=m.navigation,A=u(k.animation,!0),p=k.arrowSize||12,x=this.nav,d=this.pages,t,G=this.allItems,g=function(a){"number"===typeof a?n.attr({height:a}):n&&(b.clipRect=n.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+h+"px,9999px,"+(h+a)+"px,0)":"auto")};"horizontal"!==m.layout||"middle"===m.verticalAlign||m.floating||(e/=2);l&&(e=Math.min(e,l));d.length=0;a>e&&!1!==k.enabled?(this.clipHeight=B=Math.max(e-20-this.titleHeight-
h,0),this.currentPage=u(this.currentPage,1),this.fullHeight=a,r(G,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var g=d.length;if(!g||c-d[g-1]>B&&(t||c)!==d[g-1])d.push(t||c),g++;b===G.length-1&&c+a-d[g-1]>B&&d.push(c);c!==t&&(t=c)}),n||(n=b.clipRect=f.clipRect(0,h,9999,0),b.contentGroup.clip(n)),g(B),x||(this.nav=x=f.g().attr({zIndex:1}).add(this.group),this.up=f.symbol("triangle",0,0,p,p).on("click",function(){b.scroll(-1,A)}).add(x),this.pager=f.text("",15,
10).addClass("highcharts-legend-navigation").css(k.style).add(x),this.down=f.symbol("triangle-down",0,0,p,p).on("click",function(){b.scroll(1,A)}).add(x)),b.scroll(0),a=e):x&&(g(),this.nav=x.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var b=this.pages,e=b.length;a=this.currentPage+a;var m=this.clipHeight,f=this.options.navigation,l=this.pager,h=this.padding;a>e&&(a=e);0<a&&(void 0!==c&&z(c,this.chart),this.nav.attr({translateX:h,translateY:m+this.padding+
7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),l.attr({text:a+"/"+e}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?f.inactiveColor:f.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===e?f.inactiveColor:f.activeColor}).css({cursor:a===e?"default":"pointer"}),c=-b[a-1]+this.initialItemY,
this.scrollGroup.animate({translateY:c}),this.currentPage=a,this.positionCheckboxes(c))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,e=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(e?(a.symbolWidth-b)/2:0,a.baseline-b+1,e?b:a.symbolWidth,b,u(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var b=this.options,e=b.marker,f=a.symbolWidth,m=a.symbolHeight,l=m/2,h=this.chart.renderer,B=
this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var p;p={"stroke-width":b.lineWidth||0};b.dashStyle&&(p.dashstyle=b.dashStyle);this.legendLine=h.path(["M",0,a,"L",f,a]).addClass("highcharts-graph").attr(p).add(B);e&&!1!==e.enabled&&(b=Math.min(u(e.radius,l),l),0===this.symbol.indexOf("url")&&(e=n(e,{width:m,height:m}),b=0),this.legendSymbol=e=h.symbol(this.symbol,f/2-b,a-b,2*b,2*b,e).addClass("highcharts-point").add(B),e.isMarker=!0)}};(/Trident\/7\.0/.test(l.navigator.userAgent)||h)&&
f(a.Legend.prototype,"positionItem",function(a,c){var b=this,e=function(){c._legendItemPos&&a.call(b,c)};e();setTimeout(e)})})(L);(function(a){var E=a.addEvent,D=a.animate,F=a.animObject,C=a.attr,r=a.doc,h=a.Axis,p=a.createElement,n=a.defaultOptions,u=a.discardElement,z=a.charts,e=a.css,l=a.defined,f=a.each,b=a.extend,c=a.find,w=a.fireEvent,q=a.grep,m=a.isNumber,v=a.isObject,H=a.isString,B=a.Legend,K=a.marginNames,k=a.merge,A=a.objectEach,J=a.Pointer,x=a.pick,d=a.pInt,t=a.removeEvent,G=a.seriesTypes,
g=a.splat,y=a.svg,P=a.syncTimeout,M=a.win,O=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,d,b){return new O(a,d,b)};b(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(H(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(d,b){var c,g,t=d.series,e=d.plotOptions||{};d.series=null;c=k(n,d);for(g in c.plotOptions)c.plotOptions[g].tooltip=e[g]&&k(e[g].tooltip)||void 0;c.tooltip.userOptions=d.chart&&d.chart.forExport&&
d.tooltip.userOptions||d.tooltip;c.series=d.series=t;this.userOptions=d;d=c.chart;g=d.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var x=this;x.index=z.length;z.push(x);a.chartCount++;g&&A(g,function(a,d){E(x,d,a)});x.xAxis=[];x.yAxis=[];x.pointCount=x.colorCounter=x.symbolCounter=0;x.firstRender()},initSeries:function(d){var b=this.options.chart;
(b=G[d.type||b.type||b.defaultSeriesType])||a.error(17,!0);b=new b;b.init(this,d);return b},orderSeries:function(a){var d=this.series;for(a=a||0;a<d.length;a++)d[a]&&(d[a].index=a,d[a].name=d[a].name||"Series "+(d[a].index+1))},isInsidePlot:function(a,d,b){var c=b?d:a;a=b?a:d;return 0<=c&&c<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(d){var c=this.axes,g=this.series,t=this.pointer,k=this.legend,e=this.isDirtyLegend,x,m,l=this.hasCartesianSeries,y=this.isDirtyBox,G,q=this.renderer,h=
q.isHidden(),A=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(d,this);h&&this.temporaryDisplay();this.layOutTitles();for(d=g.length;d--;)if(G=g[d],G.options.stacking&&(x=!0,G.isDirty)){m=!0;break}if(m)for(d=g.length;d--;)G=g[d],G.options.stacking&&(G.isDirty=!0);f(g,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),e=!0);a.isDirtyData&&w(a,"updatedData")});e&&k.options.enabled&&(k.render(),this.isDirtyLegend=!1);x&&this.getStacks();l&&f(c,function(a){a.updateNames();
a.setScale()});this.getMargins();l&&(f(c,function(a){a.isDirty&&(y=!0)}),f(c,function(a){var d=a.min+","+a.max;a.extKey!==d&&(a.extKey=d,A.push(function(){w(a,"afterSetExtremes",b(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(y||x)&&a.redraw()}));y&&this.drawChartBox();w(this,"predraw");f(g,function(a){(y||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});t&&t.reset(!0);q.draw();w(this,"redraw");w(this,"render");h&&this.temporaryDisplay(!0);f(A,function(a){a.call()})},get:function(a){function d(d){return d.id===
a||d.options&&d.options.id===a}var b,g=this.series,t;b=c(this.axes,d)||c(this.series,d);for(t=0;!b&&t<g.length;t++)b=c(g[t].points||[],d);return b},getAxes:function(){var a=this,d=this.options,b=d.xAxis=g(d.xAxis||{}),d=d.yAxis=g(d.yAxis||{});f(b,function(a,d){a.index=d;a.isX=!0});f(d,function(a,d){a.index=d});b=b.concat(d);f(b,function(d){new h(a,d)})},getSelectedPoints:function(){var a=[];f(this.series,function(d){a=a.concat(q(d.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return q(this.series,
function(a){return a.selected})},setTitle:function(a,d,b){var c=this,g=c.options,t;t=g.title=k({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=k({style:{color:"#666666"}},g.subtitle,d);f([["title",a,t],["subtitle",d,g]],function(a,d){var b=a[0],g=c[b],t=a[1];a=a[2];g&&t&&(c[b]=g=g.destroy());a&&a.text&&!g&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).add(),c[b].update=function(a){c.setTitle(!d&&a,d&&
a)},c[b].css(a.style))});c.layOutTitles(b)},layOutTitles:function(a){var d=0,c,g=this.renderer,t=this.spacingBox;f(["title","subtitle"],function(a){var c=this[a],k=this.options[a];a="title"===a?-3:k.verticalAlign?0:d+2;var e;c&&(e=k.style.fontSize,e=g.fontMetrics(e,c).b,c.css({width:(k.width||t.width+k.widthAdjust)+"px"}).align(b({y:a+e},k),!1,"spacingBox"),k.floating||k.verticalAlign||(d=Math.ceil(d+c.getBBox(k.useHTML).height)))},this);c=this.titleOffset!==d;this.titleOffset=d;!this.isDirtyBox&&
c&&(this.isDirtyBox=c,this.hasRendered&&x(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var d=this.options.chart,b=d.width,d=d.height,c=this.renderTo;l(b)||(this.containerWidth=a.getStyle(c,"width"));l(d)||(this.containerHeight=a.getStyle(c,"height"));this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(d,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(d){var b=this.renderTo;if(d)for(;b&&
b.style;)b.hcOrigStyle&&(a.css(b,b.hcOrigStyle),delete b.hcOrigStyle),b.hcOrigDetached&&(r.body.removeChild(b),b.hcOrigDetached=!1),b=b.parentNode;else for(;b&&b.style;){r.body.contains(b)||b.parentNode||(b.hcOrigDetached=!0,r.body.appendChild(b));if("none"===a.getStyle(b,"display",!1)||b.hcOricDetached)b.hcOrigStyle={display:b.style.display,height:b.style.height,overflow:b.style.overflow},d={display:"block",overflow:"hidden"},b!==this.renderTo&&(d.height=0),a.css(b,d),b.offsetWidth||b.style.setProperty("display",
"block","important");b=b.parentNode;if(b===r.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var c,g=this.options,t=g.chart,k,e;c=this.renderTo;var x=a.uniqueKey(),f;c||(this.renderTo=c=t.renderTo);H(c)&&(this.renderTo=c=r.getElementById(c));c||a.error(13,!0);k=d(C(c,"data-highcharts-chart"));m(k)&&z[k]&&z[k].hasRendered&&z[k].destroy();C(c,"data-highcharts-chart",this.index);c.innerHTML="";t.skipClone||c.offsetWidth||this.temporaryDisplay();
this.getChartSize();k=this.chartWidth;e=this.chartHeight;f=b({position:"relative",overflow:"hidden",width:k+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},t.style);this.container=c=p("div",{id:x},f,c);this._cursor=c.style.cursor;this.renderer=new (a[t.renderer]||a.Renderer)(c,k,e,null,t.forExport,g.exporting&&g.exporting.allowHTML);this.setClassName(t.className);this.renderer.setStyle(t.style);this.renderer.chartIndex=this.index},getMargins:function(a){var d=
this.spacing,b=this.margin,c=this.titleOffset;this.resetMargins();c&&!l(b[0])&&(this.plotTop=Math.max(this.plotTop,c+this.options.title.margin+d[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(b,d);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,d=a.axisOffset=[0,0,0,0],b=a.margin;a.hasCartesianSeries&&f(a.axes,function(a){a.visible&&
a.getOffset()});f(K,function(c,g){l(b[g])||(a[c]+=d[g])});a.setChartSize()},reflow:function(d){var b=this,c=b.options.chart,g=b.renderTo,t=l(c.width)&&l(c.height),k=c.width||a.getStyle(g,"width"),c=c.height||a.getStyle(g,"height"),g=d?d.target:M;if(!t&&!b.isPrinting&&k&&c&&(g===M||g===r)){if(k!==b.containerWidth||c!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=P(function(){b.container&&b.setSize(void 0,void 0,!1)},d?100:0);b.containerWidth=k;b.containerHeight=c}},initReflow:function(){var a=
this,d;d=E(M,"resize",function(d){a.reflow(d)});E(a,"destroy",d)},setSize:function(d,b,c){var g=this,t=g.renderer;g.isResizing+=1;a.setAnimation(c,g);g.oldChartHeight=g.chartHeight;g.oldChartWidth=g.chartWidth;void 0!==d&&(g.options.chart.width=d);void 0!==b&&(g.options.chart.height=b);g.getChartSize();d=t.globalAnimation;(d?D:e)(g.container,{width:g.chartWidth+"px",height:g.chartHeight+"px"},d);g.setChartSize(!0);t.setSize(g.chartWidth,g.chartHeight,c);f(g.axes,function(a){a.isDirty=!0;a.setScale()});
g.isDirtyLegend=!0;g.isDirtyBox=!0;g.layOutTitles();g.getMargins();g.redraw(c);g.oldChartHeight=null;w(g,"resize");P(function(){g&&w(g,"endResize",null,function(){--g.isResizing})},F(d).duration)},setChartSize:function(a){var d=this.inverted,b=this.renderer,c=this.chartWidth,g=this.chartHeight,t=this.options.chart,k=this.spacing,e=this.clipOffset,x,m,l,y;this.plotLeft=x=Math.round(this.plotLeft);this.plotTop=m=Math.round(this.plotTop);this.plotWidth=l=Math.max(0,Math.round(c-x-this.marginRight));
this.plotHeight=y=Math.max(0,Math.round(g-m-this.marginBottom));this.plotSizeX=d?y:l;this.plotSizeY=d?l:y;this.plotBorderWidth=t.plotBorderWidth||0;this.spacingBox=b.spacingBox={x:k[3],y:k[0],width:c-k[3]-k[1],height:g-k[0]-k[2]};this.plotBox=b.plotBox={x:x,y:m,width:l,height:y};c=2*Math.floor(this.plotBorderWidth/2);d=Math.ceil(Math.max(c,e[3])/2);b=Math.ceil(Math.max(c,e[0])/2);this.clipBox={x:d,y:b,width:Math.floor(this.plotSizeX-Math.max(c,e[1])/2-d),height:Math.max(0,Math.floor(this.plotSizeY-
Math.max(c,e[2])/2-b))};a||f(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,d=a.options.chart;f(["margin","spacing"],function(b){var c=d[b],g=v(c)?c:[c,c,c,c];f(["Top","Right","Bottom","Left"],function(c,t){a[b][t]=x(d[b+c],g[t])})});f(K,function(d,b){a[d]=x(a.margin[b],a.spacing[b])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,d=this.renderer,b=this.chartWidth,c=this.chartHeight,g=this.chartBackground,
t=this.plotBackground,k=this.plotBorder,e,x=this.plotBGImage,m=a.backgroundColor,f=a.plotBackgroundColor,l=a.plotBackgroundImage,y,G=this.plotLeft,q=this.plotTop,h=this.plotWidth,A=this.plotHeight,w=this.plotBox,v=this.clipRect,B=this.clipBox,n="animate";g||(this.chartBackground=g=d.rect().addClass("highcharts-background").add(),n="attr");e=a.borderWidth||0;y=e+(a.shadow?8:0);m={fill:m||"none"};if(e||g["stroke-width"])m.stroke=a.borderColor,m["stroke-width"]=e;g.attr(m).shadow(a.shadow);g[n]({x:y/
2,y:y/2,width:b-y-e%2,height:c-y-e%2,r:a.borderRadius});n="animate";t||(n="attr",this.plotBackground=t=d.rect().addClass("highcharts-plot-background").add());t[n](w);t.attr({fill:f||"none"}).shadow(a.plotShadow);l&&(x?x.animate(w):this.plotBGImage=d.image(l,G,q,h,A).add());v?v.animate({width:B.width,height:B.height}):this.clipRect=d.clipRect(B);n="animate";k||(n="attr",this.plotBorder=k=d.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());k.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||
0,fill:"none"});k[n](k.crisp({x:G,y:q,width:h,height:A},-k.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,d=a.options.chart,b,c=a.options.series,g,t;f(["inverted","angular","polar"],function(k){b=G[d.type||d.defaultSeriesType];t=d[k]||b&&b.prototype[k];for(g=c&&c.length;!t&&g--;)(b=G[c[g].type])&&b.prototype[k]&&(t=!0);a[k]=t})},linkSeries:function(){var a=this,d=a.series;f(d,function(a){a.linkedSeries.length=0});f(d,function(d){var b=d.options.linkedTo;H(b)&&(b=":previous"===
b?a.series[d.index-1]:a.get(b))&&b.linkedParent!==d&&(b.linkedSeries.push(d),d.linkedParent=b,d.visible=x(d.options.visible,b.options.visible,d.visible))})},renderSeries:function(){f(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,c=a.options.labels;c.items&&f(c.items,function(g){var t=b(c.style,g.style),k=d(t.left)+a.plotLeft,e=d(t.top)+a.plotTop+12;delete t.left;delete t.top;a.renderer.text(g.html,k,e).attr({zIndex:2}).css(t).add()})},render:function(){var a=
this.axes,d=this.renderer,b=this.options,c,g,t;this.setTitle();this.legend=new B(this,b.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();b=this.plotWidth;c=this.plotHeight-=21;f(a,function(a){a.setScale()});this.getAxisMargins();g=1.1<b/this.plotWidth;t=1.05<c/this.plotHeight;if(g||t)f(a,function(a){(a.horiz&&g||!a.horiz&&t)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&f(a,function(a){a.visible&&a.render()});this.seriesGroup||
(this.seriesGroup=d.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var d=this;a=k(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(M.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),
this.credits.update=function(a){d.credits=d.credits.destroy();d.addCredits(a)})},destroy:function(){var d=this,b=d.axes,c=d.series,g=d.container,k,e=g&&g.parentNode;w(d,"destroy");d.renderer.forExport?a.erase(z,d):z[d.index]=void 0;a.chartCount--;d.renderTo.removeAttribute("data-highcharts-chart");t(d);for(k=b.length;k--;)b[k]=b[k].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(k=c.length;k--;)c[k]=c[k].destroy();f("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
function(a){var b=d[a];b&&b.destroy&&(d[a]=b.destroy())});g&&(g.innerHTML="",t(g),e&&u(g));A(d,function(a,b){delete d[b]})},isReadyToRender:function(){var a=this;return y||M!=M.top||"complete"===r.readyState?!0:(r.attachEvent("onreadystatechange",function(){r.detachEvent("onreadystatechange",a.firstRender);"complete"===r.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,d=a.options;if(a.isReadyToRender()){a.getContainer();w(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();f(d.series||[],function(d){a.initSeries(d)});a.linkSeries();w(a,"beforeRender");J&&(a.pointer=new J(a,d));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){f([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);w(this,"load");w(this,"render");l(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(L);(function(a){var E,D=a.each,F=a.extend,C=a.erase,r=a.fireEvent,
h=a.format,p=a.isArray,n=a.isNumber,u=a.pick,z=a.removeEvent;a.Point=E=function(){};a.Point.prototype={init:function(a,l,f){this.series=a;this.color=a.color;this.applyOptions(l,f);a.options.colorByPoint?(l=a.options.colors||a.chart.options.colors,this.color=this.color||l[a.colorCounter],l=l.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===l&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=u(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,l){var e=this.series,
b=e.options.pointValKey||e.pointValKey;a=E.prototype.optionsToObject.call(this,a);F(this,a);this.options=this.options?F(this.options,a):a;a.group&&delete this.group;b&&(this.y=this[b]);this.isNull=u(this.isValid&&!this.isValid(),null===this.x||!n(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===l&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===l?e.autoIncrement(this):l);return this},optionsToObject:function(a){var e={},f=this.series,
b=f.options.keys,c=b||f.pointArrayMap||["y"],h=c.length,q=0,m=0;if(n(a)||null===a)e[c[0]]=a;else if(p(a))for(!b&&a.length>h&&(f=typeof a[0],"string"===f?e.name=a[0]:"number"===f&&(e.x=a[0]),q++);m<h;)b&&void 0===a[q]||(e[c[m]]=a[q]),q++,m++;else"object"===typeof a&&(e=a,a.dataLabels&&(f._hasPointLabels=!0),a.marker&&(f._hasPointMarkers=!0));return e},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?
" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,l=a.zones,a=a.zoneAxis||"y",f=0,b;for(b=l[f];this[a]>=b.value;)b=l[++f];b&&b.color&&!this.options.color&&(this.color=b.color);return b},destroy:function(){var a=this.series.chart,l=a.hoverPoints,f;a.pointCount--;l&&(this.setState(),
C(l,this),l.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)z(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],l,f=6;f--;)l=a[f],this[l]&&(this[l]=this[l].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,
series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var e=this.series,f=e.tooltipOptions,b=u(f.valueDecimals,""),c=f.valuePrefix||"",w=f.valueSuffix||"";D(e.pointArrayMap||["y"],function(e){e="{point."+e;if(c||w)a=a.replace(e+"}",c+e+"}"+w);a=a.replace(e+"}",e+":,."+b+"f}")});return h(a,{point:this,series:this.series})},firePointEvent:function(a,l,f){var b=this,c=this.series.options;(c.point.events[a]||b.options&&b.options.events&&
b.options.events[a])&&this.importEvents();"click"===a&&c.allowPointSelect&&(f=function(a){b.select&&b.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});r(this,a,l,f)},visible:!0}})(L);(function(a){var E=a.addEvent,D=a.animObject,F=a.arrayMax,C=a.arrayMin,r=a.correctFloat,h=a.Date,p=a.defaultOptions,n=a.defaultPlotOptions,u=a.defined,z=a.each,e=a.erase,l=a.extend,f=a.fireEvent,b=a.grep,c=a.isArray,w=a.isNumber,q=a.isString,m=a.merge,v=a.objectEach,H=a.pick,B=a.removeEvent,K=a.splat,k=a.SVGElement,A=
a.syncTimeout,J=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",
textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,d){var b=this,c,g=a.series,k;b.chart=
a;b.options=d=b.setOptions(d);b.linkedSeries=[];b.bindAxes();l(b,{name:d.name,state:"",visible:!1!==d.visible,selected:!0===d.selected});c=d.events;v(c,function(a,d){E(b,d,a)});if(c&&c.click||d.point&&d.point.events&&d.point.events.click||d.allowPointSelect)a.runTrackerClick=!0;b.getColor();b.getSymbol();z(b.parallelArrays,function(a){b[a+"Data"]=[]});b.setData(d.data,!1);b.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(k=g[g.length-1]);b._i=H(k&&k._i,-1)+1;a.orderSeries(this.insert(g))},insert:function(a){var d=
this.options.index,b;if(w(d)){for(b=a.length;b--;)if(d>=H(a[b].options.index,a[b]._i)){a.splice(b+1,0,this);break}-1===b&&a.unshift(this);b+=1}else a.push(this);return H(b,a.length-1)},bindAxes:function(){var b=this,d=b.options,c=b.chart,k;z(b.axisTypes||[],function(g){z(c[g],function(a){k=a.options;if(d[g]===k.index||void 0!==d[g]&&d[g]===k.id||void 0===d[g]&&0===k.index)b.insert(a.series),b[g]=a,a.isDirty=!0});b[g]||b.optionalAxis===g||a.error(18,!0)})},updateParallelArrays:function(a,d){var b=
a.series,c=arguments,g=w(d)?function(c){var g="y"===c&&b.toYData?b.toYData(a):a[c];b[c+"Data"][d]=g}:function(a){Array.prototype[d].apply(b[a+"Data"],Array.prototype.slice.call(c,2))};z(b.parallelArrays,g)},autoIncrement:function(){var a=this.options,d=this.xIncrement,b,c=a.pointIntervalUnit,d=H(d,a.pointStart,0);this.pointInterval=b=H(this.pointInterval,a.pointInterval,1);c&&(a=new h(d),"day"===c?a=+a[h.hcSetDate](a[h.hcGetDate]()+b):"month"===c?a=+a[h.hcSetMonth](a[h.hcGetMonth]()+b):"year"===c&&
(a=+a[h.hcSetFullYear](a[h.hcGetFullYear]()+b)),b=a-d);this.xIncrement=d+b;return d},setOptions:function(a){var d=this.chart,b=d.options,c=b.plotOptions,g=(d.userOptions||{}).plotOptions||{},k=c[this.type];this.userOptions=a;d=m(k,c.series,a);this.tooltipOptions=m(p.tooltip,p.plotOptions.series&&p.plotOptions.series.tooltip,p.plotOptions[this.type].tooltip,b.tooltip.userOptions,c.series&&c.series.tooltip,c[this.type].tooltip,a.tooltip);this.stickyTracking=H(a.stickyTracking,g[this.type]&&g[this.type].stickyTracking,
g.series&&g.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:d.stickyTracking);null===k.marker&&delete d.marker;this.zoneAxis=d.zoneAxis;a=this.zones=(d.zones||[]).slice();!d.negativeColor&&!d.negativeFillColor||d.zones||a.push({value:d[this.zoneAxis+"Threshold"]||d.threshold||0,className:"highcharts-negative",color:d.negativeColor,fillColor:d.negativeFillColor});a.length&&u(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return d},getCyclic:function(a,
d,b){var c,g=this.chart,k=this.userOptions,t=a+"Index",e=a+"Counter",m=b?b.length:H(g.options.chart[a+"Count"],g[a+"Count"]);d||(c=H(k[t],k["_"+t]),u(c)||(g.series.length||(g[e]=0),k["_"+t]=c=g[e]%m,g[e]+=1),b&&(d=b[c]));void 0!==c&&(this[t]=c);this[a]=d},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||n[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},
drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,d,k,e){var g=this,t=g.points,m=t&&t.length||0,x,f=g.options,l=g.chart,h=null,G=g.xAxis,A=f.turboThreshold,v=this.xData,n=this.yData,B=(x=g.pointArrayMap)&&x.length;b=b||[];x=b.length;d=H(d,!0);if(!1!==e&&x&&m===x&&!g.cropped&&!g.hasGroupedData&&g.visible)z(b,function(a,d){t[d].update&&a!==f.data[d]&&t[d].update(a,!1,null,!1)});else{g.xIncrement=null;g.colorCounter=0;z(this.parallelArrays,function(a){g[a+"Data"].length=0});if(A&&
x>A){for(k=0;null===h&&k<x;)h=b[k],k++;if(w(h))for(k=0;k<x;k++)v[k]=this.autoIncrement(),n[k]=b[k];else if(c(h))if(B)for(k=0;k<x;k++)h=b[k],v[k]=h[0],n[k]=h.slice(1,B+1);else for(k=0;k<x;k++)h=b[k],v[k]=h[0],n[k]=h[1];else a.error(12)}else for(k=0;k<x;k++)void 0!==b[k]&&(h={series:g},g.pointClass.prototype.applyOptions.apply(h,[b[k]]),g.updateParallelArrays(h,k));n&&q(n[0])&&a.error(14,!0);g.data=[];g.options.data=g.userOptions.data=b;for(k=m;k--;)t[k]&&t[k].destroy&&t[k].destroy();G&&(G.minRange=
G.userMinRange);g.isDirty=l.isDirtyBox=!0;g.isDirtyData=!!t;k=!1}"point"===f.legendType&&(this.processData(),this.generatePoints());d&&l.redraw(k)},processData:function(b){var d=this.xData,c=this.yData,k=d.length,g;g=0;var e,m,x=this.xAxis,f,l=this.options;f=l.cropThreshold;var h=this.getExtremesFromAll||l.getExtremesFromAll,q=this.isCartesian,l=x&&x.val2lin,A=x&&x.isLog,w,v;if(q&&!this.isDirty&&!x.isDirty&&!this.yAxis.isDirty&&!b)return!1;x&&(b=x.getExtremes(),w=b.min,v=b.max);if(q&&this.sorted&&
!h&&(!f||k>f||this.forceCrop))if(d[k-1]<w||d[0]>v)d=[],c=[];else if(d[0]<w||d[k-1]>v)g=this.cropData(this.xData,this.yData,w,v),d=g.xData,c=g.yData,g=g.start,e=!0;for(f=d.length||1;--f;)k=A?l(d[f])-l(d[f-1]):d[f]-d[f-1],0<k&&(void 0===m||k<m)?m=k:0>k&&this.requireSorting&&a.error(15);this.cropped=e;this.cropStart=g;this.processedXData=d;this.processedYData=c;this.closestPointRange=m},cropData:function(a,d,b,c){var g=a.length,k=0,t=g,e=H(this.cropShoulder,1),m;for(m=0;m<g;m++)if(a[m]>=b){k=Math.max(0,
m-e);break}for(b=m;b<g;b++)if(a[b]>c){t=b+e;break}return{xData:a.slice(k,t),yData:d.slice(k,t),start:k,end:t}},generatePoints:function(){var a=this.options,d=a.data,b=this.data,c,g=this.processedXData,k=this.processedYData,e=this.pointClass,m=g.length,f=this.cropStart||0,l,h=this.hasGroupedData,a=a.keys,q,A=[],w;b||h||(b=[],b.length=d.length,b=this.data=b);a&&h&&(this.options.keys=!1);for(w=0;w<m;w++)l=f+w,h?(q=(new e).init(this,[g[w]].concat(K(k[w]))),q.dataGroup=this.groupMap[w]):(q=b[l])||void 0===
d[l]||(b[l]=q=(new e).init(this,d[l],g[w])),q&&(q.index=l,A[w]=q);this.options.keys=a;if(b&&(m!==(c=b.length)||h))for(w=0;w<c;w++)w!==f||h||(w+=m),b[w]&&(b[w].destroyElements(),b[w].plotX=void 0);this.data=b;this.points=A},getExtremes:function(a){var d=this.yAxis,b=this.processedXData,k,g=[],e=0;k=this.xAxis.getExtremes();var m=k.min,f=k.max,x,l,h,q;a=a||this.stackedYData||this.processedYData||[];k=a.length;for(q=0;q<k;q++)if(l=b[q],h=a[q],x=(w(h,!0)||c(h))&&(!d.positiveValuesOnly||h.length||0<h),
l=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(b[q+1]||l)>=m&&(b[q-1]||l)<=f,x&&l)if(x=h.length)for(;x--;)null!==h[x]&&(g[e++]=h[x]);else g[e++]=h;this.dataMin=C(g);this.dataMax=F(g)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,d=a.stacking,b=this.xAxis,c=b.categories,g=this.yAxis,k=this.points,e=k.length,m=!!this.modifyValue,f=a.pointPlacement,l="between"===f||w(f),h=a.threshold,q=a.startFromThreshold?h:0,A,v,n,
B,p=Number.MAX_VALUE;"between"===f&&(f=.5);w(f)&&(f*=H(a.pointRange||b.pointRange));for(a=0;a<e;a++){var J=k[a],z=J.x,K=J.y;v=J.low;var D=d&&g.stacks[(this.negStacks&&K<(q?0:h)?"-":"")+this.stackKey],C;g.positiveValuesOnly&&null!==K&&0>=K&&(J.isNull=!0);J.plotX=A=r(Math.min(Math.max(-1E5,b.translate(z,0,0,0,1,f,"flags"===this.type)),1E5));d&&this.visible&&!J.isNull&&D&&D[z]&&(B=this.getStackIndicator(B,z,this.index),C=D[z],K=C.points[B.key],v=K[0],K=K[1],v===q&&B.key===D[z].base&&(v=H(h,g.min)),g.positiveValuesOnly&&
0>=v&&(v=null),J.total=J.stackTotal=C.total,J.percentage=C.total&&J.y/C.total*100,J.stackY=K,C.setOffset(this.pointXOffset||0,this.barW||0));J.yBottom=u(v)?g.translate(v,0,1,0,1):null;m&&(K=this.modifyValue(K,J));J.plotY=v="number"===typeof K&&Infinity!==K?Math.min(Math.max(-1E5,g.translate(K,0,1,0,1)),1E5):void 0;J.isInside=void 0!==v&&0<=v&&v<=g.len&&0<=A&&A<=b.len;J.clientX=l?r(b.translate(z,0,0,0,1,f)):A;J.negative=J.y<(h||0);J.category=c&&void 0!==c[J.x]?c[J.x]:J.x;J.isNull||(void 0!==n&&(p=
Math.min(p,Math.abs(A-n))),n=A);J.zone=this.zones.length&&J.getZone()}this.closestPointRangePx=p},getValidPoints:function(a,d){var c=this.chart;return b(a||this.points||[],function(a){return d&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var d=this.chart,b=this.options,c=d.renderer,g=d.inverted,k=this.clipBox,e=k||d.clipBox,m=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,e.height,b.xAxis,b.yAxis].join(),f=d[m],x=d[m+"m"];f||(a&&(e.width=0,g&&(e.x=
d.plotSizeX),d[m+"m"]=x=c.clipRect(g?d.plotSizeX+99:-99,g?-d.plotLeft:-d.plotTop,99,g?d.chartWidth:d.chartHeight)),d[m]=f=c.clipRect(e),f.count={length:0});a&&!f.count[this.index]&&(f.count[this.index]=!0,f.count.length+=1);!1!==b.clip&&(this.group.clip(a||k?f:d.clipRect),this.markerGroup.clip(x),this.sharedClipKey=m);a||(f.count[this.index]&&(delete f.count[this.index],--f.count.length),0===f.count.length&&m&&d[m]&&(k||(d[m]=d[m].destroy()),d[m+"m"]&&(d[m+"m"]=d[m+"m"].destroy())))},animate:function(a){var d=
this.chart,b=D(this.options.animation),c;a?this.setClip(b):(c=this.sharedClipKey,(a=d[c])&&a.animate({width:d.plotSizeX,x:0},b),d[c+"m"]&&d[c+"m"].animate({width:d.plotSizeX+99,x:0},b),this.animate=null)},afterAnimate:function(){this.setClip();f(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,d=this.chart,b,c,g,k,e=this.options.marker,m,f,l,h,q=this[this.specialGroup]||this.markerGroup,A=H(e.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*e.radius);
if(!1!==e.enabled||this._hasPointMarkers)for(c=0;c<a.length;c++)g=a[c],b=g.plotY,k=g.graphic,m=g.marker||{},f=!!g.marker,l=A&&void 0===m.enabled||m.enabled,h=g.isInside,l&&w(b)&&null!==g.y?(b=H(m.symbol,this.symbol),g.hasImage=0===b.indexOf("url"),l=this.markerAttribs(g,g.selected&&"select"),k?k[h?"show":"hide"](!0).animate(l):h&&(0<l.width||g.hasImage)&&(g.graphic=k=d.renderer.symbol(b,l.x,l.y,l.width,l.height,f?m:e).add(q)),k&&k.attr(this.pointAttribs(g,g.selected&&"select")),k&&k.addClass(g.getClassName(),
!0)):k&&(g.graphic=k.destroy())},markerAttribs:function(a,d){var b=this.options.marker,c=a.marker||{},g=H(c.radius,b.radius);d&&(b=b.states[d],d=c.states&&c.states[d],g=H(d&&d.radius,b&&b.radius,g+(b&&b.radiusPlus||0)));a.hasImage&&(g=0);a={x:Math.floor(a.plotX)-g,y:a.plotY-g};g&&(a.width=a.height=2*g);return a},pointAttribs:function(a,d){var b=this.options.marker,c=a&&a.options,g=c&&c.marker||{},k=this.color,e=c&&c.color,m=a&&a.color,c=H(g.lineWidth,b.lineWidth);a=a&&a.zone&&a.zone.color;k=e||a||
m||k;a=g.fillColor||b.fillColor||k;k=g.lineColor||b.lineColor||k;d&&(b=b.states[d],d=g.states&&g.states[d]||{},c=H(d.lineWidth,b.lineWidth,c+H(d.lineWidthPlus,b.lineWidthPlus,0)),a=d.fillColor||b.fillColor||a,k=d.lineColor||b.lineColor||k);return{stroke:k,"stroke-width":c,fill:a}},destroy:function(){var a=this,d=a.chart,b=/AppleWebKit\/533/.test(J.navigator.userAgent),c,g,m=a.data||[],l,h;f(a,"destroy");B(a);z(a.axisTypes||[],function(d){(h=a[d])&&h.series&&(e(h.series,a),h.isDirty=h.forceRedraw=
!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(g=m.length;g--;)(l=m[g])&&l.destroy&&l.destroy();a.points=null;clearTimeout(a.animationTimeout);v(a,function(a,d){a instanceof k&&!a.survive&&(c=b&&"group"===d?"hide":"destroy",a[c]())});d.hoverSeries===a&&(d.hoverSeries=null);e(d.series,a);d.orderSeries();v(a,function(d,b){delete a[b]})},getGraphPath:function(a,d,b){var c=this,g=c.options,k=g.step,e,m=[],t=[],f;a=a||c.points;(e=a.reversed)&&a.reverse();(k={right:1,center:2}[k]||k&&3)&&e&&(k=4-
k);!g.connectNulls||d||b||(a=this.getValidPoints(a));z(a,function(e,l){var x=e.plotX,h=e.plotY,q=a[l-1];(e.leftCliff||q&&q.rightCliff)&&!b&&(f=!0);e.isNull&&!u(d)&&0<l?f=!g.connectNulls:e.isNull&&!d?f=!0:(0===l||f?l=["M",e.plotX,e.plotY]:c.getPointSpline?l=c.getPointSpline(a,e,l):k?(l=1===k?["L",q.plotX,h]:2===k?["L",(q.plotX+x)/2,q.plotY,"L",(q.plotX+x)/2,h]:["L",x,q.plotY],l.push("L",x,h)):l=["L",x,h],t.push(e.x),k&&t.push(e.x),m.push.apply(m,l),f=!1)});m.xMap=t;return c.graphPath=m},drawGraph:function(){var a=
this,d=this.options,b=(this.gappedPath||this.getGraphPath).call(this),c=[["graph","highcharts-graph",d.lineColor||this.color,d.dashStyle]];z(this.zones,function(b,k){c.push(["zone-graph-"+k,"highcharts-graph highcharts-zone-graph-"+k+" "+(b.className||""),b.color||a.color,b.dashStyle||d.dashStyle])});z(c,function(c,k){var g=c[0],e=a[g];e?(e.endX=b.xMap,e.animate({d:b})):b.length&&(a[g]=a.chart.renderer.path(b).addClass(c[1]).attr({zIndex:1}).add(a.group),e={stroke:c[2],"stroke-width":d.lineWidth,
fill:a.fillGraph&&a.color||"none"},c[3]?e.dashstyle=c[3]:"square"!==d.linecap&&(e["stroke-linecap"]=e["stroke-linejoin"]="round"),e=a[g].attr(e).shadow(2>k&&d.shadow));e&&(e.startX=b.xMap,e.isArea=b.isArea)})},applyZones:function(){var a=this,d=this.chart,b=d.renderer,c=this.zones,g,k,e=this.clips||[],m,f=this.graph,l=this.area,h=Math.max(d.chartWidth,d.chartHeight),q=this[(this.zoneAxis||"y")+"Axis"],A,w,v=d.inverted,n,B,p,J,u=!1;c.length&&(f||l)&&q&&void 0!==q.min&&(w=q.reversed,n=q.horiz,f&&f.hide(),
l&&l.hide(),A=q.getExtremes(),z(c,function(c,t){g=w?n?d.plotWidth:0:n?0:q.toPixels(A.min);g=Math.min(Math.max(H(k,g),0),h);k=Math.min(Math.max(Math.round(q.toPixels(H(c.value,A.max),!0)),0),h);u&&(g=k=q.toPixels(A.max));B=Math.abs(g-k);p=Math.min(g,k);J=Math.max(g,k);q.isXAxis?(m={x:v?J:p,y:0,width:B,height:h},n||(m.x=d.plotHeight-m.x)):(m={x:0,y:v?J:p,width:h,height:B},n&&(m.y=d.plotWidth-m.y));v&&b.isVML&&(m=q.isXAxis?{x:0,y:w?p:J,height:m.width,width:d.chartWidth}:{x:m.y-d.plotLeft-d.spacingBox.x,
y:0,width:m.height,height:d.chartHeight});e[t]?e[t].animate(m):(e[t]=b.clipRect(m),f&&a["zone-graph-"+t].clip(e[t]),l&&a["zone-area-"+t].clip(e[t]));u=c.value>A.max}),this.clips=e)},invertGroups:function(a){function d(){z(["group","markerGroup"],function(d){b[d]&&(c.renderer.isVML&&b[d].attr({width:b.yAxis.len,height:b.xAxis.len}),b[d].width=b.yAxis.len,b[d].height=b.xAxis.len,b[d].invert(a))})}var b=this,c=b.chart,g;b.xAxis&&(g=E(c,"resize",d),E(b,"destroy",g),d(a),b.invertGroups=d)},plotGroup:function(a,
d,b,c,g){var k=this[a],e=!k;e&&(this[a]=k=this.chart.renderer.g().attr({zIndex:c||.1}).add(g));k.addClass("highcharts-"+d+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(u(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(k.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);k.attr({visibility:b})[e?"attr":"animate"](this.getPlotBox());return k},getPlotBox:function(){var a=this.chart,d=this.xAxis,b=this.yAxis;a.inverted&&(d=b,
b=this.xAxis);return{translateX:d?d.left:a.plotLeft,translateY:b?b.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,d=a.chart,b,c=a.options,g=!!a.animate&&d.renderer.isSVG&&D(c.animation).duration,k=a.visible?"inherit":"hidden",e=c.zIndex,m=a.hasRendered,f=d.seriesGroup,l=d.inverted;b=a.plotGroup("group","series",k,e,f);a.markerGroup=a.plotGroup("markerGroup","markers",k,e,f);g&&a.animate(!0);b.inverted=a.isCartesian?l:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&
a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(l);!1===c.clip||a.sharedClipKey||m||b.clip(d.clipRect);g&&a.animate();m||(a.animationTimeout=A(function(){a.afterAnimate()},g));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,d=this.isDirty||this.isDirtyData,b=this.group,c=this.xAxis,g=this.yAxis;b&&(a.inverted&&b.attr({width:a.plotWidth,height:a.plotHeight}),b.animate({translateX:H(c&&c.left,a.plotLeft),
translateY:H(g&&g.top,a.plotTop)}));this.translate();this.render();d&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,d){var b=this.xAxis,c=this.yAxis,g=this.chart.inverted;return this.searchKDTree({clientX:g?b.len-a.chartY+b.pos:a.chartX-b.pos,plotY:g?c.len-a.chartX+c.pos:a.chartY-c.pos},d)},buildKDTree:function(){function a(b,c,k){var g,e;if(e=b&&b.length)return g=d.kdAxisArray[c%k],b.sort(function(a,d){return a[g]-d[g]}),e=Math.floor(e/2),{point:b[e],left:a(b.slice(0,
e),c+1,k),right:a(b.slice(e+1),c+1,k)}}this.buildingKdTree=!0;var d=this,b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;delete d.kdTree;A(function(){d.kdTree=a(d.getValidPoints(null,!d.directTouch),b,b);d.buildingKdTree=!1},d.options.kdNow?0:1)},searchKDTree:function(a,d){function b(a,d,m,f){var t=d.point,l=c.kdAxisArray[m%f],x,h,q=t;h=u(a[g])&&u(t[g])?Math.pow(a[g]-t[g],2):null;x=u(a[k])&&u(t[k])?Math.pow(a[k]-t[k],2):null;x=(h||0)+(x||0);t.dist=u(x)?Math.sqrt(x):Number.MAX_VALUE;t.distX=u(h)?
Math.sqrt(h):Number.MAX_VALUE;l=a[l]-t[l];x=0>l?"left":"right";h=0>l?"right":"left";d[x]&&(x=b(a,d[x],m+1,f),q=x[e]<q[e]?x:t);d[h]&&Math.sqrt(l*l)<q[e]&&(a=b(a,d[h],m+1,f),q=a[e]<q[e]?a:q);return q}var c=this,g=this.kdAxisArray[0],k=this.kdAxisArray[1],e=d?"distX":"dist";d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return b(a,this.kdTree,d,d)}})})(L);(function(a){var E=a.Axis,D=a.Chart,F=a.correctFloat,C=a.defined,r=a.destroyObjectProperties,
h=a.each,p=a.format,n=a.objectEach,u=a.pick,z=a.Series;a.StackItem=function(a,l,f,b,c){var e=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=l;this.x=b;this.total=null;this.points={};this.stack=c;this.rightCliff=this.leftCliff=0;this.alignOptions={align:l.align||(e?f?"left":"right":"center"),verticalAlign:l.verticalAlign||(e?"middle":f?"bottom":"top"),y:u(l.y,e?4:f?14:-6),x:u(l.x,e?f?-6:6:0)};this.textAlign=l.textAlign||(e?f?"right":"left":"center")};a.StackItem.prototype={destroy:function(){r(this,
this.axis)},render:function(a){var e=this.options,f=e.format,f=f?p(f,this):e.formatter.call(this);this.label?this.label.attr({text:f,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(f,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,rotation:e.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,l){var e=this.axis,b=e.chart,c=e.translate(e.usePercentage?100:this.total,0,0,0,1),e=e.translate(0),e=Math.abs(c-e);a=b.xAxis[0].translate(this.x)+a;c=this.getStackBox(b,this,
a,c,l,e);if(l=this.label)l.align(this.alignOptions,null,c),c=l.alignAttr,l[!1===this.options.crop||b.isInsidePlot(c.x,c.y)?"show":"hide"](!0)},getStackBox:function(a,l,f,b,c,h){var e=l.axis.reversed,m=a.inverted;a=a.plotHeight;l=l.isNegative&&!e||!l.isNegative&&e;return{x:m?l?b:b-h:f,y:m?a-f-c:l?a-b-h:a-b,width:m?h:c,height:m?c:h}}};D.prototype.getStacks=function(){var a=this;h(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});h(a.series,function(e){!e.options.stacking||!0!==
e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+u(e.options.stack,""))})};E.prototype.buildStacks=function(){var a=this.series,l=u(this.options.reversedStacks,!0),f=a.length,b;if(!this.isXAxis){this.usePercentage=!1;for(b=f;b--;)a[l?b:f-b-1].setStackedPoints();for(b=0;b<f;b++)a[b].modifyStacks()}};E.prototype.renderStackTotals=function(){var a=this.chart,l=a.renderer,f=this.stacks,b=this.stackTotalGroup;b||(this.stackTotalGroup=b=l.g("stack-labels").attr({visibility:"visible",
zIndex:6}).add());b.translate(a.plotLeft,a.plotTop);n(f,function(a){n(a,function(a){a.render(b)})})};E.prototype.resetStacks=function(){var a=this,l=a.stacks;a.isXAxis||n(l,function(e){n(e,function(b,c){b.touched<a.stacksTouched?(b.destroy(),delete e[c]):(b.total=null,b.cum=null)})})};E.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),n(a,function(a){n(a,function(a){a.cum=a.total})}))};z.prototype.setStackedPoints=function(){if(this.options.stacking&&
(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var e=this.processedXData,l=this.processedYData,f=[],b=l.length,c=this.options,h=c.threshold,q=c.startFromThreshold?h:0,m=c.stack,c=c.stacking,v=this.stackKey,n="-"+v,B=this.negStacks,p=this.yAxis,k=p.stacks,A=p.oldStacks,J,x,d,t,G,g,y;p.stacksTouched+=1;for(G=0;G<b;G++)g=e[G],y=l[G],J=this.getStackIndicator(J,g,this.index),t=J.key,d=(x=B&&y<(q?0:h))?n:v,k[d]||(k[d]={}),k[d][g]||(A[d]&&A[d][g]?(k[d][g]=A[d][g],k[d][g].total=null):
k[d][g]=new a.StackItem(p,p.options.stackLabels,x,g,m)),d=k[d][g],null!==y&&(d.points[t]=d.points[this.index]=[u(d.cum,q)],C(d.cum)||(d.base=t),d.touched=p.stacksTouched,0<J.index&&!1===this.singleStacks&&(d.points[t][0]=d.points[this.index+","+g+",0"][0])),"percent"===c?(x=x?v:n,B&&k[x]&&k[x][g]?(x=k[x][g],d.total=x.total=Math.max(x.total,d.total)+Math.abs(y)||0):d.total=F(d.total+(Math.abs(y)||0))):d.total=F(d.total+(y||0)),d.cum=u(d.cum,q)+(y||0),null!==y&&(d.points[t].push(d.cum),f[G]=d.cum);
"percent"===c&&(p.usePercentage=!0);this.stackedYData=f;p.oldStacks={}}};z.prototype.modifyStacks=function(){var a=this,l=a.stackKey,f=a.yAxis.stacks,b=a.processedXData,c,w=a.options.stacking;a[w+"Stacker"]&&h([l,"-"+l],function(e){for(var m=b.length,l,h;m--;)if(l=b[m],c=a.getStackIndicator(c,l,a.index,e),h=(l=f[e]&&f[e][l])&&l.points[c.key])a[w+"Stacker"](h,l,m)})};z.prototype.percentStacker=function(a,l,f){l=l.total?100/l.total:0;a[0]=F(a[0]*l);a[1]=F(a[1]*l);this.stackedYData[f]=a[1]};z.prototype.getStackIndicator=
function(a,l,f,b){!C(a)||a.x!==l||b&&a.key!==b?a={x:l,index:0,key:b}:a.index++;a.key=[f,l,a.index].join();return a}})(L);(function(a){var E=a.addEvent,D=a.animate,F=a.Axis,C=a.createElement,r=a.css,h=a.defined,p=a.each,n=a.erase,u=a.extend,z=a.fireEvent,e=a.inArray,l=a.isNumber,f=a.isObject,b=a.isArray,c=a.merge,w=a.objectEach,q=a.pick,m=a.Point,v=a.Series,H=a.seriesTypes,B=a.setAnimation,K=a.splat;u(a.Chart.prototype,{addSeries:function(a,b,c){var k,d=this;a&&(b=q(b,!0),z(d,"addSeries",{options:a},
function(){k=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return k},addAxis:function(a,b,e,m){var d=b?"xAxis":"yAxis",k=this.options;a=c(a,{index:this[d].length,isX:b});b=new F(this,a);k[d]=K(k[d]||{});k[d].push(a);q(e,!0)&&this.redraw(m);return b},showLoading:function(a){var b=this,c=b.options,k=b.loadingDiv,d=c.loading,e=function(){k&&r(k,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};k||(b.loadingDiv=k=C("div",{className:"highcharts-loading highcharts-loading-hidden"},
null,b.container),b.loadingSpan=C("span",{className:"highcharts-loading-inner"},null,k),E(b,"redraw",e));k.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;r(k,u(d.style,{zIndex:10}));r(b.loadingSpan,d.labelStyle);b.loadingShown||(r(k,{opacity:0,display:""}),D(k,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;e()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",D(b,{opacity:0},
{duration:a.loading.hideDuration||100,complete:function(){r(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
update:function(a,b,m){var k=this,d={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},t=a.chart,f,g,A=[];if(t){c(!0,k.options.chart,t);"className"in t&&k.setClassName(t.className);if("inverted"in t||"polar"in t)k.propFromSeries(),f=!0;"alignTicks"in t&&(f=!0);w(t,function(a,d){-1!==e("chart."+d,k.propsRequireUpdateSeries)&&(g=!0);-1!==e(d,k.propsRequireDirtyBox)&&(k.isDirtyBox=!0)});"style"in t&&k.renderer.setStyle(t.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&c(!0,
this.options.plotOptions,a.plotOptions);w(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[d[b]])k[d[b]](a);"chart"!==b&&-1!==e(b,k.propsRequireUpdateSeries)&&(g=!0)});p("xAxis yAxis zAxis series colorAxis pane".split(" "),function(d){a[d]&&(p(K(a[d]),function(a,b){(b=h(a.id)&&k.get(a.id)||k[d][b])&&b.coll===d&&(b.update(a,!1),m&&(b.touched=!0));if(!b&&m)if("series"===d)k.addSeries(a,!1).touched=!0;else if("xAxis"===d||"yAxis"===d)k.addAxis(a,
"xAxis"===d,!1).touched=!0}),m&&p(k[d],function(a){a.touched?delete a.touched:A.push(a)}))});p(A,function(a){a.remove(!1)});f&&p(k.axes,function(a){a.update({},!1)});g&&p(k.series,function(a){a.update({},!1)});a.loading&&c(!0,k.options.loading,a.loading);f=t&&t.width;t=t&&t.height;l(f)&&f!==k.chartWidth||l(t)&&t!==k.chartHeight?k.setSize(f,t):q(b,!0)&&k.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});u(m.prototype,{update:function(a,b,c,e){function d(){k.applyOptions(a);null===k.y&&g&&
(k.graphic=g.destroy());f(a,!0)&&(g&&g.element&&a&&a.marker&&void 0!==a.marker.symbol&&(k.graphic=g.destroy()),a&&a.dataLabels&&k.dataLabel&&(k.dataLabel=k.dataLabel.destroy()));l=k.index;m.updateParallelArrays(k,l);x.data[l]=f(x.data[l],!0)||f(a,!0)?k.options:a;m.isDirty=m.isDirtyData=!0;!m.fixedBox&&m.hasCartesianSeries&&(h.isDirtyBox=!0);"point"===x.legendType&&(h.isDirtyLegend=!0);b&&h.redraw(c)}var k=this,m=k.series,g=k.graphic,l,h=m.chart,x=m.options;b=q(b,!0);!1===e?d():k.firePointEvent("update",
{options:a},d)},remove:function(a,b){this.series.removePoint(e(this,this.series.data),a,b)}});u(v.prototype,{addPoint:function(a,b,c,e){var d=this.options,k=this.data,m=this.chart,g=this.xAxis,g=g&&g.hasNames&&g.names,f=d.data,l,h,x=this.xData,w,A;b=q(b,!0);l={series:this};this.pointClass.prototype.applyOptions.apply(l,[a]);A=l.x;w=x.length;if(this.requireSorting&&A<x[w-1])for(h=!0;w&&x[w-1]>A;)w--;this.updateParallelArrays(l,"splice",w,0,0);this.updateParallelArrays(l,w);g&&l.name&&(g[A]=l.name);
f.splice(w,0,a);h&&(this.data.splice(w,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(k[0]&&k[0].remove?k[0].remove(!1):(k.shift(),this.updateParallelArrays(l,"shift"),f.shift()));this.isDirtyData=this.isDirty=!0;b&&m.redraw(e)},removePoint:function(a,b,c){var k=this,d=k.data,e=d[a],m=k.points,g=k.chart,f=function(){m&&m.length===d.length&&m.splice(a,1);d.splice(a,1);k.options.data.splice(a,1);k.updateParallelArrays(e||{series:k},"splice",a,1);e&&e.destroy();k.isDirty=
!0;k.isDirtyData=!0;b&&g.redraw()};B(c,g);b=q(b,!0);e?e.firePointEvent("remove",null,f):f()},remove:function(a,b,c){function k(){d.destroy();e.isDirtyLegend=e.isDirtyBox=!0;e.linkSeries();q(a,!0)&&e.redraw(b)}var d=this,e=d.chart;!1!==c?z(d,"remove",null,k):k()},update:function(a,b){var k=this,e=k.chart,d=k.userOptions,m=k.oldType||k.type,f=a.type||d.type||e.options.chart.type,g=H[m].prototype,l,h=["group","markerGroup","dataLabelsGroup"],w=["navigatorSeries","baseSeries"],v=k.finishedAnimating&&
{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,b);if(f&&f!==m||void 0!==a.zIndex)h.length=0;k.options.isInternal&&(w.length=0);w=h.concat(w);p(w,function(a){w[a]=k[a];delete k[a]});a=c(d,v,{index:k.index,pointStart:k.xData[0]},{data:k.options.data},a);k.remove(!1,null,!1);for(l in g)k[l]=void 0;u(k,H[f||m].prototype);p(w,function(a){k[a]=w[a]});k.init(e,a);k.oldType=m;e.linkSeries();q(b,!0)&&e.redraw(!1)}});u(F.prototype,{update:function(a,b){var k=this.chart;
a=k.options[this.coll][this.options.index]=c(this.userOptions,a);this.destroy(!0);this.init(k,u(a,{events:void 0}));k.isDirtyBox=!0;q(b,!0)&&k.redraw()},remove:function(a){for(var c=this.chart,k=this.coll,e=this.series,d=e.length;d--;)e[d]&&e[d].remove(!1);n(c.axes,this);n(c[k],this);b(c.options[k])?c.options[k].splice(this.options.index,1):delete c.options[k];p(c[k],function(a,d){a.options.index=d});this.destroy();c.isDirtyBox=!0;q(a,!0)&&c.redraw()},setTitle:function(a,b){this.update({title:a},
b)},setCategories:function(a,b){this.update({categories:a},b)}})})(L);(function(a){var E=a.color,D=a.each,F=a.map,C=a.pick,r=a.Series,h=a.seriesType;h("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(h){var n=[],p=[],r=this.xAxis,e=this.yAxis,l=e.stacks[this.stackKey],f={},b=this.index,c=e.series,w=c.length,q,m=C(e.options.reversedStacks,!0)?1:-1,v;h=h||this.points;if(this.options.stacking){for(v=0;v<h.length;v++)f[h[v].x]=h[v];a.objectEach(l,function(a,b){null!==
a.total&&p.push(b)});p.sort(function(a,b){return a-b});q=F(c,function(){return this.visible});D(p,function(a,c){var h=0,k,A;if(f[a]&&!f[a].isNull)n.push(f[a]),D([-1,1],function(e){var h=1===e?"rightNull":"leftNull",d=0,t=l[p[c+e]];if(t)for(v=b;0<=v&&v<w;)k=t.points[v],k||(v===b?f[a][h]=!0:q[v]&&(A=l[a].points[v])&&(d-=A[1]-A[0])),v+=m;f[a][1===e?"rightCliff":"leftCliff"]=d});else{for(v=b;0<=v&&v<w;){if(k=l[a].points[v]){h=k[1];break}v+=m}h=e.translate(h,0,1,0,1);n.push({isNull:!0,plotX:r.translate(a,
0,0,0,1),x:a,plotY:h,yBottom:h})}})}return n},getGraphPath:function(a){var h=r.prototype.getGraphPath,p=this.options,z=p.stacking,e=this.yAxis,l,f,b=[],c=[],w=this.index,q,m=e.stacks[this.stackKey],v=p.threshold,H=e.getThreshold(p.threshold),B,p=p.connectNulls||"percent"===z,K=function(k,f,l){var h=a[k];k=z&&m[h.x].points[w];var d=h[l+"Null"]||0;l=h[l+"Cliff"]||0;var t,A,h=!0;l||d?(t=(d?k[0]:k[1])+l,A=k[0]+l,h=!!d):!z&&a[f]&&a[f].isNull&&(t=A=v);void 0!==t&&(c.push({plotX:q,plotY:null===t?H:e.getThreshold(t),
isNull:h,isCliff:!0}),b.push({plotX:q,plotY:null===A?H:e.getThreshold(A),doCurve:!1}))};a=a||this.points;z&&(a=this.getStackPoints(a));for(l=0;l<a.length;l++)if(f=a[l].isNull,q=C(a[l].rectPlotX,a[l].plotX),B=C(a[l].yBottom,H),!f||p)p||K(l,l-1,"left"),f&&!z&&p||(c.push(a[l]),b.push({x:l,plotX:q,plotY:B})),p||K(l,l+1,"right");l=h.call(this,c,!0,!0);b.reversed=!0;f=h.call(this,b,!0,!0);f.length&&(f[0]="L");f=l.concat(f);h=h.call(this,c,!1,p);f.xMap=l.xMap;this.areaPath=f;return h},drawGraph:function(){this.areaPath=
[];r.prototype.drawGraph.apply(this);var a=this,h=this.areaPath,u=this.options,z=[["area","highcharts-area",this.color,u.fillColor]];D(this.zones,function(e,l){z.push(["zone-area-"+l,"highcharts-area highcharts-zone-area-"+l+" "+e.className,e.color||a.color,e.fillColor||u.fillColor])});D(z,function(e){var l=e[0],f=a[l];f?(f.endX=h.xMap,f.animate({d:h})):(f=a[l]=a.chart.renderer.path(h).addClass(e[1]).attr({fill:C(e[3],E(e[2]).setOpacity(C(u.fillOpacity,.75)).get()),zIndex:0}).add(a.group),f.isArea=
!0);f.startX=h.xMap;f.shiftUnit=u.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var E=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,F,C){var r=F.plotX,h=F.plotY,p=a[C-1];C=a[C+1];var n,u,z,e;if(p&&!p.isNull&&!1!==p.doCurve&&!F.isCliff&&C&&!C.isNull&&!1!==C.doCurve&&!F.isCliff){a=p.plotY;z=C.plotX;C=C.plotY;var l=0;n=(1.5*r+p.plotX)/2.5;u=(1.5*h+a)/2.5;z=(1.5*r+z)/2.5;e=(1.5*h+C)/2.5;z!==n&&(l=(e-u)*(z-r)/(z-n)+h-e);u+=l;e+=l;u>a&&u>h?(u=
Math.max(a,h),e=2*h-u):u<a&&u<h&&(u=Math.min(a,h),e=2*h-u);e>C&&e>h?(e=Math.max(C,h),u=2*h-e):e<C&&e<h&&(e=Math.min(C,h),u=2*h-e);F.rightContX=z;F.rightContY=e}F=["C",E(p.rightContX,p.plotX),E(p.rightContY,p.plotY),E(n,r),E(u,h),r,h];p.rightContX=p.rightContY=null;return F}})})(L);(function(a){var E=a.seriesTypes.area.prototype,D=a.seriesType;D("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:E.getStackPoints,getGraphPath:E.getGraphPath,drawGraph:E.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);
(function(a){var E=a.animObject,D=a.color,F=a.each,C=a.extend,r=a.isNumber,h=a.merge,p=a.pick,n=a.Series,u=a.seriesType,z=a.svg;u("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,
borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){n.prototype.init.apply(this,arguments);var a=this,l=a.chart;l.hasRendered&&F(l.series,function(e){e.type===a.type&&(e.isDirty=!0)})},getColumnMetrics:function(){var a=this,l=a.options,f=a.xAxis,b=a.yAxis,c=f.reversed,h,q={},m=0;!1===l.grouping?m=1:F(a.chart.series,function(c){var k=c.options,e=c.yAxis,f;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||
b.len!==e.len||b.pos!==e.pos||(k.stacking?(h=c.stackKey,void 0===q[h]&&(q[h]=m++),f=q[h]):!1!==k.grouping&&(f=m++),c.columnIndex=f)});var v=Math.min(Math.abs(f.transA)*(f.ordinalSlope||l.pointRange||f.closestPointRange||f.tickInterval||1),f.len),n=v*l.groupPadding,B=(v-2*n)/(m||1),l=Math.min(l.maxPointWidth||f.len,p(l.pointWidth,B*(1-2*l.pointPadding)));a.columnMetrics={width:l,offset:(B-l)/2+(n+((a.columnIndex||0)+(c?1:0))*B-v/2)*(c?-1:1)};return a.columnMetrics},crispCol:function(a,l,f,b){var c=
this.chart,e=this.borderWidth,h=-(e%2?.5:0),e=e%2?.5:1;c.inverted&&c.renderer.isVML&&(e+=1);this.options.crisp&&(f=Math.round(a+f)+h,a=Math.round(a)+h,f-=a);b=Math.round(l+b)+e;h=.5>=Math.abs(l)&&.5<b;l=Math.round(l)+e;b-=l;h&&b&&(--l,b+=1);return{x:a,y:l,width:f,height:b}},translate:function(){var a=this,l=a.chart,f=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=p(f.borderWidth,b?0:1),c=a.yAxis,h=a.translatedThreshold=c.getThreshold(f.threshold),q=p(f.minPointLength,5),
m=a.getColumnMetrics(),v=m.width,u=a.barW=Math.max(v,1+2*b),B=a.pointXOffset=m.offset;l.inverted&&(h-=.5);f.pointPadding&&(u=Math.ceil(u));n.prototype.translate.apply(a);F(a.points,function(b){var k=p(b.yBottom,h),e=999+Math.abs(k),e=Math.min(Math.max(-e,b.plotY),c.len+e),m=b.plotX+B,f=u,d=Math.min(e,k),t,w=Math.max(e,k)-d;q&&Math.abs(w)<q&&(w=q,t=!c.reversed&&!b.negative||c.reversed&&b.negative,0===b.y&&0>=a.dataMax&&(t=!t),d=Math.abs(d-h)>q?k-q:h-(t?q:0));b.barX=m;b.pointWidth=v;b.tooltipPos=l.inverted?
[c.len+c.pos-l.plotLeft-e,a.xAxis.len-m-f/2,w]:[m+f/2,e+c.pos-l.plotTop,w];b.shapeType="rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[m,h,f,0]:[m,d,f,w])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,l){var e=this.options,b,c=this.pointAttrToOptions||{};b=c.stroke||"borderColor";var w=c["stroke-width"]||"borderWidth",q=a&&a.color||this.color,m=a&&a[b]||e[b]||
this.color||q,v=a&&a[w]||e[w]||this[w]||0,c=e.dashStyle;a&&this.zones.length&&(q=a.getZone(),q=a.options.color||q&&q.color||this.color);l&&(a=h(e.states[l],a.options.states&&a.options.states[l]||{}),l=a.brightness,q=a.color||void 0!==l&&D(q).brighten(a.brightness).get()||q,m=a[b]||m,v=a[w]||v,c=a.dashStyle||c);b={fill:q,stroke:m,"stroke-width":v};c&&(b.dashstyle=c);return b},drawPoints:function(){var a=this,l=this.chart,f=a.options,b=l.renderer,c=f.animationLimit||250,w;F(a.points,function(e){var m=
e.graphic;if(r(e.plotY)&&null!==e.y){w=e.shapeArgs;if(m)m[l.pointCount<c?"animate":"attr"](h(w));else e.graphic=m=b[e.shapeType](w).add(e.group||a.group);f.borderRadius&&m.attr({r:f.borderRadius});m.attr(a.pointAttribs(e,e.selected&&"select")).shadow(f.shadow,null,f.stacking&&!f.borderRadius);m.addClass(e.getClassName(),!0)}else m&&(e.graphic=m.destroy())})},animate:function(a){var e=this,f=this.yAxis,b=e.options,c=this.chart.inverted,h={},q=c?"translateX":"translateY",m;z&&(a?(h.scaleY=.001,a=Math.min(f.pos+
f.len,Math.max(f.pos,f.toPixels(b.threshold))),c?h.translateX=a-f.len:h.translateY=a,e.group.attr(h)):(m=e.group.attr(q),e.group.animate({scaleY:1},C(E(e.options.animation),{step:function(a,b){h[q]=m+b.pos*(f.pos-m);e.group.attr(h)}})),e.animate=null))},remove:function(){var a=this,l=a.chart;l.hasRendered&&F(l.series,function(e){e.type===a.type&&(e.isDirty=!0)});n.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var E=a.Series;
a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
E.prototype.drawGraph.call(this)}})})(L);(function(a){var E=a.deg2rad,D=a.isNumber,F=a.pick,C=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,h=this.chart,p=2*(a.slicedOffset||0),n=h.plotWidth-2*p,h=h.plotHeight-2*p,u=a.center,u=[F(u[0],"50%"),F(u[1],"50%"),a.size||"100%",a.innerSize||0],z=Math.min(n,h),e,l;for(e=0;4>e;++e)l=u[e],a=2>e||2===e&&/%$/.test(l),u[e]=C(l,[n,h,z,u[2]][e])+(a?p:0);u[3]>u[2]&&(u[3]=u[2]);return u},getStartAndEndRadians:function(a,h){a=D(a)?
a:0;h=D(h)&&h>a&&360>h-a?h:a+360;return{start:E*(a+-90),end:E*(h+-90)}}}})(L);(function(a){var E=a.addEvent,D=a.CenteredSeriesMixin,F=a.defined,C=a.each,r=a.extend,h=D.getStartAndEndRadians,p=a.inArray,n=a.noop,u=a.pick,z=a.Point,e=a.Series,l=a.seriesType,f=a.setAnimation;l("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,
showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=this,e=b.points,f=b.startAngleRad;a||(C(e,function(a){var c=a.graphic,e=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:f,end:f}),c.animate({r:e.r,
start:e.start,end:e.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,c=0,e=this.points,f=e.length,m,l=this.options.ignoreHiddenPoint;for(a=0;a<f;a++)m=e[a],c+=l&&!m.visible?0:m.isNull?0:m.y;this.total=c;for(a=0;a<f;a++)m=e[a],m.percentage=0<c&&(m.visible||!l)?m.y/c*100:0,m.total=c},generatePoints:function(){e.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,e=this.options,f=e.slicedOffset,m=f+(e.borderWidth||0),
l,n,B,p=h(e.startAngle,e.endAngle),k=this.startAngleRad=p.start,p=(this.endAngleRad=p.end)-k,A=this.points,r,x=e.dataLabels.distance,e=e.ignoreHiddenPoint,d,t=A.length,G;a||(this.center=a=this.getCenter());this.getX=function(d,b,c){B=Math.asin(Math.min((d-a[1])/(a[2]/2+c.labelDistance),1));return a[0]+(b?-1:1)*Math.cos(B)*(a[2]/2+c.labelDistance)};for(d=0;d<t;d++){G=A[d];G.labelDistance=u(G.options.dataLabels&&G.options.dataLabels.distance,x);this.maxLabelDistance=Math.max(this.maxLabelDistance||
0,G.labelDistance);l=k+b*p;if(!e||G.visible)b+=G.percentage/100;n=k+b*p;G.shapeType="arc";G.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*l)/1E3,end:Math.round(1E3*n)/1E3};B=(n+l)/2;B>1.5*Math.PI?B-=2*Math.PI:B<-Math.PI/2&&(B+=2*Math.PI);G.slicedTranslation={translateX:Math.round(Math.cos(B)*f),translateY:Math.round(Math.sin(B)*f)};n=Math.cos(B)*a[2]/2;r=Math.sin(B)*a[2]/2;G.tooltipPos=[a[0]+.7*n,a[1]+.7*r];G.half=B<-Math.PI/2||B>Math.PI/2?1:0;G.angle=B;l=Math.min(m,G.labelDistance/
5);G.labelPos=[a[0]+n+Math.cos(B)*G.labelDistance,a[1]+r+Math.sin(B)*G.labelDistance,a[0]+n+Math.cos(B)*l,a[1]+r+Math.sin(B)*l,a[0]+n,a[1]+r,0>G.labelDistance?"center":G.half?"right":"left",B]}},drawGraph:null,drawPoints:function(){var a=this,c=a.chart.renderer,e,f,m,l,h=a.options.shadow;h&&!a.shadowGroup&&(a.shadowGroup=c.g("shadow").add(a.group));C(a.points,function(b){f=b.graphic;if(b.isNull)f&&(b.graphic=f.destroy());else{l=b.shapeArgs;e=b.getTranslate();var q=b.shadowGroup;h&&!q&&(q=b.shadowGroup=
c.g("shadow").add(a.shadowGroup));q&&q.attr(e);m=a.pointAttribs(b,b.selected&&"select");f?f.setRadialReference(a.center).attr(m).animate(r(l,e)):(b.graphic=f=c[b.shapeType](l).setRadialReference(a.center).attr(e).add(a.group),b.visible||f.attr({visibility:"hidden"}),f.attr(m).attr({"stroke-linejoin":"round"}).shadow(h,q));f.addClass(b.getClassName())}})},searchPoint:n,sortByAngle:function(a,c){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*c})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,
getCenter:D.getCenter,getSymbol:n},{init:function(){z.prototype.init.apply(this,arguments);var a=this,c;a.name=u(a.name,"Slice");c=function(b){a.slice("select"===b.type)};E(a,"select",c);E(a,"unselect",c);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,c){var b=this,e=b.series,m=e.chart,f=e.options.ignoreHiddenPoint;c=u(c,f);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,e.options.data[p(b,e.data)]=b.options,C(["graphic","dataLabel",
"connector","shadowGroup"],function(c){if(b[c])b[c][a?"show":"hide"](!0)}),b.legendItem&&m.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),f&&(e.isDirty=!0),c&&m.redraw())},slice:function(a,c,e){var b=this.series;f(e,b.chart);u(c,!0);this.sliced=this.options.sliced=F(a)?a:!this.sliced;b.options.data[p(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:
{translateX:0,translateY:0}},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}})})(L);(function(a){var E=a.addEvent,D=a.arrayMax,F=a.defined,C=a.each,r=a.extend,h=a.format,p=a.map,n=a.merge,u=a.noop,z=a.pick,e=a.relativeLength,l=a.Series,f=a.seriesTypes,b=a.stableSort;a.distribute=function(a,e){function c(a,b){return a.target-b.target}var m,f=!0,l=a,h=[],n;n=
0;for(m=a.length;m--;)n+=a[m].size;if(n>e){b(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=m=0;n<=e;)n+=a[m].size,m++;h=a.splice(m-1,a.length)}b(a,c);for(a=p(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(m=a.length;m--;)f=a[m],n=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,n-f.size/2),e-f.size);m=a.length;for(f=!1;m--;)0<m&&a[m-1].pos+a[m-1].size>a[m].pos&&(a[m-1].size+=a[m].size,a[m-1].targets=a[m-1].targets.concat(a[m].targets),a[m-
1].pos+a[m-1].size>e&&(a[m-1].pos=e-a[m-1].size),a.splice(m,1),f=!0)}m=0;C(a,function(a){var b=0;C(a.targets,function(){l[m].pos=a.pos+b;b+=l[m].size;m++})});l.push.apply(l,h);b(l,c)};l.prototype.drawDataLabels=function(){var b=this,e=b.options,f=e.dataLabels,m=b.points,l,p,B=b.hasRendered||0,u,k,A=z(f.defer,!!e.animation),r=b.chart.renderer;if(f.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(f),k=b.plotGroup("dataLabelsGroup","data-labels",A&&!B?"hidden":"visible",f.zIndex||6),
A&&(k.attr({opacity:+B}),B||E(b,"afterAnimate",function(){b.visible&&k.show(!0);k[e.animation?"animate":"attr"]({opacity:1},{duration:200})})),p=f,C(m,function(c){var d,m=c.dataLabel,x,g,q=c.connector,A=!m,v;l=c.dlOptions||c.options&&c.options.dataLabels;if(d=z(l&&l.enabled,p.enabled)&&!c.isNull)f=n(p,l),x=c.getLabelConfig(),v=f[c.formatPrefix+"Format"]||f.format,u=F(v)?h(v,x):f.formatter.call(x,f),v=f.style,x=f.rotation,v.color=z(f.color,v.color,b.color,"#000000"),"contrast"===v.color&&(c.contrastColor=
r.getContrast(c.color||b.color),v.color=f.inside||0>z(c.labelDistance,f.distance)||e.stacking?c.contrastColor:"#000000"),e.cursor&&(v.cursor=e.cursor),g={fill:f.backgroundColor,stroke:f.borderColor,"stroke-width":f.borderWidth,r:f.borderRadius||0,rotation:x,padding:f.padding,zIndex:1},a.objectEach(g,function(a,b){void 0===a&&delete g[b]});!m||d&&F(u)?d&&F(u)&&(m?g.text=u:(m=c.dataLabel=r[x?"text":"label"](u,0,-9999,f.shape,null,null,f.useHTML,null,"data-label"),m.addClass("highcharts-data-label-color-"+
c.colorIndex+" "+(f.className||"")+(f.useHTML?"highcharts-tracker":""))),m.attr(g),m.css(v).shadow(f.shadow),m.added||m.add(k),b.alignDataLabel(c,m,f,null,A)):(c.dataLabel=m=m.destroy(),q&&(c.connector=q.destroy()))})};l.prototype.alignDataLabel=function(a,b,e,m,f){var c=this.chart,l=c.inverted,h=z(a.plotX,-9999),k=z(a.plotY,-9999),q=b.getBBox(),n,x=e.rotation,d=e.align,t=this.visible&&(a.series.forceDL||c.isInsidePlot(h,Math.round(k),l)||m&&c.isInsidePlot(h,l?m.x+1:m.y+m.height-1,l)),v="justify"===
z(e.overflow,"justify");if(t&&(n=e.style.fontSize,n=c.renderer.fontMetrics(n,b).b,m=r({x:l?this.yAxis.len-k:h,y:Math.round(l?this.xAxis.len-h:k),width:0,height:0},m),r(e,{width:q.width,height:q.height}),x?(v=!1,h=c.renderer.rotCorr(n,x),h={x:m.x+e.x+m.width/2+h.x,y:m.y+e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*m.height},b[f?"attr":"animate"](h).attr({align:d}),k=(x+720)%360,k=180<k&&360>k,"left"===d?h.y-=k?q.height:0:"center"===d?(h.x-=q.width/2,h.y-=q.height/2):"right"===d&&(h.x-=q.width,h.y-=
k?0:q.height)):(b.align(e,null,m),h=b.alignAttr),v?a.isLabelJustified=this.justifyDataLabel(b,e,h,q,m,f):z(e.crop,!0)&&(t=c.isInsidePlot(h.x,h.y)&&c.isInsidePlot(h.x+q.width,h.y+q.height)),e.shape&&!x))b[f?"attr":"animate"]({anchorX:l?c.plotWidth-a.plotY:a.plotX,anchorY:l?c.plotHeight-a.plotX:a.plotY});t||(b.attr({y:-9999}),b.placed=!1)};l.prototype.justifyDataLabel=function(a,b,e,m,f,l){var c=this.chart,h=b.align,k=b.verticalAlign,q,n,x=a.box?0:a.padding||0;q=e.x+x;0>q&&("right"===h?b.align="left":
b.x=-q,n=!0);q=e.x+m.width-x;q>c.plotWidth&&("left"===h?b.align="right":b.x=c.plotWidth-q,n=!0);q=e.y+x;0>q&&("bottom"===k?b.verticalAlign="top":b.y=-q,n=!0);q=e.y+m.height-x;q>c.plotHeight&&("top"===k?b.verticalAlign="bottom":b.y=c.plotHeight-q,n=!0);n&&(a.placed=!l,a.align(b,null,f));return n};f.pie&&(f.pie.prototype.drawDataLabels=function(){var b=this,e=b.data,f,m=b.chart,h=b.options.dataLabels,n=z(h.connectorPadding,10),B=z(h.connectorWidth,1),p=m.plotWidth,k=m.plotHeight,A,u=b.center,x=u[2]/
2,d=u[1],t,G,g,y,r=[[],[]],M,O,E,R,I=[0,0,0,0];b.visible&&(h.enabled||b._hasPointLabels)&&(C(e,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),l.prototype.drawDataLabels.apply(b),C(e,function(a){a.dataLabel&&a.visible&&(r[a.half].push(a),a.dataLabel._pos=null)}),C(r,function(c,e){var l,q,v=c.length,A=[],B;if(v)for(b.sortByAngle(c,e-.5),0<b.maxLabelDistance&&(l=Math.max(0,d-x-b.maxLabelDistance),
q=Math.min(d+x+b.maxLabelDistance,m.plotHeight),C(c,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,d-x-a.labelDistance),a.bottom=Math.min(d+x+a.labelDistance,m.plotHeight),B=a.dataLabel.getBBox().height||21,a.positionsIndex=A.push({target:a.labelPos[1]-a.top+B/2,size:B,rank:a.y})-1)}),a.distribute(A,q+B-l)),R=0;R<v;R++)f=c[R],q=f.positionsIndex,g=f.labelPos,t=f.dataLabel,E=!1===f.visible?"hidden":"inherit",O=l=g[1],A&&F(A[q])&&(void 0===A[q].pos?E="hidden":(y=A[q].size,O=f.top+A[q].pos)),
delete f.positionIndex,M=h.justify?u[0]+(e?-1:1)*(x+f.labelDistance):b.getX(O<f.top+2||O>f.bottom-2?l:O,e,f),t._attr={visibility:E,align:g[6]},t._pos={x:M+h.x+({left:n,right:-n}[g[6]]||0),y:O+h.y-10},g.x=M,g.y=O,z(h.crop,!0)&&(G=t.getBBox().width,l=null,M-G<n?(l=Math.round(G-M+n),I[3]=Math.max(l,I[3])):M+G>p-n&&(l=Math.round(M+G-p+n),I[1]=Math.max(l,I[1])),0>O-y/2?I[0]=Math.max(Math.round(-O+y/2),I[0]):O+y/2>k&&(I[2]=Math.max(Math.round(O+y/2-k),I[2])),t.sideOverflow=l)}),0===D(I)||this.verifyDataLabelOverflow(I))&&
(this.placeDataLabels(),B&&C(this.points,function(a){var d;A=a.connector;if((t=a.dataLabel)&&t._pos&&a.visible&&0<a.labelDistance){E=t._attr.visibility;if(d=!A)a.connector=A=m.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup),A.attr({"stroke-width":B,stroke:h.connectorColor||a.color||"#666666"});A[d?"attr":"animate"]({d:b.connectorPath(a.labelPos)});A.attr("visibility",E)}else A&&(a.connector=A.destroy())}))},f.pie.prototype.connectorPath=
function(a){var b=a.x,c=a.y;return z(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},f.pie.prototype.placeDataLabels=function(){C(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?
"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},f.pie.prototype.alignDataLabel=u,f.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,m=c.center,f=c.minSize||80,l,h=null!==c.size;h||(null!==m[0]?l=Math.max(b[2]-Math.max(a[1],a[3]),f):(l=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2),null!==m[1]?l=Math.max(Math.min(l,b[2]-Math.max(a[0],a[2])),f):(l=Math.max(Math.min(l,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2),l<b[2]?(b[2]=l,b[3]=Math.min(e(c.innerSize||
0,l),l),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):h=!0);return h});f.column&&(f.column.prototype.alignDataLabel=function(a,b,e,m,f){var c=this.chart.inverted,h=a.series,q=a.dlBox||a.shapeArgs,k=z(a.below,a.plotY>z(this.translatedThreshold,h.yAxis.len)),v=z(e.inside,!!this.options.stacking);q&&(m=n(q),0>m.y&&(m.height+=m.y,m.y=0),q=m.y+m.height-h.yAxis.len,0<q&&(m.height-=q),c&&(m={x:h.yAxis.len-m.y-m.height,y:h.xAxis.len-m.x-m.width,width:m.height,height:m.width}),v||(c?(m.x+=
k?0:m.width,m.width=0):(m.y+=k?m.height:0,m.height=0)));e.align=z(e.align,!c||v?"center":k?"right":"left");e.verticalAlign=z(e.verticalAlign,c||v?"middle":k?"top":"bottom");l.prototype.alignDataLabel.call(this,a,b,e,m,f);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(L);(function(a){var E=a.Chart,D=a.each,F=a.objectEach,C=a.pick,r=a.addEvent;E.prototype.callbacks.push(function(a){r(a,"render",function(){var h=[];D(a.labelCollectors||[],function(a){h=h.concat(a())});
D(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&F(a.stacks,function(a){F(a,function(a){h.push(a.label)})})});D(a.series||[],function(a){var n=a.options.dataLabels,p=a.dataLabelCollections||["dataLabel"];(n.enabled||a._hasPointLabels)&&!n.allowOverlap&&a.visible&&D(p,function(e){D(a.points,function(a){a[e]&&(a[e].labelrank=C(a.labelrank,a.shapeArgs&&a.shapeArgs.height),h.push(a[e]))})})});a.hideOverlappingLabels(h)})});E.prototype.hideOverlappingLabels=function(a){var h=
a.length,n,u,r,e,l,f,b,c,w,q=function(a,b,c,e,f,k,l,h){return!(f>a+c||f+l<a||k>b+e||k+h<b)};for(u=0;u<h;u++)if(n=a[u])n.oldOpacity=n.opacity,n.newOpacity=1,n.width||(r=n.getBBox(),n.width=r.width,n.height=r.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(u=0;u<h;u++)for(r=a[u],n=u+1;n<h;++n)if(e=a[n],r&&e&&r!==e&&r.placed&&e.placed&&0!==r.newOpacity&&0!==e.newOpacity&&(l=r.alignAttr,f=e.alignAttr,b=r.parentGroup,c=e.parentGroup,w=2*(r.box?0:r.padding||0),l=q(l.x+b.translateX,
l.y+b.translateY,r.width-w,r.height-w,f.x+c.translateX,f.y+c.translateY,e.width-w,e.height-w)))(r.labelrank<e.labelrank?r:e).newOpacity=0;D(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(L);(function(a){var E=a.addEvent,D=a.Chart,F=a.createElement,C=a.css,r=a.defaultOptions,h=a.defaultPlotOptions,p=a.each,n=a.extend,u=a.fireEvent,z=a.hasTouch,e=a.inArray,
l=a.isObject,f=a.Legend,b=a.merge,c=a.pick,w=a.Point,q=a.Series,m=a.seriesTypes,v=a.svg,H;H=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};p(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(p(a.trackerGroups,function(k){if(a[k]){a[k].addClass("highcharts-tracker").on("mouseover",
c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(z)a[k].on("touchstart",c);a.options.cursor&&a[k].css(C).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,e=[].concat(c?a.areaPath:a.graphPath),f=e.length,m=a.chart,d=m.pointer,l=m.renderer,h=m.options.tooltip.snap,g=a.tracker,q,n=function(){if(m.hoverSeries!==a)a.onMouseOver()},w="rgba(192,192,192,"+(v?.0001:.002)+")";if(f&&!c)for(q=f+1;q--;)"M"===e[q]&&e.splice(q+1,0,e[q+
1]-h,e[q+2],"L"),(q&&"M"===e[q]||q===f)&&e.splice(q,0,"L",e[q-2]+h,e[q-1]);g?g.attr({d:e}):a.graph&&(a.tracker=l.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:w,fill:c?w:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*h),zIndex:2}).add(a.group),p([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",n).on("mouseout",function(a){d.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(z)a.on("touchstart",n)}))}};m.column&&
(m.column.prototype.drawTracker=H.drawTrackerPoint);m.pie&&(m.pie.prototype.drawTracker=H.drawTrackerPoint);m.scatter&&(m.scatter.prototype.drawTracker=H.drawTrackerPoint);n(f.prototype,{setItemEvents:function(a,c,k){var e=this,f=e.chart.renderer.boxWrapper,m="highcharts-legend-"+(a.series?"point":"series")+"-active";(k?c:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(m);c.css(e.options.itemHoverStyle)}).on("mouseout",function(){c.css(b(a.visible?e.itemStyle:e.itemHiddenStyle));
f.removeClass(m);a.setState()}).on("click",function(b){var d=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,d):u(a,"legendItemClick",b,d)})},createCheckboxForItem:function(a){a.checkbox=F("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);E(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});
r.legend.itemStyle.cursor="pointer";n(D.prototype,{showResetZoom:function(){var a=this,b=r.lang,c=a.options.chart.resetZoomButton,e=c.theme,f=e.states,m="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},e,f&&f.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,m)},zoomOut:function(){var a=this;u(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,
k=this.pointer,e=!1,f;!a||a.resetSelection?(p(this.axes,function(a){b=a.zoom()}),k.initiated=!1):p(a.xAxis.concat(a.yAxis),function(a){var d=a.axis;k[d.isXAxis?"zoomX":"zoomY"]&&(b=d.zoom(a.min,a.max),d.displayBtn&&(e=!0))});f=this.resetZoomButton;e&&!f?this.showResetZoom():!e&&l(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(c(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,e=c.hoverPoints,f;e&&p(e,function(a){a.setState()});p("xy"===b?[1,0]:
[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,k=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",e=c[d],g=(b.pointRange||0)/2,m=b.getExtremes(),l=b.toValue(e-k,!0)+g,g=b.toValue(e+b.len-k,!0)-g,h=g<l,e=h?g:l,l=h?l:g,g=Math.min(m.dataMin,b.toValue(b.toPixels(m.min)-b.minPixelPadding)),h=Math.max(m.dataMax,b.toValue(b.toPixels(m.max)+b.minPixelPadding)),q;q=g-e;0<q&&(l+=q,e=g);q=l-h;0<q&&(l=h,e-=q);b.series.length&&e!==m.min&&l!==m.max&&(b.setExtremes(e,l,!1,!1,{trigger:"pan"}),f=!0);
c[d]=k});f&&c.redraw(!1);C(c.container,{cursor:"move"})}});n(w.prototype,{select:function(a,b){var k=this,f=k.series,m=f.chart;a=c(a,!k.selected);k.firePointEvent(a?"select":"unselect",{accumulate:b},function(){k.selected=k.options.selected=a;f.options.data[e(k,f.data)]=k.options;k.setState(a&&"select");b||p(m.getSelectedPoints(),function(a){a.selected&&a!==k&&(a.selected=a.options.selected=!1,f.options.data[e(a,f.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=
this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");p(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var c=this,e=b(c.series.options.point,c.options).events;c.events=e;a.objectEach(e,function(a,b){E(c,b,a)});this.hasImportedEvents=!0}},setState:function(a,b){var k=Math.floor(this.plotX),
e=this.plotY,f=this.series,m=f.options.states[a]||{},d=h[f.type].marker&&f.options.marker,l=d&&!1===d.enabled,q=d&&d.states&&d.states[a]||{},g=!1===q.enabled,y=f.stateMarkerGraphic,v=this.marker||{},p=f.chart,w=f.halo,r,u=d&&f.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===m.enabled||a&&(g||l&&!1===q.enabled)||a&&v.states&&v.states[a]&&!1===v.states[a].enabled)){u&&(r=f.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+
this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(f.pointAttribs(this,a),c(p.options.chart.animation,m.animation)),r&&this.graphic.animate(r,c(p.options.chart.animation,q.animation,d.animation)),y&&y.hide();else{if(a&&q){d=v.symbol||f.symbol;y&&y.currentSymbol!==d&&(y=y.destroy());if(y)y[b?"animate":"attr"]({x:r.x,y:r.y});else d&&(f.stateMarkerGraphic=y=p.renderer.symbol(d,r.x,r.y,r.width,r.height).add(f.markerGroup),y.currentSymbol=d);y&&y.attr(f.pointAttribs(this,
a))}y&&(y[a&&p.isInsidePlot(k,e,p.inverted)?"show":"hide"](),y.element.point=this)}(k=m.halo)&&k.size?(w||(f.halo=w=p.renderer.path().add((this.graphic||y).parentGroup)),w[b?"animate":"attr"]({d:this.haloPath(k.size)}),w.attr({"class":"highcharts-halo highcharts-color-"+c(this.colorIndex,f.colorIndex)}),w.point=this,w.attr(n({fill:this.color||f.color,"fill-opacity":k.opacity,zIndex:-1},k.attributes))):w&&w.point&&w.point.haloPath&&w.animate({d:w.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});n(q.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,e=b.hoverPoint;b.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
k=b.options,e=b.graph,f=k.states,m=k.lineWidth,k=0;a=a||"";if(b.state!==a&&(p([b.group,b.markerGroup,b.dataLabelsGroup],function(d){d&&(b.state&&d.removeClass("highcharts-series-"+b.state),a&&d.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(m=f[a].lineWidth||m+(f[a].lineWidthPlus||0)),e&&!e.dashstyle))for(m={"stroke-width":m},e.animate(m,c(b.chart.options.chart.animation,f[a]&&f[a].animation));b["zone-graph-"+k];)b["zone-graph-"+k].attr(m),k+=1},setVisible:function(a,
b){var c=this,e=c.chart,f=c.legendItem,m,d=e.options.chart.ignoreHiddenSeries,l=c.visible;m=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!l:a)?"show":"hide";p(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][m]()});if(e.hoverSeries===c||(e.hoverPoint&&e.hoverPoint.series)===c)c.onMouseOut();f&&e.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&p(e.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});p(c.linkedSeries,function(b){b.setVisible(a,
!1)});d&&(e.isDirtyBox=!0);!1!==b&&e.redraw();u(c,m)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect")},drawTracker:H.drawTrackerGraph})})(L);(function(a){var E=a.Chart,D=a.each,F=a.inArray,C=a.isArray,r=a.isObject,h=a.pick,p=a.splat;E.prototype.setResponsive=function(h){var n=this.options.responsive,p=[],e=this.currentResponsive;n&&n.rules&&
D(n.rules,function(e){void 0===e._id&&(e._id=a.uniqueKey());this.matchResponsiveRule(e,p,h)},this);var l=a.merge.apply(0,a.map(p,function(e){return a.find(n.rules,function(a){return a._id===e}).chartOptions})),p=p.toString()||void 0;p!==(e&&e.ruleIds)&&(e&&this.update(e.undoOptions,h),p?(this.currentResponsive={ruleIds:p,mergedOptions:l,undoOptions:this.currentOptions(l)},this.update(l,h)):this.currentResponsive=void 0)};E.prototype.matchResponsiveRule=function(a,p){var n=a.condition;(n.callback||
function(){return this.chartWidth<=h(n.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=h(n.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=h(n.minWidth,0)&&this.chartHeight>=h(n.minHeight,0)}).call(this)&&p.push(a._id)};E.prototype.currentOptions=function(h){function n(e,l,f,b){var c;a.objectEach(e,function(a,h){if(!b&&-1<F(h,["series","xAxis","yAxis"]))for(e[h]=p(e[h]),f[h]=[],c=0;c<e[h].length;c++)l[h][c]&&(f[h][c]={},n(a[c],l[h][c],f[h][c],b+1));else r(a)?(f[h]=C(a)?[]:{},n(a,l[h]||{},f[h],b+1)):f[h]=
l[h]||null})}var z={};n(h,this.options,z,0);return z}})(L);(function(a){var E=a.addEvent,D=a.Axis,F=a.Chart,C=a.css,r=a.dateFormat,h=a.defined,p=a.each,n=a.extend,u=a.noop,z=a.pick,e=a.timeUnits,l=a.wrap;l(a.Series.prototype,"init",function(a){var b;a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&E(this,"updatedData",function(){delete b.ordinalIndex})});l(D.prototype,"getTimeTicks",function(a,b,c,l,q,m,n,p){var f=0,v,k,w={},u,x,d,t=[],G=-Number.MAX_VALUE,g=
this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||!m||3>m.length||void 0===c)return a.call(this,b,c,l,q);x=m.length;for(v=0;v<x;v++){d=v&&m[v-1]>l;m[v]<c&&(f=v);if(v===x-1||m[v+1]-m[v]>5*n||d){if(m[v]>G){for(k=a.call(this,b,m[f],m[v],q);k.length&&k[0]<=G;)k.shift();k.length&&(G=k[k.length-1]);t=t.concat(k)}f=v+1}if(d)break}a=k.info;if(p&&a.unitRange<=e.hour){v=t.length-1;for(f=1;f<v;f++)r("%d",t[f])!==r("%d",t[f-1])&&(w[t[f]]="day",u=!0);u&&(w[t[0]]="day");a.higherRanks=
w}t.info=a;if(p&&h(g)){p=a=t.length;v=[];var y;for(u=[];p--;)f=this.translate(t[p]),y&&(u[p]=y-f),v[p]=y=f;u.sort();u=u[Math.floor(u.length/2)];u<.6*g&&(u=null);p=t[a-1]>l?a-1:a;for(y=void 0;p--;)f=v[p],l=Math.abs(y-f),y&&l<.8*g&&(null===u||l<.8*u)?(w[t[p]]&&!w[t[p+1]]?(l=p+1,y=f):l=p,t.splice(l,1)):y=f}return t});n(D.prototype,{beforeSetTickPositions:function(){var a,b=[],c=!1,e,l=this.getExtremes(),m=l.min,n=l.max,r,u=this.isXAxis&&!!this.options.breaks,l=this.options.ordinal,C=Number.MAX_SAFE_INTEGER,
k=this.chart.options.chart.ignoreHiddenSeries;e="highcharts-navigator-xaxis"===this.options.className;!this.options.overscroll||this.max!==this.dataMax||this.chart.mouseIsDown&&!e||this.eventArgs&&(!this.eventArgs||"navigator"===this.eventArgs.trigger)||(this.max+=this.options.overscroll,!e&&h(this.userMin)&&(this.min+=this.options.overscroll));if(l||u){p(this.series,function(c,e){if(!(k&&!1===c.visible||!1===c.takeOrdinalPosition&&!u)&&(b=b.concat(c.processedXData),a=b.length,b.sort(function(a,b){return a-
b}),C=Math.min(C,z(c.closestPointRange,C)),a))for(e=a-1;e--;)b[e]===b[e+1]&&b.splice(e,1)});a=b.length;if(2<a){e=b[1]-b[0];for(r=a-1;r--&&!c;)b[r+1]-b[r]!==e&&(c=!0);!this.options.keepOrdinalPadding&&(b[0]-m>e||n-b[b.length-1]>e)&&(c=!0)}else this.options.overscroll&&(2===a?C=b[1]-b[0]:1===a?(C=this.options.overscroll,b=[b[0],b[0]+C]):C=this.overscrollPointsRange);c?(this.options.overscroll&&(this.overscrollPointsRange=C,b=b.concat(this.getOverscrollPositions())),this.ordinalPositions=b,e=this.ordinal2lin(Math.max(m,
b[0]),!0),r=Math.max(this.ordinal2lin(Math.min(n,b[b.length-1]),!0),1),this.ordinalSlope=n=(n-m)/(r-e),this.ordinalOffset=m-e*n):(this.overscrollPointsRange=z(this.closestPointRange,this.overscrollPointsRange),this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0)}this.isOrdinal=l&&c;this.groupIntervalFactor=null},val2lin:function(a,b){var c=this.ordinalPositions;if(c){var e=c.length,f,m;for(f=e;f--;)if(c[f]===a){m=f;break}for(f=e-1;f--;)if(a>c[f]||0===f){a=(a-c[f])/(c[f+1]-c[f]);m=f+
a;break}b=b?m:this.ordinalSlope*(m||0)+this.ordinalOffset}else b=a;return b},lin2val:function(a,b){var c=this.ordinalPositions;if(c){var e=this.ordinalSlope,f=this.ordinalOffset,m=c.length-1,l;if(b)0>a?a=c[0]:a>m?a=c[m]:(m=Math.floor(a),l=a-m);else for(;m--;)if(b=e*m+f,a>=b){e=e*(m+1)+f;l=(a-b)/(e-b);break}return void 0!==l&&void 0!==c[m]?c[m]+(l?l*(c[m+1]-c[m]):0):a}return a},getExtendedPositions:function(){var a=this,b=a.chart,c=a.series[0].currentDataGrouping,e=a.ordinalIndex,l=c?c.count+c.unitName:
"raw",m=a.options.overscroll,h=a.getExtremes(),n,r;e||(e=a.ordinalIndex={});e[l]||(n={series:[],chart:b,getExtremes:function(){return{min:h.dataMin,max:h.dataMax+m}},options:{ordinal:!0},val2lin:D.prototype.val2lin,ordinal2lin:D.prototype.ordinal2lin},p(a.series,function(e){r={xAxis:n,xData:e.xData.slice(),chart:b,destroyGroupedData:u};r.xData=r.xData.concat(a.getOverscrollPositions());r.options={dataGrouping:c?{enabled:!0,forced:!0,approximation:"open",units:[[c.unitName,[c.count]]]}:{enabled:!1}};
e.processData.apply(r);n.series.push(r)}),a.beforeSetTickPositions.apply(n),e[l]=n.ordinalPositions);return e[l]},getOverscrollPositions:function(){var e=this.options.overscroll,b=this.overscrollPointsRange,c=[],l=this.dataMax;if(a.defined(b))for(c.push(l);l<=this.dataMax+e;)l+=b,c.push(l);return c},getGroupIntervalFactor:function(a,b,c){var e;c=c.processedXData;var f=c.length,m=[];e=this.groupIntervalFactor;if(!e){for(e=0;e<f-1;e++)m[e]=c[e+1]-c[e];m.sort(function(a,b){return a-b});m=m[Math.floor(f/
2)];a=Math.max(a,c[0]);b=Math.min(b,c[f-1]);this.groupIntervalFactor=e=f*m/(b-a)}return e},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?this.closestPointRange:a/(b/this.closestPointRange):a}});D.prototype.ordinal2lin=D.prototype.val2lin;l(F.prototype,"pan",function(a,b){var c=this.xAxis[0],e=c.options.overscroll,f=b.chartX,m=!1;if(c.options.ordinal&&c.series.length){var l=this.mouseDownX,h=c.getExtremes(),n=h.dataMax,r=h.min,k=h.max,A=this.hoverPoints,u=
c.closestPointRange||c.overscrollPointsRange,l=(l-f)/(c.translationSlope*(c.ordinalSlope||u)),x={ordinalPositions:c.getExtendedPositions()},u=c.lin2val,d=c.val2lin,t;x.ordinalPositions?1<Math.abs(l)&&(A&&p(A,function(a){a.setState()}),0>l?(A=x,t=c.ordinalPositions?c:x):(A=c.ordinalPositions?c:x,t=x),x=t.ordinalPositions,n>x[x.length-1]&&x.push(n),this.fixedRange=k-r,l=c.toFixedRange(null,null,u.apply(A,[d.apply(A,[r,!0])+l,!0]),u.apply(t,[d.apply(t,[k,!0])+l,!0])),l.min>=Math.min(h.dataMin,r)&&l.max<=
Math.max(n,k)+e&&c.setExtremes(l.min,l.max,!0,!1,{trigger:"pan"}),this.mouseDownX=f,C(this.container,{cursor:"move"})):m=!0}else m=!0;m&&(e&&(c.max=c.dataMax+e),a.apply(this,Array.prototype.slice.call(arguments,1)))})})(L);(function(a){function E(){return Array.prototype.slice.call(arguments,1)}function D(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,F(this.pointArrayMap,["y"]))}var F=a.pick,C=a.wrap,r=a.each,h=a.extend,p=a.isArray,n=a.fireEvent,u=a.Axis,z=a.Series;
h(u.prototype,{isInBreak:function(a,l){var e=a.repeat||Infinity,b=a.from,c=a.to-a.from;l=l>=b?(l-b)%e:e-(b-l)%e;return a.inclusive?l<=c:l<c&&0!==l},isInAnyBreak:function(a,l){var e=this.options.breaks,b=e&&e.length,c,h,n;if(b){for(;b--;)this.isInBreak(e[b],a)&&(c=!0,h||(h=F(e[b].showPoints,this.isXAxis?!1:!0)));n=c&&l?c&&!h:c}return n}});C(u.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var e=this.tickPositions,f=this.tickPositions.info,
b=[],c;for(c=0;c<e.length;c++)this.isInAnyBreak(e[c])||b.push(e[c]);this.tickPositions=b;this.tickPositions.info=f}});C(u.prototype,"init",function(a,l,f){var b=this;f.breaks&&f.breaks.length&&(f.ordinal=!1);a.call(this,l,f);a=this.options.breaks;b.isBroken=p(a)&&!!a.length;b.isBroken&&(b.val2lin=function(a){var c=a,e,m;for(m=0;m<b.breakArray.length;m++)if(e=b.breakArray[m],e.to<=a)c-=e.len;else if(e.from>=a)break;else if(b.isInBreak(e,a)){c-=a-e.from;break}return c},b.lin2val=function(a){var c,e;
for(e=0;e<b.breakArray.length&&!(c=b.breakArray[e],c.from>=a);e++)c.to<a?a+=c.len:b.isInBreak(c,a)&&(a+=c.len);return a},b.setExtremes=function(a,b,e,m,f){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;u.prototype.setExtremes.call(this,a,b,e,m,f)},b.setAxisTranslation=function(a){u.prototype.setAxisTranslation.call(this,a);a=b.options.breaks;var c=[],e=[],m=0,f,l,h=b.userMin||b.min,p=b.userMax||b.max,k=F(b.pointRangePadding,0),A,z;r(a,function(a){l=
a.repeat||Infinity;b.isInBreak(a,h)&&(h+=a.to%l-h%l);b.isInBreak(a,p)&&(p-=p%l-a.from%l)});r(a,function(a){A=a.from;for(l=a.repeat||Infinity;A-l>h;)A-=l;for(;A<h;)A+=l;for(z=A;z<p;z+=l)c.push({value:z,move:"in"}),c.push({value:z+(a.to-a.from),move:"out",size:a.breakSize})});c.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});f=0;A=h;r(c,function(a){f+="in"===a.move?1:-1;1===f&&"in"===a.move&&(A=a.value);0===f&&(e.push({from:A,to:a.value,len:a.value-
A-(a.size||0)}),m+=a.value-A-(a.size||0))});b.breakArray=e;b.unitLength=p-h-m+k;n(b,"afterBreaks");b.options.staticScale?b.transA=b.options.staticScale:b.unitLength&&(b.transA*=(p-b.min+k)/b.unitLength);k&&(b.minPixelPadding=b.transA*b.minPointOffset);b.min=h;b.max=p})});C(z.prototype,"generatePoints",function(a){a.apply(this,E(arguments));var e=this.xAxis,f=this.yAxis,b=this.points,c,h=b.length,n=this.options.connectNulls,m;if(e&&f&&(e.options.breaks||f.options.breaks))for(;h--;)c=b[h],m=null===
c.y&&!1===n,m||!e.isInAnyBreak(c.x,!0)&&!f.isInAnyBreak(c.y,!0)||(b.splice(h,1),this.data[h]&&this.data[h].destroyElements())});a.Series.prototype.drawBreaks=function(a,l){var e=this,b=e.points,c,h,p,m;a&&r(l,function(f){c=a.breakArray||[];h=a.isXAxis?a.min:F(e.options.threshold,a.min);r(b,function(b){m=F(b["stack"+f.toUpperCase()],b[f]);r(c,function(c){p=!1;if(h<c.from&&m>c.to||h>c.from&&m<c.from)p="pointBreak";else if(h<c.from&&m>c.from&&m<c.to||h>c.from&&m>c.to&&m<c.from)p="pointInBreak";p&&n(a,
p,{point:b,brk:c})})})})};a.Series.prototype.gappedPath=function(){var e=this.options.gapSize,l=this.points.slice(),f=l.length-1,b=this.yAxis,c;if(e&&0<f)for("value"!==this.options.gapUnit&&(e*=this.closestPointRange);f--;)l[f+1].x-l[f].x>e&&(c=(l[f].x+l[f+1].x)/2,l.splice(f+1,0,{isNull:!0,x:c}),this.options.stacking&&(c=b.stacks[this.stackKey][c]=new a.StackItem(b,b.options.stackLabels,!1,c,this.stack),c.total=0));return this.getGraphPath(l)};C(a.seriesTypes.column.prototype,"drawPoints",D);C(a.Series.prototype,
"drawPoints",D)})(L);(function(a){var E=a.arrayMax,D=a.arrayMin,F=a.Axis,C=a.defaultPlotOptions,r=a.defined,h=a.each,p=a.extend,n=a.format,u=a.isNumber,z=a.merge,e=a.pick,l=a.Point,f=a.Tooltip,b=a.wrap,c=a.Series.prototype,w=c.processData,q=c.generatePoints,m=c.destroy,v={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M",
"%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},H={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",
groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},B=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],K=a.approximations={sum:function(a){var b=a.length,c;if(!b&&a.hasNulls)c=null;else if(b)for(c=0;b--;)c+=a[b];return c},average:function(a){var b=a.length;a=K.sum(a);u(a)&&b&&(a/=b);return a},averages:function(){var a=
[];h(arguments,function(b){a.push(K.average(b))});return a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?E(a):a.hasNulls?null:void 0},low:function(a){return a.length?D(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,c,e){a=K.open(a);b=K.high(b);c=K.low(c);e=K.close(e);if(u(a)||u(b)||u(c)||u(e))return[a,b,c,e]},range:function(a,b){a=K.low(a);b=K.high(b);if(u(a)||u(b))return[a,b];if(null===
a&&null===b)return null}};c.groupData=function(a,b,c,e){var d=this.data,k=this.options.data,m=[],g=[],f=[],l=a.length,n,p,q=!!b,x=[];e="function"===typeof e?e:K[e]||H[this.type]&&K[H[this.type].approximation]||K[v.approximation];var r=this.pointArrayMap,A=r&&r.length,w=0;p=0;var z,B;A?h(r,function(){x.push([])}):x.push([]);z=A||1;for(B=0;B<=l&&!(a[B]>=c[0]);B++);for(B;B<=l;B++){for(;void 0!==c[w+1]&&a[B]>=c[w+1]||B===l;){n=c[w];this.dataGroupInfo={start:p,length:x[0].length};p=e.apply(this,x);void 0!==
p&&(m.push(n),g.push(p),f.push(this.dataGroupInfo));p=B;for(n=0;n<z;n++)x[n].length=0,x[n].hasNulls=!1;w+=1;if(B===l)break}if(B===l)break;if(r){n=this.cropStart+B;var J=d&&d[n]||this.pointClass.prototype.applyOptions.apply({series:this},[k[n]]),C;for(n=0;n<A;n++)C=J[r[n]],u(C)?x[n].push(C):null===C&&(x[n].hasNulls=!0)}else n=q?b[B]:null,u(n)?x[0].push(n):null===n&&(x[0].hasNulls=!0)}return[m,g,f]};c.processData=function(){var a=this.chart,b=this.options.dataGrouping,m=!1!==this.allowDG&&b&&e(b.enabled,
a.options.isStock),f=this.visible||!a.options.chart.ignoreHiddenSeries,d;this.forceCrop=m;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==w.apply(this,arguments)&&m){this.destroyGroupedData();var l=this.processedXData,h=this.processedYData,g=a.plotSizeX,a=this.xAxis,n=a.options.ordinal,p=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(p){this.isDirty=d=!0;this.points=null;var q=a.getExtremes(),m=q.min,q=q.max,n=n&&a.getGroupIntervalFactor(m,q,this)||1,g=p*(q-m)/g*n,p=a.getTimeTicks(a.normalizeTimeTickInterval(g,
b.units||B),Math.min(m,l[0]),Math.max(q,l[l.length-1]),a.options.startOfWeek,l,this.closestPointRange),l=c.groupData.apply(this,[l,h,p,b.approximation]),h=l[0],n=l[1];if(b.smoothed&&h.length){b=h.length-1;for(h[b]=Math.min(h[b],q);b--&&0<b;)h[b]+=g/2;h[0]=Math.max(h[0],m)}this.currentDataGrouping=p.info;this.closestPointRange=p.info.totalRange;this.groupMap=l[2];r(h[0])&&h[0]<a.dataMin&&f&&(a.min===a.dataMin&&(a.min=h[0]),a.dataMin=h[0]);this.processedXData=h;this.processedYData=n}else this.currentDataGrouping=
this.groupMap=null;this.hasGroupedData=d}};c.destroyGroupedData=function(){var a=this.groupedData;h(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};c.generatePoints=function(){q.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};b(l.prototype,"update",function(b){this.dataGroup?a.error(24):b.apply(this,[].slice.call(arguments,1))});b(f.prototype,"tooltipFooterHeaderFormatter",function(b,c,e){var k=c.series,d=k.tooltipOptions,
m=k.options.dataGrouping,f=d.xDateFormat,g,l=k.xAxis,h=a.dateFormat;return l&&"datetime"===l.options.type&&m&&u(c.key)?(b=k.currentDataGrouping,m=m.dateTimeLabelFormats,b?(l=m[b.unitName],1===b.count?f=l[0]:(f=l[1],g=l[2])):!f&&m&&(f=this.getXDateFormat(c,d,l)),f=h(f,c.key),g&&(f+=h(g,c.key+b.totalRange-1)),n(d[(e?"footer":"header")+"Format"],{point:p(c.point,{key:f}),series:k})):b.call(this,c,e)});c.destroy=function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();m.apply(this)};
b(c,"setOptions",function(a,b){a=a.call(this,b);var c=this.type,e=this.chart.options.plotOptions,d=C[c].dataGrouping;H[c]&&(d||(d=z(v,H[c])),a.dataGrouping=z(d,e.series&&e.series.dataGrouping,e[c].dataGrouping,b.dataGrouping));this.chart.options.isStock&&(this.requireSorting=!0);return a});b(F.prototype,"setScale",function(a){a.call(this);h(this.series,function(a){a.hasProcessed=!1})});F.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,e=0,d=!1,m;for(c=b;c--;)(m=a[c].options.dataGrouping)&&
(e=Math.max(e,m.groupPixelWidth));for(c=b;c--;)(m=a[c].options.dataGrouping)&&a[c].hasProcessed&&(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/e||b&&m.forced)&&(d=!0);return d?e:0};F.prototype.setDataGrouping=function(a,b){var c;b=e(b,!0);a||(a={forced:!1,units:null});if(this instanceof F)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},!1);else h(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()}})(L);
(function(a){var E=a.each,D=a.Point,F=a.seriesType,C=a.seriesTypes;F("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},threshold:null,states:{hover:{lineWidth:3}},stickyTracking:!0},{directTouch:!1,pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,
a.high,a.low,a.close]},pointValKey:"close",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,h){h=C.column.prototype.pointAttribs.call(this,a,h);var p=this.options;delete h.fill;!a.options.color&&p.upColor&&a.open<a.close&&(h.stroke=p.upColor);return h},translate:function(){var a=this,h=a.yAxis,p=!!a.modifyValue,n=["plotOpen","plotHigh","plotLow","plotClose","yBottom"];C.column.prototype.translate.apply(a);E(a.points,function(r){E([r.open,r.high,r.low,r.close,
r.low],function(u,e){null!==u&&(p&&(u=a.modifyValue(u)),r[n[e]]=h.toPixels(u,!0))});r.tooltipPos[1]=r.plotHigh+h.pos-a.chart.plotTop})},drawPoints:function(){var a=this,h=a.chart;E(a.points,function(p){var n,r,z,e,l=p.graphic,f,b=!l;void 0!==p.plotY&&(l||(p.graphic=l=h.renderer.path().add(a.group)),l.attr(a.pointAttribs(p,p.selected&&"select")),r=l.strokeWidth()%2/2,f=Math.round(p.plotX)-r,z=Math.round(p.shapeArgs.width/2),e=["M",f,Math.round(p.yBottom),"L",f,Math.round(p.plotHigh)],null!==p.open&&
(n=Math.round(p.plotOpen)+r,e.push("M",f,n,"L",f-z,n)),null!==p.close&&(n=Math.round(p.plotClose)+r,e.push("M",f,n,"L",f+z,n)),l[b?"attr":"animate"]({d:e}).addClass(p.getClassName(),!0))})},animate:null},{getClassName:function(){return D.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(L);(function(a){var E=a.defaultPlotOptions,D=a.each,F=a.merge,C=a.seriesType,r=a.seriesTypes;C("candlestick","ohlc",F(E.column,{states:{hover:{lineWidth:2}},
tooltip:E.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(a,p){var h=r.column.prototype.pointAttribs.call(this,a,p),u=this.options,z=a.open<a.close,e=u.lineColor||this.color;h["stroke-width"]=u.lineWidth;h.fill=a.options.color||(z?u.upColor||this.color:this.color);h.stroke=a.lineColor||(z?u.upLineColor||e:e);p&&(a=u.states[p],h.fill=a.color||h.fill,h.stroke=a.lineColor||h.stroke,h["stroke-width"]=a.lineWidth||h["stroke-width"]);
return h},drawPoints:function(){var a=this,p=a.chart;D(a.points,function(h){var n=h.graphic,r,e,l,f,b,c,w,q=!n;void 0!==h.plotY&&(n||(h.graphic=n=p.renderer.path().add(a.group)),n.attr(a.pointAttribs(h,h.selected&&"select")).shadow(a.options.shadow),b=n.strokeWidth()%2/2,c=Math.round(h.plotX)-b,r=h.plotOpen,e=h.plotClose,l=Math.min(r,e),r=Math.max(r,e),w=Math.round(h.shapeArgs.width/2),e=Math.round(l)!==Math.round(h.plotHigh),f=r!==h.yBottom,l=Math.round(l)+b,r=Math.round(r)+b,b=[],b.push("M",c-w,
r,"L",c-w,l,"L",c+w,l,"L",c+w,r,"Z","M",c,l,"L",c,e?Math.round(h.plotHigh):l,"M",c,r,"L",c,f?Math.round(h.yBottom):r),n[q?"attr":"animate"]({d:b}).addClass(h.getClassName(),!0))})}})})(L);aa=function(a){var E=a.each,D=a.seriesTypes,F=a.stableSort;return{translate:function(){D.column.prototype.translate.apply(this);var a=this.options,r=this.chart,h=this.points,p=h.length-1,n,u,z=a.onSeries;n=z&&r.get(z);var a=a.onKey||"y",z=n&&n.options.step,e=n&&n.points,l=e&&e.length,f=this.xAxis,b=this.yAxis,c=
f.getExtremes(),w=0,q,m,v;if(n&&n.visible&&l)for(w=(n.pointXOffset||0)+(n.barW||0)/2,n=n.currentDataGrouping,m=e[l-1].x+(n?n.totalRange:0),F(h,function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);l--&&h[p]&&!(n=h[p],q=e[l],q.x<=n.x&&void 0!==q[a]&&(n.x<=m&&(n.plotY=q[a],q.x<n.x&&!z&&(v=e[l+1])&&void 0!==v[a]&&(n.plotY+=(n.x-q.x)/(v.x-q.x)*(v[a]-q[a]))),p--,l++,0>p)););E(h,function(a,e){var m;void 0===a.plotY&&(a.x>=c.min&&a.x<=c.max?a.plotY=r.chartHeight-f.bottom-(f.opposite?f.height:
0)+f.offset-b.top:a.shapeArgs={});a.plotX+=w;(u=h[e-1])&&u.plotX===a.plotX&&(void 0===u.stackIndex&&(u.stackIndex=0),m=u.stackIndex+1);a.stackIndex=m})}}}(L);(function(a,E){var D=a.addEvent,F=a.each,C=a.merge,r=a.noop,h=a.Renderer,p=a.seriesType,n=a.TrackerMixin,u=a.VMLRenderer,z=a.SVGRenderer.prototype.symbols;p("flags","column",{pointRange:0,shape:"flag",stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",
fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,l){var e=this.options,b=a&&a.color||this.color,c=e.lineColor,h=a&&a.lineWidth;a=a&&a.fillColor||e.fillColor;l&&(a=e.states[l].fillColor,c=e.states[l].lineColor,h=e.states[l].lineWidth);return{fill:a||b,stroke:c||b,"stroke-width":h||e.lineWidth||0}},translate:E.translate,drawPoints:function(){var e=
this.points,l=this.chart,f=l.renderer,b,c,h=this.options,n=h.y,m,p,r,u,z,k,A,J=this.yAxis;for(p=e.length;p--;)r=e[p],A=r.plotX>this.xAxis.len,b=r.plotX,u=r.stackIndex,m=r.options.shape||h.shape,c=r.plotY,void 0!==c&&(c=r.plotY+n-(void 0!==u&&u*h.stackDistance)),z=u?void 0:r.plotX,k=u?void 0:r.plotY,u=r.graphic,void 0!==c&&0<=b&&!A?(u||(u=r.graphic=f.label("",null,null,m,null,null,h.useHTML).attr(this.pointAttribs(r)).css(C(h.style,r.style)).attr({align:"flag"===m?"left":"center",width:h.width,height:h.height,
"text-align":h.textAlign}).addClass("highcharts-point").add(this.markerGroup),r.graphic.div&&(r.graphic.div.point=r),u.shadow(h.shadow)),0<b&&(b-=u.strokeWidth()%2),u.attr({text:r.options.title||h.title||"A",x:b,y:c,anchorX:z,anchorY:k}),r.tooltipPos=l.inverted?[J.len+J.pos-l.plotLeft-c,this.xAxis.len-b]:[b,c+J.pos-l.plotTop]):u&&(r.graphic=u.destroy());h.useHTML&&a.wrap(this.markerGroup,"on",function(b){return a.SVGElement.prototype.on.apply(b.apply(this,[].slice.call(arguments,1)),[].slice.call(arguments,
1))})},drawTracker:function(){var a=this.points;n.drawTrackerPoint.apply(this);F(a,function(e){var f=e.graphic;f&&D(f.element,"mouseover",function(){0<e.stackIndex&&!e.raised&&(e._y=f.y,f.attr({y:e._y-8}),e.raised=!0);F(a,function(a){a!==e&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:r,buildKDTree:r,setClip:r});z.flag=function(a,h,f,b,c){return["M",c&&c.anchorX||a,c&&c.anchorY||h,"L",a,h+b,a,h,a+f,h,a+f,h+b,a,h+b,"Z"]};F(["circle","square"],function(a){z[a+"pin"]=function(e,
f,b,c,h){var l=h&&h.anchorX;h=h&&h.anchorY;"circle"===a&&c>b&&(e-=Math.round((c-b)/2),b=c);e=z[a](e,f,b,c);l&&h&&e.push("M",l,f>h?f:f+c,"L",l,h);return e}});h===u&&F(["flag","circlepin","squarepin"],function(a){u.prototype.symbols[a]=z[a]})})(L,aa);(function(a){function E(a,b,c){this.init(a,b,c)}var D=a.addEvent,F=a.Axis,C=a.correctFloat,r=a.defaultOptions,h=a.defined,p=a.destroyObjectProperties,n=a.each,u=a.fireEvent,z=a.hasTouch,e=a.isTouchDevice,l=a.merge,f=a.pick,b=a.removeEvent,c=a.wrap,w,q=
{height:e?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!e,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",trackBorderWidth:1};r.scrollbar=l(!0,q,r.scrollbar);a.swapXY=w=function(a,b){var c=a.length,e;if(b)for(b=0;b<c;b+=3)e=a[b+1],a[b+1]=
a[b+2],a[b+2]=e;return a};E.prototype={init:function(a,b,c){this.scrollbarButtons=[];this.renderer=a;this.userOptions=b;this.options=l(q,b);this.chart=c;this.size=f(this.options.size,this.options.height);b.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,c=this.size,e;this.group=e=a.g("scrollbar").attr({zIndex:b.zIndex,translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,r:b.trackBorderRadius||
0,height:c,width:c}).add(e);this.track.attr({fill:b.trackBackgroundColor,stroke:b.trackBorderColor,"stroke-width":b.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(e);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:c,width:c,r:b.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=a.path(w(["M",-3,c/4,"L",-3,2*c/3,"M",0,c/4,"L",0,2*c/3,"M",3,c/4,"L",3,2*c/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
this.scrollbar.attr({fill:b.barBackgroundColor,stroke:b.barBorderColor,"stroke-width":b.barBorderWidth});this.scrollbarRifles.attr({stroke:b.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(a,b,c,e){var m=this.options.vertical,k=0,f=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;
this.width=c;this.xOffset=this.height=e;this.yOffset=k;m?(this.width=this.yOffset=c=k=this.size,this.xOffset=b=0,this.barWidth=e-2*c,this.x=a+=this.options.margin):(this.height=this.xOffset=e=b=this.size,this.barWidth=c-2*e,this.y+=this.options.margin);this.group[f]({translateX:a,translateY:this.y});this.track[f]({width:c,height:e});this.scrollbarButtons[1][f]({translateX:m?0:c-b,translateY:m?e-k:0})},drawScrollbarButton:function(a){var b=this.renderer,c=this.scrollbarButtons,e=this.options,f=this.size,
k;k=b.g().add(this.group);c.push(k);k=b.rect().addClass("highcharts-scrollbar-button").add(k);k.attr({stroke:e.buttonBorderColor,"stroke-width":e.buttonBorderWidth,fill:e.buttonBackgroundColor});k.attr(k.crisp({x:-.5,y:-.5,width:f+1,height:f+1,r:e.buttonBorderRadius},k.strokeWidth()));k=b.path(w(["M",f/2+(a?-1:1),f/2-3,"L",f/2+(a?-1:1),f/2+3,"L",f/2+(a?2:-2),f/2],e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);k.attr({fill:e.buttonArrowColor})},setRange:function(a,b){var c=this.options,
e=c.vertical,f=c.minWidth,k=this.barWidth,m,l,n=this.rendered&&!this.hasDragged?"animate":"attr";h(k)&&(a=Math.max(a,0),m=Math.ceil(k*a),this.calculatedWidth=l=C(k*Math.min(b,1)-m),l<f&&(m=(k-f+l)*a,l=f),f=Math.floor(m+this.xOffset+this.yOffset),k=l/2-.5,this.from=a,this.to=b,e?(this.scrollbarGroup[n]({translateY:f}),this.scrollbar[n]({height:l}),this.scrollbarRifles[n]({translateY:k}),this.scrollbarTop=f,this.scrollbarLeft=0):(this.scrollbarGroup[n]({translateX:f}),this.scrollbar[n]({width:l}),this.scrollbarRifles[n]({translateX:k}),
this.scrollbarLeft=f,this.scrollbarTop=0),12>=l?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===c.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var c=a.chart.pointer.normalize(b),e=a.options.vertical?"chartY":"chartX",f=a.initPositions;!a.grabbedCenter||b.touches&&0===b.touches[0][e]||(c=a.cursorToScrollbarPosition(c)[e],e=a[e],e=c-e,a.hasDragged=!0,a.updatePosition(f[0]+e,f[1]+e),a.hasDragged&&
u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);b=a.cursorToScrollbarPosition(b);a.chartX=b.chartX;a.chartY=b.chartY;a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(b){var c=C(a.to-a.from)*a.options.step;
a.updatePosition(C(a.from-c),C(a.to-c));u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var c=(a.to-a.from)*a.options.step;a.updatePosition(a.from+c,a.to+c);u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var c=a.chart.pointer.normalize(b),e=a.to-a.from,f=a.y+a.scrollbarTop,k=a.x+a.scrollbarLeft;a.options.vertical&&c.chartY>f||!a.options.vertical&&c.chartX>k?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-
e,a.to-e);u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,b){1<b&&(a=C(1-C(b-a)),b=1);0>a&&(b=C(b-a),a=0);this.from=a;this.to=b},update:function(a){this.destroy();this.init(this.chart.renderer,l(!0,this.options,a),this.chart)},addEvents:function(){var a=
this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,c=this.scrollbarGroup.element,e=this.mouseDownHandler,f=this.mouseMoveHandler,k=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[c,"mousedown",e],[c.ownerDocument,"mousemove",f],[c.ownerDocument,"mouseup",k]];z&&a.push([c,"touchstart",e],[c.ownerDocument,"touchmove",f],[c.ownerDocument,"touchend",k]);n(a,function(a){D.apply(null,
a)});this._events=a},removeEvents:function(){n(this._events,function(a){b.apply(null,a)});this._events.length=0},destroy:function(){var a=this.chart.scroller;this.removeEvents();n(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&this===a.scrollbar&&(a.scrollbar=null,p(a.scrollbarButtons))}};c(F.prototype,"init",function(a){var b=this;a.apply(b,Array.prototype.slice.call(arguments,1));b.options.scrollbar&&b.options.scrollbar.enabled&&
(b.options.scrollbar.vertical=!b.horiz,b.options.startOnTick=b.options.endOnTick=!1,b.scrollbar=new E(b.chart.renderer,b.options.scrollbar,b.chart),D(b.scrollbar,"changed",function(a){var c=Math.min(f(b.options.min,b.min),b.min,b.dataMin),e=Math.max(f(b.options.max,b.max),b.max,b.dataMax)-c,k;b.horiz&&!b.reversed||!b.horiz&&b.reversed?(k=c+e*this.to,c+=e*this.from):(k=c+e*(1-this.from),c+=e*(1-this.to));b.setExtremes(c,k,!0,!1,a)}))});c(F.prototype,"render",function(a){var b=Math.min(f(this.options.min,
this.min),this.min,f(this.dataMin,this.min)),c=Math.max(f(this.options.max,this.max),this.max,f(this.dataMax,this.max)),e=this.scrollbar,l=this.titleOffset||0;a.apply(this,Array.prototype.slice.call(arguments,1));if(e){this.horiz?(e.position(this.left,this.top+this.height+2+this.chart.scrollbarsOffsets[1]+(this.opposite?0:l+this.axisTitleMargin+this.offset),this.width,this.height),l=1):(e.position(this.left+this.width+2+this.chart.scrollbarsOffsets[0]+(this.opposite?l+this.axisTitleMargin+this.offset:
0),this.top,this.width,this.height),l=0);if(!this.opposite&&!this.horiz||this.opposite&&this.horiz)this.chart.scrollbarsOffsets[l]+=this.scrollbar.size+this.scrollbar.options.margin;isNaN(b)||isNaN(c)||!h(this.min)||!h(this.max)?e.setRange(0,0):(l=(this.min-b)/(c-b),b=(this.max-b)/(c-b),this.horiz&&!this.reversed||!this.horiz&&this.reversed?e.setRange(l,b):e.setRange(1-b,1-l))}});c(F.prototype,"getOffset",function(a){var b=this.horiz?2:1,c=this.scrollbar;a.apply(this,Array.prototype.slice.call(arguments,
1));c&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[b]+=c.size+c.options.margin)});c(F.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());a.apply(this,Array.prototype.slice.call(arguments,1))});a.Scrollbar=E})(L);(function(a){function E(a){this.init(a)}var D=a.addEvent,F=a.Axis,C=a.Chart,r=a.color,h=a.defaultOptions,p=a.defined,n=a.destroyObjectProperties,u=a.each,z=a.erase,e=a.error,l=a.extend,f=a.grep,b=a.hasTouch,c=a.isArray,w=a.isNumber,q=a.isObject,
m=a.merge,v=a.pick,H=a.removeEvent,B=a.Scrollbar,K=a.Series,k=a.seriesTypes,A=a.wrap,J=[].concat(a.defaultDataGroupingUnits),x=function(a){var b=f(arguments,w);if(b.length)return Math[a].apply(0,b)};J[4]=["day",[1,2,3,4]];J[5]=["week",[1,2,3]];k=void 0===k.areaspline?"line":"areaspline";l(h,{navigator:{height:40,margin:25,maskInside:!0,handles:{width:7,height:15,symbols:["navigator-handle","navigator-handle"],enabled:!0,lineWidth:1,backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:r("#6685c2").setOpacity(.3).get(),
outlineColor:"#cccccc",outlineWidth:1,series:{type:k,fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:J},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,threshold:null},xAxis:{overscroll:0,className:"highcharts-navigator-xaxis",tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",
style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});a.Renderer.prototype.symbols["navigator-handle"]=function(a,b,c,e,f){a=f.width/2;b=Math.round(a/3)+.5;f=f.height;return["M",-a-1,.5,"L",a,.5,"L",a,f+.5,"L",-a-1,f+.5,"L",-a-1,.5,"M",-b,4,"L",-b,f-3,"M",b-1,4,"L",b-1,f-3]};E.prototype={drawHandle:function(a,
b,c,e){var d=this.navigatorOptions.handles.height;this.handles[b][e](c?{translateX:Math.round(this.left+this.height/2),translateY:Math.round(this.top+parseInt(a,10)+.5-d)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-d/2-1)})},drawOutline:function(a,b,c,e){var d=this.navigatorOptions.maskInside,g=this.outline.strokeWidth(),f=g/2,g=g%2/2,k=this.outlineHeight,h=this.scrollbarHeight,l=this.size,m=this.left-h,t=this.top;c?(m-=f,c=t+b+g,b=t+a+g,a=["M",m+
k,t-h-g,"L",m+k,c,"L",m,c,"L",m,b,"L",m+k,b,"L",m+k,t+l+h].concat(d?["M",m+k,c-f,"L",m+k,b+f]:[])):(a+=m+h-g,b+=m+h-g,t+=f,a=["M",m,t,"L",a,t,"L",a,t+k,"L",b,t+k,"L",b,t,"L",m+l+2*h,t].concat(d?["M",a-f,t,"L",b+f,t]:[]));this.outline[e]({d:a})},drawMasks:function(a,b,c,e){var d=this.left,g=this.top,f=this.height,k,h,l,m;c?(l=[d,d,d],m=[g,g+a,g+b],h=[f,f,f],k=[a,b-a,this.size-b]):(l=[d,d+a,d+b],m=[g,g,g],h=[a,b-a,this.size-b],k=[f,f,f]);u(this.shades,function(a,b){a[e]({x:l[b],y:m[b],width:h[b],height:k[b]})})},
renderElements:function(){var a=this,b=a.navigatorOptions,c=b.maskInside,e=a.chart,f=e.inverted,k=e.renderer,h;a.navigatorGroup=h=k.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();var l={cursor:f?"ns-resize":"ew-resize"};u([!c,c,!c],function(d,c){a.shades[c]=k.rect().addClass("highcharts-navigator-mask"+(1===c?"-inside":"-outside")).attr({fill:d?b.maskFill:"rgba(0,0,0,0)"}).css(1===c&&l).add(h)});a.outline=k.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,
stroke:b.outlineColor}).add(h);b.handles.enabled&&u([0,1],function(d){b.handles.inverted=e.inverted;a.handles[d]=k.symbol(b.handles.symbols[d],-b.handles.width/2-1,0,b.handles.width,b.handles.height,b.handles);a.handles[d].attr({zIndex:7-d}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][d]).add(h);var c=b.handles;a.handles[d].attr({fill:c.backgroundColor,stroke:c.borderColor,"stroke-width":c.lineWidth}).css(l)})},update:function(a){u(this.series||[],function(a){a.baseSeries&&
delete a.baseSeries.navigatorSeries});this.destroy();m(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(b,c,e,g){var d=this.chart,f,k,h=this.scrollbarHeight,l,m=this.xAxis;f=m.fake?d.xAxis[0]:m;var t=this.navigatorEnabled,n,q=this.rendered;k=d.inverted;var r,x=d.xAxis[0].minRange,u=d.xAxis[0].options.maxRange;if(!this.hasDragged||p(e)){if(!w(b)||!w(c))if(q)e=0,g=m.width;else return;this.left=v(m.left,d.plotLeft+h+(k?d.plotWidth:0));this.size=n=l=v(m.len,(k?d.plotHeight:
d.plotWidth)-2*h);d=k?h:l+2*h;e=v(e,m.toPixels(b,!0));g=v(g,m.toPixels(c,!0));w(e)&&Infinity!==Math.abs(e)||(e=0,g=d);b=m.toValue(e,!0);c=m.toValue(g,!0);r=Math.abs(a.correctFloat(c-b));r<x?this.grabbedLeft?e=m.toPixels(c-x,!0):this.grabbedRight&&(g=m.toPixels(b+x,!0)):p(u)&&r>u&&(this.grabbedLeft?e=m.toPixels(c-u,!0):this.grabbedRight&&(g=m.toPixels(b+u,!0)));this.zoomedMax=Math.min(Math.max(e,g,0),n);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(e,g),0),
n);this.range=this.zoomedMax-this.zoomedMin;n=Math.round(this.zoomedMax);e=Math.round(this.zoomedMin);t&&(this.navigatorGroup.attr({visibility:"visible"}),q=q&&!this.hasDragged?"animate":"attr",this.drawMasks(e,n,k,q),this.drawOutline(e,n,k,q),this.navigatorOptions.handles.enabled&&(this.drawHandle(e,0,k,q),this.drawHandle(n,1,k,q)));this.scrollbar&&(k?(k=this.top-h,f=this.left-h+(t||!f.opposite?0:(f.titleOffset||0)+f.axisTitleMargin),h=l+2*h):(k=this.top+(t?this.height:-h),f=this.left-h),this.scrollbar.position(f,
k,d,h),this.scrollbar.setRange(this.zoomedMin/l,this.zoomedMax/l));this.rendered=!0}},addMouseEvents:function(){var a=this,c=a.chart,e=c.container,g=[],f,k;a.mouseMoveHandler=f=function(b){a.onMouseMove(b)};a.mouseUpHandler=k=function(b){a.onMouseUp(b)};g=a.getPartsEvents("mousedown");g.push(D(e,"mousemove",f),D(e.ownerDocument,"mouseup",k));b&&(g.push(D(e,"touchmove",f),D(e.ownerDocument,"touchend",k)),g.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=g;a.series&&a.series[0]&&g.push(D(a.series[0].xAxis,
"foundExtremes",function(){c.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,d=[];u(["shades","handles"],function(c){u(b[c],function(e,g){d.push(D(e.element,a,function(a){b[c+"Mousedown"](a,g)}))})});return d},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);var d=this.chart,c=this.xAxis,e=this.zoomedMin,f=this.left,k=this.size,h=this.range,l=a.chartX,m;d.inverted&&(l=a.chartY,f=this.top);1===b?(this.grabbedCenter=l,this.fixedWidth=h,this.dragOffset=
l-e):(a=l-f-h/2,0===b?a=Math.max(0,a):2===b&&a+h>=k&&(a=k-h,m=this.getUnionExtremes().dataMax),a!==e&&(this.fixedWidth=h,b=c.toFixedRange(a,a+h,null,m),d.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var d=a.xAxis[0],c=a.inverted&&!d.reversed||!a.inverted&&d.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=c?d.min:d.max):(this.grabbedRight=
!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=c?d.max:d.min);a.fixedRange=null},onMouseMove:function(a){var b=this,d=b.chart,c=b.left,e=b.navigatorSize,f=b.range,k=b.dragOffset,h=d.inverted;a.touches&&0===a.touches[0].pageX||(a=d.pointer.normalize(a),d=a.chartX,h&&(c=b.top,d=a.chartY),b.grabbedLeft?(b.hasDragged=!0,b.render(0,0,d-c,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=!0,b.render(0,0,b.otherHandlePos,d-c)):b.grabbedCenter&&(b.hasDragged=!0,d<k?d=k:d>e+k-f&&(d=e+k-f),b.render(0,
0,d-k,d-k+f)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,d=this.xAxis,c=this.scrollbar,e,f,k=a.DOMEvent||a;(!this.hasDragged||c&&c.hasDragged)&&"scrollbar"!==a.trigger||(this.zoomedMin===this.otherHandlePos?e=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(f=this.fixedExtreme),this.zoomedMax===this.size&&(f=this.getUnionExtremes().dataMax),d=d.toFixedRange(this.zoomedMin,this.zoomedMax,
e,f),p(d.min)&&b.xAxis[0].setExtremes(Math.min(d.min,d.max),Math.max(d.min,d.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:k}));"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(u(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=
this.baseSeries||[];this.navigatorEnabled&&a[0]&&(!1!==this.navigatorOptions.adaptToUpdatedData&&u(a,function(a){H(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&H(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,c=b.navigator,d=c.enabled,e=b.scrollbar,f=e.enabled,b=d?c.height:0,k=f?e.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=k;this.scrollbarEnabled=f;this.navigatorEnabled=d;this.navigatorOptions=
c;this.scrollbarOptions=e;this.outlineHeight=b+k;this.opposite=v(c.opposite,!d&&a.inverted);var h=this,e=h.baseSeries,f=a.xAxis.length,l=a.yAxis.length,n=e&&e[0]&&e[0].xAxis||a.xAxis[0];a.extraMargin={type:h.opposite?"plotTop":"marginBottom",value:(d||!a.inverted?h.outlineHeight:0)+c.margin};a.inverted&&(a.extraMargin.type=h.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;h.navigatorEnabled?(h.xAxis=new F(a,m({breaks:n.options.breaks,ordinal:n.options.ordinal},c.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",
isX:!0,type:"datetime",index:f,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[k,0,-k,0],width:b}:{offsets:[0,-k,0,k],height:b})),h.yAxis=new F(a,m(c.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:l,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),e||c.series.data?h.updateNavigatorSeries():0===a.series.length&&A(a,"redraw",function(b,c){0<a.series.length&&!h.series&&(h.setBaseSeries(),a.redraw=b);b.call(a,c)}),h.renderElements(),
h.addMouseEvents()):h.xAxis={translate:function(b,c){var d=a.xAxis[0],e=d.getExtremes(),g=d.len-2*k,f=x("min",d.options.min,e.dataMin),d=x("max",d.options.max,e.dataMax)-f;return c?b*d/g+f:g*(b-f)/d},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:F.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=h.scrollbar=new B(a.renderer,m(a.options.scrollbar,{margin:h.navigatorEnabled?0:10,vertical:a.inverted}),a),D(h.scrollbar,
"changed",function(b){var c=h.size,d=c*this.to,c=c*this.from;h.hasDragged=h.scrollbar.hasDragged;h.render(0,0,c,d);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType)&&setTimeout(function(){h.onMouseUp(b)})}));h.addBaseSeriesEvents();h.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;a&&null===b.dataMin||(f={dataMin:v(d&&d.min,x("min",e.min,b.dataMin,c.dataMin,c.min)),dataMax:v(d&&d.max,x("max",e.max,b.dataMax,c.dataMax,c.max))});
return f},setBaseSeries:function(a,b){var c=this.chart,d=this.baseSeries=[];a=a||c.options&&c.options.navigator.baseSeries||0;u(c.series||[],function(b,c){b.options.isInternal||!b.options.showInNavigator&&(c!==a&&b.options.id!==a||!1===b.options.showInNavigator)||d.push(b)});this.xAxis&&!this.xAxis.fake&&this.updateNavigatorSeries(b)},updateNavigatorSeries:function(b){var d=this,e=d.chart,g=d.baseSeries,f,k,n=d.navigatorOptions.series,p,q={enableMouseTracking:!1,index:null,linkedTo:null,group:"nav",
padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0},r=d.series=a.grep(d.series||[],function(b){var c=b.baseSeries;return 0>a.inArray(c,g)?(c&&(H(c,"updatedData",d.updatedDataHandler),delete c.navigatorSeries),b.destroy(),!1):!0});g&&g.length&&u(g,function(a){var t=a.navigatorSeries,x=l({color:a.color},c(n)?h.navigator.series:n);t&&!1===d.navigatorOptions.adaptToUpdatedData||(q.name="Navigator "+g.length,f=a.options||{},p=f.navigatorOptions||
{},k=m(f,q,x,p),x=p.data||x.data,d.hasNavigatorData=d.hasNavigatorData||!!x,k.data=x||f.data&&f.data.slice(0),t&&t.options?t.update(k,b):(a.navigatorSeries=e.initSeries(k),a.navigatorSeries.baseSeries=a,r.push(a.navigatorSeries)))});if(n.data&&(!g||!g.length)||c(n))d.hasNavigatorData=!1,n=a.splat(n),u(n,function(a,b){q.name="Navigator "+(r.length+1);k=m(h.navigator.series,{color:e.series[b]&&!e.series[b].options.isInternal&&e.series[b].color||e.options.colors[b]||e.options.colors[0]},q,a);k.data=
a.data;k.data&&(d.hasNavigatorData=!0,r.push(e.initSeries(k)))});this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&D(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);u(b,function(b){D(b,"show",function(){this.navigatorSeries&&this.navigatorSeries.show()});D(b,"hide",function(){this.navigatorSeries&&this.navigatorSeries.hide()});!1!==this.navigatorOptions.adaptToUpdatedData&&b.xAxis&&D(b,"updatedData",this.updatedDataHandler);D(b,"remove",
function(){this.navigatorSeries&&(z(a.series,this.navigatorSeries),this.navigatorSeries.remove(!1),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,e=b.dataMax,b=b.max-b.min,f=a.stickToMin,k=a.stickToMax,h=this.options.overscroll,l,m,n=a.series&&
a.series[0],p=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(f&&(m=c,l=m+b),k&&(l=e+h,f||(m=Math.max(l-b,n&&n.xData?n.xData[0]:-Number.MAX_VALUE))),p&&(f||k)&&w(m)&&(this.min=this.userMin=m,this.max=this.userMax=l));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMax=Math.round(a.zoomedMax)>=Math.round(a.size);a.stickToMin=w(this.xAxis.min)&&this.xAxis.min<=this.xData[0]&&(!this.chart.fixedRange||
!a.stickToMax);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){D(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&(z(this.chart.xAxis,this.xAxis),z(this.chart.axes,this.xAxis));this.yAxis&&(z(this.chart.yAxis,this.yAxis),z(this.chart.axes,this.yAxis));
u(this.series||[],function(a){a.destroy&&a.destroy()});u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);u([this.handles],function(a){n(a)},this)}};a.Navigator=E;A(F.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,k=e.navigator,e=e.rangeSelector,h;this.isXAxis&&(k&&k.enabled||e&&e.enabled)&&("x"===f?d.resetZoomButton=
"blocked":"y"===f?h=!1:"xy"===f&&(d=this.previousZoom,p(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==h?h:a.call(this,b,c)});A(C.prototype,"init",function(a,b,c){D(this,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new E(this)});a.call(this,b,c)});A(C.prototype,"setChartSize",function(a){var b=this.legend,c=this.navigator,d,e,f,k;a.apply(this,[].slice.call(arguments,1));
c&&(e=b&&b.options,f=c.xAxis,k=c.yAxis,d=c.scrollbarHeight,this.inverted?(c.left=c.opposite?this.chartWidth-d-c.height:this.spacing[3]+d,c.top=this.plotTop+d):(c.left=this.plotLeft+d,c.top=c.navigatorOptions.top||this.chartHeight-c.height-d-this.spacing[2]-(this.rangeSelector&&this.extraBottomMargin?this.rangeSelector.getHeight():0)-(e&&"bottom"===e.verticalAlign&&e.enabled&&!e.floating?b.legendHeight+v(e.margin,10):0)),f&&k&&(this.inverted?f.options.left=k.options.left=c.left:f.options.top=k.options.top=
c.top,f.setAxisSize(),k.setAxisSize()))});A(K.prototype,"addPoint",function(a,b,c,g,f){var d=this.options.turboThreshold;d&&this.xData.length>d&&q(b,!0)&&this.chart.navigator&&e(20,!0);a.call(this,b,c,g,f)});A(C.prototype,"addSeries",function(a,b,c,e){a=a.call(this,b,!1,e);this.navigator&&this.navigator.setBaseSeries(null,!1);v(c,!0)&&this.redraw();return a});A(K.prototype,"update",function(a,b,c){a.call(this,b,!1);this.chart.navigator&&!this.options.isInternal&&this.chart.navigator.setBaseSeries(null,
!1);v(c,!0)&&this.chart.redraw()});C.prototype.callbacks.push(function(a){var b=a.navigator;b&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(L);(function(a){function E(a){this.init(a)}var D=a.addEvent,F=a.Axis,C=a.Chart,r=a.css,h=a.createElement,p=a.dateFormat,n=a.defaultOptions,u=n.global.useUTC,z=a.defined,e=a.destroyObjectProperties,l=a.discardElement,f=a.each,b=a.extend,c=a.fireEvent,w=a.Date,q=a.isNumber,m=a.merge,v=a.pick,H=a.pInt,B=a.splat,K=a.wrap;b(n,{rangeSelector:{verticalAlign:"top",
buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},floating:!1,x:0,y:0,height:void 0,inputPosition:{align:"right",x:0,y:0},buttonPosition:{align:"left",x:0,y:0},labelStyle:{color:"#666666"}}});n.lang=m(n.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});E.prototype={clickButton:function(a,b){var c=this,e=c.chart,d=c.buttonOptions[a],k=e.xAxis[0],h=e.scroller&&e.scroller.getUnionExtremes()||k||{},g=h.dataMin,l=h.dataMax,m,n=k&&Math.round(Math.min(k.max,
v(l,k.max))),p=d.type,r,h=d._range,w,A,z,C=d.dataGrouping;if(null!==g&&null!==l){e.fixedRange=h;C&&(this.forcedDataGrouping=!0,F.prototype.setDataGrouping.call(k||{chart:this.chart},C,!1));if("month"===p||"year"===p)k?(p={range:d,max:n,dataMin:g,dataMax:l},m=k.minFromRange.call(p),q(p.newMax)&&(n=p.newMax)):h=d;else if(h)m=Math.max(n-h,g),n=Math.min(m+h,l);else if("ytd"===p)if(k)void 0===l&&(g=Number.MAX_VALUE,l=Number.MIN_VALUE,f(e.series,function(a){a=a.xData;g=Math.min(a[0],g);l=Math.max(a[a.length-
1],l)}),b=!1),n=c.getYTDExtremes(l,g,u),m=w=n.min,n=n.max;else{D(e,"beforeRender",function(){c.clickButton(a)});return}else"all"===p&&k&&(m=g,n=l);m+=d._offsetMin;n+=d._offsetMax;c.setSelected(a);k?k.setExtremes(m,n,v(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:d}):(r=B(e.options.xAxis)[0],z=r.range,r.range=h,A=r.min,r.min=w,D(e,"load",function(){r.range=z;r.min=A}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},
{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,e=a.options.rangeSelector,k=e.buttons||[].concat(b.defaultButtons),d=e.selected,h=function(){var a=b.minInput,d=b.maxInput;a&&a.blur&&c(a,"blur");d&&d.blur&&c(d,"blur")};b.chart=a;b.options=e;b.buttons=[];a.extraTopMargin=e.height;b.buttonOptions=k;this.unMouseDown=D(a.container,"mousedown",h);this.unResize=D(a,"resize",h);f(k,
b.computeButtonRange);void 0!==d&&k[d]&&this.clickButton(d,!1);D(a,"load",function(){D(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&b.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this.chart,b=a.xAxis[0],c=Math.round(b.max-b.min),e=!b.hasVisibleSeries,a=a.scroller&&a.scroller.getUnionExtremes()||b,d=a.dataMin,h=a.dataMax,a=this.getYTDExtremes(h,d,u),l=a.min,g=a.max,m=
this.selected,n=q(m),p=this.options.allButtonsEnabled,r=this.buttons;f(this.buttonOptions,function(a,f){var k=a._range,t=a.type,q=a.count||1,x=r[f],u=0;a=a._offsetMax-a._offsetMin;f=f===m;var y=k>h-d,v=k<b.minRange,w=!1,A=!1,k=k===c;("month"===t||"year"===t)&&c>=864E5*{month:28,year:365}[t]*q+a&&c<=864E5*{month:31,year:366}[t]*q+a?k=!0:"ytd"===t?(k=g-l+a===c,w=!f):"all"===t&&(k=b.max-b.min>=h-d,A=!f&&n&&k);t=!p&&(y||v||A||e);q=f&&k||k&&!n&&!w;t?u=3:q&&(n=!0,u=2);x.state!==u&&x.setState(u)})},computeButtonRange:function(a){var b=
a.type,c=a.count||1,e={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(e[b])a._range=e[b]*c;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*c;a._offsetMin=v(a.offsetMin,0);a._offsetMax=v(a.offsetMax,0);a._range+=a._offsetMax-a._offsetMin},setInputValue:function(a,b){var c=this.chart.options.rangeSelector,e=this[a+"Input"];z(b)&&(e.previousValue=e.HCTime,e.HCTime=b);e.value=p(c.inputEditDateFormat||"%Y-%m-%d",e.HCTime);this[a+"DateBox"].attr({text:p(c.inputDateFormat||
"%b %e, %Y",e.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];r(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},hideInput:function(a){r(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function c(){var a=v.value,b=(l.inputDateParser||Date.parse)(a),c=f.xAxis[0],d=f.scroller&&f.scroller.xAxis?f.scroller.xAxis:c,g=d.dataMin,d=d.dataMax;
b!==v.previousValue&&(v.previousValue=b,q(b)||(b=a.split("-"),b=Date.UTC(H(b[0]),H(b[1])-1,H(b[2]))),q(b)&&(u||(b+=6E4*(new Date).getTimezoneOffset()),p?b>e.maxInput.HCTime?b=void 0:b<g&&(b=g):b<e.minInput.HCTime?b=void 0:b>d&&(b=d),void 0!==b&&c.setExtremes(p?b:c.min,p?c.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var e=this,f=e.chart,d=f.renderer.style||{},k=f.renderer,l=f.options.rangeSelector,g=e.div,p="min"===a,v,w,z=this.inputGroup;this[a+"Label"]=w=k.label(n.lang[p?"rangeSelectorFrom":
"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(z);z.offset+=w.width+5;this[a+"DateBox"]=k=k.label("",z.offset).addClass("highcharts-range-input").attr({padding:2,width:l.inputBoxWidth||90,height:l.inputBoxHeight||17,stroke:l.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){e.showInput(a);e[a+"Input"].focus()}).add(z);z.offset+=k.width+(p?10:0);this[a+"Input"]=v=h("input",{name:a,className:"highcharts-range-selector",
type:"text"},{top:f.plotTop+"px"},g);w.css(m(d,l.labelStyle));k.css(m({color:"#333333"},d,l.inputStyle));r(v,b({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:d.fontSize,fontFamily:d.fontFamily,left:"-9em"},l.inputStyle));v.onfocus=function(){e.showInput(a)};v.onblur=function(){e.hideInput(a)};v.onchange=c;v.onkeypress=function(a){13===a.keyCode&&c()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a="top"===b.verticalAlign?a.plotTop-
a.axisOffset[0]:0;return{buttonTop:a+b.buttonPosition.y,inputTop:a+b.inputPosition.y-10}},getYTDExtremes:function(a,b,c){var e=new w(a),d=e[w.hcGetFullYear]();c=c?w.UTC(d,0,1):+new w(d,0,1);b=Math.max(b||0,c);e=e.getTime();return{max:Math.min(a||e,e),min:b}},render:function(a,b){var c=this,e=c.chart,d=e.renderer,k=e.container,l=e.options,g=l.exporting&&!1!==l.exporting.enabled&&l.navigation&&l.navigation.buttonOptions,m=n.lang,p=c.div,q=l.rangeSelector,l=q.floating,r=c.buttons,p=c.inputGroup,u=q.buttonTheme,
w=q.buttonPosition,z=q.inputPosition,A=q.inputEnabled,B=u&&u.states,C=e.plotLeft,D,E=c.buttonGroup,F;F=c.rendered;var H=c.options.verticalAlign,K=e.legend,L=K&&K.options,Z=w.y,X=z.y,Q=F||!1,T=0,U=0,V;if(!1!==q.enabled){F||(c.group=F=d.g("range-selector-group").attr({zIndex:7}).add(),c.buttonGroup=E=d.g("range-selector-buttons").add(F),c.zoomText=d.text(m.rangeSelectorZoom,v(C+w.x,C),15).css(q.labelStyle).add(E),D=v(C+w.x,C)+c.zoomText.getBBox().width+5,f(c.buttonOptions,function(a,b){r[b]=d.button(a.text,
D,0,function(){var d=a.events&&a.events.click,e;d&&(e=d.call(a));!1!==e&&c.clickButton(b);c.isActive=!0},u,B&&B.hover,B&&B.select,B&&B.disabled).attr({"text-align":"center"}).add(E);D+=r[b].width+v(q.buttonSpacing,5)}),!1!==A&&(c.div=p=h("div",null,{position:"relative",height:0,zIndex:1}),k.parentNode.insertBefore(p,k),c.inputGroup=p=d.g("input-group").add(F),p.offset=0,c.drawInput("min"),c.drawInput("max")));C=e.plotLeft-e.spacing[3];c.updateButtonStates();g&&this.titleCollision(e)&&"top"===H&&"right"===
w.align&&w.y+E.getBBox().height-12<(g.y||0)+g.height&&(T=-40);"left"===w.align?V=w.x-e.spacing[3]:"right"===w.align&&(V=w.x+T-e.spacing[1]);E.align({y:w.y,width:E.getBBox().width,align:w.align,x:V},!0,e.spacingBox);c.group.placed=Q;c.buttonGroup.placed=Q;!1!==A&&(T=g&&this.titleCollision(e)&&"top"===H&&"right"===z.align&&z.y-p.getBBox().height-12<(g.y||0)+g.height+e.spacing[0]?-40:0,"left"===z.align?V=C:"right"===z.align&&(V=-Math.max(e.axisOffset[1],-T)),p.align({y:z.y,width:p.getBBox().width,align:z.align,
x:z.x+V-2},!0,e.spacingBox),k=p.alignAttr.translateX+p.alignOptions.x-T+p.getBBox().x+2,g=p.alignOptions.width,m=E.alignAttr.translateX+E.getBBox().x,V=E.getBBox().width+20,(z.align===w.align||m+V>k&&k+g>m&&Z<X+p.getBBox().height)&&p.attr({translateX:p.alignAttr.translateX+(e.axisOffset[1]>=-T?0:-T),translateY:p.alignAttr.translateY+E.getBBox().height+10}),c.setInputValue("min",a),c.setInputValue("max",b),c.inputGroup.placed=Q);c.group.align({verticalAlign:H},!0,e.spacingBox);a=c.group.getBBox().height+
20;b=c.group.alignAttr.translateY;"bottom"===H&&(K=L&&"bottom"===L.verticalAlign&&L.enabled&&!L.floating?K.legendHeight+v(L.margin,10):0,a=a+K-20,U=b-a-(l?0:q.y)-10);if("top"===H)l&&(U=0),e.titleOffset&&(U=e.titleOffset+e.options.title.margin),U+=e.margin[0]-e.spacing[0]||0;else if("middle"===H)if(X===Z)U=0>X?b+void 0:b;else if(X||Z)U=0>X||0>Z?U-Math.min(X,Z):b-a+NaN;c.group.translate(q.x,q.y+Math.floor(U));!1!==A&&(c.minInput.style.marginTop=c.group.translateY+"px",c.maxInput.style.marginTop=c.group.translateY+
"px");c.rendered=!0}},getHeight:function(){var a=this.options,b=this.group,c=a.y,e=a.buttonPosition.y,a=a.inputPosition.y,b=b?b.getBBox(!0).height+13+c:0,c=Math.min(a,e);if(0>a&&0>e||0<a&&0<e)b+=Math.abs(c);return b},titleCollision:function(a){return!(a.options.title.text||a.options.subtitle.text)},update:function(a){var b=this.chart;m(!0,b.options.rangeSelector,a);this.destroy();this.init(b);b.rangeSelector.render()},destroy:function(){var b=this,c=b.minInput,f=b.maxInput;b.unMouseDown();b.unResize();
e(b.buttons);c&&(c.onfocus=c.onblur=c.onchange=null);f&&(f.onfocus=f.onblur=f.onchange=null);a.objectEach(b,function(a,c){a&&"chart"!==c&&(a.destroy?a.destroy():a.nodeType&&l(this[c]));a!==E.prototype[c]&&(b[c]=null)},this)}};F.prototype.toFixedRange=function(a,b,c,e){var d=this.chart&&this.chart.fixedRange;a=v(c,this.translate(a,!0,!this.horiz));b=v(e,this.translate(b,!0,!this.horiz));c=d&&(b-a)/d;.7<c&&1.3>c&&(e?a=b-d:b=a+d);q(a)||(a=b=void 0);return{min:a,max:b}};F.prototype.minFromRange=function(){var a=
this.range,b={month:"Month",year:"FullYear"}[a.type],c,e=this.max,d,f,h=function(a,c){var d=new Date(a),e=d["get"+b]();d["set"+b](e+c);e===d["get"+b]()&&d.setDate(0);return d.getTime()-a};q(a)?(c=e-a,f=a):(c=e+h(e,-a.count),this.chart&&(this.chart.fixedRange=e-c));d=v(this.dataMin,Number.MIN_VALUE);q(c)||(c=d);c<=d&&(c=d,void 0===f&&(f=h(c,a.count)),this.newMax=Math.min(c+f,this.dataMax));q(e)||(c=void 0);return c};K(C.prototype,"init",function(a,b,c){D(this,"init",function(){this.options.rangeSelector.enabled&&
(this.rangeSelector=new E(this))});a.call(this,b,c)});K(C.prototype,"render",function(a,b,c){var e=this.axes,d=this.rangeSelector;d&&(f(e,function(a){a.updateNames();a.setScale()}),this.getAxisMargins(),d.render(),e=d.options.verticalAlign,d.options.floating||("bottom"===e?this.extraBottomMargin=!0:"middle"!==e&&(this.extraTopMargin=!0)));a.call(this,b,c)});K(C.prototype,"update",function(b,c,e,f){var d=this.rangeSelector,h;this.extraTopMargin=this.extraBottomMargin=!1;d&&(d.render(),h=c.rangeSelector&&
c.rangeSelector.verticalAlign||d.options&&d.options.verticalAlign,d.options.floating||("bottom"===h?this.extraBottomMargin=!0:"middle"!==h&&(this.extraTopMargin=!0)));b.call(this,a.merge(!0,c,{chart:{marginBottom:v(c.chart&&c.chart.marginBottom,this.margin.bottom),spacingBottom:v(c.chart&&c.chart.spacingBottom,this.spacing.bottom)}}),e,f)});K(C.prototype,"redraw",function(a,b,c){var e=this.rangeSelector;e&&!e.options.floating&&(e.render(),e=e.options.verticalAlign,"bottom"===e?this.extraBottomMargin=
!0:"middle"!==e&&(this.extraTopMargin=!0));a.call(this,b,c)});C.prototype.adjustPlotArea=function(){var a=this.rangeSelector;this.rangeSelector&&(a=a.getHeight(),this.extraTopMargin&&(this.plotTop+=a),this.extraBottomMargin&&(this.marginBottom+=a))};C.prototype.callbacks.push(function(a){function b(){c=a.xAxis[0].getExtremes();q(c.min)&&e.render(c.min,c.max)}var c,e=a.rangeSelector,d,f;e&&(f=D(a.xAxis[0],"afterSetExtremes",function(a){e.render(a.min,a.max)}),d=D(a,"redraw",b),b());D(a,"destroy",function(){e&&
(d(),f())})});a.RangeSelector=E})(L);(function(a){var E=a.arrayMax,D=a.arrayMin,F=a.Axis,C=a.Chart,r=a.defined,h=a.each,p=a.extend,n=a.format,u=a.grep,z=a.inArray,e=a.isNumber,l=a.isString,f=a.map,b=a.merge,c=a.pick,w=a.Point,q=a.Renderer,m=a.Series,v=a.splat,H=a.SVGRenderer,B=a.VMLRenderer,K=a.wrap,k=m.prototype,A=k.init,J=k.processData,x=w.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(d,e,h){var g=l(d)||d.nodeName,k=arguments[g?1:0],m=k.series,n=a.getOptions(),p,q=c(k.navigator&&
k.navigator.enabled,n.navigator.enabled,!0),t=q?{startOnTick:!1,endOnTick:!1}:null,r={marker:{enabled:!1,radius:2}},u={shadow:!1,borderWidth:0};k.xAxis=f(v(k.xAxis||{}),function(a){return b({minPadding:0,maxPadding:0,overscroll:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},n.xAxis,a,{type:"datetime",categories:null},t)});k.yAxis=f(v(k.yAxis||{}),function(a){p=c(a.opposite,!0);return b({labels:{y:-2},opposite:p,showLastLabel:!1,title:{text:null}},n.yAxis,a)});k.series=
null;k=b({chart:{panning:!0,pinchType:"x"},navigator:{enabled:q},scrollbar:{enabled:c(n.scrollbar.enabled,!0)},rangeSelector:{enabled:c(n.rangeSelector.enabled,!0)},title:{text:null},tooltip:{split:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:r,spline:r,area:r,areaspline:r,arearange:r,areasplinerange:r,column:u,columnrange:u,candlestick:u,ohlc:u}},k,{isStock:!0});k.series=m;return g?new C(d,k,h):new C(k,e)};K(F.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=
b._labelPanes||{},d=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&(d.x=0),void 0===d.align&&(d.align="right"),b[c]=this,"right"):a.apply(this,[].slice.call(arguments,1))});K(F.prototype,"destroy",function(a){var b=this.chart,c=this.options&&this.options.top+","+this.options.height;c&&b._labelPanes&&b._labelPanes[c]===this&&delete b._labelPanes[c];return a.apply(this,Array.prototype.slice.call(arguments,1))});K(F.prototype,
"getPlotLinePath",function(b,k,m,g,n,p){var d=this,q=this.isLinked&&!this.series?this.linkedParent.series:this.series,t=d.chart,u=t.renderer,v=d.left,w=d.top,x,y,A,B,C=[],G=[],D,E;if("xAxis"!==d.coll&&"yAxis"!==d.coll)return b.apply(this,[].slice.call(arguments,1));G=function(a){var b="xAxis"===a?"yAxis":"xAxis";a=d.options[b];return e(a)?[t[b][a]]:l(a)?[t.get(a)]:f(q,function(a){return a[b]})}(d.coll);h(d.isXAxis?t.yAxis:t.xAxis,function(a){if(r(a.options.id)?-1===a.options.id.indexOf("navigator"):
1){var b=a.isXAxis?"yAxis":"xAxis",b=r(a.options[b])?t[b][a.options[b]]:t[b][0];d===b&&G.push(a)}});D=G.length?[]:[d.isXAxis?t.yAxis[0]:t.xAxis[0]];h(G,function(b){-1!==z(b,D)||a.find(D,function(a){return a.pos===b.pos&&a.len&&b.len})||D.push(b)});E=c(p,d.translate(k,null,null,g));e(E)&&(d.horiz?h(D,function(a){var b;y=a.pos;B=y+a.len;x=A=Math.round(E+d.transB);if(x<v||x>v+d.width)n?x=A=Math.min(Math.max(v,x),v+d.width):b=!0;b||C.push("M",x,y,"L",A,B)}):h(D,function(a){var b;x=a.pos;A=x+a.len;y=B=
Math.round(w+d.height-E);if(y<w||y>w+d.height)n?y=B=Math.min(Math.max(w,y),d.top+d.height):b=!0;b||C.push("M",x,y,"L",A,B)}));return 0<C.length?u.crispPolyLine(C,m||1):null});F.prototype.getPlotBandPath=function(a,b){b=this.getPlotLinePath(b,null,null,!0);a=this.getPlotLinePath(a,null,null,!0);var c=[],d;if(a&&b)if(a.toString()===b.toString())c=a,c.flat=!0;else for(d=0;d<a.length;d+=6)c.push("M",a[d+1],a[d+2],"L",a[d+4],a[d+5],b[d+4],b[d+5],b[d+1],b[d+2],"z");else c=null;return c};H.prototype.crispPolyLine=
function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};q===B&&(B.prototype.crispPolyLine=H.prototype.crispPolyLine);K(F.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});K(F.prototype,"drawCrosshair",function(a,b,e){var d,f;a.call(this,b,e);if(r(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){a=this.chart;
var h=this.options.crosshair.label,k=this.horiz;d=this.opposite;f=this.left;var l=this.top,m=this.crossLabel,q,t=h.format,u="",v="inside"===this.options.tickPosition,w=!1!==this.crosshair.snap,x=0;b||(b=this.cross&&this.cross.e);q=k?"center":d?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";m||(m=this.crossLabel=a.renderer.label(null,null,null,h.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:h.align||
q,padding:c(h.padding,8),r:c(h.borderRadius,3),zIndex:2}).add(this.labelGroup),m.attr({fill:h.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:h.borderColor||"","stroke-width":h.borderWidth||0}).css(p({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},h.style)));k?(q=w?e.plotX+f:b.chartX,l+=d?0:this.height):(q=d?this.width+f:0,l=w?e.plotY+l:b.chartY);t||h.formatter||(this.isDatetimeAxis&&(u="%b %d, %Y"),t="{value"+(u?":"+u:"")+"}");b=w?e[this.isXAxis?"x":
"y"]:this.toValue(k?b.chartX:b.chartY);m.attr({text:t?n(t,{value:b}):h.formatter.call(this,b),x:q,y:l,visibility:"visible"});b=m.getBBox();if(k){if(v&&!d||!v&&d)l=m.y-b.height}else l=m.y-b.height/2;k?(d=f-b.x,f=f+this.width-b.x):(d="left"===this.labelAlign?f:0,f="right"===this.labelAlign?f+this.width:a.chartWidth);m.translateX<d&&(x=d-m.translateX);m.translateX+b.width>=f&&(x=-(m.translateX+b.width-f));m.attr({x:q+x,y:l,anchorX:k?q:this.opposite?0:a.chartWidth,anchorY:k?this.opposite?a.chartHeight:
0:l+b.height/2})}});k.init=function(){A.apply(this,arguments);this.setCompare(this.options.compare)};k.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=!0)};k.processData=function(){var a,b=-1,c,f,h=!0===this.options.compareStart?0:1,k,l;J.apply(this,arguments);
if(this.xAxis&&this.processedYData)for(c=this.processedXData,f=this.processedYData,k=f.length,this.pointArrayMap&&(b=z("close",this.pointArrayMap),-1===b&&(b=z(this.pointValKey||"y",this.pointArrayMap))),a=0;a<k-h;a++)if(l=f[a]&&-1<b?f[a][b]:f[a],e(l)&&c[a+h]>=this.xAxis.min&&0!==l){this.compareValue=l;break}};K(k,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=D(b),this.dataMax=
E(b))});F.prototype.setCompare=function(a,b){this.isXAxis||(h(this.series,function(b){b.setCompare(a)}),c(b,!0)&&this.chart.redraw())};w.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,c(this.series.tooltipOptions.changeDecimals,2)));return x.apply(this,[b])};K(m.prototype,"render",function(a){this.chart.is3d&&this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=b(this.chart.clipBox),
this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)});K(C.prototype,"getSelectedPoints",function(a){var b=a.call(this);h(this.series,function(a){a.hasGroupedData&&(b=b.concat(u(a.points||[],function(a){return a.selected})))});return b});K(C.prototype,"update",function(a,
c){"scrollbar"in c&&this.navigator&&(b(!0,this.options.scrollbar,c.scrollbar),this.navigator.update({},!1),delete c.scrollbar);return a.apply(this,Array.prototype.slice.call(arguments,1))})})(L);return L});
Highcharts.setOptions({
  global: {
      useUTC: false
  },
  lang: {
      months: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril',
          'Maio', 'Junho', 'Julho', 'Agosto',
          'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      weekdays: [
          'Domingo', 'Segunda', 'Terça', 'Quarta',
          'Quinta', 'Sexta', 'Sábado'
      ],
      shortMonths: [ "Jan" , "Fev" , "Mar" , "Abr" , "Mai" , "Jun" , "Jul" , "Ago" , "Set" , "Out" , "Nov" , "Dez"]
  },
});
$graphUpdateRate = 60000;
$deviceUpdateRate = 1000;
$dimensions = {};
$devices = {};
$chart = null;
$options = {
    chart: {
        //renderTo: 'graph-canvas',
        type: 'line',
        backgroundColor: '#f8f8f8'
    },
    title: {
        text: 'Nível nos reservatórios'
    },
    tooltip: {
      borderRadius: 2,
      valueDecimals: 2,
      animation: false,
      valueSuffix: '%',
      xDateFormat: '%A, %e de %B, %H:%M:%S'
    },
    plotOptions: {
      series: {
          shadow: true,
          animation: false
      }
    },
    xAxis: {
        title: {
            text: 'Horário'
        },
        // 2 hours
        range:  1 * 3600 * 1000 * 8,
        type: 'datetime',
        labels: {
          formatter: function () {
            if (Highcharts.dateFormat('%H:%M', this.value) == "00:00") {
              if (Highcharts.dateFormat('%d/%m', this.value) == "01/01") {
                return Highcharts.dateFormat('%H:%M<br>%e %b/%Y', this.value);
              }
              else {
                return Highcharts.dateFormat('%H:%M<br>%e %b', this.value);
              }
            }
            else {
              return Highcharts.dateFormat('%H:%M', this.value);
            }
          },
          dateTimeLabelFormats: {
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
          }
        }
    },
    yAxis: {
        title: {
            text: 'Nível'
        },
        tickInterval: 10,
        min: 0,
        max: 100,
        labels: {
          formatter: function () {
              return Highcharts.format(this.value + '%');
          },
        }
    },
    scrollbar: {
        enabled: true,
        barBackgroundColor: "#033a67",
        barBorderColor: "#031a47",
        barBorderRadius: 6,
        buttonArrowColor: "#fff",
        buttonBackgroundColor: "#033a67",
        buttonBorderColor: "#031a47",
        buttonBorderRadius: 2,
        height: 25,
        margin:10,
        rifleColor: "#fff",
        trackBackgroundColor: "#f3f4f5"
    },
    credits: {
        enabled: true,
        position: {
          align: 'right',
          x: -10,
          verticalAlign: 'bottom',
          y: -5
        },
        // href: 'javascript:window.open("http://lcasystems.com.br/", "_blank")',
        text: 'LCA®'
    },
    // series: $dados
};

$historyOptions = {
    chart: {
        //renderTo: 'graph-canvas',
        type: 'line',
        height: 490,
        backgroundColor: '#f8f8f8'
    },
    tooltip: {
      borderRadius: 2,
      borderWidth: 1,
      valueDecimals: 2,
      animation: false,
      valueSuffix: '%',
      xDateFormat: '%A, %e de %B, %H:%M:%S'
    },
    title: {
        text: 'Nível nos reservatórios'
    },
    plotOptions: {
      series: {
          shadow: true,
          showInNavigator: true,
          animation: false
      }
    },
    xAxis: {
        title: {
            text: 'Horário'
        },
        // 2 hours
        range:  1 * 3600 * 1000 * 72,
        type: 'datetime',
        labels: {
          formatter: function () {
              if (Highcharts.dateFormat('%H:%M', this.value) == "00:00") {
                if (Highcharts.dateFormat('%d/%m', this.value) == "01/01") {
                  return Highcharts.dateFormat('%H:%M<br>%e %b/%Y', this.value);
                }
                else {
                  return Highcharts.dateFormat('%H:%M<br>%e %b', this.value);
                }
              }
              else {
                return Highcharts.dateFormat('%H:%M', this.value);
              }
          },
          dateTimeLabelFormats: {
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
          }
        }
    },
    yAxis: {
        title: {
            text: 'Nível'
        },
        tickInterval: 10,
        tickAmount: 11,
        minRange: 100,
        min: 0,
        max: 100,
        labels: {
          formatter: function () {
              return Highcharts.format(this.value + '%');
          },
          align: 'left'
        }
    },
    rangeSelector: {
      enabled: true,
      verticalAlign: 'bottom',
	    x: 0,
	    y: 0
    },
    scrollbar: {
        enabled: true,
        barBackgroundColor: "#033a67",
        barBorderColor: "#031a47",
        barBorderRadius: 6,
        buttonArrowColor: "#fff",
        buttonBackgroundColor: "#033a67",
        buttonBorderColor: "#031a47",
        buttonBorderRadius: 2,
        height: 18,
        margin:10,
        rifleColor: "#fff",
        trackBackgroundColor: "#f3f4f5"
    },
    credits: {
        enabled: false,
    }
};

$(".monitoring.index").ready(function() {
  //caching
  getDevices();

  plotChart();
  $allTimer = setInterval(
    function() {
      getLevels();
      updateChart();
    },
    $graphUpdateRate
  );
  return false;
});

$(".monitoring.devices_history").ready(function() {
  plotHistoryChart();
  return false;
});


function updateDevice($level) {
  $percentage = $level.percentage;
  $litters = ($percentage/100 * $dimensions[$level.device_id].volume).toFixed(2)
  $water.animate({
    height: $percentage+'%'
  }, 1000);
  $tankInfo.html("Reservatório "+$level.device_id+"<br>Nível de água: "+$percentage+"%<br>Volume: "+$litters+" litros");
  $tankInfo.css('display','block')
  return false;
}

function resumeDevice($level) {
  $percentage = $level.percentage;
  $litters = ($percentage/100 * $dimensions[$level.device_id].volume).toFixed(2)
  $waterDeviceInfo.html('Reservatório '+$level.device_id+'<br>Nível: '+$level.percentage+'%');
  $waterDeviceInfo.css('display', 'block')
  return false;
}

function deviceInfo($element) {
  if ($element.className.split(' ')[0] == 'water-device') {
    $device_id = $element.id.split('-')[1]
    clearInterval($allTimer);
    $oneTimer = setInterval(
      function() {
        getLevel($device_id);
        updateChart();
      },
      $deviceUpdateRate
    );
    $tankInfo.css('display','none')
    $devicesCanvas.css('display','none');
    $deviceCanvas.css('display','block');
  }
  else {
    clearInterval($oneTimer);
    $allTimer = setInterval(
      function() {
        getLevels();
        updateChart();
      },
      $graphUpdateRate
    );
    $deviceCanvas.css('display','none');
    $devicesCanvas.css('display','block');
  }
  return false;
}

function deviceResumeShow($element) {
  if ($element.className.split(' ')[0] == 'water-device') {
    $device_id = $element.id.split('-')[1]
    getResume($device_id);
  }
  return false;
}

function deviceResumeHide($element) {
  $waterDeviceInfo.css('display', 'none');
  return false;
}

function getLevel($device_id) {
  $.ajax({
    type: "GET",
    url: "/render_current_level/"+$device_id,
    dataType: "json",
    success: function(response){
      updateDevice(response);
      verifyDataSending(response)
    }
  });
  return false;
}

function getResume($device_id) {
  $.ajax({
    type: "GET",
    url: "/render_current_level/"+$device_id,
    dataType: "json",
    success: function(response){
      resumeDevice(response);
    }
  });
  return false;
}


function updateDevices($level) {
  $percentage = $level.percentage;
  if ($percentage >= 0 && $percentage < 10) {
    $devices[$level.device_id].removeClass( "low medium full" ).addClass('empty');
  }
  else if ($percentage >= 10 && $percentage < 40) {
    $devices[$level.device_id].removeClass( "empty medium full" ).addClass('low');
  }
  else if ($percentage >= 40 && $percentage < 60) {
    $devices[$level.device_id].removeClass( "empty low full" ).addClass('medium');
  }
  else if ($percentage >= 60) {
    $devices[$level.device_id].removeClass( "empty low medium" ).addClass('full');
  }
  return false;
}

function verifyDataSending(data) {
  $now = new Date();
  $now_milis = $now.getTime();
  $time= new Date(data.created_at);
  $diff = ($now_milis - $time.getTime());
  // 15 minutes
  if ($diff > 1000 * 60 * 15) {
    $devices[data.device_id].html('<i class="fa fa-exclamation-triangle"></i>');
  }
  else {
    $devices[data.device_id].html('');
  }
  return false;

}

function getLevels() {
  $.ajax({
    type: "GET",
    url: "/render_all_current_levels",
    dataType: "json",
    success: function(response){
      response.forEach(updateDevices);
      response.forEach(verifyDataSending);
    }
  });
  return false;
}

function getDevices() {
  $.ajax({
    type: "GET",
    url: "/get_all_dimensions",
    dataType: "json",
    success: function(response){
      $temp = response;
      for (i = 0; i < $temp.length; i++) {
        $devices[$temp[i].device_id] = ($('#device-'+$temp[i].device_id));
        $dimensions[$temp[i].device_id] = $temp[i];
      }
      $tankInfo = $(".tank-info");
      $water = $(".water");
      $waterDeviceInfo = $('.water-device-info');
      $deviceCanvas = $('.device-canvas');
      $devicesCanvas = $('.devices-canvas');
      getLevels();
    }
  });
  return false;
}

function plotChart() {
  $.ajax({
    type: "GET",
    // #hidden_id is at _infos.html.erb. It shows the user who owns the devices.
    // Must be changed if more than a user has a device
    url: "/get_user_devices_levels/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $options.series = response;
      $options.chart.renderTo = "graph-canvas";
      $chart = new Highcharts.Chart($options);
    }
  });
  return false;
}

function plotHistoryChart() {
  $('#loading').show();
  $.ajax({
    type: "GET",
    // #hidden_id is at _infos.html.erb. It shows the user who owns the devices.
    // Must be changed if more than a user has a device
    url: "/get_user_devices_levels_history/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $('#loading').hide();
      // $historyOptions.plotOptions.series.shadow = true;
      $historyOptions.series = response;
      $historyOptions.chart.renderTo = "history-graph-canvas";
      $chart = new Highcharts.StockChart($historyOptions);
    }
  });
  return false;
}

// Updating Chart
function updateChart() {
  $.ajax({
    type: "GET",
    url: "/get_user_devices_levels/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $($chart.series).each(function(i) {
        $chart.series[i].update(response[i]);
        // Problema da Função receber um NaN
        // $chart.series[i].setData(response[i].data);
      });
      $ex = $chart.xAxis[0].getExtremes();
      // $ex.max - $ex.min = difference milli seconds between first plot and last
      if ($ex.dataMax - $ex.dataMin > 3600000) {
        if ($ex.dataMax - $ex.max  < 60000 ) {
          $chart.xAxis[0].setExtremes($ex.min, $ex.dataMax + 60000);
        }
        else {
        }
      }
      else {
        $chart.xAxis[0].setExtremes($ex.dataMin - 2000, $ex.dataMax + 2000);
      }
      // $("body").append($ex.min+" "+($ex.max - $ex.min)+" "+$ex.max+"<br>");
      // $("body").append($ex.dataMin+" "+($ex.dataMax - $ex.dataMin)+" "+$ex.dataMax+"<br><br>");

    }
  });
  return false;
}

function updateHistoryChart() {
  $.ajax({
    type: "GET",
    url: "/get_user_devices_levels_history/"+$("#hidden_id").val(),
    dataType: "json",
    success: function(response){
      $($chart.series).each(function(i) {
        $chart.series[i].update(response[i]);
        // Problema da Função receber um NaN
        // $chart.series[i].setData(response[i].data);
      });
      $ex = $chart.xAxis[0].getExtremes();
      // $("body").append(($ex.max - $ex.min)+"<br>");
      // $ex.max - $ex.min = difference milli seconds between first plot and last
      if ($ex.max - $ex.min > 360000) {
        $chart.xAxis[0].setExtremes($ex.min + (1000) , $ex.max + (1000));
      }
      $chart.redraw();
    }
  });
  return false;
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//









;
