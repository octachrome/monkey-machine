window.mm = window.mm || {};
var mm = window.mm;

window.ui = window.ui || {};
var ui = window.ui;

$(function() {
    function reset() {
        mm.reset();
        ui.drawFace(mm.face());
        ui.drawTape(mm.tape(), mm.head());
    }

    function drawRules() {
        ui.drawRules(mm.rules());

        $('.rule').click(function() {
            var index = $(this).index();
            ui.editRule(mm.rule(index), function(rule) {
                mm.updateRule(index, rule);
                drawRules();
            }, function(rule) {
                mm.deleteRule(index);
                drawRules();
            });
        });
    }

    function win() {
        $.modal('<div class="win">WIN!</div><div class="win_next">NEXT PUZZLE</div>', {
            position: [150, 300],
            onShow: function(dialog) {
                $('.win_next').click(function() {
                    $.modal.close();
                    ui.nextPuzzle();
                });
            }
        });
    }

    function step(done) {
        var result = mm.next();
        if (result) {
            ui.highlightRule(result.rule);
            ui.swap(result.fruit, function() {
                ui.drawFace(result.face);
                ui.moveTape(result.move, function() {
                    if (mm.won()) {
                        win();
                    } else {
                        done && done(true);
                    }
                });
            });
        } else {
            done && done(false);
        }
    }

    var running = false;
    var stop = false;

    function next() {
        if (running) {
            return;
        }
        running = true;
        step(function(matched) {
            running = false;
            if (!matched) {
                alert('No matching rule');
            }
        });
    }

    function toggleRun() {
        $('#button_go').toggleClass('button_stop');
        if (running) {
            $('#button_go').html(stop ? 'STOP' : 'GO!');
            stop = !stop;
            return;
        }
        $('#button_go').html('STOP');
        running = true;
        stop = false;
        function s() {
            step(function(matched) {
                if (!matched) {
                    running = false;
                    $('#button_go').removeClass('button_stop').html('GO!');
                } else if (!stop) {
                    s();
                } else {
                    running = false;
                }
            });
        }
        s();
    }

    function undo() {
        mm.undo();
        drawRules();
        ui.drawFace(mm.face());
        ui.drawTape(mm.tape(), mm.head());
    }

    ui.drawPuzzle = function(puzzle) {
        running = false;
        stop = false;
        $('#button_go').removeClass('button_stop').html('GO!');
        mm.load(puzzle);
        ui.drawFace(mm.face());
        ui.drawTape(mm.tape(), mm.head());
        drawRules();
        $('#scroll').animate({top: -600}, 200);
    };

    $('#button_next').click(next);
    $('#button_undo').click(undo);
    $('#button_reset').click(reset);
    $('#button_go').click(toggleRun);
    $('#button_menu').click(ui.drawMenu);
});
