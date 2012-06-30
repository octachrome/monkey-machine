/**
 * returns 0, 0.5, or 1
 */
$.easing.triphase = function(t /*, start, end, millis, totalMillis*/) {
    return Math.floor(t * 2) / 2;
};

Function.prototype.bind = function(context) {
    if (arguments.length < 2 && typeof arguments[0] == 'undefined') return this;
    var __method = this;
    var args = $.merge([], arguments);
    args.splice(0, 1);
    return function() {
        var a = $.merge($.merge([], args), arguments);
        return __method.apply(context, a);
    };
};
