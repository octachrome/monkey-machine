window.mm = window.mm || {};
var mm = window.mm;

mm.FRUIT = ['apples', 'pineapple', 'cherries', 'bananas', ''];
mm.FACES = ['blank', 'sad', 'angry', 'silly'];
mm.ARROWS = ['left', 'right'];

$(function() {
    var defaultRule = ['pineapple', 'blank', 'pineapple', 'left', 'blank'];
    var rules = [defaultRule];

    var tape;
    var head;
    var face;

    var undo;

    var activePuzzle;

    mm.load = function(puzzle) {
        if (activePuzzle != puzzle) {
            activePuzzle = puzzle;
            tape = activePuzzle.tape.slice();
            head = 0;
            face = 'blank';
            undo = [];
        }
    };

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
        tape = activePuzzle.tape.slice();
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
        var f = undo.pop();
        f && f();
    };

    function arrayMatch(a1, a2) {
        for (var start1 = 0; start1 < a1.length; start1++) {
            if (a1[start1] != null) {
                break;
            }
        }
        for (var start2 = 0; start2 < a2.length; start2++) {
            if (a2[start2] != null) {
                break;
            }
        }
        for (var i = 0; i < a1.length; i++) {
            if (a1[start1 + i] != a2[start2 + i]) {
                return false;
            }
        }
        for (; i < a2.length; i++) {
            if (a2[start2 + i] != null) {
                return false;
            }
        }
        return true;
    }

    if (window._dbg) {
        window._dbg.arrayMatch = arrayMatch;
    }

    mm.won = function() {
        return arrayMatch(tape, activePuzzle.goal);
    };
});
