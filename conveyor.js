window.ui = window.ui || {};
var ui = window.ui;

$(function() {
    var head = null;

    ui.drawTape = function(tape) {
        var headPos = 185;
        var html = [];
        for (var i = 0; i < tape.length; i++) {
            var fruit = tape[i];
            var left = headPos + i * 120;
            html[html.length] = '<div class="fruit_large ';
            html[html.length] = fruit;
            html[html.length] = '" style="left: ';
            html[html.length] = left;
            html[html.length] = 'px"></div>';
        }
        $('.tape').html(html.join(''));
        head = $('.tape').children(':first-child');
    };

    ui.swap = function(fruit, done) {
        function animateHead() {
            head.animate({
                top: '-=150'
            }, 200)
            .delay(100)
            .queue(function() {
                $(this).attr('class', 'fruit_large ' + fruit);
                $.dequeue(this);
            })
            .delay(100)
            .animate({
                top: '+=150'
            }, 200);
        }

        $('#monkey').animate({
            top: '+=150'
        }, 200)
        .delay(200)
        .queue(function() {
            animateHead();
            $.dequeue(this);
        })
        .animate({
            top: '-=150'
        }, 200)
        .delay(200)
        .animate({
            top: '+=150'
        }, 200)
        .delay(200)
        .animate({
            top: '-=150'
        }, 200, function() {
            done && done();
        });
    };

    ui.moveTape = function(direction, done) {
        var oldHead = head;
        $('.fruit_large').animate({
            left: direction == 'left' ? '-=120' : '+=120'
        }, 200, function() {
            if (oldHead.is(this)) {
                head = direction == 'left' ? head.next() : head.prev();
                done && done();
            }
        });
    };

    ui.drawFace = function(face) {
        $('.face_large').attr('class', 'face_large ' + face);
    };
});
