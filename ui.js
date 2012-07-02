window.mm = window.mm || {};
var mm = window.mm;

window.ui = window.ui || {};
var ui = window.ui;

$(function() {
    function reset() {
        mm.reset();
        ui.drawFace(mm.face());
        ui.drawTape(mm.tape());
    }
    reset();

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
    drawRules();

    function step(done) {
        var result = mm.next();
        if (result) {
            ui.highlightRule(result.rule);
            ui.swap(result.fruit, function() {
                ui.drawFace(result.face);
                ui.moveTape(result.move, function() {
                    done && done(true);
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
            stop = !stop;
            return;
        }
        running = true;
        stop = false;
        function s() {
            step(function(matched) {
                if (!matched) {
                    running = false;
                    $('#button_go').removeClass('button_stop');
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

    $('#button_next').click(next);
    $('#button_undo').click(undo);
    $('#button_reset').click(reset);
    $('#button_go').click(toggleRun);
});
