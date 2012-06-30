window.mm = window.mm || {};
var mm = window.mm;

mm.FRUIT = ['apples', 'pineapple', 'cherries', 'bananas'];
mm.FACES = ['blank', 'sad', 'angry', 'silly'];
mm.ARROWS = ['left', 'right'];

$(function() {
    var rules = [
        ['pineapple', 'blank', 'apples', 'left', 'sad'],
        ['apples', 'blank', 'apples', 'left', 'sad'],
        ['cherries', 'blank', 'apples', 'left', 'sad']
    ];

    var tape = ['pineapple', 'apples', 'cherries', 'apples', 'bananas', 'cherries', 'pineapple', 'bananas'];

    var head = 0;

    mm.next = function() {
        var fruit = tape[head];
        var result = mm.evalRule(fruit);
        if (result) {
            tape[head] = result.fruit;
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
            if (rule[0] == fruit) {
                return {
                    fruit: rule[2],
                    move: rule[3]
                };
            }
        }
        return null;
    };

    mm.rules = function() {
        return rules;
    };

    mm.rule = function(index) {
        return rules[index].slice();
    };

    mm.updateRule = function(index, rule) {
        rules[index] = rule;
    };

    mm.tape = function() {
        return tape;
    };
});
