window.mm = window.mm || {};
var mm = window.mm;

$(function() {
    var tape = ['pineapple', 'apples', 'cherries', 'apples', 'bananas', 'cherries', 'pineapple', 'bananas'];

    $('#monkey').click(function() {
        var fruit = tape[Math.floor(Math.random() * tape.length)];
        mm.swap(fruit);
    });

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

    mm.drawTape(tape);
    $('.fruit_large').click(mm.moveTape);
});
