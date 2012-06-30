window.mm = window.mm || {};
var mm = window.mm;

$(function() {
    $('#monkey').click(mm.move);

    var rules = [
        ['pineapple', 'blank', 'apples', 'left', 'sad'],
        ['apples', 'blank', 'apples', 'left', 'sad'],
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

    var tape = ['pineapple', 'apples', 'cherries', 'apples', 'bananas', 'cherries', 'pineapple', 'bananas'];

    mm.drawTape(tape);
    $('.fruit_large').click(mm.moveTape);
});
