window.Modernizr = function(e, t, n) {
    function r(e) {
        g.cssText = e
    }

    function o(e, t) {
        return r(E.join(e + ";") + (t || ""))
    }

    function a(e, t) {
        return typeof e === t
    }

    function i(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function c(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!i(o, "-") && g[o] !== n) return "pfx" != t || o
        }
        return !1
    }

    function s(e, t, r) {
        for (var o in e) {
            var i = t[e[o]];
            if (i !== n) return !1 === r ? e[o] : a(i, "function") ? i.bind(r || t) : i
        }
        return !1
    }

    function u(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            o = (e + " " + w.join(r + " ") + r).split(" ");
        return a(t, "string") || a(t, "undefined") ? c(o, t) : (o = (e + " " + S.join(r + " ") + r).split(" "), s(o, t, n))
    }
    var l, d, f = {},
        m = t.documentElement,
        p = "modernizr",
        h = t.createElement(p),
        g = h.style,
        v = t.createElement("input"),
        y = ":)",
        b = {}.toString,
        E = " -webkit- -moz- -o- -ms- ".split(" "),
        x = "Webkit Moz O ms",
        w = x.split(" "),
        S = x.toLowerCase().split(" "),
        C = {
            svg: "http://www.w3.org/2000/svg"
        },
        k = {},
        T = {},
        N = {},
        M = [],
        P = M.slice,
        j = function(e, n, r, o) {
            var a, i, c, s, u = t.createElement("div"),
                l = t.body,
                d = l || t.createElement("body");
            if (parseInt(r, 10))
                for (; r--;) c = t.createElement("div"), c.id = o ? o[r] : p + (r + 1), u.appendChild(c);
            return a = ["&#173;", '<style id="s', p, '">', e, "</style>"].join(""), u.id = p, (l ? u : d).innerHTML += a, d.appendChild(u), l || (d.style.background = "", d.style.overflow = "hidden", s = m.style.overflow, m.style.overflow = "hidden", m.appendChild(d)), i = n(u, e), l ? u.parentNode.removeChild(u) : (d.parentNode.removeChild(d), m.style.overflow = s), !!i
        },
        $ = function(t) {
            var n = e.matchMedia || e.msMatchMedia;
            if (n) return n(t) && n(t).matches || !1;
            var r;
            return j("@media " + t + " { #" + p + " { position: absolute; } }", function(t) {
                r = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
            }), r
        },
        D = function() {
            function e(e, o) {
                o = o || t.createElement(r[e] || "div"), e = "on" + e;
                var i = e in o;
                return i || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), i = a(o[e], "function"), a(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), o = null, i
            }
            var r = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return e
        }(),
        F = {}.hasOwnProperty;
    d = a(F, "undefined") || a(F.call, "undefined") ? function(e, t) {
        return t in e && a(e.constructor.prototype[t], "undefined")
    } : function(e, t) {
        return F.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = P.call(arguments, 1),
            r = function() {
                if (this instanceof r) {
                    var o = function() {};
                    o.prototype = t.prototype;
                    var a = new o,
                        i = t.apply(a, n.concat(P.call(arguments)));
                    return Object(i) === i ? i : a
                }
                return t.apply(e, n.concat(P.call(arguments)))
            };
        return r
    }), k.flexbox = function() {
        return u("flexWrap")
    }, k.flexboxlegacy = function() {
        return u("boxDirection")
    }, k.canvas = function() {
        var e = t.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    }, k.canvastext = function() {
        return !(!f.canvas || !a(t.createElement("canvas").getContext("2d").fillText, "function"))
    }, k.webgl = function() {
        return !!e.WebGLRenderingContext
    }, k.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : j(["@media (", E.join("touch-enabled),("), p, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
            n = 9 === e.offsetTop
        }), n
    }, k.geolocation = function() {
        return "geolocation" in navigator
    }, k.postmessage = function() {
        return !!e.postMessage
    }, k.websqldatabase = function() {
        return !!e.openDatabase
    }, k.indexedDB = function() {
        return !!u("indexedDB", e)
    }, k.hashchange = function() {
        return D("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, k.history = function() {
        return !(!e.history || !history.pushState)
    }, k.draganddrop = function() {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, k.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e
    }, k.rgba = function() {
        return r("background-color:rgba(150,255,150,.5)"), i(g.backgroundColor, "rgba")
    }, k.hsla = function() {
        return r("background-color:hsla(120,40%,100%,.5)"), i(g.backgroundColor, "rgba") || i(g.backgroundColor, "hsla")
    }, k.multiplebgs = function() {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(g.background)
    }, k.backgroundsize = function() {
        return u("backgroundSize")
    }, k.borderimage = function() {
        return u("borderImage")
    }, k.borderradius = function() {
        return u("borderRadius")
    }, k.boxshadow = function() {
        return u("boxShadow")
    }, k.textshadow = function() {
        return "" === t.createElement("div").style.textShadow
    }, k.opacity = function() {
        return o("opacity:.55"), /^0.55$/.test(g.opacity)
    }, k.cssanimations = function() {
        return u("animationName")
    }, k.csscolumns = function() {
        return u("columnCount")
    }, k.cssgradients = function() {
        var e = "background-image:";
        return r((e + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + e) + E.join("linear-gradient(left top,#9f9, white);" + e)).slice(0, -e.length)), i(g.backgroundImage, "gradient")
    }, k.cssreflections = function() {
        return u("boxReflect")
    }, k.csstransforms = function() {
        return !!u("transform")
    }, k.csstransforms3d = function() {
        var e = !!u("perspective");
        return e && "webkitPerspective" in m.style && j("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, n) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight
        }), e
    }, k.csstransitions = function() {
        return u("transition")
    }, k.fontface = function() {
        var e;
        return j('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
            var o = t.getElementById("smodernizr"),
                a = o.sheet || o.styleSheet,
                i = a ? a.cssRules && a.cssRules[0] ? a.cssRules[0].cssText : a.cssText || "" : "";
            e = /src/i.test(i) && 0 === i.indexOf(r.split(" ")[0])
        }), e
    }, k.generatedcontent = function() {
        var e;
        return j(["#", p, "{font:0/0 a}#", p, ':after{content:"', y, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
            e = t.offsetHeight >= 3
        }), e
    }, k.video = function() {
        var e = t.createElement("video"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (e) {}
        return n
    }, k.audio = function() {
        var e = t.createElement("audio"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (e) {}
        return n
    }, k.localstorage = function() {
        try {
            return localStorage.setItem(p, p), localStorage.removeItem(p), !0
        } catch (e) {
            return !1
        }
    }, k.sessionstorage = function() {
        try {
            return sessionStorage.setItem(p, p), sessionStorage.removeItem(p), !0
        } catch (e) {
            return !1
        }
    }, k.webworkers = function() {
        return !!e.Worker
    }, k.applicationcache = function() {
        return !!e.applicationCache
    }, k.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(C.svg, "svg").createSVGRect
    }, k.inlinesvg = function() {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == C.svg
    }, k.smil = function() {
        return !!t.createElementNS && /SVGAnimate/.test(b.call(t.createElementNS(C.svg, "animate")))
    }, k.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(b.call(t.createElementNS(C.svg, "clipPath")))
    };
    for (var z in k) d(k, z) && (l = z.toLowerCase(), f[l] = k[z](), M.push((f[l] ? "" : "no-") + l));
    return f.input || function() {
            f.input = function(n) {
                for (var r = 0, o = n.length; r < o; r++) N[n[r]] = !!(n[r] in v);
                return N.list && (N.list = !(!t.createElement("datalist") || !e.HTMLDataListElement)), N
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), f.inputtypes = function(e) {
                for (var r, o, a, i = 0, c = e.length; i < c; i++) v.setAttribute("type", o = e[i]), r = "text" !== v.type, r && (v.value = y, v.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(o) && v.style.WebkitAppearance !== n ? (m.appendChild(v), a = t.defaultView, r = a.getComputedStyle && "textfield" !== a.getComputedStyle(v, null).WebkitAppearance && 0 !== v.offsetHeight, m.removeChild(v)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? v.checkValidity && !1 === v.checkValidity() : v.value != y)), T[e[i]] = !!r;
                return T
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }(), f.addTest = function(e, t) {
            if ("object" == typeof e)
                for (var r in e) d(e, r) && f.addTest(r, e[r]);
            else {
                if (e = e.toLowerCase(), f[e] !== n) return f;
                t = "function" == typeof t ? t() : t, m.className += " " + (t ? "" : "no-") + e, f[e] = t
            }
            return f
        }, r(""), h = v = null,
        function(e, t) {
            function n(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
            }

            function r() {
                var e = v.elements;
                return "string" == typeof e ? e.split(" ") : e
            }

            function o(e) {
                var t = g[e[p]];
                return t || (t = {}, h++, e[p] = h, g[h] = t), t
            }

            function a(e, n, r) {
                if (n || (n = t), l) return n.createElement(e);
                r || (r = o(n));
                var a;
                return a = r.cache[e] ? r.cache[e].cloneNode() : m.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !a.canHaveChildren || f.test(e) || a.tagUrn ? a : r.frag.appendChild(a)
            }

            function i(e, n) {
                if (e || (e = t), l) return e.createDocumentFragment();
                n = n || o(e);
                for (var a = n.frag.cloneNode(), i = 0, c = r(), s = c.length; i < s; i++) a.createElement(c[i]);
                return a
            }

            function c(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                    return v.shivMethods ? a(n, e, t) : t.createElem(n)
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-]+/g, function(e) {
                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                }) + ");return n}")(v, t.frag)
            }

            function s(e) {
                e || (e = t);
                var r = o(e);
                return !v.shivCSS || u || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || c(e, r), e
            }
            var u, l, d = e.html5 || {},
                f = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                p = "_html5shiv",
                h = 0,
                g = {};
            ! function() {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", u = "hidden" in e, l = 1 == e.childNodes.length || function() {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return void 0 === e.cloneNode || void 0 === e.createDocumentFragment || void 0 === e.createElement
                    }()
                } catch (e) {
                    u = !0, l = !0
                }
            }();
            var v = {
                elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                version: "3.7.0",
                shivCSS: !1 !== d.shivCSS,
                supportsUnknownElements: l,
                shivMethods: !1 !== d.shivMethods,
                type: "default",
                shivDocument: s,
                createElement: a,
                createDocumentFragment: i
            };
            e.html5 = v, s(t)
        }(this, t), f._version = "2.8.3", f._prefixes = E, f._domPrefixes = S, f._cssomPrefixes = w, f.mq = $, f.hasEvent = D, f.testProp = function(e) {
            return c([e])
        }, f.testAllProps = u, f.testStyles = j, f.prefixed = function(e, t, n) {
            return t ? u(e, t, n) : u(e, "pfx")
        }, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + M.join(" "), f
}(this, this.document);