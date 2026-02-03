(function () {
  const $ = document.createElement("link").relList;
  if ($ && $.supports && $.supports("modulepreload")) return;
  for (const Y of document.querySelectorAll('link[rel="modulepreload"]')) v(Y);
  new MutationObserver((Y) => {
    for (const k of Y)
      if (k.type === "childList")
        for (const hl of k.addedNodes)
          hl.tagName === "LINK" && hl.rel === "modulepreload" && v(hl);
  }).observe(document, { childList: !0, subtree: !0 });
  function L(Y) {
    const k = {};
    return (
      Y.integrity && (k.integrity = Y.integrity),
      Y.referrerPolicy && (k.referrerPolicy = Y.referrerPolicy),
      Y.crossOrigin === "use-credentials"
        ? (k.credentials = "include")
        : Y.crossOrigin === "anonymous"
          ? (k.credentials = "omit")
          : (k.credentials = "same-origin"),
      k
    );
  }
  function v(Y) {
    if (Y.ep) return;
    Y.ep = !0;
    const k = L(Y);
    fetch(Y.href, k);
  }
})();
function Oo(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default")
    ? A.default
    : A;
}
var uf = { exports: {} },
  bu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var go;
function Ir() {
  if (go) return bu;
  go = 1;
  var A = Symbol.for("react.transitional.element"),
    $ = Symbol.for("react.fragment");
  function L(v, Y, k) {
    var hl = null;
    if (
      (k !== void 0 && (hl = "" + k),
      Y.key !== void 0 && (hl = "" + Y.key),
      "key" in Y)
    ) {
      k = {};
      for (var Hl in Y) Hl !== "key" && (k[Hl] = Y[Hl]);
    } else k = Y;
    return (
      (Y = k.ref),
      { $$typeof: A, type: v, key: hl, ref: Y !== void 0 ? Y : null, props: k }
    );
  }
  return ((bu.Fragment = $), (bu.jsx = L), (bu.jsxs = L), bu);
}
var bo;
function Pr() {
  return (bo || ((bo = 1), (uf.exports = Ir())), uf.exports);
}
var S = Pr(),
  nf = { exports: {} },
  q = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var So;
