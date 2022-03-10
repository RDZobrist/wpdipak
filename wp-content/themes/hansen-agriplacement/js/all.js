!function () {
  "use strict";
  function t() {
    var t = { defaultOkLabel: "Ok", okLabel: "Ok", defaultCancelLabel: "Cancel", cancelLabel: "Cancel", defaultMaxLogItems: 2, maxLogItems: 2, promptValue: "", promptPlaceholder: "", closeLogOnClick: !1, closeLogOnClickDefault: !1, delay: 5e3, defaultDelay: 5e3, logContainerClass: "alertify-logs", logContainerDefaultClass: "alertify-logs", dialogs: { buttons: { holder: "<nav>{{buttons}}</nav>", ok: "<button class='ok' tabindex='1'>{{ok}}</button>", cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>" }, input: "<input type='text'>", message: "<p class='msg'>{{message}}</p>", log: "<div class='{{class}}'>{{message}}</div>" }, defaultDialogs: { buttons: { holder: "<nav>{{buttons}}</nav>", ok: "<button class='ok' tabindex='1'>{{ok}}</button>", cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>" }, input: "<input type='text'>", message: "<p class='msg'>{{message}}</p>", log: "<div class='{{class}}'>{{message}}</div>" }, build: function (t) {
        var e = this.dialogs.buttons.ok,
            o = "<div class='dialog'><div>" + this.dialogs.message.replace("{{message}}", t.message);return ("confirm" === t.type || "prompt" === t.type) && (e = this.dialogs.buttons.cancel + this.dialogs.buttons.ok), "prompt" === t.type && (o += this.dialogs.input), o = (o + this.dialogs.buttons.holder + "</div></div>").replace("{{buttons}}", e).replace("{{ok}}", this.okLabel).replace("{{cancel}}", this.cancelLabel);
      }, setCloseLogOnClick: function (t) {
        this.closeLogOnClick = !!t;
      }, close: function (t, e) {
        this.closeLogOnClick && t.addEventListener("click", function (t) {
          o(t.srcElement);
        }), e = e && !isNaN(+e) ? +e : this.delay, 0 > e ? o(t) : e > 0 && setTimeout(function () {
          o(t);
        }, e);
      }, dialog: function (t, e, o, n) {
        return this.setup({ type: e, message: t, onOkay: o, onCancel: n });
      }, log: function (t, e, o) {
        var n = document.querySelectorAll(".alertify-logs > div");if (n) {
          var i = n.length - this.maxLogItems;if (i >= 0) for (var a = 0, l = i + 1; l > a; a++) this.close(n[a], -1);
        }this.notify(t, e, o);
      }, setLogPosition: function (t) {
        this.logContainerClass = "alertify-logs " + t;
      }, setupLogContainer: function () {
        var t = document.querySelector(".alertify-logs"),
            e = this.logContainerClass;return t || (t = document.createElement("div"), t.className = e, document.body.appendChild(t)), t.className !== e && (t.className = e), t;
      }, notify: function (t, e, o) {
        var n = this.setupLogContainer(),
            i = document.createElement("div");i.className = e || "default", i.innerHTML = t, "function" == typeof o && i.addEventListener("click", o), n.appendChild(i), setTimeout(function () {
          i.className += " show";
        }, 10), this.close(i, this.delay);
      }, setup: function (t) {
        function e(e) {
          "function" != typeof e && (e = function () {}), i && i.addEventListener("click", function (i) {
            t.onOkay && "function" == typeof t.onOkay && (l ? t.onOkay(l.value, i) : t.onOkay(i)), e(l ? { buttonClicked: "ok", inputValue: l.value, event: i } : { buttonClicked: "ok", event: i }), o(n);
          }), a && a.addEventListener("click", function (i) {
            t.onCancel && "function" == typeof t.onCancel && t.onCancel(i), e({ buttonClicked: "cancel", event: i }), o(n);
          });
        }var n = document.createElement("div");n.className = "alertify hide", n.innerHTML = this.build(t);var i = n.querySelector(".ok"),
            a = n.querySelector(".cancel"),
            l = n.querySelector("input"),
            s = n.querySelector("label");l && ("string" == typeof this.promptPlaceholder && (s ? s.textContent = this.promptPlaceholder : l.placeholder = this.promptPlaceholder), "string" == typeof this.promptValue && (l.value = this.promptValue));var r;return "function" == typeof Promise ? r = new Promise(e) : e(), document.body.appendChild(n), setTimeout(function () {
          n.classList.remove("hide"), l && t.type && "prompt" === t.type ? (l.select(), l.focus()) : i && i.focus();
        }, 100), r;
      }, okBtn: function (t) {
        return this.okLabel = t, this;
      }, setDelay: function (t) {
        var e = parseInt(t || 0, 10);return this.delay = isNaN(e) ? this.defultDelay : t, this;
      }, cancelBtn: function (t) {
        return this.cancelLabel = t, this;
      }, setMaxLogItems: function (t) {
        this.maxLogItems = parseInt(t || this.defaultMaxLogItems);
      }, theme: function (t) {
        switch (t.toLowerCase()) {case "bootstrap":
            this.dialogs.buttons.ok = "<button class='ok btn btn-success' tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel btn btn-danger' tabindex='2'>{{cancel}}</button>", this.dialogs.input = "<input type='text' class='form-control'>";break;case "purecss":
            this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";break;case "mdl":case "material-design-light":
            this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>", this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";break;case "angular-material":
            this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>", this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";break;case "default":default:
            this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok, this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel, this.dialogs.input = this.defaultDialogs.input;}
      }, reset: function () {
        this.theme("default"), this.okBtn(this.defaultOkLabel), this.cancelBtn(this.defaultCancelLabel), this.setMaxLogItems(), this.promptValue = "", this.promptPlaceholder = "", this.delay = this.defaultDelay, this.setCloseLogOnClick(this.closeLogOnClickDefault), this.setLogPosition("bottom left");
      }, injectCSS: function () {
        if (!document.querySelector("#alertifyCSS")) {
          var t = document.getElementsByTagName("head")[0],
              e = document.createElement("style");e.type = "text/css", e.id = "alertifyCSS", e.innerHTML = ".alertify,.alertify *,.alertify-logs>*,.alertify.show{box-sizing:border-box}.alertify-logs>*{color:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:99999}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{-webkit-transition:all .33s cubic-bezier(.25,.8,.25,1);transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin:0;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:0 0;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;border:0;display:inline-block;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px dashed rgba(0,0,0,.1)}.alertify-logs{position:fixed;z-index:100}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{-webkit-transition:all .4s cubic-bezier(.25,.8,.25,1);transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px}", t.insertBefore(e, t.firstChild);
        }
      }, removeCSS: function () {
        var t = document.querySelector("#alertifyCSS");t && t.parentNode && t.parentNode.removeChild(t);
      } };return t.injectCSS(), { _$$alertify: t, reset: function () {
        return t.reset(), this;
      }, alert: function (e, o, n) {
        return t.dialog(e, "alert", o, n) || this;
      }, confirm: function (e, o, n) {
        return t.dialog(e, "confirm", o, n) || this;
      }, prompt: function (e, o, n) {
        return t.dialog(e, "prompt", o, n) || this;
      }, log: function (e, o) {
        return t.log(e, "default", o), this;
      }, theme: function (e) {
        return t.theme(e), this;
      }, success: function (e, o) {
        return t.log(e, "success", o), this;
      }, error: function (e, o) {
        return t.log(e, "error", o), this;
      }, cancelBtn: function (e) {
        return t.cancelBtn(e), this;
      }, okBtn: function (e) {
        return t.okBtn(e), this;
      }, delay: function (e) {
        return t.setDelay(e), this;
      }, placeholder: function (e) {
        return t.promptPlaceholder = e, this;
      }, defaultValue: function (e) {
        return t.promptValue = e, this;
      }, maxLogItems: function (e) {
        return t.setMaxLogItems(e), this;
      }, closeLogOnClick: function (e) {
        return t.setCloseLogOnClick(!!e), this;
      }, logPosition: function (e) {
        return t.setLogPosition(e || ""), this;
      } };
  }var e = 500,
      o = function (t) {
    if (t) {
      var o = function () {
        t && t.parentNode && t.parentNode.removeChild(t);
      };t.classList.remove("show"), t.classList.add("hide"), t.addEventListener("transitionend", o), setTimeout(o, e);
    }
  };"undefined" != typeof module && module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define(function () {
    return new t();
  }) : window.alertify = new t();
}();
/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function (e) {
  function t(e) {
    var t = e.length,
        r = $.type(e);return "function" === r || $.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
  }if (!e.jQuery) {
    var $ = function (e, t) {
      return new $.fn.init(e, t);
    };$.isWindow = function (e) {
      return null != e && e == e.window;
    }, $.type = function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? a[o.call(e)] || "object" : typeof e;
    }, $.isArray = Array.isArray || function (e) {
      return "array" === $.type(e);
    }, $.isPlainObject = function (e) {
      var t;if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e)) return !1;try {
        if (e.constructor && !n.call(e, "constructor") && !n.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (r) {
        return !1;
      }for (t in e);return void 0 === t || n.call(e, t);
    }, $.each = function (e, r, a) {
      var n,
          o = 0,
          i = e.length,
          s = t(e);if (a) {
        if (s) for (; i > o && (n = r.apply(e[o], a), n !== !1); o++);else for (o in e) if (n = r.apply(e[o], a), n === !1) break;
      } else if (s) for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++);else for (o in e) if (n = r.call(e[o], o, e[o]), n === !1) break;return e;
    }, $.data = function (e, t, a) {
      if (void 0 === a) {
        var n = e[$.expando],
            o = n && r[n];if (void 0 === t) return o;if (o && t in o) return o[t];
      } else if (void 0 !== t) {
        var n = e[$.expando] || (e[$.expando] = ++$.uuid);return r[n] = r[n] || {}, r[n][t] = a, a;
      }
    }, $.removeData = function (e, t) {
      var a = e[$.expando],
          n = a && r[a];n && $.each(t, function (e, t) {
        delete n[t];
      });
    }, $.extend = function () {
      var e,
          t,
          r,
          a,
          n,
          o,
          i = arguments[0] || {},
          s = 1,
          l = arguments.length,
          u = !1;for ("boolean" == typeof i && (u = i, i = arguments[s] || {}, s++), "object" != typeof i && "function" !== $.type(i) && (i = {}), s === l && (i = this, s--); l > s; s++) if (null != (n = arguments[s])) for (a in n) e = i[a], r = n[a], i !== r && (u && r && ($.isPlainObject(r) || (t = $.isArray(r))) ? (t ? (t = !1, o = e && $.isArray(e) ? e : []) : o = e && $.isPlainObject(e) ? e : {}, i[a] = $.extend(u, o, r)) : void 0 !== r && (i[a] = r));return i;
    }, $.queue = function (e, r, a) {
      function n(e, r) {
        var a = r || [];return null != e && (t(Object(e)) ? !function (e, t) {
          for (var r = +t.length, a = 0, n = e.length; r > a;) e[n++] = t[a++];if (r !== r) for (; void 0 !== t[a];) e[n++] = t[a++];return e.length = n, e;
        }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a;
      }if (e) {
        r = (r || "fx") + "queue";var o = $.data(e, r);return a ? (!o || $.isArray(a) ? o = $.data(e, r, n(a)) : o.push(a), o) : o || [];
      }
    }, $.dequeue = function (e, t) {
      $.each(e.nodeType ? [e] : e, function (e, r) {
        t = t || "fx";var a = $.queue(r, t),
            n = a.shift();"inprogress" === n && (n = a.shift()), n && ("fx" === t && a.unshift("inprogress"), n.call(r, function () {
          $.dequeue(r, t);
        }));
      });
    }, $.fn = $.prototype = { init: function (e) {
        if (e.nodeType) return this[0] = e, this;throw new Error("Not a DOM node.");
      }, offset: function () {
        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };return { top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
      }, position: function () {
        function e() {
          for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;return e || document;
        }var t = this[0],
            e = e.apply(t),
            r = this.offset(),
            a = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : $(e).offset();return r.top -= parseFloat(t.style.marginTop) || 0, r.left -= parseFloat(t.style.marginLeft) || 0, e.style && (a.top += parseFloat(e.style.borderTopWidth) || 0, a.left += parseFloat(e.style.borderLeftWidth) || 0), { top: r.top - a.top, left: r.left - a.left };
      } };var r = {};$.expando = "velocity" + new Date().getTime(), $.uuid = 0;for (var a = {}, n = a.hasOwnProperty, o = a.toString, i = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < i.length; s++) a["[object " + i[s] + "]"] = i[s].toLowerCase();$.fn.init.prototype = $.fn, e.Velocity = { Utilities: $ };
  }
}(window), function (e) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e();
}(function () {
  return function (e, t, r, a) {
    function n(e) {
      for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
        var n = e[t];n && a.push(n);
      }return a;
    }function o(e) {
      return g.isWrapped(e) ? e = [].slice.call(e) : g.isNode(e) && (e = [e]), e;
    }function i(e) {
      var t = $.data(e, "velocity");return null === t ? a : t;
    }function s(e) {
      return function (t) {
        return Math.round(t * e) * (1 / e);
      };
    }function l(e, r, a, n) {
      function o(e, t) {
        return 1 - 3 * t + 3 * e;
      }function i(e, t) {
        return 3 * t - 6 * e;
      }function s(e) {
        return 3 * e;
      }function l(e, t, r) {
        return ((o(t, r) * e + i(t, r)) * e + s(t)) * e;
      }function u(e, t, r) {
        return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t);
      }function c(t, r) {
        for (var n = 0; m > n; ++n) {
          var o = u(r, e, a);if (0 === o) return r;var i = l(r, e, a) - t;r -= i / o;
        }return r;
      }function p() {
        for (var t = 0; b > t; ++t) w[t] = l(t * x, e, a);
      }function f(t, r, n) {
        var o,
            i,
            s = 0;do i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i; while (Math.abs(o) > h && ++s < v);return i;
      }function d(t) {
        for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) r += x;--n;var i = (t - w[n]) / (w[n + 1] - w[n]),
            s = r + i * x,
            l = u(s, e, a);return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x);
      }function g() {
        V = !0, (e != r || a != n) && p();
      }var m = 4,
          y = .001,
          h = 1e-7,
          v = 10,
          b = 11,
          x = 1 / (b - 1),
          S = "Float32Array" in t;if (4 !== arguments.length) return !1;for (var P = 0; 4 > P; ++P) if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P])) return !1;e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);var w = S ? new Float32Array(b) : new Array(b),
          V = !1,
          C = function (t) {
        return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n);
      };C.getControlPoints = function () {
        return [{ x: e, y: r }, { x: a, y: n }];
      };var T = "generateBezier(" + [e, r, a, n] + ")";return C.toString = function () {
        return T;
      }, C;
    }function u(e, t) {
      var r = e;return g.isString(e) ? v.Easings[e] || (r = !1) : r = g.isArray(e) && 1 === e.length ? s.apply(null, e) : g.isArray(e) && 2 === e.length ? b.apply(null, e.concat([t])) : g.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = v.Easings[v.defaults.easing] ? v.defaults.easing : h), r;
    }function c(e) {
      if (e) {
        var t = new Date().getTime(),
            r = v.State.calls.length;r > 1e4 && (v.State.calls = n(v.State.calls));for (var o = 0; r > o; o++) if (v.State.calls[o]) {
          var s = v.State.calls[o],
              l = s[0],
              u = s[2],
              f = s[3],
              d = !!f,
              m = null;f || (f = v.State.calls[o][3] = t - 16);for (var y = Math.min((t - f) / u.duration, 1), h = 0, b = l.length; b > h; h++) {
            var S = l[h],
                w = S.element;if (i(w)) {
              var V = !1;if (u.display !== a && null !== u.display && "none" !== u.display) {
                if ("flex" === u.display) {
                  var C = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];$.each(C, function (e, t) {
                    x.setPropertyValue(w, "display", t);
                  });
                }x.setPropertyValue(w, "display", u.display);
              }u.visibility !== a && "hidden" !== u.visibility && x.setPropertyValue(w, "visibility", u.visibility);for (var T in S) if ("element" !== T) {
                var k = S[T],
                    A,
                    F = g.isString(k.easing) ? v.Easings[k.easing] : k.easing;if (1 === y) A = k.endValue;else {
                  var E = k.endValue - k.startValue;if (A = k.startValue + E * F(y, u, E), !d && A === k.currentValue) continue;
                }if (k.currentValue = A, "tween" === T) m = A;else {
                  if (x.Hooks.registered[T]) {
                    var j = x.Hooks.getRoot(T),
                        H = i(w).rootPropertyValueCache[j];H && (k.rootPropertyValue = H);
                  }var N = x.setPropertyValue(w, T, k.currentValue + (0 === parseFloat(A) ? "" : k.unitType), k.rootPropertyValue, k.scrollData);x.Hooks.registered[T] && (i(w).rootPropertyValueCache[j] = x.Normalizations.registered[j] ? x.Normalizations.registered[j]("extract", null, N[1]) : N[1]), "transform" === N[0] && (V = !0);
                }
              }u.mobileHA && i(w).transformCache.translate3d === a && (i(w).transformCache.translate3d = "(0px, 0px, 0px)", V = !0), V && x.flushTransformCache(w);
            }
          }u.display !== a && "none" !== u.display && (v.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (v.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], y, Math.max(0, f + u.duration - t), f, m), 1 === y && p(o);
        }
      }v.State.isTicking && P(c);
    }function p(e, t) {
      if (!v.State.calls[e]) return !1;for (var r = v.State.calls[e][0], n = v.State.calls[e][1], o = v.State.calls[e][2], s = v.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
        var p = r[u].element;if (t || o.loop || ("none" === o.display && x.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && ($.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && i(p)) {
          i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};var f = !1;$.each(x.Lists.transforms3D, function (e, t) {
            var r = /^scale/.test(t) ? 1 : 0,
                n = i(p).transformCache[t];i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (f = !0, delete i(p).transformCache[t]);
          }), o.mobileHA && (f = !0, delete i(p).transformCache.translate3d), f && x.flushTransformCache(p), x.Values.removeClass(p, "velocity-animating");
        }if (!t && o.complete && !o.loop && u === c - 1) try {
          o.complete.call(n, n);
        } catch (d) {
          setTimeout(function () {
            throw d;
          }, 1);
        }s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && ($.each(i(p).tweensContainer, function (e, t) {
          /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100);
        }), v(p, "reverse", { loop: !0, delay: o.delay })), o.queue !== !1 && $.dequeue(p, o.queue);
      }v.State.calls[e] = !1;for (var g = 0, m = v.State.calls.length; m > g; g++) if (v.State.calls[g] !== !1) {
        l = !0;break;
      }l === !1 && (v.State.isTicking = !1, delete v.State.calls, v.State.calls = []);
    }var f = function () {
      if (r.documentMode) return r.documentMode;for (var e = 7; e > 4; e--) {
        var t = r.createElement("div");if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e;
      }return a;
    }(),
        d = function () {
      var e = 0;return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
        var r = new Date().getTime(),
            a;return a = Math.max(0, 16 - (r - e)), e = r + a, setTimeout(function () {
          t(r + a);
        }, a);
      };
    }(),
        g = { isString: function (e) {
        return "string" == typeof e;
      }, isArray: Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      }, isFunction: function (e) {
        return "[object Function]" === Object.prototype.toString.call(e);
      }, isNode: function (e) {
        return e && e.nodeType;
      }, isNodeList: function (e) {
        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0);
      }, isWrapped: function (e) {
        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e));
      }, isSVG: function (e) {
        return t.SVGElement && e instanceof t.SVGElement;
      }, isEmptyObject: function (e) {
        for (var t in e) return !1;return !0;
      } },
        $,
        m = !1;if (e.fn && e.fn.jquery ? ($ = e, m = !0) : $ = t.Velocity.Utilities, 8 >= f && !m) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if (7 >= f) return void (jQuery.fn.velocity = jQuery.fn.animate);var y = 400,
        h = "swing",
        v = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: t.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: r.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: $, Redirects: {}, Easings: {}, Promise: t.Promise, defaults: { queue: "", duration: y, easing: h, begin: a, complete: a, progress: a, display: a, visibility: a, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function (e) {
        $.data(e, "velocity", { isSVG: g.isSVG(e), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
      }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };t.pageYOffset !== a ? (v.State.scrollAnchor = t, v.State.scrollPropertyLeft = "pageXOffset", v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, v.State.scrollPropertyLeft = "scrollLeft", v.State.scrollPropertyTop = "scrollTop");var b = function () {
      function e(e) {
        return -e.tension * e.x - e.friction * e.v;
      }function t(t, r, a) {
        var n = { x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction };return { dx: n.v, dv: e(n) };
      }function r(r, a) {
        var n = { dx: r.v, dv: e(r) },
            o = t(r, .5 * a, n),
            i = t(r, .5 * a, o),
            s = t(r, a, i),
            l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx),
            u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);return r.x = r.x + l * a, r.v = r.v + u * a, r;
      }return function a(e, t, n) {
        var o = { x: -1, v: 0, tension: null, friction: null },
            i = [0],
            s = 0,
            l = 1e-4,
            u = .016,
            c,
            p,
            f;for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, o.tension = e, o.friction = t, c = null !== n, c ? (s = a(e, t), p = s / n * u) : p = u;;) if (f = r(f || o, p), i.push(1 + f.x), s += 16, !(Math.abs(f.x) > l && Math.abs(f.v) > l)) break;return c ? function (e) {
          return i[e * (i.length - 1) | 0];
        } : s;
      };
    }();v.Easings = { linear: function (e) {
        return e;
      }, swing: function (e) {
        return .5 - Math.cos(e * Math.PI) / 2;
      }, spring: function (e) {
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
      } }, $.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
      v.Easings[t[0]] = l.apply(null, t[1]);
    });var x = v.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function () {
          for (var e = 0; e < x.Lists.colors.length; e++) {
            var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t];
          }var r, a, n;if (f) for (r in x.Hooks.templates) {
            a = x.Hooks.templates[r], n = a[0].split(" ");var o = a[1].match(x.RegEx.valueSplit);"Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), x.Hooks.templates[r] = [n.join(" "), o.join(" ")]);
          }for (r in x.Hooks.templates) {
            a = x.Hooks.templates[r], n = a[0].split(" ");for (var e in n) {
              var i = r + n[e],
                  s = e;x.Hooks.registered[i] = [r, s];
            }
          }
        }, getRoot: function (e) {
          var t = x.Hooks.registered[e];return t ? t[0] : e;
        }, cleanRootPropertyValue: function (e, t) {
          return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t;
        }, extractValue: function (e, t) {
          var r = x.Hooks.registered[e];if (r) {
            var a = r[0],
                n = r[1];return t = x.Hooks.cleanRootPropertyValue(a, t), t.toString().match(x.RegEx.valueSplit)[n];
          }return t;
        }, injectValue: function (e, t, r) {
          var a = x.Hooks.registered[e];if (a) {
            var n = a[0],
                o = a[1],
                i,
                s;return r = x.Hooks.cleanRootPropertyValue(n, r), i = r.toString().match(x.RegEx.valueSplit), i[o] = t, s = i.join(" ");
          }return r;
        } }, Normalizations: { registered: { clip: function (e, t, r) {
            switch (e) {case "name":
                return "clip";case "extract":
                var a;return x.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(x.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;case "inject":
                return "rect(" + r + ")";}
          }, blur: function (e, t, r) {
            switch (e) {case "name":
                return v.State.isFirefox ? "filter" : "-webkit-filter";case "extract":
                var a = parseFloat(r);if (!a && 0 !== a) {
                  var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a = n ? n[1] : 0;
                }return a;case "inject":
                return parseFloat(r) ? "blur(" + r + ")" : "none";}
          }, opacity: function (e, t, r) {
            if (8 >= f) switch (e) {case "name":
                return "filter";case "extract":
                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);return r = a ? a[1] / 100 : 1;case "inject":
                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")";} else switch (e) {case "name":
                return "opacity";case "extract":
                return r;case "inject":
                return r;}
          } }, register: function () {
          9 >= f || v.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));for (var e = 0; e < x.Lists.transformsBase.length; e++) !function () {
            var t = x.Lists.transformsBase[e];x.Normalizations.registered[t] = function (e, r, n) {
              switch (e) {case "name":
                  return "transform";case "extract":
                  return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");case "inject":
                  var o = !1;switch (t.substr(0, t.length - 1)) {case "translate":
                      o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case "scal":case "scale":
                      v.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);break;case "skew":
                      o = !/(deg|\d)$/i.test(n);break;case "rotate":
                      o = !/(deg|\d)$/i.test(n);}return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t];}
            };
          }();for (var e = 0; e < x.Lists.colors.length; e++) !function () {
            var t = x.Lists.colors[e];x.Normalizations.registered[t] = function (e, r, n) {
              switch (e) {case "name":
                  return t;case "extract":
                  var o;if (x.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n;else {
                    var i,
                        s = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };/^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : x.RegEx.isHex.test(n) ? i = "rgb(" + x.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                  }return 8 >= f || 3 !== o.split(" ").length || (o += " 1"), o;case "inject":
                  return 8 >= f ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";}
            };
          }();
        } }, Names: { camelCase: function (e) {
          return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase();
          });
        }, SVGAttribute: function (e) {
          var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (f || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
        }, prefixCheck: function (e) {
          if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
            var n;if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
              return e.toUpperCase();
            }), g.isString(v.State.prefixElement.style[n])) return v.State.prefixMatches[e] = n, [n, !0];
          }return [e, !1];
        } }, Values: { hexToRgb: function (e) {
          var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
              a;return e = e.replace(t, function (e, t, r, a) {
            return t + t + r + r + a + a;
          }), a = r.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0];
        }, isCSSNullValue: function (e) {
          return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
        }, getUnitType: function (e) {
          return (/^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
          );
        }, getDisplayType: function (e) {
          var t = e && e.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
          );
        }, addClass: function (e, t) {
          e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t;
        }, removeClass: function (e, t) {
          e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
        } }, getPropertyValue: function (e, r, n, o) {
        function s(e, r) {
          function n() {
            u && x.setPropertyValue(e, "display", "none");
          }var l = 0;if (8 >= f) l = $.css(e, r);else {
            var u = !1;if (/^(width|height)$/.test(r) && 0 === x.getPropertyValue(e, "display") && (u = !0, x.setPropertyValue(e, "display", x.Values.getDisplayType(e))), !o) {
              if ("height" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var c = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);return n(), c;
              }if ("width" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var p = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);return n(), p;
              }
            }var d;d = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === f && "filter" === r ? d.getPropertyValue(r) : d[r], ("" === l || null === l) && (l = e.style[r]), n();
          }if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
            var g = s(e, "position");("fixed" === g || "absolute" === g && /top|left/i.test(r)) && (l = $(e).position()[r] + "px");
          }return l;
        }var l;if (x.Hooks.registered[r]) {
          var u = r,
              c = x.Hooks.getRoot(u);n === a && (n = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])), x.Normalizations.registered[c] && (n = x.Normalizations.registered[c]("extract", e, n)), l = x.Hooks.extractValue(u, n);
        } else if (x.Normalizations.registered[r]) {
          var p, d;p = x.Normalizations.registered[r]("name", e), "transform" !== p && (d = s(e, x.Names.prefixCheck(p)[0]), x.Values.isCSSNullValue(d) && x.Hooks.templates[r] && (d = x.Hooks.templates[r][1])), l = x.Normalizations.registered[r]("extract", e, d);
        }if (!/^[\d-]/.test(l)) if (i(e) && i(e).isSVG && x.Names.SVGAttribute(r)) {
          if (/^(height|width)$/i.test(r)) try {
            l = e.getBBox()[r];
          } catch (g) {
            l = 0;
          } else l = e.getAttribute(r);
        } else l = s(e, x.Names.prefixCheck(r)[0]);return x.Values.isCSSNullValue(l) && (l = 0), v.debug >= 2 && console.log("Get " + r + ": " + l), l;
      }, setPropertyValue: function (e, r, a, n, o) {
        var s = r;if ("scroll" === r) o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);else if (x.Normalizations.registered[r] && "transform" === x.Normalizations.registered[r]("name", e)) x.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r];else {
          if (x.Hooks.registered[r]) {
            var l = r,
                u = x.Hooks.getRoot(r);n = n || x.getPropertyValue(e, u), a = x.Hooks.injectValue(l, a, n), r = u;
          }if (x.Normalizations.registered[r] && (a = x.Normalizations.registered[r]("inject", e, a), r = x.Normalizations.registered[r]("name", e)), s = x.Names.prefixCheck(r)[0], 8 >= f) try {
            e.style[s] = a;
          } catch (c) {
            v.debug && console.log("Browser does not support [" + a + "] for [" + s + "]");
          } else i(e) && i(e).isSVG && x.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;v.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a);
        }return [s, a];
      }, flushTransformCache: function (e) {
        function t(t) {
          return parseFloat(x.getPropertyValue(e, t));
        }var r = "";if ((f || v.State.isAndroid && !v.State.isChrome) && i(e).isSVG) {
          var a = { translate: [t("translateX"), t("translateY")], skewX: [t("skewX")], skewY: [t("skewY")], scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")], rotate: [t("rotateZ"), 0, 0] };$.each(i(e).transformCache, function (e) {
            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e]);
          });
        } else {
          var n, o;$.each(i(e).transformCache, function (t) {
            return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void (r += t + n + " "));
          }), o && (r = "perspective" + o + " " + r);
        }x.setPropertyValue(e, "transform", r);
      } };x.Hooks.register(), x.Normalizations.register(), v.hook = function (e, t, r) {
      var n = a;return e = o(e), $.each(e, function (e, o) {
        if (i(o) === a && v.init(o), r === a) n === a && (n = v.CSS.getPropertyValue(o, t));else {
          var s = v.CSS.setPropertyValue(o, t, r);"transform" === s[0] && v.CSS.flushTransformCache(o), n = s;
        }
      }), n;
    };var S = function () {
      function e() {
        return l ? T.promise || null : f;
      }function n() {
        function e(e) {
          function p(e, t) {
            var r = a,
                i = a,
                s = a;return g.isArray(e) ? (r = e[0], !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? s = e[1] : (g.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (i = t ? e[1] : u(e[1], o.duration), e[2] !== a && (s = e[2]))) : r = e, t || (i = i || o.easing), g.isFunction(r) && (r = r.call(n, w, P)), g.isFunction(s) && (s = s.call(n, w, P)), [r || 0, i, s];
          }function f(e, t) {
            var r, a;return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
              return r = e, "";
            }), r || (r = x.Values.getUnitType(e)), [a, r];
          }function d() {
            var e = { myParent: n.parentNode || r.body, position: x.getPropertyValue(n, "position"), fontSize: x.getPropertyValue(n, "fontSize") },
                a = e.position === N.lastPosition && e.myParent === N.lastParent,
                o = e.fontSize === N.lastFontSize;N.lastParent = e.myParent, N.lastPosition = e.position, N.lastFontSize = e.fontSize;var s = 100,
                l = {};if (o && a) l.emToPx = N.lastEmToPx, l.percentToPxWidth = N.lastPercentToPxWidth, l.percentToPxHeight = N.lastPercentToPxHeight;else {
              var u = i(n).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");v.init(u), e.myParent.appendChild(u), $.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                v.CSS.setPropertyValue(u, t, "hidden");
              }), v.CSS.setPropertyValue(u, "position", e.position), v.CSS.setPropertyValue(u, "fontSize", e.fontSize), v.CSS.setPropertyValue(u, "boxSizing", "content-box"), $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                v.CSS.setPropertyValue(u, t, s + "%");
              }), v.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = N.lastEmToPx = (parseFloat(x.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u);
            }return null === N.remToPx && (N.remToPx = parseFloat(x.getPropertyValue(r.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(t.innerWidth) / 100, N.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = N.remToPx, l.vwToPx = N.vwToPx, l.vhToPx = N.vhToPx, v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), n), l;
          }if (o.begin && 0 === w) try {
            o.begin.call(m, m);
          } catch (y) {
            setTimeout(function () {
              throw y;
            }, 1);
          }if ("scroll" === k) {
            var S = /^x$/i.test(o.axis) ? "Left" : "Top",
                V = parseFloat(o.offset) || 0,
                C,
                A,
                F;o.container ? g.isWrapped(o.container) || g.isNode(o.container) ? (o.container = o.container[0] || o.container, C = o.container["scroll" + S], F = C + $(n).position()[S.toLowerCase()] + V) : o.container = null : (C = v.State.scrollAnchor[v.State["scrollProperty" + S]], A = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === S ? "Top" : "Left")]], F = $(n).offset()[S.toLowerCase()] + V), s = { scroll: { rootPropertyValue: !1, startValue: C, currentValue: C, endValue: F, unitType: "", easing: o.easing, scrollData: { container: o.container, direction: S, alternateValue: A } }, element: n }, v.debug && console.log("tweensContainer (scroll): ", s.scroll, n);
          } else if ("reverse" === k) {
            if (!i(n).tweensContainer) return void $.dequeue(n, o.queue);"none" === i(n).opts.display && (i(n).opts.display = "auto"), "hidden" === i(n).opts.visibility && (i(n).opts.visibility = "visible"), i(n).opts.loop = !1, i(n).opts.begin = null, i(n).opts.complete = null, b.easing || delete o.easing, b.duration || delete o.duration, o = $.extend({}, i(n).opts, o);var E = $.extend(!0, {}, i(n).tweensContainer);for (var j in E) if ("element" !== j) {
              var H = E[j].startValue;E[j].startValue = E[j].currentValue = E[j].endValue, E[j].endValue = H, g.isEmptyObject(b) || (E[j].easing = o.easing), v.debug && console.log("reverse tweensContainer (" + j + "): " + JSON.stringify(E[j]), n);
            }s = E;
          } else if ("start" === k) {
            var E;i(n).tweensContainer && i(n).isAnimating === !0 && (E = i(n).tweensContainer), $.each(h, function (e, t) {
              if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(e)) {
                var r = p(t, !0),
                    n = r[0],
                    o = r[1],
                    i = r[2];if (x.RegEx.isHex.test(n)) {
                  for (var s = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(n), u = i ? x.Values.hexToRgb(i) : a, c = 0; c < s.length; c++) {
                    var f = [l[c]];o && f.push(o), u !== a && f.push(u[c]), h[e + s[c]] = f;
                  }delete h[e];
                }
              }
            });for (var R in h) {
              var O = p(h[R]),
                  z = O[0],
                  q = O[1],
                  M = O[2];R = x.Names.camelCase(R);var I = x.Hooks.getRoot(R),
                  B = !1;if (i(n).isSVG || "tween" === I || x.Names.prefixCheck(I)[1] !== !1 || x.Normalizations.registered[I] !== a) {
                (o.display !== a && null !== o.display && "none" !== o.display || o.visibility !== a && "hidden" !== o.visibility) && /opacity|filter/.test(R) && !M && 0 !== z && (M = 0), o._cacheValues && E && E[R] ? (M === a && (M = E[R].endValue + E[R].unitType), B = i(n).rootPropertyValueCache[I]) : x.Hooks.registered[R] ? M === a ? (B = x.getPropertyValue(n, I), M = x.getPropertyValue(n, R, B)) : B = x.Hooks.templates[I][1] : M === a && (M = x.getPropertyValue(n, R));var W,
                    G,
                    D,
                    X = !1;if (W = f(R, M), M = W[0], D = W[1], W = f(R, z), z = W[0].replace(/^([+-\/*])=/, function (e, t) {
                  return X = t, "";
                }), G = W[1], M = parseFloat(M) || 0, z = parseFloat(z) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(R) ? (z /= 100, G = "em") : /^scale/.test(R) ? (z /= 100, G = "") : /(Red|Green|Blue)$/i.test(R) && (z = z / 100 * 255, G = "")), /[\/*]/.test(X)) G = D;else if (D !== G && 0 !== M) if (0 === z) G = D;else {
                  l = l || d();var Y = /margin|padding|left|right|width|text|word|letter/i.test(R) || /X$/.test(R) || "x" === R ? "x" : "y";switch (D) {case "%":
                      M *= "x" === Y ? l.percentToPxWidth : l.percentToPxHeight;break;case "px":
                      break;default:
                      M *= l[D + "ToPx"];}switch (G) {case "%":
                      M *= 1 / ("x" === Y ? l.percentToPxWidth : l.percentToPxHeight);break;case "px":
                      break;default:
                      M *= 1 / l[G + "ToPx"];}
                }switch (X) {case "+":
                    z = M + z;break;case "-":
                    z = M - z;break;case "*":
                    z = M * z;break;case "/":
                    z = M / z;}s[R] = { rootPropertyValue: B, startValue: M, currentValue: M, endValue: z, unitType: G, easing: q }, v.debug && console.log("tweensContainer (" + R + "): " + JSON.stringify(s[R]), n);
              } else v.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
            }s.element = n;
          }s.element && (x.Values.addClass(n, "velocity-animating"), L.push(s), "" === o.queue && (i(n).tweensContainer = s, i(n).opts = o), i(n).isAnimating = !0, w === P - 1 ? (v.State.calls.push([L, m, o, null, T.resolver]), v.State.isTicking === !1 && (v.State.isTicking = !0, c())) : w++);
        }var n = this,
            o = $.extend({}, v.defaults, b),
            s = {},
            l;switch (i(n) === a && v.init(n), parseFloat(o.delay) && o.queue !== !1 && $.queue(n, o.queue, function (e) {
          v.velocityQueueEntryFlag = !0, i(n).delayTimer = { setTimeout: setTimeout(e, parseFloat(o.delay)), next: e };
        }), o.duration.toString().toLowerCase()) {case "fast":
            o.duration = 200;break;case "normal":
            o.duration = y;break;case "slow":
            o.duration = 600;break;default:
            o.duration = parseFloat(o.duration) || 1;}v.mock !== !1 && (v.mock === !0 ? o.duration = o.delay = 1 : (o.duration *= parseFloat(v.mock) || 1, o.delay *= parseFloat(v.mock) || 1)), o.easing = u(o.easing, o.duration), o.begin && !g.isFunction(o.begin) && (o.begin = null), o.progress && !g.isFunction(o.progress) && (o.progress = null), o.complete && !g.isFunction(o.complete) && (o.complete = null), o.display !== a && null !== o.display && (o.display = o.display.toString().toLowerCase(), "auto" === o.display && (o.display = v.CSS.Values.getDisplayType(n))), o.visibility !== a && null !== o.visibility && (o.visibility = o.visibility.toString().toLowerCase()), o.mobileHA = o.mobileHA && v.State.isMobile && !v.State.isGingerbread, o.queue === !1 ? o.delay ? setTimeout(e, o.delay) : e() : $.queue(n, o.queue, function (t, r) {
          return r === !0 ? (T.promise && T.resolver(m), !0) : (v.velocityQueueEntryFlag = !0, void e(t));
        }), "" !== o.queue && "fx" !== o.queue || "inprogress" === $.queue(n)[0] || $.dequeue(n);
      }var s = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties)),
          l,
          f,
          d,
          m,
          h,
          b;if (g.isWrapped(this) ? (l = !1, d = 0, m = this, f = this) : (l = !0, d = 1, m = s ? arguments[0].elements || arguments[0].e : arguments[0]), m = o(m)) {
        s ? (h = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (h = arguments[d], b = arguments[d + 1]);var P = m.length,
            w = 0;if (!/^(stop|finish)$/i.test(h) && !$.isPlainObject(b)) {
          var V = d + 1;b = {};for (var C = V; C < arguments.length; C++) g.isArray(arguments[C]) || !/^(fast|normal|slow)$/i.test(arguments[C]) && !/^\d/.test(arguments[C]) ? g.isString(arguments[C]) || g.isArray(arguments[C]) ? b.easing = arguments[C] : g.isFunction(arguments[C]) && (b.complete = arguments[C]) : b.duration = arguments[C];
        }var T = { promise: null, resolver: null, rejecter: null };l && v.Promise && (T.promise = new v.Promise(function (e, t) {
          T.resolver = e, T.rejecter = t;
        }));var k;switch (h) {case "scroll":
            k = "scroll";break;case "reverse":
            k = "reverse";break;case "finish":case "stop":
            $.each(m, function (e, t) {
              i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer);
            });var A = [];return $.each(v.State.calls, function (e, t) {
              t && $.each(t[1], function (r, n) {
                var o = b === a ? "" : b;return o === !0 || t[2].queue === o || b === a && t[2].queue === !1 ? void $.each(m, function (r, a) {
                  a === n && ((b === !0 || g.isString(b)) && ($.each($.queue(a, g.isString(b) ? b : ""), function (e, t) {
                    g.isFunction(t) && t(null, !0);
                  }), $.queue(a, g.isString(b) ? b : "", [])), "stop" === h ? (i(a) && i(a).tweensContainer && o !== !1 && $.each(i(a).tweensContainer, function (e, t) {
                    t.endValue = t.currentValue;
                  }), A.push(e)) : "finish" === h && (t[2].duration = 1));
                }) : !0;
              });
            }), "stop" === h && ($.each(A, function (e, t) {
              p(t, !0);
            }), T.promise && T.resolver(m)), e();default:
            if (!$.isPlainObject(h) || g.isEmptyObject(h)) {
              if (g.isString(h) && v.Redirects[h]) {
                var F = $.extend({}, b),
                    E = F.duration,
                    j = F.delay || 0;return F.backwards === !0 && (m = $.extend(!0, [], m).reverse()), $.each(m, function (e, t) {
                  parseFloat(F.stagger) ? F.delay = j + parseFloat(F.stagger) * e : g.isFunction(F.stagger) && (F.delay = j + F.stagger.call(t, e, P)), F.drag && (F.duration = parseFloat(E) || (/^(callout|transition)/.test(h) ? 1e3 : y), F.duration = Math.max(F.duration * (F.backwards ? 1 - e / P : (e + 1) / P), .75 * F.duration, 200)), v.Redirects[h].call(t, t, F || {}, e, P, m, T.promise ? T : a);
                }), e();
              }var H = "Velocity: First argument (" + h + ") was not a property map, a known action, or a registered redirect. Aborting.";return T.promise ? T.rejecter(new Error(H)) : console.log(H), e();
            }k = "start";}var N = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
            L = [];$.each(m, function (e, t) {
          g.isNode(t) && n.call(t);
        });var F = $.extend({}, v.defaults, b),
            R;if (F.loop = parseInt(F.loop), R = 2 * F.loop - 1, F.loop) for (var O = 0; R > O; O++) {
          var z = { delay: F.delay, progress: F.progress };O === R - 1 && (z.display = F.display, z.visibility = F.visibility, z.complete = F.complete), S(m, "reverse", z);
        }return e();
      }
    };v = $.extend(S, v), v.animate = S;var P = t.requestAnimationFrame || d;return v.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
      r.hidden ? (P = function (e) {
        return setTimeout(function () {
          e(!0);
        }, 16);
      }, c()) : P = t.requestAnimationFrame || d;
    }), e.Velocity = v, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = v.defaults), $.each(["Down", "Up"], function (e, t) {
      v.Redirects["slide" + t] = function (e, r, n, o, i, s) {
        var l = $.extend({}, r),
            u = l.begin,
            c = l.complete,
            p = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
            f = {};l.display === a && (l.display = "Down" === t ? "inline" === v.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
          u && u.call(i, i);for (var r in p) {
            f[r] = e.style[r];var a = v.CSS.getPropertyValue(e, r);p[r] = "Down" === t ? [a, 0] : [0, a];
          }f.overflow = e.style.overflow, e.style.overflow = "hidden";
        }, l.complete = function () {
          for (var t in f) e.style[t] = f[t];c && c.call(i, i), s && s.resolver(i);
        }, v(e, p, l);
      };
    }), $.each(["In", "Out"], function (e, t) {
      v.Redirects["fade" + t] = function (e, r, n, o, i, s) {
        var l = $.extend({}, r),
            u = { opacity: "In" === t ? 1 : 0 },
            c = l.complete;l.complete = n !== o - 1 ? l.begin = null : function () {
          c && c.call(i, i), s && s.resolver(i);
        }, l.display === a && (l.display = "In" === t ? "auto" : "none"), v(this, u, l);
      };
    }), v;
  }(window.jQuery || window.Zepto || window, window, document);
});
/*!--------------------------------------------------------------------
JAVASCRIPT "Outdated Browser"
Version:    1.1.0 - 2014
author:     Burocratik
website:    http://www.burocratik.com
* @preserve
-----------------------------------------------------------------------*/
var outdatedBrowser = function (t) {
  function o(t) {
    s.style.opacity = t / 100, s.style.filter = "alpha(opacity=" + t + ")";
  }function e(t) {
    o(t), 1 == t && (s.style.display = "block"), 100 == t && (u = !0);
  }function r() {
    var t = document.getElementById("btnCloseUpdateBrowser"),
        o = document.getElementById("btnUpdateBrowser");s.style.backgroundColor = bkgColor, s.style.color = txtColor, s.children[0].style.color = txtColor, s.children[1].style.color = txtColor, o.style.color = txtColor, o.style.borderColor && (o.style.borderColor = txtColor), t.style.color = txtColor, t.onmousedown = function () {
      return s.style.display = "none", !1;
    }, o.onmouseover = function () {
      this.style.color = bkgColor, this.style.backgroundColor = txtColor;
    }, o.onmouseout = function () {
      this.style.color = txtColor, this.style.backgroundColor = bkgColor;
    };
  }function l() {
    var t = !1;if (window.XMLHttpRequest) t = new XMLHttpRequest();else if (window.ActiveXObject) try {
      t = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (o) {
      try {
        t = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (o) {
        t = !1;
      }
    }return t;
  }function a(t) {
    var o = l();return o && (o.onreadystatechange = function () {
      n(o);
    }, o.open("GET", t, !0), o.send(null)), !1;
  }function n(t) {
    var o = document.getElementById("outdated");return 4 == t.readyState && (o.innerHTML = 200 == t.status || 304 == t.status ? t.responseText : d, r()), !1;
  }var s = document.getElementById("outdated");this.defaultOpts = { bgColor: "#f25648", color: "#ffffff", lowerThan: "transform", languagePath: "../outdatedbrowser/lang/en.html" }, t ? ("IE8" == t.lowerThan || "borderSpacing" == t.lowerThan ? t.lowerThan = "borderSpacing" : "IE9" == t.lowerThan || "boxShadow" == t.lowerThan ? t.lowerThan = "boxShadow" : "IE10" == t.lowerThan || "transform" == t.lowerThan || "" == t.lowerThan || "undefined" == typeof t.lowerThan ? t.lowerThan = "transform" : ("IE11" == t.lowerThan || "borderImage" == t.lowerThan) && (t.lowerThan = "borderImage"), this.defaultOpts.bgColor = t.bgColor, this.defaultOpts.color = t.color, this.defaultOpts.lowerThan = t.lowerThan, this.defaultOpts.languagePath = t.languagePath, bkgColor = this.defaultOpts.bgColor, txtColor = this.defaultOpts.color, cssProp = this.defaultOpts.lowerThan, languagePath = this.defaultOpts.languagePath) : (bkgColor = this.defaultOpts.bgColor, txtColor = this.defaultOpts.color, cssProp = this.defaultOpts.lowerThan, languagePath = this.defaultOpts.languagePath);var u = !0,
      i = function () {
    var t = document.createElement("div"),
        o = "Khtml Ms O Moz Webkit".split(" "),
        e = o.length;return function (r) {
      if (r in t.style) return !0;for (r = r.replace(/^[a-z]/, function (t) {
        return t.toUpperCase();
      }); e--;) if (o[e] + r in t.style) return !0;return !1;
    };
  }();if (!i("" + cssProp)) {
    if (u && "1" !== s.style.opacity) {
      u = !1;for (var c = 1; 100 >= c; c++) setTimeout(function (t) {
        return function () {
          e(t);
        };
      }(c), 8 * c);
    }" " === languagePath || 0 == languagePath.length ? r() : a(languagePath);var d = '<h6>Your browser is out-of-date!</h6><p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>';
  }
};
/*
    Breakpoints.js
    version 1.0

    Creates handy events for your responsive design breakpoints

    Copyright 2011 XOXCO, Inc
    http://xoxco.com/

    Documentation for this plugin lives here:
    http://xoxco.com/projects/code/breakpoints

    Licensed under the MIT license:
    http://www.opensource.org/licenses/mit-license.php

*/
(function ($) {

    var lastSize = 0;
    var interval = null;

    $.fn.resetBreakpoints = function () {
        $(window).unbind('resize');
        if (interval) {
            clearInterval(interval);
        }
        lastSize = 0;
    };

    $.fn.setBreakpoints = function (settings) {
        var options = jQuery.extend({
            distinct: true,
            breakpoints: new Array(320, 480, 768, 1024)
        }, settings);

        interval = setInterval(function () {

            var w = $(window).width();
            var done = false;

            for (var bp in options.breakpoints.sort(function (a, b) {
                return b - a;
            })) {

                // fire onEnter when a browser expands into a new breakpoint
                // if in distinct mode, remove all other breakpoints first.
                if (!done && w >= options.breakpoints[bp] && lastSize < options.breakpoints[bp]) {
                    if (options.distinct) {
                        for (var x in options.breakpoints.sort(function (a, b) {
                            return b - a;
                        })) {
                            if ($('body').hasClass('breakpoint-' + options.breakpoints[x])) {
                                $('body').removeClass('breakpoint-' + options.breakpoints[x]);
                                $(window).trigger('exitBreakpoint' + options.breakpoints[x]);
                            }
                        }
                        done = true;
                    }
                    $('body').addClass('breakpoint-' + options.breakpoints[bp]);
                    $(window).trigger('enterBreakpoint' + options.breakpoints[bp]);
                }

                // fire onExit when browser contracts out of a larger breakpoint
                if (w < options.breakpoints[bp] && lastSize >= options.breakpoints[bp]) {
                    $('body').removeClass('breakpoint-' + options.breakpoints[bp]);
                    $(window).trigger('exitBreakpoint' + options.breakpoints[bp]);
                }

                // if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
                if (options.distinct && // only one breakpoint at a time
                w >= options.breakpoints[bp] && // and we are in this one
                w < options.breakpoints[bp - 1] && // and smaller than the bigger one
                lastSize > w && // and we contracted
                lastSize > 0 && // and this is not the first time
                !$('body').hasClass('breakpoint-' + options.breakpoints[bp]) // and we aren't already in this breakpoint
                ) {
                        $('body').addClass('breakpoint-' + options.breakpoints[bp]);
                        $(window).trigger('enterBreakpoint' + options.breakpoints[bp]);
                    }
            }

            // set up for next call
            if (lastSize != w) {
                lastSize = w;
            }
        }, 250);
    };
})(jQuery);
(function ($) {
	/* hoverIntent by Brian Cherne */
	$.fn.hoverIntent = function (f, g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f);

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function (ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function (ev, ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if (Math.abs(pX - cX) + Math.abs(pY - cY) < cfg.sensitivity) {
				$(ob).unbind("mousemove", track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob, [ev]);
			} else {
				// set previous coordinates for next time
				pX = cX;pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout(function () {
					compare(ev, ob);
				}, cfg.interval);
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function (ev, ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob, [ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function (e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while (p && p != this) {
				try {
					p = p.parentNode;
				} catch (e) {
					p = this;
				}
			}
			if (p == this) {
				return false;
			}

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({}, e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			}

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX;pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove", track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) {
					ob.hoverIntent_t = setTimeout(function () {
						compare(ev, ob);
					}, cfg.interval);
				}

				// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove", track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) {
					ob.hoverIntent_t = setTimeout(function () {
						delay(ev, ob);
					}, cfg.timeout);
				}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
})(jQuery);

/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

;(function ($) {
	// $ will refer to jQuery within this closure

	$.fn.supersubs = function (options) {
		var opts = $.extend({}, $.fn.supersubs.defaults, options);
		// return original object to support chaining
		return this.each(function () {
			// cache selections
			var $$ = $(this);
			// support metadata
			var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
			// get the font size of menu.
			// .css('fontSize') returns various results cross-browser, so measure an em dash instead
			var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
				'padding': 0,
				'position': 'absolute',
				'top': '-999em',
				'width': 'auto'
			}).appendTo($$).width(); //clientWidth is faster, but was incorrect here
			// remove em dash
			$('#menu-fontsize').remove();
			// cache all ul elements
			$ULs = $$.find('ul');
			// loop through each ul in menu
			$ULs.each(function (i) {
				// cache this ul
				var $ul = $ULs.eq(i);
				// get all (li) children of this ul
				var $LIs = $ul.children();
				// get all anchor grand-children
				var $As = $LIs.children('a');
				// force content to one line and save current float property
				var liFloat = $LIs.css('white-space', 'nowrap').css('float');
				// remove width restrictions and floats so elements remain vertically stacked
				var emWidth = $ul.add($LIs).add($As).css({
					'float': 'none',
					'width': 'auto'
				})
				// this ul will now be shrink-wrapped to longest li due to position:absolute
				// so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
				.end().end()[0].clientWidth / fontsize;
				// add more width to ensure lines don't turn over at certain sizes in various browsers
				emWidth += o.extraWidth;
				// restrict to at least minWidth and at most maxWidth
				if (emWidth > o.maxWidth) {
					emWidth = o.maxWidth;
				} else if (emWidth < o.minWidth) {
					emWidth = o.minWidth;
				}
				emWidth += 'em';
				// set ul to width in ems
				$ul.css('width', emWidth);
				// restore li floats to avoid IE bugs
				// set li width to full width of this ul
				// revert white-space to normal
				$LIs.css({
					'float': liFloat,
					'width': '100%',
					'white-space': 'normal'
				})
				// update offset position of descendant ul to reflect new width of parent
				.each(function () {
					var $childUl = $('>ul', this);
					var offsetDirection = $childUl.css('left') !== undefined ? 'left' : 'right';
					$childUl.css(offsetDirection, emWidth);
				});
			});
		});
	};
	// expose defaults
	$.fn.supersubs.defaults = {
		minWidth: 9, // requires em unit.
		maxWidth: 25, // requires em unit.
		extraWidth: 0 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
	};
})(jQuery); // plugin code ends

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function ($) {
	$.fn.superfish = function (op) {

		var sf = $.fn.superfish,
		    c = sf.c,
		    $arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')),
		    over = function () {
			var $$ = $(this),
			    menu = getMenu($$);
			clearTimeout(menu.sfTimer);
			$$.showSuperfishUl().siblings().hideSuperfishUl();
		},
		    out = function () {
			var $$ = $(this),
			    menu = getMenu($$),
			    o = sf.op;
			clearTimeout(menu.sfTimer);
			menu.sfTimer = setTimeout(function () {
				o.retainPath = $.inArray($$[0], o.$path) > -1;
				$$.hideSuperfishUl();
				if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) {
					over.call(o.$path);
				}
			}, o.delay);
		},
		    getMenu = function ($menu) {
			var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
			sf.op = sf.o[menu.serial];
			return menu;
		},
		    addArrow = function ($a) {
			$a.addClass(c.anchorClass).append($arrow.clone());
		};

		return this.each(function () {
			var s = this.serial = sf.o.length;
			var o = $.extend({}, sf.defaults, op);
			o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels).each(function () {
				$(this).addClass([o.hoverClass, c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;

			$('li:has(ul)', this)[$.fn.hoverIntent && !o.disableHI ? 'hoverIntent' : 'hover'](over, out).each(function () {
				if (o.autoArrows) addArrow($('>a:first-child', this));
			}).not('.' + c.bcClass).hideSuperfishUl();

			var $a = $('a', this);
			$a.each(function (i) {
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function () {
					over.call($li);
				}).blur(function () {
					out.call($li);
				});
			});
			o.onInit.call(this);
		}).each(function () {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function () {
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined) this.toggleClass(sf.c.shadowClass + '-off');
	};
	sf.c = {
		bcClass: 'sf-breadcrumb',
		menuClass: 'sf-js-enabled',
		anchorClass: 'sf-with-ul',
		arrowClass: 'sf-sub-indicator',
		shadowClass: 'sf-shadow'
	};
	sf.defaults = {
		hoverClass: 'sfHover',
		pathClass: 'overideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: { opacity: 'show' },
		speed: 'normal',
		autoArrows: true,
		dropShadows: true,
		disableHI: false, // true disables hoverIntent detection
		onInit: function () {}, // callback functions
		onBeforeShow: function () {},
		onShow: function () {},
		onHide: function () {}
	};
	$.fn.extend({
		hideSuperfishUl: function () {
			var o = sf.op,
			    not = o.retainPath === true ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility', 'hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl: function () {
			var o = sf.op,
			    sh = sf.c.shadowClass + '-off',
			    $ul = this.addClass(o.hoverClass).find('>ul:hidden').css('visibility', 'visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation, o.speed, function () {
				sf.IE7fix.call($ul);o.onShow.call($ul);
			});
			return this;
		}
	});
})(jQuery);
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.8
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery);
}(function (a) {
  "use strict";
  var b = window.Slick || {};b = function () {
    function c(c, d) {
      var f,
          e = this;e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (a, b) {
          return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>";
        }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.hidden = "hidden", e.paused = !1, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, f, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0), e.checkResponsive(!0);
    }var b = 0;return c;
  }(), b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
    var e = this;if ("boolean" == typeof c) d = c, c = null;else if (0 > c || c >= e.slideCount) return !1;e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
      a(c).attr("data-slick-index", b);
    }), e.$slidesCache = e.$slides, e.reinit();
  }, b.prototype.animateHeight = function () {
    var a = this;if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({ height: b }, a.options.speed);
    }
  }, b.prototype.animateSlide = function (b, c) {
    var d = {},
        e = this;e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function (a) {
        a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d));
      }, complete: function () {
        c && c.call();
      } })) : (e.applyTransition(), b = Math.ceil(b), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
      e.disableTransition(), c.call();
    }, e.options.speed));
  }, b.prototype.asNavFor = function (b) {
    var c = this,
        d = c.options.asNavFor;d && null !== d && (d = a(d).not(c.$slider)), null !== d && "object" == typeof d && d.each(function () {
      var c = a(this).slick("getSlick");c.unslicked || c.slideHandler(b, !0);
    });
  }, b.prototype.applyTransition = function (a) {
    var b = this,
        c = {};c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
  }, b.prototype.autoPlay = function () {
    var a = this;a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed));
  }, b.prototype.autoPlayClear = function () {
    var a = this;a.autoPlayTimer && clearInterval(a.autoPlayTimer);
  }, b.prototype.autoPlayIterator = function () {
    var a = this;a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll);
  }, b.prototype.buildArrows = function () {
    var b = this;b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
  }, b.prototype.buildDots = function () {
    var c,
        d,
        b = this;if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
      for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1) d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
    }
  }, b.prototype.buildOut = function () {
    var b = this;b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
      a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "");
    }), b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable");
  }, b.prototype.buildRows = function () {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        a = this;if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
      for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
        var i = document.createElement("div");for (c = 0; c < a.options.rows; c++) {
          var j = document.createElement("div");for (d = 0; d < a.options.slidesPerRow; d++) {
            var k = b * h + (c * a.options.slidesPerRow + d);g.get(k) && j.appendChild(g.get(k));
          }i.appendChild(j);
        }e.appendChild(i);
      }a.$slider.html(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" });
    }
  }, b.prototype.checkResponsive = function (b, c) {
    var e,
        f,
        g,
        d = this,
        h = !1,
        i = d.$slider.width(),
        j = window.innerWidth || a(window).width();if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
      f = null;for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
    }
  }, b.prototype.changeSlide = function (b, c) {
    var f,
        g,
        h,
        d = this,
        e = a(b.target);switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = 0 !== d.slideCount % d.options.slidesToScroll, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {case "previous":
        g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);break;case "next":
        g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);break;case "index":
        var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");break;default:
        return;}
  }, b.prototype.checkNavigable = function (a) {
    var c,
        d,
        b = this;if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];else for (var e in c) {
      if (a < c[e]) {
        a = d;break;
      }d = c[e];
    }return a;
  }, b.prototype.cleanUpEvents = function () {
    var b = this;b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide), b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
  }, b.prototype.cleanUpRows = function () {
    var b,
        a = this;a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.html(b));
  }, b.prototype.clickHandler = function (a) {
    var b = this;b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
  }, b.prototype.destroy = function (b) {
    var c = this;c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      a(this).attr("style", a(this).data("originalStyling"));
    }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]);
  }, b.prototype.disableTransition = function (a) {
    var b = this,
        c = {};c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
  }, b.prototype.fadeSlide = function (a, b) {
    var c = this;c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function () {
      c.disableTransition(a), b.call();
    }, c.options.speed));
  }, b.prototype.fadeSlideOut = function (a) {
    var b = this;b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
  }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
    var b = this;null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit());
  }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
    var a = this;return a.currentSlide;
  }, b.prototype.getDotCount = function () {
    var a = this,
        b = 0,
        c = 0,
        d = 0;if (a.options.infinite === !0) for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;else if (a.options.centerMode === !0) d = a.slideCount;else for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;return d - 1;
  }, b.prototype.getLeft = function (a) {
    var c,
        d,
        f,
        b = this,
        e = 0;return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = -1 * b.slideWidth * b.options.slidesToShow, e = -1 * d * b.options.slidesToShow), 0 !== b.slideCount % b.options.slidesToScroll && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = -1 * (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth, e = -1 * (b.options.slidesToShow - (a - b.slideCount)) * d) : (b.slideOffset = -1 * b.slideCount % b.options.slidesToScroll * b.slideWidth, e = -1 * b.slideCount % b.options.slidesToScroll * d))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? -1 * a * b.slideWidth + b.slideOffset : -1 * a * d + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c;
  }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
    var b = this;return b.options[a];
  }, b.prototype.getNavigableIndexes = function () {
    var e,
        a = this,
        b = 0,
        c = 0,
        d = [];for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;return d;
  }, b.prototype.getSlick = function () {
    return this;
  }, b.prototype.getSlideCount = function () {
    var c,
        d,
        e,
        b = this;return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
      return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0;
    }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll;
  }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
    var c = this;c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b);
  }, b.prototype.init = function (b) {
    var c = this;a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA();
  }, b.prototype.initArrowEvents = function () {
    var a = this;a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.on("click.slick", { message: "next" }, a.changeSlide));
  }, b.prototype.initDotEvents = function () {
    var b = this;b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1));
  }, b.prototype.initializeEvents = function () {
    var b = this;b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
  }, b.prototype.initUI = function () {
    var a = this;a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay();
  }, b.prototype.keyHandler = function (a) {
    var b = this;a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: "next" } }));
  }, b.prototype.lazyLoad = function () {
    function g(b) {
      a("img[data-lazy]", b).each(function () {
        var b = a(this),
            c = a(this).attr("data-lazy"),
            d = document.createElement("img");d.onload = function () {
          b.animate({ opacity: 0 }, 100, function () {
            b.attr("src", c).animate({ opacity: 1 }, 200, function () {
              b.removeAttr("data-lazy").removeClass("slick-loading");
            });
          });
        }, d.src = c;
      });
    }var c,
        d,
        e,
        f,
        b = this;b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d));
  }, b.prototype.loadSlider = function () {
    var a = this;a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
  }, b.prototype.next = b.prototype.slickNext = function () {
    var a = this;a.changeSlide({ data: { message: "next" } });
  }, b.prototype.orientationChange = function () {
    var a = this;a.checkResponsive(), a.setPosition();
  }, b.prototype.pause = b.prototype.slickPause = function () {
    var a = this;a.autoPlayClear(), a.paused = !0;
  }, b.prototype.play = b.prototype.slickPlay = function () {
    var a = this;a.paused = !1, a.autoPlay();
  }, b.prototype.postSlide = function (a) {
    var b = this;b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(), b.options.accessibility === !0 && b.initADA();
  }, b.prototype.prev = b.prototype.slickPrev = function () {
    var a = this;a.changeSlide({ data: { message: "previous" } });
  }, b.prototype.preventDefault = function (a) {
    a.preventDefault();
  }, b.prototype.progressiveLazyLoad = function () {
    var c,
        d,
        b = this;c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function () {
      d.removeAttr("data-lazy"), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition();
    }).error(function () {
      d.removeAttr("data-lazy"), b.progressiveLazyLoad();
    }));
  }, b.prototype.refresh = function (b) {
    var c = this,
        d = c.currentSlide;c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1);
  }, b.prototype.registerBreakpoints = function () {
    var c,
        d,
        e,
        b = this,
        f = b.options.responsive || null;if ("array" === a.type(f) && f.length) {
      b.respondTo = b.options.respondTo || "window";for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
        for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings;
      }b.breakpoints.sort(function (a, c) {
        return b.options.mobileFirst ? a - c : c - a;
      });
    }
  }, b.prototype.reinit = function () {
    var b = this;b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b]), b.options.autoplay === !0 && b.focusHandler();
  }, b.prototype.resize = function () {
    var b = this;a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
      b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition();
    }, 50));
  }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
    var d = this;return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, d.reinit(), void 0);
  }, b.prototype.setCSS = function (a) {
    var d,
        e,
        b = this,
        c = {};b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)));
  }, b.prototype.setDimensions = function () {
    var a = this;a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
  }, b.prototype.setFade = function () {
    var c,
        b = this;b.$slides.each(function (d, e) {
      c = -1 * b.slideWidth * d, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 });
    }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 });
  }, b.prototype.setHeight = function () {
    var a = this;if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height", b);
    }
  }, b.prototype.setOption = b.prototype.slickSetOption = function (b, c, d) {
    var f,
        g,
        e = this;if ("responsive" === b && "array" === a.type(c)) {
      for (g in c) if ("array" !== a.type(e.options.responsive)) e.options.responsive = [c[g]];else {
        for (f = e.options.responsive.length - 1; f >= 0;) e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--;e.options.responsive.push(c[g]);
      }
    } else e.options[b] = c;d === !0 && (e.unload(), e.reinit());
  }, b.prototype.setPosition = function () {
    var a = this;a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]);
  }, b.prototype.setProps = function () {
    var a = this,
        b = document.body.style;a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType && a.animType !== !1;
  }, b.prototype.setSlideClasses = function (a) {
    var c,
        d,
        e,
        f,
        b = this;d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad();
  }, b.prototype.setupInfinite = function () {
    var c,
        d,
        e,
        b = this;if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
      for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        a(this).attr("id", "");
      });
    }
  }, b.prototype.setPaused = function (a) {
    var b = this;b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a, a ? b.autoPlayClear() : b.autoPlay());
  }, b.prototype.selectHandler = function (b) {
    var c = this,
        d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
        e = parseInt(d.attr("data-slick-index"));return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), c.asNavFor(e), void 0) : (c.slideHandler(e), void 0);
  }, b.prototype.slideHandler = function (a, b, c) {
    var d,
        e,
        f,
        g,
        h = null,
        i = this;return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
      i.postSlide(d);
    }) : i.postSlide(d)), void 0) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
      i.postSlide(d);
    }) : i.postSlide(d)), void 0) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? 0 !== i.slideCount % i.options.slidesToScroll ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? 0 !== i.slideCount % i.options.slidesToScroll ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
      i.postSlide(e);
    })) : i.postSlide(e), i.animateHeight(), void 0) : (c !== !0 ? i.animateSlide(h, function () {
      i.postSlide(e);
    }) : i.postSlide(e), void 0)));
  }, b.prototype.startLoad = function () {
    var a = this;a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading");
  }, b.prototype.swipeDirection = function () {
    var a,
        b,
        c,
        d,
        e = this;return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical";
  }, b.prototype.swipeEnd = function () {
    var c,
        b = this;if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) {case "left":
        c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(c), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]);break;case "right":
        c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(c), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"]);} else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {});
  }, b.prototype.swipeHandler = function (a) {
    var b = this;if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {case "start":
        b.swipeStart(a);break;case "move":
        b.swipeMove(a);break;case "end":
        b.swipeEnd(a);}
  }, b.prototype.swipeMove = function (a) {
    var d,
        e,
        f,
        g,
        h,
        b = this;return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.swipeLeft = b.options.vertical === !1 ? d + f * g : d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : (b.setCSS(b.swipeLeft), void 0)) : void 0);
  }, b.prototype.swipeStart = function (a) {
    var c,
        b = this;return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, b.dragging = !0, void 0);
  }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
    var a = this;null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit());
  }, b.prototype.unload = function () {
    var b = this;a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
  }, b.prototype.unslick = function (a) {
    var b = this;b.$slider.trigger("unslick", [b, a]), b.destroy();
  }, b.prototype.updateArrows = function () {
    var b,
        a = this;b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
  }, b.prototype.updateDots = function () {
    var a = this;null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"));
  }, b.prototype.visibility = function () {
    var a = this;document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1, a.autoPlay());
  }, b.prototype.initADA = function () {
    var b = this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
      a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c });
    }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
      a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c });
    }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA();
  }, b.prototype.activateADA = function () {
    var a = this,
        b = a.$slider.find("*").is(":focus");a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false", tabindex: "0" }).find("a, input, button, select").attr({ tabindex: "0" }), b && a.$slideTrack.find(".slick-active").focus();
  }, b.prototype.focusHandler = function () {
    var b = this;b.$slider.on("focus.slick blur.slick", "*", function (c) {
      c.stopImmediatePropagation();var d = a(this);setTimeout(function () {
        b.isPlay && (d.is(":focus") ? (b.autoPlayClear(), b.paused = !0) : (b.paused = !1, b.autoPlay()));
      }, 0);
    });
  }, a.fn.slick = function () {
    var g,
        a = this,
        c = arguments[0],
        d = Array.prototype.slice.call(arguments, 1),
        e = a.length,
        f = 0;for (f; e > f; f++) if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;return a;
  };
});
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});
/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.5.0
 */
