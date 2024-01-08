/*---------------
 * OTRA CARPETA
 -----------------*/

/*---------------
 * OTRA CARPETA
 -----------------*/

/*---------------
 * BOOTSTRAP-PROGRESSBAR
 -----------------*/
/*! bootstrap-progressbar v0.9.0 | Copyright (c) 2012-2015 Stephan Groß | MIT license | http://www.minddust.com */
!(function (t) {
  "use strict";
  var e = function (n, s) {
    (this.$element = t(n)), (this.options = t.extend({}, e.defaults, s));
  };
  (e.defaults = {
    transition_delay: 300,
    refresh_speed: 50,
    display_text: "none",
    use_percentage: !0,
    percent_format: function (t) {
      return t + "%";
    },
    amount_format: function (t, e) {
      return t + " / " + e;
    },
    update: t.noop,
    done: t.noop,
    fail: t.noop,
  }),
    (e.prototype.transition = function () {
      var n = this.$element,
        s = n.parent(),
        a = this.$back_text,
        r = this.$front_text,
        i = this.options,
        o = parseInt(n.attr("data-transitiongoal")),
        h = parseInt(n.attr("aria-valuemin")) || 0,
        d = parseInt(n.attr("aria-valuemax")) || 100,
        f = s.hasClass("vertical"),
        p =
          i.update && "function" == typeof i.update
            ? i.update
            : e.defaults.update,
        u = i.done && "function" == typeof i.done ? i.done : e.defaults.done,
        c = i.fail && "function" == typeof i.fail ? i.fail : e.defaults.fail;
      if (isNaN(o)) return void c("data-transitiongoal not set");
      var l = Math.round((100 * (o - h)) / (d - h));
      if ("center" === i.display_text && !a && !r) {
        (this.$back_text = a =
          t("<span>").addClass("progressbar-back-text").prependTo(s)),
          (this.$front_text = r =
            t("<span>").addClass("progressbar-front-text").prependTo(n));
        var g;
        f
          ? ((g = s.css("height")),
            a.css({ height: g, "line-height": g }),
            r.css({ height: g, "line-height": g }),
            t(window).resize(function () {
              (g = s.css("height")),
                a.css({ height: g, "line-height": g }),
                r.css({ height: g, "line-height": g });
            }))
          : ((g = s.css("width")),
            r.css({ width: g }),
            t(window).resize(function () {
              (g = s.css("width")), r.css({ width: g });
            }));
      }
      setTimeout(function () {
        var t, e, c, g, _;
        f ? n.css("height", l + "%") : n.css("width", l + "%");
        var x = setInterval(function () {
          f
            ? ((c = n.height()), (g = s.height()))
            : ((c = n.width()), (g = s.width())),
            (t = Math.round((100 * c) / g)),
            (e = Math.round(h + (c / g) * (d - h))),
            t >= l && ((t = l), (e = o), u(n), clearInterval(x)),
            "none" !== i.display_text &&
              ((_ = i.use_percentage
                ? i.percent_format(t)
                : i.amount_format(e, d, h)),
              "fill" === i.display_text
                ? n.text(_)
                : "center" === i.display_text && (a.text(_), r.text(_))),
            n.attr("aria-valuenow", e),
            p(t, n);
        }, i.refresh_speed);
      }, i.transition_delay);
    });
  var n = t.fn.progressbar;
  (t.fn.progressbar = function (n) {
    return this.each(function () {
      var s = t(this),
        a = s.data("bs.progressbar"),
        r = "object" == typeof n && n;
      a && r && t.extend(a.options, r),
        a || s.data("bs.progressbar", (a = new e(this, r))),
        a.transition();
    });
  }),
    (t.fn.progressbar.Constructor = e),
    (t.fn.progressbar.noConflict = function () {
      return (t.fn.progressbar = n), this;
    });
})(window.jQuery);

/*---------------
 * ANIMSITION
 -----------------*/
/*!
 * animsition v4.0.2
 * A simple and easy jQuery plugin for CSS animated page transitions.
 * http://blivesta.github.io/animsition
 * License : MIT
 * Author : blivesta (http://blivesta.com/)
 */
