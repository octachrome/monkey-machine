window.ui = window.ui || {};
var ui = window.ui;

$(function() {
    var puzzles = [{
        title: "APPLE UPGRADE",
        desc: "Swap all the apples for pineapples.",
        tape: ['bananas', 'apples', 'cherries', 'apples', 'apples', 'bananas', 'cherries'],
        goal: ['bananas', 'pineapple', 'cherries', 'pineapple', 'pineapple', 'bananas', 'cherries']
    }, {
        title: "SHOPPING LIST",
        desc: "Write out all the fruit in alphabetical order: apples, bananas, cherries and pineapple.",
        tape: [''],
        goal: ['apples', 'bananas', 'cherries', 'pineapple']
    }];

    var current = 0;

    ui.nextPuzzle = function() {
        if (current < puzzles.length) {
            current++;
        }
        ui.drawMenu();
    }

    ui.prevPuzzle = function() {
        if (current > 0) {
            current--;
        }
        ui.drawMenu();
    }

    ui.drawMenu = function() {
        var puzzle = puzzles[current];
        if (puzzle) {
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
            $('#play').addClass('enabled');
        } else {
            $('.title').html('NO MORE PUZZLES :(');
            $('.desc').html('');
            $('.menuTape').html('');
            $('#play').removeClass('enabled');
        }
        if (current > 0) {
            $('#prev_puzzle').addClass('enabled');
        } else {
            $('#prev_puzzle').removeClass('enabled');
        }
        if (current < puzzles.length) {
            $('#next_puzzle').addClass('enabled');
        } else {
            $('#next_puzzle').removeClass('enabled');
        }
        $('#scroll').animate({top: 0}, 200);
    };

    $('#play').click(function() {
        if ($(this).hasClass('enabled')) {
            ui.drawPuzzle(puzzles[current]);
        }
    });

    $('#next_puzzle').click(function() {
        if ($(this).hasClass('enabled')) {
            ui.nextPuzzle();
        }
    });

    $('#prev_puzzle').click(function() {
        if ($(this).hasClass('enabled')) {
            ui.prevPuzzle();
        }
    });

    ui.drawMenu();
});
