var base2 = {
  name: "base2",
  version: "1.0 (beta 1)",
  exports: "Base, Package, Abstract, Module, Enumerable, Map, Collection, RegGrp, " + "assert, assertArity, assertType, " + "assignID, copy, counter, detect, extend, forEach, format, instanceOf, match, rescape, slice, trim, " + "I, K, Undefined, Null, True, False, bind, delegate, flip, not, partial, unbind",
  global: this,
  namespace: "var global=base2.global;function base(o,a){return o.base.apply(o,a)};",
  detect: new
  function (_) {
    var global = _;
    var jscript
    /*@cc_on=@_jscript_version@*/
    ;
    var java = _.java ? true : false;
    if (_.navigator) {
      var element = document.createElement("span");
      var userAgent = navigator.platform + " " + navigator.userAgent;
      if (!jscript) userAgent = userAgent.replace(/MSIE\s[\d.]+/, "");
      userAgent = userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
      java &= navigator.javaEnabled()
    }
    return function (a) {
      var r = false;
      var b = a.charAt(0) == "!";
      if (b) a = a.slice(1);
      if (a.charAt(0) == "(") {
        try {
          eval("r=!!" + a)
        } catch(error) {}
      } else {
        r = new RegExp("(" + a + ")", "i").test(userAgent)
      }
      return !! (b ^ r)
    }
  } (this)
};
new
function (_) {
  var detect = base2.detect;
  var slice = Array.slice || (function (b) {
    return function (a) {
      return b.apply(a, b.call(arguments, 1))
    }
  })(Array.prototype.slice);
  var Undefined = K(),
  Null = K(null),
  True = K(true),
  False = K(false);
  var _0 = /%([1-9])/g;
  var _1 = /^\s\s*/;
  var _2 = /\s\s*$/;
  var _3 = /([\/()[\]{}|*+-.,^$?\\])/g;
  var _4 = /eval/.test(detect) ? /\bbase\s*\(/ : /.*/;
  var _5 = ["constructor", "toString", "valueOf"];
  var _6 = String(new RegExp);
  var _7 = 1;
  _8();
  eval(base2.namespace);
  var _9 = function (a, b) {
    base2.__prototyping = true;
    var c = new this;
    extend(c, a);
    delete base2.__prototyping;
    var d = c.constructor;
    function _10() {
      if (!base2.__prototyping) {
        if (this.constructor == arguments.callee || this.__constructing) {
          this.__constructing = true;
          d.apply(this, arguments);
          delete this.__constructing
        } else {
          return extend(arguments[0], c)
        }
      }
      return this
    };
    c.constructor = _10;
    for (var i in Base) _10[i] = this[i];
    _10.toString = K(String(d));
    _10.ancestor = this;
    _10.base = Undefined;
    _10.init = Undefined;
    extend(_10, b);
    _10.prototype = c;
    _10.init();
    return _10
  };
  var Base = _9.call(Object, {
    constructor: function () {
      if (arguments.length > 0) {
        this.extend(arguments[0])
      }
    },
    base: function () {},
    extend: delegate(extend)
  },
  Base = {
    ancestorOf: delegate(_11),
    extend: _9,
    forEach: delegate(_8),
    implement: function (a) {
      if (typeof a == "function") {
        if (_11(Base, a)) {
          a(this.prototype)
        }
      } else {
        extend(this.prototype, a)
      }
      return this
    }
  });
  var Package = Base.extend({
    constructor: function (d, e) {
      this.extend(e);
      if (this.init) this.init();
      if (this.name != "base2") {
        if (!this.parent) this.parent = base2;
        this.parent.addName(this.name, this);
        this.namespace = format("var %1=%2;", this.name, String(this).slice(1, -1))
      }
      var f = /[^\s,]+/g;
      if (d) {
        d.imports = Array2.reduce(this.imports.match(f), function (a, b) {
          eval("var ns=base2." + b);
          assert(ns, format("Package not found: '%1'.", b));
          return a += ns.namespace
        },
        base2.namespace + JavaScript.namespace);
        d.exports = Array2.reduce(this.exports.match(f), function (a, b) {
          var c = this.name + "." + b;
          this.namespace += "var " + b + "=" + c + ";";
          return a += "if(!" + c + ")" + c + "=" + b + ";"
        },
        "", this)
      }
    },
    exports: "",
    imports: "",
    name: "",
    namespace: "",
    parent: null,
    addName: function (a, b) {
      if (!this[a]) {
        this[a] = b;
        this.exports += ", " + a;
        this.namespace += format("var %1=%2.%1;", a, this.name)
      }
    },
    addPackage: function (a) {
      this.addName(a, new Package(null, {
        name: a,
        parent: this
      }))
    },
    toString: function () {
      return format("[%1]", this.parent ? String(this.parent).slice(1, -1) + "." + this.name : this.name)
    }
  });
  var Abstract = Base.extend({
    constructor: function () {
      throw new TypeError("Class cannot be instantiated.");
    }
  });
  var Module = Abstract.extend(null, {
    extend: function (a, b) {
      var c = this.base();
      _12(c, this);
      c.implement(a);
      extend(c, b);
      c.init();
      return c
    },
    implement: function (c) {
      var d = this;
      if (typeof c == "function") {
        d.base(c);
        if (_11(Module, c)) {
          _12(d, c)
        }
      } else {
        var e = {};
        _8(Object, c, function (a, b) {
          if (b.charAt(0) == "@") {
            if (detect(b.slice(1))) {
              forEach(a, arguments.callee)
            }
          } else if (!Module[b] && typeof a == "function" && a.call) {
            function _13() {
              return d[b].apply(d, [this].concat(slice(arguments)))
            };
            _13.__base = _4.test(a);
            e[b] = _13
          }
        });
        extend(d.prototype, e);
        extend(d, c)
      }
      return d
    }
  });
  function _12(a, b) {
    for (var c in b) {
      var d = b[c];
      if (!Module[c] && typeof d == "function" && d.call) {
        a[c] = d
      }
    }
  };
  var Enumerable = Module.extend({
    every: function (c, d, e) {
      var f = true;
      try {
        this.forEach(c, function (a, b) {
          f = d.call(e, a, b, c);
          if (!f) throw StopIteration;
        })
      } catch(error) {
        if (error != StopIteration) throw error;
      }
      return !! f
    },
    filter: function (d, e, f) {
      var i = 0;
      return this.reduce(d, function (a, b, c) {
        if (e.call(f, b, c, d)) {
          a[i++] = b
        }
        return a
      },
      [])
    },
    invoke: function (b, c) {
      var d = slice(arguments, 2);
      return this.map(b, (typeof c == "function") ?
      function (a) {
        return (a == null) ? undefined : c.apply(a, d)
      } : function (a) {
        return (a == null) ? undefined : a[c].apply(a, d)
      })
    },
    map: function (c, d, e) {
      var f = [],
      i = 0;
      this.forEach(c, function (a, b) {
        f[i++] = d.call(e, a, b, c)
      });
      return f
    },
    pluck: function (b, c) {
      return this.map(b, function (a) {
        return (a == null) ? undefined : a[c]
      })
    },
    reduce: function (c, d, e, f) {
      var g = arguments.length > 2;
      if (c != null) {
        this.forEach(c, function (a, b) {
          if (g) {
            e = d.call(f, e, a, b, c)
          } else {
            e = a;
            g = true
          }
        })
      }
      return e
    },
    some: function (a, b, c) {
      return !this.every(a, not(b), c)
    }
  },
  {
    forEach: forEach
  });
  var _14 = "#";
  var Map = Base.extend({
    constructor: function (a) {
      this.merge(a)
    },
    copy: delegate(copy),
    forEach: function (a, b) {
      for (var c in this) if (c.charAt(0) == _14) {
        a.call(b, this[c], c.slice(1), this)
      }
    },
    get: function (a) {
      return this[_14 + a]
    },
    getKeys: function () {
      return this.map(flip(I))
    },
    getValues: function () {
      return this.map(I)
    },
    has: function (a) {
      /*@cc_on@*/
      /*@if(@_jscript_version<5.5)return $Legacy.has(this,_14+a);@else@*/
      return _14 + a in this;
      /*@end@*/
    },
    merge: function (b) {
      var c = flip(this.put);
      forEach(arguments, function (a) {
        forEach(a, c, this)
      },
      this);
      return this
    },
    remove: function (a) {
      delete this[_14 + a]
    },
    put: function (a, b) {
      if (arguments.length == 1) b = a;
      this[_14 + a] = b
    },
    size: function () {
      var a = 0;
      for (var b in this) if (b.charAt(0) == _14) a++;
      return a
    },
    union: function (a) {
      return this.merge.apply(this.copy(), arguments)
    }
  });
  Map.implement(Enumerable);
  var _15 = "~";
  var Collection = Map.extend({
    constructor: function (a) {
      this[_15] = new Array2;
      this.base(a)
    },
    add: function (a, b) {
      assert(!this.has(a), "Duplicate key '" + a + "'.");
      this.put.apply(this, arguments)
    },
    copy: function () {
      var a = this.base();
      a[_15] = this[_15].copy();
      return a
    },
    forEach: function (a, b) {
      var c = this[_15];
      var d = c.length;
      for (var i = 0; i < d; i++) {
        a.call(b, this[_14 + c
          [i]], c[i], this)
      }
    },
    getAt: function (a) {
      if (a < 0) a += this[_15].length;
      var b = this[_15][a];
      return (b === undefined) ? undefined : this[_14 + b]
    },
    getKeys: function () {
      return this[_15].concat()
    },
    indexOf: function (a) {
      return this[_15].indexOf(String(a))
    },
    insertAt: function (a, b, c) {
      assert(Math.abs(a) < this[_15].length, "Index out of bounds.");
      assert(!this.has(b), "Duplicate key '" + b + "'.");
      this[_15].insertAt(a, String(b));
      this.put.apply(this, slice(arguments, 1))
    },
    item: Undefined,
    put: function (a, b) {
      if (arguments.length == 1) b = a;
      if (!this.has(a)) {
        this[_15].push(String(a))
      }
      var c = this.constructor;
      if (c.Item && !instanceOf(b, c.Item)) {
        b = c.create.apply(c, arguments)
      }
      this[_14 + a] = b
    },
    putAt: function (a, b) {
      assert(Math.abs(a) < this[_15].length, "Index out of bounds.");
      arguments[0] = this[_15].item(a);
      this.put.apply(this, arguments)
    },
    remove: function (a) {
      if (this.has(a)) {
        this[_15].remove(String(a));
        delete this[_14 + a]
      }
    },
    removeAt: function (a) {
      this[_15].removeAt(a);
      delete this[_14 + key]
    },
    reverse: function () {
      this[_15].reverse();
      return this
    },
    size: function () {
      return this[_15].length
    },
    sort: function (c) {
      if (c) {
        var d = this;
        this[_15].sort(function (a, b) {
          return c(d[_14 + a], d[_14 + b], a, b)
        })
      } else this[_15].sort();
      return this
    },
    toString: function () {
      return String(this[_15])
    }
  },
  {
    Item: null,
    init: function () {
      this.prototype.item = this.prototype.getAt
    },
    create: function (a, b) {
      return this.Item ? new this.Item(a, b) : b
    },
    extend: function (a, b) {
      var c = this.base(a);
      c.create = this.create;
      extend(c, b);
      if (!c.Item) {
        c.Item = this.Item
      } else if (typeof c.Item != "function") {
        c.Item = (this.Item || Base).extend(c.Item)
      }
      c.init();
      return c
    }
  });
  var _16 = /\\(\d+)/g,
  _17 = /\\./g,
  _18 = /\(\?[:=!]|\[[^\]]+\]/g,
  _19 = /\(/g,
  _20 = /\$(\d+)/,
  _21 = /^\$\d+$/;
  var RegGrp = Collection.extend({
    constructor: function (a, b) {
      this.base(a);
      if (typeof b == "string") {
        this.global = /g/.test(b);
        this.ignoreCase = /i/.test(b)
      }
    },
    global: true,
    ignoreCase: false,
    exec: function (h, j) {
      var k = (this.global ? "g" : "") + (this.ignoreCase ? "i" : "");
      h = String(h) + "";
      if (arguments.length == 1) {
        var l = this;
        var m = this[_15];
        j = function (a) {
          if (a) {
            var b, c = 1,
            i = 0;
            while ((b = l[_14 + m
              [i++]])) {
              var d = c + b.length + 1;
              if (arguments[c]) {
                var e = b.replacement;
                switch (typeof e) {
                case "function":
                  var f = slice(arguments, c, d);
                  var g = arguments[arguments.length - 2];
                  return e.apply(l, f.concat(g, h));
                case "number":
                  return arguments[c + e];
                default:
                  return e
                }
              }
              c = d
            }
          }
          return ""
        }
      }
      return h.replace(new RegExp(this, k), j)
    },
    insertAt: function (a, b, c) {
      if (instanceOf(b, RegExp)) {
        arguments[1] = b.source
      }
      return base(this, arguments)
    },
    test: function (a) {
      return this.exec(a) != a
    },
    toString: function () {
      var e = 0;
      return "(" + this.map(function (c) {
        var d = String(c).replace(_16, function (a, b) {
          return "\\" + (1 + Number(b) + e)
        });
        e += c.length + 1;
        return d
      }).join(")|(") + ")"
    }
  },
  {
    IGNORE: "$0",
    init: function () {
      forEach("add,get,has,put,remove".split(","), function (b) {
        _22(this, b, function (a) {
          if (a && a.source) {
            arguments[0] = a.source
          }
          return base(this, arguments)
        })
      },
      this.prototype)
    },
    Item: {
      constructor: function (a, b) {
        a = (a && a.source) ? a.source : String(a);
        if (typeof b == "number") b = String(b);
        else if (b == null) b = "";
        if (typeof b == "string" && _20.test(b)) {
          if (_21.test(b)) {
            b = parseInt(b.slice(1))
          } else {
            var Q = /'/.test(b.replace(/\\./g, "")) ? '"' : "'";
            b = b.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\$(\d+)/g, Q + "+(arguments[$1]||" + Q + Q + ")+" + Q);
            b = new Function("return " + Q + b.replace(/(['"])\1\+(.*)\+\1\1$/, "$1") + Q)
          }
        }
        this.length = RegGrp.count(a);
        this.replacement = b;
        this.toString = K(a)
      },
      length: 0,
      replacement: ""
    },
    count: function (a) {
      a = String(a).replace(_17, "").replace(_18, "");
      return match(a, _19).length
    }
  });
  var JavaScript = {
    name: "JavaScript",
    version: base2.version,
    exports: "Array2, Date2, String2",
    namespace: "",
    bind: function (c) {
      forEach(this.exports.match(/\w+/g), function (a) {
        var b = a.slice(0, -1);
        extend(c[b], this[a]);
        this[a](c[b].prototype)
      },
      this)
    }
  };
  if ((new Date).getYear() > 1900) {
    Date.prototype.getYear = function () {
      return this.getFullYear() - 1900
    };
    Date.prototype.setYear = function (a) {
      return this.setFullYear(a + 1900)
    }
  }
  Function.prototype.prototype = {};
  if ("".replace(/^/, K("$$")) == "$") {
    extend(String.prototype, "replace", function (a, b) {
      if (typeof b == "function") {
        var c = b;
        b = function () {
          return String(c.apply(null, arguments)).split("$").join("$$")
        }
      }
      return this.base(a, b)
    })
  }
  var Array2 = _23(Array, Array, "concat,join,pop,push,reverse,shift,slice,sort,splice,unshift", [Enumerable, {
    combine: function (d, e) {
      if (!e) e = d;
      return this.reduce(d, function (a, b, c) {
        a[b] = e[c];
        return a
      },
      {})
    },
    contains: function (a, b) {
      return this.indexOf(a, b) != -1
    },
    copy: function (a) {
      var b = this.slice(a);
      if (!b.swap) this(b);
      return b
    },
    flatten: function (c) {
      return this.reduce(c, function (a, b) {
        if (this.like(b)) {
          this.reduce(b, arguments.callee, a, this)
        } else {
          a.push(b)
        }
        return a
      },
      [], this)
    },
    forEach: _24,
    indexOf: function (a, b, c) {
      var d = a.length;
      if (c == null) {
        c = 0
      } else if (c < 0) {
        c = Math.max(0, d + c)
      }
      for (var i = c; i < d; i++) {
        if (a[i] === b) return i
      }
      return -1
    },
    insertAt: function (a, b, c) {
      this.splice(a, b, 0, c);
      return c
    },
    item: function (a, b) {
      if (b < 0) b += a.length;
      return a[b]
    },
    lastIndexOf: function (a, b, c) {
      var d = a.length;
      if (c == null) {
        c = d - 1
      } else if (from < 0) {
        c = Math.max(0, d + c)
      }
      for (var i = c; i >= 0; i--) {
        if (a[i] === b) return i
      }
      return -1
    },
    map: function (c, d, e) {
      var f = [];
      this.forEach(c, function (a, b) {
        f[b] = d.call(e, a, b, c)
      });
      return f
    },
    remove: function (a, b) {
      var c = this.indexOf(a, b);
      if (c != -1) this.removeAt(a, c);
      return b
    },
    removeAt: function (a, b) {
      return this.splice(a, b, 1)
    },
    swap: function (a, b, c) {
      var d = a[b];
      a[b] = a[c];
      a[c] = d;
      return a
    }
  }]);
  Array2.reduce = Enumerable.reduce;
  Array2.like = function (a) {
    return !! (a && typeof a == "object" && typeof a.length == "number")
  };
  var _25 = /^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;
  var _26 = {
    FullYear: 2,
    Month: 4,
    Date: 6,
    Hours: 8,
    Minutes: 10,
    Seconds: 12,
    Milliseconds: 14
  };
  var _27 = {
    Hectomicroseconds: 15,
    UTC: 16,
    Sign: 17,
    Hours: 18,
    Minutes: 20
  };
  var _28 = /(((00)?:0+)?:0+)?\.0+$/;
  var _29 = /(T[0-9:.]+)$/;
  var Date2 = _23(Date, function (a, b, c, h, m, s, d) {
    switch (arguments.length) {
    case 0:
      return new Date;
    case 1:
      return new Date(a);
    default:
      return new Date(a, b, arguments.length == 2 ? 1 : c, h || 0, m || 0, s || 0, d || 0)
    }
  },
  "", [{
    toISOString: function (c) {
      var d = "####-##-##T##:##:##.###";
      for (var e in _26) {
        d = d.replace(/#+/, function (a) {
          var b = c["getUTC" + e]();
          if (e == "Month") b++;
          return ("000" + b).slice(-a.length)
        })
      }
      return d.replace(_28, "").replace(_29, "$1Z")
    }
  }]);
  Date2.now = function () {
    return (new Date).valueOf()
  };
  Date2.parse = function (a, b) {
    if (arguments.length > 1) {
      assertType(b, "number", "defaultDate should be of type 'number'.")
    }
    var c = String(a).match(_25);
    if (c) {
      if (c[_26.Month]) c[_26.Month]--;
      if (c[_27.Hectomicroseconds] >= 5) c[_26.Milliseconds]++;
      var d = new Date(b || 0);
      var e = c[_27.UTC] || c[_27.Hours] ? "UTC" : "";
      for (var f in _26) {
        var i = c[_26
          [f]];
        if (!i) continue;
        d["set" + e + f](i);
        if (d["get" + e + f]() != c[_26
          [f]]) {
          return NaN
        }
      }
      if (c[_27.Hours]) {
        var g = Number(c[_27.Sign] + c[_27.Hours]);
        var h = Number(c[_27.Sign] + (c[_27.Minutes] || 0));
        d.setUTCMinutes(d.getUTCMinutes() + (g * 60) + h)
      }
      return d.valueOf()
    } else {
      return Date.parse(a)
    }
  };
  var String2 = _23(String, function (a) {
    return new String(arguments.length == 0 ? "" : a)
  },
  "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase", [{
    trim: trim
  }]);
  function _23(c, d, e, f) {
    var g = Module.extend();
    forEach(e.match(/\w+/g), function (a) {
      g[a] = unbind(c.prototype[a])
    });
    forEach(f, g.implement, g);
    var h = function () {
      return g(this.constructor == g ? d.apply(null, arguments) : arguments[0])
    };
    h.prototype = g.prototype;
    forEach(g, function (a, b) {
      if (c[b]) {
        g[b] = c[b];
        delete g.prototype[b]
      }
      h[b] = g[b]
    });
    h.ancestor = Object;
    delete h.extend;
    if (c != Array) delete h.forEach;
    return h
  };
  function extend(a, b) {
    if (a && b) {
      if (arguments.length > 2) {
        var c = b;
        b = {};
        b[c] = arguments[2]
      }
      var d = (typeof b == "function" ? Function : Object).prototype;
      var i = _5.length,
      c;
      if (base2.__prototyping) {
        while (c = _5[--i]) {
          var f = b[c];
          if (f != d[c]) {
            if (_4.test(f)) {
              _22(a, c, f)
            } else {
              a[c] = f
            }
          }
        }
      }
      for (c in b) {
        if (d[c] === undefined) {
          var f = b[c];
          if (c.charAt(0) == "@" && detect(c.slice(1))) {
            arguments.callee(a, f);
            continue
          }
          var h = a[c];
          if (h && typeof f == "function") {
            if (f != h && (!h.method || !_11(f, h))) {
              if (f.__base || _4.test(f)) {
                _22(a, c, f)
              } else {
                a[c] = f
              }
            }
          } else {
            a[c] = f
          }
        }
      }
    }
    return a
  };
  function _11(a, b) {
    while (b) {
      if (!b.ancestor) return false;
      b = b.ancestor;
      if (b == a) return true
    }
    return false
  };
  function _22(c, d, e) {
    var f = c[d];
    function _30() {
      var a = this.base;
      this.base = f;
      var b = e.apply(this, arguments);
      this.base = a;
      return b
    };
    _30.ancestor = f;
    _30.method = e;
    _30.toString = function () {
      return String(e)
    };
    c[d] = _30
  };
  if (typeof StopIteration == "undefined") {
    StopIteration = new Error("StopIteration")
  }
  function forEach(a, b, c, d) {
    if (a == null) return;
    if (!d) {
      if (typeof a == "function" && a.call) {
        d = Function
      } else if (typeof a.forEach == "function" && a.forEach != arguments.callee) {
        a.forEach(b, c);
        return
      } else if (typeof a.length == "number") {
        _24(a, b, c);
        return
      }
    }
    _8(d || Object, a, b, c)
  };
  function _24(a, b, c) {
    if (a == null) return;
    var d = a.length,
    i;
    if (typeof a == "string") {
      for (i = 0; i < d; i++) {
        b.call(c, a.charAt(i), i, a)
      }
    } else {
      for (i = 0; i < d; i++) {
        /*@cc_on@*/
        /*@if(@_jscript_version<5.2)if(a[i]!==undefined||$Legacy.has(a,i))@else@*/
        if (i in a)
        /*@end@*/
        b.call(c, a[i], i, a)
      }
    }
  };
  function _8(g, h, j, k) {
    var l = function () {
      this.i = 1
    };
    l.prototype = {
      i: 1
    };
    var m = 0;
    for (var i in new l) m++;
    _8 = (m > 1) ?
    function (a, b, c, d) {
      var e = {};
      for (var f in b) {
        if (!e[f] && a.prototype[f] === undefined) {
          e[f] = true;
          c.call(d, b[f], f, b)
        }
      }
    } : function (a, b, c, d) {
      for (var e in b) {
        if (a.prototype[e] === undefined) {
          c.call(d, b[e], e, b)
        }
      }
    };
    _8(g, h, j, k)
  };
  function instanceOf(a, b) {
    if (typeof b != "function") {
      throw new TypeError("Invalid 'instanceOf' operand.");
    }
    if (a == null) return false;
    /*@cc_on@*/
    /*@if(@_jscript_version<5.1)if($Legacy.instanceOf(a,b))return true;@else@*/
    if (a instanceof b) return true;
    /*@end@*/
    if (Base.ancestorOf == b.ancestorOf) return false;
    var c = a.constructor;
    if (typeof c != "function") return false;
    if (Base.ancestorOf == c.ancestorOf) return b == Object;
    switch (b) {
    case Array:
      return !! (typeof a == "object" && a.join && a.splice);
    case Function:
      return !! (typeof a == "function" && a.call);
    case RegExp:
      return c.prototype.toString() == _6;
    case Date:
      return !! a.getTimezoneOffset;
    case String:
    case Number:
    case Boolean:
      return typeof a == typeof b.prototype.valueOf();
    case Object:
      return true
    }
    return false
  };
  function assert(a, b, c) {
    if (!a) {
      throw new(c || Error)(b || "Assertion failed.");
    }
  };
  function assertArity(a, b, c) {
    if (b == null) b = a.callee.length;
    if (a.length < b) {
      throw new SyntaxError(c || "Not enough arguments.");
    }
  };
  function assertType(a, b, c) {
    if (b && (typeof b == "function" ? !instanceOf(a, b) : typeof a != b)) {
      throw new TypeError(c || "Invalid type.");
    }
  };
  function assignID(a) {
    if (!a.base2ID) a.base2ID = "b2_" + counter();
    return a.base2ID
  };
  function counter() {
    return _7++
  };
  function copy(a) {
    var b = function () {};
    b.prototype = a;
    return new b
  };
  function format(c) {
    var d = arguments;
    var e = new RegExp("%([1-" + arguments.length + "])", "g");
    return String(c).replace(e, function (a, b) {
      return b < d.length ? d[b] : a
    })
  };
  function match(a, b) {
    return String(a).match(b) || []
  };
  function rescape(a) {
    return String(a).replace(_3, "\\$1")
  };
  function trim(a) {
    return String(a).replace(_1, "").replace(_2, "")
  };
  function I(i) {
    return i
  };
  function K(k) {
    return function () {
      return k
    }
  };
  function bind(a, b) {
    var c = slice(arguments, 2);
    var d = function () {
      return a.apply(b, c.concat(slice(arguments)))
    };
    d._31 = assignID(a);
    return d
  };
  function delegate(a, b) {
    return function () {
      return a.apply(b, [this].concat(slice(arguments)))
    }
  };
  function flip(a) {
    return function () {
      return a.apply(this, Array2.swap(arguments, 0, 1))
    }
  };
  function not(a) {
    return function () {
      return !a.apply(this, arguments)
    }
  };
  function partial(a) {
    var b = slice.call(arguments, 1);
    return function () {
      return a.apply(this, b.concat(slice(arguments)))
    }
  };
  function unbind(b) {
    return function (a) {
      return b.apply(a, slice(arguments, 1))
    }
  };
  base2 = new Package(this, base2);
  eval(this.exports);
  base2.extend = extend;
  forEach(Enumerable, function (a, b) {
    if (!Module[b]) base2.addName(b, bind(a, Enumerable))
  });
  JavaScript = new Package(this, JavaScript);
  eval(this.exports)
};
new
function (_) {
  var DOM = new base2.Package(this, {
    name: "DOM",
    version: "1.0 (beta 1)",
    exports: "Interface, Binding, Node, Document, Element, AbstractView, Event, EventTarget, DocumentEvent, " + "NodeSelector, DocumentSelector, ElementSelector, StaticNodeList, " + "ViewCSS, HTMLDocument, HTMLElement, Selector, Traversal, XPathParser",
    bind: function (a) {
      if (a && a.nodeType) {
        var b = assignID(a);
        if (!arguments.callee[b]) {
          switch (a.nodeType) {
          case 1:
            if (typeof a.className == "string") {
              (HTMLElement.bindings[a.tagName] || HTMLElement).bind(a)
            } else {
              Element.bind(a)
            }
            break;
          case 9:
            if (a.writeln) {
              HTMLDocument.bind(a)
            } else {
              Document.bind(a)
            }
            break;
          default:
            Node.bind(a)
          }
          arguments.callee[b] = true
        }
      }
      return a
    },
    "@MSIE5.+win": {
      bind: function (a) {
        if (a && a.writeln) {
          a.nodeType = 9
        }
        return this.base(a)
      }
    }
  });
  eval(this.imports);
  var _32 = detect("MSIE");
  var _33 = detect("MSIE5");
  if (detect("MSIE[56].+win") && !detect("SV1")) {
    var closures = {};
    extend(base2, "bind", function (b, c) {
      if (!c || c.nodeType != 1) {
        return this.base(b, c)
      }
      var d = c.uniqueID;
      var e = assignID(b);
      closures[e] = b;
      b = null;
      c = null;
      if (!closures[d]) closures[d] = {};
      var f = closures[d][e];
      if (f) return f;
      var g = function () {
        var a = document.all[d];
        return a ? closures[e].apply(a, arguments) : undefined
      };
      g._31 = e;
      closures[d][e] = g;
      return g
    });
    attachEvent("onunload", function () {
      closures = null
    })
  }
  var Interface = Module.extend(null, {
    implement: function (c) {
      if (typeof c == "object") {
        forEach(c, function (a, b) {
          if (b.charAt(0) == "@") {
            forEach(a, arguments.callee, this)
          } else if (!this[b] && typeof a == "function") {
            this.createDelegate(b, a.length)
          }
        },
        this)
      }
      return this.base(c)
    },
    createDelegate: function (a, b) {
      if (!this[a]) {
        var c = "var fn=function _%1(%2){%3.base=%3.%1.ancestor;var m=%3.base?'base':'%1';return %3[m](%4)}";
        var d = "abcdefghij".split("").slice(-b);
        eval(format(c, a, d, d[0], d.slice(1)));
        this[a] = fn
      }
    }
  });
  var Binding = Interface.extend(null, {
    bind: function (c) {
      forEach(this.prototype, function (a, b) {
        if (typeof c[b] == "undefined") {
          c[b] = a
        } else {
          try {
            extend(c, b, a)
          } catch(error) {}
        }
      });
      return c
    }
  });
  var Node = Binding.extend({
    "@!(element.compareDocumentPosition)": {
      compareDocumentPosition: function (a, b) {
        if (Traversal.contains(a, b)) {
          return 4 | 16
        } else if (Traversal.contains(b, a)) {
          return 2 | 8
        }
        var c = _34(a);
        var d = _34(b);
        if (c < d) {
          return 4
        } else if (c > d) {
          return 2
        }
        return 0
      }
    }
  });
  var _34 = document.documentElement.sourceIndex ?
  function (a) {
    return a.sourceIndex
  } : function (a) {
    var b = 0;
    while (a) {
      b = Traversal.getNodeIndex(a) + "." + b;
      a = a.parentNode
    }
    return b
  };
  var Document = Node.extend(null, {
    bind: function (b) {
      extend(b, "createElement", function (a) {
        return DOM.bind(this.base(a))
      });
      AbstractView.bind(b.defaultView);
      if (b != window.document) new DOMContentLoadedEvent(b);
      return this.base(b)
    },
    "@!(document.defaultView)": {
      bind: function (a) {
        a.defaultView = Traversal.getDefaultView(a);
        return this.base(a)
      }
    }
  });
  var _35 = /^(href|src|type|value)$/;
  var _36 = {
    "class": "className",
    "for": "htmlFor"
  };
  var Element = Node.extend({
    "@MSIE.+win": {
      getAttribute: function (a, b, c) {
        if (a.className === undefined) {
          return this.base(a, b)
        }
        var d = _37(a, b);
        if (d && d.specified) {
          if (_35.test(b)) {
            return this.base(a, b, 2)
          } else if (b == "style") {
            return a.style.cssText
          } else {
            return d.nodeValue
          }
        }
        return null
      },
      setAttribute: function (a, b, c) {
        if (a.className === undefined) {
          this.base(a, b, c)
        } else if (b == "style") {
          a.style.cssText = c
        } else {
          this.base(a, _36[b] || b, String(c))
        }
      }
    },
    "@!(element.hasAttribute)": {
      hasAttribute: function (a, b) {
        return this.getAttribute(a, b) != null
      }
    }
  });
  extend(Element.prototype, "cloneNode", function (a) {
    var b = this.base(a || false);
    b.base2ID = undefined;
    return b
  });
  if (_32) {
    var names = "colSpan,rowSpan,vAlign,dateTime,accessKey,tabIndex,encType,maxLength,readOnly,longDesc";
    extend(_36, Array2.combine(names.toLowerCase().split(","), names.split(",")));
    var _37 = _33 ?
    function (a, b) {
      return a.attributes[b] || a.attributes[_36
        [b.toLowerCase()]]
    } : function (a, b) {
      return a.getAttributeNode(b)
    }
  }
  var TEXT = _32 ? "innerText" : "textContent";
  var Traversal = Module.extend({
    getDefaultView: function (a) {
      return this.getDocument(a).defaultView
    },
    getNextElementSibling: function (a) {
      while (a && (a = a.nextSibling) && !this.isElement(a)) continue;
      return a
    },
    getNodeIndex: function (a) {
      var b = 0;
      while (a && (a = a.previousSibling)) b++;
      return b
    },
    getOwnerDocument: function (a) {
      return a.ownerDocument
    },
    getPreviousElementSibling: function (a) {
      while (a && (a = a.previousSibling) && !this.isElement(a)) continue;
      return a
    },
    getTextContent: function (a) {
      return a[TEXT]
    },
    isEmpty: function (a) {
      a = a.firstChild;
      while (a) {
        if (a.nodeType == 3 || this.isElement(a)) return false;
        a = a.nextSibling
      }
      return true
    },
    setTextContent: function (a, b) {
      return a[TEXT] = b
    },
    "@MSIE": {
      getDefaultView: function (a) {
        return this.getDocument(a).parentWindow
      },
      "@MSIE5": {
        getOwnerDocument: function (a) {
          return a.ownerDocument || a.document
        }
      }
    }
  },
  {
    contains: function (a, b) {
      while (b && (b = b.parentNode) && a != b) continue;
      return !! b
    },
    getDocument: function (a) {
      return this.isDocument(a) ? a : this.getOwnerDocument(a)
    },
    isDocument: function (a) {
      return !! (a && a.documentElement)
    },
    isElement: function (a) {
      return !! (a && a.nodeType == 1)
    },
    "@(element.contains)": {
      contains: function (a, b) {
        return a != b && (this.isDocument(a) ? a == this.getOwnerDocument(b) : a.contains(b))
      }
    },
    "@MSIE5": {
      isElement: function (a) {
        return !! (a && a.nodeType == 1 && a.tagName != "!")
      }
    }
  });
  var AbstractView = Binding.extend();
  var Event = Binding.extend({
    "@!(document.createEvent)": {
      initEvent: function (a, b, c, d) {
        a.type = b;
        a.bubbles = c;
        a.cancelable = d;
        a.timeStamp = new Date().valueOf()
      },
      "@MSIE": {
        initEvent: function (a, b, c, d) {
          this.base(a, b, c, d);
          a.cancelBubble = !a.bubbles
        },
        preventDefault: function (a) {
          if (a.cancelable !== false) {
            a.returnValue = false
          }
        },
        stopPropagation: function (a) {
          a.cancelBubble = true
        }
      }
    }
  },
  {
    "@!(document.createEvent)": {
      "@MSIE": {
        "@Mac": {
          bind: function (a) {
            return this.base(extend(copy(a), {
              preventDefault: function () {
                if (this.cancelable !== false) {
                  this.returnValue = false
                }
              }
            }))
          }
        },
        "@Windows": {
          bind: function (a) {
            if (!a.timeStamp) {
              a.bubbles = !!_38[a.type];
              a.cancelable = !!_39[a.type];
              a.timeStamp = new Date().valueOf()
            }
            if (!a.target) {
              a.target = a.srcElement
            }
            a.relatedTarget = a[(a.type == "mouseout" ? "to" : "from") + "Element"];
            return this.base(a)
          }
        }
      }
    }
  });
  if (_32) {
    var _38 = "abort,error,select,change,resize,scroll";
    var _39 = "click,mousedown,mouseup,mouseover,mousemove,mouseout,keydown,keyup,submit,reset";
    _38 = Array2.combine((_38 + "," + _39).split(","));
    _39 = Array2.combine(_39.split(","))
  }
  var EventTarget = Interface.extend({
    "@!(element.addEventListener)": {
      addEventListener: function (a, b, c, d) {
        var e = assignID(a);
        var f = c._31 || assignID(c);
        var g = _40[e];
        if (!g) g = _40[e] = {};
        var h = g[b];
        var i = a["on" + b];
        if (!h) {
          h = g[b] = {};
          if (i) h[0] = i
        }
        h[f] = c;
        if (i !== undefined) {
          a["on" + b] = delegate(_40.handleEvent)
        }
      },
      dispatchEvent: function (a, b) {
        return _40.handleEvent(a, b)
      },
      removeEventListener: function (a, b, c, d) {
        var e = _40[a.base2ID];
        if (e && e[b]) {
          delete e[b][c.base2ID]
        }
      },
      "@MSIE.+win": {
        addEventListener: function (a, b, c, d) {
          if (typeof c == "function") {
            c = bind(c, a)
          }
          this.base(a, b, c, d)
        },
        dispatchEvent: function (a, b) {
          b.target = a;
          try {
            return a.fireEvent(b.type, b)
          } catch(error) {
            return this.base(a, b)
          }
        }
      }
    }
  });
  var _40 = new Base({
    handleEvent: function (a, b) {
      var c = true;
      var d = _40[a.base2ID];
      if (d) {
        b = Event.bind(b);
        var e = d[b.type];
        for (var i in e) {
          var f = e[i];
          if (f.handleEvent) {
            var g = f.handleEvent(b)
          } else {
            g = f.call(a, b)
          }
          if (g === false || b.returnValue === false) c = false
        }
      }
      return c
    },
    "@MSIE": {
      handleEvent: function (a, b) {
        if (a.Infinity) {
          a = a.document.parentWindow;
          if (!b) b = a.event
        }
        return this.base(a, b || Traversal.getDefaultView(a).event)
      }
    }
  });
  var DocumentEvent = Interface.extend({
    "@!(document.createEvent)": {
      createEvent: function (a, b) {
        return Event.bind({})
      },
      "@(document.createEventObject)": {
        createEvent: function (a, b) {
          return Event.bind(a.createEventObject())
        }
      }
    },
    "@(document.createEvent)": {
      "@!(document.createEvent('Events'))": {
        createEvent: function (a, b) {
          return this.base(a, b == "Events" ? "UIEvents" : b)
        }
      }
    }
  });
  var DOMContentLoadedEvent = Base.extend({
    constructor: function (b) {
      var c = false;
      this.fire = function () {
        if (!c) {
          c = true;
          setTimeout(function () {
            var a = DocumentEvent.createEvent(b, "Events");
            Event.initEvent(a, "DOMContentLoaded", false, false);
            EventTarget.dispatchEvent(b, a)
          },
          1)
        }
      };
      EventTarget.addEventListener(b, "DOMContentLoaded", function () {
        c = true
      },
      false);
      EventTarget.addEventListener(Traversal.getDefaultView(b), "load", this.fire, false)
    },
    "@(attachEvent)": {
      constructor: function () {
        this.base(document);
        Traversal.getDefaultView(document).attachEvent("onload", this.fire)
      }
    },
    "@MSIE.+win": {
      constructor: function (a) {
        this.base(a);
        if (a.readyState != "complete") {
          var b = this;
          a.write("<script id=__ready defer src=//:><\/script>");
          a.all.__ready.onreadystatechange = function () {
            if (this.readyState == "complete") {
              this.removeNode();
              b.fire()
            }
          }
        }
      }
    },
    "@KHTML": {
      constructor: function (a) {
        this.base(a);
        if (a.readyState != "complete") {
          var b = this;
          var c = setInterval(function () {
            if (/loaded|complete/.test(a.readyState)) {
              clearInterval(c);
              b.fire()
            }
          },
          100)
        }
      }
    }
  });
  new DOMContentLoadedEvent(document);
  Document.implement(DocumentEvent);
  Document.implement(EventTarget);
  Element.implement(EventTarget);
  var _41 = /^\d+(px)?$/i;
  var _42 = /(width|height|top|bottom|left|right|fontSize)$/;
  var _43 = /^(color|backgroundColor)$/;
  var ViewCSS = Interface.extend({
    "@!(document.defaultView.getComputedStyle)": {
      "@MSIE": {
        getComputedStyle: function (b, c, d) {
          var e = c.currentStyle;
          var f = {
            getPropertyValue: function (a) {
              return this[ViewCSS.toCamelCase(a)]
            }
          };
          for (var i in e) {
            if (_42.test(i)) {
              f[i] = _44(c, f[i]) + "px"
            } else if (_43.test(i)) {
              f[i] = _45(c, i == "color" ? "ForeColor" : "BackColor")
            } else {
              f[i] = e[i]
            }
          }
          return f
        }
      }
    }
  },
  {
    toCamelCase: function (c) {
      return c.replace(/\-([a-z])/g, function (a, b) {
        return b.toUpperCase()
      })
    }
  });
  function _44(a, b) {
    if (_41.test(b)) return parseInt(b);
    var c = a.style.left;
    var d = a.runtimeStyle.left;
    a.runtimeStyle.left = a.currentStyle.left;
    a.style.left = b || 0;
    b = a.style.pixelLeft;
    a.style.left = c;
    a.runtimeStyle.left = d;
    return b
  };
  function _45(a, b) {
    var c = a.document.body.createTextRange();
    c.moveToElementText(a);
    var d = c.queryCommandValue(b);
    return format("rgb(%1,%2,%3)", d & 0xff, (d & 0xff00) >> 8, (d & 0xff0000) >> 16)
  };
  AbstractView.implement(ViewCSS);
  var NodeSelector = Interface.extend({
    "@!(element.querySelector)": {
      querySelector: function (a, b) {
        return new Selector(b).exec(a, 1)
      },
      querySelectorAll: function (a, b) {
        return new Selector(b).exec(a)
      }
    }
  });
  extend(NodeSelector.prototype, {
    querySelector: function (a) {
      return DOM.bind(this.base(a))
    },
    querySelectorAll: function (b) {
      return extend(this.base(b), "item", function (a) {
        return DOM.bind(this.base(a))
      })
    }
  });
  var DocumentSelector = NodeSelector.extend();
  var ElementSelector = NodeSelector.extend({
    "@!(element.matchesSelector)": {
      matchesSelector: function (a, b) {
        return new Selector(b).test(a)
      }
    }
  });
  var StaticNodeList = Base.extend({
    constructor: function (b) {
      b = b || [];
      this.length = b.length;
      this.item = function (a) {
        return b[a]
      }
    },
    length: 0,
    forEach: function (a, b) {
      for (var i = 0; i < this.length; i++) {
        a.call(b, this.item(i), i, this)
      }
    },
    item: Undefined,
    "@(XPathResult)": {
      constructor: function (b) {
        if (b && b.snapshotItem) {
          this.length = b.snapshotLength;
          this.item = function (a) {
            return b.snapshotItem(a)
          }
        } else this.base(b)
      }
    }
  });
  StaticNodeList.implement(Enumerable);
  var CSSParser = RegGrp.extend({
    constructor: function (a) {
      this.base(a);
      this.cache = {};
      this.sorter = new RegGrp;
      this.sorter.add(/:not\([^)]*\)/, RegGrp.IGNORE);
      this.sorter.add(/([ >](\*|[\w-]+))([^: >+~]*)(:\w+-child(\([^)]+\))?)([^: >+~]*)/, "$1$3$6$4")
    },
    cache: null,
    ignoreCase: true,
    escape: function (b) {
      var c = /'/g;
      var d = this._46 = [];
      return this.optimise(this.format(String(b).replace(CSSParser.ESCAPE, function (a) {
        d.push(a.slice(1, -1).replace(c, "\\'"));
        return "\x01" + d.length
      })))
    },
    format: function (a) {
      return a.replace(CSSParser.WHITESPACE, "$1").replace(CSSParser.IMPLIED_SPACE, "$1 $2").replace(CSSParser.IMPLIED_ASTERISK, "$1*$2")
    },
    optimise: function (a) {
      return this.sorter.exec(a.replace(CSSParser.WILD_CARD, ">* "))
    },
    parse: function (a) {
      return this.cache[a] || (this.cache[a] = this.unescape(this.exec(this.escape(a))))
    },
    unescape: function (c) {
      var d = this._46;
      return c.replace(/\x01(\d+)/g, function (a, b) {
        return d[b - 1]
      })
    }
  },
  {
    ESCAPE: /'(\\.|[^'\\])*'|"(\\.|[^"\\])*"/g,
    IMPLIED_ASTERISK: /([\s>+~,]|[^(]\+|^)([#.:@])/g,
    IMPLIED_SPACE: /(^|,)([^\s>+~])/g,
    WHITESPACE: /\s*([\s>+~(),]|^|$)\s*/g,
    WILD_CARD: /\s\*\s/g,
    _47: function (c, d, e, f, g, h, i, j) {
      f = /last/i.test(c) ? f + "+1-" : "";
      if (!isNaN(d)) d = "0n+" + d;
      else if (d == "even") d = "2n";
      else if (d == "odd") d = "2n+1";
      d = d.split(/n\+?/);
      var a = d[0] ? (d[0] == "-") ? -1 : parseInt(d[0]) : 1;
      var b = parseInt(d[1]) || 0;
      var k = a < 0;
      if (k) {
        a = -a;
        if (a == 1) b++
      }
      var l = format(a == 0 ? "%3%7" + (f + b) : "(%4%3-%2)%6%1%70%5%4%3>=%2", a, b, e, f, h, i, j);
      if (k) l = g + "(" + l + ")";
      return l
    }
  });
  var XPathParser = CSSParser.extend({
    constructor: function () {
      this.base(XPathParser.rules);
      this.sorter.putAt(1, "$1$4$3$6")
    },
    escape: function (a) {
      return this.base(a).replace(/,/g, "\x02")
    },
    unescape: function (a) {
      return this.base(a.replace(/\[self::\*\]/g, "").replace(/(^|\x02)\//g, "$1./").replace(/\x02/g, " | "))
    },
    "@opera": {
      unescape: function (a) {
        return this.base(a.replace(/last\(\)/g, "count(preceding-sibling::*)+count(following-sibling::*)+1"))
      }
    }
  },
  {
    init: function () {
      this.values.attributes[""] = "[@$1]";
      forEach(this.types, function (a, b) {
        forEach(this.values[b], a, this.rules)
      },
      this)
    },
    optimised: {
      pseudoClasses: {
        "first-child": "[1]",
        "last-child": "[last()]",
        "only-child": "[last()=1]"
      }
    },
    rules: extend({},
    {
      "@!KHTML": {
        "(^|\\x02) (\\*|[\\w-]+)#([\\w-]+)": "$1id('$3')[self::$2]",
        "([ >])(\\*|[\\w-]+):([\\w-]+-child(\\(([^)]+)\\))?)": function (a, b, c, d, e, f) {
          var g = (b == " ") ? "//*" : "/*";
          if (/^nth/i.test(d)) {
            g += _47(d, f, "position()")
          } else {
            g += XPathParser.optimised.pseudoClasses[d]
          }
          return g + "[self::" + c + "]"
        }
      }
    }),
    types: {
      identifiers: function (a, b) {
        this[rescape(b) + "([\\w-]+)"] = a
      },
      combinators: function (a, b) {
        this[rescape(b) + "(\\*|[\\w-]+)"] = a
      },
      attributes: function (a, b) {
        this["\\[([\\w-]+)\\s*" + rescape(b) + "\\s*([^\\]]*)\\]"] = a
      },
      pseudoClasses: function (a, b) {
        this[":" + b.replace(/\(\)$/, "\\(([^)]+)\\)")] = a
      }
    },
    values: {
      identifiers: {
        "#": "[@id='$1'][1]",
        ".": "[contains(concat(' ',@class,' '),' $1 ')]"
      },
      combinators: {
        " ": "/descendant::$1",
        ">": "/child::$1",
        "+": "/following-sibling::*[1][self::$1]",
        "~": "/following-sibling::$1"
      },
      attributes: {
        "*=": "[contains(@$1,'$2')]",
        "^=": "[starts-with(@$1,'$2')]",
        "$=": "[substring(@$1,string-length(@$1)-string-length('$2')+1)='$2']",
        "~=": "[contains(concat(' ',@$1,' '),' $2 ')]",
        "|=": "[contains(concat('-',@$1,'-'),'-$2-')]",
        "!=": "[not(@$1='$2')]",
        "=": "[@$1='$2']"
      },
      pseudoClasses: {
        "empty": "[not(child::*) and not(text())]",
        "first-child": "[not(preceding-sibling::*)]",
        "last-child": "[not(following-sibling::*)]",
        "not()": _48,
        "nth-child()": _47,
        "nth-last-child()": _47,
        "only-child": "[not(preceding-sibling::*) and not(following-sibling::*)]",
        "root": "[not(parent::*)]"
      }
    },
    "@opera": {
      init: function () {
        this.optimised.pseudoClasses["last-child"] = this.values.pseudoClasses["last-child"];
        this.optimised.pseudoClasses["only-child"] = this.values.pseudoClasses["only-child"];
        this.base()
      }
    }
  });
  var _49 = new XPathParser;
  function _48(a, b) {
    return "[not(" + _49.exec(trim(b)).replace(/\[1\]/g, "").replace(/^(\*|[\w-]+)/, "[self::$1]").replace(/\]\[/g, " and ").slice(1, -1) + ")]"
  };
  function _47(a, b, c) {
    return "[" + CSSParser._47(a, b, c || "count(preceding-sibling::*)+1", "last()", "not", " and ", " mod ", "=") + "]"
  };
  var _50 = ":(checked|disabled|enabled|contains)|^(#[\\w-]+\\s*)?\\w+$";
  if (detect("KHTML")) {
    if (detect("WebKit5")) {
      _50 += "|nth\\-|,"
    } else {
      _50 = "."
    }
  }
  _50 = new RegExp(_50);
  var _51;
  var Selector = Base.extend({
    constructor: function (a) {
      this.toString = K(trim(a))
    },
    exec: function (a, b) {
      return Selector.parse(this)(a, b)
    },
    test: function (a) {
      var b = new Selector(this + "[-base2-test]");
      a.setAttribute("-base2-test", true);
      var c = b.exec(Traversal.getOwnerDocument(a), true);
      a.removeAttribute("-base2-test");
      return c == a
    },
    toXPath: function () {
      return Selector.toXPath(this)
    },
    "@(XPathResult)": {
      exec: function (a, b) {
        if (_50.test(this)) {
          return this.base(a, b)
        }
        var c = Traversal.getDocument(a);
        var d = b ? 9 : 7;
        var e = c.evaluate(this.toXPath(), a, null, d, null);
        return b ? e.singleNodeValue : e
      }
    },
    "@MSIE": {
      exec: function (a, b) {
        if (typeof a.selectNodes != "undefined" && !_50.test(this)) {
          var c = b ? "selectSingleNode" : "selectNodes";
          return a[c](this.toXPath())
        }
        return this.base(a, b)
      }
    },
    "@(true)": {
      exec: function (a, b) {
        try {
          var c = this.base(a || document, b)
        } catch(error) {
          throw new SyntaxError(format("'%1' is not a valid CSS selector.", this));
        }
        return b ? c : new StaticNodeList(c)
      }
    }
  },
  {
    toXPath: function (a) {
      if (!_51) _51 = new XPathParser;
      return _51.parse(a)
    }
  });
  new
  function (_) {
    var _52 = {
      "=": "%1=='%2'",
      "!=": "%1!='%2'",
      "~=": /(^| )%1( |$)/,
      "|=": /^%1(-|$)/,
      "^=": /^%1/,
      "$=": /%1$/,
      "*=": /%1/
    };
    _52[""] = "%1!=null";
    var _53 = {
      "checked": "e%1.checked",
      "contains": "e%1[TEXT].indexOf('%2')!=-1",
      "disabled": "e%1.disabled",
      "empty": "Traversal.isEmpty(e%1)",
      "enabled": "e%1.disabled===false",
      "first-child": "!Traversal.getPreviousElementSibling(e%1)",
      "last-child": "!Traversal.getNextElementSibling(e%1)",
      "only-child": "!Traversal.getPreviousElementSibling(e%1)&&!Traversal.getNextElementSibling(e%1)",
      "root": "e%1==Traversal.getDocument(e%1).documentElement"
    };
    var _54 = detect("(element.sourceIndex)");
    var _55 = "var p%2=0,i%2,e%2,n%2=e%1.";
    var _56 = _54 ? "e%1.sourceIndex" : "assignID(e%1)";
    var _57 = "var g=" + _56 + ";if(!p[g]){p[g]=1;";
    var _58 = "r[r.length]=e%1;if(s)return e%1;";
    var _59 = "r.sort(sorter);";
    var _60 = "fn=function(e0,s){indexed++;var r=[],p={},reg=[%1]," + "d=Traversal.getDocument(e0),c=d.body?'toUpperCase':'toString';";
    var byId = _32 ?
    function (a, b) {
      var c = a.all[b] || null;
      if (!c || c.id == b) return c;
      for (var i = 0; i < c.length; i++) {
        if (c[i].id == b) return c[i]
      }
      return null
    } : function (a, b) {
      return a.getElementById(b)
    };
    var indexed = 1;
    function register(a) {
      if (a.rows) {
        a.b2_length = a.rows.length;
        a.b2_lookup = "rowIndex"
      } else if (a.cells) {
        a.b2_length = a.cells.length;
        a.b2_lookup = "cellIndex"
      } else if (a.b2_indexed != indexed) {
        var b = 0;
        var c = a.firstChild;
        while (c) {
          if (c.nodeType == 1 && c.nodeName != "!") {
            c.b2_index = ++b
          }
          c = c.nextSibling
        }
        a.b2_length = b;
        a.b2_lookup = "b2_index"
      }
      a.b2_indexed = indexed;
      return a
    };
    var sorter = _54 ?
    function (a, b) {
      return a.sourceIndex - b.sourceIndex
    } : Node.compareDocumentPosition;
    var fn;
    var reg;
    var _61;
    var _62;
    var _63;
    var _64;
    var _65 = {};
    var parser = new CSSParser({
      "^ \\*:root": function (a) {
        _62 = false;
        var b = "e%2=d.documentElement;if(Traversal.contains(e%1,e%2)){";
        return format(b, _61++, _61)
      },
      " (\\*|[\\w-]+)#([\\w-]+)": function (a, b, c) {
        _62 = false;
        var d = "var e%2=byId(d,'%4');if(e%2&&";
        if (b != "*") d += "e%2.nodeName=='%3'[c]()&&";
        d += "Traversal.contains(e%1,e%2)){";
        if (_63) d += format("i%1=n%1.length;", _63);
        return format(d, _61++, _61, b, c)
      },
      " (\\*|[\\w-]+)": function (a, b) {
        _64++;
        _62 = b == "*";
        var c = _55;
        c += (_62 && _33) ? "all" : "getElementsByTagName('%3')";
        c += ";for(i%2=0;(e%2=n%2[i%2]);i%2++){";
        return format(c, _61++, _63 = _61, b)
      },
      ">(\\*|[\\w-]+)": function (a, b) {
        var c = _32 && _63;
        _62 = b == "*";
        var d = _55;
        d += c ? "children" : "childNodes";
        if (!_62 && c) d += ".tags('%3')";
        d += ";for(i%2=0;(e%2=n%2[i%2]);i%2++){";
        if (_62) {
          d += "if(e%2.nodeType==1){";
          _62 = _33
        } else { if (!c) d += "if(e%2.nodeName=='%3'[c]()){"
        }
        return format(d, _61++, _63 = _61, b)
      },
      "\\+(\\*|[\\w-]+)": function (a, b) {
        var c = "";
        if (_62 && _32) c += "if(e%1.tagName!='!'){";
        _62 = false;
        c += "e%1=Traversal.getNextElementSibling(e%1);if(e%1";
        if (b != "*") c += "&&e%1.nodeName=='%2'[c]()";
        c += "){";
        return format(c, _61, b)
      },
      "~(\\*|[\\w-]+)": function (a, b) {
        var c = "";
        if (_62 && _32) c += "if(e%1.tagName!='!'){";
        _62 = false;
        _64 = 2;
        c += "while(e%1=e%1.nextSibling){if(e%1.b2_adjacent==indexed)break;if(";
        if (b == "*") {
          c += "e%1.nodeType==1";
          if (_33) c += "&&e%1.tagName!='!'"
        } else c += "e%1.nodeName=='%2'[c]()";
        c += "){e%1.b2_adjacent=indexed;";
        return format(c, _61, b)
      },
      "#([\\w-]+)": function (a, b) {
        _62 = false;
        var c = "if(e%1.id=='%2'){";
        if (_63) c += format("i%1=n%1.length;", _63);
        return format(c, _61, b)
      },
      "\\.([\\w-]+)": function (a, b) {
        _62 = false;
        reg.push(new RegExp("(^|\\s)" + rescape(b) + "(\\s|$)"));
        return format("if(e%1.className&&reg[%2].test(e%1.className)){", _61, reg.length - 1)
      },
      ":not\\((\\*|[\\w-]+)?([^)]*)\\)": function (a, b, c) {
        var d = (b && b != "*") ? format("if(e%1.nodeName=='%2'[c]()){", _61, b) : "";
        d += parser.exec(c);
        return "if(!" + d.slice(2, -1).replace(/\)\{if\(/g, "&&") + "){"
      },
      ":nth(-last)?-child\\(([^)]+)\\)": function (a, b, c) {
        _62 = false;
        b = format("e%1.parentNode.b2_length", _61);
        var d = "if(p%1!==e%1.parentNode)p%1=register(e%1.parentNode);";
        d += "var i=e%1[p%1.b2_lookup];if(";
        return format(d, _61) + CSSParser._47(a, c, "i", b, "!", "&&", "%", "==") + "){"
      },
      ":([\\w-]+)(\\(([^)]+)\\))?": function (a, b, c, d) {
        return "if(" + format(_53[b] || "throw", _61, d || "") + "){"
      },
      "\\[([\\w-]+)\\s*([^=]?=)?\\s*([^\\]]*)\\]": function (a, b, c, d) {
        var e = _36[b] || b;
        if (c) {
          var f = "e%1.getAttribute('%2',2)";
          if (!_35.test(b)) {
            f = "e%1.%3||" + f
          }
          b = format("(" + f + ")", _61, b, e)
        } else {
          b = format("Element.getAttribute(e%1,'%2')", _61, b)
        }
        var g = _52[c || ""];
        if (instanceOf(g, RegExp)) {
          reg.push(new RegExp(format(g.source, rescape(parser.unescape(d)))));
          g = "reg[%2].test(%1)";
          d = reg.length - 1
        }
        return "if(" + format(g, b, d) + "){"
      }
    });
    Selector.parse = function (a) {
      if (!_65[a]) {
        reg = [];
        fn = "";
        var b = parser.escape(a).split(",");
        for (var i = 0; i < b.length; i++) {
          _62 = _61 = _63 = 0;
          _64 = b.length > 1 ? 2 : 0;
          var c = parser.exec(b[i]) || "throw;";
          if (_62 && _32) {
            c += format("if(e%1.tagName!='!'){", _61)
          }
          var d = (_64 > 1) ? _57 : "";
          c += format(d + _58, _61);
          c += Array(match(c, /\{/g).length + 1).join("}");
          fn += c
        }
        if (b.length > 1) fn += _59;
        eval(format(_60, reg) + parser.unescape(fn) + "return s?null:r}");
        _65[a] = fn
      }
      return _65[a]
    }
  };
  Document.implement(DocumentSelector);
  Element.implement(ElementSelector);
  var HTMLDocument = Document.extend(null, {
    "@(document.activeElement===undefined)": {
      bind: function (b) {
        b.activeElement = null;
        EventTarget.addEventListener(b, "focus", function (a) {
          b.activeElement = a.target
        },
        false);
        return this.base(b)
      }
    }
  });
  var HTMLElement = Element.extend({
    addClass: function (a, b) {
      if (!this.hasClass(a, b)) {
        a.className += (a.className ? " " : "") + b
      }
    },
    hasClass: function (a, b) {
      var c = new RegExp("(^|\\s)" + b + "(\\s|$)");
      return c.test(a.className)
    },
    removeClass: function (a, b) {
      var c = new RegExp("(^|\\s)" + b + "(\\s|$)", "g");
      a.className = a.className.replace(c, "$2")
    },
    toggleClass: function (a, b) {
      if (this.hasClass(a, b)) {
        this.removeClass(a, b)
      } else {
        this.addClass(a, b)
      }
    }
  },
  {
    bindings: {},
    tags: "*",
    extend: function () {
      var b = base(this, arguments);
      var c = (b.tags || "").toUpperCase().split(",");
      forEach(c, function (a) {
        HTMLElement.bindings[a] = b
      });
      return b
    },
    "@!(element.ownerDocument)": {
      bind: function (a) {
        a.ownerDocument = Traversal.getOwnerDocument(a);
        return this.base(a)
      }
    }
  });
  eval(this.exports)
};
new
function (_) {
  var JSB = new base2.Package(this, {
    name: "JSB",
    version: "0.7",
    imports: "DOM",
    exports: "Behavior, Rule, RuleList"
  });
  eval(this.imports);
  var Behavior = Abstract.extend();
  var Call = Base.extend({
    constructor: function (a, b, c, d) {
      this.release = function () {
        b.apply(a, c)
      };
      this.rank = d || (100 + Call.list.length)
    }
  },
  {
    list: [],
    defer: function (a, b) {
      return function () {
        if (Call.list) {
          Call.list.push(new Call(this, a, arguments, b))
        } else {
          a.apply(this, arguments)
        }
      }
    },
    init: function () {
      EventTarget.addEventListener(document, "DOMContentLoaded", function () {
        if (Call.list) {
          DOM.bind(document);
          Call.list.sort(function (a, b) {
            return a.rank - b.rank
          });
          invoke(Call.list, "release");
          delete Call.list;
          setTimeout(function () {
            var a = DocumentEvent.createEvent(document, "Events");
            Event.initEvent(a, "ready", false, false);
            EventTarget.dispatchEvent(document, a)
          },
          1)
        }
      },
      false)
    }
  });
  var _66 = /^on[a-z]+$/;
  var Rule = Base.extend({
    constructor: function (e, f) {
      e = new Selector(e);
      if (Behavior.ancestorOf(f)) {
        f = f.prototype
      }
      var g = {},
      h = {},
      i = f.style,
      j = {};
      forEach(f, function (a, b) {
        if (b.charAt(0) == "@") {
          if (detect(b.slice(1))) {
            forEach(a, arguments.callee)
          }
        } else if (typeof a == "function" && _66.test(b)) {
          h[b.slice(2)] = a
        } else if (b != "style") {
          g[b] = a
        }
      });
      function addBehavior(a) {
        var b = assignID(a);
        if (!j[b]) {
          j[b] = true;
          DOM.bind(a);
          extend(a, g);
          extend(a.style, i);
          for (var c in h) {
            var e = a;
            var d = h[c];
            if (c.indexOf("document") == 0) {
              e = document;
              c = c.slice(8);
              d = bind(d, a)
            }
            e.addEventListener(c, d, false)
          }
        }
      };
      this.refresh = Call.defer(function () {
        e.exec(document).forEach(addBehavior)
      });
      this.toString = K(String(e));
      this.refresh()
    },
    refresh: Undefined
  });
  var RuleList = Collection.extend({
    constructor: function (a) {
      this.base(a);
      this.globalize()
    },
    globalize: Call.defer(function () {
      var e = /[^\s,]+/g;
      var f = /^#[\w-]+$/;
      forEach(this, function (c, d) {
        forEach(match(d, e), function (a) {
          if (f.test(a)) {
            var b = ViewCSS.toCamelCase(a.slice(1));
            window[b] = Document.querySelector(document, a)
          }
        })
      })
    },
    10),
    refresh: function () {
      this.invoke("refresh")
    }
  },
  {
    Item: Rule
  });
  eval(this.exports)
};
eval(base2.namespace);
eval(JavaScript.namespace);
var IGNORE = RegGrp.IGNORE;
var REMOVE = "";
var SPACE = " ";
var WORDS = /\w+/g;
var Packer = Base.extend({
  minify: function (a) {
    a = a.replace(Packer.CONTINUE, "");
    a = Packer.data.exec(a);
    a = Packer.whitespace.exec(a);
    a = Packer.clean.exec(a);
    return a
  },
  pack: function (a, b, c) {
    a = this.minify(a + "\n");
    if (c) a = this._shrinkVariables(a);
    if (b) a = this._base62Encode(a);
    return a
  },
  _base62Encode: function (b) {
    var d = new Words(b);
    var f = function (a) {
      return d.get(a).encoded
    };
    var p = this._escape(b.replace(WORDS, f));
    var a = Math.min(Math.max(d.size(), 2), 62);
    var c = d.size();
    var k = d;
    var e = Packer["ENCODE" + (a > 10 ? a > 36 ? 62 : 36 : 10)];
    var r = a > 10 ? "e(c)" : "c";
    return format(Packer.UNPACK, p, a, c, k, e, r)
  },
  _escape: function (a) {
    return a.replace(/([\\'])/g, "\\$1").replace(/[\r\n]+/g, "\\n")
  },
  _shrinkVariables: function (j) {
    var k = function (a) {
      return new RegExp(a.source, "g")
    };
    var l = [];
    var m = /^[^'"]\//;
    var n = function (a) {
      var b = "#" + l.length;
      if (m.test(a)) {
        b = a.charAt(0) + b;
        a = a.slice(1)
      }
      l.push(a);
      return b
    };
    var o = function (c) {
      return (c < 52 ? '' : arguments.callee(parseInt(c / 52))) + ((c = c % 52) > 25 ? String.fromCharCode(c + 39) : String.fromCharCode(c + 97))
    };
    var p = /(function\s*[\w$]*\s*\(\s*([^\)]*)\s*\)\s*)?(\{([^{}]*)\})/;
    var q = /var\s+/g;
    var r = /var\s+[\w$]+/g;
    var s = /\s*,\s*/;
    var t = [];
    var u = function (c, d, e) {
      if (d) {
        c = w(c);
        var f = match(c, r).join(",").replace(q, "");
        var g = Array2.combine(e.split(s).concat(f.split(s)));
        var h = 0,
        shortId;
        forEach(g, function (a) {
          a = trim(a);
          if (a && a.length > 1) {
            a = rescape(a);
            do shortId = o(h++);
            while (new RegExp("[^\\w$.]" + shortId + "[^\\w$:]").test(c));
            var b = new RegExp("([^\\w$.])" + a + "([^\\w$:])");
            while (b.test(c)) c = c.replace(k(b), "$1" + shortId + "$2");
            var b = new RegExp("([^{,\\w$.])" + a + ":", "g");
            c = c.replace(b, "$1" + shortId + ":")
          }
        })
      }
      var i = "~" + t.length + "~";
      t.push(c);
      return i
    };
    var v = /~(\d+)~/;
    var w = function (c) {
      while (v.test(c)) {
        c = c.replace(k(v), function (a, b) {
          return t[b]
        })
      }
      return c
    };
    j = Packer.data.exec(j, n);
    j = j.replace(/new function\(_\)\s*\{/g, "{;#;");
    while (p.test(j)) {
      j = j.replace(k(p), u)
    }
    j = w(j);
    j = j.replace(/\{;#;/g, "new function(_){");
    j = j.replace(/#(\d+)/g, function (a, b) {
      return l[b]
    });
    return j
  }
},
{
  CONTINUE: /\\\r?\n/g,
  ENCODE10: "String",
  ENCODE36: "function(c){return c.toString(a)}",
  ENCODE62: "function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))}",
  UNPACK: "eval(function(p,a,c,k,e,r){e=%5;if(!''.replace(/^/,String)){while(c--)r[%6]=k[c]" + "||%6;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p." + "replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('%1',%2,%3,'%4'.split('|'),0,{}))",
  init: function () {
    this.data = reduce(this.data, function (a, b, c) {
      a.put(this.javascript.exec(c), b);
      return a
    },
    new RegGrp, this);
    this.clean = this.data.union(this.clean);
    this.whitespace = this.data.union(this.whitespace)
  },
  clean: {
    "\\(\\s*;\\s*;\\s*\\)": "(;;)",
    "throw[^};]+[};]": IGNORE,
    ";+\\s*([};])": "$1"
  },
  data: {
    "STRING1": IGNORE,
    'STRING2': IGNORE,
    "CONDITIONAL": IGNORE,
    "(COMMENT1)\\n\\s*(REGEXP)?": "\n$3",
    "(COMMENT2)\\s*(REGEXP)?": " $3",
    "([\\[(\\^=,{}:;&|!*?])\\s*(REGEXP)": "$1$2"
  },
  javascript: new RegGrp({
    COMMENT1: /(\/\/|;;;)[^\n]*/.source,
    COMMENT2: /\/\*[^*]*\*+([^\/][^*]*\*+)*\//.source,
    CONDITIONAL: /\/\*@|@\*\/|\/\/@[^\n]*\n/.source,
    REGEXP: /\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/.source,
    STRING1: /'(\\.|[^'\\])*'/.source,
    STRING2: /"(\\.|[^"\\])*"/.source
  }),
  whitespace: {
    "(\\d)\\s+(\\.\\s*[a-z\\$_\\[(])": "$1 $2",
    "([+-])\\s+([+-])": "$1 $2",
    "\\b\\s+\\$\\s+\\b": " $ ",
    "\\$\\s+\\b": "$ ",
    "\\b\\s+\\$": " $",
    "\\b\\s+\\b": SPACE,
    "\\s+": REMOVE
  }
});
var Words = Collection.extend({
  constructor: function (a) {
    this.base();
    forEach(a.match(WORDS), this.add, this);
    this.encode()
  },
  add: function (a) {
    if (!this.has(a)) this.base(a);
    a = this.get(a);
    a.count++;
    return a
  },
  encode: function () {
    this.sort(function (a, b) {
      return b.count - a.count
    });
    eval("var a=62,e=" + Packer.ENCODE62);
    var c = e;
    var d = new Collection;
    var f = this.size();
    for (var i = 0; i < f; i++) {
      d.put(c(i), i)
    }
    var g = function () {
      return ""
    };
    var h = 0;
    forEach(this, function (a) {
      if (d.has(a)) {
        a.index = d.get(a);
        a.toString = g
      } else {
        while (this.has(c(h))) h++;
        a.index = h++
      }
      a.encoded = c(a.index)
    },
    this);
    this.sort(function (a, b) {
      return a.index - b.index
    })
  },
  toString: function () {
    return this.getValues().join("|")
  }
},
{
  Item: {
    constructor: function (a) {
      this.toString = function () {
        return a
      }
    },
    count: 0,
    encoded: "",
    index: -1
  }
});
var packer = new Packer;
new base2.JSB.RuleList({
  "#form": {
    ondocumentready: function () {
      this.removeClass("disabled");
      output.value = "";
      this.ready()
    },
    ready: function () {
      message.write("ready");
      input.focus()
    }
  },
  "#input,#output": {
    disabled: false,
    spellcheck: false
  },
  "#clear-all": {
    disabled: false,
    onclick: function () {
      form.filetype.value = "";
      form.filename.value = "";
      input.value = "";
      output.value = "";
      uploadScript.style.display = "";
      loadScript.style.display = "";
      uploadScript.disabled = true;
      saveScript.disabled = false;
      form.ready()
    }
  },
  "#pack-script": {
    disabled: false,
    onclick: function () {
      try {
        output.value = "";
        if (input.value) {
          var a = packer.pack(input.value, base62.checked, shrink.checked);
          output.value = a;
          if (base62.checked) output.value += ';';
          message.update()
        }
      } catch(error) {
        message.error("error packing script", error)
      } finally {
        saveScript.disabled = !output.value;
        decodeScript.disabled = !output.value || !base62.checked
      }
    }
  },
  "#load-script": {
    disabled: false,
    onclick: function () {
      uploadScript.style.display = "inline";
      uploadScript.disabled = false;
      this.style.display = "none"
    }
  },
  "#save-script": {
    onclick: function () {
      form.command.value = "save"
    }
  },
  "#decode-script": {
    onclick: function () {
      try {
        if (output.value) {
          var a = new Date;
          eval("var value=String" + output.value.slice(4));
          var b = new Date;
          output.value = value;
          message.update("unpacked in " + (b - a) + " milliseconds")
        }
      } catch(error) {
        message.error("error decoding script", error)
      } finally {
        decodeScript.blur();
        decodeScript.disabled = true
      }
    }
  },
  "#upload-script": {
    onchange: function () {
      form.encoding = "multipart/form-data";
      form.command.value = "load";
      form.submit()
    }
  },
  "#base62,#shrink": {
    disabled: false
  },
  "#message": {
    error: function (a, b) {
      this.write(a + ": " + b.message, "error")
    },
    update: function (a) {
      var b = input.value.length;
      if (!/\r/.test(input.value)) {
        b += match(input.value, /\n/g).length
      }
      var c = output.value.length + "/" + b;
      var d = (output.value.length / b).toFixed(3);
      this.write((a ? a + ", " : "") + format("compression ratio: %1=%2", c, d))
    },
    write: function (a, b) {
      this.innerHTML = a;
      this.className = b || ""
    }
  }
});
function starts_with(a, b) {
  return a.substr(0, b.length) === b
};
function trim_leading_comments(a) {
  a = a.replace(/^(\s*\/\/[^\n]*\n)+/, '');
  a = a.replace(/^\s+/, '');
  return a
};
function unpacker_filter(a) {
  if (document.getElementById('detect-packers').checked) {
    stripped_source = trim_leading_comments(a);
    if (starts_with(stripped_source.toLowerCase().replace(/ +/g, ''), 'eval(function(p,a,c,k')) {
      try {
        eval('var unpacked_source = ' + stripped_source.substring(4) + ';');
        return unpacker_filter(unpacked_source)
      } catch(error) {
        a = '// uncompress: unpacking failed\n' + a
      }
    }
  }
  return a
};
function do_js_beautify() {
  document.getElementById('beautify').disabled = true;
  var a = document.getElementById('input').value.replace(/^\s+/, '');
  var b = document.getElementById('tabsize').value;
  var c = ' ';
  var d = document.getElementById('preserve-newlines').checked;
  if (b == 1) {
    c = '\t'
  }
  if (a && a[0] === '<' && a.substring(0, 4) !== '<!--') {
    document.getElementById('output').value = style_html(a, b, c, 80)
  } else {
    document.getElementById('output').value = js_beautify(unpacker_filter(a), {
      indent_size: b,
      indent_char: c,
      preserve_newlines: d,
      space_after_anon_function: true
    })
  }
  document.getElementById('beautify').disabled = false;
  return false
};
function get_var(a) {
  var b = new RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.href);
  return b ? b[1] : ""
};
function js_beautify(l, m) {
  var n, output, token_text, last_type, last_text, last_word, current_mode, modes, indent_string;
  var o, wordchar, punct, parser_pos, line_starters, in_case, digits;
  var p, token_type, do_block_just_closed, var_line, var_line_tainted, if_line_flag;
  var q;
  m = m || {};
  var r = m.indent_size || 4;
  var s = m.indent_char || ' ';
  var u = typeof m.preserve_newlines === 'undefined' ? true : m.preserve_newlines;
  var v = m.indent_level || 0;
  var w = m.space_after_anon_function === 'undefined' ? false : m.space_after_anon_function;
  function trim_output() {
    while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string)) {
      output.pop()
    }
  };
  function print_newline(a) {
    a = typeof a === 'undefined' ? true : a;
    if_line_flag = false;
    trim_output();
    if (!output.length) {
      return
    }
    if (output[output.length - 1] !== "\n" || !a) {
      output.push("\n")
    }
    for (var i = 0; i < q; i += 1) {
      output.push(indent_string)
    }
  };
  function print_space() {
    var a = ' ';
    if (output.length) {
      a = output[output.length - 1]
    }
    if (a !== ' ' && a !== '\n' && a !== indent_string) {
      output.push(' ')
    }
  };
  function print_token() {
    output.push(token_text)
  };
  function indent() {
    q += 1
  };
  function unindent() {
    if (q) {
      q -= 1
    }
  };
  function remove_indent() {
    if (output.length && output[output.length - 1] === indent_string) {
      output.pop()
    }
  };
  function set_mode(a) {
    modes.push(current_mode);
    current_mode = a
  };
  function restore_mode() {
    do_block_just_closed = current_mode === 'DO_BLOCK';
    current_mode = modes.pop()
  };
  function in_array(a, b) {
    for (var i = 0; i < b.length; i += 1) {
      if (b[i] === a) {
        return true
      }
    }
    return false
  };
  function is_ternary_op() {
    var a = 0,
    colon_count = 0;
    for (var i = output.length - 1; i >= 0; i--) {
      switch (output[i]) {
      case ':':
        if (a === 0) {
          colon_count++
        }
        break;
      case '?':
        if (a === 0) {
          if (colon_count === 0) {
            return true
          } else {
            colon_count--
          }
        }
        break;
      case '{':
        if (a === 0) {
          return false
        }
        a--;
        break;
      case '(':
      case '[':
        a--;
        break;
      case ')':
      case ']':
      case '}':
        a++;
        break
      }
    }
  };
  function get_next_token() {
    var a = 0;
    if (parser_pos >= n.length) {
      return ['', 'TK_EOF']
    }
    var c = n.charAt(parser_pos);
    parser_pos += 1;
    while (in_array(c, o)) {
      if (parser_pos >= n.length) {
        return ['', 'TK_EOF']
      }
      if (c === "\n") {
        a += 1
      }
      c = n.charAt(parser_pos);
      parser_pos += 1
    }
    var b = false;
    if (u) {
      if (a > 1) {
        for (var i = 0; i < 2; i += 1) {
          print_newline(i === 0)
        }
      }
      b = (a === 1)
    }
    if (in_array(c, wordchar)) {
      if (parser_pos < n.length) {
        while (in_array(n.charAt(parser_pos), wordchar)) {
          c += n.charAt(parser_pos);
          parser_pos += 1;
          if (parser_pos === n.length) {
            break
          }
        }
      }
      if (parser_pos !== n.length && c.match(/^[0-9]+[Ee]$/) && (n.charAt(parser_pos) === '-' || n.charAt(parser_pos) === '+')) {
        var d = n.charAt(parser_pos);
        parser_pos += 1;
        var t = get_next_token(parser_pos);
        c += d + t[0];
        return [c, 'TK_WORD']
      }
      if (c === 'in') {
        return [c, 'TK_OPERATOR']
      }
      if (b && last_type !== 'TK_OPERATOR' && !if_line_flag) {
        print_newline()
      }
      return [c, 'TK_WORD']
    }
    if (c === '(' || c === '[') {
      return [c, 'TK_START_EXPR']
    }
    if (c === ')' || c === ']') {
      return [c, 'TK_END_EXPR']
    }
    if (c === '{') {
      return [c, 'TK_START_BLOCK']
    }
    if (c === '}') {
      return [c, 'TK_END_BLOCK']
    }
    if (c === ';') {
      return [c, 'TK_SEMICOLON']
    }
    if (c === '/') {
      var e = '';
      if (n.charAt(parser_pos) === '*') {
        parser_pos += 1;
        if (parser_pos < n.length) {
          while (! (n.charAt(parser_pos) === '*' && n.charAt(parser_pos + 1) && n.charAt(parser_pos + 1) === '/') && parser_pos < n.length) {
            e += n.charAt(parser_pos);
            parser_pos += 1;
            if (parser_pos >= n.length) {
              break
            }
          }
        }
        parser_pos += 2;
        return ['/*' + e + '*/', 'TK_BLOCK_COMMENT']
      }
      if (n.charAt(parser_pos) === '/') {
        e = c;
        while (n.charAt(parser_pos) !== "\x0d" && n.charAt(parser_pos) !== "\x0a") {
          e += n.charAt(parser_pos);
          parser_pos += 1;
          if (parser_pos >= n.length) {
            break
          }
        }
        parser_pos += 1;
        if (b) {
          print_newline()
        }
        return [e, 'TK_COMMENT']
      }
    }
    if (c === "'" || c === '"' || (c === '/' && ((last_type === 'TK_WORD' && last_text === 'return') || (last_type === 'TK_START_EXPR' || last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EOF' || last_type === 'TK_SEMICOLON')))) {
      var f = c;
      var g = false;
      var h = c;
      if (parser_pos < n.length) {
        if (f === '/') {
          var j = false;
          while (g || j || n.charAt(parser_pos) !== f) {
            h += n.charAt(parser_pos);
            if (!g) {
              g = n.charAt(parser_pos) === '\\';
              if (n.charAt(parser_pos) === '[') {
                j = true
              } else if (n.charAt(parser_pos) === ']') {
                j = false
              }
            } else {
              g = false
            }
            parser_pos += 1;
            if (parser_pos >= n.length) {
              return [h, 'TK_STRING']
            }
          }
        } else {
          while (g || n.charAt(parser_pos) !== f) {
            h += n.charAt(parser_pos);
            if (!g) {
              g = n.charAt(parser_pos) === '\\'
            } else {
              g = false
            }
            parser_pos += 1;
            if (parser_pos >= n.length) {
              return [h, 'TK_STRING']
            }
          }
        }
      }
      parser_pos += 1;
      h += f;
      if (f === '/') {
        while (parser_pos < n.length && in_array(n.charAt(parser_pos), wordchar)) {
          h += n.charAt(parser_pos);
          parser_pos += 1
        }
      }
      return [h, 'TK_STRING']
    }
    if (c === '#') {
      var k = '#';
      if (parser_pos < n.length && in_array(n.charAt(parser_pos), digits)) {
        do {
          c = n.charAt(parser_pos);
          k += c;
          parser_pos += 1
        } while (parser_pos < n.length && c !== '#' && c !== '=');
        if (c === '#') {
          return [k, 'TK_WORD']
        } else {
          return [k, 'TK_OPERATOR']
        }
      }
    }
    if (c === '<' && n.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
      parser_pos += 3;
      return ['<!--', 'TK_COMMENT']
    }
    if (c === '-' && n.substring(parser_pos - 1, parser_pos + 2) === '-->') {
      parser_pos += 2;
      if (b) {
        print_newline()
      }
      return ['-->', 'TK_COMMENT']
    }
    if (in_array(c, punct)) {
      while (parser_pos < n.length && in_array(c + n.charAt(parser_pos), punct)) {
        c += n.charAt(parser_pos);
        parser_pos += 1;
        if (parser_pos >= n.length) {
          break
        }
      }
      return [c, 'TK_OPERATOR']
    }
    return [c, 'TK_UNKNOWN']
  };
  indent_string = '';
  while (r > 0) {
    indent_string += s;
    r -= 1
  }
  q = v;
  n = l;
  last_word = '';
  last_type = 'TK_START_EXPR';
  last_text = '';
  output = [];
  do_block_just_closed = false;
  var_line = false;
  var_line_tainted = false;
  o = "\n\r\t ".split('');
  wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
  digits = '0123456789'.split('');
  punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::'.split(' ');
  line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');
  current_mode = 'BLOCK';
  modes = [current_mode];
  parser_pos = 0;
  in_case = false;
  while (true) {
    var t = get_next_token(parser_pos);
    token_text = t[0];
    token_type = t[1];
    if (token_type === 'TK_EOF') {
      break
    }
    switch (token_type) {
    case 'TK_START_EXPR':
      var_line = false;
      if (token_text === '[') {
        if (current_mode === '[EXPRESSION]') {
          print_newline();
          output.push(indent_string)
        }
      }
      if (token_text === '[') {
        set_mode('[EXPRESSION]')
      } else {
        set_mode('(EXPRESSION)')
      }
      if (last_text === ';' || last_type === 'TK_START_BLOCK') {
        print_newline()
      } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR') {} else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
        print_space()
      } else if (last_word === 'function') {
        if (w) {
          print_space()
        }
      } else if (in_array(last_word, line_starters)) {
        print_space()
      }
      print_token();
      break;
    case 'TK_END_EXPR':
      restore_mode();
      print_token();
      break;
    case 'TK_START_BLOCK':
      if (last_word === 'do') {
        set_mode('DO_BLOCK')
      } else {
        set_mode('BLOCK')
      }
      if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
        if (last_type === 'TK_START_BLOCK') {
          print_newline()
        } else {
          print_space()
        }
      }
      print_token();
      indent();
      break;
    case 'TK_END_BLOCK':
      if (last_type === 'TK_START_BLOCK') {
        trim_output();
        unindent()
      } else {
        unindent();
        print_newline()
      }
      print_token();
      restore_mode();
      break;
    case 'TK_WORD':
      if (do_block_just_closed) {
        print_space();
        print_token();
        print_space();
        do_block_just_closed = false;
        break
      }
      if (token_text === 'case' || token_text === 'default') {
        if (last_text === ':') {
          remove_indent()
        } else {
          unindent();
          print_newline();
          indent()
        }
        print_token();
        in_case = true;
        break
      }
      p = 'NONE';
      if (last_type === 'TK_END_BLOCK') {
        if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
          p = 'NEWLINE'
        } else {
          p = 'SPACE';
          print_space()
        }
      } else if (last_type === 'TK_SEMICOLON' && (current_mode === 'BLOCK' || current_mode === 'DO_BLOCK')) {
        p = 'NEWLINE'
      } else if (last_type === 'TK_SEMICOLON' && (current_mode === '[EXPRESSION]' || current_mode === '(EXPRESSION)')) {
        p = 'SPACE'
      } else if (last_type === 'TK_STRING') {
        p = 'NEWLINE'
      } else if (last_type === 'TK_WORD') {
        p = 'SPACE'
      } else if (last_type === 'TK_START_BLOCK') {
        p = 'NEWLINE'
      } else if (last_type === 'TK_END_EXPR') {
        print_space();
        p = 'NEWLINE'
      }
      if (last_type !== 'TK_END_BLOCK' && in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
        print_newline()
      } else if (in_array(token_text, line_starters) || p === 'NEWLINE') {
        if (last_text === 'else') {
          print_space()
        } else if ((last_type === 'TK_START_EXPR' || last_text === '=' || last_text === ',') && token_text === 'function') {} else if (last_text === 'return' || last_text === 'throw') {
          print_space()
        } else if (last_type !== 'TK_END_EXPR') {
          if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
            if (token_text === 'if' && last_word === 'else') {
              print_space()
            } else {
              print_newline()
            }
          }
        } else { if (in_array(token_text, line_starters) && last_text !== ')') {
            print_newline()
          }
        }
      } else if (p === 'SPACE') {
        print_space()
      }
      print_token();
      last_word = token_text;
      if (token_text === 'var') {
        var_line = true;
        var_line_tainted = false
      }
      if (token_text === 'if' || token_text === 'else') {
        if_line_flag = true
      }
      break;
    case 'TK_SEMICOLON':
      print_token();
      var_line = false;
      break;
    case 'TK_STRING':
      if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_SEMICOLON') {
        print_newline()
      } else if (last_type === 'TK_WORD') {
        print_space()
      }
      print_token();
      break;
    case 'TK_OPERATOR':
      var x = true;
      var y = true;
      if (var_line && token_text !== ',') {
        var_line_tainted = true;
        if (token_text === ':') {
          var_line = false
        }
      }
      if (var_line && token_text === ',' && (current_mode === '[EXPRESSION]' || current_mode === '(EXPRESSION)')) {
        var_line_tainted = false
      }
      if (token_text === ':' && in_case) {
        print_token();
        print_newline();
        in_case = false;
        break
      }
      if (token_text === '::') {
        print_token();
        break
      }
      if (token_text === ',') {
        if (var_line) {
          if (var_line_tainted) {
            print_token();
            print_newline();
            var_line_tainted = false
          } else {
            print_token();
            print_space()
          }
        } else if (last_type === 'TK_END_BLOCK') {
          print_token();
          print_newline()
        } else { if (current_mode === 'BLOCK') {
            print_token();
            print_newline()
          } else {
            print_token();
            print_space()
          }
        }
        break
      } else if (token_text === '--' || token_text === '++') {
        if (last_text === ';') {
          if (current_mode === 'BLOCK') {
            print_newline();
            x = true;
            y = false
          } else {
            x = true;
            y = false
          }
        } else { if (last_text === '{') {
            print_newline()
          }
          x = false;
          y = false
        }
      } else if ((token_text === '!' || token_text === '+' || token_text === '-') && (last_text === 'return' || last_text === 'case')) {
        x = true;
        y = false
      } else if ((token_text === '!' || token_text === '+' || token_text === '-') && last_type === 'TK_START_EXPR') {
        x = false;
        y = false
      } else if (last_type === 'TK_OPERATOR') {
        x = false;
        y = false
      } else if (last_type === 'TK_END_EXPR') {
        x = true;
        y = true
      } else if (token_text === '.') {
        x = false;
        y = false
      } else if (token_text === ':') {
        if (is_ternary_op()) {
          x = true
        } else {
          x = false
        }
      }
      if (x) {
        print_space()
      }
      print_token();
      if (y) {
        print_space()
      }
      break;
    case 'TK_BLOCK_COMMENT':
      print_newline();
      print_token();
      print_newline();
      break;
    case 'TK_COMMENT':
      print_space();
      print_token();
      print_newline();
      break;
    case 'TK_UNKNOWN':
      print_token();
      break
    }
    last_type = token_type;
    last_text = token_text
  }
  return output.join('').replace(/\n+$/, '')
};
var tests_passed = 0;
var tests_failed = 0;
var test_result = '';
var indent_size = 4;
var indent_char = ' ';
var preserve_newlines = true;
var space_after_anon_function = true;
function lazy_escape(a) {
  return a.replace(/</g, '&lt;').replace(/\>/g, '&gt;').replace(/\n/g, '<br />')
};
function bt(a, b) {
  b = b || a;
  var c = js_beautify(a, {
    indent_size: indent_size,
    indent_char: indent_char,
    preserve_newlines: preserve_newlines,
    space_after_anon_function: space_after_anon_function
  });
  if (c !== b) {
    test_result += '\n---- input --------\n' + lazy_escape(a) + '\n---- expected -----\n' + lazy_escape(b) + '\n---- received -----\n' + lazy_escape(c) + '\n-------------------';
    tests_failed += 1
  } else {
    tests_passed += 1
  }
};
function results() {
  if (tests_failed === 0) {
    test_result += 'All ' + tests_passed + ' tests passed.'
  } else {
    test_result += '\n' + tests_failed + ' tests failed.'
  }
  return test_result
};
function test_js_beautify() {
  indent_size = 4;
  tests_passed = 0;
  tests_failed = 0;
  indent_char = ' ';
  test_result = '';
  preserve_newlines = true;
  space_after_anon_function = true;
  bt('');
  bt('a        =          1', 'a = 1');
  bt('a=1', 'a = 1');
  bt("a();\n\nb();", "a();\n\nb();");
  bt('var a = 1 var b = 2', "var a = 1\nvar b = 2");
  bt('a = " 12345 "');
  bt("a = ' 12345 '");
  bt('if (a == 1) b = 2', "if (a == 1) b = 2");
  bt('if(1){2}else{3}', "if (1) {\n    2\n} else {\n    3\n}");
  bt('if(1||2)', 'if (1 || 2)');
  bt('(a==1)||(b==2)', '(a == 1) || (b == 2)');
  bt('var a = 1 if (2) 3', "var a = 1\nif (2) 3");
  bt('a = a + 1');
  bt('a = a == 1');
  bt('/12345[^678]*9+/.match(a)');
  bt('a /= 5');
  bt('a = 0.5 * 3');
  bt('a *= 10.55');
  bt('a < .5');
  bt('a <= .5');
  bt('a<.5', 'a < .5');
  bt('a<=.5', 'a <= .5');
  bt('a = 0xff;');
  bt('a=0xff+4', 'a = 0xff + 4');
  bt('a = [1, 2, 3, 4]');
  bt('F*(g/=f)*g+b', 'F * (g /= f) * g + b');
  bt('a.b({c:d})', "a.b({\n    c: d\n})");
  bt('a.b\n(\n{\nc:\nd\n}\n)', "a.b({\n    c: d\n})");
  bt('a=!b', 'a = !b');
  bt('a?b:c', 'a ? b : c');
  bt('a?1:2', 'a ? 1 : 2');
  bt('a?(b):c', 'a ? (b) : c');
  bt('x={a:1,b:w=="foo"?x:y,c:z}', 'x = {\n    a: 1,\n    b: w == "foo" ? x : y,\n    c: z\n}');
  bt('x=a?b?c?d:e:f:g;', 'x = a ? b ? c ? d : e : f : g;');
  bt('x=a?b?c?d:{e1:1,e2:2}:f:g;', 'x = a ? b ? c ? d : {\n    e1: 1,\n    e2: 2\n} : f : g;');
  bt('function void(void) {}');
  bt('if(!a)', 'if (!a)');
  bt('a=~a', 'a = ~a');
  bt('a;/*comment*/b;', "a;\n/*comment*/\nb;");
  bt('if(a)break', "if (a) break");
  bt('if(a){break}', "if (a) {\n    break\n}");
  bt('if((a))', 'if ((a))');
  bt('for(var i=0;;)', 'for (var i = 0;;)');
  bt('a++;', 'a++;');
  bt('for(;;i++)', 'for (;; i++)');
  bt('for(;;++i)', 'for (;; ++i)');
  bt('return(1)', 'return (1)');
  bt('try{a();}catch(b){c();}finally{d();}', "try {\n    a();\n} catch(b) {\n    c();\n} finally {\n    d();\n}");
  bt('(xx)()');
  bt('a[1]()');
  bt('if(a){b();}else if(', "if (a) {\n    b();\n} else if (");
  bt('switch(x) {case 0: case 1: a(); break; default: break}', "switch (x) {\ncase 0:\ncase 1:\n    a();\n    break;\ndefault:\n    break\n}");
  bt('switch(x){case -1:break;case !y:break;}', 'switch (x) {\ncase -1:\n    break;\ncase !y:\n    break;\n}');
  bt('a !== b');
  bt('if (a) b(); else c();', "if (a) b();\nelse c();");
  bt("// comment\n(function something()");
  bt("{\n\n    x();\n\n}");
  bt('if (a in b)');
  bt('{a:1, b:2}', "{\n    a: 1,\n    b: 2\n}");
  bt('a={1:[-1],2:[+1]}', 'a = {\n    1: [-1],\n    2: [+1]\n}');
  bt('var l = {\'a\':\'1\', \'b\':\'2\'}', "var l = {\n    'a': '1',\n    'b': '2'\n}");
  bt('if (template.user[n] in bk)');
  bt('{{}/z/}', "{\n    {}\n    /z/\n}");
  bt('return 45', "return 45");
  bt('If[1]', "If[1]");
  bt('Then[1]', "Then[1]");
  bt('a = 1e10', "a = 1e10");
  bt('a = 1.3e10', "a = 1.3e10");
  bt('a = 1.3e-10', "a = 1.3e-10");
  bt('a = -1.3e-10', "a = -1.3e-10");
  bt('a = 1e-10', "a = 1e-10");
  bt('a = e - 10', "a = e - 10");
  bt('a = 11-10', "a = 11 - 10");
  bt("a = 1;// comment\n", "a = 1; // comment");
  bt("a = 1; // comment\n", "a = 1; // comment");
  bt("a = 1;\n // comment\n", "a = 1;\n// comment");
  bt("if (a) {\n    do();\n}");
  bt("if\n(a)\nb()", "if (a) b()");
  bt("if (a) {\n// comment\n}else{\n// comment\n}", "if (a) {\n    // comment\n} else {\n    // comment\n}");
  bt("if (a) {\n// comment\n// comment\n}", "if (a) {\n    // comment\n    // comment\n}");
  bt("if (a) b() else c()", "if (a) b()\nelse c()");
  bt("if (a) b() else if c() d()", "if (a) b()\nelse if c() d()");
  bt("{}");
  bt("{\n\n}");
  bt("do { a(); } while ( 1 );", "do {\n    a();\n} while (1);");
  bt("do {} while (1);");
  bt("do {\n} while (1);", "do {} while (1);");
  bt("do {\n\n} while (1);");
  bt("var a = x(a, b, c)");
  bt("delete x if (a) b();", "delete x\nif (a) b();");
  bt("delete x[x] if (a) b();", "delete x[x]\nif (a) b();");
  bt("for(var a=1,b=2)", "for (var a = 1, b = 2)");
  bt("for(var a=1,b=2,c=3)", "for (var a = 1, b = 2, c = 3)");
  bt("for(var a=1,b=2,c=3;d<3;d++)", "for (var a = 1, b = 2, c = 3; d < 3; d++)");
  bt("function x(){(a||b).c()}", "function x() {\n    (a || b).c()\n}");
  bt("function x(){return - 1}", "function x() {\n    return -1\n}");
  bt("function x(){return ! a}", "function x() {\n    return !a\n}");
  bt("a = 'a'\nb = 'b'");
  bt("a = /reg/exp");
  bt("a = /reg/");
  bt('/abc/.test()');
  bt('/abc/i.test()');
  bt("{/abc/i.test()}", "{\n    /abc/i.test()\n}");
  bt('{x=#1=[]}', '{\n    x = #1=[]\n}');
  bt('{a:#1={}}', '{\n    a: #1={}\n}');
  bt('{a:#1#}', '{\n    a: #1#\n}');
  bt('{a:#1', '{\n    a: #1');
  bt('{a:#', '{\n    a: #');
  bt('<!--\nvoid();\n// -->', '<!--\nvoid();\n// -->');
  bt('a=/regexp', 'a = /regexp');
  bt('{a:#1=[],b:#1#,c:#999999#}', '{\n    a: #1=[],\n    b: #1#,\n    c: #999999#\n}');
  bt("a = 1e+2");
  bt("a = 1e-2");
  bt("do{x()}while(a>1)", "do {\n    x()\n} while (a > 1)");
  bt("x(); /reg/exp.match(something)", "x();\n/reg/exp.match(something)");
  bt("something();(", "something();\n(");
  bt("function namespace::something()");
  bt("<!--\nsomething();\n-->", "<!--\nsomething();\n-->");
  bt("<!--\nif(i<0){bla();}\n-->", "<!--\nif (i < 0) {\n    bla();\n}\n-->");
  bt("<!--\nsomething();\n-->\n<!--\nsomething();\n-->", "<!--\nsomething();\n-->\n<!--\nsomething();\n-->");
  bt("<!--\nif(i<0){bla();}\n-->\n<!--\nif(i<0){bla();}\n-->", "<!--\nif (i < 0) {\n    bla();\n}\n-->\n<!--\nif (i < 0) {\n    bla();\n}\n-->");
  bt('{foo();--bar;}', '{\n    foo();\n    --bar;\n}');
  bt('{foo();++bar;}', '{\n    foo();\n    ++bar;\n}');
  bt('{--bar;}', '{\n    --bar;\n}');
  bt('{++bar;}', '{\n    ++bar;\n}');
  bt('a(/abc\\/\\/def/);b()', "a(/abc\\/\\/def/);\nb()");
  bt('a(/a[b\\[\\]c]d/);b()', "a(/a[b\\[\\]c]d/);\nb()");
  bt('a(/a[b\\[', "a(/a[b\\[");
  bt('a(/[a/b]/);b()', "a(/[a/b]/);\nb()");
  bt('a=[[1,2],[4,5],[7,8]]', "a = [\n    [1, 2],\n    [4, 5],\n    [7, 8]]");
  space_after_anon_function = true;
  bt("// comment 1\n(function()", "// comment 1\n(function ()");
  bt("var a1, b1, c1, d1 = 0, c = function() {}, d = '';", "var a1, b1, c1, d1 = 0,\nc = function () {},\nd = '';");
  bt('var o1=$.extend(a,function(){alert(x);}', 'var o1 = $.extend(a, function () {\n    alert(x);\n}');
  bt('var o1=$.extend(a);function(){alert(x);}', 'var o1 = $.extend(a);\nfunction () {\n    alert(x);\n}');
  space_after_anon_function = false;
  bt("// comment 2\n(function()", "// comment 2\n(function()");
  bt("var a2, b2, c2, d2 = 0, c = function() {}, d = '';", "var a2, b2, c2, d2 = 0,\nc = function() {},\nd = '';");
  bt('var o2=$.extend(a,function(){alert(x);}', 'var o2 = $.extend(a, function() {\n    alert(x);\n}');
  bt('var o2=$.extend(a);function(){alert(x);}', 'var o2 = $.extend(a);\nfunction() {\n    alert(x);\n}');
  indent_size = 1;
  indent_char = ' ';
  bt('{ one_char() }', "{\n one_char()\n}");
  indent_size = 4;
  indent_char = ' ';
  bt('{ one_char() }', "{\n    one_char()\n}");
  indent_size = 1;
  indent_char = "\t";
  bt('{ one_char() }', "{\n\tone_char()\n}");
  preserve_newlines = false;
  bt('var\na=dont_preserve_newlines', 'var a = dont_preserve_newlines');
  preserve_newlines = true;
  bt('var\na=do_preserve_newlines', 'var\na = do_preserve_newlines');
  return results()
};
function style_html(h, j, k, l) {
  var m, multi_parser;
  function m() {
    this.pos = 0;
    this.token = '';
    this.current_mode = 'CONTENT';
    this.tags = {
      parent: 'parent1',
      parentcount: 1,
      parent1: ''
    };
    this.tag_type = '';
    this.token_text = this.last_token = this.last_text = this.token_type = '';
    this.Utils = {
      whitespace: "\n\r\t ".split(''),
      single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed'.split(','),
      extra_liners: 'head,body,/html'.split(','),
      in_array: function (a, b) {
        for (var i = 0; i < b.length; i++) {
          if (a === b[i]) {
            return true
          }
        }
        return false
      }
    };
    this.get_content = function () {
      var a = '';
      var b = [];
      var c = false;
      while (this.input.charAt(this.pos) !== '<') {
        if (this.pos >= this.input.length) {
          return b.length ? b.join('') : ['', 'TK_EOF']
        }
        a = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;
        if (this.Utils.in_array(a, this.Utils.whitespace)) {
          if (b.length) {
            c = true
          }
          this.line_char_count--;
          continue
        } else if (c) {
          if (this.line_char_count >= this.max_char) {
            b.push('\n');
            for (var i = 0; i < this.indent_level; i++) {
              b.push(this.indent_string)
            }
            this.line_char_count = 0
          } else {
            b.push(' ');
            this.line_char_count++
          }
          c = false
        }
        b.push(a)
      }
      return b.length ? b.join('') : ''
    };
    this.get_script = function () {
      var a = '';
      var b = [];
      var c = new RegExp('\<\/script' + '\>', 'igm');
      c.lastIndex = this.pos;
      var d = c.exec(this.input);
      var e = d ? d.index : this.input.length;
      while (this.pos < e) {
        if (this.pos >= this.input.length) {
          return b.length ? b.join('') : ['', 'TK_EOF']
        }
        a = this.input.charAt(this.pos);
        this.pos++;
        b.push(a)
      }
      return b.length ? b.join('') : ''
    };
    this.record_tag = function (a) {
      if (this.tags[a + 'count']) {
        this.tags[a + 'count']++;
        this.tags[a + this.tags
          [a + 'count']] = this.indent_level
      } else {
        this.tags[a + 'count'] = 1;
        this.tags[a + this.tags
          [a + 'count']] = this.indent_level
      }
      this.tags[a + this.tags
        [a + 'count'] + 'parent'] = this.tags.parent;
      this.tags.parent = a + this.tags[a + 'count']
    };
    this.retrieve_tag = function (a) {
      if (this.tags[a + 'count']) {
        var b = this.tags.parent;
        while (b) {
          if (a + this.tags[a + 'count'] === b) {
            break
          }
          b = this.tags[b + 'parent']
        }
        if (b) {
          this.indent_level = this.tags[a + this.tags
            [a + 'count']];
          this.tags.parent = this.tags[b + 'parent']
        }
        delete this.tags[a + this.tags
          [a + 'count'] + 'parent'];
        delete this.tags[a + this.tags
          [a + 'count']];
        if (this.tags[a + 'count'] == 1) {
          delete this.tags[a + 'count']
        } else {
          this.tags[a + 'count']--
        }
      }
    };
    this.get_tag = function () {
      var a = '';
      var b = [];
      var c = false;
      do {
        if (this.pos >= this.input.length) {
          return b.length ? b.join('') : ['', 'TK_EOF']
        }
        a = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;
        if (this.Utils.in_array(a, this.Utils.whitespace)) {
          c = true;
          this.line_char_count--;
          continue
        }
        if (a === "'" || a === '"') {
          if (!b[1] || b[1] !== '!') {
            a += this.get_unformatted(a);
            c = true
          }
        }
        if (a === '=') {
          c = false
        }
        if (b.length && b[b.length - 1] !== '=' && a !== '>' && c) {
          if (this.line_char_count >= this.max_char) {
            this.print_newline(false, b);
            this.line_char_count = 0
          } else {
            b.push(' ');
            this.line_char_count++
          }
          c = false
        }
        b.push(a)
      } while (a !== '>');
      var d = b.join('');
      var e;
      if (d.indexOf(' ') != -1) {
        e = d.indexOf(' ')
      } else {
        e = d.indexOf('>')
      }
      var f = d.substring(1, e).toLowerCase();
      if (d.charAt(d.length - 2) === '/' || this.Utils.in_array(f, this.Utils.single_token)) {
        this.tag_type = 'SINGLE'
      } else if (f === 'script') {
        this.record_tag(f);
        this.tag_type = 'SCRIPT'
      } else if (f === 'style') {
        this.record_tag(f);
        this.tag_type = 'STYLE'
      } else if (f.charAt(0) === '!') {
        if (f.indexOf('[if') != -1) {
          if (d.indexOf('!IE') != -1) {
            var g = this.get_unformatted('-->', d);
            b.push(g)
          }
          this.tag_type = 'START'
        } else if (f.indexOf('[endif') != -1) {
          this.tag_type = 'END';
          this.unindent()
        } else if (f.indexOf('[cdata[') != -1) {
          var g = this.get_unformatted(']]>', d);
          b.push(g);
          this.tag_type = 'SINGLE'
        } else {
          var g = this.get_unformatted('-->', d);
          b.push(g);
          this.tag_type = 'SINGLE'
        }
      } else { if (f.charAt(0) === '/') {
          this.retrieve_tag(f.substring(1));
          this.tag_type = 'END'
        } else {
          this.record_tag(f);
          this.tag_type = 'START'
        }
        if (this.Utils.in_array(f, this.Utils.extra_liners)) {
          this.print_newline(true, this.output)
        }
      }
      return b.join('')
    };
    this.get_unformatted = function (a, b) {
      if (b && b.indexOf(a) != -1) {
        return ''
      }
      var c = '';
      var d = '';
      var e = true;
      do {
        c = this.input.charAt(this.pos);
        this.pos++;
        if (this.Utils.in_array(c, this.Utils.whitespace)) {
          if (!e) {
            this.line_char_count--;
            continue
          }
          if (c === '\n' || c === '\r') {
            d += '\n';
            for (var i = 0; i < this.indent_level; i++) {
              d += this.indent_string
            }
            e = false;
            this.line_char_count = 0;
            continue
          }
        }
        d += c;
        this.line_char_count++;
        e = true
      } while (d.indexOf(a) == -1);
      return d
    };
    this.get_token = function () {
      var a;
      if (this.last_token === 'TK_TAG_SCRIPT') {
        var b = this.get_script();
        if (typeof b !== 'string') {
          return b
        }
        a = js_beautify(b, {
          indent_size: this.indent_size,
          indent_char: this.indent_character,
          indent_level: this.indent_level
        });
        return [a, 'TK_CONTENT']
      }
      if (this.current_mode === 'CONTENT') {
        a = this.get_content();
        if (typeof a !== 'string') {
          return a
        } else {
          return [a, 'TK_CONTENT']
        }
      }
      if (this.current_mode === 'TAG') {
        a = this.get_tag();
        if (typeof a !== 'string') {
          return a
        } else {
          var c = 'TK_TAG_' + this.tag_type;
          return [a, c]
        }
      }
    };
    this.printer = function (c, d, e, f) {
      this.input = c || '';
      this.output = [];
      this.indent_character = d || ' ';
      this.indent_string = '';
      this.indent_size = e || 2;
      this.indent_level = 0;
      this.max_char = f || 70;
      this.line_char_count = 0;
      for (var i = 0; i < this.indent_size; i++) {
        this.indent_string += this.indent_character
      }
      this.print_newline = function (a, b) {
        this.line_char_count = 0;
        if (!b || !b.length) {
          return
        }
        if (!a) {
          while (this.Utils.in_array(b[b.length - 1], this.Utils.whitespace)) {
            b.pop()
          }
        }
        b.push('\n');
        for (var i = 0; i < this.indent_level; i++) {
          b.push(this.indent_string)
        }
      };
      this.print_token = function (a) {
        this.output.push(a)
      };
      this.indent = function () {
        this.indent_level++
      };
      this.unindent = function () {
        if (this.indent_level > 0) {
          this.indent_level--
        }
      }
    };
    return this
  };
  multi_parser = new m();
  multi_parser.printer(h, k, j);
  while (true) {
    var t = multi_parser.get_token();
    multi_parser.token_text = t[0];
    multi_parser.token_type = t[1];
    if (multi_parser.token_type === 'TK_EOF') {
      break
    }
    switch (multi_parser.token_type) {
    case 'TK_TAG_START':
    case 'TK_TAG_SCRIPT':
    case 'TK_TAG_STYLE':
      multi_parser.print_newline(false, multi_parser.output);
      multi_parser.print_token(multi_parser.token_text);
      multi_parser.indent();
      multi_parser.current_mode = 'CONTENT';
      break;
    case 'TK_TAG_END':
      multi_parser.print_newline(true, multi_parser.output);
      multi_parser.print_token(multi_parser.token_text);
      multi_parser.current_mode = 'CONTENT';
      break;
    case 'TK_TAG_SINGLE':
      multi_parser.print_newline(false, multi_parser.output);
      multi_parser.print_token(multi_parser.token_text);
      multi_parser.current_mode = 'CONTENT';
      break;
    case 'TK_CONTENT':
      if (multi_parser.token_text !== '') {
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text)
      }
      multi_parser.current_mode = 'TAG';
      break
    }
    multi_parser.last_token = multi_parser.token_type;
    multi_parser.last_text = multi_parser.token_text
  }
  return multi_parser.output.join('')
};
