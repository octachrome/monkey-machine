describe('arrayMatch tests', function() {
    it('should match empty arrays', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch([], [])).toBe(true);
    });

    it('should match single element arrays', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], ['x'])).toBe(true);
    });

    it('should not match different element arrays', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], ['y'])).toBe(false);
    });

    it('should not match different length arrays', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch([], ['y'])).toBe(false);
    });

    it('should not match different length arrays (other way around)', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], [])).toBe(false);
    });

    it('should ignore leading nulls in first argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch([null, 'x'], ['x'])).toBe(true);
    });

    it('should ignore trailing nulls in first argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x', null], ['x'])).toBe(true);
    });

    it('should ignore leading nulls in second argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], [null, 'x'])).toBe(true);
    });

    it('should ignore trailing nulls in second argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], ['x', null])).toBe(true);
    });

    it('should ignore leading blanks in first argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['', 'x'], ['x'])).toBe(true);
    });

    it('should ignore trailing blanks in first argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x', ''], ['x'])).toBe(true);
    });

    it('should treat blanks as equal to nulls', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch([''], [null])).toBe(true);
    });

    it('should ignore leading blanks in second argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], ['', 'x'])).toBe(true);
    });

    it('should ignore trailing blanks in second argument', function() {
        var arrayMatch = window._dbg.arrayMatch;
        expect(arrayMatch(['x'], ['x', ''])).toBe(true);
    });
});
