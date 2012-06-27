window.mm = window.mm || {};
var mm = window.mm;

mm.FRUIT = ['apples', 'pineapple', 'cherries', 'bananas'];
mm.FACES = ['blank', 'sad', 'angry', 'silly'];
mm.ARROWS = ['left', 'right'];

/**
 * returns 0, 0.5, or 1
 */
$.easing.triphase = function(t /*, start, end, millis, totalMillis*/) {
    return Math.floor(t * 2) / 2;
};
