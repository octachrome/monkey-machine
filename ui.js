window.mm = window.mm || {};
var mm = window.mm;

window.ui = window.ui || {};
var ui = window.ui;

$(function() {
    function drawRules() {
        ui.drawRules(mm.rules());

        $('.rule').click(function() {
            var index = $(this).index();
            ui.editRule(mm.rule(index), function(rule) {
                mm.updateRule(index, rule);
                drawRules();
            });
        });
    }
    drawRules();

    ui.drawTape(mm.tape());
    $('.fruit_large').click(ui.moveTape);

    function next() {
        var result = mm.next();
        if (result) {
            ui.swap(result.fruit, function() {
                ui.moveTape(result.move);
            });
        } else {
            alert('No matching rule');
        }
    }

    $('#monkey').click(next);
});
