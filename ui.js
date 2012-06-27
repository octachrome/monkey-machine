window.mm = window.mm || {};
var mm = window.mm;

$(function() {
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

    var rules = [
        ['pineapple', 'blank', 'apples', 'left', 'sad'],
        ['apples', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad']
    ];

    function drawRules() {
        mm.drawRules(rules);

        $('.rule').click(function() {
            var index = $(this).index();
            mm.editRule(rules[index].slice(), function(rule) {
                rules[index] = rule;
                drawRules();
            });
        });
    }
    drawRules();
});
