/* eslint-disable no-undef */
const isOddOrEven = require('../02. Even Or Odd');
const { assert } = require('chai');

describe('Testing isOddOrEven function', () => {
    it('Passed parameter must be string.', function () {
        assert.equal(isOddOrEven(6), undefined);
    });
    it('Input is "telefon". Should return odd.', function () {
        assert.equal(isOddOrEven('telefon'), 'odd');
    });
    it('Input is "cars". Should return even.', function () {
        assert.equal(isOddOrEven('cars'), 'even');
    });
});