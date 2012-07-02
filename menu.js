window.ui = window.ui || {};
var ui = window.ui;

$(function() {
    var puzzle = {
        title: "APPLE UPGRADE",
        desc: "Swap all the apples for pineapples",
        tape: ['bananas', 'apples', 'cherries', 'apples', 'apples', 'bananas', 'cherries']
    };

    ui.drawMenu = function(puzzle) {
        $('.title').html(puzzle.title);
        $('.desc').html(puzzle.desc);
        var html = [];
        var offset = (800 - puzzle.tape.length * 100) / 2 - 10;
        for (var i = 0; i < puzzle.tape.length; i++) {
            var fruit = puzzle.tape[i];
            html[html.length] = '<div class="fruit_large ';
            html[html.length] = fruit;
            html[html.length] = '" style="left: ';
            html[html.length] = offset + i * 100;
            html[html.length] = 'px"></div>';
        }
        $('.menuTape').html(html.join(''));
    };

    ui.drawMenu(puzzle);
});
