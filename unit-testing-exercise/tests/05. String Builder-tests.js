/* eslint-disable no-undef */
const StringBuilder = require('../05. String Builder');
const { assert } = require('chai');
const { expect } = require('chai');

describe('Testing StringBuilder functionality', () => {
    it('Can be instantiated without anything.', function () {
        const x = new StringBuilder();
        assert.equal(x._stringArray instanceof Array, true);
        assert.equal(x._stringArray.length, 0);
    });
    it('Can be instantiated with a string.', function () {
        const str = 'test';
        const x = new StringBuilder(str);
        assert.equal(x._stringArray.join(''), str);
    });
    it('Test if all properties exist.', function () {
        const x = new StringBuilder();
        expect(x).to.have.keys('_stringArray');
    });
    it('Test if all methods exist.', function () {
        const x = new StringBuilder();
        expect(x).to.have.property('append');
        expect(x).to.have.property('prepend');
        expect(x).to.have.property('insertAt');
        expect(x).to.have.property('remove');
        expect(x).to.have.property('toString');
    });


    it('Test append functionality.', function () {
        const x = new StringBuilder('test');
        const str = 'pesho';
        x.append(str);

        const expectedIndex = x._stringArray.join('').length - str.length;
        const actualIndex = x._stringArray.join('').lastIndexOf(str);
        assert.equal(actualIndex, expectedIndex);
    });

    it('Test prepend functionality.', function () {
        const x = new StringBuilder('test');
        const str = 'pesho';
        x.prepend(str);

        const index = x._stringArray.join('').indexOf(str);
        assert.equal(index, 0);
    });

    it('Test insertAt functionality.', function () {
        const x = new StringBuilder('longer test');
        const str = 'new';
        const index = 2;
        x.insertAt(str, index);

        const result = x._stringArray.slice(index, index + str.length).join('');
        assert.equal(result, str);
    });

    it('Test remove functionality.', function () {
        const x = new StringBuilder('longer test');
        x.remove(2, 3);

        const result = x._stringArray.join('');
        assert.equal(result, 'lor test');
    });

    it('Test toString functionality.', function () {
        const x = new StringBuilder('longer test');
        const result = x.toString();
        assert.equal(result, 'longer test');
    });

    it('Constructor argument must be a string.', function () {
        const willThrow = () => new StringBuilder(true);
        expect(willThrow).to.throw();
    });

    it('append argument must be a string.', function () {
        const x = new StringBuilder('string');
        const willThrow = () => x.append(true);
        expect(willThrow).to.throw();
    });
    it('prepend argument must be a string.', function () {
        const x = new StringBuilder('string');
        const willThrow = () => x.prepend(true);
        expect(willThrow).to.throw();
    });
    it('insertAt argument must be a string.', function () {
        const x = new StringBuilder('string');
        const willThrow = () => x.insertAt(true, 2);
        expect(willThrow).to.throw();
    });
});