!(function (t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "object" == typeof exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  "use strict";
  var n = "animsition",
    i = {
      init: function (a) {
        (a = t.extend(
          {
            inClass: "fade-in",
            outClass: "fade-out",
            inDuration: 1500,
            outDuration: 800,
            linkElement: ".animsition-link",
            loading: !0,
            loadingParentElement: "body",
            loadingClass: "animsition-loading",
            loadingInner: "",
            timeout: !1,
            timeoutCountdown: 5e3,
            onLoadEvent: !0,
            browser: ["animation-duration", "-webkit-animation-duration"],
            overlay: !1,
            overlayClass: "animsition-overlay-slide",
            overlayParentElement: "body",
            transition: function (t) {
              window.location.href = t;
            },
          },
          a
        )),
          (i.settings = {
            timer: !1,
            data: {
              inClass: "animsition-in-class",
              inDuration: "animsition-in-duration",
              outClass: "animsition-out-class",
              outDuration: "animsition-out-duration",
              overlay: "animsition-overlay",
            },
            events: {
              inStart: "animsition.inStart",
              inEnd: "animsition.inEnd",
              outStart: "animsition.outStart",
              outEnd: "animsition.outEnd",
            },
          });
        var o = i.supportCheck.call(this, a);
        if (!o && a.browser.length > 0 && (!o || !this.length))
          return (
            "console" in window ||
              ((window.console = {}),
              (window.console.log = function (t) {
                return t;
              })),
            this.length ||
              console.log("Animsition: Element does not exist on page."),
            o || console.log("Animsition: Does not support this browser."),
            i.destroy.call(this)
          );
        var e = i.optionCheck.call(this, a);
        return (
          e &&
            t("." + a.overlayClass).length <= 0 &&
            i.addOverlay.call(this, a),
          a.loading &&
            t("." + a.loadingClass).length <= 0 &&
            i.addLoading.call(this, a),
          this.each(function () {
            var o = this,
              e = t(this),
              s = t(window),
              r = t(document),
              l = e.data(n);
            l ||
              ((a = t.extend({}, a)),
              e.data(n, { options: a }),
              a.timeout && i.addTimer.call(o),
              a.onLoadEvent &&
                s.on("load." + n, function () {
                  i.settings.timer && clearTimeout(i.settings.timer),
                    i["in"].call(o);
                }),
              s.on("pageshow." + n, function (t) {
                t.originalEvent.persisted && i["in"].call(o);
              }),
              s.on("unload." + n, function () {}),
              r.on("click." + n, a.linkElement, function (n) {
                n.preventDefault();
                var a = t(this),
                  e = a.attr("href");
                2 === n.which ||
                n.metaKey ||
                n.shiftKey ||
                (-1 !== navigator.platform.toUpperCase().indexOf("WIN") &&
                  n.ctrlKey)
                  ? window.open(e, "_blank")
                  : i.out.call(o, a, e);
              }));
          })
        );
      },
      addOverlay: function (n) {
        t(n.overlayParentElement).prepend(
          '<div class="' + n.overlayClass + '"></div>'
        );
      },
      addLoading: function (n) {
        t(n.loadingParentElement).append(
          '<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>"
        );
      },
      removeLoading: function () {
        var i = t(this),
          a = i.data(n).options,
          o = t(a.loadingParentElement).children("." + a.loadingClass);
        o.fadeOut().remove();
      },
      addTimer: function () {
        var a = this,
          o = t(this),
          e = o.data(n).options;
        i.settings.timer = setTimeout(function () {
          i["in"].call(a), t(window).off("load." + n);
        }, e.timeoutCountdown);
      },
      supportCheck: function (n) {
        var i = t(this),
          a = n.browser,
          o = a.length,
          e = !1;
        0 === o && (e = !0);
        for (var s = 0; o > s; s++)
          if ("string" == typeof i.css(a[s])) {
            e = !0;
            break;
          }
        return e;
      },
      optionCheck: function (n) {
        var a,
          o = t(this);
        return (a = n.overlay || o.data(i.settings.data.overlay) ? !0 : !1);
      },
      animationCheck: function (i, a, o) {
        var e = t(this),
          s = e.data(n).options,
          r = typeof i,
          l = !a && "number" === r,
          d = a && "string" === r && i.length > 0;
        return (
          l || d
            ? (i = i)
            : a && o
            ? (i = s.inClass)
            : !a && o
            ? (i = s.inDuration)
            : a && !o
            ? (i = s.outClass)
            : a || o || (i = s.outDuration),
          i
        );
      },
      in: function () {
        var a = this,
          o = t(this),
          e = o.data(n).options,
          s = o.data(i.settings.data.inDuration),
          r = o.data(i.settings.data.inClass),
          l = i.animationCheck.call(a, s, !1, !0),
          d = i.animationCheck.call(a, r, !0, !0),
          u = i.optionCheck.call(a, e),
          c = o.data(n).outClass;
        e.loading && i.removeLoading.call(a),
          c && o.removeClass(c),
          u ? i.inOverlay.call(a, d, l) : i.inDefault.call(a, d, l);
      },
      inDefault: function (n, a) {
        var o = t(this);
        o.css({ "animation-duration": a + "ms" })
          .addClass(n)
          .trigger(i.settings.events.inStart)
          .animateCallback(function () {
            o.removeClass(n)
              .css({ opacity: 1 })
              .trigger(i.settings.events.inEnd);
          });
      },
      inOverlay: function (a, o) {
        var e = t(this),
          s = e.data(n).options;
        e.css({ opacity: 1 }).trigger(i.settings.events.inStart),
          t(s.overlayParentElement)
            .children("." + s.overlayClass)
            .css({ "animation-duration": o + "ms" })
            .addClass(a)
            .animateCallback(function () {
              e.trigger(i.settings.events.inEnd);
            });
      },
      out: function (a, o) {
        var e = this,
          s = t(this),
          r = s.data(n).options,
          l = a.data(i.settings.data.outClass),
          d = s.data(i.settings.data.outClass),
          u = a.data(i.settings.data.outDuration),
          c = s.data(i.settings.data.outDuration),
          m = l ? l : d,
          g = u ? u : c,
          f = i.animationCheck.call(e, m, !0, !1),
          v = i.animationCheck.call(e, g, !1, !1),
          h = i.optionCheck.call(e, r);
        (s.data(n).outClass = f),
          h ? i.outOverlay.call(e, f, v, o) : i.outDefault.call(e, f, v, o);
      },
      outDefault: function (a, o, e) {
        var s = t(this),
          r = s.data(n).options;
        s.css({ "animation-duration": o + 1 + "ms" })
          .addClass(a)
          .trigger(i.settings.events.outStart)
          .animateCallback(function () {
            s.trigger(i.settings.events.outEnd), r.transition(e);
          });
      },
      outOverlay: function (a, o, e) {
        var s = this,
          r = t(this),
          l = r.data(n).options,
          d = r.data(i.settings.data.inClass),
          u = i.animationCheck.call(s, d, !0, !0);
        t(l.overlayParentElement)
          .children("." + l.overlayClass)
          .css({ "animation-duration": o + 1 + "ms" })
          .removeClass(u)
          .addClass(a)
          .trigger(i.settings.events.outStart)
          .animateCallback(function () {
            r.trigger(i.settings.events.outEnd), l.transition(e);
          });
      },
      destroy: function () {
        return this.each(function () {
          var i = t(this);
          t(window).off("." + n), i.css({ opacity: 1 }).removeData(n);
        });
      },
    };
  (t.fn.animateCallback = function (n) {
    var i = "animationend webkitAnimationEnd";
    return this.each(function () {
      var a = t(this);
      a.on(i, function () {
        return a.off(i), n.call(this);
      });
    });
  }),
    (t.fn.animsition = function (a) {
      return i[a]
        ? i[a].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof a && a
        ? void t.error("Method " + a + " does not exist on jQuery." + n)
        : i.init.apply(this, arguments);
    });
});
