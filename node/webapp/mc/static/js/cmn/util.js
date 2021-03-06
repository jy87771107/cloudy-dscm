/*! webchat 2016-07-04 version: 1.0.0*/
!function (a) {
    var b = function (a) { };
    a.extend(b.prototype, {
        initialize: function () { },
        getQueryString: function (a) {
            var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"),
                c = window.location.search.substr(1).match(b);
            if (null != c) {
                var d = decodeURIComponent(c[2]);
                return d.replace(/script|%22|%3E|%3C|'|"|>|<|\\/gi, "_"),
                    d
            }
            return null
        },
        isValidNumber: function (a, b, c) {
            if (isNaN(a)) return !1;
            var d = !0;
            return null != b && (d &= a >= b),
                null != c && (d &= c >= a),
                d
        },
        isInteger: function (a) {
            return Math.floor(a) === a
        },
        isPhoneNumber: function (a) {
            return !! /^1\d{10}$/.test(a)
        },
        dateFormat: function (a, b) {
            return Date.prototype.Format = function (a) {
                var b = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    S: this.getMilliseconds()
                };
                /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var c in b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
                return a
            },
                isNaN(a) || "" == a ? "" : 0 > a || a > 99999999999 ? "" : new Date(1e3 * parseInt(a)).Format(b)
        },
        numFormat: function (a, b, c) {
            if (isNaN(a)) return "";
            if (b = b || 2, tmp = a.toString(), len = tmp.length, dot = tmp.indexOf("."), !a && 0 != a) return "";
            if (dot < 0) {
                if (1 == c) return tmp;
                tmp += ".";
                for (var d = 0; b > d; d++) tmp += "0";
                return tmp
            }
            if (len <= dot + b) {
                for (; len <= dot + b; len++) tmp += "0";
                return tmp
            }
            return tmp.substr(0, dot + b + 1)
        },
        numFormatThousand: function (a, b) {
            b = b || ",";
            var c = a + "",
                d = c,
                e = "",
                f = "";
            c.indexOf(".") > 0 && (d = c.substring(0, c.indexOf(".")), e = c.substring(c.indexOf(".")));
            var g = d.length,
                h = g % 3;
            return f = h == g ? d : 0 == h ? d.substring(h).match(/\d{3}/g).join(b) : [d.substr(0, h)].concat(d.substring(h).match(/\d{3}/g)).join(b),
                f + e
        },
        toTimestamp: function (a) {
            var b = Date.parse(new Date(a.replace(/-/g, "/"))) / 1e3;
            return (isNaN(b) || "" == b) && (b = ""),
                b
        },
        showPopupTips: function (b, c, d) {
            c = c || 3e3;

            var e = a(
                '<div class="m-popupTips">' +
                '    <div class="u-tips">' +
                "        <strong>" + b + "</strong>" +
                "    </div>" +
                "</div>")
                .appendTo(document.body).addClass("animation-fadeIn").show();

            setTimeout(function () {
                e.addClass("animation-fadeOut");
                setTimeout(function () { e.remove() }, 500);
                d && "function" == typeof d && d()
            }, c)
        }
    });
    var c = new b;
    window.util = c
} ($);