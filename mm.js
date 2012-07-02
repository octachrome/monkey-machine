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

    var undo = [];

    mm.next = function() {
        var fruit = tape[head];
        var result = mm.evalRule(fruit);
        if (result) {
            var oldFace = face;
            var oldHead = head;
            tape[head] = result.fruit;
            face = result.face;
            head += result.move == 'left' ? 1 : -1;
            if (head < 0) {
                tape.splice(0, 0, [null]);
                head++;
                oldHead++;
            }
            undo[undo.length] = function() {
                face = oldFace;
                head = oldHead;
                tape[oldHead] = fruit;
            };
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
                    face: rule[4],
                    rule: i
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
        var oldRule = rules.splice(index, 1)[0];
        undo[undo.length] = function() {
            rules.splice(index, 0, oldRule);
        };
    };

    mm.updateRule = function(index, rule) {
        var oldRule = rules[index];
        if (oldRule) {
            undo[undo.length] = function() {
                rules[index] = oldRule;
            };
        } else {
            undo[undo.length] = function() {
                rules.splice(index, 1);
            };
        }
        rules[index] = rule;
    };

    mm.tape = function() {
        return tape;
    };

    mm.reset = function() {
        if (tape) {
            var oldTape = tape.slice();
            var oldHead = head;
            var oldFace = face;
            undo[undo.length] = function() {
                tape = oldTape;
                head = oldHead;
                face = oldFace;
            };
        }
        tape = ['pineapple', 'apples', 'cherries', 'apples', 'bananas', 'cherries', 'pineapple', 'bananas'];
        head = 0;
        face = 'blank';
    };

    mm.face = function() {
        return face;
    };

    mm.head = function() {
        return head;
    };

    mm.undo = function() {
        undo.pop()();
    };
});
