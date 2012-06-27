window.mm = window.mm || {};
var mm = window.mm;

mm.editRule = function(rule, onSave) {
    var buttons = [{
        cls: 'fruit_med',
        options: mm.FRUIT
    }, {
        cls: 'face_med',
        options: mm.FACES
    }, {
        cls: 'fruit_med',
        options: mm.FRUIT
    }, {
        cls: 'arrow_med',
        options: mm.ARROWS
    }, {
        cls: 'face_med',
        options: mm.FACES
    }];

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
    html[html.length] = '<div class="dlg_button simplemodal-close">Cancel</div><div id="save_rule" class="dlg_button">Save</div>';

    $.modal(html.join(''), {
        position: [200, 150],
        onShow: function(dialog) {
            $('.rule_btn').click(function() {
                var el = $(this);
                var i = el.parent().index() / 2;
                var options = buttons[i].options;
                var oldOption = rule[i];
                var oldIndex = options.indexOf(oldOption);
                var newIndex = (oldIndex + 1) % options.length;
                var newOption = options[newIndex];
                var d = el.find('.' + oldOption);
                d.removeClass(oldOption).addClass(newOption);
                rule[i] = newOption;
                return false;
            });
            $('#save_rule').click(function() {
                onSave(rule);
                $.modal.close();
            });
        }
    });
};
