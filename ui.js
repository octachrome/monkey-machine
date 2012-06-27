$(function() {
    /**
     * returns 0, 0.5, or 1
     */
    $.easing.triphase = function(t /*, start, end, millis, totalMillis*/) {
        return Math.floor(t * 2) / 2;
    };

    var down = false;
    var attached = false;

    function flip() {
        if (this.id == 'monkey') {
            down = !down;
            if (down) {
                attached = !attached;
            }
        }
    }

    function move() {
        var selector = '#monkey';
        if (attached) {
            selector += ', #fruit';
        }
        $(selector).animate({
            top: down ? '-=120' : '+=120'
        }, 200, 'triphase', flip);
    }

    $(document.body).click(move);

    function editRule() {
        var index = $(this).index();
        $('#x').modal({
            position: [200, 200]
        });
    }

    $('.rule').click(editRule);
});