(function (root, factory) {

  // AMD
  if (typeof define === "function" && define.amd) {
    define(["exports", "jquery"], function (exports, $) {
      return factory(exports, $);
    });
  }

  // CommonJS
  else if (typeof exports !== "undefined") {
      var $ = require("jquery");
      factory(exports, $);
    }

    // Browser
    else {
        factory(root, root.jQuery || root.Zepto || root.ender || root.$);
      }
})(this, function (exports, $) {

  var patterns = {
    validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
    key: /[a-z0-9_]+|(?=\[\])/gi,
    push: /^$/,
    fixed: /^\d+$/,
    named: /^[a-z0-9_]+$/i
  };

  function FormSerializer(helper, $form) {

    // private variables
    var data = {},
        pushes = {};

    // private API
    function build(base, key, value) {
      base[key] = value;
      return base;
    }

    function makeObject(root, value) {

      var keys = root.match(patterns.key),
          k;

      // nest, nest, ..., nest
      while ((k = keys.pop()) !== undefined) {
        // foo[]
        if (patterns.push.test(k)) {
          var idx = incrementPush(root.replace(/\[\]$/, ''));
          value = build([], idx, value);
        }

        // foo[n]
        else if (patterns.fixed.test(k)) {
            value = build([], k, value);
          }

          // foo; foo[bar]
          else if (patterns.named.test(k)) {
              value = build({}, k, value);
            }
      }

      return value;
    }

    function incrementPush(key) {
      if (pushes[key] === undefined) {
        pushes[key] = 0;
      }
      return pushes[key]++;
    }

    function encode(pair) {
      switch ($('[name="' + pair.name + '"]', $form).attr("type")) {
        case "checkbox":
          return pair.value === "on" ? true : pair.value;
        default:
          return pair.value;
      }
    }

    function addPair(pair) {
      if (!patterns.validate.test(pair.name)) return this;
      var obj = makeObject(pair.name, encode(pair));
      data = helper.extend(true, data, obj);
      return this;
    }

    function addPairs(pairs) {
      if (!helper.isArray(pairs)) {
        throw new Error("formSerializer.addPairs expects an Array");
      }
      for (var i = 0, len = pairs.length; i < len; i++) {
        this.addPair(pairs[i]);
      }
      return this;
    }

    function serialize() {
      return data;
    }

    function serializeJSON() {
      return JSON.stringify(serialize());
    }

    // public API
    this.addPair = addPair;
    this.addPairs = addPairs;
    this.serialize = serialize;
    this.serializeJSON = serializeJSON;
  }

  FormSerializer.patterns = patterns;

  FormSerializer.serializeObject = function serializeObject() {
    return new FormSerializer($, this).addPairs(this.serializeArray()).serialize();
  };

  FormSerializer.serializeJSON = function serializeJSON() {
    return new FormSerializer($, this).addPairs(this.serializeArray()).serializeJSON();
  };

  if (typeof $.fn !== "undefined") {
    $.fn.serializeObject = FormSerializer.serializeObject;
    $.fn.serializeJSON = FormSerializer.serializeJSON;
  }

  exports.FormSerializer = FormSerializer;

  return FormSerializer;
});
/*
 * jQuery Dynatable plugin 0.3.1
 *
 * Copyright (c) 2014 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the AGPL and Proprietary licenses:
 *   http://www.dynatable.com/license/
 *
 * Date: Tue Jan 02 2014
 */
