window.ui = window.ui || {};
var ui = window.ui;

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
    html[html.length] = '</table>';
    $('.rules').html(html.join(''));
};
