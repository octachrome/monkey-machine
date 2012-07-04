window.ui = window.ui || {};
var ui = window.ui;

window.mm = window.mm || {};
var mm = window.mm;

$(function() {
    ui.drawRules = function(rules) {
        var html = ['<table>'];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            html[html.length] = '<tr class="rule">';
            html[html.length] = '<td><div class="fruit_small ';
            html[html.length] = rule[0];
            html[html.length] = '"></div></td>';
            html[html.length] = '<td class="op">+</td>';
            html[html.length] = '<td><div class="head_small"><div class="face_small ';
            html[html.length] = rule[1];
            html[html.length] = '"></div></div></td>';
            html[html.length] = '<td class="op">=</td>';
            html[html.length] = '<td><div class="fruit_small ';
            html[html.length] = rule[2];
            html[html.length] = '"></div></td>';
            html[html.length] = '<td class="op">+</td>';
            html[html.length] = '<td><div class="arrow_small ';
            html[html.length] = rule[3];
            html[html.length] = '"></div></td>';
            html[html.length] = '<td class="op">+</td>';
            html[html.length] = '<td><div class="head_small"><div class="face_small ';
            html[html.length] = rule[4];
            html[html.length] = '"></div></div></td>';
            html[html.length] = '</tr>';
        }
        html[html.length] = '<tr class="rule"><td id="addrule" colspan="9">Add</td>';
        html[html.length] = '</tr>';
        html[html.length] = '</table>';
        $('.rules').html(html.join(''));
    };

    ui.highlightRule = function(index) {
        $('tr.rule').eq(index).toggleClass('active')
            .delay(1000)
            .queue(function() {
                $(this).toggleClass('active');
                $.dequeue(this);
            });
    };

    var buttons = [
        {cls: 'fruit_med', options: mm.FRUIT},
        {cls: 'face_med', options: mm.FACES},
        {cls: 'fruit_med', options: mm.FRUIT},
        {cls: 'arrow_med', options: mm.ARROWS},
        {cls: 'face_med', options: mm.FACES}];

    ui.editRule = function(rule, onSave, onDelete) {
        var html = ['<table><tr>'];
        for (var i = 0; i < buttons.length; i++) {
            if (i == 2) {
                html[html.length] = '<td class="op">=</td>';
            } else if (i != 0) {
                html[html.length] = '<td class="op">+</td>';
            }
            var cls = buttons[i].cls;
            html[html.length] = '<td><div class="rule_btn">';
            if (cls == 'face_med') {
                html[html.length] = '<div class="head_med">';
            }
            html[html.length] = '<div class="';
            html[html.length] = cls;
            html[html.length] = ' ';
            html[html.length] = rule[i];
            html[html.length] = '"></div>';
            if (cls == 'face_med') {
                html[html.length] = '</div>';
            }
            html[html.length] = '</div></td>';
        }
        html[html.length] = '</tr></table>';
        html[html.length] = '<div class="dlg_button simplemodal-close">Cancel</div>';
        html[html.length] = '<div id="delete_rule" class="dlg_button">Delete</div>';
        html[html.length] = '<div id="save_rule" class="dlg_button">Save</div>';
    
        $.modal(html.join(''), {
            position: [200, 140],
            minWidth: 520,
            minHeight: 150,
            onShow: function(dialog) {
                $('.rule_btn').click(function() {
                    var el = $(this);
                    var i = el.parent().index() / 2;
                    var options = buttons[i].options;
                    var oldOption = rule[i];
                    var oldIndex = options.indexOf(oldOption);
                    var newIndex = (oldIndex + 1) % options.length;
                    var newOption = options[newIndex];
                    var d = el.find('div').last();
                    d.removeClass(oldOption).addClass(newOption);
                    rule[i] = newOption;
                });
                $('#save_rule').click(function() {
                    onSave(rule);
                    $.modal.close();
                });
                $('#delete_rule').click(function() {
                    onDelete(rule);
                    $.modal.close();
                });
            }
        });
    };
});
