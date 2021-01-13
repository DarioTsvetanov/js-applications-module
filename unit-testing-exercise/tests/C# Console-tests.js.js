/* eslint-disable no-undef */
const Console = require('../C# Console');
const { expect } = require('chai');

describe('Testing Console.writeLine()', () => {
    it('With a single string argument', () => {
        expect(Console.writeLine('str')).to.equal('str');
    });

    it('With a single object argument', () => {
        const obj = { max: 33 };
        expect(Console.writeLine(obj)).to.equal(JSON.stringify(obj));
    });

    it('Multiple arguments are passed, but the first is not a string - TypeError', () => {
        const test = () => Console.writeLine(15, 'qwe');
        expect(test).to.throw(TypeError);
    });

    it('Number of parameters does not correspond to the number of placeholders - RangeError', () => {
        const test = () => Console.writeLine('The sum of {0} and {1} is {2}', '3', '4');
        expect(test).to.throw(RangeError);
    });

    it('More placeholders than params - RangeError', () => {
        const test = () => Console.writeLine('The sum of {0} and {1} is {2}', '3', '4', '5', '6');
        expect(test).to.throw(RangeError);
    });

    it('Placeholders have indexes not within the parameters range(for instance we have a placeholder {13} and only 5 params) - RangeError', () => {
        const test = () => Console.writeLine('The sum of {0} and {1} is {13}', '3', '4', '5');
        expect(test).to.throw(RangeError);
    });

    it('Multiple arguments are passed and the first is a string, find all placeholders from the string and exchange them with the supplied parameters', () => {
        expect(Console.writeLine('The sum of {0} and {1} is {2}', '3', '4', '7')).to.equal('The sum of 3 and 4 is 7');
    });
});