//

(function ($) {
  var defaults,
      mergeSettings,
      dt,
      Model,
      modelPrototypes = {
    dom: Dom,
    domColumns: DomColumns,
    records: Records,
    recordsCount: RecordsCount,
    processingIndicator: ProcessingIndicator,
    state: State,
    sorts: Sorts,
    sortsHeaders: SortsHeaders,
    queries: Queries,
    inputsSearch: InputsSearch,
    paginationPage: PaginationPage,
    paginationPerPage: PaginationPerPage,
    paginationLinks: PaginationLinks
  },
      utility,
      build,
      processAll,
      initModel,
      defaultRowWriter,
      defaultCellWriter,
      defaultAttributeWriter,
      defaultAttributeReader;

  //-----------------------------------------------------------------
  // Cached plugin global defaults
  //-----------------------------------------------------------------

  defaults = {
    features: {
      paginate: true,
      sort: true,
      pushState: true,
      search: true,
      recordCount: true,
      perPageSelect: true
    },
    table: {
      defaultColumnIdStyle: 'camelCase',
      columns: null,
      headRowSelector: 'thead tr', // or e.g. tr:first-child
      bodyRowSelector: 'tbody tr',
      headRowClass: null
    },
    inputs: {
      queries: null,
      sorts: null,
      multisort: ['ctrlKey', 'shiftKey', 'metaKey'],
      page: null,
      queryEvent: 'blur change',
      recordCountTarget: null,
      recordCountPlacement: 'after',
      paginationLinkTarget: null,
      paginationLinkPlacement: 'after',
      paginationClass: 'dynatable-pagination-links',
      paginationLinkClass: 'dynatable-page-link',
      paginationPrevClass: 'dynatable-page-prev',
      paginationNextClass: 'dynatable-page-next',
      paginationActiveClass: 'dynatable-active-page',
      paginationDisabledClass: 'dynatable-disabled-page',
      paginationPrev: 'Previous',
      paginationNext: 'Next',
      paginationGap: [1, 2, 2, 1],
      searchTarget: null,
      searchPlacement: 'before',
      perPageTarget: null,
      perPagePlacement: 'before',
      perPageText: 'Show: ',
      recordCountText: 'Showing ',
      processingText: 'Processing...'
    },
    dataset: {
      ajax: false,
      ajaxUrl: null,
      ajaxCache: null,
      ajaxOnLoad: false,
      ajaxMethod: 'GET',
      ajaxDataType: 'json',
      totalRecordCount: null,
      queries: {},
      queryRecordCount: null,
      page: null,
      perPageDefault: 10,
      perPageOptions: [10, 20, 50, 100],
      sorts: {},
      sortsKeys: null,
      sortTypes: {},
      records: null
    },
    writers: {
      _rowWriter: defaultRowWriter,
      _cellWriter: defaultCellWriter,
      _attributeWriter: defaultAttributeWriter
    },
    readers: {
      _rowReader: null,
      _attributeReader: defaultAttributeReader
    },
    params: {
      dynatable: 'dynatable',
      queries: 'queries',
      sorts: 'sorts',
      page: 'page',
      perPage: 'perPage',
      offset: 'offset',
      records: 'records',
      record: null,
      queryRecordCount: 'queryRecordCount',
      totalRecordCount: 'totalRecordCount'
    }
  };

  //-----------------------------------------------------------------
  // Each dynatable instance inherits from this,
  // set properties specific to instance
  //-----------------------------------------------------------------

  dt = {
    init: function (element, options) {
      this.settings = mergeSettings(options);
      this.element = element;
      this.$element = $(element);

      // All the setup that doesn't require element or options
      build.call(this);

      return this;
    },

    process: function (skipPushState) {
      processAll.call(this, skipPushState);
    }
  };

  //-----------------------------------------------------------------
  // Cached plugin global functions
  //-----------------------------------------------------------------

  mergeSettings = function (options) {
    var newOptions = $.extend(true, {}, defaults, options);

    // TODO: figure out a better way to do this.
    // Doing `extend(true)` causes any elements that are arrays
    // to merge the default and options arrays instead of overriding the defaults.
    if (options) {
      if (options.inputs) {
        if (options.inputs.multisort) {
          newOptions.inputs.multisort = options.inputs.multisort;
        }
        if (options.inputs.paginationGap) {
          newOptions.inputs.paginationGap = options.inputs.paginationGap;
        }
      }
      if (options.dataset && options.dataset.perPageOptions) {
        newOptions.dataset.perPageOptions = options.dataset.perPageOptions;
      }
    }

    return newOptions;
  };

  build = function () {
    this.$element.trigger('dynatable:preinit', this);

    for (model in modelPrototypes) {
      if (modelPrototypes.hasOwnProperty(model)) {
        var modelInstance = this[model] = new modelPrototypes[model](this, this.settings);
        if (modelInstance.initOnLoad()) {
          modelInstance.init();
        }
      }
    }

    this.$element.trigger('dynatable:init', this);

    if (!this.settings.dataset.ajax || this.settings.dataset.ajax && this.settings.dataset.ajaxOnLoad || this.settings.features.paginate) {
      this.process();
    }
  };

  processAll = function (skipPushState) {
    var data = {};

    this.$element.trigger('dynatable:beforeProcess', data);

    if (!$.isEmptyObject(this.settings.dataset.queries)) {
      data[this.settings.params.queries] = this.settings.dataset.queries;
    }
    // TODO: Wrap this in a try/rescue block to hide the processing indicator and indicate something went wrong if error
    this.processingIndicator.show();

    if (this.settings.features.sort && !$.isEmptyObject(this.settings.dataset.sorts)) {
      data[this.settings.params.sorts] = this.settings.dataset.sorts;
    }
    if (this.settings.features.paginate && this.settings.dataset.page) {
      var page = this.settings.dataset.page,
          perPage = this.settings.dataset.perPage;
      data[this.settings.params.page] = page;
      data[this.settings.params.perPage] = perPage;
      data[this.settings.params.offset] = (page - 1) * perPage;
    }
    if (this.settings.dataset.ajaxData) {
      $.extend(data, this.settings.dataset.ajaxData);
    }

    // If ajax, sends query to ajaxUrl with queries and sorts serialized and appended in ajax data
    // otherwise, executes queries and sorts on in-page data
    if (this.settings.dataset.ajax) {
      var _this = this;
      var options = {
        type: _this.settings.dataset.ajaxMethod,
        dataType: _this.settings.dataset.ajaxDataType,
        data: data,
        error: function (xhr, error) {},
        success: function (response) {
          _this.$element.trigger('dynatable:ajax:success', response);
          // Merge ajax results and meta-data into dynatables cached data
          _this.records.updateFromJson(response);
          // update table with new records
          _this.dom.update();

          if (!skipPushState && _this.state.initOnLoad()) {
            _this.state.push(data);
          }
        },
        complete: function () {
          _this.processingIndicator.hide();
        }
      };
      // Do not pass url to `ajax` options if blank
      if (this.settings.dataset.ajaxUrl) {
        options.url = this.settings.dataset.ajaxUrl;

        // If ajaxUrl is blank, then we're using the current page URL,
        // we need to strip out any query, sort, or page data controlled by dynatable
        // that may have been in URL when page loaded, so that it doesn't conflict with
        // what's passed in with the data ajax parameter
      } else {
        options.url = utility.refreshQueryString(window.location.href, {}, this.settings);
      }
      if (this.settings.dataset.ajaxCache !== null) {
        options.cache = this.settings.dataset.ajaxCache;
      }

      $.ajax(options);
    } else {
      this.records.resetOriginal();
      this.queries.run();
      if (this.settings.features.sort) {
        this.records.sort();
      }
      if (this.settings.features.paginate) {
        this.records.paginate();
      }
      this.dom.update();
      this.processingIndicator.hide();

      if (!skipPushState && this.state.initOnLoad()) {
        this.state.push(data);
      }
    }
    this.$element.trigger('dynatable:afterProcess', data);
  };

  function defaultRowWriter(rowIndex, record, columns, cellWriter) {
    var tr = '';

    // grab the record's attribute for each column
    for (var i = 0, len = columns.length; i < len; i++) {
      tr += cellWriter(columns[i], record);
    }

    return '<tr>' + tr + '</tr>';
  };

  function defaultCellWriter(column, record) {
    var html = column.attributeWriter(record),
        td = '<td';

    if (column.hidden || column.textAlign) {
      td += ' style="';

      // keep cells for hidden column headers hidden
      if (column.hidden) {
        td += 'display: none;';
      }

      // keep cells aligned as their column headers are aligned
      if (column.textAlign) {
        td += 'text-align: ' + column.textAlign + ';';
      }

      td += '"';
    }

    return td + '>' + html + '</td>';
  };

  function defaultAttributeWriter(record) {
    // `this` is the column object in settings.columns
    // TODO: automatically convert common types, such as arrays and objects, to string
    return record[this.id];
  };

  function defaultAttributeReader(cell, record) {
    return $(cell).html();
  };

  //-----------------------------------------------------------------
  // Dynatable object model prototype
  // (all object models get these default functions)
  //-----------------------------------------------------------------

  Model = {
    initOnLoad: function () {
      return true;
    },

    init: function () {}
  };

  for (model in modelPrototypes) {
    if (modelPrototypes.hasOwnProperty(model)) {
      var modelPrototype = modelPrototypes[model];
      modelPrototype.prototype = Model;
    }
  }

  //-----------------------------------------------------------------
  // Dynatable object models
  //-----------------------------------------------------------------

  function Dom(obj, settings) {
    var _this = this;

    // update table contents with new records array
    // from query (whether ajax or not)
    this.update = function () {
      var rows = '',
          columns = settings.table.columns,
          rowWriter = settings.writers._rowWriter,
          cellWriter = settings.writers._cellWriter;

      obj.$element.trigger('dynatable:beforeUpdate', rows);

      // loop through records
      for (var i = 0, len = settings.dataset.records.length; i < len; i++) {
        var record = settings.dataset.records[i],
            tr = rowWriter(i, record, columns, cellWriter);
        rows += tr;
      }

      // Appended dynatable interactive elements
      if (settings.features.recordCount) {
        $('#dynatable-record-count-' + obj.element.id).replaceWith(obj.recordsCount.create());
      }
      if (settings.features.paginate) {
        $('#dynatable-pagination-links-' + obj.element.id).replaceWith(obj.paginationLinks.create());
        if (settings.features.perPageSelect) {
          $('#dynatable-per-page-' + obj.element.id).val(parseInt(settings.dataset.perPage));
        }
      }

      // Sort headers functionality
      if (settings.features.sort && columns) {
        obj.sortsHeaders.removeAllArrows();
        for (var i = 0, len = columns.length; i < len; i++) {
          var column = columns[i],
              sortedByColumn = utility.allMatch(settings.dataset.sorts, column.sorts, function (sorts, sort) {
            return sort in sorts;
          }),
              value = settings.dataset.sorts[column.sorts[0]];

          if (sortedByColumn) {
            obj.$element.find('[data-dynatable-column="' + column.id + '"]').find('.dynatable-sort-header').each(function () {
              if (value == 1) {
                obj.sortsHeaders.appendArrowUp($(this));
              } else {
                obj.sortsHeaders.appendArrowDown($(this));
              }
            });
          }
        }
      }

      // Query search functionality
      if (settings.inputs.queries || settings.features.search) {
        var allQueries = settings.inputs.queries || $();
        if (settings.features.search) {
          allQueries = allQueries.add('#dynatable-query-search-' + obj.element.id);
        }

        allQueries.each(function () {
          var $this = $(this),
              q = settings.dataset.queries[$this.data('dynatable-query')];
          $this.val(q || '');
        });
      }

      obj.$element.find(settings.table.bodyRowSelector).remove();
      obj.$element.append(rows);

      obj.$element.trigger('dynatable:afterUpdate', rows);
    };
  };

  function DomColumns(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return obj.$element.is('table');
    };

    this.init = function () {
      settings.table.columns = [];
      this.getFromTable();
    };

    // initialize table[columns] array
    this.getFromTable = function () {
      var $columns = obj.$element.find(settings.table.headRowSelector).children('th,td');
      if ($columns.length) {
        $columns.each(function (index) {
          _this.add($(this), index, true);
        });
      } else {
        return $.error("Couldn't find any columns headers in '" + settings.table.headRowSelector + " th,td'. If your header row is different, specify the selector in the table: headRowSelector option.");
      }
    };

    this.add = function ($column, position, skipAppend, skipUpdate) {
      var columns = settings.table.columns,
          label = $column.text(),
          id = $column.data('dynatable-column') || utility.normalizeText(label, settings.table.defaultColumnIdStyle),
          dataSorts = $column.data('dynatable-sorts'),
          sorts = dataSorts ? $.map(dataSorts.split(','), function (text) {
        return $.trim(text);
      }) : [id];

      // If the column id is blank, generate an id for it
      if (!id) {
        this.generate($column);
        id = $column.data('dynatable-column');
      }
      // Add column data to plugin instance
      columns.splice(position, 0, {
        index: position,
        label: label,
        id: id,
        attributeWriter: settings.writers[id] || settings.writers._attributeWriter,
        attributeReader: settings.readers[id] || settings.readers._attributeReader,
        sorts: sorts,
        hidden: $column.css('display') === 'none',
        textAlign: $column.css('text-align')
      });

      // Modify header cell
      $column.attr('data-dynatable-column', id).addClass('dynatable-head');
      if (settings.table.headRowClass) {
        $column.addClass(settings.table.headRowClass);
      }

      // Append column header to table
      if (!skipAppend) {
        var domPosition = position + 1,
            $sibling = obj.$element.find(settings.table.headRowSelector).children('th:nth-child(' + domPosition + '),td:nth-child(' + domPosition + ')').first(),
            columnsAfter = columns.slice(position + 1, columns.length);

        if ($sibling.length) {
          $sibling.before($column);
          // sibling column doesn't yet exist (maybe this is the last column in the header row)
        } else {
          obj.$element.find(settings.table.headRowSelector).append($column);
        }

        obj.sortsHeaders.attachOne($column.get());

        // increment the index of all columns after this one that was just inserted
        if (columnsAfter.length) {
          for (var i = 0, len = columnsAfter.length; i < len; i++) {
            columnsAfter[i].index += 1;
          }
        }

        if (!skipUpdate) {
          obj.dom.update();
        }
      }

      return dt;
    };

    this.remove = function (columnIndexOrId) {
      var columns = settings.table.columns,
          length = columns.length;

      if (typeof columnIndexOrId === "number") {
        var column = columns[columnIndexOrId];
        this.removeFromTable(column.id);
        this.removeFromArray(columnIndexOrId);
      } else {
        // Traverse columns array in reverse order so that subsequent indices
        // don't get messed up when we delete an item from the array in an iteration
        for (var i = columns.length - 1; i >= 0; i--) {
          var column = columns[i];

          if (column.id === columnIndexOrId) {
            this.removeFromTable(columnIndexOrId);
            this.removeFromArray(i);
          }
        }
      }

      obj.dom.update();
    };

    this.removeFromTable = function (columnId) {
      obj.$element.find(settings.table.headRowSelector).children('[data-dynatable-column="' + columnId + '"]').first().remove();
    };

    this.removeFromArray = function (index) {
      var columns = settings.table.columns,
          adjustColumns;
      columns.splice(index, 1);
      adjustColumns = columns.slice(index, columns.length);
      for (var i = 0, len = adjustColumns.length; i < len; i++) {
        adjustColumns[i].index -= 1;
      }
    };

    this.generate = function ($cell) {
      var cell = $cell === undefined ? $('<th></th>') : $cell;
      return this.attachGeneratedAttributes(cell);
    };

    this.attachGeneratedAttributes = function ($cell) {
      // Use increment to create unique column name that is the same each time the page is reloaded,
      // in order to avoid errors with mismatched attribute names when loading cached `dataset.records` array
      var increment = obj.$element.find(settings.table.headRowSelector).children('th[data-dynatable-generated]').length;
      return $cell.attr('data-dynatable-column', 'dynatable-generated-' + increment) //+ utility.randomHash(),
      .attr('data-dynatable-no-sort', 'true').attr('data-dynatable-generated', increment);
    };
  };

  function Records(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return !settings.dataset.ajax;
    };

    this.init = function () {
      if (settings.dataset.records === null) {
        settings.dataset.records = this.getFromTable();

        if (!settings.dataset.queryRecordCount) {
          settings.dataset.queryRecordCount = this.count();
        }

        if (!settings.dataset.totalRecordCount) {
          settings.dataset.totalRecordCount = settings.dataset.queryRecordCount;
        }
      }

      // Create cache of original full recordset (unpaginated and unqueried)
      settings.dataset.originalRecords = $.extend(true, [], settings.dataset.records);
    };

    // merge ajax response json with cached data including
    // meta-data and records
    this.updateFromJson = function (data) {
      var records;
      if (settings.params.records === "_root") {
        records = data;
      } else if (settings.params.records in data) {
        records = data[settings.params.records];
      }
      if (settings.params.record) {
        var len = records.length - 1;
        for (var i = 0; i < len; i++) {
          records[i] = records[i][settings.params.record];
        }
      }
      if (settings.params.queryRecordCount in data) {
        settings.dataset.queryRecordCount = data[settings.params.queryRecordCount];
      }
      if (settings.params.totalRecordCount in data) {
        settings.dataset.totalRecordCount = data[settings.params.totalRecordCount];
      }
      settings.dataset.records = records;
    };

    // For really advanced sorting,
    // see http://james.padolsey.com/javascript/sorting-elements-with-jquery/
    this.sort = function () {
      var sort = [].sort,
          sorts = settings.dataset.sorts,
          sortsKeys = settings.dataset.sortsKeys,
          sortTypes = settings.dataset.sortTypes;

      var sortFunction = function (a, b) {
        var comparison;
        if ($.isEmptyObject(sorts)) {
          comparison = obj.sorts.functions['originalPlacement'](a, b);
        } else {
          for (var i = 0, len = sortsKeys.length; i < len; i++) {
            var attr = sortsKeys[i],
                direction = sorts[attr],
                sortType = sortTypes[attr] || obj.sorts.guessType(a, b, attr);
            comparison = obj.sorts.functions[sortType](a, b, attr, direction);
            // Don't need to sort any further unless this sort is a tie between a and b,
            // so break the for loop unless tied
            if (comparison !== 0) {
              break;
            }
          }
        }
        return comparison;
      };

      return sort.call(settings.dataset.records, sortFunction);
    };

    this.paginate = function () {
      var bounds = this.pageBounds(),
          first = bounds[0],
          last = bounds[1];
      settings.dataset.records = settings.dataset.records.slice(first, last);
    };

    this.resetOriginal = function () {
      settings.dataset.records = settings.dataset.originalRecords || [];
    };

    this.pageBounds = function () {
      var page = settings.dataset.page || 1,
          first = (page - 1) * settings.dataset.perPage,
          last = Math.min(first + settings.dataset.perPage, settings.dataset.queryRecordCount);
      return [first, last];
    };

    // get initial recordset to populate table
    // if ajax, call ajaxUrl
    // otherwise, initialize from in-table records
    this.getFromTable = function () {
      var records = [],
          columns = settings.table.columns,
          tableRecords = obj.$element.find(settings.table.bodyRowSelector);

      tableRecords.each(function (index) {
        var record = {};
        record['dynatable-original-index'] = index;
        $(this).find('th,td').each(function (index) {
          if (columns[index] === undefined) {
            // Header cell didn't exist for this column, so let's generate and append
            // a new header cell with a randomly generated name (so we can store and
            // retrieve the contents of this column for each record)
            obj.domColumns.add(obj.domColumns.generate(), columns.length, false, true); // don't skipAppend, do skipUpdate
          }
          var value = columns[index].attributeReader(this, record),
              attr = columns[index].id;

          // If value from table is HTML, let's get and cache the text equivalent for
          // the default string sorting, since it rarely makes sense for sort headers
          // to sort based on HTML tags.
          if (typeof value === "string" && value.match(/\s*\<.+\>/)) {
            if (!record['dynatable-sortable-text']) {
              record['dynatable-sortable-text'] = {};
            }
            record['dynatable-sortable-text'][attr] = $.trim($('<div></div>').html(value).text());
          }

          record[attr] = value;
        });
        // Allow configuration function which alters record based on attributes of
        // table row (e.g. from html5 data- attributes)
        if (typeof settings.readers._rowReader === "function") {
          settings.readers._rowReader(index, this, record);
        }
        records.push(record);
      });
      return records; // 1st row is header
    };

    // count records from table
    this.count = function () {
      return settings.dataset.records.length;
    };
  };

  function RecordsCount(obj, settings) {
    this.initOnLoad = function () {
      return settings.features.recordCount;
    };

    this.init = function () {
      this.attach();
    };

    this.create = function () {
      var recordsShown = obj.records.count(),
          recordsQueryCount = settings.dataset.queryRecordCount,
          recordsTotal = settings.dataset.totalRecordCount,
          text = settings.inputs.recordCountText,
          collection_name = settings.params.records;

      if (recordsShown < recordsQueryCount && settings.features.paginate) {
        var bounds = obj.records.pageBounds();
        text += "<span class='dynatable-record-bounds'>" + (bounds[0] + 1) + " to " + bounds[1] + "</span> of ";
      } else if (recordsShown === recordsQueryCount && settings.features.paginate) {
        text += recordsShown + " of ";
      }
      text += recordsQueryCount + " " + collection_name;
      if (recordsQueryCount < recordsTotal) {
        text += " (filtered from " + recordsTotal + " total records)";
      }

      return $('<span></span>', {
        id: 'dynatable-record-count-' + obj.element.id,
        'class': 'dynatable-record-count',
        html: text
      });
    };

    this.attach = function () {
      var $target = settings.inputs.recordCountTarget ? $(settings.inputs.recordCountTarget) : obj.$element;
      $target[settings.inputs.recordCountPlacement](this.create());
    };
  };

  function ProcessingIndicator(obj, settings) {
    this.init = function () {
      this.attach();
    };

    this.create = function () {
      var $processing = $('<div></div>', {
        html: '<span>' + settings.inputs.processingText + '</span>',
        id: 'dynatable-processing-' + obj.element.id,
        'class': 'dynatable-processing',
        style: 'position: absolute; display: none;'
      });

      return $processing;
    };

    this.position = function () {
      var $processing = $('#dynatable-processing-' + obj.element.id),
          $span = $processing.children('span'),
          spanHeight = $span.outerHeight(),
          spanWidth = $span.outerWidth(),
          $covered = obj.$element,
          offset = $covered.offset(),
          height = $covered.outerHeight(),
          width = $covered.outerWidth();

      $processing.offset({ left: offset.left, top: offset.top }).width(width).height(height);
      $span.offset({ left: offset.left + (width - spanWidth) / 2, top: offset.top + (height - spanHeight) / 2 });

      return $processing;
    };

    this.attach = function () {
      obj.$element.before(this.create());
    };

    this.show = function () {
      $('#dynatable-processing-' + obj.element.id).show();
      this.position();
    };

    this.hide = function () {
      $('#dynatable-processing-' + obj.element.id).hide();
    };
  };

  function State(obj, settings) {
    this.initOnLoad = function () {
      // Check if pushState option is true, and if browser supports it
      return settings.features.pushState && history.pushState;
    };

    this.init = function () {
      window.onpopstate = function (event) {
        if (event.state && event.state.dynatable) {
          obj.state.pop(event);
        }
      };
    };

    this.push = function (data) {
      var urlString = window.location.search,
          urlOptions,
          path,
          params,
          hash,
          newParams,
          cacheStr,
          cache,

      // replaceState on initial load, then pushState after that
      firstPush = !(window.history.state && window.history.state.dynatable),
          pushFunction = firstPush ? 'replaceState' : 'pushState';

      if (urlString && /^\?/.test(urlString)) {
        urlString = urlString.substring(1);
      }
      $.extend(urlOptions, data);

      params = utility.refreshQueryString(urlString, data, settings);
      if (params) {
        params = '?' + params;
      }
      hash = window.location.hash;
      path = window.location.pathname;

      obj.$element.trigger('dynatable:push', data);

      cache = { dynatable: { dataset: settings.dataset } };
      if (!firstPush) {
        cache.dynatable.scrollTop = $(window).scrollTop();
      }
      cacheStr = JSON.stringify(cache);

      // Mozilla has a 640k char limit on what can be stored in pushState.
      // See "limit" in https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method
      // and "dataStr.length" in http://wine.git.sourceforge.net/git/gitweb.cgi?p=wine/wine-gecko;a=patch;h=43a11bdddc5fc1ff102278a120be66a7b90afe28
      //
      // Likewise, other browsers may have varying (undocumented) limits.
      // Also, Firefox's limit can be changed in about:config as browser.history.maxStateObjectSize
      // Since we don't know what the actual limit will be in any given situation, we'll just try caching and rescue
      // any exceptions by retrying pushState without caching the records.
      //
      // I have absolutely no idea why perPageOptions suddenly becomes an array-like object instead of an array,
      // but just recently, this started throwing an error if I don't convert it:
      // 'Uncaught Error: DATA_CLONE_ERR: DOM Exception 25'
      cache.dynatable.dataset.perPageOptions = $.makeArray(cache.dynatable.dataset.perPageOptions);

      try {
        window.history[pushFunction](cache, "Dynatable state", path + params + hash);
      } catch (error) {
        // Make cached records = null, so that `pop` will rerun process to retrieve records
        cache.dynatable.dataset = null;
        window.history[pushFunction](cache, "Dynatable state", path + params + hash);
      }
    };

    this.pop = function (event) {
      var data = event.state.dynatable;
      settings.dataset = data.dataset;

      if (data.scrollTop) {
        $(window).scrollTop(data.scrollTop);
      }

      // If dataset.records is cached from pushState
      if (data.dataset.records) {
        obj.dom.update();
      } else {
        obj.process(true);
      }
    };
  };

  function Sorts(obj, settings) {
    this.initOnLoad = function () {
      return settings.features.sort;
    };

    this.init = function () {
      var sortsUrl = window.location.search.match(new RegExp(settings.params.sorts + '[^&=]*=[^&]*', 'g'));
      settings.dataset.sorts = sortsUrl ? utility.deserialize(sortsUrl)[settings.params.sorts] : {};
      settings.dataset.sortsKeys = sortsUrl ? utility.keysFromObject(settings.dataset.sorts) : [];
    };

    this.add = function (attr, direction) {
      var sortsKeys = settings.dataset.sortsKeys,
          index = $.inArray(attr, sortsKeys);
      settings.dataset.sorts[attr] = direction;
      if (index === -1) {
        sortsKeys.push(attr);
      }
      return dt;
    };

    this.remove = function (attr) {
      var sortsKeys = settings.dataset.sortsKeys,
          index = $.inArray(attr, sortsKeys);
      delete settings.dataset.sorts[attr];
      if (index !== -1) {
        sortsKeys.splice(index, 1);
      }
      return dt;
    };

    this.clear = function () {
      settings.dataset.sorts = {};
      settings.dataset.sortsKeys.length = 0;
    };

    // Try to intelligently guess which sort function to use
    // based on the type of attribute values.
    // Consider using something more robust than `typeof` (http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/)
    this.guessType = function (a, b, attr) {
      var types = {
        string: 'string',
        number: 'number',
        'boolean': 'number',
        object: 'number' // dates and null values are also objects, this works...
      },
          attrType = a[attr] ? typeof a[attr] : typeof b[attr],
          type = types[attrType] || 'number';
      return type;
    };

    // Built-in sort functions
    // (the most common use-cases I could think of)
    this.functions = {
      number: function (a, b, attr, direction) {
        return a[attr] === b[attr] ? 0 : direction > 0 ? a[attr] - b[attr] : b[attr] - a[attr];
      },
      string: function (a, b, attr, direction) {
        var aAttr = a['dynatable-sortable-text'] && a['dynatable-sortable-text'][attr] ? a['dynatable-sortable-text'][attr] : a[attr],
            bAttr = b['dynatable-sortable-text'] && b['dynatable-sortable-text'][attr] ? b['dynatable-sortable-text'][attr] : b[attr],
            comparison;
        aAttr = aAttr.toLowerCase();
        bAttr = bAttr.toLowerCase();
        comparison = aAttr === bAttr ? 0 : direction > 0 ? aAttr > bAttr : bAttr > aAttr;
        // force false boolean value to -1, true to 1, and tie to 0
        return comparison === false ? -1 : comparison - 0;
      },
      originalPlacement: function (a, b) {
        return a['dynatable-original-index'] - b['dynatable-original-index'];
      }
    };
  };

  // turn table headers into links which add sort to sorts array
  function SortsHeaders(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return settings.features.sort;
    };

    this.init = function () {
      this.attach();
    };

    this.create = function (cell) {
      var $cell = $(cell),
          $link = $('<a></a>', {
        'class': 'dynatable-sort-header',
        href: '#',
        html: $cell.html()
      }),
          id = $cell.data('dynatable-column'),
          column = utility.findObjectInArray(settings.table.columns, { id: id });

      $link.bind('click', function (e) {
        _this.toggleSort(e, $link, column);
        obj.process();

        e.preventDefault();
      });

      if (this.sortedByColumn($link, column)) {
        if (this.sortedByColumnValue(column) == 1) {
          this.appendArrowUp($link);
        } else {
          this.appendArrowDown($link);
        }
      }

      return $link;
    };

    this.removeAll = function () {
      obj.$element.find(settings.table.headRowSelector).children('th,td').each(function () {
        _this.removeAllArrows();
        _this.removeOne(this);
      });
    };

    this.removeOne = function (cell) {
      var $cell = $(cell),
          $link = $cell.find('.dynatable-sort-header');
      if ($link.length) {
        var html = $link.html();
        $link.remove();
        $cell.html($cell.html() + html);
      }
    };

    this.attach = function () {
      obj.$element.find(settings.table.headRowSelector).children('th,td').each(function () {
        _this.attachOne(this);
      });
    };

    this.attachOne = function (cell) {
      var $cell = $(cell);
      if (!$cell.data('dynatable-no-sort')) {
        $cell.html(this.create(cell));
      }
    };

    this.appendArrowUp = function ($link) {
      this.removeArrow($link);
      $link.append("<span class='dynatable-arrow'> &#9650;</span>");
    };

    this.appendArrowDown = function ($link) {
      this.removeArrow($link);
      $link.append("<span class='dynatable-arrow'> &#9660;</span>");
    };

    this.removeArrow = function ($link) {
      // Not sure why `parent()` is needed, the arrow should be inside the link from `append()` above
      $link.find('.dynatable-arrow').remove();
    };

    this.removeAllArrows = function () {
      obj.$element.find('.dynatable-arrow').remove();
    };

    this.toggleSort = function (e, $link, column) {
      var sortedByColumn = this.sortedByColumn($link, column),
          value = this.sortedByColumnValue(column);
      // Clear existing sorts unless this is a multisort event
      if (!settings.inputs.multisort || !utility.anyMatch(e, settings.inputs.multisort, function (evt, key) {
        return e[key];
      })) {
        this.removeAllArrows();
        obj.sorts.clear();
      }

      // If sorts for this column are already set
      if (sortedByColumn) {
        // If ascending, then make descending
        if (value == 1) {
          for (var i = 0, len = column.sorts.length; i < len; i++) {
            obj.sorts.add(column.sorts[i], -1);
          }
          this.appendArrowDown($link);
          // If descending, remove sort
        } else {
          for (var i = 0, len = column.sorts.length; i < len; i++) {
            obj.sorts.remove(column.sorts[i]);
          }
          this.removeArrow($link);
        }
        // Otherwise, if not already set, set to ascending
      } else {
        for (var i = 0, len = column.sorts.length; i < len; i++) {
          obj.sorts.add(column.sorts[i], 1);
        }
        this.appendArrowUp($link);
      }
    };

    this.sortedByColumn = function ($link, column) {
      return utility.allMatch(settings.dataset.sorts, column.sorts, function (sorts, sort) {
        return sort in sorts;
      });
    };

    this.sortedByColumnValue = function (column) {
      return settings.dataset.sorts[column.sorts[0]];
    };
  };

  function Queries(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return settings.inputs.queries || settings.features.search;
    };

    this.init = function () {
      var queriesUrl = window.location.search.match(new RegExp(settings.params.queries + '[^&=]*=[^&]*', 'g'));

      settings.dataset.queries = queriesUrl ? utility.deserialize(queriesUrl)[settings.params.queries] : {};
      if (settings.dataset.queries === "") {
        settings.dataset.queries = {};
      }

      if (settings.inputs.queries) {
        this.setupInputs();
      }
    };

    this.add = function (name, value) {
      // reset to first page since query will change records
      if (settings.features.paginate) {
        settings.dataset.page = 1;
      }
      settings.dataset.queries[name] = value;
      return dt;
    };

    this.remove = function (name) {
      delete settings.dataset.queries[name];
      return dt;
    };

    this.run = function () {
      for (query in settings.dataset.queries) {
        if (settings.dataset.queries.hasOwnProperty(query)) {
          var value = settings.dataset.queries[query];
          if (_this.functions[query] === undefined) {
            // Try to lazily evaluate query from column names if not explicitly defined
            var queryColumn = utility.findObjectInArray(settings.table.columns, { id: query });
            if (queryColumn) {
              _this.functions[query] = function (record, queryValue) {
                return record[query] == queryValue;
              };
            } else {
              $.error("Query named '" + query + "' called, but not defined in queries.functions");
              continue; // to skip to next query
            }
          }
          // collect all records that return true for query
          settings.dataset.records = $.map(settings.dataset.records, function (record) {
            return _this.functions[query](record, value) ? record : null;
          });
        }
      }
      settings.dataset.queryRecordCount = obj.records.count();
    };

    // Shortcut for performing simple query from built-in search
    this.runSearch = function (q) {
      var origQueries = $.extend({}, settings.dataset.queries);
      if (q) {
        this.add('search', q);
      } else {
        this.remove('search');
      }
      if (!utility.objectsEqual(settings.dataset.queries, origQueries)) {
        obj.process();
      }
    };

    this.setupInputs = function () {
      settings.inputs.queries.each(function () {
        var $this = $(this),
            event = $this.data('dynatable-query-event') || settings.inputs.queryEvent,
            query = $this.data('dynatable-query') || $this.attr('name') || this.id,
            queryFunction = function (e) {
          var q = $(this).val();
          if (q === "") {
            q = undefined;
          }
          if (q === settings.dataset.queries[query]) {
            return false;
          }
          if (q) {
            _this.add(query, q);
          } else {
            _this.remove(query);
          }
          obj.process();
          e.preventDefault();
        };

        $this.attr('data-dynatable-query', query).bind(event, queryFunction).bind('keypress', function (e) {
          if (e.which == 13) {
            queryFunction.call(this, e);
          }
        });

        if (settings.dataset.queries[query]) {
          $this.val(decodeURIComponent(settings.dataset.queries[query]));
        }
      });
    };

    // Query functions for in-page querying
    // each function should take a record and a value as input
    // and output true of false as to whether the record is a match or not
    this.functions = {
      search: function (record, queryValue) {
        var contains = false;
        // Loop through each attribute of record
        for (attr in record) {
          if (record.hasOwnProperty(attr)) {
            var attrValue = record[attr];
            if (typeof attrValue === "string" && attrValue.toLowerCase().indexOf(queryValue.toLowerCase()) !== -1) {
              contains = true;
              // Don't need to keep searching attributes once found
              break;
            } else {
              continue;
            }
          }
        }
        return contains;
      }
    };
  };

  function InputsSearch(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return settings.features.search;
    };

    this.init = function () {
      this.attach();
    };

    this.create = function () {
      var $search = $('<input />', {
        type: 'search',
        id: 'dynatable-query-search-' + obj.element.id,
        'data-dynatable-query': 'search',
        value: settings.dataset.queries.search
      }),
          $searchSpan = $('<span></span>', {
        id: 'dynatable-search-' + obj.element.id,
        'class': 'dynatable-search',
        text: 'Search: '
      }).append($search);

      $search.bind(settings.inputs.queryEvent, function () {
        obj.queries.runSearch($(this).val());
      }).bind('keypress', function (e) {
        if (e.which == 13) {
          obj.queries.runSearch($(this).val());
          e.preventDefault();
        }
      });
      return $searchSpan;
    };

    this.attach = function () {
      var $target = settings.inputs.searchTarget ? $(settings.inputs.searchTarget) : obj.$element;
      $target[settings.inputs.searchPlacement](this.create());
    };
  };

  // provide a public function for selecting page
  function PaginationPage(obj, settings) {
    this.initOnLoad = function () {
      return settings.features.paginate;
    };

    this.init = function () {
      var pageUrl = window.location.search.match(new RegExp(settings.params.page + '=([^&]*)'));
      // If page is present in URL parameters and pushState is enabled
      // (meaning that it'd be possible for dynatable to have put the
      // page parameter in the URL)
      if (pageUrl && settings.features.pushState) {
        this.set(pageUrl[1]);
      } else {
        this.set(1);
      }
    };

    this.set = function (page) {
      settings.dataset.page = parseInt(page, 10);
    };
  };

  function PaginationPerPage(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return settings.features.paginate;
    };

    this.init = function () {
      var perPageUrl = window.location.search.match(new RegExp(settings.params.perPage + '=([^&]*)'));

      // If perPage is present in URL parameters and pushState is enabled
      // (meaning that it'd be possible for dynatable to have put the
      // perPage parameter in the URL)
      if (perPageUrl && settings.features.pushState) {
        // Don't reset page to 1 on init, since it might override page
        // set on init from URL
        this.set(perPageUrl[1], true);
      } else {
        this.set(settings.dataset.perPageDefault, true);
      }

      if (settings.features.perPageSelect) {
        this.attach();
      }
    };

    this.create = function () {
      var $select = $('<select>', {
        id: 'dynatable-per-page-' + obj.element.id,
        'class': 'dynatable-per-page-select'
      });

      for (var i = 0, len = settings.dataset.perPageOptions.length; i < len; i++) {
        var number = settings.dataset.perPageOptions[i],
            selected = settings.dataset.perPage == number ? 'selected="selected"' : '';
        $select.append('<option value="' + number + '" ' + selected + '>' + number + '</option>');
      }

      $select.bind('change', function (e) {
        _this.set($(this).val());
        obj.process();
      });

      return $('<span />', {
        'class': 'dynatable-per-page'
      }).append("<span class='dynatable-per-page-label'>" + settings.inputs.perPageText + "</span>").append($select);
    };

    this.attach = function () {
      var $target = settings.inputs.perPageTarget ? $(settings.inputs.perPageTarget) : obj.$element;
      $target[settings.inputs.perPagePlacement](this.create());
    };

    this.set = function (number, skipResetPage) {
      if (!skipResetPage) {
        obj.paginationPage.set(1);
      }
      settings.dataset.perPage = parseInt(number);
    };
  };

  // pagination links which update dataset.page attribute
  function PaginationLinks(obj, settings) {
    var _this = this;

    this.initOnLoad = function () {
      return settings.features.paginate;
    };

    this.init = function () {
      this.attach();
    };

    this.create = function () {
      var pageLinks = '<ul id="' + 'dynatable-pagination-links-' + obj.element.id + '" class="' + settings.inputs.paginationClass + '">',
          pageLinkClass = settings.inputs.paginationLinkClass,
          activePageClass = settings.inputs.paginationActiveClass,
          disabledPageClass = settings.inputs.paginationDisabledClass,
          pages = Math.ceil(settings.dataset.queryRecordCount / settings.dataset.perPage),
          page = settings.dataset.page,
          breaks = [settings.inputs.paginationGap[0], settings.dataset.page - settings.inputs.paginationGap[1], settings.dataset.page + settings.inputs.paginationGap[2], pages + 1 - settings.inputs.paginationGap[3]];

      pageLinks += '<li><span>Pages: </span></li>';

      for (var i = 1; i <= pages; i++) {
        if (i > breaks[0] && i < breaks[1] || i > breaks[2] && i < breaks[3]) {
          // skip to next iteration in loop
          continue;
        } else {
          var li = obj.paginationLinks.buildLink(i, i, pageLinkClass, page == i, activePageClass),
              breakIndex,
              nextBreak;

          // If i is not between one of the following
          // (1 + (settings.paginationGap[0]))
          // (page - settings.paginationGap[1])
          // (page + settings.paginationGap[2])
          // (pages - settings.paginationGap[3])
          breakIndex = $.inArray(i, breaks);
          nextBreak = breaks[breakIndex + 1];
          if (breakIndex > 0 && i !== 1 && nextBreak && nextBreak > i + 1) {
            var ellip = '<li><span class="dynatable-page-break">&hellip;</span></li>';
            li = breakIndex < 2 ? ellip + li : li + ellip;
          }

          if (settings.inputs.paginationPrev && i === 1) {
            var prevLi = obj.paginationLinks.buildLink(page - 1, settings.inputs.paginationPrev, pageLinkClass + ' ' + settings.inputs.paginationPrevClass, page === 1, disabledPageClass);
            li = prevLi + li;
          }
          if (settings.inputs.paginationNext && i === pages) {
            var nextLi = obj.paginationLinks.buildLink(page + 1, settings.inputs.paginationNext, pageLinkClass + ' ' + settings.inputs.paginationNextClass, page === pages, disabledPageClass);
            li += nextLi;
          }

          pageLinks += li;
        }
      }

      pageLinks += '</ul>';

      // only bind page handler to non-active and non-disabled page links
      var selector = '#dynatable-pagination-links-' + obj.element.id + ' a.' + pageLinkClass + ':not(.' + activePageClass + ',.' + disabledPageClass + ')';
      // kill any existing delegated-bindings so they don't stack up
      $(document).undelegate(selector, 'click.dynatable');
      $(document).delegate(selector, 'click.dynatable', function (e) {
        $this = $(this);
        $this.closest(settings.inputs.paginationClass).find('.' + activePageClass).removeClass(activePageClass);
        $this.addClass(activePageClass);

        obj.paginationPage.set($this.data('dynatable-page'));
        obj.process();
        e.preventDefault();
      });

      return pageLinks;
    };

    this.buildLink = function (page, label, linkClass, conditional, conditionalClass) {
      var link = '<a data-dynatable-page=' + page + ' class="' + linkClass,
          li = '<li';

      if (conditional) {
        link += ' ' + conditionalClass;
        li += ' class="' + conditionalClass + '"';
      }

      link += '">' + label + '</a>';
      li += '>' + link + '</li>';

      return li;
    };

    this.attach = function () {
      // append page links *after* delegate-event-binding so it doesn't need to
      // find and select all page links to bind event
      var $target = settings.inputs.paginationLinkTarget ? $(settings.inputs.paginationLinkTarget) : obj.$element;
      $target[settings.inputs.paginationLinkPlacement](obj.paginationLinks.create());
    };
  };

  utility = dt.utility = {
    normalizeText: function (text, style) {
      text = this.textTransform[style](text);
      return text;
    },
    textTransform: {
      trimDash: function (text) {
        return text.replace(/^\s+|\s+$/g, "").replace(/\s+/g, "-");
      },
      camelCase: function (text) {
        text = this.trimDash(text);
        return text.replace(/(\-[a-zA-Z])/g, function ($1) {
          return $1.toUpperCase().replace('-', '');
        }).replace(/([A-Z])([A-Z]+)/g, function ($1, $2, $3) {
          return $2 + $3.toLowerCase();
        }).replace(/^[A-Z]/, function ($1) {
          return $1.toLowerCase();
        });
      },
      dashed: function (text) {
        text = this.trimDash(text);
        return this.lowercase(text);
      },
      underscore: function (text) {
        text = this.trimDash(text);
        return this.lowercase(text.replace(/(-)/g, '_'));
      },
      lowercase: function (text) {
        return text.replace(/([A-Z])/g, function ($1) {
          return $1.toLowerCase();
        });
      }
    },
    // Deserialize params in URL to object
    // see http://stackoverflow.com/questions/1131630/javascript-jquery-param-inverse-function/3401265#3401265
    deserialize: function (query) {
      if (!query) return {};
      // modified to accept an array of partial URL strings
      if (typeof query === "object") {
        query = query.join('&');
      }

      var hash = {},
          vars = query.split("&");

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("="),
            k = decodeURIComponent(pair[0]),
            v,
            m;

        if (!pair[1]) {
          continue;
        };
        v = decodeURIComponent(pair[1].replace(/\+/g, ' '));

        // modified to parse multi-level parameters (e.g. "hi[there][dude]=whatsup" => hi: {there: {dude: "whatsup"}})
        while (m = k.match(/([^&=]+)\[([^&=]+)\]$/)) {
          var origV = v;
          k = m[1];
          v = {};

          // If nested param ends in '][', then the regex above erroneously included half of a trailing '[]',
          // which indicates the end-value is part of an array
          if (m[2].substr(m[2].length - 2) == '][') {
            // must use substr for IE to understand it
            v[m[2].substr(0, m[2].length - 2)] = [origV];
          } else {
            v[m[2]] = origV;
          }
        }

        // If it is the first entry with this name
        if (typeof hash[k] === "undefined") {
          if (k.substr(k.length - 2) != '[]') {
            // not end with []. cannot use negative index as IE doesn't understand it
            hash[k] = v;
          } else {
            hash[k] = [v];
          }
          // If subsequent entry with this name and not array
        } else if (typeof hash[k] === "string") {
          hash[k] = v; // replace it
          // modified to add support for objects
        } else if (typeof hash[k] === "object") {
          hash[k] = $.extend({}, hash[k], v);
          // If subsequent entry with this name and is array
        } else {
          hash[k].push(v);
        }
      }
      return hash;
    },
    refreshQueryString: function (urlString, data, settings) {
      var _this = this,
          queryString = urlString.split('?'),
          path = queryString.shift(),
          urlOptions;

      urlOptions = this.deserialize(urlString);

      // Loop through each dynatable param and update the URL with it
      for (attr in settings.params) {
        if (settings.params.hasOwnProperty(attr)) {
          var label = settings.params[attr];
          // Skip over parameters matching attributes for disabled features (i.e. leave them untouched),
          // because if the feature is turned off, then parameter name is a coincidence and it's unrelated to dynatable.
          if (!settings.features.sort && attr == "sorts" || !settings.features.paginate && _this.anyMatch(attr, ["page", "perPage", "offset"], function (attr, param) {
            return attr == param;
          })) {
            continue;
          }

          // Delete page and offset from url params if on page 1 (default)
          if ((attr === "page" || attr === "offset") && data["page"] === 1) {
            if (urlOptions[label]) {
              delete urlOptions[label];
            }
            continue;
          }

          // Delete perPage from url params if default perPage value
          if (attr === "perPage" && data[label] == settings.dataset.perPageDefault) {
            if (urlOptions[label]) {
              delete urlOptions[label];
            }
            continue;
          }

          // For queries, we're going to handle each possible query parameter individually here instead of
          // handling the entire queries object below, since we need to make sure that this is a query controlled by dynatable.
          if (attr == "queries" && data[label]) {
            var queries = settings.inputs.queries || [],
                inputQueries = $.makeArray(queries.map(function () {
              return $(this).attr('name');
            }));

            if (settings.features.search) {
              inputQueries.push('search');
            }

            for (var i = 0, len = inputQueries.length; i < len; i++) {
              var attr = inputQueries[i];
              if (data[label][attr]) {
                if (typeof urlOptions[label] === 'undefined') {
                  urlOptions[label] = {};
                }
                urlOptions[label][attr] = data[label][attr];
              } else {
                delete urlOptions[label][attr];
              }
            }
            continue;
          }

          // If we haven't returned true by now, then we actually want to update the parameter in the URL
          if (data[label]) {
            urlOptions[label] = data[label];
          } else {
            delete urlOptions[label];
          }
        }
      }
      return decodeURI($.param(urlOptions));
    },
    // Get array of keys from object
    // see http://stackoverflow.com/questions/208016/how-to-list-the-properties-of-a-javascript-object/208020#208020
    keysFromObject: function (obj) {
      var keys = [];
      for (var key in obj) {
        keys.push(key);
      }
      return keys;
    },
    // Find an object in an array of objects by attributes.
    // E.g. find object with {id: 'hi', name: 'there'} in an array of objects
    findObjectInArray: function (array, objectAttr) {
      var _this = this,
          foundObject;
      for (var i = 0, len = array.length; i < len; i++) {
        var item = array[i];
        // For each object in array, test to make sure all attributes in objectAttr match
        if (_this.allMatch(item, objectAttr, function (item, key, value) {
          return item[key] == value;
        })) {
          foundObject = item;
          break;
        }
      }
      return foundObject;
    },
    // Return true if supplied test function passes for ALL items in an array
    allMatch: function (item, arrayOrObject, test) {
      // start off with true result by default
      var match = true,
          isArray = $.isArray(arrayOrObject);
      // Loop through all items in array
      $.each(arrayOrObject, function (key, value) {
        var result = isArray ? test(item, value) : test(item, key, value);
        // If a single item tests false, go ahead and break the array by returning false
        // and return false as result,
        // otherwise, continue with next iteration in loop
        // (if we make it through all iterations without overriding match with false,
        // then we can return the true result we started with by default)
        if (!result) {
          return match = false;
        }
      });
      return match;
    },
    // Return true if supplied test function passes for ANY items in an array
    anyMatch: function (item, arrayOrObject, test) {
      var match = false,
          isArray = $.isArray(arrayOrObject);

      $.each(arrayOrObject, function (key, value) {
        var result = isArray ? test(item, value) : test(item, key, value);
        if (result) {
          // As soon as a match is found, set match to true, and return false to stop the `$.each` loop
          match = true;
          return false;
        }
      });
      return match;
    },
    // Return true if two objects are equal
    // (i.e. have the same attributes and attribute values)
    objectsEqual: function (a, b) {
      for (attr in a) {
        if (a.hasOwnProperty(attr)) {
          if (!b.hasOwnProperty(attr) || a[attr] !== b[attr]) {
            return false;
          }
        }
      }
      for (attr in b) {
        if (b.hasOwnProperty(attr) && !a.hasOwnProperty(attr)) {
          return false;
        }
      }
      return true;
    },
    // Taken from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/105074#105074
    randomHash: function () {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
  };

  //-----------------------------------------------------------------
  // Build the dynatable plugin
  //-----------------------------------------------------------------

  // Object.create support test, and fallback for browsers without it
  if (typeof Object.create !== "function") {
    Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }

  //-----------------------------------------------------------------
  // Global dynatable plugin setting defaults
  //-----------------------------------------------------------------

  $.dynatableSetup = function (options) {
    defaults = mergeSettings(options);
  };

  // Create dynatable plugin based on a defined object
  $.dynatable = function (object) {
    $.fn['dynatable'] = function (options) {
      return this.each(function () {
        if (!$.data(this, 'dynatable')) {
          $.data(this, 'dynatable', Object.create(object).init(this, options));
        }
      });
    };
  };

  $.dynatable(dt);
})(jQuery);
"use strict";
if (!Date.now) Date.now = function () {
  return new Date().getTime();
};(function () {
  var n = ["webkit", "moz"];for (var e = 0; e < n.length && !window.requestAnimationFrame; ++e) {
    var i = n[e];window.requestAnimationFrame = window[i + "RequestAnimationFrame"];window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"];
  }if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var a = 0;window.requestAnimationFrame = function (n) {
      var e = Date.now();var i = Math.max(a + 16, e);return setTimeout(function () {
        n(a = i);
      }, i - e);
    };window.cancelAnimationFrame = clearTimeout;
  }
})();
$ = jQuery;
$(document).ready(function () {
  var switched = false;
  var updateTables = function () {
    if ($(window).width() < 767 && !switched) {
      switched = true;
      $("table.responsive").each(function (i, element) {
        splitTable($(element));
      });
      return true;
    } else if (switched && $(window).width() > 767) {
      switched = false;
      $("table.responsive").each(function (i, element) {
        unsplitTable($(element));
      });
    }
  };

  $(window).load(updateTables);
  $(window).on("redraw", function () {
    switched = false;updateTables();
  }); // An event to listen for
  $(window).on("resize", updateTables);

  function splitTable(original) {
    original.wrap("<div class='table-wrapper' />");

    var copy = original.clone();
    copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
    copy.removeClass("responsive");

    original.closest(".table-wrapper").append(copy);
    copy.wrap("<div class='pinned' />");
    original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
  }

  function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
  }

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });
    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }
});
(function ($) {
	$(window).setBreakpoints({
		distinct: true,
		breakpoints: [320, 768, 1100]
	});

	$(window).bind('enterBreakpoint320', function () {
		console.log("running 320 breakpoint");
		$("footer.main .rcol .npasmall").appendTo($("footer.main .rcol"));
		$("header.main .innerwrapper .login").appendTo($("header.main nav.main"));
		convertJobListingToMobile($("#featuredjobs table"));
	});

	$(window).bind('enterBreakpoint768', function () {
		console.log("running 768 breakpoint");
		$("header.main .innerwrapper .login").appendTo($("header.main nav.main"));
		$("footer.main .rcol .npasmall").prependTo($("footer.main .rcol"));
		$("header.main .innerwrapper .login").appendTo($("header.main nav.main"));
		$("header.main .innerwrapper .account").appendTo($("header.main nav.main"));
		$("#featuredjobs .mobilelisting").remove();
	});

	$(window).bind('enterBreakpoint1100', function () {
		console.log("running 1100 breakpoint");
		$("footer.main .rcol .npasmall").prependTo($("footer.main .rcol"));
		$("header.main nav.main .login").appendTo($("header.main .innerwrapper"));
		$("header.main nav.main .account").appendTo($("header.main .innerwrapper"));
		$("header.main nav.main").removeClass('active');
	});

	$(document).ready(function () {
		"use strict";

		if (window.location.pathname == "/contact-us/") {
			$(".page .content a[href^=tel], .page .content a[href^=mailto]").click(function () {
				try {
					goog_report_conversion('VEhNCPiFyXoQ04Ts8wM');
					ga('send', 'event', { eventCategory: 'Action', eventAction: 'Click', eventLabel: 'Contact Us' });
					fbq('track', 'Contact Us', {
						value: 0.00,
						currency: 'USD'
					});
				} catch (err) {
					console.warn("There was problem with analytics", err);
					Raven.captureMessage("Analytics Error: Contact Us Click", {
						level: "error",
						extra: {
							error: err
						}
					});
				}
			});
		}

		$("a.phone").click(function () {
			try {
				goog_report_conversion('QPlWCLmvsnoQ04Ts8wM');
				ga('send', 'event', { eventCategory: 'Call', eventAction: 'Click', eventLabel: 'Lead' });
				fbq('track', '308.382.7350', {
					value: 0.00,
					currency: 'USD'
				});
			} catch (err) {
				console.warn("There was problem with analytics", err);
				Raven.captureMessage("Analytics Error: Phone Number Click", {
					level: "error",
					extra: {
						error: err
					}
				});
			}
		});

		$("header.main nav.main ul").superfish();

		$("#heroimage .slider").slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 9000,
			lazyLoad: 'ondemand',
			fade: true
		});

		$("#loginpanel #loginform").prepend($("#loginpanel .invalidPwd"));
		if ($("#loginpanel .invalidPwd").length != 0) {
			if ($(window).outerWidth() >= 1100) {
				$("#signinbtn").addClass('active');
				$("#loginpanel.login").addClass('active');
			} else {
				$("#mobilemenubtn").addClass('active');
				$("header.main nav.main").addClass('active');

				if ($(window).outerWidth() < 768) {
					$("nav.main.active .nav").hide();
					$("nav.main.active #loginpanel").show();
				}
			}
		}

		$("nav.main #loginpanel .btn_cancellogin").click(function () {
			$("nav.main.active .nav").show();
			$("nav.main.active #loginpanel").hide();
		});

		$("#mobile_login_btn").click(function () {
			$("nav.main.active .nav").hide();
			$("nav.main.active #loginpanel").show();
		});

		$("#mobilemenubtn").click(function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$("header.main nav.main").removeClass('active');
			} else {
				$(this).addClass('active');
				$("header.main nav.main").addClass('active');
			}
		});

		$("#signinbtn").click(function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$("header.main .login").removeClass('active');
			} else {
				$(this).addClass('active');
				$("header.main .login").addClass('active');
			}
		});

		$("#accountbtn").click(function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$("header.main .account").removeClass('active');
			} else {
				$(this).addClass('active');
				$("header.main .account").addClass('active');
			}
		});

		$("#btnResetPassword").click(function () {
			var email = $("#forgotpasswordform input[name='accountemail']").val();
			if (email == "") {
				alert("You must enter your account email address.");
				return false;
			}

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: hansenapi + "/api/v1/account/reset",
				dataType: 'json',
				data: JSON.stringify({ email: email }),
				success: function (response) {
					if (response.status == "OK") {
						alert("A password reset confirmation email has been sent to your email address.");
						window.location.href = "/";
					}
				},
				error: function (jqxhr, textStatus, errorThrown) {
					Raven.captureMessage("Error: Send Password Reset", {
						level: "error",
						extra: {
							textStatus: textStatus,
							errorThrown: errorThrown
						}
					});
					alert(jqxhr.responseJSON.message);
				}
			});
		});

		$("#btnSetPassword").click(function () {
			var password = $("#forgotpasswordform input[name='newpassword']").val();
			var passwordconfirm = $("#forgotpasswordform input[name='newpassword_confirm']").val();
			var token = $("#forgotpasswordform input[name='_token']").val();

			if (password.length >= 6) {
				if (password == passwordconfirm) {
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8",
						url: hansenapi + "/api/v1/account/password",
						dataType: 'json',
						data: JSON.stringify({
							password: password,
							token: token
						}),
						success: function (response) {
							if (response.status == "OK") {
								alert("Your account password has been reset.");
								window.location.href = "/";
							}
						},
						error: function (jqxhr, textStatus, errorThrown) {
							Raven.captureMessage("Error: Password Reset", {
								level: "error",
								extra: {
									textStatus: textStatus,
									errorThrown: errorThrown
								}
							});
							alert(jqxhr.responseJSON.message);
						}
					});
				} else {
					alert("Both passwords must be the same.");
					$("#forgotpasswordform input[name='newpassword_confirm']").val("");
				}
			} else {
				alert("Passwords must be 6 characters or longer.");
				$("#forgotpasswordform input[name='newpassword']").val("");
				$("#forgotpasswordform input[name='newpassword_confirm']").val("");
			}
		});

		if ($("#btn_jobapply").length != 0) {
			if (Cookies.get('hansentoken') !== undefined && Cookies.get('hansentoken') != "") {
				var jobid = $("#job_id").val();
				$.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					url: hansenapi + "/api/v1/jobs/" + jobid + "/check",
					dataType: 'json',
					beforeSend: function (request) {
						request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'));
					},
					success: function (response) {
						console.log(response);
						if (response.status == "OK") {
							if (response.applied == 1) {
								$("#btn_jobapply").text("Applied");
								$("#btn_jobapply").attr("disabled", "disabled");
								$("#btn_jobapply").unbind();
							} else {
								if (response.inqueue) {
									$("#btn_jobapply").text("View Application");
									$("#btn_jobapply").unbind();
									$("#btn_jobapply").attr("href", "/application");
								}
							}
						}
					},
					error: function (jqxhr, textStatus, errorThrown) {
						Raven.captureMessage("Error: Job Application Check", {
							level: "error",
							extra: {
								textStatus: textStatus,
								errorThrown: errorThrown,
								jobid: jobid
							}
						});
					}
				});
			}
		}

		$("#btn_jobapply").click(function () {
			var jobid = $("#job_id").val();

			//Check application status first

			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: hansenapi + "/api/v1/account/auth",
				dataType: 'json',
				beforeSend: function (request) {
					request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'));
				},
				success: function (response) {
					if (response.status == "OK") {
						if (response.application != null) {
							if (response.application.is_information_complete) {
								var jobtitle = $("#positionTitle").text().replace("Job Title: ", "");
								alertify.okBtn("Apply").cancelBtn("Cancel").confirm("Do you want to apply for <strong>" + jobtitle + "</strong>?", function (ev) {
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8",
										url: hansenapi + "/api/v1/jobs/" + jobid + "/apply",
										dataType: 'json',
										data: JSON.stringify({
											applynow: true,
											jid: jobid
										}),
										beforeSend: function (request) {
											request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'));
										},
										success: function (response) {
											alertify.okBtn("Ok").alert("Application submitted!", function () {
												window.location.reload();
											});
										},
										error: function (jqxhr, textStatus, errorThrown) {
											Raven.captureMessage("Error: Job Application Apply", {
												level: "error",
												extra: {
													textStatus: textStatus,
													errorThrown: errorThrown,
													jobid: jobid
												}
											});
											alertify.okBtn("OK").alert("We were not able to apply for this job " + textStatus, function () {});
										}
									});

									ev.preventDefault();
								}, function (ev) {
									ev.preventDefault();
								});
							} else {
								alertify.confirm("You must finish your application before you can finish applying.", function () {
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8",
										url: hansenapi + "/api/v1/jobs/" + jobid + "/apply",
										dataType: 'json',
										beforeSend: function (request) {
											request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'));
										},
										success: function (response) {
											window.location = "/application";
										},
										error: function (jqxhr, textStatus, errorThrown) {
											Raven.captureMessage("Error: Job Application Apply", {
												level: "error",
												extra: {
													textStatus: textStatus,
													errorThrown: errorThrown,
													jobid: jobid
												}
											});
											alertify.alert("We were not able to apply for this job " + textStatus, function () {});
										}
									});
								}, function () {});
							}
						} else {
							alertify.confirm("You must start your application before you can apply for jobs.", function () {
								window.location = "/application";
							}, function () {});
						}
					}
				},
				error: function (jqxhr, textStatus, errorThrown) {
					Raven.captureMessage("Error: Job Application Auth", {
						level: "error",
						extra: {
							textStatus: textStatus,
							errorThrown: errorThrown
						}
					});
					alertify.alert("We were not able to apply for this job " + textStatus, function () {});
				}
			});
		});

		$("#btn_referafriend").click(function () {
			var message = "Check out Hansen Agri-PLACEMENT for the latest ag industry related positions and candidates.\n\nhttp://hansenagriplacement.com";
			if ($("#jobdetails").length != 0) {
				message = "This may be a position you are interested in:\n\n" + $("#positionTitle").text() + "\n\nLocation: " + $("#jobLocation").text() + "\nSalary Range: " + $("#jobSalaryRange").text() + "\n\n";
				message += "To read more, visit: " + window.location.href;
			}

			var content = "<h1>Refer a Friend</h1><p>Fill out the form below to send this page to a friend:</p><form><div class='formrow'><input type='text' name='yourname' placeholder='Your Name' /></div><div class='formrow'><input type='text' name='name' placeholder='Friends Name' /></div><div class='formrow'><input type='text' name='email' placeholder='Friends Email' /></div><div class='formrow'><textarea name='message'>" + message + "</textarea></div><div class='formrow'><input type='submit' value='Send to Friend' class='button' /></div></form>";
			modalWindow(content);
			$("#modalcontainer form").submit(function () {
				if (!$(this).hasClass('active')) {
					console.log($(this).serializeObject());
					var data = $(this).serializeObject();
					var valid = true;

					if (data.email == "" || data.message == "" || data.name == "" || data.yourname == "") {
						valid = false;
					}

					if (!valid) {
						alertify.alert("You must fill in all of the fields.");
					} else {
						$(this).append("<div class='loading'></div>");

						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8",
							url: hansenapi + "/api/v1/jobs/sendreferral",
							data: JSON.stringify({ 'referral': data }),
							dataType: 'json',
							success: function (response) {
								try {
									fbq('track', 'Refer A Friend', {
										value: 0.00,
										currency: 'USD'
									});
									ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Refer A Friend' });
									goog_report_conversion('UO1wCPmMyXoQ04Ts8wM');
								} catch (err) {
									console.warn("There was problem with analytics", err);
									Raven.captureMessage("Analytics Error: Send to a Friend", {
										level: "error",
										extra: {
											error: err
										}
									});
								}

								alertify.alert("Your message has been sent to " + data.name, function () {
									$("#modalcontainer").remove();
								});
							},
							error: function (jqxhr, textStatus, errorThrown) {
								Raven.captureMessage("Error: Job Opening Referral", {
									level: "error",
									extra: {
										textStatus: textStatus,
										errorThrown: errorThrown
									}
								});
								alertify.alert("We were not able to send the referral email: " + textStatus, function () {
									$("#modalcontainer form .loading").remove();
								});
							}
						});
					}
				}

				return false;
			});
		});
	});

	$(window).load(function () {
		"use strict";
	});

	function modalWindow(content, loading) {
		var contenthtml = "";

		if (loading) {} else {
			contenthtml = "<div id='modalcontainerwrapper'><a id='btn_modalclose'><i class='fa fa-times'></i></a><div class='content'>" + content + "</div></div>";
		}

		var modalhtml = "<div id='modalcontainer'>" + contenthtml + '</div>';

		$('body').append(modalhtml);
		$("#btn_modalclose").click(function () {
			$("#modalcontainer").remove();
		});
	}

	// function convertJobListingToMobile(tableElement) {
	// 	var template = "<article class='mobilelisting'><header class='main'><div class='jobid'></div><h1></h1></header><table><tbody></tbody<</table></article>";

	// 	$(tableElement).find("tbody tr").each(function (index, element) {
	// 		console.log(element);
	// 		console.log($(element).find("td:nth-child(1)").text());
	// 		var entry = $(template).clone();
	// 		console.log($(entry).find('header .jobid'));
	// 		$(entry).find('header .jobid').html($(element).find("td:nth-child(1)").html());
	// 		$(entry).find('header h1').html($(element).find("td:nth-child(2)").html());
	// 		var locationrow = "<tr><td style='width:35%'>Location</td><td>" + $(element).find("td:nth-child(3)").text() + "</td></tr>";
	// 		var salaryrow = "<tr><td style='width:35%'>Salary</td><td>" + $(element).find("td:nth-child(4)").text() + "</td></tr>";
	// 		$(entry).find('table tbody').append(locationrow);
	// 		$(entry).find('table tbody').append(salaryrow);

	// 		$(entry).insertAfter($(tableElement));
	// 	});
	// }
