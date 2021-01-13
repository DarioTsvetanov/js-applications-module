/* eslint-disable no-undef */
const mathEnforcer = require('../04. Math Enforcer');
const { assert } = require('chai');
const { expect } = require('chai');

describe('Testing the functionality of mathEnforcer.', () => {

    it('Object should have addFive prop.', function () {
        expect(mathEnforcer).to.have.property('addFive');
    });
    it('Object should have subtractTen prop.', function () {
        expect(mathEnforcer).to.have.property('subtractTen');
    });
    it('Object should have sum prop.', function () {
        expect(mathEnforcer).to.have.property('sum');
    });

    describe('Testing the functionality of addFive.', () => {

        it('Input must be a number.', function () {
            const { addFive } = mathEnforcer;
            assert.equal(addFive('str'), undefined);
        });
        it('Output should be 6.', function () {
            const { addFive } = mathEnforcer;
            assert.equal(addFive(1), 6);
        });
        it('Output should be 3.', function () {
            const { addFive } = mathEnforcer;
            assert.equal(addFive(-2), 3);
        });
        it('Output should be 6.6.', function () {
            const { addFive } = mathEnforcer;
            expect(addFive(1.6)).to.be.closeTo(6.6, 0.01);
        });
        it('Output should be 3.4.', function () {
            const { addFive } = mathEnforcer;
            expect(addFive(-1.6)).to.be.closeTo(3.4, 0.01);
        });
    });

    describe('Testing the functionality of subtractTen.', () => {

        it('Input must be a number.', function () {
            const { subtractTen } = mathEnforcer;
            assert.equal(subtractTen('str'), undefined);
        });
        it('Output should be 1.', function () {
            const { subtractTen } = mathEnforcer;
            assert.equal(subtractTen(11), 1);
        });
        it('Output should be -11.', function () {
            const { subtractTen } = mathEnforcer;
            assert.equal(subtractTen(-1), -11);
        });
        it('Output should be 11.6.', function () {
            const { subtractTen } = mathEnforcer;
            expect(subtractTen(11.6)).to.be.closeTo(1.6, 0.01);
        });
        it('Output should be -21.6.', function () {
            const { subtractTen } = mathEnforcer;
            expect(subtractTen(-11.6)).to.be.closeTo(-21.6, 0.01);
        });
    });

    describe('Testing the functionality of subtractTen.', () => {

        it('Input must be two numbers.', function () {
            const { sum } = mathEnforcer;
            assert.equal(sum('str', 1), undefined);
        });
        it('Input must be two numbers.', function () {
            const { sum } = mathEnforcer;
            assert.equal(sum(1, 'str'), undefined);
        });
        it('Output should be 2.', function () {
            const { sum } = mathEnforcer;
            assert.equal(sum(1, 1), 2);
        });
        it('Output should be -2.', function () {
            const { sum } = mathEnforcer;
            assert.equal(sum(-1, -1), -2);
        });
        it('Output should be 0.', function () {
            const { sum } = mathEnforcer;
            assert.equal(sum(1, -1), 0);
        });
        it('Output should be -0.1.', function () {
            const { sum } = mathEnforcer;
            expect(sum(0.1, -0.2)).to.be.closeTo(-0.1, 0.01);
        });
        it('Output should be 0.1.', function () {
            const { sum } = mathEnforcer;
            expect(sum(-0.1, 0.2)).to.be.closeTo(0.1, 0.01);
        });
        it('Output should be -0.2.', function () {
            const { sum } = mathEnforcer;
            expect(sum(-0.1, -0.1)).to.be.closeTo(-0.2, 0.01);
        });
        it('Output should be 0.2.', function () {
            const { sum } = mathEnforcer;
            expect(sum(0.1, 0.1)).to.be.closeTo(0.2, 0.01);
        });
    });
});