function lv() {
  if (So) return q;
  So = 1;
  var A = Symbol.for("react.transitional.element"),
    $ = Symbol.for("react.portal"),
    L = Symbol.for("react.fragment"),
    v = Symbol.for("react.strict_mode"),
    Y = Symbol.for("react.profiler"),
    k = Symbol.for("react.consumer"),
    hl = Symbol.for("react.context"),
    Hl = Symbol.for("react.forward_ref"),
    U = Symbol.for("react.suspense"),
    E = Symbol.for("react.memo"),
    P = Symbol.for("react.lazy"),
    H = Symbol.for("react.activity"),
    ol = Symbol.iterator;
  function kl(d) {
    return d === null || typeof d != "object"
      ? null
      : ((d = (ol && d[ol]) || d["@@iterator"]),
        typeof d == "function" ? d : null);
  }
  var Bl = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Rl = Object.assign,
    Mt = {};
  function Wl(d, T, _) {
    ((this.props = d),
      (this.context = T),
      (this.refs = Mt),
      (this.updater = _ || Bl));
  }
  ((Wl.prototype.isReactComponent = {}),
    (Wl.prototype.setState = function (d, T) {
      if (typeof d != "object" && typeof d != "function" && d != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, d, T, "setState");
    }),
    (Wl.prototype.forceUpdate = function (d) {
      this.updater.enqueueForceUpdate(this, d, "forceUpdate");
    }));
  function kt() {}
  kt.prototype = Wl.prototype;
  function Ul(d, T, _) {
    ((this.props = d),
      (this.context = T),
      (this.refs = Mt),
      (this.updater = _ || Bl));
  }
  var it = (Ul.prototype = new kt());
  ((it.constructor = Ul), Rl(it, Wl.prototype), (it.isPureReactComponent = !0));
  var zt = Array.isArray;
  function Yl() {}
  var J = { H: null, A: null, T: null, S: null },
    Gl = Object.prototype.hasOwnProperty;
  function Tt(d, T, _) {
    var M = _.ref;
    return {
      $$typeof: A,
      type: d,
      key: T,
      ref: M !== void 0 ? M : null,
      props: _,
    };
  }
  function Xa(d, T) {
    return Tt(d.type, T, d.props);
  }
  function Et(d) {
    return typeof d == "object" && d !== null && d.$$typeof === A;
  }
  function Xl(d) {
    var T = { "=": "=0", ":": "=2" };
    return (
      "$" +
      d.replace(/[=:]/g, function (_) {
        return T[_];
      })
    );
  }
  var pa = /\/+/g;
  function Nt(d, T) {
    return typeof d == "object" && d !== null && d.key != null
      ? Xl("" + d.key)
      : T.toString(36);
  }
  function gt(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (
          (typeof d.status == "string"
            ? d.then(Yl, Yl)
            : ((d.status = "pending"),
              d.then(
                function (T) {
                  d.status === "pending" &&
                    ((d.status = "fulfilled"), (d.value = T));
                },
                function (T) {
                  d.status === "pending" &&
                    ((d.status = "rejected"), (d.reason = T));
                },
              )),
          d.status)
        ) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function b(d, T, _, M, C) {
    var X = typeof d;
    (X === "undefined" || X === "boolean") && (d = null);
    var ll = !1;
    if (d === null) ll = !0;
    else
      switch (X) {
        case "bigint":
        case "string":
        case "number":
          ll = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case A:
            case $:
              ll = !0;
              break;
            case P:
              return ((ll = d._init), b(ll(d._payload), T, _, M, C));
          }
      }
    if (ll)
      return (
        (C = C(d)),
        (ll = M === "" ? "." + Nt(d, 0) : M),
        zt(C)
          ? ((_ = ""),
            ll != null && (_ = ll.replace(pa, "$&/") + "/"),
            b(C, T, _, "", function (xe) {
              return xe;
            }))
          : C != null &&
            (Et(C) &&
              (C = Xa(
                C,
                _ +
                  (C.key == null || (d && d.key === C.key)
                    ? ""
                    : ("" + C.key).replace(pa, "$&/") + "/") +
                  ll,
              )),
            T.push(C)),
        1
      );
    ll = 0;
    var ql = M === "" ? "." : M + ":";
    if (zt(d))
      for (var yl = 0; yl < d.length; yl++)
        ((M = d[yl]), (X = ql + Nt(M, yl)), (ll += b(M, T, _, X, C)));
    else if (((yl = kl(d)), typeof yl == "function"))
      for (d = yl.call(d), yl = 0; !(M = d.next()).done; )
        ((M = M.value), (X = ql + Nt(M, yl++)), (ll += b(M, T, _, X, C)));
    else if (X === "object") {
      if (typeof d.then == "function") return b(gt(d), T, _, M, C);
      throw (
        (T = String(d)),
        Error(
          "Objects are not valid as a React child (found: " +
            (T === "[object Object]"
              ? "object with keys {" + Object.keys(d).join(", ") + "}"
              : T) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ll;
  }
  function x(d, T, _) {
    if (d == null) return d;
    var M = [],
      C = 0;
    return (
      b(d, M, "", "", function (X) {
        return T.call(_, X, C++);
      }),
      M
    );
  }
  function R(d) {
    if (d._status === -1) {
      var T = d._result;
      ((T = T()),
        T.then(
          function (_) {
            (d._status === 0 || d._status === -1) &&
              ((d._status = 1), (d._result = _));
          },
          function (_) {
            (d._status === 0 || d._status === -1) &&
              ((d._status = 2), (d._result = _));
          },
        ),
        d._status === -1 && ((d._status = 0), (d._result = T)));
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var el =
      typeof reportError == "function"
        ? reportError
        : function (d) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var T = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof d == "object" &&
                  d !== null &&
                  typeof d.message == "string"
                    ? String(d.message)
                    : String(d),
                error: d,
              });
              if (!window.dispatchEvent(T)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", d);
              return;
            }
            console.error(d);
          },
    cl = {
      map: x,
      forEach: function (d, T, _) {
        x(
          d,
          function () {
            T.apply(this, arguments);
          },
          _,
        );
      },
      count: function (d) {
        var T = 0;
        return (
          x(d, function () {
            T++;
          }),
          T
        );
      },
      toArray: function (d) {
        return (
          x(d, function (T) {
            return T;
          }) || []
        );
      },
      only: function (d) {
        if (!Et(d))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return d;
      },
    };
  return (
    (q.Activity = H),
    (q.Children = cl),
    (q.Component = Wl),
    (q.Fragment = L),
    (q.Profiler = Y),
    (q.PureComponent = Ul),
    (q.StrictMode = v),
    (q.Suspense = U),
    (q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
    (q.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (d) {
        return J.H.useMemoCache(d);
      },
    }),
    (q.cache = function (d) {
      return function () {
        return d.apply(null, arguments);
      };
    }),
    (q.cacheSignal = function () {
      return null;
    }),
    (q.cloneElement = function (d, T, _) {
      if (d == null)
        throw Error(
          "The argument must be a React element, but you passed " + d + ".",
        );
      var M = Rl({}, d.props),
        C = d.key;
      if (T != null)
        for (X in (T.key !== void 0 && (C = "" + T.key), T))
          !Gl.call(T, X) ||
            X === "key" ||
            X === "__self" ||
            X === "__source" ||
            (X === "ref" && T.ref === void 0) ||
            (M[X] = T[X]);
      var X = arguments.length - 2;
      if (X === 1) M.children = _;
      else if (1 < X) {
        for (var ll = Array(X), ql = 0; ql < X; ql++)
          ll[ql] = arguments[ql + 2];
        M.children = ll;
      }
      return Tt(d.type, C, M);
    }),
    (q.createContext = function (d) {
      return (
        (d = {
          $$typeof: hl,
          _currentValue: d,
          _currentValue2: d,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (d.Provider = d),
        (d.Consumer = { $$typeof: k, _context: d }),
        d
      );
    }),
    (q.createElement = function (d, T, _) {
      var M,
        C = {},
        X = null;
      if (T != null)
        for (M in (T.key !== void 0 && (X = "" + T.key), T))
          Gl.call(T, M) &&
            M !== "key" &&
            M !== "__self" &&
            M !== "__source" &&
            (C[M] = T[M]);
      var ll = arguments.length - 2;
      if (ll === 1) C.children = _;
      else if (1 < ll) {
        for (var ql = Array(ll), yl = 0; yl < ll; yl++)
          ql[yl] = arguments[yl + 2];
        C.children = ql;
      }
      if (d && d.defaultProps)
        for (M in ((ll = d.defaultProps), ll))
          C[M] === void 0 && (C[M] = ll[M]);
      return Tt(d, X, C);
    }),
    (q.createRef = function () {
      return { current: null };
    }),
    (q.forwardRef = function (d) {
      return { $$typeof: Hl, render: d };
    }),
    (q.isValidElement = Et),
    (q.lazy = function (d) {
      return { $$typeof: P, _payload: { _status: -1, _result: d }, _init: R };
    }),
    (q.memo = function (d, T) {
      return { $$typeof: E, type: d, compare: T === void 0 ? null : T };
    }),
    (q.startTransition = function (d) {
      var T = J.T,
        _ = {};
      J.T = _;
      try {
        var M = d(),
          C = J.S;
        (C !== null && C(_, M),
          typeof M == "object" &&
            M !== null &&
            typeof M.then == "function" &&
            M.then(Yl, el));
      } catch (X) {
        el(X);
      } finally {
        (T !== null && _.types !== null && (T.types = _.types), (J.T = T));
      }
    }),
    (q.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh();
    }),
    (q.use = function (d) {
      return J.H.use(d);
    }),
    (q.useActionState = function (d, T, _) {
      return J.H.useActionState(d, T, _);
    }),
    (q.useCallback = function (d, T) {
      return J.H.useCallback(d, T);
    }),
    (q.useContext = function (d) {
      return J.H.useContext(d);
    }),
    (q.useDebugValue = function () {}),
    (q.useDeferredValue = function (d, T) {
      return J.H.useDeferredValue(d, T);
    }),
    (q.useEffect = function (d, T) {
      return J.H.useEffect(d, T);
    }),
    (q.useEffectEvent = function (d) {
      return J.H.useEffectEvent(d);
    }),
    (q.useId = function () {
      return J.H.useId();
    }),
    (q.useImperativeHandle = function (d, T, _) {
      return J.H.useImperativeHandle(d, T, _);
    }),
    (q.useInsertionEffect = function (d, T) {
      return J.H.useInsertionEffect(d, T);
    }),
    (q.useLayoutEffect = function (d, T) {
      return J.H.useLayoutEffect(d, T);
    }),
    (q.useMemo = function (d, T) {
      return J.H.useMemo(d, T);
    }),
    (q.useOptimistic = function (d, T) {
      return J.H.useOptimistic(d, T);
    }),
    (q.useReducer = function (d, T, _) {
      return J.H.useReducer(d, T, _);
    }),
    (q.useRef = function (d) {
      return J.H.useRef(d);
    }),
    (q.useState = function (d) {
      return J.H.useState(d);
    }),
    (q.useSyncExternalStore = function (d, T, _) {
      return J.H.useSyncExternalStore(d, T, _);
    }),
    (q.useTransition = function () {
      return J.H.useTransition();
    }),
    (q.version = "19.2.4"),
    q
  );
}
var po;
function vf() {
  return (po || ((po = 1), (nf.exports = lv())), nf.exports);
}
var pu = vf();
const tv = Oo(pu);
var cf = { exports: {} },
  Su = {},
  ff = { exports: {} },
  sf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zo;
function av() {
  return (
    zo ||
      ((zo = 1),
      (function (A) {
        function $(b, x) {
          var R = b.length;
          b.push(x);
          l: for (; 0 < R; ) {
            var el = (R - 1) >>> 1,
              cl = b[el];
            if (0 < Y(cl, x)) ((b[el] = x), (b[R] = cl), (R = el));
            else break l;
          }
        }
        function L(b) {
          return b.length === 0 ? null : b[0];
        }
        function v(b) {
          if (b.length === 0) return null;
          var x = b[0],
            R = b.pop();
          if (R !== x) {
            b[0] = R;
            l: for (var el = 0, cl = b.length, d = cl >>> 1; el < d; ) {
              var T = 2 * (el + 1) - 1,
                _ = b[T],
                M = T + 1,
                C = b[M];
              if (0 > Y(_, R))
                M < cl && 0 > Y(C, _)
                  ? ((b[el] = C), (b[M] = R), (el = M))
                  : ((b[el] = _), (b[T] = R), (el = T));
              else if (M < cl && 0 > Y(C, R))
                ((b[el] = C), (b[M] = R), (el = M));
              else break l;
            }
          }
          return x;
        }
        function Y(b, x) {
          var R = b.sortIndex - x.sortIndex;
          return R !== 0 ? R : b.id - x.id;
        }
        if (
          ((A.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var k = performance;
          A.unstable_now = function () {
            return k.now();
          };
        } else {
          var hl = Date,
            Hl = hl.now();
          A.unstable_now = function () {
            return hl.now() - Hl;
          };
        }
        var U = [],
          E = [],
          P = 1,
          H = null,
          ol = 3,
          kl = !1,
          Bl = !1,
          Rl = !1,
          Mt = !1,
          Wl = typeof setTimeout == "function" ? setTimeout : null,
          kt = typeof clearTimeout == "function" ? clearTimeout : null,
          Ul = typeof setImmediate < "u" ? setImmediate : null;
        function it(b) {
          for (var x = L(E); x !== null; ) {
            if (x.callback === null) v(E);
            else if (x.startTime <= b)
              (v(E), (x.sortIndex = x.expirationTime), $(U, x));
            else break;
            x = L(E);
          }
        }
        function zt(b) {
          if (((Rl = !1), it(b), !Bl))
            if (L(U) !== null) ((Bl = !0), Yl || ((Yl = !0), Xl()));
            else {
              var x = L(E);
              x !== null && gt(zt, x.startTime - b);
            }
        }
        var Yl = !1,
          J = -1,
          Gl = 5,
          Tt = -1;
        function Xa() {
          return Mt ? !0 : !(A.unstable_now() - Tt < Gl);
        }
        function Et() {
          if (((Mt = !1), Yl)) {
            var b = A.unstable_now();
            Tt = b;
            var x = !0;
            try {
              l: {
                ((Bl = !1), Rl && ((Rl = !1), kt(J), (J = -1)), (kl = !0));
                var R = ol;
                try {
                  t: {
                    for (
                      it(b), H = L(U);
                      H !== null && !(H.expirationTime > b && Xa());
                    ) {
                      var el = H.callback;
                      if (typeof el == "function") {
                        ((H.callback = null), (ol = H.priorityLevel));
                        var cl = el(H.expirationTime <= b);
                        if (((b = A.unstable_now()), typeof cl == "function")) {
                          ((H.callback = cl), it(b), (x = !0));
                          break t;
                        }
                        (H === L(U) && v(U), it(b));
                      } else v(U);
                      H = L(U);
                    }
                    if (H !== null) x = !0;
                    else {
                      var d = L(E);
                      (d !== null && gt(zt, d.startTime - b), (x = !1));
                    }
                  }
                  break l;
                } finally {
                  ((H = null), (ol = R), (kl = !1));
                }
                x = void 0;
              }
            } finally {
              x ? Xl() : (Yl = !1);
            }
          }
        }
        var Xl;
        if (typeof Ul == "function")
          Xl = function () {
            Ul(Et);
          };
        else if (typeof MessageChannel < "u") {
          var pa = new MessageChannel(),
            Nt = pa.port2;
          ((pa.port1.onmessage = Et),
            (Xl = function () {
              Nt.postMessage(null);
            }));
        } else
          Xl = function () {
            Wl(Et, 0);
          };
        function gt(b, x) {
          J = Wl(function () {
            b(A.unstable_now());
          }, x);
        }
        ((A.unstable_IdlePriority = 5),
          (A.unstable_ImmediatePriority = 1),
          (A.unstable_LowPriority = 4),
          (A.unstable_NormalPriority = 3),
          (A.unstable_Profiling = null),
          (A.unstable_UserBlockingPriority = 2),
          (A.unstable_cancelCallback = function (b) {
            b.callback = null;
          }),
          (A.unstable_forceFrameRate = function (b) {
            0 > b || 125 < b
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Gl = 0 < b ? Math.floor(1e3 / b) : 5);
          }),
          (A.unstable_getCurrentPriorityLevel = function () {
            return ol;
          }),
          (A.unstable_next = function (b) {
            switch (ol) {
              case 1:
              case 2:
              case 3:
                var x = 3;
                break;
              default:
                x = ol;
            }
            var R = ol;
            ol = x;
            try {
              return b();
            } finally {
              ol = R;
            }
          }),
          (A.unstable_requestPaint = function () {
            Mt = !0;
          }),
          (A.unstable_runWithPriority = function (b, x) {
            switch (b) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                b = 3;
            }
            var R = ol;
            ol = b;
            try {
              return x();
            } finally {
              ol = R;
            }
          }),
          (A.unstable_scheduleCallback = function (b, x, R) {
            var el = A.unstable_now();
            switch (
              (typeof R == "object" && R !== null
                ? ((R = R.delay),
                  (R = typeof R == "number" && 0 < R ? el + R : el))
                : (R = el),
              b)
            ) {
              case 1:
                var cl = -1;
                break;
              case 2:
                cl = 250;
                break;
              case 5:
                cl = 1073741823;
                break;
              case 4:
                cl = 1e4;
                break;
              default:
                cl = 5e3;
            }
            return (
              (cl = R + cl),
              (b = {
                id: P++,
                callback: x,
                priorityLevel: b,
                startTime: R,
                expirationTime: cl,
                sortIndex: -1,
              }),
              R > el
                ? ((b.sortIndex = R),
                  $(E, b),
                  L(U) === null &&
                    b === L(E) &&
                    (Rl ? (kt(J), (J = -1)) : (Rl = !0), gt(zt, R - el)))
                : ((b.sortIndex = cl),
                  $(U, b),
                  Bl || kl || ((Bl = !0), Yl || ((Yl = !0), Xl()))),
              b
            );
          }),
          (A.unstable_shouldYield = Xa),
          (A.unstable_wrapCallback = function (b) {
            var x = ol;
            return function () {
              var R = ol;
              ol = x;
              try {
                return b.apply(this, arguments);
              } finally {
                ol = R;
              }
            };
          }));
      })(sf)),
    sf
  );
}
var To;
function ev() {
  return (To || ((To = 1), (ff.exports = av())), ff.exports);
}
var df = { exports: {} },
  jl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eo;
function uv() {
  if (Eo) return jl;
  Eo = 1;
  var A = vf();
  function $(U) {
    var E = "https://react.dev/errors/" + U;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var P = 2; P < arguments.length; P++)
        E += "&args[]=" + encodeURIComponent(arguments[P]);
    }
    return (
      "Minified React error #" +
      U +
      "; visit " +
      E +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function L() {}
  var v = {
      d: {
        f: L,
        r: function () {
          throw Error($(522));
        },
        D: L,
        C: L,
        L,
        m: L,
        X: L,
        S: L,
        M: L,
      },
      p: 0,
      findDOMNode: null,
    },
    Y = Symbol.for("react.portal");
  function k(U, E, P) {
    var H =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Y,
      key: H == null ? null : "" + H,
      children: U,
      containerInfo: E,
      implementation: P,
    };
  }
  var hl = A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Hl(U, E) {
    if (U === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (jl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v),
    (jl.createPortal = function (U, E) {
      var P =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11))
        throw Error($(299));
      return k(U, E, null, P);
    }),
    (jl.flushSync = function (U) {
      var E = hl.T,
        P = v.p;
      try {
        if (((hl.T = null), (v.p = 2), U)) return U();
      } finally {
        ((hl.T = E), (v.p = P), v.d.f());
      }
    }),
    (jl.preconnect = function (U, E) {
      typeof U == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E =
              typeof E == "string"
                ? E === "use-credentials"
                  ? E
                  : ""
                : void 0))
          : (E = null),
        v.d.C(U, E));
    }),
    (jl.prefetchDNS = function (U) {
      typeof U == "string" && v.d.D(U);
    }),
    (jl.preinit = function (U, E) {
      if (typeof U == "string" && E && typeof E.as == "string") {
        var P = E.as,
          H = Hl(P, E.crossOrigin),
          ol = typeof E.integrity == "string" ? E.integrity : void 0,
          kl = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        P === "style"
          ? v.d.S(U, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: H,
              integrity: ol,
              fetchPriority: kl,
            })
          : P === "script" &&
            v.d.X(U, {
              crossOrigin: H,
              integrity: ol,
              fetchPriority: kl,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (jl.preinitModule = function (U, E) {
      if (typeof U == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var P = Hl(E.as, E.crossOrigin);
            v.d.M(U, {
              crossOrigin: P,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
          }
        } else E == null && v.d.M(U);
    }),
    (jl.preload = function (U, E) {
      if (
        typeof U == "string" &&
        typeof E == "object" &&
        E !== null &&
        typeof E.as == "string"
      ) {
        var P = E.as,
          H = Hl(P, E.crossOrigin);
        v.d.L(U, P, {
          crossOrigin: H,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0,
          type: typeof E.type == "string" ? E.type : void 0,
          fetchPriority:
            typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          referrerPolicy:
            typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
          imageSrcSet:
            typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
          imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
          media: typeof E.media == "string" ? E.media : void 0,
        });
      }
    }),
    (jl.preloadModule = function (U, E) {
      if (typeof U == "string")
        if (E) {
          var P = Hl(E.as, E.crossOrigin);
          v.d.m(U, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: P,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          });
        } else v.d.m(U);
    }),
    (jl.requestFormReset = function (U) {
      v.d.r(U);
    }),
    (jl.unstable_batchedUpdates = function (U, E) {
      return U(E);
    }),
    (jl.useFormState = function (U, E, P) {
      return hl.H.useFormState(U, E, P);
    }),
    (jl.useFormStatus = function () {
      return hl.H.useHostTransitionStatus();
    }),
    (jl.version = "19.2.4"),
    jl
  );
}
var Ao;
function nv() {
  if (Ao) return df.exports;
  Ao = 1;
  function A() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(A);
      } catch ($) {
        console.error($);
      }
  }
  return (A(), (df.exports = uv()), df.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xo;
function iv() {
  if (xo) return Su;
  xo = 1;
  var A = ev(),
    $ = vf(),
    L = nv();
  function v(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function Y(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function k(l) {
    var t = l,
      a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do ((t = l), (t.flags & 4098) !== 0 && (a = t.return), (l = t.return));
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function hl(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Hl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function U(l) {
    if (k(l) !== l) throw Error(v(188));
  }
  function E(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = k(l)), t === null)) throw Error(v(188));
      return t !== l ? null : l;
    }
    for (var a = l, e = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((e = u.return), e !== null)) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return (U(u), l);
          if (n === e) return (U(u), t);
          n = n.sibling;
        }
        throw Error(v(188));
      }
      if (a.return !== e.return) ((a = u), (e = n));
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === a) {
            ((i = !0), (a = u), (e = n));
            break;
          }
          if (c === e) {
            ((i = !0), (e = u), (a = n));
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === a) {
              ((i = !0), (a = n), (e = u));
              break;
            }
            if (c === e) {
              ((i = !0), (e = n), (a = u));
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(v(189));
        }
      }
      if (a.alternate !== e) throw Error(v(190));
    }
    if (a.tag !== 3) throw Error(v(188));
    return a.stateNode.current === a ? l : t;
  }
  function P(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = P(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var H = Object.assign,
    ol = Symbol.for("react.element"),
    kl = Symbol.for("react.transitional.element"),
    Bl = Symbol.for("react.portal"),
    Rl = Symbol.for("react.fragment"),
    Mt = Symbol.for("react.strict_mode"),
    Wl = Symbol.for("react.profiler"),
    kt = Symbol.for("react.consumer"),
    Ul = Symbol.for("react.context"),
    it = Symbol.for("react.forward_ref"),
    zt = Symbol.for("react.suspense"),
    Yl = Symbol.for("react.suspense_list"),
    J = Symbol.for("react.memo"),
    Gl = Symbol.for("react.lazy"),
    Tt = Symbol.for("react.activity"),
    Xa = Symbol.for("react.memo_cache_sentinel"),
    Et = Symbol.iterator;
  function Xl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (Et && l[Et]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var pa = Symbol.for("react.client.reference");
  function Nt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === pa ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Rl:
        return "Fragment";
      case Wl:
        return "Profiler";
      case Mt:
        return "StrictMode";
      case zt:
        return "Suspense";
      case Yl:
        return "SuspenseList";
      case Tt:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Bl:
          return "Portal";
        case Ul:
          return l.displayName || "Context";
        case kt:
          return (l._context.displayName || "Context") + ".Consumer";
        case it:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case J:
          return (
            (t = l.displayName || null),
            t !== null ? t : Nt(l.type) || "Memo"
          );
        case Gl:
          ((t = l._payload), (l = l._init));
          try {
            return Nt(l(t));
          } catch {}
      }
    return null;
  }
  var gt = Array.isArray,
    b = $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    x = L.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    R = { pending: !1, data: null, method: null, action: null },
    el = [],
    cl = -1;
  function d(l) {
    return { current: l };
  }
  function T(l) {
    0 > cl || ((l.current = el[cl]), (el[cl] = null), cl--);
  }
  function _(l, t) {
    (cl++, (el[cl] = l.current), (l.current = t));
  }
  var M = d(null),
    C = d(null),
    X = d(null),
    ll = d(null);
  function ql(l, t) {
    switch ((_(X, t), _(C, l), _(M, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? G0(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          ((t = G0(t)), (l = X0(t, l)));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    (T(M), _(M, l));
  }
  function yl() {
    (T(M), T(C), T(X));
  }
  function xe(l) {
    l.memoizedState !== null && _(ll, l);
    var t = M.current,
      a = X0(t, l.type);
    t !== a && (_(C, l), _(M, a));
  }
  function zu(l) {
    (C.current === l && (T(M), T(C)),
      ll.current === l && (T(ll), (vu._currentValue = R)));
  }
  var Xn, hf;
  function za(l) {
    if (Xn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((Xn = (t && t[1]) || ""),
          (hf =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Xn +
      l +
      hf
    );
  }
  var Qn = !1;
  function Zn(l, t) {
    if (!l || Qn) return "";
    Qn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(z, []);
                } catch (y) {
                  var h = y;
                }
                Reflect.construct(l, [], z);
              } else {
                try {
                  z.call();
                } catch (y) {
                  h = y;
                }
                l.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (y) {
                h = y;
              }
              (z = l()) &&
                typeof z.catch == "function" &&
                z.catch(function () {});
            }
          } catch (y) {
            if (y && h && typeof y.stack == "string") return [y.stack, h.stack];
          }
          return [null, null];
        },
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(e.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = e.DetermineComponentFrameRoot(),
        i = n[0],
        c = n[1];
      if (i && c) {
        var f = i.split(`
`),
          r = c.split(`
`);
        for (
          u = e = 0;
          e < f.length && !f[e].includes("DetermineComponentFrameRoot");
        )
          e++;
        for (; u < r.length && !r[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (e === f.length || u === r.length)
          for (
            e = f.length - 1, u = r.length - 1;
            1 <= e && 0 <= u && f[e] !== r[u];
          )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== r[u]) {
            if (e !== 1 || u !== 1)
              do
                if ((e--, u--, 0 > u || f[e] !== r[u])) {
                  var g =
                    `
` + f[e].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      g.includes("<anonymous>") &&
                      (g = g.replace("<anonymous>", l.displayName)),
                    g
                  );
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      ((Qn = !1), (Error.prepareStackTrace = a));
    }
    return (a = l ? l.displayName || l.name : "") ? za(a) : "";
  }
  function No(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return za(l.type);
      case 16:
        return za("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? za("Suspense Fallback")
          : za("Suspense");
      case 19:
        return za("SuspenseList");
      case 0:
      case 15:
        return Zn(l.type, !1);
      case 11:
        return Zn(l.type.render, !1);
      case 1:
        return Zn(l.type, !0);
      case 31:
        return za("Activity");
      default:
        return "";
    }
  }
  function yf(l) {
    try {
      var t = "",
        a = null;
      do ((t += No(l, a)), (a = l), (l = l.return));
      while (l);
      return t;
    } catch (e) {
      return (
        `
Error generating stack: ` +
        e.message +
        `
` +
        e.stack
      );
    }
  }
  var Ln = Object.prototype.hasOwnProperty,
    Vn = A.unstable_scheduleCallback,
    Kn = A.unstable_cancelCallback,
    Do = A.unstable_shouldYield,
    Uo = A.unstable_requestPaint,
    Fl = A.unstable_now,
    jo = A.unstable_getCurrentPriorityLevel,
    gf = A.unstable_ImmediatePriority,
    bf = A.unstable_UserBlockingPriority,
    Tu = A.unstable_NormalPriority,
    Ho = A.unstable_LowPriority,
    Sf = A.unstable_IdlePriority,
    Ro = A.log,
    qo = A.unstable_setDisableYieldValue,
    _e = null,
    $l = null;
  function Wt(l) {
    if (
      (typeof Ro == "function" && qo(l),
      $l && typeof $l.setStrictMode == "function")
    )
      try {
        $l.setStrictMode(_e, l);
      } catch {}
  }
  var Il = Math.clz32 ? Math.clz32 : Yo,
    Co = Math.log,
    Bo = Math.LN2;
  function Yo(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - ((Co(l) / Bo) | 0)) | 0);
  }
  var Eu = 256,
    Au = 262144,
    xu = 4194304;
  function Ta(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function _u(l, t, a) {
    var e = l.pendingLanes;
    if (e === 0) return 0;
    var u = 0,
      n = l.suspendedLanes,
      i = l.pingedLanes;
    l = l.warmLanes;
    var c = e & 134217727;
    return (
      c !== 0
        ? ((e = c & ~n),
          e !== 0
            ? (u = Ta(e))
            : ((i &= c),
              i !== 0
                ? (u = Ta(i))
                : a || ((a = c & ~l), a !== 0 && (u = Ta(a)))))
        : ((c = e & ~n),
          c !== 0
            ? (u = Ta(c))
            : i !== 0
              ? (u = Ta(i))
              : a || ((a = e & ~l), a !== 0 && (u = Ta(a)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & n) === 0 &&
            ((n = u & -u),
            (a = t & -t),
            n >= a || (n === 32 && (a & 4194048) !== 0))
          ? t
          : u
    );
  }
  function Oe(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Go(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function pf() {
    var l = xu;
    return ((xu <<= 1), (xu & 62914560) === 0 && (xu = 4194304), l);
  }
  function Jn(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Me(l, t) {
    ((l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function Xo(l, t, a, e, u, n) {
    var i = l.pendingLanes;
    ((l.pendingLanes = a),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= a),
      (l.entangledLanes &= a),
      (l.errorRecoveryDisabledLanes &= a),
      (l.shellSuspendCounter = 0));
    var c = l.entanglements,
      f = l.expirationTimes,
      r = l.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var g = 31 - Il(a),
        z = 1 << g;
      ((c[g] = 0), (f[g] = -1));
      var h = r[g];
      if (h !== null)
        for (r[g] = null, g = 0; g < h.length; g++) {
          var y = h[g];
          y !== null && (y.lane &= -536870913);
        }
      a &= ~z;
    }
    (e !== 0 && zf(l, e, 0),
      n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t)));
  }
  function zf(l, t, a) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var e = 31 - Il(t);
    ((l.entangledLanes |= t),
      (l.entanglements[e] = l.entanglements[e] | 1073741824 | (a & 261930)));
  }
  function Tf(l, t) {
    var a = (l.entangledLanes |= t);
    for (l = l.entanglements; a; ) {
      var e = 31 - Il(a),
        u = 1 << e;
      ((u & t) | (l[e] & t) && (l[e] |= t), (a &= ~u));
    }
  }
  function Ef(l, t) {
    var a = t & -t;
    return (
      (a = (a & 42) !== 0 ? 1 : wn(a)),
      (a & (l.suspendedLanes | t)) !== 0 ? 0 : a
    );
  }
  function wn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function kn(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Af() {
    var l = x.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : so(l.type));
  }
  function xf(l, t) {
    var a = x.p;
    try {
      return ((x.p = l), t());
    } finally {
      x.p = a;
    }
  }
  var Ft = Math.random().toString(36).slice(2),
    _l = "__reactFiber$" + Ft,
    Ql = "__reactProps$" + Ft,
    Qa = "__reactContainer$" + Ft,
    Wn = "__reactEvents$" + Ft,
    Qo = "__reactListeners$" + Ft,
    Zo = "__reactHandles$" + Ft,
    _f = "__reactResources$" + Ft,
    Ne = "__reactMarker$" + Ft;
  function Fn(l) {
    (delete l[_l], delete l[Ql], delete l[Wn], delete l[Qo], delete l[Zo]);
  }
  function Za(l) {
    var t = l[_l];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if ((t = a[Qa] || a[_l])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (l = w0(l); l !== null; ) {
            if ((a = l[_l])) return a;
            l = w0(l);
          }
        return t;
      }
      ((l = a), (a = l.parentNode));
    }
    return null;
  }
  function La(l) {
    if ((l = l[_l] || l[Qa])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function De(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(v(33));
  }
  function Va(l) {
    var t = l[_f];
    return (
      t ||
        (t = l[_f] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Al(l) {
    l[Ne] = !0;
  }
  var Of = new Set(),
    Mf = {};
  function Ea(l, t) {
    (Ka(l, t), Ka(l + "Capture", t));
  }
  function Ka(l, t) {
    for (Mf[l] = t, l = 0; l < t.length; l++) Of.add(t[l]);
  }
  var Lo = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Nf = {},
    Df = {};
  function Vo(l) {
    return Ln.call(Df, l)
      ? !0
      : Ln.call(Nf, l)
        ? !1
        : Lo.test(l)
          ? (Df[l] = !0)
          : ((Nf[l] = !0), !1);
  }
  function Ou(l, t, a) {
    if (Vo(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var e = t.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function Mu(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function Dt(l, t, a, e) {
    if (e === null) l.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + e);
    }
  }
  function ct(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Uf(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Ko(l, t, a) {
    var e = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof e < "u" &&
      typeof e.get == "function" &&
      typeof e.set == "function"
    ) {
      var u = e.get,
        n = e.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            ((a = "" + i), n.call(this, i));
          },
        }),
        Object.defineProperty(l, t, { enumerable: e.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (i) {
            a = "" + i;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function $n(l) {
    if (!l._valueTracker) {
      var t = Uf(l) ? "checked" : "value";
      l._valueTracker = Ko(l, t, "" + l[t]);
    }
  }
  function jf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      e = "";
    return (
      l && (e = Uf(l) ? (l.checked ? "true" : "false") : l.value),
      (l = e),
      l !== a ? (t.setValue(l), !0) : !1
    );
  }
  function Nu(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Jo = /[\n"\\]/g;
  function ft(l) {
    return l.replace(Jo, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function In(l, t, a, e, u, n, i, c) {
    ((l.name = ""),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.type = i)
        : l.removeAttribute("type"),
      t != null
        ? i === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + ct(t))
          : l.value !== "" + ct(t) && (l.value = "" + ct(t))
        : (i !== "submit" && i !== "reset") || l.removeAttribute("value"),
      t != null
        ? Pn(l, i, ct(t))
        : a != null
          ? Pn(l, i, ct(a))
          : e != null && l.removeAttribute("value"),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null &&
        (l.checked = u && typeof u != "function" && typeof u != "symbol"),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.name = "" + ct(c))
        : l.removeAttribute("name"));
  }
  function Hf(l, t, a, e, u, n, i, c) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || a != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) {
        $n(l);
        return;
      }
      ((a = a != null ? "" + ct(a) : ""),
        (t = t != null ? "" + ct(t) : a),
        c || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((e = e ?? u),
      (e = typeof e != "function" && typeof e != "symbol" && !!e),
      (l.checked = c ? l.checked : !!e),
      (l.defaultChecked = !!e),
      i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (l.name = i),
      $n(l));
  }
  function Pn(l, t, a) {
    (t === "number" && Nu(l.ownerDocument) === l) ||
      l.defaultValue === "" + a ||
      (l.defaultValue = "" + a);
  }
  function Ja(l, t, a, e) {
    if (((l = l.options), t)) {
      t = {};
      for (var u = 0; u < a.length; u++) t["$" + a[u]] = !0;
      for (a = 0; a < l.length; a++)
        ((u = t.hasOwnProperty("$" + l[a].value)),
          l[a].selected !== u && (l[a].selected = u),
          u && e && (l[a].defaultSelected = !0));
    } else {
      for (a = "" + ct(a), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === a) {
          ((l[u].selected = !0), e && (l[u].defaultSelected = !0));
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Rf(l, t, a) {
    if (
      t != null &&
      ((t = "" + ct(t)), t !== l.value && (l.value = t), a == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + ct(a) : "";
  }
  function qf(l, t, a, e) {
    if (t == null) {
      if (e != null) {
        if (a != null) throw Error(v(92));
        if (gt(e)) {
          if (1 < e.length) throw Error(v(93));
          e = e[0];
        }
        a = e;
      }
      (a == null && (a = ""), (t = a));
    }
    ((a = ct(t)),
      (l.defaultValue = a),
      (e = l.textContent),
      e === a && e !== "" && e !== null && (l.value = e),
      $n(l));
  }
  function wa(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var wo = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Cf(l, t, a) {
    var e = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? e
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : e
        ? l.setProperty(t, a)
        : typeof a != "number" || a === 0 || wo.has(t)
          ? t === "float"
            ? (l.cssFloat = a)
            : (l[t] = ("" + a).trim())
          : (l[t] = a + "px");
  }
  function Bf(l, t, a) {
    if (t != null && typeof t != "object") throw Error(v(62));
    if (((l = l.style), a != null)) {
      for (var e in a)
        !a.hasOwnProperty(e) ||
          (t != null && t.hasOwnProperty(e)) ||
          (e.indexOf("--") === 0
            ? l.setProperty(e, "")
            : e === "float"
              ? (l.cssFloat = "")
              : (l[e] = ""));
      for (var u in t)
        ((e = t[u]), t.hasOwnProperty(u) && a[u] !== e && Cf(l, u, e));
    } else for (var n in t) t.hasOwnProperty(n) && Cf(l, n, t[n]);
  }
  function li(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var ko = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Wo =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Du(l) {
    return Wo.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function Ut() {}
  var ti = null;
  function ai(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var ka = null,
    Wa = null;
  function Yf(l) {
    var t = La(l);
    if (t && (l = t.stateNode)) {
      var a = l[Ql] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (In(
              l,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + ft("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var e = a[t];
              if (e !== l && e.form === l.form) {
                var u = e[Ql] || null;
                if (!u) throw Error(v(90));
                In(
                  e,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (t = 0; t < a.length; t++)
              ((e = a[t]), e.form === l.form && jf(e));
          }
          break l;
        case "textarea":
          Rf(l, a.value, a.defaultValue);
          break l;
        case "select":
          ((t = a.value), t != null && Ja(l, !!a.multiple, t, !1));
      }
    }
  }
  var ei = !1;
  function Gf(l, t, a) {
    if (ei) return l(t, a);
    ei = !0;
    try {
      var e = l(t);
      return e;
    } finally {
      if (
        ((ei = !1),
        (ka !== null || Wa !== null) &&
          (bn(), ka && ((t = ka), (l = Wa), (Wa = ka = null), Yf(t), l)))
      )
        for (t = 0; t < l.length; t++) Yf(l[t]);
    }
  }
  function Ue(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var e = a[Ql] || null;
    if (e === null) return null;
    a = e[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((e = !e.disabled) ||
          ((l = l.type),
          (e = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !e));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function") throw Error(v(231, t, typeof a));
    return a;
  }
  var jt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    ui = !1;
  if (jt)
    try {
      var je = {};
      (Object.defineProperty(je, "passive", {
        get: function () {
          ui = !0;
        },
      }),
        window.addEventListener("test", je, je),
        window.removeEventListener("test", je, je));
    } catch {
      ui = !1;
    }
  var $t = null,
    ni = null,
    Uu = null;
  function Xf() {
    if (Uu) return Uu;
    var l,
      t = ni,
      a = t.length,
      e,
      u = "value" in $t ? $t.value : $t.textContent,
      n = u.length;
    for (l = 0; l < a && t[l] === u[l]; l++);
    var i = a - l;
    for (e = 1; e <= i && t[a - e] === u[n - e]; e++);
    return (Uu = u.slice(l, 1 < e ? 1 - e : void 0));
  }
  function ju(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Hu() {
    return !0;
  }
  function Qf() {
    return !1;
  }
  function Zl(l) {
    function t(a, e, u, n, i) {
      ((this._reactName = a),
        (this._targetInst = u),
        (this.type = e),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null));
      for (var c in l)
        l.hasOwnProperty(c) && ((a = l[c]), (this[c] = a ? a(n) : n[c]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Hu
          : Qf),
        (this.isPropagationStopped = Qf),
        this
      );
    }
    return (
      H(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Hu));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Hu));
        },
        persist: function () {},
        isPersistent: Hu,
      }),
      t
    );
  }
  var Aa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ru = Zl(Aa),
    He = H({}, Aa, { view: 0, detail: 0 }),
    Fo = Zl(He),
    ii,
    ci,
    Re,
    qu = H({}, He, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: si,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Re &&
              (Re && l.type === "mousemove"
                ? ((ii = l.screenX - Re.screenX), (ci = l.screenY - Re.screenY))
                : (ci = ii = 0),
              (Re = l)),
            ii);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : ci;
      },
    }),
    Zf = Zl(qu),
    $o = H({}, qu, { dataTransfer: 0 }),
    Io = Zl($o),
    Po = H({}, He, { relatedTarget: 0 }),
    fi = Zl(Po),
    lm = H({}, Aa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    tm = Zl(lm),
    am = H({}, Aa, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    em = Zl(am),
    um = H({}, Aa, { data: 0 }),
    Lf = Zl(um),
    nm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    im = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    cm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function fm(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = cm[l])
        ? !!t[l]
        : !1;
  }
  function si() {
    return fm;
  }
  var sm = H({}, He, {
      key: function (l) {
        if (l.key) {
          var t = nm[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = ju(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? im[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: si,
      charCode: function (l) {
        return l.type === "keypress" ? ju(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? ju(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    dm = Zl(sm),
    om = H({}, qu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Vf = Zl(om),
    mm = H({}, He, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: si,
    }),
    rm = Zl(mm),
    vm = H({}, Aa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    hm = Zl(vm),
    ym = H({}, qu, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    gm = Zl(ym),
    bm = H({}, Aa, { newState: 0, oldState: 0 }),
    Sm = Zl(bm),
    pm = [9, 13, 27, 32],
    di = jt && "CompositionEvent" in window,
    qe = null;
  jt && "documentMode" in document && (qe = document.documentMode);
  var zm = jt && "TextEvent" in window && !qe,
    Kf = jt && (!di || (qe && 8 < qe && 11 >= qe)),
    Jf = " ",
    wf = !1;
  function kf(l, t) {
    switch (l) {
      case "keyup":
        return pm.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Wf(l) {
    return (
      (l = l.detail),
      typeof l == "object" && "data" in l ? l.data : null
    );
  }
  var Fa = !1;
  function Tm(l, t) {
    switch (l) {
      case "compositionend":
        return Wf(t);
      case "keypress":
        return t.which !== 32 ? null : ((wf = !0), Jf);
      case "textInput":
        return ((l = t.data), l === Jf && wf ? null : l);
      default:
        return null;
    }
  }
  function Em(l, t) {
    if (Fa)
      return l === "compositionend" || (!di && kf(l, t))
        ? ((l = Xf()), (Uu = ni = $t = null), (Fa = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Kf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Am = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Ff(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Am[l.type] : t === "textarea";
  }
  function $f(l, t, a, e) {
    (ka ? (Wa ? Wa.push(e) : (Wa = [e])) : (ka = e),
      (t = xn(t, "onChange")),
      0 < t.length &&
        ((a = new Ru("onChange", "change", null, a, e)),
        l.push({ event: a, listeners: t })));
  }
  var Ce = null,
    Be = null;
  function xm(l) {
    H0(l, 0);
  }
  function Cu(l) {
    var t = De(l);
    if (jf(t)) return l;
  }
  function If(l, t) {
    if (l === "change") return t;
  }
  var Pf = !1;
  if (jt) {
    var oi;
    if (jt) {
      var mi = "oninput" in document;
      if (!mi) {
        var ls = document.createElement("div");
        (ls.setAttribute("oninput", "return;"),
          (mi = typeof ls.oninput == "function"));
      }
      oi = mi;
    } else oi = !1;
    Pf = oi && (!document.documentMode || 9 < document.documentMode);
  }
  function ts() {
    Ce && (Ce.detachEvent("onpropertychange", as), (Be = Ce = null));
  }
  function as(l) {
    if (l.propertyName === "value" && Cu(Be)) {
      var t = [];
      ($f(t, Be, l, ai(l)), Gf(xm, t));
    }
  }
  function _m(l, t, a) {
    l === "focusin"
      ? (ts(), (Ce = t), (Be = a), Ce.attachEvent("onpropertychange", as))
      : l === "focusout" && ts();
  }
  function Om(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Cu(Be);
  }
  function Mm(l, t) {
    if (l === "click") return Cu(t);
  }
  function Nm(l, t) {
    if (l === "input" || l === "change") return Cu(t);
  }
  function Dm(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var Pl = typeof Object.is == "function" ? Object.is : Dm;
  function Ye(l, t) {
    if (Pl(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(l),
      e = Object.keys(t);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Ln.call(t, u) || !Pl(l[u], t[u])) return !1;
    }
    return !0;
  }
  function es(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function us(l, t) {
    var a = es(l);
    l = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (((e = l + a.textContent.length), l <= t && e >= t))
          return { node: a, offset: t - l };
        l = e;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = es(a);
    }
  }
  function ns(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? ns(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function is(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = Nu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = Nu(l.document);
    }
    return t;
  }
  function ri(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var Um = jt && "documentMode" in document && 11 >= document.documentMode,
    $a = null,
    vi = null,
    Ge = null,
    hi = !1;
  function cs(l, t, a) {
    var e =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    hi ||
      $a == null ||
      $a !== Nu(e) ||
      ((e = $a),
      "selectionStart" in e && ri(e)
        ? (e = { start: e.selectionStart, end: e.selectionEnd })
        : ((e = (
            (e.ownerDocument && e.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (e = {
            anchorNode: e.anchorNode,
            anchorOffset: e.anchorOffset,
            focusNode: e.focusNode,
            focusOffset: e.focusOffset,
          })),
      (Ge && Ye(Ge, e)) ||
        ((Ge = e),
        (e = xn(vi, "onSelect")),
        0 < e.length &&
          ((t = new Ru("onSelect", "select", null, t, a)),
          l.push({ event: t, listeners: e }),
          (t.target = $a))));
  }
  function xa(l, t) {
    var a = {};
    return (
      (a[l.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + l] = "webkit" + t),
      (a["Moz" + l] = "moz" + t),
      a
    );
  }
  var Ia = {
      animationend: xa("Animation", "AnimationEnd"),
      animationiteration: xa("Animation", "AnimationIteration"),
      animationstart: xa("Animation", "AnimationStart"),
      transitionrun: xa("Transition", "TransitionRun"),
      transitionstart: xa("Transition", "TransitionStart"),
      transitioncancel: xa("Transition", "TransitionCancel"),
      transitionend: xa("Transition", "TransitionEnd"),
    },
    yi = {},
    fs = {};
  jt &&
    ((fs = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ia.animationend.animation,
      delete Ia.animationiteration.animation,
      delete Ia.animationstart.animation),
    "TransitionEvent" in window || delete Ia.transitionend.transition);
  function _a(l) {
    if (yi[l]) return yi[l];
    if (!Ia[l]) return l;
    var t = Ia[l],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in fs) return (yi[l] = t[a]);
    return l;
  }
  var ss = _a("animationend"),
    ds = _a("animationiteration"),
    os = _a("animationstart"),
    jm = _a("transitionrun"),
    Hm = _a("transitionstart"),
    Rm = _a("transitioncancel"),
    ms = _a("transitionend"),
    rs = new Map(),
    gi =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  gi.push("scrollEnd");
  function bt(l, t) {
    (rs.set(l, t), Ea(t, [l]));
  }
  var Bu =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    st = [],
    Pa = 0,
    bi = 0;
  function Yu() {
    for (var l = Pa, t = (bi = Pa = 0); t < l; ) {
      var a = st[t];
      st[t++] = null;
      var e = st[t];
      st[t++] = null;
      var u = st[t];
      st[t++] = null;
      var n = st[t];
      if (((st[t++] = null), e !== null && u !== null)) {
        var i = e.pending;
        (i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)),
          (e.pending = u));
      }
      n !== 0 && vs(a, u, n);
    }
  }
  function Gu(l, t, a, e) {
    ((st[Pa++] = l),
      (st[Pa++] = t),
      (st[Pa++] = a),
      (st[Pa++] = e),
      (bi |= e),
      (l.lanes |= e),
      (l = l.alternate),
      l !== null && (l.lanes |= e));
  }
  function Si(l, t, a, e) {
    return (Gu(l, t, a, e), Xu(l));
  }
  function Oa(l, t) {
    return (Gu(l, null, null, t), Xu(l));
  }
  function vs(l, t, a) {
    l.lanes |= a;
    var e = l.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = l.return; n !== null; )
      ((n.childLanes |= a),
        (e = n.alternate),
        e !== null && (e.childLanes |= a),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
        (l = n),
        (n = n.return));
    return l.tag === 3
      ? ((n = l.stateNode),
        u &&
          t !== null &&
          ((u = 31 - Il(a)),
          (l = n.hiddenUpdates),
          (e = l[u]),
          e === null ? (l[u] = [t]) : e.push(t),
          (t.lane = a | 536870912)),
        n)
      : null;
  }
  function Xu(l) {
    if (50 < cu) throw ((cu = 0), (Mc = null), Error(v(185)));
    for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var le = {};
  function qm(l, t, a, e) {
    ((this.tag = l),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = e),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function lt(l, t, a, e) {
    return new qm(l, t, a, e);
  }
  function pi(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function Ht(l, t) {
    var a = l.alternate;
    return (
      a === null
        ? ((a = lt(l.tag, t, l.key, l.mode)),
          (a.elementType = l.elementType),
          (a.type = l.type),
          (a.stateNode = l.stateNode),
          (a.alternate = l),
          (l.alternate = a))
        : ((a.pendingProps = t),
          (a.type = l.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = l.flags & 65011712),
      (a.childLanes = l.childLanes),
      (a.lanes = l.lanes),
      (a.child = l.child),
      (a.memoizedProps = l.memoizedProps),
      (a.memoizedState = l.memoizedState),
      (a.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = l.sibling),
      (a.index = l.index),
      (a.ref = l.ref),
      (a.refCleanup = l.refCleanup),
      a
    );
  }
  function hs(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return (
      a === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = a.childLanes),
          (l.lanes = a.lanes),
          (l.child = a.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = a.memoizedProps),
          (l.memoizedState = a.memoizedState),
          (l.updateQueue = a.updateQueue),
          (l.type = a.type),
          (t = a.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Qu(l, t, a, e, u, n) {
    var i = 0;
    if (((e = l), typeof l == "function")) pi(l) && (i = 1);
    else if (typeof l == "string")
      i = Xr(l, a, M.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (l) {
        case Tt:
          return (
            (l = lt(31, a, t, u)),
            (l.elementType = Tt),
            (l.lanes = n),
            l
          );
        case Rl:
          return Ma(a.children, u, n, t);
        case Mt:
          ((i = 8), (u |= 24));
          break;
        case Wl:
          return (
            (l = lt(12, a, t, u | 2)),
            (l.elementType = Wl),
            (l.lanes = n),
            l
          );
        case zt:
          return (
            (l = lt(13, a, t, u)),
            (l.elementType = zt),
            (l.lanes = n),
            l
          );
        case Yl:
          return (
            (l = lt(19, a, t, u)),
            (l.elementType = Yl),
            (l.lanes = n),
            l
          );
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ul:
                i = 10;
                break l;
              case kt:
                i = 9;
                break l;
              case it:
                i = 11;
                break l;
              case J:
                i = 14;
                break l;
              case Gl:
                ((i = 16), (e = null));
                break l;
            }
          ((i = 29),
            (a = Error(v(130, l === null ? "null" : typeof l, ""))),
            (e = null));
      }
    return (
      (t = lt(i, a, t, u)),
      (t.elementType = l),
      (t.type = e),
      (t.lanes = n),
      t
    );
  }
  function Ma(l, t, a, e) {
    return ((l = lt(7, l, e, t)), (l.lanes = a), l);
  }
  function zi(l, t, a) {
    return ((l = lt(6, l, null, t)), (l.lanes = a), l);
  }
  function ys(l) {
    var t = lt(18, null, null, 0);
    return ((t.stateNode = l), t);
  }
  function Ti(l, t, a) {
    return (
      (t = lt(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var gs = new WeakMap();
  function dt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = gs.get(l);
      return a !== void 0
        ? a
        : ((t = { value: l, source: t, stack: yf(t) }), gs.set(l, t), t);
    }
    return { value: l, source: t, stack: yf(t) };
  }
  var te = [],
    ae = 0,
    Zu = null,
    Xe = 0,
    ot = [],
    mt = 0,
    It = null,
    At = 1,
    xt = "";
  function Rt(l, t) {
    ((te[ae++] = Xe), (te[ae++] = Zu), (Zu = l), (Xe = t));
  }
  function bs(l, t, a) {
    ((ot[mt++] = At), (ot[mt++] = xt), (ot[mt++] = It), (It = l));
    var e = At;
    l = xt;
    var u = 32 - Il(e) - 1;
    ((e &= ~(1 << u)), (a += 1));
    var n = 32 - Il(t) + u;
    if (30 < n) {
      var i = u - (u % 5);
      ((n = (e & ((1 << i) - 1)).toString(32)),
        (e >>= i),
        (u -= i),
        (At = (1 << (32 - Il(t) + u)) | (a << u) | e),
        (xt = n + l));
    } else ((At = (1 << n) | (a << u) | e), (xt = l));
  }
  function Ei(l) {
    l.return !== null && (Rt(l, 1), bs(l, 1, 0));
  }
  function Ai(l) {
    for (; l === Zu; )
      ((Zu = te[--ae]), (te[ae] = null), (Xe = te[--ae]), (te[ae] = null));
    for (; l === It; )
      ((It = ot[--mt]),
        (ot[mt] = null),
        (xt = ot[--mt]),
        (ot[mt] = null),
        (At = ot[--mt]),
        (ot[mt] = null));
  }
  function Ss(l, t) {
    ((ot[mt++] = At),
      (ot[mt++] = xt),
      (ot[mt++] = It),
      (At = t.id),
      (xt = t.overflow),
      (It = l));
  }
  var Ol = null,
    sl = null,
    w = !1,
    Pt = null,
    rt = !1,
    xi = Error(v(519));
  function la(l) {
    var t = Error(
      v(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Qe(dt(t, l)), xi);
  }
  function ps(l) {
    var t = l.stateNode,
      a = l.type,
      e = l.memoizedProps;
    switch (((t[_l] = l), (t[Ql] = e), a)) {
      case "dialog":
        (Z("cancel", t), Z("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Z("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < su.length; a++) Z(su[a], t);
        break;
      case "source":
        Z("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Z("error", t), Z("load", t));
        break;
      case "details":
        Z("toggle", t);
        break;
      case "input":
        (Z("invalid", t),
          Hf(
            t,
            e.value,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name,
            !0,
          ));
        break;
      case "select":
        Z("invalid", t);
        break;
      case "textarea":
        (Z("invalid", t), qf(t, e.value, e.defaultValue, e.children));
    }
    ((a = e.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      e.suppressHydrationWarning === !0 ||
      B0(t.textContent, a)
        ? (e.popover != null && (Z("beforetoggle", t), Z("toggle", t)),
          e.onScroll != null && Z("scroll", t),
          e.onScrollEnd != null && Z("scrollend", t),
          e.onClick != null && (t.onclick = Ut),
          (t = !0))
        : (t = !1),
      t || la(l, !0));
  }
  function zs(l) {
    for (Ol = l.return; Ol; )
      switch (Ol.tag) {
        case 5:
        case 31:
        case 13:
          rt = !1;
          return;
        case 27:
        case 3:
          rt = !0;
          return;
        default:
          Ol = Ol.return;
      }
  }
  function ee(l) {
    if (l !== Ol) return !1;
    if (!w) return (zs(l), (w = !0), !1);
    var t = l.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = l.type),
          (a =
            !(a !== "form" && a !== "button") || Lc(l.type, l.memoizedProps))),
        (a = !a)),
      a && sl && la(l),
      zs(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(v(317));
      sl = J0(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(v(317));
      sl = J0(l);
    } else
      t === 27
        ? ((t = sl), va(l.type) ? ((l = kc), (kc = null), (sl = l)) : (sl = t))
        : (sl = Ol ? ht(l.stateNode.nextSibling) : null);
    return !0;
  }
  function Na() {
    ((sl = Ol = null), (w = !1));
  }
  function _i() {
    var l = Pt;
    return (
      l !== null &&
        (Jl === null ? (Jl = l) : Jl.push.apply(Jl, l), (Pt = null)),
      l
    );
  }
  function Qe(l) {
    Pt === null ? (Pt = [l]) : Pt.push(l);
  }
  var Oi = d(null),
    Da = null,
    qt = null;
  function ta(l, t, a) {
    (_(Oi, t._currentValue), (t._currentValue = a));
  }
  function Ct(l) {
    ((l._currentValue = Oi.current), T(Oi));
  }
  function Mi(l, t, a) {
    for (; l !== null; ) {
      var e = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), e !== null && (e.childLanes |= t))
          : e !== null && (e.childLanes & t) !== t && (e.childLanes |= t),
        l === a)
      )
        break;
      l = l.return;
    }
  }
  function Ni(l, t, a, e) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (c.context === t[f]) {
              ((n.lanes |= a),
                (c = n.alternate),
                c !== null && (c.lanes |= a),
                Mi(n.return, a, l),
                e || (i = null));
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(v(341));
        ((i.lanes |= a),
          (n = i.alternate),
          n !== null && (n.lanes |= a),
          Mi(i, a, l),
          (i = null));
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            ((u.return = i.return), (i = u));
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function ue(l, t, a, e) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(v(387));
        if (((i = i.memoizedProps), i !== null)) {
          var c = u.type;
          Pl(u.pendingProps.value, i.value) ||
            (l !== null ? l.push(c) : (l = [c]));
        }
      } else if (u === ll.current) {
        if (((i = u.alternate), i === null)) throw Error(v(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (l !== null ? l.push(vu) : (l = [vu]));
      }
      u = u.return;
    }
    (l !== null && Ni(t, l, a, e), (t.flags |= 262144));
  }
  function Lu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Pl(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function Ua(l) {
    ((Da = l),
      (qt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null));
  }
  function Ml(l) {
    return Ts(Da, l);
  }
  function Vu(l, t) {
    return (Da === null && Ua(l), Ts(l, t));
  }
  function Ts(l, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), qt === null)) {
      if (l === null) throw Error(v(308));
      ((qt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288));
    } else qt = qt.next = t;
    return a;
  }
  var Cm =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, e) {
                  l.push(e);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (a) {
                  return a();
                }));
            };
          },
    Bm = A.unstable_scheduleCallback,
    Ym = A.unstable_NormalPriority,
    Sl = {
      $$typeof: Ul,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Di() {
    return { controller: new Cm(), data: new Map(), refCount: 0 };
  }
  function Ze(l) {
    (l.refCount--,
      l.refCount === 0 &&
        Bm(Ym, function () {
          l.controller.abort();
        }));
  }
  var Le = null,
    Ui = 0,
    ne = 0,
    ie = null;
  function Gm(l, t) {
    if (Le === null) {
      var a = (Le = []);
      ((Ui = 0),
        (ne = Rc()),
        (ie = {
          status: "pending",
          value: void 0,
          then: function (e) {
            a.push(e);
          },
        }));
    }
    return (Ui++, t.then(Es, Es), t);
  }
  function Es() {
    if (--Ui === 0 && Le !== null) {
      ie !== null && (ie.status = "fulfilled");
      var l = Le;
      ((Le = null), (ne = 0), (ie = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Xm(l, t) {
    var a = [],
      e = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      l.then(
        function () {
          ((e.status = "fulfilled"), (e.value = t));
          for (var u = 0; u < a.length; u++) (0, a[u])(t);
        },
        function (u) {
          for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        },
      ),
      e
    );
  }
  var As = b.S;
  b.S = function (l, t) {
    ((c0 = Fl()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Gm(l, t),
      As !== null && As(l, t));
  };
  var ja = d(null);
  function ji() {
    var l = ja.current;
    return l !== null ? l : fl.pooledCache;
  }
  function Ku(l, t) {
    t === null ? _(ja, ja.current) : _(ja, t.pool);
  }
  function xs() {
    var l = ji();
    return l === null ? null : { parent: Sl._currentValue, pool: l };
  }
  var ce = Error(v(460)),
    Hi = Error(v(474)),
    Ju = Error(v(542)),
    wu = { then: function () {} };
  function _s(l) {
    return ((l = l.status), l === "fulfilled" || l === "rejected");
  }
  function Os(l, t, a) {
    switch (
      ((a = l[a]),
      a === void 0 ? l.push(t) : a !== t && (t.then(Ut, Ut), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), Ns(l), l);
      default:
        if (typeof t.status == "string") t.then(Ut, Ut);
        else {
          if (((l = fl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(v(482));
          ((l = t),
            (l.status = "pending"),
            l.then(
              function (e) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "fulfilled"), (u.value = e));
                }
              },
              function (e) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "rejected"), (u.reason = e));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), Ns(l), l);
        }
        throw ((Ra = t), ce);
    }
  }
  function Ha(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((Ra = a), ce)
        : a;
    }
  }
  var Ra = null;
  function Ms() {
    if (Ra === null) throw Error(v(459));
    var l = Ra;
    return ((Ra = null), l);
  }
  function Ns(l) {
    if (l === ce || l === Ju) throw Error(v(483));
  }
  var fe = null,
    Ve = 0;
  function ku(l) {
    var t = Ve;
    return ((Ve += 1), fe === null && (fe = []), Os(fe, l, t));
  }
  function Ke(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function Wu(l, t) {
    throw t.$$typeof === ol
      ? Error(v(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          v(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l,
          ),
        ));
  }
  function Ds(l) {
    function t(o, s) {
      if (l) {
        var m = o.deletions;
        m === null ? ((o.deletions = [s]), (o.flags |= 16)) : m.push(s);
      }
    }
    function a(o, s) {
      if (!l) return null;
      for (; s !== null; ) (t(o, s), (s = s.sibling));
      return null;
    }
    function e(o) {
      for (var s = new Map(); o !== null; )
        (o.key !== null ? s.set(o.key, o) : s.set(o.index, o), (o = o.sibling));
      return s;
    }
    function u(o, s) {
      return ((o = Ht(o, s)), (o.index = 0), (o.sibling = null), o);
    }
    function n(o, s, m) {
      return (
        (o.index = m),
        l
          ? ((m = o.alternate),
            m !== null
              ? ((m = m.index), m < s ? ((o.flags |= 67108866), s) : m)
              : ((o.flags |= 67108866), s))
          : ((o.flags |= 1048576), s)
      );
    }
    function i(o) {
      return (l && o.alternate === null && (o.flags |= 67108866), o);
    }
    function c(o, s, m, p) {
      return s === null || s.tag !== 6
        ? ((s = zi(m, o.mode, p)), (s.return = o), s)
        : ((s = u(s, m)), (s.return = o), s);
    }
    function f(o, s, m, p) {
      var D = m.type;
      return D === Rl
        ? g(o, s, m.props.children, p, m.key)
        : s !== null &&
            (s.elementType === D ||
              (typeof D == "object" &&
                D !== null &&
                D.$$typeof === Gl &&
                Ha(D) === s.type))
          ? ((s = u(s, m.props)), Ke(s, m), (s.return = o), s)
          : ((s = Qu(m.type, m.key, m.props, null, o.mode, p)),
            Ke(s, m),
            (s.return = o),
            s);
    }
    function r(o, s, m, p) {
      return s === null ||
        s.tag !== 4 ||
        s.stateNode.containerInfo !== m.containerInfo ||
        s.stateNode.implementation !== m.implementation
        ? ((s = Ti(m, o.mode, p)), (s.return = o), s)
        : ((s = u(s, m.children || [])), (s.return = o), s);
    }
    function g(o, s, m, p, D) {
      return s === null || s.tag !== 7
        ? ((s = Ma(m, o.mode, p, D)), (s.return = o), s)
        : ((s = u(s, m)), (s.return = o), s);
    }
    function z(o, s, m) {
      if (
        (typeof s == "string" && s !== "") ||
        typeof s == "number" ||
        typeof s == "bigint"
      )
        return ((s = zi("" + s, o.mode, m)), (s.return = o), s);
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case kl:
            return (
              (m = Qu(s.type, s.key, s.props, null, o.mode, m)),
              Ke(m, s),
              (m.return = o),
              m
            );
          case Bl:
            return ((s = Ti(s, o.mode, m)), (s.return = o), s);
          case Gl:
            return ((s = Ha(s)), z(o, s, m));
        }
        if (gt(s) || Xl(s))
          return ((s = Ma(s, o.mode, m, null)), (s.return = o), s);
        if (typeof s.then == "function") return z(o, ku(s), m);
        if (s.$$typeof === Ul) return z(o, Vu(o, s), m);
        Wu(o, s);
      }
      return null;
    }
    function h(o, s, m, p) {
      var D = s !== null ? s.key : null;
      if (
        (typeof m == "string" && m !== "") ||
        typeof m == "number" ||
        typeof m == "bigint"
      )
        return D !== null ? null : c(o, s, "" + m, p);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case kl:
            return m.key === D ? f(o, s, m, p) : null;
          case Bl:
            return m.key === D ? r(o, s, m, p) : null;
          case Gl:
            return ((m = Ha(m)), h(o, s, m, p));
        }
        if (gt(m) || Xl(m)) return D !== null ? null : g(o, s, m, p, null);
        if (typeof m.then == "function") return h(o, s, ku(m), p);
        if (m.$$typeof === Ul) return h(o, s, Vu(o, m), p);
        Wu(o, m);
      }
      return null;
    }
    function y(o, s, m, p, D) {
      if (
        (typeof p == "string" && p !== "") ||
        typeof p == "number" ||
        typeof p == "bigint"
      )
        return ((o = o.get(m) || null), c(s, o, "" + p, D));
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case kl:
            return (
              (o = o.get(p.key === null ? m : p.key) || null),
              f(s, o, p, D)
            );
          case Bl:
            return (
              (o = o.get(p.key === null ? m : p.key) || null),
              r(s, o, p, D)
            );
          case Gl:
            return ((p = Ha(p)), y(o, s, m, p, D));
        }
        if (gt(p) || Xl(p))
          return ((o = o.get(m) || null), g(s, o, p, D, null));
        if (typeof p.then == "function") return y(o, s, m, ku(p), D);
        if (p.$$typeof === Ul) return y(o, s, m, Vu(s, p), D);
        Wu(s, p);
      }
      return null;
    }
    function O(o, s, m, p) {
      for (
        var D = null, W = null, N = s, G = (s = 0), K = null;
        N !== null && G < m.length;
        G++
      ) {
        N.index > G ? ((K = N), (N = null)) : (K = N.sibling);
        var F = h(o, N, m[G], p);
        if (F === null) {
          N === null && (N = K);
          break;
        }
        (l && N && F.alternate === null && t(o, N),
          (s = n(F, s, G)),
          W === null ? (D = F) : (W.sibling = F),
          (W = F),
          (N = K));
      }
      if (G === m.length) return (a(o, N), w && Rt(o, G), D);
      if (N === null) {
        for (; G < m.length; G++)
          ((N = z(o, m[G], p)),
            N !== null &&
              ((s = n(N, s, G)),
              W === null ? (D = N) : (W.sibling = N),
              (W = N)));
        return (w && Rt(o, G), D);
      }
      for (N = e(N); G < m.length; G++)
        ((K = y(N, o, G, m[G], p)),
          K !== null &&
            (l && K.alternate !== null && N.delete(K.key === null ? G : K.key),
            (s = n(K, s, G)),
            W === null ? (D = K) : (W.sibling = K),
            (W = K)));
      return (
        l &&
          N.forEach(function (Sa) {
            return t(o, Sa);
          }),
        w && Rt(o, G),
        D
      );
    }
    function j(o, s, m, p) {
      if (m == null) throw Error(v(151));
      for (
        var D = null, W = null, N = s, G = (s = 0), K = null, F = m.next();
        N !== null && !F.done;
        G++, F = m.next()
      ) {
        N.index > G ? ((K = N), (N = null)) : (K = N.sibling);
        var Sa = h(o, N, F.value, p);
        if (Sa === null) {
          N === null && (N = K);
          break;
        }
        (l && N && Sa.alternate === null && t(o, N),
          (s = n(Sa, s, G)),
          W === null ? (D = Sa) : (W.sibling = Sa),
          (W = Sa),
          (N = K));
      }
      if (F.done) return (a(o, N), w && Rt(o, G), D);
      if (N === null) {
        for (; !F.done; G++, F = m.next())
          ((F = z(o, F.value, p)),
            F !== null &&
              ((s = n(F, s, G)),
              W === null ? (D = F) : (W.sibling = F),
              (W = F)));
        return (w && Rt(o, G), D);
      }
      for (N = e(N); !F.done; G++, F = m.next())
        ((F = y(N, o, G, F.value, p)),
          F !== null &&
            (l && F.alternate !== null && N.delete(F.key === null ? G : F.key),
            (s = n(F, s, G)),
            W === null ? (D = F) : (W.sibling = F),
            (W = F)));
      return (
        l &&
          N.forEach(function ($r) {
            return t(o, $r);
          }),
        w && Rt(o, G),
        D
      );
    }
    function il(o, s, m, p) {
      if (
        (typeof m == "object" &&
          m !== null &&
          m.type === Rl &&
          m.key === null &&
          (m = m.props.children),
        typeof m == "object" && m !== null)
      ) {
        switch (m.$$typeof) {
          case kl:
            l: {
              for (var D = m.key; s !== null; ) {
                if (s.key === D) {
                  if (((D = m.type), D === Rl)) {
                    if (s.tag === 7) {
                      (a(o, s.sibling),
                        (p = u(s, m.props.children)),
                        (p.return = o),
                        (o = p));
                      break l;
                    }
                  } else if (
                    s.elementType === D ||
                    (typeof D == "object" &&
                      D !== null &&
                      D.$$typeof === Gl &&
                      Ha(D) === s.type)
                  ) {
                    (a(o, s.sibling),
                      (p = u(s, m.props)),
                      Ke(p, m),
                      (p.return = o),
                      (o = p));
                    break l;
                  }
                  a(o, s);
                  break;
                } else t(o, s);
                s = s.sibling;
              }
              m.type === Rl
                ? ((p = Ma(m.props.children, o.mode, p, m.key)),
                  (p.return = o),
                  (o = p))
                : ((p = Qu(m.type, m.key, m.props, null, o.mode, p)),
                  Ke(p, m),
                  (p.return = o),
                  (o = p));
            }
            return i(o);
          case Bl:
            l: {
              for (D = m.key; s !== null; ) {
                if (s.key === D)
                  if (
                    s.tag === 4 &&
                    s.stateNode.containerInfo === m.containerInfo &&
                    s.stateNode.implementation === m.implementation
                  ) {
                    (a(o, s.sibling),
                      (p = u(s, m.children || [])),
                      (p.return = o),
                      (o = p));
                    break l;
                  } else {
                    a(o, s);
                    break;
                  }
                else t(o, s);
                s = s.sibling;
              }
              ((p = Ti(m, o.mode, p)), (p.return = o), (o = p));
            }
            return i(o);
          case Gl:
            return ((m = Ha(m)), il(o, s, m, p));
        }
        if (gt(m)) return O(o, s, m, p);
        if (Xl(m)) {
          if (((D = Xl(m)), typeof D != "function")) throw Error(v(150));
          return ((m = D.call(m)), j(o, s, m, p));
        }
        if (typeof m.then == "function") return il(o, s, ku(m), p);
        if (m.$$typeof === Ul) return il(o, s, Vu(o, m), p);
        Wu(o, m);
      }
      return (typeof m == "string" && m !== "") ||
        typeof m == "number" ||
        typeof m == "bigint"
        ? ((m = "" + m),
          s !== null && s.tag === 6
            ? (a(o, s.sibling), (p = u(s, m)), (p.return = o), (o = p))
            : (a(o, s), (p = zi(m, o.mode, p)), (p.return = o), (o = p)),
          i(o))
        : a(o, s);
    }
    return function (o, s, m, p) {
      try {
        Ve = 0;
        var D = il(o, s, m, p);
        return ((fe = null), D);
      } catch (N) {
        if (N === ce || N === Ju) throw N;
        var W = lt(29, N, null, o.mode);
        return ((W.lanes = p), (W.return = o), W);
      } finally {
      }
    };
  }
  var qa = Ds(!0),
    Us = Ds(!1),
    aa = !1;
  function Ri(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function qi(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function ea(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ua(l, t, a) {
    var e = l.updateQueue;
    if (e === null) return null;
    if (((e = e.shared), (I & 2) !== 0)) {
      var u = e.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (e.pending = t),
        (t = Xu(l)),
        vs(l, null, a),
        t
      );
    }
    return (Gu(l, e, t, a), Xu(l));
  }
  function Je(l, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var e = t.lanes;
      ((e &= l.pendingLanes), (a |= e), (t.lanes = a), Tf(l, a));
    }
  }
  function Ci(l, t) {
    var a = l.updateQueue,
      e = l.alternate;
    if (e !== null && ((e = e.updateQueue), a === e)) {
      var u = null,
        n = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var i = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          (n === null ? (u = n = i) : (n = n.next = i), (a = a.next));
        } while (a !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      ((a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks,
      }),
        (l.updateQueue = a));
      return;
    }
    ((l = a.lastBaseUpdate),
      l === null ? (a.firstBaseUpdate = t) : (l.next = t),
      (a.lastBaseUpdate = t));
  }
  var Bi = !1;
  function we() {
    if (Bi) {
      var l = ie;
      if (l !== null) throw l;
    }
  }
  function ke(l, t, a, e) {
    Bi = !1;
    var u = l.updateQueue;
    aa = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c,
        r = f.next;
      ((f.next = null), i === null ? (n = r) : (i.next = r), (i = f));
      var g = l.alternate;
      g !== null &&
        ((g = g.updateQueue),
        (c = g.lastBaseUpdate),
        c !== i &&
          (c === null ? (g.firstBaseUpdate = r) : (c.next = r),
          (g.lastBaseUpdate = f)));
    }
    if (n !== null) {
      var z = u.baseState;
      ((i = 0), (g = r = f = null), (c = n));
      do {
        var h = c.lane & -536870913,
          y = h !== c.lane;
        if (y ? (V & h) === h : (e & h) === h) {
          (h !== 0 && h === ne && (Bi = !0),
            g !== null &&
              (g = g.next =
                {
                  lane: 0,
                  tag: c.tag,
                  payload: c.payload,
                  callback: null,
                  next: null,
                }));
          l: {
            var O = l,
              j = c;
            h = t;
            var il = a;
            switch (j.tag) {
              case 1:
                if (((O = j.payload), typeof O == "function")) {
                  z = O.call(il, z, h);
                  break l;
                }
                z = O;
                break l;
              case 3:
                O.flags = (O.flags & -65537) | 128;
              case 0:
                if (
                  ((O = j.payload),
                  (h = typeof O == "function" ? O.call(il, z, h) : O),
                  h == null)
                )
                  break l;
                z = H({}, z, h);
                break l;
              case 2:
                aa = !0;
            }
          }
          ((h = c.callback),
            h !== null &&
              ((l.flags |= 64),
              y && (l.flags |= 8192),
              (y = u.callbacks),
              y === null ? (u.callbacks = [h]) : y.push(h)));
        } else
          ((y = {
            lane: h,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null,
          }),
            g === null ? ((r = g = y), (f = z)) : (g = g.next = y),
            (i |= h));
        if (((c = c.next), c === null)) {
          if (((c = u.shared.pending), c === null)) break;
          ((y = c),
            (c = y.next),
            (y.next = null),
            (u.lastBaseUpdate = y),
            (u.shared.pending = null));
        }
      } while (!0);
      (g === null && (f = z),
        (u.baseState = f),
        (u.firstBaseUpdate = r),
        (u.lastBaseUpdate = g),
        n === null && (u.shared.lanes = 0),
        (sa |= i),
        (l.lanes = i),
        (l.memoizedState = z));
    }
  }
  function js(l, t) {
    if (typeof l != "function") throw Error(v(191, l));
    l.call(t);
  }
  function Hs(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++) js(a[l], t);
  }
  var se = d(null),
    Fu = d(0);
  function Rs(l, t) {
    ((l = Kt), _(Fu, l), _(se, t), (Kt = l | t.baseLanes));
  }
  function Yi() {
    (_(Fu, Kt), _(se, se.current));
  }
  function Gi() {
    ((Kt = Fu.current), T(se), T(Fu));
  }
  var tt = d(null),
    vt = null;
  function na(l) {
    var t = l.alternate;
    (_(gl, gl.current & 1),
      _(tt, l),
      vt === null &&
        (t === null || se.current !== null || t.memoizedState !== null) &&
        (vt = l));
  }
  function Xi(l) {
    (_(gl, gl.current), _(tt, l), vt === null && (vt = l));
  }
  function qs(l) {
    l.tag === 22
      ? (_(gl, gl.current), _(tt, l), vt === null && (vt = l))
      : ia();
  }
  function ia() {
    (_(gl, gl.current), _(tt, tt.current));
  }
  function at(l) {
    (T(tt), vt === l && (vt = null), T(gl));
  }
  var gl = d(0);
  function $u(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Jc(a) || wc(a)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Bt = 0,
    B = null,
    ul = null,
    pl = null,
    Iu = !1,
    de = !1,
    Ca = !1,
    Pu = 0,
    We = 0,
    oe = null,
    Qm = 0;
  function rl() {
    throw Error(v(321));
  }
  function Qi(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!Pl(l[a], t[a])) return !1;
    return !0;
  }
  function Zi(l, t, a, e, u, n) {
    return (
      (Bt = n),
      (B = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (b.H = l === null || l.memoizedState === null ? bd : ec),
      (Ca = !1),
      (n = a(e, u)),
      (Ca = !1),
      de && (n = Bs(t, a, e, u)),
      Cs(l),
      n
    );
  }
  function Cs(l) {
    b.H = Ie;
    var t = ul !== null && ul.next !== null;
    if (((Bt = 0), (pl = ul = B = null), (Iu = !1), (We = 0), (oe = null), t))
      throw Error(v(300));
    l === null ||
      zl ||
      ((l = l.dependencies), l !== null && Lu(l) && (zl = !0));
  }
  function Bs(l, t, a, e) {
    B = l;
    var u = 0;
    do {
      if ((de && (oe = null), (We = 0), (de = !1), 25 <= u))
        throw Error(v(301));
      if (((u += 1), (pl = ul = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((b.H = Sd), (n = t(a, e)));
    } while (de);
    return n;
  }
  function Zm() {
    var l = b.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? Fe(t) : t),
      (l = l.useState()[0]),
      (ul !== null ? ul.memoizedState : null) !== l && (B.flags |= 1024),
      t
    );
  }
  function Li() {
    var l = Pu !== 0;
    return ((Pu = 0), l);
  }
  function Vi(l, t, a) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~a));
  }
  function Ki(l) {
    if (Iu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      Iu = !1;
    }
    ((Bt = 0), (pl = ul = B = null), (de = !1), (We = Pu = 0), (oe = null));
  }
  function Cl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (pl === null ? (B.memoizedState = pl = l) : (pl = pl.next = l), pl);
  }
  function bl() {
    if (ul === null) {
      var l = B.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = ul.next;
    var t = pl === null ? B.memoizedState : pl.next;
    if (t !== null) ((pl = t), (ul = l));
    else {
      if (l === null)
        throw B.alternate === null ? Error(v(467)) : Error(v(310));
      ((ul = l),
        (l = {
          memoizedState: ul.memoizedState,
          baseState: ul.baseState,
          baseQueue: ul.baseQueue,
          queue: ul.queue,
          next: null,
        }),
        pl === null ? (B.memoizedState = pl = l) : (pl = pl.next = l));
    }
    return pl;
  }
  function ln() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fe(l) {
    var t = We;
    return (
      (We += 1),
      oe === null && (oe = []),
      (l = Os(oe, l, t)),
      (t = B),
      (pl === null ? t.memoizedState : pl.next) === null &&
        ((t = t.alternate),
        (b.H = t === null || t.memoizedState === null ? bd : ec)),
      l
    );
  }
  function tn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Fe(l);
      if (l.$$typeof === Ul) return Ml(l);
    }
    throw Error(v(438, String(l)));
  }
  function Ji(l) {
    var t = null,
      a = B.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var e = B.alternate;
      e !== null &&
        ((e = e.updateQueue),
        e !== null &&
          ((e = e.memoCache),
          e != null &&
            (t = {
              data: e.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = ln()), (B.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(l), e = 0; e < l; e++) a[e] = Xa;
    return (t.index++, a);
  }
  function Yt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function an(l) {
    var t = bl();
    return wi(t, ul, l);
  }
  function wi(l, t, a) {
    var e = l.queue;
    if (e === null) throw Error(v(311));
    e.lastRenderedReducer = a;
    var u = l.baseQueue,
      n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        ((u.next = n.next), (n.next = i));
      }
      ((t.baseQueue = u = n), (e.pending = null));
    }
    if (((n = l.baseState), u === null)) l.memoizedState = n;
    else {
      t = u.next;
      var c = (i = null),
        f = null,
        r = t,
        g = !1;
      do {
        var z = r.lane & -536870913;
        if (z !== r.lane ? (V & z) === z : (Bt & z) === z) {
          var h = r.revertLane;
          if (h === 0)
            (f !== null &&
              (f = f.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: r.action,
                  hasEagerState: r.hasEagerState,
                  eagerState: r.eagerState,
                  next: null,
                }),
              z === ne && (g = !0));
          else if ((Bt & h) === h) {
            ((r = r.next), h === ne && (g = !0));
            continue;
          } else
            ((z = {
              lane: 0,
              revertLane: r.revertLane,
              gesture: null,
              action: r.action,
              hasEagerState: r.hasEagerState,
              eagerState: r.eagerState,
              next: null,
            }),
              f === null ? ((c = f = z), (i = n)) : (f = f.next = z),
              (B.lanes |= h),
              (sa |= h));
          ((z = r.action),
            Ca && a(n, z),
            (n = r.hasEagerState ? r.eagerState : a(n, z)));
        } else
          ((h = {
            lane: z,
            revertLane: r.revertLane,
            gesture: r.gesture,
            action: r.action,
            hasEagerState: r.hasEagerState,
            eagerState: r.eagerState,
            next: null,
          }),
            f === null ? ((c = f = h), (i = n)) : (f = f.next = h),
            (B.lanes |= z),
            (sa |= z));
        r = r.next;
      } while (r !== null && r !== t);
      if (
        (f === null ? (i = n) : (f.next = c),
        !Pl(n, l.memoizedState) && ((zl = !0), g && ((a = ie), a !== null)))
      )
        throw a;
      ((l.memoizedState = n),
        (l.baseState = i),
        (l.baseQueue = f),
        (e.lastRenderedState = n));
    }
    return (u === null && (e.lanes = 0), [l.memoizedState, e.dispatch]);
  }
  function ki(l) {
    var t = bl(),
      a = t.queue;
    if (a === null) throw Error(v(311));
    a.lastRenderedReducer = l;
    var e = a.dispatch,
      u = a.pending,
      n = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var i = (u = u.next);
      do ((n = l(n, i.action)), (i = i.next));
      while (i !== u);
      (Pl(n, t.memoizedState) || (zl = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (a.lastRenderedState = n));
    }
    return [n, e];
  }
  function Ys(l, t, a) {
    var e = B,
      u = bl(),
      n = w;
    if (n) {
      if (a === void 0) throw Error(v(407));
      a = a();
    } else a = t();
    var i = !Pl((ul || u).memoizedState, a);
    if (
      (i && ((u.memoizedState = a), (zl = !0)),
      (u = u.queue),
      $i(Qs.bind(null, e, u, l), [l]),
      u.getSnapshot !== t || i || (pl !== null && pl.memoizedState.tag & 1))
    ) {
      if (
        ((e.flags |= 2048),
        me(9, { destroy: void 0 }, Xs.bind(null, e, u, a, t), null),
        fl === null)
      )
        throw Error(v(349));
      n || (Bt & 127) !== 0 || Gs(e, t, a);
    }
    return a;
  }
  function Gs(l, t, a) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: a }),
      (t = B.updateQueue),
      t === null
        ? ((t = ln()), (B.updateQueue = t), (t.stores = [l]))
        : ((a = t.stores), a === null ? (t.stores = [l]) : a.push(l)));
  }
  function Xs(l, t, a, e) {
    ((t.value = a), (t.getSnapshot = e), Zs(t) && Ls(l));
  }
  function Qs(l, t, a) {
    return a(function () {
      Zs(t) && Ls(l);
    });
  }
  function Zs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !Pl(l, a);
    } catch {
      return !0;
    }
  }
  function Ls(l) {
    var t = Oa(l, 2);
    t !== null && wl(t, l, 2);
  }
  function Wi(l) {
    var t = Cl();
    if (typeof l == "function") {
      var a = l;
      if (((l = a()), Ca)) {
        Wt(!0);
        try {
          a();
        } finally {
          Wt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function Vs(l, t, a, e) {
    return ((l.baseState = a), wi(l, ul, typeof e == "function" ? e : Yt));
  }
  function Lm(l, t, a, e, u) {
    if (nn(l)) throw Error(v(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      (b.T !== null ? a(!0) : (n.isTransition = !1),
        e(n),
        (a = t.pending),
        a === null
          ? ((n.next = t.pending = n), Ks(t, n))
          : ((n.next = a.next), (t.pending = a.next = n)));
    }
  }
  function Ks(l, t) {
    var a = t.action,
      e = t.payload,
      u = l.state;
    if (t.isTransition) {
      var n = b.T,
        i = {};
      b.T = i;
      try {
        var c = a(u, e),
          f = b.S;
        (f !== null && f(i, c), Js(l, t, c));
      } catch (r) {
        Fi(l, t, r);
      } finally {
        (n !== null && i.types !== null && (n.types = i.types), (b.T = n));
      }
    } else
      try {
        ((n = a(u, e)), Js(l, t, n));
      } catch (r) {
        Fi(l, t, r);
      }
  }
  function Js(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (e) {
            ws(l, t, e);
          },
          function (e) {
            return Fi(l, t, e);
          },
        )
      : ws(l, t, a);
  }
  function ws(l, t, a) {
    ((t.status = "fulfilled"),
      (t.value = a),
      ks(t),
      (l.state = a),
      (t = l.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (l.pending = null) : ((a = a.next), (t.next = a), Ks(l, a))));
  }
  function Fi(l, t, a) {
    var e = l.pending;
    if (((l.pending = null), e !== null)) {
      e = e.next;
      do ((t.status = "rejected"), (t.reason = a), ks(t), (t = t.next));
      while (t !== e);
    }
    l.action = null;
  }
  function ks(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Ws(l, t) {
    return t;
  }
  function Fs(l, t) {
    if (w) {
      var a = fl.formState;
      if (a !== null) {
        l: {
          var e = B;
          if (w) {
            if (sl) {
              t: {
                for (var u = sl, n = rt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = ht(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((n = u.data), (u = n === "F!" || n === "F" ? u : null));
              }
              if (u) {
                ((sl = ht(u.nextSibling)), (e = u.data === "F!"));
                break l;
              }
            }
            la(e);
          }
          e = !1;
        }
        e && (t = a[0]);
      }
    }
    return (
      (a = Cl()),
      (a.memoizedState = a.baseState = t),
      (e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ws,
        lastRenderedState: t,
      }),
      (a.queue = e),
      (a = hd.bind(null, B, e)),
      (e.dispatch = a),
      (e = Wi(!1)),
      (n = ac.bind(null, B, !1, e.queue)),
      (e = Cl()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (e.queue = u),
      (a = Lm.bind(null, B, u, n, a)),
      (u.dispatch = a),
      (e.memoizedState = l),
      [t, a, !1]
    );
  }
  function $s(l) {
    var t = bl();
    return Is(t, ul, l);
  }
  function Is(l, t, a) {
    if (
      ((t = wi(l, t, Ws)[0]),
      (l = an(Yt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var e = Fe(t);
      } catch (i) {
        throw i === ce ? Ju : i;
      }
    else e = t;
    t = bl();
    var u = t.queue,
      n = u.dispatch;
    return (
      a !== t.memoizedState &&
        ((B.flags |= 2048),
        me(9, { destroy: void 0 }, Vm.bind(null, u, a), null)),
      [e, n, l]
    );
  }
  function Vm(l, t) {
    l.action = t;
  }
  function Ps(l) {
    var t = bl(),
      a = ul;
    if (a !== null) return Is(t, a, l);
    (bl(), (t = t.memoizedState), (a = bl()));
    var e = a.queue.dispatch;
    return ((a.memoizedState = l), [t, e, !1]);
  }
  function me(l, t, a, e) {
    return (
      (l = { tag: l, create: a, deps: e, inst: t, next: null }),
      (t = B.updateQueue),
      t === null && ((t = ln()), (B.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = l.next = l)
        : ((e = a.next), (a.next = l), (l.next = e), (t.lastEffect = l)),
      l
    );
  }
  function ld() {
    return bl().memoizedState;
  }
  function en(l, t, a, e) {
    var u = Cl();
    ((B.flags |= l),
      (u.memoizedState = me(
        1 | t,
        { destroy: void 0 },
        a,
        e === void 0 ? null : e,
      )));
  }
  function un(l, t, a, e) {
    var u = bl();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    ul !== null && e !== null && Qi(e, ul.memoizedState.deps)
      ? (u.memoizedState = me(t, n, a, e))
      : ((B.flags |= l), (u.memoizedState = me(1 | t, n, a, e)));
  }
  function td(l, t) {
    en(8390656, 8, l, t);
  }
  function $i(l, t) {
    un(2048, 8, l, t);
  }
  function Km(l) {
    B.flags |= 4;
    var t = B.updateQueue;
    if (t === null) ((t = ln()), (B.updateQueue = t), (t.events = [l]));
    else {
      var a = t.events;
      a === null ? (t.events = [l]) : a.push(l);
    }
  }
  function ad(l) {
    var t = bl().memoizedState;
    return (
      Km({ ref: t, nextImpl: l }),
      function () {
        if ((I & 2) !== 0) throw Error(v(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function ed(l, t) {
    return un(4, 2, l, t);
  }
  function ud(l, t) {
    return un(4, 4, l, t);
  }
  function nd(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function id(l, t, a) {
    ((a = a != null ? a.concat([l]) : null), un(4, 4, nd.bind(null, t, l), a));
  }
  function Ii() {}
  function cd(l, t) {
    var a = bl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    return t !== null && Qi(t, e[1]) ? e[0] : ((a.memoizedState = [l, t]), l);
  }
  function fd(l, t) {
    var a = bl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    if (t !== null && Qi(t, e[1])) return e[0];
    if (((e = l()), Ca)) {
      Wt(!0);
      try {
        l();
      } finally {
        Wt(!1);
      }
    }
    return ((a.memoizedState = [e, t]), e);
  }
  function Pi(l, t, a) {
    return a === void 0 || ((Bt & 1073741824) !== 0 && (V & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = a), (l = s0()), (B.lanes |= l), (sa |= l), a);
  }
  function sd(l, t, a, e) {
    return Pl(a, t)
      ? a
      : se.current !== null
        ? ((l = Pi(l, a, e)), Pl(l, t) || (zl = !0), l)
        : (Bt & 42) === 0 || ((Bt & 1073741824) !== 0 && (V & 261930) === 0)
          ? ((zl = !0), (l.memoizedState = a))
          : ((l = s0()), (B.lanes |= l), (sa |= l), t);
  }
  function dd(l, t, a, e, u) {
    var n = x.p;
    x.p = n !== 0 && 8 > n ? n : 8;
    var i = b.T,
      c = {};
    ((b.T = c), ac(l, !1, t, a));
    try {
      var f = u(),
        r = b.S;
      if (
        (r !== null && r(c, f),
        f !== null && typeof f == "object" && typeof f.then == "function")
      ) {
        var g = Xm(f, e);
        $e(l, t, g, nt(l));
      } else $e(l, t, e, nt(l));
    } catch (z) {
      $e(l, t, { then: function () {}, status: "rejected", reason: z }, nt());
    } finally {
      ((x.p = n),
        i !== null && c.types !== null && (i.types = c.types),
        (b.T = i));
    }
  }
  function Jm() {}
  function lc(l, t, a, e) {
    if (l.tag !== 5) throw Error(v(476));
    var u = od(l).queue;
    dd(
      l,
      u,
      t,
      R,
      a === null
        ? Jm
        : function () {
            return (md(l), a(e));
          },
    );
  }
  function od(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: R,
      baseState: R,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yt,
        lastRenderedState: R,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Yt,
          lastRenderedState: a,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function md(l) {
    var t = od(l);
    (t.next === null && (t = l.alternate.memoizedState),
      $e(l, t.next.queue, {}, nt()));
  }
  function tc() {
    return Ml(vu);
  }
  function rd() {
    return bl().memoizedState;
  }
  function vd() {
    return bl().memoizedState;
  }
  function wm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = nt();
          l = ea(a);
          var e = ua(t, l, a);
          (e !== null && (wl(e, t, a), Je(e, t, a)),
            (t = { cache: Di() }),
            (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function km(l, t, a) {
    var e = nt();
    ((a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      nn(l)
        ? yd(t, a)
        : ((a = Si(l, t, a, e)), a !== null && (wl(a, l, e), gd(a, t, e))));
  }
  function hd(l, t, a) {
    var e = nt();
    $e(l, t, a, e);
  }
  function $e(l, t, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (nn(l)) yd(t, u);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var i = t.lastRenderedState,
            c = n(i, a);
          if (((u.hasEagerState = !0), (u.eagerState = c), Pl(c, i)))
            return (Gu(l, t, u, 0), fl === null && Yu(), !1);
        } catch {
        } finally {
        }
      if (((a = Si(l, t, u, e)), a !== null))
        return (wl(a, l, e), gd(a, t, e), !0);
    }
    return !1;
  }
  function ac(l, t, a, e) {
    if (
      ((e = {
        lane: 2,
        revertLane: Rc(),
        gesture: null,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      nn(l))
    ) {
      if (t) throw Error(v(479));
    } else ((t = Si(l, a, e, 2)), t !== null && wl(t, l, 2));
  }
  function nn(l) {
    var t = l.alternate;
    return l === B || (t !== null && t === B);
  }
  function yd(l, t) {
    de = Iu = !0;
    var a = l.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (l.pending = t));
  }
  function gd(l, t, a) {
    if ((a & 4194048) !== 0) {
      var e = t.lanes;
      ((e &= l.pendingLanes), (a |= e), (t.lanes = a), Tf(l, a));
    }
  }
  var Ie = {
    readContext: Ml,
    use: tn,
    useCallback: rl,
    useContext: rl,
    useEffect: rl,
    useImperativeHandle: rl,
    useLayoutEffect: rl,
    useInsertionEffect: rl,
    useMemo: rl,
    useReducer: rl,
    useRef: rl,
    useState: rl,
    useDebugValue: rl,
    useDeferredValue: rl,
    useTransition: rl,
    useSyncExternalStore: rl,
    useId: rl,
    useHostTransitionStatus: rl,
    useFormState: rl,
    useActionState: rl,
    useOptimistic: rl,
    useMemoCache: rl,
    useCacheRefresh: rl,
  };
  Ie.useEffectEvent = rl;
  var bd = {
      readContext: Ml,
      use: tn,
      useCallback: function (l, t) {
        return ((Cl().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: Ml,
      useEffect: td,
      useImperativeHandle: function (l, t, a) {
        ((a = a != null ? a.concat([l]) : null),
          en(4194308, 4, nd.bind(null, t, l), a));
      },
      useLayoutEffect: function (l, t) {
        return en(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        en(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var a = Cl();
        t = t === void 0 ? null : t;
        var e = l();
        if (Ca) {
          Wt(!0);
          try {
            l();
          } finally {
            Wt(!1);
          }
        }
        return ((a.memoizedState = [e, t]), e);
      },
      useReducer: function (l, t, a) {
        var e = Cl();
        if (a !== void 0) {
          var u = a(t);
          if (Ca) {
            Wt(!0);
            try {
              a(t);
            } finally {
              Wt(!1);
            }
          }
        } else u = t;
        return (
          (e.memoizedState = e.baseState = u),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: u,
          }),
          (e.queue = l),
          (l = l.dispatch = km.bind(null, B, l)),
          [e.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = Cl();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = Wi(l);
        var t = l.queue,
          a = hd.bind(null, B, t);
        return ((t.dispatch = a), [l.memoizedState, a]);
      },
      useDebugValue: Ii,
      useDeferredValue: function (l, t) {
        var a = Cl();
        return Pi(a, l, t);
      },
      useTransition: function () {
        var l = Wi(!1);
        return (
          (l = dd.bind(null, B, l.queue, !0, !1)),
          (Cl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, a) {
        var e = B,
          u = Cl();
        if (w) {
          if (a === void 0) throw Error(v(407));
          a = a();
        } else {
          if (((a = t()), fl === null)) throw Error(v(349));
          (V & 127) !== 0 || Gs(e, t, a);
        }
        u.memoizedState = a;
        var n = { value: a, getSnapshot: t };
        return (
          (u.queue = n),
          td(Qs.bind(null, e, n, l), [l]),
          (e.flags |= 2048),
          me(9, { destroy: void 0 }, Xs.bind(null, e, n, a, t), null),
          a
        );
      },
      useId: function () {
        var l = Cl(),
          t = fl.identifierPrefix;
        if (w) {
          var a = xt,
            e = At;
          ((a = (e & ~(1 << (32 - Il(e) - 1))).toString(32) + a),
            (t = "_" + t + "R_" + a),
            (a = Pu++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "_"));
        } else ((a = Qm++), (t = "_" + t + "r_" + a.toString(32) + "_"));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: tc,
      useFormState: Fs,
      useActionState: Fs,
      useOptimistic: function (l) {
        var t = Cl();
        t.memoizedState = t.baseState = l;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = ac.bind(null, B, !0, a)),
          (a.dispatch = t),
          [l, t]
        );
      },
      useMemoCache: Ji,
      useCacheRefresh: function () {
        return (Cl().memoizedState = wm.bind(null, B));
      },
      useEffectEvent: function (l) {
        var t = Cl(),
          a = { impl: l };
        return (
          (t.memoizedState = a),
          function () {
            if ((I & 2) !== 0) throw Error(v(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ec = {
      readContext: Ml,
      use: tn,
      useCallback: cd,
      useContext: Ml,
      useEffect: $i,
      useImperativeHandle: id,
      useInsertionEffect: ed,
      useLayoutEffect: ud,
      useMemo: fd,
      useReducer: an,
      useRef: ld,
      useState: function () {
        return an(Yt);
      },
      useDebugValue: Ii,
      useDeferredValue: function (l, t) {
        var a = bl();
        return sd(a, ul.memoizedState, l, t);
      },
      useTransition: function () {
        var l = an(Yt)[0],
          t = bl().memoizedState;
        return [typeof l == "boolean" ? l : Fe(l), t];
      },
      useSyncExternalStore: Ys,
      useId: rd,
      useHostTransitionStatus: tc,
      useFormState: $s,
      useActionState: $s,
      useOptimistic: function (l, t) {
        var a = bl();
        return Vs(a, ul, l, t);
      },
      useMemoCache: Ji,
      useCacheRefresh: vd,
    };
  ec.useEffectEvent = ad;
  var Sd = {
    readContext: Ml,
    use: tn,
    useCallback: cd,
    useContext: Ml,
    useEffect: $i,
    useImperativeHandle: id,
    useInsertionEffect: ed,
    useLayoutEffect: ud,
    useMemo: fd,
    useReducer: ki,
    useRef: ld,
    useState: function () {
      return ki(Yt);
    },
    useDebugValue: Ii,
    useDeferredValue: function (l, t) {
      var a = bl();
      return ul === null ? Pi(a, l, t) : sd(a, ul.memoizedState, l, t);
    },
    useTransition: function () {
      var l = ki(Yt)[0],
        t = bl().memoizedState;
      return [typeof l == "boolean" ? l : Fe(l), t];
    },
    useSyncExternalStore: Ys,
    useId: rd,
    useHostTransitionStatus: tc,
    useFormState: Ps,
    useActionState: Ps,
    useOptimistic: function (l, t) {
      var a = bl();
      return ul !== null
        ? Vs(a, ul, l, t)
        : ((a.baseState = l), [l, a.queue.dispatch]);
    },
    useMemoCache: Ji,
    useCacheRefresh: vd,
  };
  Sd.useEffectEvent = ad;
  function uc(l, t, a, e) {
    ((t = l.memoizedState),
      (a = a(e, t)),
      (a = a == null ? t : H({}, t, a)),
      (l.memoizedState = a),
      l.lanes === 0 && (l.updateQueue.baseState = a));
  }
  var nc = {
    enqueueSetState: function (l, t, a) {
      l = l._reactInternals;
      var e = nt(),
        u = ea(e);
      ((u.payload = t),
        a != null && (u.callback = a),
        (t = ua(l, u, e)),
        t !== null && (wl(t, l, e), Je(t, l, e)));
    },
    enqueueReplaceState: function (l, t, a) {
      l = l._reactInternals;
      var e = nt(),
        u = ea(e);
      ((u.tag = 1),
        (u.payload = t),
        a != null && (u.callback = a),
        (t = ua(l, u, e)),
        t !== null && (wl(t, l, e), Je(t, l, e)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var a = nt(),
        e = ea(a);
      ((e.tag = 2),
        t != null && (e.callback = t),
        (t = ua(l, e, a)),
        t !== null && (wl(t, l, a), Je(t, l, a)));
    },
  };
  function pd(l, t, a, e, u, n, i) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(e, n, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ye(a, e) || !Ye(u, n)
          : !0
    );
  }
  function zd(l, t, a, e) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, e),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, e),
      t.state !== l && nc.enqueueReplaceState(t, t.state, null));
  }
  function Ba(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var e in t) e !== "ref" && (a[e] = t[e]);
    }
    if ((l = l.defaultProps)) {
      a === t && (a = H({}, a));
      for (var u in l) a[u] === void 0 && (a[u] = l[u]);
    }
    return a;
  }
  function Td(l) {
    Bu(l);
  }
  function Ed(l) {
    console.error(l);
  }
  function Ad(l) {
    Bu(l);
  }
  function cn(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function xd(l, t, a) {
    try {
      var e = l.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function ic(l, t, a) {
    return (
      (a = ea(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        cn(l, t);
      }),
      a
    );
  }
  function _d(l) {
    return ((l = ea(l)), (l.tag = 3), l);
  }
  function Od(l, t, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      ((l.payload = function () {
        return u(n);
      }),
        (l.callback = function () {
          xd(t, a, e);
        }));
    }
    var i = a.stateNode;
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (l.callback = function () {
        (xd(t, a, e),
          typeof u != "function" &&
            (da === null ? (da = new Set([this])) : da.add(this)));
        var c = e.stack;
        this.componentDidCatch(e.value, {
          componentStack: c !== null ? c : "",
        });
      });
  }
  function Wm(l, t, a, e, u) {
    if (
      ((a.flags |= 32768),
      e !== null && typeof e == "object" && typeof e.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && ue(t, a, u, !0),
        (a = tt.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              vt === null ? Sn() : a.alternate === null && vl === 0 && (vl = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              e === wu
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([e])) : t.add(e),
                  Uc(l, e, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              e === wu
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([e]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([e])) : a.add(e)),
                  Uc(l, e, u)),
              !1
            );
        }
        throw Error(v(435, a.tag));
      }
      return (Uc(l, e, u), Sn(), !1);
    }
    if (w)
      return (
        (t = tt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            e !== xi && ((l = Error(v(422), { cause: e })), Qe(dt(l, a))))
          : (e !== xi && ((t = Error(v(423), { cause: e })), Qe(dt(t, a))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (e = dt(e, a)),
            (u = ic(l.stateNode, e, u)),
            Ci(l, u),
            vl !== 4 && (vl = 2)),
        !1
      );
    var n = Error(v(520), { cause: e });
    if (
      ((n = dt(n, a)),
      iu === null ? (iu = [n]) : iu.push(n),
      vl !== 4 && (vl = 2),
      t === null)
    )
      return !0;
    ((e = dt(e, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (l = u & -u),
            (a.lanes |= l),
            (l = ic(a.stateNode, e, l)),
            Ci(a, l),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (n = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (da === null || !da.has(n)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = _d(u)),
              Od(u, l, a, e),
              Ci(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var cc = Error(v(461)),
    zl = !1;
  function Nl(l, t, a, e) {
    t.child = l === null ? Us(t, null, a, e) : qa(t, l.child, a, e);
  }
  function Md(l, t, a, e, u) {
    a = a.render;
    var n = t.ref;
    if ("ref" in e) {
      var i = {};
      for (var c in e) c !== "ref" && (i[c] = e[c]);
    } else i = e;
    return (
      Ua(t),
      (e = Zi(l, t, a, i, n, u)),
      (c = Li()),
      l !== null && !zl
        ? (Vi(l, t, u), Gt(l, t, u))
        : (w && c && Ei(t), (t.flags |= 1), Nl(l, t, e, u), t.child)
    );
  }
  function Nd(l, t, a, e, u) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" &&
        !pi(n) &&
        n.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = n), Dd(l, t, n, e, u))
        : ((l = Qu(a.type, null, e, t, t.mode, u)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !hc(l, u))) {
      var i = n.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Ye), a(i, e) && l.ref === t.ref)
      )
        return Gt(l, t, u);
    }
    return (
      (t.flags |= 1),
      (l = Ht(n, e)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function Dd(l, t, a, e, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ye(n, e) && l.ref === t.ref)
        if (((zl = !1), (t.pendingProps = e = n), hc(l, u)))
          (l.flags & 131072) !== 0 && (zl = !0);
        else return ((t.lanes = l.lanes), Gt(l, t, u));
    }
    return fc(l, t, a, e, u);
  }
  function Ud(l, t, a, e) {
    var u = e.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | a : a), l !== null)) {
          for (e = t.child = l.child, u = 0; e !== null; )
            ((u = u | e.lanes | e.childLanes), (e = e.sibling));
          e = u & ~n;
        } else ((e = 0), (t.child = null));
        return jd(l, t, n, a, e);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && Ku(t, n !== null ? n.cachePool : null),
          n !== null ? Rs(t, n) : Yi(),
          qs(t));
      else
        return (
          (e = t.lanes = 536870912),
          jd(l, t, n !== null ? n.baseLanes | a : a, a, e)
        );
    } else
      n !== null
        ? (Ku(t, n.cachePool), Rs(t, n), ia(), (t.memoizedState = null))
        : (l !== null && Ku(t, null), Yi(), ia());
    return (Nl(l, t, u, a), t.child);
  }
  function Pe(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function jd(l, t, a, e, u) {
    var n = ji();
    return (
      (n = n === null ? null : { parent: Sl._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: a, cachePool: n }),
      l !== null && Ku(t, null),
      Yi(),
      qs(t),
      l !== null && ue(l, t, e, !0),
      (t.childLanes = u),
      null
    );
  }
  function fn(l, t) {
    return (
      (t = dn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function Hd(l, t, a) {
    return (
      qa(t, l.child, null, a),
      (l = fn(t, t.pendingProps)),
      (l.flags |= 2),
      at(t),
      (t.memoizedState = null),
      l
    );
  }
  function Fm(l, t, a) {
    var e = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (w) {
        if (e.mode === "hidden")
          return ((l = fn(t, e)), (t.lanes = 536870912), Pe(null, l));
        if (
          (Xi(t),
          (l = sl)
            ? ((l = K0(l, rt)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: It !== null ? { id: At, overflow: xt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = ys(l)),
                (a.return = t),
                (t.child = a),
                (Ol = t),
                (sl = null)))
            : (l = null),
          l === null)
        )
          throw la(t);
        return ((t.lanes = 536870912), null);
      }
      return fn(t, e);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ((Xi(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = Hd(l, t, a)));
        else if (t.memoizedState !== null)
          ((t.child = l.child), (t.flags |= 128), (t = null));
        else throw Error(v(558));
      else if (
        (zl || ue(l, t, a, !1), (u = (a & l.childLanes) !== 0), zl || u)
      ) {
        if (
          ((e = fl),
          e !== null && ((i = Ef(e, a)), i !== 0 && i !== n.retryLane))
        )
          throw ((n.retryLane = i), Oa(l, i), wl(e, l, i), cc);
        (Sn(), (t = Hd(l, t, a)));
      } else
        ((l = n.treeContext),
          (sl = ht(i.nextSibling)),
          (Ol = t),
          (w = !0),
          (Pt = null),
          (rt = !1),
          l !== null && Ss(t, l),
          (t = fn(t, e)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (l = Ht(l.child, { mode: e.mode, children: e.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function sn(l, t) {
    var a = t.ref;
    if (a === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(v(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function fc(l, t, a, e, u) {
    return (
      Ua(t),
      (a = Zi(l, t, a, e, void 0, u)),
      (e = Li()),
      l !== null && !zl
        ? (Vi(l, t, u), Gt(l, t, u))
        : (w && e && Ei(t), (t.flags |= 1), Nl(l, t, a, u), t.child)
    );
  }
  function Rd(l, t, a, e, u, n) {
    return (
      Ua(t),
      (t.updateQueue = null),
      (a = Bs(t, e, a, u)),
      Cs(l),
      (e = Li()),
      l !== null && !zl
        ? (Vi(l, t, n), Gt(l, t, n))
        : (w && e && Ei(t), (t.flags |= 1), Nl(l, t, a, n), t.child)
    );
  }
  function qd(l, t, a, e, u) {
    if ((Ua(t), t.stateNode === null)) {
      var n = le,
        i = a.contextType;
      (typeof i == "object" && i !== null && (n = Ml(i)),
        (n = new a(e, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = nc),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = e),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Ri(t),
        (i = a.contextType),
        (n.context = typeof i == "object" && i !== null ? Ml(i) : le),
        (n.state = t.memoizedState),
        (i = a.getDerivedStateFromProps),
        typeof i == "function" && (uc(t, a, i, e), (n.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((i = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          i !== n.state && nc.enqueueReplaceState(n, n.state, null),
          ke(t, e, n, u),
          we(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (e = !0));
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps,
        f = Ba(a, c);
      n.props = f;
      var r = n.context,
        g = a.contextType;
      ((i = le), typeof g == "object" && g !== null && (i = Ml(g)));
      var z = a.getDerivedStateFromProps;
      ((g =
        typeof z == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (c = t.pendingProps !== c),
        g ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c || r !== i) && zd(t, n, e, i)),
        (aa = !1));
      var h = t.memoizedState;
      ((n.state = h),
        ke(t, e, n, u),
        we(),
        (r = t.memoizedState),
        c || h !== r || aa
          ? (typeof z == "function" && (uc(t, a, z, e), (r = t.memoizedState)),
            (f = aa || pd(t, a, f, e, h, r, i))
              ? (g ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = e),
                (t.memoizedState = r)),
            (n.props = e),
            (n.state = r),
            (n.context = i),
            (e = f))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (e = !1)));
    } else {
      ((n = t.stateNode),
        qi(l, t),
        (i = t.memoizedProps),
        (g = Ba(a, i)),
        (n.props = g),
        (z = t.pendingProps),
        (h = n.context),
        (r = a.contextType),
        (f = le),
        typeof r == "object" && r !== null && (f = Ml(r)),
        (c = a.getDerivedStateFromProps),
        (r =
          typeof c == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i !== z || h !== f) && zd(t, n, e, f)),
        (aa = !1),
        (h = t.memoizedState),
        (n.state = h),
        ke(t, e, n, u),
        we());
      var y = t.memoizedState;
      i !== z ||
      h !== y ||
      aa ||
      (l !== null && l.dependencies !== null && Lu(l.dependencies))
        ? (typeof c == "function" && (uc(t, a, c, e), (y = t.memoizedState)),
          (g =
            aa ||
            pd(t, a, g, e, h, y, f) ||
            (l !== null && l.dependencies !== null && Lu(l.dependencies)))
            ? (r ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(e, y, f),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(e, y, f)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (i === l.memoizedProps && h === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (i === l.memoizedProps && h === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = e),
              (t.memoizedState = y)),
          (n.props = e),
          (n.state = y),
          (n.context = f),
          (e = g))
        : (typeof n.componentDidUpdate != "function" ||
            (i === l.memoizedProps && h === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (i === l.memoizedProps && h === l.memoizedState) ||
            (t.flags |= 1024),
          (e = !1));
    }
    return (
      (n = e),
      sn(l, t),
      (e = (t.flags & 128) !== 0),
      n || e
        ? ((n = t.stateNode),
          (a =
            e && typeof a.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && e
            ? ((t.child = qa(t, l.child, null, u)),
              (t.child = qa(t, null, a, u)))
            : Nl(l, t, a, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Gt(l, t, u)),
      l
    );
  }
  function Cd(l, t, a, e) {
    return (Na(), (t.flags |= 256), Nl(l, t, a, e), t.child);
  }
  var sc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function dc(l) {
    return { baseLanes: l, cachePool: xs() };
  }
  function oc(l, t, a) {
    return ((l = l !== null ? l.childLanes & ~a : 0), t && (l |= ut), l);
  }
  function Bd(l, t, a) {
    var e = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      i;
    if (
      ((i = n) ||
        (i =
          l !== null && l.memoizedState === null ? !1 : (gl.current & 2) !== 0),
      i && ((u = !0), (t.flags &= -129)),
      (i = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (w) {
        if (
          (u ? na(t) : ia(),
          (l = sl)
            ? ((l = K0(l, rt)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: It !== null ? { id: At, overflow: xt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = ys(l)),
                (a.return = t),
                (t.child = a),
                (Ol = t),
                (sl = null)))
            : (l = null),
          l === null)
        )
          throw la(t);
        return (wc(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var c = e.children;
      return (
        (e = e.fallback),
        u
          ? (ia(),
            (u = t.mode),
            (c = dn({ mode: "hidden", children: c }, u)),
            (e = Ma(e, u, a, null)),
            (c.return = t),
            (e.return = t),
            (c.sibling = e),
            (t.child = c),
            (e = t.child),
            (e.memoizedState = dc(a)),
            (e.childLanes = oc(l, i, a)),
            (t.memoizedState = sc),
            Pe(null, e))
          : (na(t), mc(t, c))
      );
    }
    var f = l.memoizedState;
    if (f !== null && ((c = f.dehydrated), c !== null)) {
      if (n)
        t.flags & 256
          ? (na(t), (t.flags &= -257), (t = rc(l, t, a)))
          : t.memoizedState !== null
            ? (ia(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (ia(),
              (c = e.fallback),
              (u = t.mode),
              (e = dn({ mode: "visible", children: e.children }, u)),
              (c = Ma(c, u, a, null)),
              (c.flags |= 2),
              (e.return = t),
              (c.return = t),
              (e.sibling = c),
              (t.child = e),
              qa(t, l.child, null, a),
              (e = t.child),
              (e.memoizedState = dc(a)),
              (e.childLanes = oc(l, i, a)),
              (t.memoizedState = sc),
              (t = Pe(null, e)));
      else if ((na(t), wc(c))) {
        if (((i = c.nextSibling && c.nextSibling.dataset), i)) var r = i.dgst;
        ((i = r),
          (e = Error(v(419))),
          (e.stack = ""),
          (e.digest = i),
          Qe({ value: e, source: null, stack: null }),
          (t = rc(l, t, a)));
      } else if (
        (zl || ue(l, t, a, !1), (i = (a & l.childLanes) !== 0), zl || i)
      ) {
        if (
          ((i = fl),
          i !== null && ((e = Ef(i, a)), e !== 0 && e !== f.retryLane))
        )
          throw ((f.retryLane = e), Oa(l, e), wl(i, l, e), cc);
        (Jc(c) || Sn(), (t = rc(l, t, a)));
      } else
        Jc(c)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (sl = ht(c.nextSibling)),
            (Ol = t),
            (w = !0),
            (Pt = null),
            (rt = !1),
            l !== null && Ss(t, l),
            (t = mc(t, e.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (ia(),
        (c = e.fallback),
        (u = t.mode),
        (f = l.child),
        (r = f.sibling),
        (e = Ht(f, { mode: "hidden", children: e.children })),
        (e.subtreeFlags = f.subtreeFlags & 65011712),
        r !== null ? (c = Ht(r, c)) : ((c = Ma(c, u, a, null)), (c.flags |= 2)),
        (c.return = t),
        (e.return = t),
        (e.sibling = c),
        (t.child = e),
        Pe(null, e),
        (e = t.child),
        (c = l.child.memoizedState),
        c === null
          ? (c = dc(a))
          : ((u = c.cachePool),
            u !== null
              ? ((f = Sl._currentValue),
                (u = u.parent !== f ? { parent: f, pool: f } : u))
              : (u = xs()),
            (c = { baseLanes: c.baseLanes | a, cachePool: u })),
        (e.memoizedState = c),
        (e.childLanes = oc(l, i, a)),
        (t.memoizedState = sc),
        Pe(l.child, e))
      : (na(t),
        (a = l.child),
        (l = a.sibling),
        (a = Ht(a, { mode: "visible", children: e.children })),
        (a.return = t),
        (a.sibling = null),
        l !== null &&
          ((i = t.deletions),
          i === null ? ((t.deletions = [l]), (t.flags |= 16)) : i.push(l)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function mc(l, t) {
    return (
      (t = dn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function dn(l, t) {
    return ((l = lt(22, l, null, t)), (l.lanes = 0), l);
  }
  function rc(l, t, a) {
    return (
      qa(t, l.child, null, a),
      (l = mc(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function Yd(l, t, a) {
    l.lanes |= t;
    var e = l.alternate;
    (e !== null && (e.lanes |= t), Mi(l.return, t, a));
  }
  function vc(l, t, a, e, u, n) {
    var i = l.memoizedState;
    i === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: e,
          tail: a,
          tailMode: u,
          treeForkCount: n,
        })
      : ((i.isBackwards = t),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = e),
        (i.tail = a),
        (i.tailMode = u),
        (i.treeForkCount = n));
  }
  function Gd(l, t, a) {
    var e = t.pendingProps,
      u = e.revealOrder,
      n = e.tail;
    e = e.children;
    var i = gl.current,
      c = (i & 2) !== 0;
    if (
      (c ? ((i = (i & 1) | 2), (t.flags |= 128)) : (i &= 1),
      _(gl, i),
      Nl(l, t, e, a),
      (e = w ? Xe : 0),
      !c && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Yd(l, a, t);
        else if (l.tag === 19) Yd(l, a, t);
        else if (l.child !== null) {
          ((l.child.return = l), (l = l.child));
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    switch (u) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          ((l = a.alternate),
            l !== null && $u(l) === null && (u = a),
            (a = a.sibling));
        ((a = u),
          a === null
            ? ((u = t.child), (t.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          vc(t, !1, u, a, n, e));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (((l = u.alternate), l !== null && $u(l) === null)) {
            t.child = u;
            break;
          }
          ((l = u.sibling), (u.sibling = a), (a = u), (u = l));
        }
        vc(t, !0, a, null, n, e);
        break;
      case "together":
        vc(t, !1, null, null, void 0, e);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Gt(l, t, a) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (sa |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((ue(l, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(v(153));
    if (t.child !== null) {
      for (
        l = t.child, a = Ht(l, l.pendingProps), t.child = a, a.return = t;
        l.sibling !== null;
      )
        ((l = l.sibling),
          (a = a.sibling = Ht(l, l.pendingProps)),
          (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function hc(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Lu(l)));
  }
  function $m(l, t, a) {
    switch (t.tag) {
      case 3:
        (ql(t, t.stateNode.containerInfo),
          ta(t, Sl, l.memoizedState.cache),
          Na());
        break;
      case 27:
      case 5:
        xe(t);
        break;
      case 4:
        ql(t, t.stateNode.containerInfo);
        break;
      case 10:
        ta(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Xi(t), null);
        break;
      case 13:
        var e = t.memoizedState;
        if (e !== null)
          return e.dehydrated !== null
            ? (na(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Bd(l, t, a)
              : (na(t), (l = Gt(l, t, a)), l !== null ? l.sibling : null);
        na(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (
          ((e = (a & t.childLanes) !== 0),
          e || (ue(l, t, a, !1), (e = (a & t.childLanes) !== 0)),
          u)
        ) {
          if (e) return Gd(l, t, a);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          _(gl, gl.current),
          e)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Ud(l, t, a, t.pendingProps));
      case 24:
        ta(t, Sl, l.memoizedState.cache);
    }
    return Gt(l, t, a);
  }
  function Xd(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) zl = !0;
      else {
        if (!hc(l, a) && (t.flags & 128) === 0) return ((zl = !1), $m(l, t, a));
        zl = (l.flags & 131072) !== 0;
      }
    else ((zl = !1), w && (t.flags & 1048576) !== 0 && bs(t, Xe, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var e = t.pendingProps;
          if (((l = Ha(t.elementType)), (t.type = l), typeof l == "function"))
            pi(l)
              ? ((e = Ba(l, e)), (t.tag = 1), (t = qd(null, t, l, e, a)))
              : ((t.tag = 0), (t = fc(null, t, l, e, a)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === it) {
                ((t.tag = 11), (t = Md(null, t, l, e, a)));
                break l;
              } else if (u === J) {
                ((t.tag = 14), (t = Nd(null, t, l, e, a)));
                break l;
              }
            }
            throw ((t = Nt(l) || l), Error(v(306, t, "")));
          }
        }
        return t;
      case 0:
        return fc(l, t, t.type, t.pendingProps, a);
      case 1:
        return ((e = t.type), (u = Ba(e, t.pendingProps)), qd(l, t, e, u, a));
      case 3:
        l: {
          if ((ql(t, t.stateNode.containerInfo), l === null))
            throw Error(v(387));
          e = t.pendingProps;
          var n = t.memoizedState;
          ((u = n.element), qi(l, t), ke(t, e, null, a));
          var i = t.memoizedState;
          if (
            ((e = i.cache),
            ta(t, Sl, e),
            e !== n.cache && Ni(t, [Sl], a, !0),
            we(),
            (e = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: e, isDehydrated: !1, cache: i.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = Cd(l, t, e, a);
              break l;
            } else if (e !== u) {
              ((u = dt(Error(v(424)), t)), Qe(u), (t = Cd(l, t, e, a)));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (
                sl = ht(l.firstChild),
                  Ol = t,
                  w = !0,
                  Pt = null,
                  rt = !0,
                  a = Us(t, null, e, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Na(), e === u)) {
              t = Gt(l, t, a);
              break l;
            }
            Nl(l, t, e, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          sn(l, t),
          l === null
            ? (a = $0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : w ||
                ((a = t.type),
                (l = t.pendingProps),
                (e = _n(X.current).createElement(a)),
                (e[_l] = t),
                (e[Ql] = l),
                Dl(e, a, l),
                Al(e),
                (t.stateNode = e))
            : (t.memoizedState = $0(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState,
              )),
          null
        );
      case 27:
        return (
          xe(t),
          l === null &&
            w &&
            ((e = t.stateNode = k0(t.type, t.pendingProps, X.current)),
            (Ol = t),
            (rt = !0),
            (u = sl),
            va(t.type) ? ((kc = u), (sl = ht(e.firstChild))) : (sl = u)),
          Nl(l, t, t.pendingProps.children, a),
          sn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            w &&
            ((u = e = sl) &&
              ((e = Or(e, t.type, t.pendingProps, rt)),
              e !== null
                ? ((t.stateNode = e),
                  (Ol = t),
                  (sl = ht(e.firstChild)),
                  (rt = !1),
                  (u = !0))
                : (u = !1)),
            u || la(t)),
          xe(t),
          (u = t.type),
          (n = t.pendingProps),
          (i = l !== null ? l.memoizedProps : null),
          (e = n.children),
          Lc(u, n) ? (e = null) : i !== null && Lc(u, i) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = Zi(l, t, Zm, null, null, a)), (vu._currentValue = u)),
          sn(l, t),
          Nl(l, t, e, a),
          t.child
        );
      case 6:
        return (
          l === null &&
            w &&
            ((l = a = sl) &&
              ((a = Mr(a, t.pendingProps, rt)),
              a !== null
                ? ((t.stateNode = a), (Ol = t), (sl = null), (l = !0))
                : (l = !1)),
            l || la(t)),
          null
        );
      case 13:
        return Bd(l, t, a);
      case 4:
        return (
          ql(t, t.stateNode.containerInfo),
          (e = t.pendingProps),
          l === null ? (t.child = qa(t, null, e, a)) : Nl(l, t, e, a),
          t.child
        );
      case 11:
        return Md(l, t, t.type, t.pendingProps, a);
      case 7:
        return (Nl(l, t, t.pendingProps, a), t.child);
      case 8:
        return (Nl(l, t, t.pendingProps.children, a), t.child);
      case 12:
        return (Nl(l, t, t.pendingProps.children, a), t.child);
      case 10:
        return (
          (e = t.pendingProps),
          ta(t, t.type, e.value),
          Nl(l, t, e.children, a),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (e = t.pendingProps.children),
          Ua(t),
          (u = Ml(u)),
          (e = e(u)),
          (t.flags |= 1),
          Nl(l, t, e, a),
          t.child
        );
      case 14:
        return Nd(l, t, t.type, t.pendingProps, a);
      case 15:
        return Dd(l, t, t.type, t.pendingProps, a);
      case 19:
        return Gd(l, t, a);
      case 31:
        return Fm(l, t, a);
      case 22:
        return Ud(l, t, a, t.pendingProps);
      case 24:
        return (
          Ua(t),
          (e = Ml(Sl)),
          l === null
            ? ((u = ji()),
              u === null &&
                ((u = fl),
                (n = Di()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= a),
                (u = n)),
              (t.memoizedState = { parent: e, cache: u }),
              Ri(t),
              ta(t, Sl, u))
            : ((l.lanes & a) !== 0 && (qi(l, t), ke(t, null, null, a), we()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== e
                ? ((u = { parent: e, cache: e }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  ta(t, Sl, e))
                : ((e = n.cache),
                  ta(t, Sl, e),
                  e !== u.cache && Ni(t, [Sl], a, !0))),
          Nl(l, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(v(156, t.tag));
  }
  function Xt(l) {
    l.flags |= 4;
  }
  function yc(l, t, a, e, u) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (u & 335544128) === u))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (r0()) l.flags |= 8192;
        else throw ((Ra = wu), Hi);
    } else l.flags &= -16777217;
  }
  function Qd(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !ao(t)))
      if (r0()) l.flags |= 8192;
      else throw ((Ra = wu), Hi);
  }
  function on(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? pf() : 536870912), (l.lanes |= t), (ye |= t)));
  }
  function lu(l, t) {
    if (!w)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (l.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = l.tail;
          for (var e = null; a !== null; )
            (a.alternate !== null && (e = a), (a = a.sibling));
          e === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (e.sibling = null);
      }
  }
  function dl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      a = 0,
      e = 0;
    if (t)
      for (var u = l.child; u !== null; )
        ((a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags & 65011712),
          (e |= u.flags & 65011712),
          (u.return = l),
          (u = u.sibling));
    else
      for (u = l.child; u !== null; )
        ((a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags),
          (e |= u.flags),
          (u.return = l),
          (u = u.sibling));
    return ((l.subtreeFlags |= e), (l.childLanes = a), t);
  }
  function Im(l, t, a) {
    var e = t.pendingProps;
    switch ((Ai(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (dl(t), null);
      case 1:
        return (dl(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Ct(Sl),
          yl(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (l === null || l.child === null) &&
            (ee(t)
              ? Xt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), _i())),
          dl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Xt(t),
              n !== null ? (dl(t), Qd(t, n)) : (dl(t), yc(t, u, null, e, a)))
            : n
              ? n !== l.memoizedState
                ? (Xt(t), dl(t), Qd(t, n))
                : (dl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== e && Xt(t),
                dl(t),
                yc(t, u, l, e, a)),
          null
        );
      case 27:
        if (
          (zu(t),
          (a = X.current),
          (u = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== e && Xt(t);
        else {
          if (!e) {
            if (t.stateNode === null) throw Error(v(166));
            return (dl(t), null);
          }
          ((l = M.current),
            ee(t) ? ps(t) : ((l = k0(u, e, a)), (t.stateNode = l), Xt(t)));
        }
        return (dl(t), null);
      case 5:
        if ((zu(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== e && Xt(t);
        else {
          if (!e) {
            if (t.stateNode === null) throw Error(v(166));
            return (dl(t), null);
          }
          if (((n = M.current), ee(t))) ps(t);
          else {
            var i = _n(X.current);
            switch (n) {
              case 1:
                n = i.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u,
                    );
                    break;
                  case "script":
                    ((n = i.createElement("div")),
                      (n.innerHTML = "<script><\/script>"),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case "select":
                    ((n =
                      typeof e.is == "string"
                        ? i.createElement("select", { is: e.is })
                        : i.createElement("select")),
                      e.multiple
                        ? (n.multiple = !0)
                        : e.size && (n.size = e.size));
                    break;
                  default:
                    n =
                      typeof e.is == "string"
                        ? i.createElement(u, { is: e.is })
                        : i.createElement(u);
                }
            }
            ((n[_l] = t), (n[Ql] = e));
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                ((i.child.return = i), (i = i.child));
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t) break l;
                i = i.return;
              }
              ((i.sibling.return = i.return), (i = i.sibling));
            }
            t.stateNode = n;
            l: switch ((Dl(n, u, e), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break l;
              case "img":
                e = !0;
                break l;
              default:
                e = !1;
            }
            e && Xt(t);
          }
        }
        return (
          dl(t),
          yc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, a),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== e && Xt(t);
        else {
          if (typeof e != "string" && t.stateNode === null) throw Error(v(166));
          if (((l = X.current), ee(t))) {
            if (
              ((l = t.stateNode),
              (a = t.memoizedProps),
              (e = null),
              (u = Ol),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            ((l[_l] = t),
              (l = !!(
                l.nodeValue === a ||
                (e !== null && e.suppressHydrationWarning === !0) ||
                B0(l.nodeValue, a)
              )),
              l || la(t, !0));
          } else
            ((l = _n(l).createTextNode(e)), (l[_l] = t), (t.stateNode = l));
        }
        return (dl(t), null);
      case 31:
        if (((a = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((e = ee(t)), a !== null)) {
            if (l === null) {
              if (!e) throw Error(v(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(v(557));
              l[_l] = t;
            } else
              (Na(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (dl(t), (l = !1));
          } else
            ((a = _i()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = a),
              (l = !0));
          if (!l) return t.flags & 256 ? (at(t), t) : (at(t), null);
          if ((t.flags & 128) !== 0) throw Error(v(558));
        }
        return (dl(t), null);
      case 13:
        if (
          ((e = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((u = ee(t)), e !== null && e.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(v(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(v(317));
              u[_l] = t;
            } else
              (Na(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (dl(t), (u = !1));
          } else
            ((u = _i()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return t.flags & 256 ? (at(t), t) : (at(t), null);
        }
        return (
          at(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = e !== null),
              (l = l !== null && l.memoizedState !== null),
              a &&
                ((e = t.child),
                (u = null),
                e.alternate !== null &&
                  e.alternate.memoizedState !== null &&
                  e.alternate.memoizedState.cachePool !== null &&
                  (u = e.alternate.memoizedState.cachePool.pool),
                (n = null),
                e.memoizedState !== null &&
                  e.memoizedState.cachePool !== null &&
                  (n = e.memoizedState.cachePool.pool),
                n !== u && (e.flags |= 2048)),
              a !== l && a && (t.child.flags |= 8192),
              on(t, t.updateQueue),
              dl(t),
              null)
        );
      case 4:
        return (yl(), l === null && Yc(t.stateNode.containerInfo), dl(t), null);
      case 10:
        return (Ct(t.type), dl(t), null);
      case 19:
        if ((T(gl), (e = t.memoizedState), e === null)) return (dl(t), null);
        if (((u = (t.flags & 128) !== 0), (n = e.rendering), n === null))
          if (u) lu(e, !1);
          else {
            if (vl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = $u(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      lu(e, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      on(t, l),
                      t.subtreeFlags = 0,
                      l = a,
                      a = t.child;
                    a !== null;
                  )
                    (hs(a, l), (a = a.sibling));
                  return (
                    _(gl, (gl.current & 1) | 2),
                    w && Rt(t, e.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            e.tail !== null &&
              Fl() > yn &&
              ((t.flags |= 128), (u = !0), lu(e, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((l = $u(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                on(t, l),
                lu(e, !0),
                e.tail === null &&
                  e.tailMode === "hidden" &&
                  !n.alternate &&
                  !w)
              )
                return (dl(t), null);
            } else
              2 * Fl() - e.renderingStartTime > yn &&
                a !== 536870912 &&
                ((t.flags |= 128), (u = !0), lu(e, !1), (t.lanes = 4194304));
          e.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = e.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (e.last = n));
        }
        return e.tail !== null
          ? ((l = e.tail),
            (e.rendering = l),
            (e.tail = l.sibling),
            (e.renderingStartTime = Fl()),
            (l.sibling = null),
            (a = gl.current),
            _(gl, u ? (a & 1) | 2 : a & 1),
            w && Rt(t, e.treeForkCount),
            l)
          : (dl(t), null);
      case 22:
      case 23:
        return (
          at(t),
          Gi(),
          (e = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== e && (t.flags |= 8192)
            : e && (t.flags |= 8192),
          e
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (dl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : dl(t),
          (a = t.updateQueue),
          a !== null && on(t, a.retryQueue),
          (a = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (a = l.memoizedState.cachePool.pool),
          (e = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (e = t.memoizedState.cachePool.pool),
          e !== a && (t.flags |= 2048),
          l !== null && T(ja),
          null
        );
      case 24:
        return (
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Ct(Sl),
          dl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(v(156, t.tag));
  }
  function Pm(l, t) {
    switch ((Ai(t), t.tag)) {
      case 1:
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Ct(Sl),
          yl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (zu(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((at(t), t.alternate === null)) throw Error(v(340));
          Na();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (at(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(v(340));
          Na();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return (T(gl), null);
      case 4:
        return (yl(), null);
      case 10:
        return (Ct(t.type), null);
      case 22:
      case 23:
        return (
          at(t),
          Gi(),
          l !== null && T(ja),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (Ct(Sl), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zd(l, t) {
    switch ((Ai(t), t.tag)) {
      case 3:
        (Ct(Sl), yl());
        break;
      case 26:
      case 27:
      case 5:
        zu(t);
        break;
      case 4:
        yl();
        break;
      case 31:
        t.memoizedState !== null && at(t);
        break;
      case 13:
        at(t);
        break;
      case 19:
        T(gl);
        break;
      case 10:
        Ct(t.type);
        break;
      case 22:
      case 23:
        (at(t), Gi(), l !== null && T(ja));
        break;
      case 24:
        Ct(Sl);
    }
  }
  function tu(l, t) {
    try {
      var a = t.updateQueue,
        e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            e = void 0;
            var n = a.create,
              i = a.inst;
            ((e = n()), (i.destroy = e));
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (c) {
      al(t, t.return, c);
    }
  }
  function ca(l, t, a) {
    try {
      var e = t.updateQueue,
        u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            var i = e.inst,
              c = i.destroy;
            if (c !== void 0) {
              ((i.destroy = void 0), (u = t));
              var f = a,
                r = c;
              try {
                r();
              } catch (g) {
                al(u, f, g);
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (g) {
      al(t, t.return, g);
    }
  }
  function Ld(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        Hs(t, a);
      } catch (e) {
        al(l, l.return, e);
      }
    }
  }
  function Vd(l, t, a) {
    ((a.props = Ba(l.type, l.memoizedProps)), (a.state = l.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (e) {
      al(l, t, e);
    }
  }
  function au(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var e = l.stateNode;
            break;
          case 30:
            e = l.stateNode;
            break;
          default:
            e = l.stateNode;
        }
        typeof a == "function" ? (l.refCleanup = a(e)) : (a.current = e);
      }
    } catch (u) {
      al(l, t, u);
    }
  }
  function _t(l, t) {
    var a = l.ref,
      e = l.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          al(l, t, u);
        } finally {
          ((l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null));
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          al(l, t, u);
        }
      else a.current = null;
  }
  function Kd(l) {
    var t = l.type,
      a = l.memoizedProps,
      e = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break l;
        case "img":
          a.src ? (e.src = a.src) : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      al(l, l.return, u);
    }
  }
  function gc(l, t, a) {
    try {
      var e = l.stateNode;
      (zr(e, l.type, a, t), (e[Ql] = t));
    } catch (u) {
      al(l, l.return, u);
    }
  }
  function Jd(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && va(l.type)) ||
      l.tag === 4
    );
  }
  function bc(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || Jd(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;
      ) {
        if (
          (l.tag === 27 && va(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Sc(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      ((l = l.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a
            ).insertBefore(l, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                  ? a.ownerDocument.body
                  : a),
            t.appendChild(l),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = Ut)));
    else if (
      e !== 4 &&
      (e === 27 && va(l.type) && ((a = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (Sc(l, t, a), l = l.sibling; l !== null; )
        (Sc(l, t, a), (l = l.sibling));
  }
  function mn(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      ((l = l.stateNode), t ? a.insertBefore(l, t) : a.appendChild(l));
    else if (
      e !== 4 &&
      (e === 27 && va(l.type) && (a = l.stateNode), (l = l.child), l !== null)
    )
      for (mn(l, t, a), l = l.sibling; l !== null; )
        (mn(l, t, a), (l = l.sibling));
  }
  function wd(l) {
    var t = l.stateNode,
      a = l.memoizedProps;
    try {
      for (var e = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      (Dl(t, e, a), (t[_l] = l), (t[Ql] = a));
    } catch (n) {
      al(l, l.return, n);
    }
  }
  var Qt = !1,
    Tl = !1,
    pc = !1,
    kd = typeof WeakSet == "function" ? WeakSet : Set,
    xl = null;
  function lr(l, t) {
    if (((l = l.containerInfo), (Qc = Hn), (l = is(l)), ri(l))) {
      if ("selectionStart" in l)
        var a = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          a = ((a = l.ownerDocument) && a.defaultView) || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset,
              n = e.focusNode;
            e = e.focusOffset;
            try {
              (a.nodeType, n.nodeType);
            } catch {
              a = null;
              break l;
            }
            var i = 0,
              c = -1,
              f = -1,
              r = 0,
              g = 0,
              z = l,
              h = null;
            t: for (;;) {
              for (
                var y;
                z !== a || (u !== 0 && z.nodeType !== 3) || (c = i + u),
                  z !== n || (e !== 0 && z.nodeType !== 3) || (f = i + e),
                  z.nodeType === 3 && (i += z.nodeValue.length),
                  (y = z.firstChild) !== null;
              )
                ((h = z), (z = y));
              for (;;) {
                if (z === l) break t;
                if (
                  (h === a && ++r === u && (c = i),
                  h === n && ++g === e && (f = i),
                  (y = z.nextSibling) !== null)
                )
                  break;
                ((z = h), (h = z.parentNode));
              }
              z = y;
            }
            a = c === -1 || f === -1 ? null : { start: c, end: f };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Zc = { focusedElem: l, selectionRange: a }, Hn = !1, xl = t;
      xl !== null;
    )
      if (
        ((t = xl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        ((l.return = t), (xl = l));
      else
        for (; xl !== null; ) {
          switch (((t = xl), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue),
                (l = l !== null ? l.events : null),
                l !== null)
              )
                for (a = 0; a < l.length; a++)
                  ((u = l[a]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                ((l = void 0),
                  (a = t),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (e = a.stateNode));
                try {
                  var O = Ba(a.type, u);
                  ((l = e.getSnapshotBeforeUpdate(O, n)),
                    (e.__reactInternalSnapshotBeforeUpdate = l));
                } catch (j) {
                  al(a, a.return, j);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (a = l.nodeType), a === 9)
                )
                  Kc(l);
                else if (a === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Kc(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(v(163));
          }
          if (((l = t.sibling), l !== null)) {
            ((l.return = t.return), (xl = l));
            break;
          }
          xl = t.return;
        }
  }
  function Wd(l, t, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Lt(l, a), e & 4 && tu(5, a));
        break;
      case 1:
        if ((Lt(l, a), e & 4))
          if (((l = a.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (i) {
              al(a, a.return, i);
            }
          else {
            var u = Ba(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              al(a, a.return, i);
            }
          }
        (e & 64 && Ld(a), e & 512 && au(a, a.return));
        break;
      case 3:
        if ((Lt(l, a), e & 64 && ((l = a.updateQueue), l !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Hs(l, t);
          } catch (i) {
            al(a, a.return, i);
          }
        }
        break;
      case 27:
        t === null && e & 4 && wd(a);
      case 26:
      case 5:
        (Lt(l, a), t === null && e & 4 && Kd(a), e & 512 && au(a, a.return));
        break;
      case 12:
        Lt(l, a);
        break;
      case 31:
        (Lt(l, a), e & 4 && Id(l, a));
        break;
      case 13:
        (Lt(l, a),
          e & 4 && Pd(l, a),
          e & 64 &&
            ((l = a.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((a = sr.bind(null, a)), Nr(l, a)))));
        break;
      case 22:
        if (((e = a.memoizedState !== null || Qt), !e)) {
          ((t = (t !== null && t.memoizedState !== null) || Tl), (u = Qt));
          var n = Tl;
          ((Qt = e),
            (Tl = t) && !n ? Vt(l, a, (a.subtreeFlags & 8772) !== 0) : Lt(l, a),
            (Qt = u),
            (Tl = n));
        }
        break;
      case 30:
        break;
      default:
        Lt(l, a);
    }
  }
  function Fd(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), Fd(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && Fn(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var ml = null,
    Ll = !1;
  function Zt(l, t, a) {
    for (a = a.child; a !== null; ) ($d(l, t, a), (a = a.sibling));
  }
  function $d(l, t, a) {
    if ($l && typeof $l.onCommitFiberUnmount == "function")
      try {
        $l.onCommitFiberUnmount(_e, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Tl || _t(a, t),
          Zt(l, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Tl || _t(a, t);
        var e = ml,
          u = Ll;
        (va(a.type) && ((ml = a.stateNode), (Ll = !1)),
          Zt(l, t, a),
          ou(a.stateNode),
          (ml = e),
          (Ll = u));
        break;
      case 5:
        Tl || _t(a, t);
      case 6:
        if (
          ((e = ml),
          (u = Ll),
          (ml = null),
          Zt(l, t, a),
          (ml = e),
          (Ll = u),
          ml !== null)
        )
          if (Ll)
            try {
              (ml.nodeType === 9
                ? ml.body
                : ml.nodeName === "HTML"
                  ? ml.ownerDocument.body
                  : ml
              ).removeChild(a.stateNode);
            } catch (n) {
              al(a, t, n);
            }
          else
            try {
              ml.removeChild(a.stateNode);
            } catch (n) {
              al(a, t, n);
            }
        break;
      case 18:
        ml !== null &&
          (Ll
            ? ((l = ml),
              L0(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                a.stateNode,
              ),
              Ae(l))
            : L0(ml, a.stateNode));
        break;
      case 4:
        ((e = ml),
          (u = Ll),
          (ml = a.stateNode.containerInfo),
          (Ll = !0),
          Zt(l, t, a),
          (ml = e),
          (Ll = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ca(2, a, t), Tl || ca(4, a, t), Zt(l, t, a));
        break;
      case 1:
        (Tl ||
          (_t(a, t),
          (e = a.stateNode),
          typeof e.componentWillUnmount == "function" && Vd(a, t, e)),
          Zt(l, t, a));
        break;
      case 21:
        Zt(l, t, a);
        break;
      case 22:
        ((Tl = (e = Tl) || a.memoizedState !== null), Zt(l, t, a), (Tl = e));
        break;
      default:
        Zt(l, t, a);
    }
  }
  function Id(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        Ae(l);
      } catch (a) {
        al(t, t.return, a);
      }
    }
  }
  function Pd(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        Ae(l);
      } catch (a) {
        al(t, t.return, a);
      }
  }
  function tr(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new kd()), t);
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new kd()),
          t
        );
      default:
        throw Error(v(435, l.tag));
    }
  }
  function rn(l, t) {
    var a = tr(l);
    t.forEach(function (e) {
      if (!a.has(e)) {
        a.add(e);
        var u = dr.bind(null, l, e);
        e.then(u, u);
      }
    });
  }
  function Vl(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e],
          n = l,
          i = t,
          c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (va(c.type)) {
                ((ml = c.stateNode), (Ll = !1));
                break l;
              }
              break;
            case 5:
              ((ml = c.stateNode), (Ll = !1));
              break l;
            case 3:
            case 4:
              ((ml = c.stateNode.containerInfo), (Ll = !0));
              break l;
          }
          c = c.return;
        }
        if (ml === null) throw Error(v(160));
        ($d(n, i, u),
          (ml = null),
          (Ll = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (l0(t, l), (t = t.sibling));
  }
  var St = null;
  function l0(l, t) {
    var a = l.alternate,
      e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Vl(t, l),
          Kl(l),
          e & 4 && (ca(3, l, l.return), tu(3, l), ca(5, l, l.return)));
        break;
      case 1:
        (Vl(t, l),
          Kl(l),
          e & 512 && (Tl || a === null || _t(a, a.return)),
          e & 64 &&
            Qt &&
            ((l = l.updateQueue),
            l !== null &&
              ((e = l.callbacks),
              e !== null &&
                ((a = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = a === null ? e : a.concat(e))))));
        break;
      case 26:
        var u = St;
        if (
          (Vl(t, l),
          Kl(l),
          e & 512 && (Tl || a === null || _t(a, a.return)),
          e & 4)
        ) {
          var n = a !== null ? a.memoizedState : null;
          if (((e = l.memoizedState), a === null))
            if (e === null)
              if (l.stateNode === null) {
                l: {
                  ((e = l.type),
                    (a = l.memoizedProps),
                    (u = u.ownerDocument || u));
                  t: switch (e) {
                    case "title":
                      ((n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Ne] ||
                          n[_l] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(e)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title"),
                          )),
                        Dl(n, e, a),
                        (n[_l] = l),
                        Al(n),
                        (e = n));
                      break l;
                    case "link":
                      var i = lo("link", "href", u).get(e + (a.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (
                            ((n = i[c]),
                            n.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              n.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              n.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              n.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(e)),
                        Dl(n, e, a),
                        u.head.appendChild(n));
                      break;
                    case "meta":
                      if (
                        (i = lo("meta", "content", u).get(
                          e + (a.content || ""),
                        ))
                      ) {
                        for (c = 0; c < i.length; c++)
                          if (
                            ((n = i[c]),
                            n.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              n.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              n.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              n.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(e)),
                        Dl(n, e, a),
                        u.head.appendChild(n));
                      break;
                    default:
                      throw Error(v(468, e));
                  }
                  ((n[_l] = l), Al(n), (e = n));
                }
                l.stateNode = e;
              } else to(u, l.type, l.stateNode);
            else l.stateNode = P0(u, e, l.memoizedProps);
          else
            n !== e
              ? (n === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : n.count--,
                e === null
                  ? to(u, l.type, l.stateNode)
                  : P0(u, e, l.memoizedProps))
              : e === null &&
                l.stateNode !== null &&
                gc(l, l.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Vl(t, l),
          Kl(l),
          e & 512 && (Tl || a === null || _t(a, a.return)),
          a !== null && e & 4 && gc(l, l.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if (
          (Vl(t, l),
          Kl(l),
          e & 512 && (Tl || a === null || _t(a, a.return)),
          l.flags & 32)
        ) {
          u = l.stateNode;
          try {
            wa(u, "");
          } catch (O) {
            al(l, l.return, O);
          }
        }
        (e & 4 &&
          l.stateNode != null &&
          ((u = l.memoizedProps), gc(l, u, a !== null ? a.memoizedProps : u)),
          e & 1024 && (pc = !0));
        break;
      case 6:
        if ((Vl(t, l), Kl(l), e & 4)) {
          if (l.stateNode === null) throw Error(v(162));
          ((e = l.memoizedProps), (a = l.stateNode));
          try {
            a.nodeValue = e;
          } catch (O) {
            al(l, l.return, O);
          }
        }
        break;
      case 3:
        if (
          ((Nn = null),
          (u = St),
          (St = On(t.containerInfo)),
          Vl(t, l),
          (St = u),
          Kl(l),
          e & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Ae(t.containerInfo);
          } catch (O) {
            al(l, l.return, O);
          }
        pc && ((pc = !1), t0(l));
        break;
      case 4:
        ((e = St),
          (St = On(l.stateNode.containerInfo)),
          Vl(t, l),
          Kl(l),
          (St = e));
        break;
      case 12:
        (Vl(t, l), Kl(l));
        break;
      case 31:
        (Vl(t, l),
          Kl(l),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), rn(l, e))));
        break;
      case 13:
        (Vl(t, l),
          Kl(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (hn = Fl()),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), rn(l, e))));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = a !== null && a.memoizedState !== null,
          r = Qt,
          g = Tl;
        if (
          ((Qt = r || u),
          (Tl = g || f),
          Vl(t, l),
          (Tl = g),
          (Qt = r),
          Kl(l),
          e & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (a === null || f || Qt || Tl || Ya(l)),
              a = null,
              t = l;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                f = a = t;
                try {
                  if (((n = f.stateNode), u))
                    ((i = n.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"));
                  else {
                    c = f.stateNode;
                    var z = f.memoizedProps.style,
                      h =
                        z != null && z.hasOwnProperty("display")
                          ? z.display
                          : null;
                    c.style.display =
                      h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (O) {
                  al(f, f.return, O);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (O) {
                  al(f, f.return, O);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                f = t;
                try {
                  var y = f.stateNode;
                  u ? V0(y, !0) : V0(f.stateNode, !1);
                } catch (O) {
                  al(f, f.return, O);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              (a === t && (a = null), (t = t.return));
            }
            (a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        e & 4 &&
          ((e = l.updateQueue),
          e !== null &&
            ((a = e.retryQueue),
            a !== null && ((e.retryQueue = null), rn(l, a))));
        break;
      case 19:
        (Vl(t, l),
          Kl(l),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), rn(l, e))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Vl(t, l), Kl(l));
    }
  }
  function Kl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, e = l.return; e !== null; ) {
          if (Jd(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(v(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              n = bc(l);
            mn(l, n, u);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && (wa(i, ""), (a.flags &= -33));
            var c = bc(l);
            mn(l, c, i);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo,
              r = bc(l);
            Sc(l, r, f);
            break;
          default:
            throw Error(v(161));
        }
      } catch (g) {
        al(l, l.return, g);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function t0(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        (t0(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling));
      }
  }
  function Lt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Wd(l, t.alternate, t), (t = t.sibling));
  }
  function Ya(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ca(4, t, t.return), Ya(t));
          break;
        case 1:
          _t(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == "function" && Vd(t, t.return, a),
            Ya(t));
          break;
        case 27:
          ou(t.stateNode);
        case 26:
        case 5:
          (_t(t, t.return), Ya(t));
          break;
        case 22:
          t.memoizedState === null && Ya(t);
          break;
        case 30:
          Ya(t);
          break;
        default:
          Ya(t);
      }
      l = l.sibling;
    }
  }
  function Vt(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var e = t.alternate,
        u = l,
        n = t,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Vt(u, n, a), tu(4, n));
          break;
        case 1:
          if (
            (Vt(u, n, a),
            (e = n),
            (u = e.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (r) {
              al(e, e.return, r);
            }
          if (((e = n), (u = e.updateQueue), u !== null)) {
            var c = e.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  js(f[u], c);
            } catch (r) {
              al(e, e.return, r);
            }
          }
          (a && i & 64 && Ld(n), au(n, n.return));
          break;
        case 27:
          wd(n);
        case 26:
        case 5:
          (Vt(u, n, a), a && e === null && i & 4 && Kd(n), au(n, n.return));
          break;
        case 12:
          Vt(u, n, a);
          break;
        case 31:
          (Vt(u, n, a), a && i & 4 && Id(u, n));
          break;
        case 13:
          (Vt(u, n, a), a && i & 4 && Pd(u, n));
          break;
        case 22:
          (n.memoizedState === null && Vt(u, n, a), au(n, n.return));
          break;
        case 30:
          break;
        default:
          Vt(u, n, a);
      }
      t = t.sibling;
    }
  }
  function zc(l, t) {
    var a = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (a = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== a && (l != null && l.refCount++, a != null && Ze(a)));
  }
  function Tc(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Ze(l)));
  }
  function pt(l, t, a, e) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (a0(l, t, a, e), (t = t.sibling));
  }
  function a0(l, t, a, e) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (pt(l, t, a, e), u & 2048 && tu(9, t));
        break;
      case 1:
        pt(l, t, a, e);
        break;
      case 3:
        (pt(l, t, a, e),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ze(l))));
        break;
      case 12:
        if (u & 2048) {
          (pt(l, t, a, e), (l = t.stateNode));
          try {
            var n = t.memoizedProps,
              i = n.id,
              c = n.onPostCommit;
            typeof c == "function" &&
              c(
                i,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0,
              );
          } catch (f) {
            al(t, t.return, f);
          }
        } else pt(l, t, a, e);
        break;
      case 31:
        pt(l, t, a, e);
        break;
      case 13:
        pt(l, t, a, e);
        break;
      case 23:
        break;
      case 22:
        ((n = t.stateNode),
          (i = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? pt(l, t, a, e)
              : eu(l, t)
            : n._visibility & 2
              ? pt(l, t, a, e)
              : ((n._visibility |= 2),
                re(l, t, a, e, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && zc(i, t));
        break;
      case 24:
        (pt(l, t, a, e), u & 2048 && Tc(t.alternate, t));
        break;
      default:
        pt(l, t, a, e);
    }
  }
  function re(l, t, a, e, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var n = l,
        i = t,
        c = a,
        f = e,
        r = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (re(n, i, c, f, u), tu(8, i));
          break;
        case 23:
          break;
        case 22:
          var g = i.stateNode;
          (i.memoizedState !== null
            ? g._visibility & 2
              ? re(n, i, c, f, u)
              : eu(n, i)
            : ((g._visibility |= 2), re(n, i, c, f, u)),
            u && r & 2048 && zc(i.alternate, i));
          break;
        case 24:
          (re(n, i, c, f, u), u && r & 2048 && Tc(i.alternate, i));
          break;
        default:
          re(n, i, c, f, u);
      }
      t = t.sibling;
    }
  }
  function eu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = l,
          e = t,
          u = e.flags;
        switch (e.tag) {
          case 22:
            (eu(a, e), u & 2048 && zc(e.alternate, e));
            break;
          case 24:
            (eu(a, e), u & 2048 && Tc(e.alternate, e));
            break;
          default:
            eu(a, e);
        }
        t = t.sibling;
      }
  }
  var uu = 8192;
  function ve(l, t, a) {
    if (l.subtreeFlags & uu)
      for (l = l.child; l !== null; ) (e0(l, t, a), (l = l.sibling));
  }
  function e0(l, t, a) {
    switch (l.tag) {
      case 26:
        (ve(l, t, a),
          l.flags & uu &&
            l.memoizedState !== null &&
            Qr(a, St, l.memoizedState, l.memoizedProps));
        break;
      case 5:
        ve(l, t, a);
        break;
      case 3:
      case 4:
        var e = St;
        ((St = On(l.stateNode.containerInfo)), ve(l, t, a), (St = e));
        break;
      case 22:
        l.memoizedState === null &&
          ((e = l.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = uu), (uu = 16777216), ve(l, t, a), (uu = e))
            : ve(l, t, a));
        break;
      default:
        ve(l, t, a);
    }
  }
  function u0(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function nu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          ((xl = e), i0(e, l));
        }
      u0(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) (n0(l), (l = l.sibling));
  }
  function n0(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (nu(l), l.flags & 2048 && ca(9, l, l.return));
        break;
      case 3:
        nu(l);
        break;
      case 12:
        nu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), vn(l))
          : nu(l);
        break;
      default:
        nu(l);
    }
  }
  function vn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          ((xl = e), i0(e, l));
        }
      u0(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (ca(8, t, t.return), vn(t));
          break;
        case 22:
          ((a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), vn(t)));
          break;
        default:
          vn(t);
      }
      l = l.sibling;
    }
  }
  function i0(l, t) {
    for (; xl !== null; ) {
      var a = xl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ca(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Ze(a.memoizedState.cache);
      }
      if (((e = a.child), e !== null)) ((e.return = a), (xl = e));
      else
        l: for (a = l; xl !== null; ) {
          e = xl;
          var u = e.sibling,
            n = e.return;
          if ((Fd(e), e === a)) {
            xl = null;
            break l;
          }
          if (u !== null) {
            ((u.return = n), (xl = u));
            break l;
          }
          xl = n;
        }
    }
  }
  var ar = {
      getCacheForType: function (l) {
        var t = Ml(Sl),
          a = t.data.get(l);
        return (a === void 0 && ((a = l()), t.data.set(l, a)), a);
      },
      cacheSignal: function () {
        return Ml(Sl).controller.signal;
      },
    },
    er = typeof WeakMap == "function" ? WeakMap : Map,
    I = 0,
    fl = null,
    Q = null,
    V = 0,
    tl = 0,
    et = null,
    fa = !1,
    he = !1,
    Ec = !1,
    Kt = 0,
    vl = 0,
    sa = 0,
    Ga = 0,
    Ac = 0,
    ut = 0,
    ye = 0,
    iu = null,
    Jl = null,
    xc = !1,
    hn = 0,
    c0 = 0,
    yn = 1 / 0,
    gn = null,
    da = null,
    El = 0,
    oa = null,
    ge = null,
    Jt = 0,
    _c = 0,
    Oc = null,
    f0 = null,
    cu = 0,
    Mc = null;
  function nt() {
    return (I & 2) !== 0 && V !== 0 ? V & -V : b.T !== null ? Rc() : Af();
  }
  function s0() {
    if (ut === 0)
      if ((V & 536870912) === 0 || w) {
        var l = Au;
        ((Au <<= 1), (Au & 3932160) === 0 && (Au = 262144), (ut = l));
      } else ut = 536870912;
    return ((l = tt.current), l !== null && (l.flags |= 32), ut);
  }
  function wl(l, t, a) {
    (((l === fl && (tl === 2 || tl === 9)) || l.cancelPendingCommit !== null) &&
      (be(l, 0), ma(l, V, ut, !1)),
      Me(l, a),
      ((I & 2) === 0 || l !== fl) &&
        (l === fl && ((I & 2) === 0 && (Ga |= a), vl === 4 && ma(l, V, ut, !1)),
        Ot(l)));
  }
  function d0(l, t, a) {
    if ((I & 6) !== 0) throw Error(v(327));
    var e = (!a && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Oe(l, t),
      u = e ? ir(l, t) : Dc(l, t, !0),
      n = e;
    do {
      if (u === 0) {
        he && !e && ma(l, t, 0, !1);
        break;
      } else {
        if (((a = l.current.alternate), n && !ur(a))) {
          ((u = Dc(l, t, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var i = 0;
          else
            ((i = l.pendingLanes & -536870913),
              (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = iu;
              var f = c.current.memoizedState.isDehydrated;
              if ((f && (be(c, i).flags |= 256), (i = Dc(c, i, !1)), i !== 2)) {
                if (Ec && !f) {
                  ((c.errorRecoveryDisabledLanes |= n), (Ga |= n), (u = 4));
                  break l;
                }
                ((n = Jl),
                  (Jl = u),
                  n !== null &&
                    (Jl === null ? (Jl = n) : Jl.push.apply(Jl, n)));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (be(l, 0), ma(l, t, 0, !0));
          break;
        }
        l: {
          switch (((e = l), (n = u), n)) {
            case 0:
            case 1:
              throw Error(v(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ma(e, t, ut, !fa);
              break l;
            case 2:
              Jl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(v(329));
          }
          if ((t & 62914560) === t && ((u = hn + 300 - Fl()), 10 < u)) {
            if ((ma(e, t, ut, !fa), _u(e, 0, !0) !== 0)) break l;
            ((Jt = t),
              (e.timeoutHandle = Q0(
                o0.bind(
                  null,
                  e,
                  a,
                  Jl,
                  gn,
                  xc,
                  t,
                  ut,
                  Ga,
                  ye,
                  fa,
                  n,
                  "Throttled",
                  -0,
                  0,
                ),
                u,
              )));
            break l;
          }
          o0(e, a, Jl, gn, xc, t, ut, Ga, ye, fa, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ot(l);
  }
  function o0(l, t, a, e, u, n, i, c, f, r, g, z, h, y) {
    if (
      ((l.timeoutHandle = -1),
      (z = t.subtreeFlags),
      z & 8192 || (z & 16785408) === 16785408)
    ) {
      ((z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ut,
      }),
        e0(t, n, z));
      var O =
        (n & 62914560) === n ? hn - Fl() : (n & 4194048) === n ? c0 - Fl() : 0;
      if (((O = Zr(z, O)), O !== null)) {
        ((Jt = n),
          (l.cancelPendingCommit = O(
            S0.bind(null, l, t, n, a, e, u, i, c, f, g, z, null, h, y),
          )),
          ma(l, n, i, !r));
        return;
      }
    }
    S0(l, t, n, a, e, u, i, c, f);
  }
  function ur(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var e = 0; e < a.length; e++) {
          var u = a[e],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!Pl(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        ((a.return = t), (t = a));
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function ma(l, t, a, e) {
    ((t &= ~Ac),
      (t &= ~Ga),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      e && (l.warmLanes |= t),
      (e = l.expirationTimes));
    for (var u = t; 0 < u; ) {
      var n = 31 - Il(u),
        i = 1 << n;
      ((e[n] = -1), (u &= ~i));
    }
    a !== 0 && zf(l, a, t);
  }
  function bn() {
    return (I & 6) === 0 ? (fu(0), !1) : !0;
  }
  function Nc() {
    if (Q !== null) {
      if (tl === 0) var l = Q.return;
      else ((l = Q), (qt = Da = null), Ki(l), (fe = null), (Ve = 0), (l = Q));
      for (; l !== null; ) (Zd(l.alternate, l), (l = l.return));
      Q = null;
    }
  }
  function be(l, t) {
    var a = l.timeoutHandle;
    (a !== -1 && ((l.timeoutHandle = -1), Ar(a)),
      (a = l.cancelPendingCommit),
      a !== null && ((l.cancelPendingCommit = null), a()),
      (Jt = 0),
      Nc(),
      (fl = l),
      (Q = a = Ht(l.current, null)),
      (V = t),
      (tl = 0),
      (et = null),
      (fa = !1),
      (he = Oe(l, t)),
      (Ec = !1),
      (ye = ut = Ac = Ga = sa = vl = 0),
      (Jl = iu = null),
      (xc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var u = 31 - Il(e),
          n = 1 << u;
        ((t |= l[u]), (e &= ~n));
      }
    return ((Kt = t), Yu(), a);
  }
  function m0(l, t) {
    ((B = null),
      (b.H = Ie),
      t === ce || t === Ju
        ? ((t = Ms()), (tl = 3))
        : t === Hi
          ? ((t = Ms()), (tl = 4))
          : (tl =
              t === cc
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (et = t),
      Q === null && ((vl = 1), cn(l, dt(t, l.current))));
  }
  function r0() {
    var l = tt.current;
    return l === null
      ? !0
      : (V & 4194048) === V
        ? vt === null
        : (V & 62914560) === V || (V & 536870912) !== 0
          ? l === vt
          : !1;
  }
  function v0() {
    var l = b.H;
    return ((b.H = Ie), l === null ? Ie : l);
  }
  function h0() {
    var l = b.A;
    return ((b.A = ar), l);
  }
  function Sn() {
    ((vl = 4),
      fa || ((V & 4194048) !== V && tt.current !== null) || (he = !0),
      ((sa & 134217727) === 0 && (Ga & 134217727) === 0) ||
        fl === null ||
        ma(fl, V, ut, !1));
  }
  function Dc(l, t, a) {
    var e = I;
    I |= 2;
    var u = v0(),
      n = h0();
    ((fl !== l || V !== t) && ((gn = null), be(l, t)), (t = !1));
    var i = vl;
    l: do
      try {
        if (tl !== 0 && Q !== null) {
          var c = Q,
            f = et;
          switch (tl) {
            case 8:
              (Nc(), (i = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              tt.current === null && (t = !0);
              var r = tl;
              if (((tl = 0), (et = null), Se(l, c, f, r), a && he)) {
                i = 0;
                break l;
              }
              break;
            default:
              ((r = tl), (tl = 0), (et = null), Se(l, c, f, r));
          }
        }
        (nr(), (i = vl));
        break;
      } catch (g) {
        m0(l, g);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (qt = Da = null),
      (I = e),
      (b.H = u),
      (b.A = n),
      Q === null && ((fl = null), (V = 0), Yu()),
      i
    );
  }
  function nr() {
    for (; Q !== null; ) y0(Q);
  }
  function ir(l, t) {
    var a = I;
    I |= 2;
    var e = v0(),
      u = h0();
    fl !== l || V !== t
      ? ((gn = null), (yn = Fl() + 500), be(l, t))
      : (he = Oe(l, t));
    l: do
      try {
        if (tl !== 0 && Q !== null) {
          t = Q;
          var n = et;
          t: switch (tl) {
            case 1:
              ((tl = 0), (et = null), Se(l, t, n, 1));
              break;
            case 2:
            case 9:
              if (_s(n)) {
                ((tl = 0), (et = null), g0(t));
                break;
              }
              ((t = function () {
                ((tl !== 2 && tl !== 9) || fl !== l || (tl = 7), Ot(l));
              }),
                n.then(t, t));
              break l;
            case 3:
              tl = 7;
              break l;
            case 4:
              tl = 5;
              break l;
            case 7:
              _s(n)
                ? ((tl = 0), (et = null), g0(t))
                : ((tl = 0), (et = null), Se(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (Q.tag) {
                case 26:
                  i = Q.memoizedState;
                case 5:
                case 27:
                  var c = Q;
                  if (i ? ao(i) : c.stateNode.complete) {
                    ((tl = 0), (et = null));
                    var f = c.sibling;
                    if (f !== null) Q = f;
                    else {
                      var r = c.return;
                      r !== null ? ((Q = r), pn(r)) : (Q = null);
                    }
                    break t;
                  }
              }
              ((tl = 0), (et = null), Se(l, t, n, 5));
              break;
            case 6:
              ((tl = 0), (et = null), Se(l, t, n, 6));
              break;
            case 8:
              (Nc(), (vl = 6));
              break l;
            default:
              throw Error(v(462));
          }
        }
        cr();
        break;
      } catch (g) {
        m0(l, g);
      }
    while (!0);
    return (
      (qt = Da = null),
      (b.H = e),
      (b.A = u),
      (I = a),
      Q !== null ? 0 : ((fl = null), (V = 0), Yu(), vl)
    );
  }
  function cr() {
    for (; Q !== null && !Do(); ) y0(Q);
  }
  function y0(l) {
    var t = Xd(l.alternate, l, Kt);
    ((l.memoizedProps = l.pendingProps), t === null ? pn(l) : (Q = t));
  }
  function g0(l) {
    var t = l,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Rd(a, t, t.pendingProps, t.type, void 0, V);
        break;
      case 11:
        t = Rd(a, t, t.pendingProps, t.type.render, t.ref, V);
        break;
      case 5:
        Ki(t);
      default:
        (Zd(a, t), (t = Q = hs(t, Kt)), (t = Xd(a, t, Kt)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? pn(l) : (Q = t));
  }
  function Se(l, t, a, e) {
    ((qt = Da = null), Ki(t), (fe = null), (Ve = 0));
    var u = t.return;
    try {
      if (Wm(l, u, t, a, V)) {
        ((vl = 1), cn(l, dt(a, l.current)), (Q = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((Q = u), n);
      ((vl = 1), cn(l, dt(a, l.current)), (Q = null));
      return;
    }
    t.flags & 32768
      ? (w || e === 1
          ? (l = !0)
          : he || (V & 536870912) !== 0
            ? (l = !1)
            : ((fa = l = !0),
              (e === 2 || e === 9 || e === 3 || e === 6) &&
                ((e = tt.current),
                e !== null && e.tag === 13 && (e.flags |= 16384))),
        b0(t, l))
      : pn(t);
  }
  function pn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        b0(t, fa);
        return;
      }
      l = t.return;
      var a = Im(t.alternate, t, Kt);
      if (a !== null) {
        Q = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Q = t;
        return;
      }
      Q = t = l;
    } while (t !== null);
    vl === 0 && (vl = 5);
  }
  function b0(l, t) {
    do {
      var a = Pm(l.alternate, l);
      if (a !== null) {
        ((a.flags &= 32767), (Q = a));
        return;
      }
      if (
        ((a = l.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        Q = l;
        return;
      }
      Q = l = a;
    } while (l !== null);
    ((vl = 6), (Q = null));
  }
  function S0(l, t, a, e, u, n, i, c, f) {
    l.cancelPendingCommit = null;
    do zn();
    while (El !== 0);
    if ((I & 6) !== 0) throw Error(v(327));
    if (t !== null) {
      if (t === l.current) throw Error(v(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= bi),
        Xo(l, a, n, i, c, f),
        l === fl && ((Q = fl = null), (V = 0)),
        (ge = t),
        (oa = l),
        (Jt = a),
        (_c = n),
        (Oc = u),
        (f0 = e),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            or(Tu, function () {
              return (A0(), null);
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (e = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || e)
      ) {
        ((e = b.T), (b.T = null), (u = x.p), (x.p = 2), (i = I), (I |= 4));
        try {
          lr(l, t, a);
        } finally {
          ((I = i), (x.p = u), (b.T = e));
        }
      }
      ((El = 1), p0(), z0(), T0());
    }
  }
  function p0() {
    if (El === 1) {
      El = 0;
      var l = oa,
        t = ge,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = b.T), (b.T = null));
        var e = x.p;
        x.p = 2;
        var u = I;
        I |= 4;
        try {
          l0(t, l);
          var n = Zc,
            i = is(l.containerInfo),
            c = n.focusedElem,
            f = n.selectionRange;
          if (
            i !== c &&
            c &&
            c.ownerDocument &&
            ns(c.ownerDocument.documentElement, c)
          ) {
            if (f !== null && ri(c)) {
              var r = f.start,
                g = f.end;
              if ((g === void 0 && (g = r), "selectionStart" in c))
                ((c.selectionStart = r),
                  (c.selectionEnd = Math.min(g, c.value.length)));
              else {
                var z = c.ownerDocument || document,
                  h = (z && z.defaultView) || window;
                if (h.getSelection) {
                  var y = h.getSelection(),
                    O = c.textContent.length,
                    j = Math.min(f.start, O),
                    il = f.end === void 0 ? j : Math.min(f.end, O);
                  !y.extend && j > il && ((i = il), (il = j), (j = i));
                  var o = us(c, j),
                    s = us(c, il);
                  if (
                    o &&
                    s &&
                    (y.rangeCount !== 1 ||
                      y.anchorNode !== o.node ||
                      y.anchorOffset !== o.offset ||
                      y.focusNode !== s.node ||
                      y.focusOffset !== s.offset)
                  ) {
                    var m = z.createRange();
                    (m.setStart(o.node, o.offset),
                      y.removeAllRanges(),
                      j > il
                        ? (y.addRange(m), y.extend(s.node, s.offset))
                        : (m.setEnd(s.node, s.offset), y.addRange(m)));
                  }
                }
              }
            }
            for (z = [], y = c; (y = y.parentNode); )
              y.nodeType === 1 &&
                z.push({ element: y, left: y.scrollLeft, top: y.scrollTop });
            for (
              typeof c.focus == "function" && c.focus(), c = 0;
              c < z.length;
              c++
            ) {
              var p = z[c];
              ((p.element.scrollLeft = p.left), (p.element.scrollTop = p.top));
            }
          }
          ((Hn = !!Qc), (Zc = Qc = null));
        } finally {
          ((I = u), (x.p = e), (b.T = a));
        }
      }
      ((l.current = t), (El = 2));
    }
  }
  function z0() {
    if (El === 2) {
      El = 0;
      var l = oa,
        t = ge,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = b.T), (b.T = null));
        var e = x.p;
        x.p = 2;
        var u = I;
        I |= 4;
        try {
          Wd(l, t.alternate, t);
        } finally {
          ((I = u), (x.p = e), (b.T = a));
        }
      }
      El = 3;
    }
  }
  function T0() {
    if (El === 4 || El === 3) {
      ((El = 0), Uo());
      var l = oa,
        t = ge,
        a = Jt,
        e = f0;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (El = 5)
        : ((El = 0), (ge = oa = null), E0(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (
        (u === 0 && (da = null),
        kn(a),
        (t = t.stateNode),
        $l && typeof $l.onCommitFiberRoot == "function")
      )
        try {
          $l.onCommitFiberRoot(_e, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (e !== null) {
        ((t = b.T), (u = x.p), (x.p = 2), (b.T = null));
        try {
          for (var n = l.onRecoverableError, i = 0; i < e.length; i++) {
            var c = e[i];
            n(c.value, { componentStack: c.stack });
          }
        } finally {
          ((b.T = t), (x.p = u));
        }
      }
      ((Jt & 3) !== 0 && zn(),
        Ot(l),
        (u = l.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0
          ? l === Mc
            ? cu++
            : ((cu = 0), (Mc = l))
          : (cu = 0),
        fu(0));
    }
  }
  function E0(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Ze(t)));
  }
  function zn() {
    return (p0(), z0(), T0(), A0());
  }
  function A0() {
    if (El !== 5) return !1;
    var l = oa,
      t = _c;
    _c = 0;
    var a = kn(Jt),
      e = b.T,
      u = x.p;
    try {
      ((x.p = 32 > a ? 32 : a), (b.T = null), (a = Oc), (Oc = null));
      var n = oa,
        i = Jt;
      if (((El = 0), (ge = oa = null), (Jt = 0), (I & 6) !== 0))
        throw Error(v(331));
      var c = I;
      if (
        ((I |= 4),
        n0(n.current),
        a0(n, n.current, i, a),
        (I = c),
        fu(0, !1),
        $l && typeof $l.onPostCommitFiberRoot == "function")
      )
        try {
          $l.onPostCommitFiberRoot(_e, n);
        } catch {}
      return !0;
    } finally {
      ((x.p = u), (b.T = e), E0(l, t));
    }
  }
  function x0(l, t, a) {
    ((t = dt(a, t)),
      (t = ic(l.stateNode, t, 2)),
      (l = ua(l, t, 2)),
      l !== null && (Me(l, 2), Ot(l)));
  }
  function al(l, t, a) {
    if (l.tag === 3) x0(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          x0(t, l, a);
          break;
        } else if (t.tag === 1) {
          var e = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof e.componentDidCatch == "function" &&
              (da === null || !da.has(e)))
          ) {
            ((l = dt(a, l)),
              (a = _d(2)),
              (e = ua(t, a, 2)),
              e !== null && (Od(a, e, t, l), Me(e, 2), Ot(e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Uc(l, t, a) {
    var e = l.pingCache;
    if (e === null) {
      e = l.pingCache = new er();
      var u = new Set();
      e.set(t, u);
    } else ((u = e.get(t)), u === void 0 && ((u = new Set()), e.set(t, u)));
    u.has(a) ||
      ((Ec = !0), u.add(a), (l = fr.bind(null, l, t, a)), t.then(l, l));
  }
  function fr(l, t, a) {
    var e = l.pingCache;
    (e !== null && e.delete(t),
      (l.pingedLanes |= l.suspendedLanes & a),
      (l.warmLanes &= ~a),
      fl === l &&
        (V & a) === a &&
        (vl === 4 || (vl === 3 && (V & 62914560) === V && 300 > Fl() - hn)
          ? (I & 2) === 0 && be(l, 0)
          : (Ac |= a),
        ye === V && (ye = 0)),
      Ot(l));
  }
  function _0(l, t) {
    (t === 0 && (t = pf()), (l = Oa(l, t)), l !== null && (Me(l, t), Ot(l)));
  }
  function sr(l) {
    var t = l.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), _0(l, a));
  }
  function dr(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var e = l.stateNode,
          u = l.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = l.stateNode;
        break;
      case 22:
        e = l.stateNode._retryCache;
        break;
      default:
        throw Error(v(314));
    }
    (e !== null && e.delete(t), _0(l, a));
  }
  function or(l, t) {
    return Vn(l, t);
  }
  var Tn = null,
    pe = null,
    jc = !1,
    En = !1,
    Hc = !1,
    ra = 0;
  function Ot(l) {
    (l !== pe &&
      l.next === null &&
      (pe === null ? (Tn = pe = l) : (pe = pe.next = l)),
      (En = !0),
      jc || ((jc = !0), rr()));
  }
  function fu(l, t) {
    if (!Hc && En) {
      Hc = !0;
      do
        for (var a = !1, e = Tn; e !== null; ) {
          if (l !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = e.suspendedLanes,
                c = e.pingedLanes;
              ((n = (1 << (31 - Il(42 | l) + 1)) - 1),
                (n &= u & ~(i & ~c)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((a = !0), D0(e, n));
          } else
            ((n = V),
              (n = _u(
                e,
                e === fl ? n : 0,
                e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Oe(e, n) || ((a = !0), D0(e, n)));
          e = e.next;
        }
      while (a);
      Hc = !1;
    }
  }
  function mr() {
    O0();
  }
  function O0() {
    En = jc = !1;
    var l = 0;
    ra !== 0 && Er() && (l = ra);
    for (var t = Fl(), a = null, e = Tn; e !== null; ) {
      var u = e.next,
        n = M0(e, t);
      (n === 0
        ? ((e.next = null),
          a === null ? (Tn = u) : (a.next = u),
          u === null && (pe = a))
        : ((a = e), (l !== 0 || (n & 3) !== 0) && (En = !0)),
        (e = u));
    }
    ((El !== 0 && El !== 5) || fu(l), ra !== 0 && (ra = 0));
  }
  function M0(l, t) {
    for (
      var a = l.suspendedLanes,
        e = l.pingedLanes,
        u = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;
    ) {
      var i = 31 - Il(n),
        c = 1 << i,
        f = u[i];
      (f === -1
        ? ((c & a) === 0 || (c & e) !== 0) && (u[i] = Go(c, t))
        : f <= t && (l.expiredLanes |= c),
        (n &= ~c));
    }
    if (
      ((t = fl),
      (a = V),
      (a = _u(
        l,
        l === t ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      (e = l.callbackNode),
      a === 0 ||
        (l === t && (tl === 2 || tl === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        e !== null && e !== null && Kn(e),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Oe(l, a)) {
      if (((t = a & -a), t === l.callbackPriority)) return t;
      switch ((e !== null && Kn(e), kn(a))) {
        case 2:
        case 8:
          a = bf;
          break;
        case 32:
          a = Tu;
          break;
        case 268435456:
          a = Sf;
          break;
        default:
          a = Tu;
      }
      return (
        (e = N0.bind(null, l)),
        (a = Vn(a, e)),
        (l.callbackPriority = t),
        (l.callbackNode = a),
        t
      );
    }
    return (
      e !== null && e !== null && Kn(e),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function N0(l, t) {
    if (El !== 0 && El !== 5)
      return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var a = l.callbackNode;
    if (zn() && l.callbackNode !== a) return null;
    var e = V;
    return (
      (e = _u(
        l,
        l === fl ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      e === 0
        ? null
        : (d0(l, e, t),
          M0(l, Fl()),
          l.callbackNode != null && l.callbackNode === a
            ? N0.bind(null, l)
            : null)
    );
  }
  function D0(l, t) {
    if (zn()) return null;
    d0(l, t, !0);
  }
  function rr() {
    xr(function () {
      (I & 6) !== 0 ? Vn(gf, mr) : O0();
    });
  }
  function Rc() {
    if (ra === 0) {
      var l = ne;
      (l === 0 && ((l = Eu), (Eu <<= 1), (Eu & 261888) === 0 && (Eu = 256)),
        (ra = l));
    }
    return ra;
  }
  function U0(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : Du("" + l);
  }
  function j0(l, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      l.id && a.setAttribute("form", l.id),
      t.parentNode.insertBefore(a, t),
      (l = new FormData(l)),
      a.parentNode.removeChild(a),
      l
    );
  }
  function vr(l, t, a, e, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var n = U0((u[Ql] || null).action),
        i = e.submitter;
      i &&
        ((t = (t = i[Ql] || null)
          ? U0(t.formAction)
          : i.getAttribute("formAction")),
        t !== null && ((n = t), (i = null)));
      var c = new Ru("action", "action", null, e, u);
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (e.defaultPrevented) {
                if (ra !== 0) {
                  var f = i ? j0(u, i) : new FormData(u);
                  lc(
                    a,
                    { pending: !0, data: f, method: u.method, action: n },
                    null,
                    f,
                  );
                }
              } else
                typeof n == "function" &&
                  (c.preventDefault(),
                  (f = i ? j0(u, i) : new FormData(u)),
                  lc(
                    a,
                    { pending: !0, data: f, method: u.method, action: n },
                    n,
                    f,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var qc = 0; qc < gi.length; qc++) {
    var Cc = gi[qc],
      hr = Cc.toLowerCase(),
      yr = Cc[0].toUpperCase() + Cc.slice(1);
    bt(hr, "on" + yr);
  }
  (bt(ss, "onAnimationEnd"),
    bt(ds, "onAnimationIteration"),
    bt(os, "onAnimationStart"),
    bt("dblclick", "onDoubleClick"),
    bt("focusin", "onFocus"),
    bt("focusout", "onBlur"),
    bt(jm, "onTransitionRun"),
    bt(Hm, "onTransitionStart"),
    bt(Rm, "onTransitionCancel"),
    bt(ms, "onTransitionEnd"),
    Ka("onMouseEnter", ["mouseout", "mouseover"]),
    Ka("onMouseLeave", ["mouseout", "mouseover"]),
    Ka("onPointerEnter", ["pointerout", "pointerover"]),
    Ka("onPointerLeave", ["pointerout", "pointerover"]),
    Ea(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Ea(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Ea("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ea(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ea(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ea(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var su =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    gr = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(su),
    );
  function H0(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var e = l[a],
        u = e.event;
      e = e.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = e.length - 1; 0 <= i; i--) {
            var c = e[i],
              f = c.instance,
              r = c.currentTarget;
            if (((c = c.listener), f !== n && u.isPropagationStopped()))
              break l;
            ((n = c), (u.currentTarget = r));
            try {
              n(u);
            } catch (g) {
              Bu(g);
            }
            ((u.currentTarget = null), (n = f));
          }
        else
          for (i = 0; i < e.length; i++) {
            if (
              ((c = e[i]),
              (f = c.instance),
              (r = c.currentTarget),
              (c = c.listener),
              f !== n && u.isPropagationStopped())
            )
              break l;
            ((n = c), (u.currentTarget = r));
            try {
              n(u);
            } catch (g) {
              Bu(g);
            }
            ((u.currentTarget = null), (n = f));
          }
      }
    }
  }
  function Z(l, t) {
    var a = t[Wn];
    a === void 0 && (a = t[Wn] = new Set());
    var e = l + "__bubble";
    a.has(e) || (R0(t, l, 2, !1), a.add(e));
  }
  function Bc(l, t, a) {
    var e = 0;
    (t && (e |= 4), R0(a, l, e, t));
  }
  var An = "_reactListening" + Math.random().toString(36).slice(2);
  function Yc(l) {
    if (!l[An]) {
      ((l[An] = !0),
        Of.forEach(function (a) {
          a !== "selectionchange" && (gr.has(a) || Bc(a, !1, l), Bc(a, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[An] || ((t[An] = !0), Bc("selectionchange", !1, t));
    }
  }
  function R0(l, t, a, e) {
    switch (so(t)) {
      case 2:
        var u = Kr;
        break;
      case 8:
        u = Jr;
        break;
      default:
        u = Pc;
    }
    ((a = u.bind(null, t, a, l)),
      (u = void 0),
      !ui ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      e
        ? u !== void 0
          ? l.addEventListener(t, a, { capture: !0, passive: u })
          : l.addEventListener(t, a, !0)
        : u !== void 0
          ? l.addEventListener(t, a, { passive: u })
          : l.addEventListener(t, a, !1));
  }
  function Gc(l, t, a, e, u) {
    var n = e;
    if ((t & 1) === 0 && (t & 2) === 0 && e !== null)
      l: for (;;) {
        if (e === null) return;
        var i = e.tag;
        if (i === 3 || i === 4) {
          var c = e.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = e.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (((i = Za(c)), i === null)) return;
            if (((f = i.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
              e = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        e = e.return;
      }
    Gf(function () {
      var r = n,
        g = ai(a),
        z = [];
      l: {
        var h = rs.get(l);
        if (h !== void 0) {
          var y = Ru,
            O = l;
          switch (l) {
            case "keypress":
              if (ju(a) === 0) break l;
            case "keydown":
            case "keyup":
              y = dm;
              break;
            case "focusin":
              ((O = "focus"), (y = fi));
              break;
            case "focusout":
              ((O = "blur"), (y = fi));
              break;
            case "beforeblur":
            case "afterblur":
              y = fi;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              y = Zf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              y = Io;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              y = rm;
              break;
            case ss:
            case ds:
            case os:
              y = tm;
              break;
            case ms:
              y = hm;
              break;
            case "scroll":
            case "scrollend":
              y = Fo;
              break;
            case "wheel":
              y = gm;
              break;
            case "copy":
            case "cut":
            case "paste":
              y = em;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              y = Vf;
              break;
            case "toggle":
            case "beforetoggle":
              y = Sm;
          }
          var j = (t & 4) !== 0,
            il = !j && (l === "scroll" || l === "scrollend"),
            o = j ? (h !== null ? h + "Capture" : null) : h;
          j = [];
          for (var s = r, m; s !== null; ) {
            var p = s;
            if (
              ((m = p.stateNode),
              (p = p.tag),
              (p !== 5 && p !== 26 && p !== 27) ||
                m === null ||
                o === null ||
                ((p = Ue(s, o)), p != null && j.push(du(s, p, m))),
              il)
            )
              break;
            s = s.return;
          }
          0 < j.length &&
            ((h = new y(h, O, null, a, g)), z.push({ event: h, listeners: j }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((h = l === "mouseover" || l === "pointerover"),
            (y = l === "mouseout" || l === "pointerout"),
            h &&
              a !== ti &&
              (O = a.relatedTarget || a.fromElement) &&
              (Za(O) || O[Qa]))
          )
            break l;
          if (
            (y || h) &&
            ((h =
              g.window === g
                ? g
                : (h = g.ownerDocument)
                  ? h.defaultView || h.parentWindow
                  : window),
            y
              ? ((O = a.relatedTarget || a.toElement),
                (y = r),
                (O = O ? Za(O) : null),
                O !== null &&
                  ((il = k(O)),
                  (j = O.tag),
                  O !== il || (j !== 5 && j !== 27 && j !== 6)) &&
                  (O = null))
              : ((y = null), (O = r)),
            y !== O)
          ) {
            if (
              ((j = Zf),
              (p = "onMouseLeave"),
              (o = "onMouseEnter"),
              (s = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((j = Vf),
                (p = "onPointerLeave"),
                (o = "onPointerEnter"),
                (s = "pointer")),
              (il = y == null ? h : De(y)),
              (m = O == null ? h : De(O)),
              (h = new j(p, s + "leave", y, a, g)),
              (h.target = il),
              (h.relatedTarget = m),
              (p = null),
              Za(g) === r &&
                ((j = new j(o, s + "enter", O, a, g)),
                (j.target = m),
                (j.relatedTarget = il),
                (p = j)),
              (il = p),
              y && O)
            )
              t: {
                for (j = br, o = y, s = O, m = 0, p = o; p; p = j(p)) m++;
                p = 0;
                for (var D = s; D; D = j(D)) p++;
                for (; 0 < m - p; ) ((o = j(o)), m--);
                for (; 0 < p - m; ) ((s = j(s)), p--);
                for (; m--; ) {
                  if (o === s || (s !== null && o === s.alternate)) {
                    j = o;
                    break t;
                  }
                  ((o = j(o)), (s = j(s)));
                }
                j = null;
              }
            else j = null;
            (y !== null && q0(z, h, y, j, !1),
              O !== null && il !== null && q0(z, il, O, j, !0));
          }
        }
        l: {
          if (
            ((h = r ? De(r) : window),
            (y = h.nodeName && h.nodeName.toLowerCase()),
            y === "select" || (y === "input" && h.type === "file"))
          )
            var W = If;
          else if (Ff(h))
            if (Pf) W = Nm;
            else {
              W = Om;
              var N = _m;
            }
          else
            ((y = h.nodeName),
              !y ||
              y.toLowerCase() !== "input" ||
              (h.type !== "checkbox" && h.type !== "radio")
                ? r && li(r.elementType) && (W = If)
                : (W = Mm));
          if (W && (W = W(l, r))) {
            $f(z, W, a, g);
            break l;
          }
          (N && N(l, h, r),
            l === "focusout" &&
              r &&
              h.type === "number" &&
              r.memoizedProps.value != null &&
              Pn(h, "number", h.value));
        }
        switch (((N = r ? De(r) : window), l)) {
          case "focusin":
            (Ff(N) || N.contentEditable === "true") &&
              (($a = N), (vi = r), (Ge = null));
            break;
          case "focusout":
            Ge = vi = $a = null;
            break;
          case "mousedown":
            hi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((hi = !1), cs(z, a, g));
            break;
          case "selectionchange":
            if (Um) break;
          case "keydown":
          case "keyup":
            cs(z, a, g);
        }
        var G;
        if (di)
          l: {
            switch (l) {
              case "compositionstart":
                var K = "onCompositionStart";
                break l;
              case "compositionend":
                K = "onCompositionEnd";
                break l;
              case "compositionupdate":
                K = "onCompositionUpdate";
                break l;
            }
            K = void 0;
          }
        else
          Fa
            ? kf(l, a) && (K = "onCompositionEnd")
            : l === "keydown" &&
              a.keyCode === 229 &&
              (K = "onCompositionStart");
        (K &&
          (Kf &&
            a.locale !== "ko" &&
            (Fa || K !== "onCompositionStart"
              ? K === "onCompositionEnd" && Fa && (G = Xf())
              : (($t = g),
                (ni = "value" in $t ? $t.value : $t.textContent),
                (Fa = !0))),
          (N = xn(r, K)),
          0 < N.length &&
            ((K = new Lf(K, l, null, a, g)),
            z.push({ event: K, listeners: N }),
            G ? (K.data = G) : ((G = Wf(a)), G !== null && (K.data = G)))),
          (G = zm ? Tm(l, a) : Em(l, a)) &&
            ((K = xn(r, "onBeforeInput")),
            0 < K.length &&
              ((N = new Lf("onBeforeInput", "beforeinput", null, a, g)),
              z.push({ event: N, listeners: K }),
              (N.data = G))),
          vr(z, l, r, a, g));
      }
      H0(z, t);
    });
  }
  function du(l, t, a) {
    return { instance: l, listener: t, currentTarget: a };
  }
  function xn(l, t) {
    for (var a = t + "Capture", e = []; l !== null; ) {
      var u = l,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Ue(l, a)),
          u != null && e.unshift(du(l, u, n)),
          (u = Ue(l, t)),
          u != null && e.push(du(l, u, n))),
        l.tag === 3)
      )
        return e;
      l = l.return;
    }
    return [];
  }
  function br(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function q0(l, t, a, e, u) {
    for (var n = t._reactName, i = []; a !== null && a !== e; ) {
      var c = a,
        f = c.alternate,
        r = c.stateNode;
      if (((c = c.tag), f !== null && f === e)) break;
      ((c !== 5 && c !== 26 && c !== 27) ||
        r === null ||
        ((f = r),
        u
          ? ((r = Ue(a, n)), r != null && i.unshift(du(a, r, f)))
          : u || ((r = Ue(a, n)), r != null && i.push(du(a, r, f)))),
        (a = a.return));
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Sr = /\r\n?/g,
    pr = /\u0000|\uFFFD/g;
  function C0(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        Sr,
        `
`,
      )
      .replace(pr, "");
  }
  function B0(l, t) {
    return ((t = C0(t)), C0(l) === t);
  }
  function nl(l, t, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string"
          ? t === "body" || (t === "textarea" && e === "") || wa(l, e)
          : (typeof e == "number" || typeof e == "bigint") &&
            t !== "body" &&
            wa(l, "" + e);
        break;
      case "className":
        Mu(l, "class", e);
        break;
      case "tabIndex":
        Mu(l, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Mu(l, a, e);
        break;
      case "style":
        Bf(l, e, n);
        break;
      case "data":
        if (t !== "object") {
          Mu(l, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (
          e == null ||
          typeof e == "function" ||
          typeof e == "symbol" ||
          typeof e == "boolean"
        ) {
          l.removeAttribute(a);
          break;
        }
        ((e = Du("" + e)), l.setAttribute(a, e));
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (a === "formAction"
              ? (t !== "input" && nl(l, t, "name", u.name, u, null),
                nl(l, t, "formEncType", u.formEncType, u, null),
                nl(l, t, "formMethod", u.formMethod, u, null),
                nl(l, t, "formTarget", u.formTarget, u, null))
              : (nl(l, t, "encType", u.encType, u, null),
                nl(l, t, "method", u.method, u, null),
                nl(l, t, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        ((e = Du("" + e)), l.setAttribute(a, e));
        break;
      case "onClick":
        e != null && (l.onclick = Ut);
        break;
      case "onScroll":
        e != null && Z("scroll", l);
        break;
      case "onScrollEnd":
        e != null && Z("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(v(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(v(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        l.muted = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          e == null ||
          typeof e == "function" ||
          typeof e == "boolean" ||
          typeof e == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        ((a = Du("" + e)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        e != null && typeof e != "function" && typeof e != "symbol"
          ? l.setAttribute(a, "" + e)
          : l.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        e && typeof e != "function" && typeof e != "symbol"
          ? l.setAttribute(a, "")
          : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0
          ? l.setAttribute(a, "")
          : e !== !1 &&
              e != null &&
              typeof e != "function" &&
              typeof e != "symbol"
            ? l.setAttribute(a, e)
            : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null &&
        typeof e != "function" &&
        typeof e != "symbol" &&
        !isNaN(e) &&
        1 <= e
          ? l.setAttribute(a, e)
          : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e)
          ? l.removeAttribute(a)
          : l.setAttribute(a, e);
        break;
      case "popover":
        (Z("beforetoggle", l), Z("toggle", l), Ou(l, "popover", e));
        break;
      case "xlinkActuate":
        Dt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", e);
        break;
      case "xlinkArcrole":
        Dt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", e);
        break;
      case "xlinkRole":
        Dt(l, "http://www.w3.org/1999/xlink", "xlink:role", e);
        break;
      case "xlinkShow":
        Dt(l, "http://www.w3.org/1999/xlink", "xlink:show", e);
        break;
      case "xlinkTitle":
        Dt(l, "http://www.w3.org/1999/xlink", "xlink:title", e);
        break;
      case "xlinkType":
        Dt(l, "http://www.w3.org/1999/xlink", "xlink:type", e);
        break;
      case "xmlBase":
        Dt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", e);
        break;
      case "xmlLang":
        Dt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", e);
        break;
      case "xmlSpace":
        Dt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", e);
        break;
      case "is":
        Ou(l, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = ko.get(a) || a), Ou(l, a, e));
    }
  }
  function Xc(l, t, a, e, u, n) {
    switch (a) {
      case "style":
        Bf(l, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(v(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(v(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string"
          ? wa(l, e)
          : (typeof e == "number" || typeof e == "bigint") && wa(l, "" + e);
        break;
      case "onScroll":
        e != null && Z("scroll", l);
        break;
      case "onScrollEnd":
        e != null && Z("scrollend", l);
        break;
      case "onClick":
        e != null && (l.onclick = Ut);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Mf.hasOwnProperty(a))
          l: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (t = a.slice(2, u ? a.length - 7 : void 0)),
              (n = l[Ql] || null),
              (n = n != null ? n[a] : null),
              typeof n == "function" && l.removeEventListener(t, n, u),
              typeof e == "function")
            ) {
              (typeof n != "function" &&
                n !== null &&
                (a in l
                  ? (l[a] = null)
                  : l.hasAttribute(a) && l.removeAttribute(a)),
                l.addEventListener(t, e, u));
              break l;
            }
            a in l
              ? (l[a] = e)
              : e === !0
                ? l.setAttribute(a, "")
                : Ou(l, a, e);
          }
    }
  }
  function Dl(l, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Z("error", l), Z("load", l));
        var e = !1,
          u = !1,
          n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var i = a[n];
            if (i != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(v(137, t));
                default:
                  nl(l, t, n, i, a, null);
              }
          }
        (u && nl(l, t, "srcSet", a.srcSet, a, null),
          e && nl(l, t, "src", a.src, a, null));
        return;
      case "input":
        Z("invalid", l);
        var c = (n = i = u = null),
          f = null,
          r = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var g = a[e];
            if (g != null)
              switch (e) {
                case "name":
                  u = g;
                  break;
                case "type":
                  i = g;
                  break;
                case "checked":
                  f = g;
                  break;
                case "defaultChecked":
                  r = g;
                  break;
                case "value":
                  n = g;
                  break;
                case "defaultValue":
                  c = g;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (g != null) throw Error(v(137, t));
                  break;
                default:
                  nl(l, t, e, g, a, null);
              }
          }
        Hf(l, n, c, f, r, i, u, !1);
        return;
      case "select":
        (Z("invalid", l), (e = i = n = null));
        for (u in a)
          if (a.hasOwnProperty(u) && ((c = a[u]), c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                e = c;
              default:
                nl(l, t, u, c, a, null);
            }
        ((t = n),
          (a = i),
          (l.multiple = !!e),
          t != null ? Ja(l, !!e, t, !1) : a != null && Ja(l, !!e, a, !0));
        return;
      case "textarea":
        (Z("invalid", l), (n = u = e = null));
        for (i in a)
          if (a.hasOwnProperty(i) && ((c = a[i]), c != null))
            switch (i) {
              case "value":
                e = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(v(91));
                break;
              default:
                nl(l, t, i, c, a, null);
            }
        qf(l, e, u, n);
        return;
      case "option":
        for (f in a)
          if (a.hasOwnProperty(f) && ((e = a[f]), e != null))
            switch (f) {
              case "selected":
                l.selected =
                  e && typeof e != "function" && typeof e != "symbol";
                break;
              default:
                nl(l, t, f, e, a, null);
            }
        return;
      case "dialog":
        (Z("beforetoggle", l), Z("toggle", l), Z("cancel", l), Z("close", l));
        break;
      case "iframe":
      case "object":
        Z("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < su.length; e++) Z(su[e], l);
        break;
      case "image":
        (Z("error", l), Z("load", l));
        break;
      case "details":
        Z("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        (Z("error", l), Z("load", l));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (r in a)
          if (a.hasOwnProperty(r) && ((e = a[r]), e != null))
            switch (r) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(v(137, t));
              default:
                nl(l, t, r, e, a, null);
            }
        return;
      default:
        if (li(t)) {
          for (g in a)
            a.hasOwnProperty(g) &&
              ((e = a[g]), e !== void 0 && Xc(l, t, g, e, a, void 0));
          return;
        }
    }
    for (c in a)
      a.hasOwnProperty(c) && ((e = a[c]), e != null && nl(l, t, c, e, a, null));
  }
  function zr(l, t, a, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          i = null,
          c = null,
          f = null,
          r = null,
          g = null;
        for (y in a) {
          var z = a[y];
          if (a.hasOwnProperty(y) && z != null)
            switch (y) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = z;
              default:
                e.hasOwnProperty(y) || nl(l, t, y, null, e, z);
            }
        }
        for (var h in e) {
          var y = e[h];
          if (((z = a[h]), e.hasOwnProperty(h) && (y != null || z != null)))
            switch (h) {
              case "type":
                n = y;
                break;
              case "name":
                u = y;
                break;
              case "checked":
                r = y;
                break;
              case "defaultChecked":
                g = y;
                break;
              case "value":
                i = y;
                break;
              case "defaultValue":
                c = y;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(v(137, t));
                break;
              default:
                y !== z && nl(l, t, h, y, e, z);
            }
        }
        In(l, i, c, f, r, g, n, u);
        return;
      case "select":
        y = i = c = h = null;
        for (n in a)
          if (((f = a[n]), a.hasOwnProperty(n) && f != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                y = f;
              default:
                e.hasOwnProperty(n) || nl(l, t, n, null, e, f);
            }
        for (u in e)
          if (
            ((n = e[u]),
            (f = a[u]),
            e.hasOwnProperty(u) && (n != null || f != null))
          )
            switch (u) {
              case "value":
                h = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== f && nl(l, t, u, n, e, f);
            }
        ((t = c),
          (a = i),
          (e = y),
          h != null
            ? Ja(l, !!a, h, !1)
            : !!e != !!a &&
              (t != null ? Ja(l, !!a, t, !0) : Ja(l, !!a, a ? [] : "", !1)));
        return;
      case "textarea":
        y = h = null;
        for (c in a)
          if (
            ((u = a[c]),
            a.hasOwnProperty(c) && u != null && !e.hasOwnProperty(c))
          )
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                nl(l, t, c, null, e, u);
            }
        for (i in e)
          if (
            ((u = e[i]),
            (n = a[i]),
            e.hasOwnProperty(i) && (u != null || n != null))
          )
            switch (i) {
              case "value":
                h = u;
                break;
              case "defaultValue":
                y = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(v(91));
                break;
              default:
                u !== n && nl(l, t, i, u, e, n);
            }
        Rf(l, h, y);
        return;
      case "option":
        for (var O in a)
          if (
            ((h = a[O]),
            a.hasOwnProperty(O) && h != null && !e.hasOwnProperty(O))
          )
            switch (O) {
              case "selected":
                l.selected = !1;
                break;
              default:
                nl(l, t, O, null, e, h);
            }
        for (f in e)
          if (
            ((h = e[f]),
            (y = a[f]),
            e.hasOwnProperty(f) && h !== y && (h != null || y != null))
          )
            switch (f) {
              case "selected":
                l.selected =
                  h && typeof h != "function" && typeof h != "symbol";
                break;
              default:
                nl(l, t, f, h, e, y);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var j in a)
          ((h = a[j]),
            a.hasOwnProperty(j) &&
              h != null &&
              !e.hasOwnProperty(j) &&
              nl(l, t, j, null, e, h));
        for (r in e)
          if (
            ((h = e[r]),
            (y = a[r]),
            e.hasOwnProperty(r) && h !== y && (h != null || y != null))
          )
            switch (r) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(v(137, t));
                break;
              default:
                nl(l, t, r, h, e, y);
            }
        return;
      default:
        if (li(t)) {
          for (var il in a)
            ((h = a[il]),
              a.hasOwnProperty(il) &&
                h !== void 0 &&
                !e.hasOwnProperty(il) &&
                Xc(l, t, il, void 0, e, h));
          for (g in e)
            ((h = e[g]),
              (y = a[g]),
              !e.hasOwnProperty(g) ||
                h === y ||
                (h === void 0 && y === void 0) ||
                Xc(l, t, g, h, e, y));
          return;
        }
    }
    for (var o in a)
      ((h = a[o]),
        a.hasOwnProperty(o) &&
          h != null &&
          !e.hasOwnProperty(o) &&
          nl(l, t, o, null, e, h));
    for (z in e)
      ((h = e[z]),
        (y = a[z]),
        !e.hasOwnProperty(z) ||
          h === y ||
          (h == null && y == null) ||
          nl(l, t, z, h, e, y));
  }
  function Y0(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Tr() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, a = performance.getEntriesByType("resource"), e = 0;
        e < a.length;
        e++
      ) {
        var u = a[e],
          n = u.transferSize,
          i = u.initiatorType,
          c = u.duration;
        if (n && c && Y0(i)) {
          for (i = 0, c = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e],
              r = f.startTime;
            if (r > c) break;
            var g = f.transferSize,
              z = f.initiatorType;
            g &&
              Y0(z) &&
              ((f = f.responseEnd), (i += g * (f < c ? 1 : (c - r) / (f - r))));
          }
          if ((--e, (t += (8 * (n + i)) / (u.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Qc = null,
    Zc = null;
  function _n(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function G0(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function X0(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Lc(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Vc = null;
  function Er() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === Vc
        ? !1
        : ((Vc = l), !0)
      : ((Vc = null), !1);
  }
  var Q0 = typeof setTimeout == "function" ? setTimeout : void 0,
    Ar = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Z0 = typeof Promise == "function" ? Promise : void 0,
    xr =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Z0 < "u"
          ? function (l) {
              return Z0.resolve(null).then(l).catch(_r);
            }
          : Q0;
  function _r(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function va(l) {
    return l === "head";
  }
  function L0(l, t) {
    var a = t,
      e = 0;
    do {
      var u = a.nextSibling;
      if ((l.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$" || a === "/&")) {
          if (e === 0) {
            (l.removeChild(u), Ae(t));
            return;
          }
          e--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          e++;
        else if (a === "html") ou(l.ownerDocument.documentElement);
        else if (a === "head") {
          ((a = l.ownerDocument.head), ou(a));
          for (var n = a.firstChild; n; ) {
            var i = n.nextSibling,
              c = n.nodeName;
            (n[Ne] ||
              c === "SCRIPT" ||
              c === "STYLE" ||
              (c === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(n),
              (n = i));
          }
        } else a === "body" && ou(l.ownerDocument.body);
      a = u;
    } while (a);
    Ae(t);
  }
  function V0(l, t) {
    var a = l;
    l = 0;
    do {
      var e = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        e && e.nodeType === 8)
      )
        if (((a = e.data), a === "/$")) {
          if (l === 0) break;
          l--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || l++;
      a = e;
    } while (a);
  }
  function Kc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Kc(a), Fn(a));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function Or(l, t, a, e) {
    for (; l.nodeType === 1; ) {
      var u = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!e && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (e) {
        if (!l[Ne])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                l.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                l.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                l.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  l.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  l.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = ht(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function Mr(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !a) ||
        ((l = ht(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function K0(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = ht(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Jc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function wc(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function Nr(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading") t();
    else {
      var e = function () {
        (t(), a.removeEventListener("DOMContentLoaded", e));
      };
      (a.addEventListener("DOMContentLoaded", e), (l._reactRetry = e));
    }
  }
  function ht(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var kc = null;
  function J0(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return ht(l.nextSibling);
          t--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function w0(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else (a !== "/$" && a !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function k0(l, t, a) {
    switch (((t = _n(a)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(v(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(v(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(v(454));
        return l;
      default:
        throw Error(v(451));
    }
  }
  function ou(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    Fn(l);
  }
  var yt = new Map(),
    W0 = new Set();
  function On(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var wt = x.d;
  x.d = { f: Dr, r: Ur, D: jr, C: Hr, L: Rr, m: qr, X: Br, S: Cr, M: Yr };
  function Dr() {
    var l = wt.f(),
      t = bn();
    return l || t;
  }
  function Ur(l) {
    var t = La(l);
    t !== null && t.tag === 5 && t.type === "form" ? md(t) : wt.r(l);
  }
  var ze = typeof document > "u" ? null : document;
  function F0(l, t, a) {
    var e = ze;
    if (e && typeof t == "string" && t) {
      var u = ft(t);
      ((u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        W0.has(u) ||
          (W0.add(u),
          (l = { rel: l, crossOrigin: a, href: t }),
          e.querySelector(u) === null &&
            ((t = e.createElement("link")),
            Dl(t, "link", l),
            Al(t),
            e.head.appendChild(t))));
    }
  }
  function jr(l) {
    (wt.D(l), F0("dns-prefetch", l, null));
  }
  function Hr(l, t) {
    (wt.C(l, t), F0("preconnect", l, t));
  }
  function Rr(l, t, a) {
    wt.L(l, t, a);
    var e = ze;
    if (e && l && t) {
      var u = 'link[rel="preload"][as="' + ft(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + ft(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + ft(a.imageSizes) + '"]'))
        : (u += '[href="' + ft(l) + '"]');
      var n = u;
      switch (t) {
        case "style":
          n = Te(l);
          break;
        case "script":
          n = Ee(l);
      }
      yt.has(n) ||
        ((l = H(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : l,
            as: t,
          },
          a,
        )),
        yt.set(n, l),
        e.querySelector(u) !== null ||
          (t === "style" && e.querySelector(mu(n))) ||
          (t === "script" && e.querySelector(ru(n))) ||
          ((t = e.createElement("link")),
          Dl(t, "link", l),
          Al(t),
          e.head.appendChild(t)));
    }
  }
  function qr(l, t) {
    wt.m(l, t);
    var a = ze;
    if (a && l) {
      var e = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + ft(e) + '"][href="' + ft(l) + '"]',
        n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ee(l);
      }
      if (
        !yt.has(n) &&
        ((l = H({ rel: "modulepreload", href: l }, t)),
        yt.set(n, l),
        a.querySelector(u) === null)
      ) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(ru(n))) return;
        }
        ((e = a.createElement("link")),
          Dl(e, "link", l),
          Al(e),
          a.head.appendChild(e));
      }
    }
  }
  function Cr(l, t, a) {
    wt.S(l, t, a);
    var e = ze;
    if (e && l) {
      var u = Va(e).hoistableStyles,
        n = Te(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if ((i = e.querySelector(mu(n)))) c.loading = 5;
        else {
          ((l = H({ rel: "stylesheet", href: l, "data-precedence": t }, a)),
            (a = yt.get(n)) && Wc(l, a));
          var f = (i = e.createElement("link"));
          (Al(f),
            Dl(f, "link", l),
            (f._p = new Promise(function (r, g) {
              ((f.onload = r), (f.onerror = g));
            })),
            f.addEventListener("load", function () {
              c.loading |= 1;
            }),
            f.addEventListener("error", function () {
              c.loading |= 2;
            }),
            (c.loading |= 4),
            Mn(i, t, e));
        }
        ((i = { type: "stylesheet", instance: i, count: 1, state: c }),
          u.set(n, i));
      }
    }
  }
  function Br(l, t) {
    wt.X(l, t);
    var a = ze;
    if (a && l) {
      var e = Va(a).hoistableScripts,
        u = Ee(l),
        n = e.get(u);
      n ||
        ((n = a.querySelector(ru(u))),
        n ||
          ((l = H({ src: l, async: !0 }, t)),
          (t = yt.get(u)) && Fc(l, t),
          (n = a.createElement("script")),
          Al(n),
          Dl(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function Yr(l, t) {
    wt.M(l, t);
    var a = ze;
    if (a && l) {
      var e = Va(a).hoistableScripts,
        u = Ee(l),
        n = e.get(u);
      n ||
        ((n = a.querySelector(ru(u))),
        n ||
          ((l = H({ src: l, async: !0, type: "module" }, t)),
          (t = yt.get(u)) && Fc(l, t),
          (n = a.createElement("script")),
          Al(n),
          Dl(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function $0(l, t, a, e) {
    var u = (u = X.current) ? On(u) : null;
    if (!u) throw Error(v(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = Te(a.href)),
            (a = Va(u).hoistableStyles),
            (e = a.get(t)),
            e ||
              ((e = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, e)),
            e)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          l = Te(a.href);
          var n = Va(u).hoistableStyles,
            i = n.get(l);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, i),
              (n = u.querySelector(mu(l))) &&
                !n._p &&
                ((i.instance = n), (i.state.loading = 5)),
              yt.has(l) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                yt.set(l, a),
                n || Gr(u, l, a, i.state))),
            t && e === null)
          )
            throw Error(v(528, ""));
          return i;
        }
        if (t && e !== null) throw Error(v(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ee(a)),
              (a = Va(u).hoistableScripts),
              (e = a.get(t)),
              e ||
                ((e = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, e)),
              e)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(v(444, l));
    }
  }
  function Te(l) {
    return 'href="' + ft(l) + '"';
  }
  function mu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function I0(l) {
    return H({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Gr(l, t, a, e) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (e.loading = 1)
      : ((t = l.createElement("link")),
        (e.preload = t),
        t.addEventListener("load", function () {
          return (e.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (e.loading |= 2);
        }),
        Dl(t, "link", a),
        Al(t),
        l.head.appendChild(t));
  }
  function Ee(l) {
    return '[src="' + ft(l) + '"]';
  }
  function ru(l) {
    return "script[async]" + l;
  }
  function P0(l, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var e = l.querySelector('style[data-href~="' + ft(a.href) + '"]');
          if (e) return ((t.instance = e), Al(e), e);
          var u = H({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (e = (l.ownerDocument || l).createElement("style")),
            Al(e),
            Dl(e, "style", u),
            Mn(e, a.precedence, l),
            (t.instance = e)
          );
        case "stylesheet":
          u = Te(a.href);
          var n = l.querySelector(mu(u));
          if (n) return ((t.state.loading |= 4), (t.instance = n), Al(n), n);
          ((e = I0(a)),
            (u = yt.get(u)) && Wc(e, u),
            (n = (l.ownerDocument || l).createElement("link")),
            Al(n));
          var i = n;
          return (
            (i._p = new Promise(function (c, f) {
              ((i.onload = c), (i.onerror = f));
            })),
            Dl(n, "link", e),
            (t.state.loading |= 4),
            Mn(n, a.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Ee(a.src)),
            (u = l.querySelector(ru(n)))
              ? ((t.instance = u), Al(u), u)
              : ((e = a),
                (u = yt.get(n)) && ((e = H({}, a)), Fc(e, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement("script")),
                Al(u),
                Dl(u, "link", e),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(v(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((e = t.instance), (t.state.loading |= 4), Mn(e, a.precedence, l));
    return t.instance;
  }
  function Mn(l, t, a) {
    for (
      var e = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = e.length ? e[e.length - 1] : null,
        n = u,
        i = 0;
      i < e.length;
      i++
    ) {
      var c = e[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(l, t.firstChild));
  }
  function Wc(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function Fc(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var Nn = null;
  function lo(l, t, a) {
    if (Nn === null) {
      var e = new Map(),
        u = (Nn = new Map());
      u.set(a, e);
    } else ((u = Nn), (e = u.get(a)), e || ((e = new Map()), u.set(a, e)));
    if (e.has(l)) return e;
    for (
      e.set(l, null), a = a.getElementsByTagName(l), u = 0;
      u < a.length;
      u++
    ) {
      var n = a[u];
      if (
        !(
          n[Ne] ||
          n[_l] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = e.get(i);
        c ? c.push(n) : e.set(i, [n]);
      }
    }
    return e;
  }
  function to(l, t, a) {
    ((l = l.ownerDocument || l),
      l.head.insertBefore(
        a,
        t === "title" ? l.querySelector("head > title") : null,
      ));
  }
  function Xr(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (l = t.disabled),
              typeof t.precedence == "string" && l == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ao(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Qr(l, t, a, e) {
    if (
      a.type === "stylesheet" &&
      (typeof e.media != "string" || matchMedia(e.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = Te(e.href),
          n = t.querySelector(mu(u));
        if (n) {
          ((t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = Dn.bind(l)), t.then(l, l)),
            (a.state.loading |= 4),
            (a.instance = n),
            Al(n));
          return;
        }
        ((n = t.ownerDocument || t),
          (e = I0(e)),
          (u = yt.get(u)) && Wc(e, u),
          (n = n.createElement("link")),
          Al(n));
        var i = n;
        ((i._p = new Promise(function (c, f) {
          ((i.onload = c), (i.onerror = f));
        })),
          Dl(n, "link", e),
          (a.instance = n));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (l.count++,
          (a = Dn.bind(l)),
          t.addEventListener("load", a),
          t.addEventListener("error", a)));
    }
  }
  var $c = 0;
  function Zr(l, t) {
    return (
      l.stylesheets && l.count === 0 && jn(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (a) {
            var e = setTimeout(function () {
              if ((l.stylesheets && jn(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                ((l.unsuspend = null), n());
              }
            }, 6e4 + t);
            0 < l.imgBytes && $c === 0 && ($c = 62500 * Tr());
            var u = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 &&
                    (l.stylesheets && jn(l, l.stylesheets), l.unsuspend))
                ) {
                  var n = l.unsuspend;
                  ((l.unsuspend = null), n());
                }
              },
              (l.imgBytes > $c ? 50 : 800) + t,
            );
            return (
              (l.unsuspend = a),
              function () {
                ((l.unsuspend = null), clearTimeout(e), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Dn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) jn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        ((this.unsuspend = null), l());
      }
    }
  }
  var Un = null;
  function jn(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Un = new Map()),
        t.forEach(Lr, l),
        (Un = null),
        Dn.call(l)));
  }
  function Lr(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Un.get(l);
      if (a) var e = a.get(null);
      else {
        ((a = new Map()), Un.set(l, a));
        for (
          var u = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
            (a.set(i.dataset.precedence, i), (e = i));
        }
        e && a.set(null, e);
      }
      ((u = t.instance),
        (i = u.getAttribute("data-precedence")),
        (n = a.get(i) || e),
        n === e && a.set(null, u),
        a.set(i, u),
        this.count++,
        (e = Dn.bind(this)),
        u.addEventListener("load", e),
        u.addEventListener("error", e),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(u, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var vu = {
    $$typeof: Ul,
    Provider: null,
    Consumer: null,
    _currentValue: R,
    _currentValue2: R,
    _threadCount: 0,
  };
  function Vr(l, t, a, e, u, n, i, c, f) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Jn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Jn(0)),
      (this.hiddenUpdates = Jn(null)),
      (this.identifierPrefix = e),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map()));
  }
  function eo(l, t, a, e, u, n, i, c, f, r, g, z) {
    return (
      (l = new Vr(l, t, a, i, f, r, g, z, c)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = lt(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Di()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: e, isDehydrated: a, cache: t }),
      Ri(n),
      l
    );
  }
  function uo(l) {
    return l ? ((l = le), l) : le;
  }
  function no(l, t, a, e, u, n) {
    ((u = uo(u)),
      e.context === null ? (e.context = u) : (e.pendingContext = u),
      (e = ea(t)),
      (e.payload = { element: a }),
      (n = n === void 0 ? null : n),
      n !== null && (e.callback = n),
      (a = ua(l, e, t)),
      a !== null && (wl(a, l, t), Je(a, l, t)));
  }
  function io(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Ic(l, t) {
    (io(l, t), (l = l.alternate) && io(l, t));
  }
  function co(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Oa(l, 67108864);
      (t !== null && wl(t, l, 67108864), Ic(l, 67108864));
    }
  }
  function fo(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = nt();
      t = wn(t);
      var a = Oa(l, t);
      (a !== null && wl(a, l, t), Ic(l, t));
    }
  }
  var Hn = !0;
  function Kr(l, t, a, e) {
    var u = b.T;
    b.T = null;
    var n = x.p;
    try {
      ((x.p = 2), Pc(l, t, a, e));
    } finally {
      ((x.p = n), (b.T = u));
    }
  }
  function Jr(l, t, a, e) {
    var u = b.T;
    b.T = null;
    var n = x.p;
    try {
      ((x.p = 8), Pc(l, t, a, e));
    } finally {
      ((x.p = n), (b.T = u));
    }
  }
  function Pc(l, t, a, e) {
    if (Hn) {
      var u = lf(e);
      if (u === null) (Gc(l, t, e, Rn, a), oo(l, e));
      else if (kr(u, l, t, a, e)) e.stopPropagation();
      else if ((oo(l, e), t & 4 && -1 < wr.indexOf(l))) {
        for (; u !== null; ) {
          var n = La(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Ta(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << (31 - Il(i));
                      ((c.entanglements[1] |= f), (i &= ~f));
                    }
                    (Ot(n), (I & 6) === 0 && ((yn = Fl() + 500), fu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((c = Oa(n, 2)), c !== null && wl(c, n, 2), bn(), Ic(n, 2));
            }
          if (((n = lf(e)), n === null && Gc(l, t, e, Rn, a), n === u)) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else Gc(l, t, e, null, a);
    }
  }
  function lf(l) {
    return ((l = ai(l)), tf(l));
  }
  var Rn = null;
  function tf(l) {
    if (((Rn = null), (l = Za(l)), l !== null)) {
      var t = k(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((l = hl(t)), l !== null)) return l;
          l = null;
        } else if (a === 31) {
          if (((l = Hl(t)), l !== null)) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Rn = l), null);
  }
  function so(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (jo()) {
          case gf:
            return 2;
          case bf:
            return 8;
          case Tu:
          case Ho:
            return 32;
          case Sf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var af = !1,
    ha = null,
    ya = null,
    ga = null,
    hu = new Map(),
    yu = new Map(),
    ba = [],
    wr =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function oo(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        ha = null;
        break;
      case "dragenter":
      case "dragleave":
        ya = null;
        break;
      case "mouseover":
      case "mouseout":
        ga = null;
        break;
      case "pointerover":
      case "pointerout":
        hu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yu.delete(t.pointerId);
    }
  }
  function gu(l, t, a, e, u, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: e,
          nativeEvent: n,
          targetContainers: [u],
        }),
        t !== null && ((t = La(t)), t !== null && co(t)),
        l)
      : ((l.eventSystemFlags |= e),
        (t = l.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        l);
  }
  function kr(l, t, a, e, u) {
    switch (t) {
      case "focusin":
        return ((ha = gu(ha, l, t, a, e, u)), !0);
      case "dragenter":
        return ((ya = gu(ya, l, t, a, e, u)), !0);
      case "mouseover":
        return ((ga = gu(ga, l, t, a, e, u)), !0);
      case "pointerover":
        var n = u.pointerId;
        return (hu.set(n, gu(hu.get(n) || null, l, t, a, e, u)), !0);
      case "gotpointercapture":
        return (
          (n = u.pointerId),
          yu.set(n, gu(yu.get(n) || null, l, t, a, e, u)),
          !0
        );
    }
    return !1;
  }
  function mo(l) {
    var t = Za(l.target);
    if (t !== null) {
      var a = k(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = hl(a)), t !== null)) {
            ((l.blockedOn = t),
              xf(l.priority, function () {
                fo(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = Hl(a)), t !== null)) {
            ((l.blockedOn = t),
              xf(l.priority, function () {
                fo(a);
              }));
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function qn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = lf(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var e = new a.constructor(a.type, a);
        ((ti = e), a.target.dispatchEvent(e), (ti = null));
      } else return ((t = La(a)), t !== null && co(t), (l.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function ro(l, t, a) {
    qn(l) && a.delete(t);
  }
  function Wr() {
    ((af = !1),
      ha !== null && qn(ha) && (ha = null),
      ya !== null && qn(ya) && (ya = null),
      ga !== null && qn(ga) && (ga = null),
      hu.forEach(ro),
      yu.forEach(ro));
  }
  function Cn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      af ||
        ((af = !0),
        A.unstable_scheduleCallback(A.unstable_NormalPriority, Wr)));
  }
  var Bn = null;
  function vo(l) {
    Bn !== l &&
      ((Bn = l),
      A.unstable_scheduleCallback(A.unstable_NormalPriority, function () {
        Bn === l && (Bn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t],
            e = l[t + 1],
            u = l[t + 2];
          if (typeof e != "function") {
            if (tf(e || a) === null) continue;
            break;
          }
          var n = La(a);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            lc(n, { pending: !0, data: u, method: a.method, action: e }, e, u));
        }
      }));
  }
  function Ae(l) {
    function t(f) {
      return Cn(f, l);
    }
    (ha !== null && Cn(ha, l),
      ya !== null && Cn(ya, l),
      ga !== null && Cn(ga, l),
      hu.forEach(t),
      yu.forEach(t));
    for (var a = 0; a < ba.length; a++) {
      var e = ba[a];
      e.blockedOn === l && (e.blockedOn = null);
    }
    for (; 0 < ba.length && ((a = ba[0]), a.blockedOn === null); )
      (mo(a), a.blockedOn === null && ba.shift());
    if (((a = (l.ownerDocument || l).$$reactFormReplay), a != null))
      for (e = 0; e < a.length; e += 3) {
        var u = a[e],
          n = a[e + 1],
          i = u[Ql] || null;
        if (typeof n == "function") i || vo(a);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (i = n[Ql] || null))) c = i.formAction;
            else if (tf(u) !== null) continue;
          } else c = i.action;
          (typeof c == "function" ? (a[e + 1] = c) : (a.splice(e, 3), (e -= 3)),
            vo(a));
        }
      }
  }
  function ho() {
    function l(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (i) {
              return (u = i);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (u !== null && (u(), (u = null)), e || setTimeout(a, 20));
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var e = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(a, 100),
        function () {
          ((e = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function ef(l) {
    this._internalRoot = l;
  }
  ((Yn.prototype.render = ef.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(v(409));
      var a = t.current,
        e = nt();
      no(a, e, l, t, null, null);
    }),
    (Yn.prototype.unmount = ef.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (no(l.current, 2, null, l, null, null), bn(), (t[Qa] = null));
        }
      }));
  function Yn(l) {
    this._internalRoot = l;
  }
  Yn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = Af();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < ba.length && t !== 0 && t < ba[a].priority; a++);
      (ba.splice(a, 0, l), a === 0 && mo(l));
    }
  };
  var yo = $.version;
  if (yo !== "19.2.4") throw Error(v(527, yo, "19.2.4"));
  x.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(v(188))
        : ((l = Object.keys(l).join(",")), Error(v(268, l)));
    return (
      (l = E(t)),
      (l = l !== null ? P(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var Fr = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: b,
    reconcilerVersion: "19.2.4",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gn.isDisabled && Gn.supportsFiber)
      try {
        ((_e = Gn.inject(Fr)), ($l = Gn));
      } catch {}
  }
  return (
    (Su.createRoot = function (l, t) {
      if (!Y(l)) throw Error(v(299));
      var a = !1,
        e = "",
        u = Td,
        n = Ed,
        i = Ad;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (e = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = eo(l, 1, !1, null, null, a, e, null, u, n, i, ho)),
        (l[Qa] = t.current),
        Yc(l),
        new ef(t)
      );
    }),
    (Su.hydrateRoot = function (l, t, a) {
      if (!Y(l)) throw Error(v(299));
      var e = !1,
        u = "",
        n = Td,
        i = Ed,
        c = Ad,
        f = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (e = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (i = a.onCaughtError),
          a.onRecoverableError !== void 0 && (c = a.onRecoverableError),
          a.formState !== void 0 && (f = a.formState)),
        (t = eo(l, 1, !0, t, a ?? null, e, u, f, n, i, c, ho)),
        (t.context = uo(null)),
        (a = t.current),
        (e = nt()),
        (e = wn(e)),
        (u = ea(e)),
        (u.callback = null),
        ua(a, u, e),
        (a = e),
        (t.current.lanes = a),
        Me(t, a),
        Ot(t),
        (l[Qa] = t.current),
        Yc(l),
        new Yn(t)
      );
    }),
    (Su.version = "19.2.4"),
    Su
  );
}
var _o;
function cv() {
  if (_o) return cf.exports;
  _o = 1;
  function A() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(A);
      } catch ($) {
        console.error($);
      }
  }
  return (A(), (cf.exports = iv()), cf.exports);
}
var fv = cv();
const sv = Oo(fv),
  dv = () => {
    const [A, $] = pu.useState(!1);
    pu.useEffect(() => {
      const v = () => {
        $(window.scrollY > 20);
      };
      return (
        window.addEventListener("scroll", v),
        () => window.removeEventListener("scroll", v)
      );
    }, []);
    const L = () => {
      document.documentElement.classList.toggle("dark");
    };
    return S.jsx("nav", {
      className: `fixed top-0 w-full z-40 transition-all duration-300 ${A ? "bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md h-16 border-b border-neutral-200 dark:border-neutral-800" : "bg-transparent h-24"}`,
      children: S.jsxs("div", {
        className:
          "max-w-7xl mx-auto px-6 h-full flex items-center justify-between",
        children: [
          S.jsx("a", {
            href: "#",
            className:
              "font-display uppercase text-xl tracking-tighter hover:opacity-70 transition-opacity text-neutral-900 dark:text-white",
            children: "ALEX DEV_",
          }),
          S.jsx("div", {
            className:
              "hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white",
            children: ["About", "Skills", "Projects", "Experience"].map((v) =>
              S.jsxs(
                "a",
                {
                  href: `#${v.toLowerCase()}`,
                  className:
                    "hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors relative group",
                  children: [
                    v,
                    S.jsx("span", {
                      className:
                        "absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all group-hover:w-full",
                    }),
                  ],
                },
                v,
              ),
            ),
          }),
          S.jsx("button", {
            onClick: L,
            className:
              "p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white",
            "aria-label": "Toggle Dark Mode",
            children: S.jsx("span", {
              className: "material-icons-outlined text-sm",
              children: "brightness_4",
            }),
          }),
        ],
      }),
    });
  },
  ov = () =>
    S.jsxs("header", {
      className:
        "relative min-h-screen flex flex-col justify-center items-center bg-background-dark text-white pt-20 px-6 overflow-hidden",
      children: [
        S.jsxs("div", {
          className: "absolute inset-0 opacity-20 pointer-events-none",
          children: [
            S.jsx("img", {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFNxIiiMPhfy3_dS3-JZq7D8dZS-l9oBvA9WX9cz0FSKFLsAOTvqysFngMoFmKjbEZ9dDtS91ljKYRD5cAubQdOwnjWnrqbN0xZWjIwCEHsSA_jj4bDxyVzzxPOanmtZQHlTApKpOMIM4FEmos0AUDkhnkvw9m4UeYAwHuOTreoSQCU3SkxJfUAcqtCO06osrsrcdQTdm2QoNc-G7ZZrSy3XBMtCXw_5UAaRWi6BzXLFlSEWq1wM9o9hpgkhbUIXaChNG97Ru5tVI",
              alt: "Abstract dark geometric shapes",
              className: "w-full h-full object-cover",
            }),
            S.jsx("div", {
              className:
                "absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark",
            }),
          ],
        }),
        S.jsxs("div", {
          className: "relative z-10 text-center space-y-8 max-w-4xl mx-auto",
          children: [
            S.jsx("div", {
              className:
                "inline-block bg-neutral-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border border-neutral-700 animate-fade-in-up",
              children: "Portfolio 2024",
            }),
            S.jsxs("h1", {
              className:
                "font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none",
              children: [
                "Build The",
                S.jsx("br", {}),
                S.jsx("span", {
                  className: "text-neutral-500",
                  children: "Unseen",
                }),
                " Logic",
              ],
            }),
            S.jsx("p", {
              className:
                "font-light text-neutral-400 text-sm md:text-base max-w-lg mx-auto tracking-wide",
              children: "FULL STACK DEVELOPER | MACHINE LEARNING ENTHUSIAST",
            }),
            S.jsxs("div", {
              className: "pt-8 flex justify-center gap-6",
              children: [
                S.jsxs("a", {
                  href: "#",
                  className:
                    "group flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300",
                  children: [
                    S.jsx("span", {
                      className: "text-xs font-bold uppercase tracking-widest",
                      children: "GitHub",
                    }),
                    S.jsx("span", {
                      className:
                        "material-icons-outlined text-sm group-hover:translate-x-1 transition-transform",
                      children: "arrow_forward",
                    }),
                  ],
                }),
                S.jsxs("a", {
                  href: "#",
                  className:
                    "group flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300",
                  children: [
                    S.jsx("span", {
                      className: "text-xs font-bold uppercase tracking-widest",
                      children: "LinkedIn",
                    }),
                    S.jsx("span", {
                      className:
                        "material-icons-outlined text-sm group-hover:translate-x-1 transition-transform",
                      children: "arrow_forward",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        S.jsx("div", {
          className:
            "absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow",
          children: S.jsx("span", {
            className: "material-icons-outlined text-neutral-500",
            children: "arrow_downward",
          }),
        }),
      ],
    }),
  mv = () =>
    S.jsx("section", {
      id: "about",
      className: "py-24 bg-background-light dark:bg-background-dark",
      children: S.jsxs("div", {
        className: "max-w-4xl mx-auto px-6 text-center",
        children: [
          S.jsx("h2", {
            className:
              "font-display text-3xl md:text-5xl uppercase tracking-tight mb-8",
            children: "Engineer The Confidence",
          }),
          S.jsxs("div", {
            className:
              "relative w-full aspect-video md:aspect-[21/9] bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden mb-12 shadow-2xl group",
            children: [
              S.jsx("img", {
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhVWnA-1g3AeBewpGXhWk4r_7mBoRFB1GSV8Qq05V5cl-bL990piKrRTqVZeUQyB99NHk-AKf4Mqta0XAWwQLv-hgOmtQFalTqUjwsZ7cagyYbs3J7MsjNwzp-Ps16OAcVfcI3X1lMydlRkuPxid9kaZ1gYYkFcK9nnI8gJaBynnz4W9G_b01qbkN_mmRwxE_SGfWPcs8ld8oXrQ4eSs982IEY2c3GpBkVciChCU5R6PT2igy4lw5KbL2fg8b8NNZ06IGT7CVE0OE",
                alt: "Coding environment",
                className:
                  "w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700",
              }),
              S.jsx("div", {
                className:
                  "absolute inset-0 flex items-center justify-center pointer-events-none",
                children: S.jsx("div", {
                  className:
                    "bg-black/80 backdrop-blur-md px-8 py-4 border border-white/10 rounded-full transform group-hover:-translate-y-2 transition-transform duration-500",
                  children: S.jsx("p", {
                    className: "text-white font-mono text-xs md:text-sm",
                    children: "HELLO_WORLD.py",
                  }),
                }),
              }),
            ],
          }),
          S.jsx("p", {
            className:
              "text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto",
            children:
              '"...one of the few developers who bridges the gap between complex backend logic and seamless frontend experiences. Focused on scalability and user-centric architecture."',
          }),
          S.jsx("div", {
            className: "mt-8 flex justify-center",
            children: S.jsx("div", {
              className:
                "text-xs font-bold uppercase tracking-widest text-neutral-400",
              children: "Based in San Francisco",
            }),
          }),
        ],
      }),
    }),
  of = ({ icon: A, title: $, skills: L }) =>
    S.jsxs("div", {
      className: "group",
      children: [
        S.jsx("div", {
          className:
            "w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300",
          children: S.jsx("span", {
            className: "material-icons-outlined text-4xl",
            children: A,
          }),
        }),
        S.jsx("h3", {
          className: "font-display text-xl uppercase mb-4",
          children: $,
        }),
        S.jsx("div", {
          className: "flex flex-wrap justify-center gap-2",
          children: L.map((v) =>
            S.jsx(
              "span",
              {
                className:
                  "px-3 py-1 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors",
                children: v,
              },
              v,
            ),
          ),
        }),
      ],
    }),
  rv = () =>
    S.jsx("section", {
      id: "skills",
      className:
        "py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 transition-colors duration-500",
      children: S.jsxs("div", {
        className: "max-w-6xl mx-auto px-6",
        children: [
          S.jsxs("div", {
            className: "text-center mb-16",
            children: [
              S.jsx("h2", {
                className:
                  "font-display text-4xl uppercase tracking-tighter mb-4",
                children: "Complexity Made Simple",
              }),
              S.jsx("div", {
                className:
                  "w-24 h-[1px] bg-neutral-300 dark:bg-neutral-700 mx-auto",
              }),
              S.jsx("p", {
                className:
                  "mt-4 text-neutral-500 text-sm uppercase tracking-wider",
                children: "The tech stack defining my work",
              }),
            ],
          }),
          S.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-center",
            children: [
              S.jsx(of, {
                icon: "code",
                title: "Languages",
                skills: ["Python", "JavaScript/TS", "Rust", "SQL"],
              }),
              S.jsx(of, {
                icon: "layers",
                title: "Frameworks",
                skills: ["React / Next.js", "Django", "FastAPI", "Tailwind"],
              }),
              S.jsx(of, {
                icon: "psychology",
                title: "ML & Tools",
                skills: ["PyTorch", "TensorFlow", "Docker", "AWS"],
              }),
            ],
          }),
        ],
      }),
    }),
  mf = ({
    title: A,
    subtitle: $,
    description: L,
    image: v,
    linkText: Y,
    linkUrl: k,
  }) =>
    S.jsxs("article", {
      className:
        "relative group rounded-3xl overflow-hidden shadow-2xl bg-neutral-900",
      children: [
        S.jsx("div", {
          className: "aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden",
          children: S.jsx("img", {
            src: v,
            alt: A,
            className:
              "w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700",
          }),
        }),
        S.jsx("div", {
          className:
            "absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black via-black/50 to-transparent",
          children: S.jsxs("div", {
            className: "md:flex justify-between items-end",
            children: [
              S.jsxs("div", {
                className: "mb-6 md:mb-0",
                children: [
                  S.jsx("h3", {
                    className:
                      "text-white font-display text-3xl md:text-5xl uppercase mb-2",
                    children: A,
                  }),
                  S.jsx("p", {
                    className:
                      "text-neutral-400 text-xs uppercase tracking-widest",
                    children: $,
                  }),
                ],
              }),
              S.jsxs("div", {
                className: "max-w-md",
                children: [
                  S.jsx("p", {
                    className: "text-neutral-300 text-sm leading-relaxed mb-6",
                    children: L,
                  }),
                  S.jsxs("a", {
                    href: k,
                    className:
                      "inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors",
                    children: [
                      Y,
                      " ",
                      S.jsx("span", {
                        className: "material-icons-outlined ml-2 text-sm",
                        children: "arrow_forward",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  vv = () =>
    S.jsxs("section", {
      id: "projects",
      className: "bg-background-dark py-24 px-4 md:px-0",
      children: [
        S.jsx("div", {
          className: "max-w-7xl mx-auto mb-16 px-6 text-center",
          children: S.jsx("h2", {
            className:
              "text-white font-display text-4xl uppercase tracking-wider",
            children: "Featured Works",
          }),
        }),
        S.jsxs("div", {
          className: "space-y-16 max-w-6xl mx-auto",
          children: [
            S.jsx(mf, {
              title: "FinTech Analytics",
              subtitle: "SaaS Dashboard | React & Python",
              description:
                "A high-performance financial data visualization platform processing millions of transaction rows in real-time. Built with a specialized focus on accessibility and data density.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB00xZXZcvLPv3PpqhMp-DbezZPN6Qti4YE4GF3mjjWt6DmLsMxDfS3SyMKAWoLJvIWuwA9H9rsI5GD9uGnYoo_sFYTpDLl9XDmy6iF8mcRhQq5tmPJGI25kCyZyhxO-sBP29jwD9GzeTf2grskP0RPnzT_VzFzkeDCuTz8Y5s_9Ur7B0hChHMOH9zU3Wp_etf4Gy79icWLMoS-ulOcVVq6rqIe6ycmkImwUqrExN2CPL7Y0lVn-BHJDkhtsdOQz8ZAuTmehnjZrN0",
              linkText: "View Case Study",
              linkUrl: "#",
            }),
            S.jsx(mf, {
              title: "Sentinel AI",
              subtitle: "Security | TensorFlow & Rust",
              description:
                "An anomaly detection system for network traffic. Utilizes unsupervised learning to identify potential security threats without prior labeling, reducing false positives by 40%.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBt39sp0mfEqrujonKHwS_ybLXF5DtaalZC9YAEfurP9p6nxcZ5F0Egm4G17Q_iHG6aBfG1LpxMM1Tyc5e20gzT6PNWNaSbupFzSekA3ZOmoIUG0pzMRZ62RmUMIqP9Qj00mug3ByULKV8lOVeUlh2mK19N7OjJR3kMMa8_BC1XuLOFzuYYd7r2KWbWgT1PrxK-Mqh-1UZR9-yVdRYgd-oqwah5inf2SQ3K59gKcwARmkId_GWqQZ_CquF_kA9hH3rs2GJVkSyG0Q4",
              linkText: "View GitHub",
              linkUrl: "#",
            }),
            S.jsx(mf, {
              title: "Project Vision",
              subtitle: "AR Experience | Three.js & WebGL",
              description:
                "A web-based Augmented Reality museum experience. Allows users to interact with 3D artifacts directly in the browser without installing external applications.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD9juggdBd_Ve39JSd2eraU3qOWiobUiSHXWAXme6vb_OGEq0Of6DfpjcxlHP8hX-yWMF0AeInIlsk5AUN97r1XpC4SW16VsEq3N-lunjx18ZiA3BwOpLdgYBvog7pVBbdKYrnKj64YGnwu_V9wMNYPlup9jck2ifnmcQ2PM3H3ozeR-vDZRXN0xiqPbfGIXJQ6LhSeTedSkDU5mHTGrW2MnOcxw3FiUG0OuQ-q-sxx3thrqgHkO7stkaoe7S6QVeinp2MRWK7us6A",
              linkText: "Launch Demo",
              linkUrl: "#",
            }),
          ],
        }),
      ],
    }),
  rf = ({ role: A, period: $, company: L, description: v, isLatest: Y }) =>
    S.jsxs("div", {
      className: "relative pl-8 md:pl-12",
      children: [
        S.jsx("div", {
          className: `absolute -left-[5px] top-2 w-3 h-3 rounded-full border-2 border-white dark:border-background-dark ${Y ? "bg-primary" : "bg-neutral-400 dark:bg-neutral-600"}`,
        }),
        S.jsxs("div", {
          className:
            "flex flex-col md:flex-row md:justify-between md:items-baseline mb-2",
          children: [
            S.jsx("h3", {
              className: "font-display text-xl uppercase",
              children: A,
            }),
            S.jsx("span", {
              className: "text-xs font-mono text-neutral-500",
              children: $,
            }),
          ],
        }),
        S.jsx("div", {
          className:
            "mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300",
          children: L,
        }),
        S.jsx("p", {
          className:
            "text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl",
          children: v,
        }),
      ],
    }),
  hv = () =>
    S.jsx("section", {
      id: "experience",
      className:
        "py-24 bg-background-light dark:bg-background-dark transition-colors duration-500",
      children: S.jsxs("div", {
        className: "max-w-4xl mx-auto px-6",
        children: [
          S.jsxs("div", {
            className: "text-center mb-16",
            children: [
              S.jsx("h2", {
                className:
                  "font-display text-4xl uppercase tracking-tighter mb-4",
                children: "The Journey",
              }),
              S.jsx("div", {
                className: "w-24 h-[1px] bg-neutral-900 dark:bg-white mx-auto",
              }),
            ],
          }),
          S.jsxs("div", {
            className:
              "relative border-l border-neutral-300 dark:border-neutral-700 ml-3 md:ml-0 space-y-12",
            children: [
              S.jsx(rf, {
                role: "Senior Full Stack Eng.",
                period: "2021 - Present",
                company: "TechFlow Systems",
                description:
                  "Leading the core infrastructure team. Migrated legacy monolithic architecture to microservices using Go and gRPC, improving system throughput by 300%. Mentoring 4 junior developers.",
                isLatest: !0,
              }),
              S.jsx(rf, {
                role: "Frontend Developer",
                period: "2019 - 2021",
                company: "Creative Agency X",
                description:
                  "Developed award-winning interactive websites for Fortune 500 clients. Specialized in WebGL animations and optimizing render performance for mobile devices.",
              }),
              S.jsx(rf, {
                role: "Machine Learning Intern",
                period: "2018",
                company: "DataCorp",
                description:
                  "Assisted in training NLP models for customer sentiment analysis. Cleaned large datasets and implemented data pipelines using Python Pandas.",
              }),
            ],
          }),
        ],
      }),
    }),
  yv = () =>
    S.jsx("footer", {
      className:
        "bg-background-light dark:bg-background-dark pt-24 pb-12 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500",
      children: S.jsxs("div", {
        className: "max-w-4xl mx-auto px-6 text-center",
        children: [
          S.jsx("p", {
            className:
              "text-neutral-500 text-sm uppercase tracking-widest mb-4",
            children: "Want to know more?",
          }),
          S.jsx("h2", {
            className:
              "font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12",
            children: "Let's Chat!",
          }),
          S.jsx("a", {
            href: "mailto:hello@example.com",
            className:
              "inline-block bg-primary text-white dark:text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-lg",
            children: "Contact Me",
          }),
          S.jsxs("div", {
            className:
              "mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest",
            children: [
              S.jsx("div", {
                className: "mb-4 md:mb-0",
                children: "© 2024 Alex Dev.",
              }),
              S.jsxs("div", {
                className: "flex space-x-6",
                children: [
                  S.jsx("a", {
                    href: "#",
                    className:
                      "hover:text-black dark:hover:text-white transition-colors",
                    children: "Twitter",
                  }),
                  S.jsx("a", {
                    href: "#",
                    className:
                      "hover:text-black dark:hover:text-white transition-colors",
                    children: "Instagram",
                  }),
                  S.jsx("a", {
                    href: "#",
                    className:
                      "hover:text-black dark:hover:text-white transition-colors",
                    children: "Dribbble",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  gv = () => {
    const [A, $] = pu.useState(!1);
    return (
      pu.useEffect(() => {
        ($(!0),
          window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches &&
            document.documentElement.classList.add("dark"));
      }, []),
      A
        ? S.jsxs("div", {
            className: "relative min-h-screen",
            children: [
              S.jsx("div", { className: "grain-overlay" }),
              S.jsx(dv, {}),
              S.jsxs("main", {
                children: [
                  S.jsx(ov, {}),
                  S.jsx("div", {
                    className:
                      "w-full h-24 bg-background-light dark:bg-background-dark flex justify-center items-center overflow-hidden",
                    children: S.jsx("div", {
                      className:
                        "h-full w-[1px] bg-neutral-300 dark:bg-neutral-800 relative",
                      children: S.jsx("div", {
                        className:
                          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-neutral-900 dark:border-white bg-transparent",
                      }),
                    }),
                  }),
                  S.jsx(mv, {}),
                  S.jsx(rv, {}),
                  S.jsx("div", {
                    className:
                      "flex justify-center bg-background-light dark:bg-background-dark py-12",
                    children: S.jsxs("div", {
                      className: "flex space-x-2",
                      children: [
                        S.jsx("div", {
                          className:
                            "h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600",
                        }),
                        S.jsx("div", {
                          className:
                            "h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600",
                        }),
                        S.jsx("div", {
                          className:
                            "h-12 w-[1px] bg-neutral-400 dark:bg-neutral-600",
                        }),
                      ],
                    }),
                  }),
                  S.jsx(vv, {}),
                  S.jsx(hv, {}),
                ],
              }),
              S.jsx(yv, {}),
            ],
          })
        : null
    );
  },
  Mo = document.getElementById("root");
if (!Mo) throw new Error("Could not find root element to mount to");
const bv = sv.createRoot(Mo);
bv.render(S.jsx(tv.StrictMode, { children: S.jsx(gv, {}) }));
