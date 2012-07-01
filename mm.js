window.mm = window.mm || {};
var mm = window.mm;

mm.FRUIT = ['apples', 'pineapple', 'cherries', 'bananas', ''];
mm.FACES = ['blank', 'sad', 'angry', 'silly'];
mm.ARROWS = ['left', 'right'];

$(function() {
    var rules = [
        ['pineapple', 'blank', 'pineapple', 'left', 'sad'],
        ['apples', 'sad', 'apples', 'right', 'blank']
    ];

    var defaultRule = ['pineapple', 'blank', 'pineapple', 'left', 'blank'];

    var tape;
    var head;
    var face;

    mm.next = function() {
        var fruit = tape[head];
        var result = mm.evalRule(fruit);
        if (result) {
            tape[head] = result.fruit;
            face = result.face;
            head += result.move == 'left' ? 1 : -1;
            if (head < 0) {
                tape.splice(0, 0, [null]);
            }
        }
        return result;
    };

    mm.evalRule = function(fruit)  {
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if (rule[0] == fruit && rule[1] == face) {
                return {
                    fruit: rule[2],
                    move: rule[3],
                    face: rule[4]
                };
            }
        }
        return null;
    };

    mm.rules = function() {
        return rules;
    };

    mm.rule = function(index) {
        var rule = rules[index] || defaultRule;
        return rule.slice();
    };

    mm.deleteRule = function(index) {
        rules.splice(index, 1);
    };

    mm.updateRule = function(index, rule) {
        rules[index] = rule;
    };

    mm.tape = function() {
        return tape;
    };

    mm.reset = function() {
        tape = ['pineapple', 'apples', 'cherries', 'apples', 'bananas', 'cherries', 'pineapple', 'bananas'];
        head = 0;
        face = 'blank';
    };

    mm.face = function() {
        return face;
    };
});