function convertJobListingToMobile(tableElement){
   /* OLD Template Variable
var template = "<article class='mobilelisting'><header class='main'><div    class='jobid'></div><h1></h1></header><table><tbody></tbody<</table></article>";*/
        var template = "<article class='mobilelisting'><table><tbody></tbody<</table></article>";
        $(tableElement).find("tbody tr").each(function(index, element){
            console.log(element);
            console.log($(element).find("td:nth-child(1)").text());
            var entry = $(template).clone();
            console.log($(entry).find('header .jobid'));
            //$(entry).find('header .jobid').html($(element).find("td:nth-child(1)").html());
            //$(entry).find('header h1').html($(element).find("td:nth-child(2)").html());
            //Code Added By Bilal Arshad [evolverstech]
            var jobIdRow = "<tr><td style='width:35%'>Job Id</td><td>" + $(element).find("td:nth-child(1)").text() + "</td></tr>";
            var jobTitleRow = "<tr><td style='width:35%'>Job Title</td><td>" + $(element).find("td:nth-child(2)").text() + "</td></tr>";
            var locationrow = "<tr><td style='width:35%'>Location</td><td>" + $(element).find("td:nth-child(3)").text() + "</td></tr>";
            var salaryrow = "<tr><td style='width:35%'>Salary</td><td>" + $(element).find("td:nth-child(4)").text() + "</td></tr>";
            $(entry).find('table tbody').append(jobIdRow);
            $(entry).find('table tbody').append(jobTitleRow);
            $(entry).find('table tbody').append(locationrow);
            $(entry).find('table tbody').append(salaryrow);
            $(entry).insertAfter($(tableElement));
        });
    }
})(jQuery);