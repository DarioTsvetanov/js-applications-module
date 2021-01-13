/* eslint-disable no-undef */
const lookupChar = require('../03. Char Lookup');
const { assert } = require('chai');

describe('Testing lookupChar functionality', () => {
    it('First parameter must be a string!', function () {
        assert.equal(lookupChar(1, 5), undefined);
    });
    it('Second parameter must be a number!', function () {
        assert.equal(lookupChar('str', 'str'), undefined);
    });
    it('Index must be an integer.', function () {
        assert.equal(lookupChar('str', 1.5), undefined);
    });
    it('Invalid index!', function () {
        assert.equal(lookupChar('string', 6), 'Incorrect index');
    });
    it('Invalid index!', function () {
        assert.equal(lookupChar('string', 17), 'Incorrect index');
    });
    it('Invalid index!', function () {
        assert.equal(lookupChar('string', -1), 'Incorrect index');
    });
    it('Invalid output!', function () {
        assert.equal(lookupChar('string', 1), 't');
    });
    it('Invalid output!', function () {
        assert.equal(lookupChar('test', 2), 's');
    });
});