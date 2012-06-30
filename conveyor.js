window.mm = window.mm || {};
var mm = window.mm;

$(function() {
    var head = null;

    mm.drawTape = function(tape) {
        var headPos = 385;
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

    mm.move = function() {
        var e = $('#monkey');
        if (attached) {
            e = e.add(head);
        }
        e.animate({
            top: down ? '-=150' : '+=150'
        }, 200, flip);
    };

    var swapping = false;

    mm.swap = function(fruit) {
        if (swapping) {
            return;
        }
        swapping = true;

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
            swapping = false;
        });
    };

    mm.moveTape = function() {
        var oldHead = head;
        $('.fruit_large').animate({
            left: '-=120'
        }, 200, function() {
            if (oldHead.is(this)) {
                head = head.next();
            }
        });
    };
});
