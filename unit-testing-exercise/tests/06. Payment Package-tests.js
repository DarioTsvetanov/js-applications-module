/* eslint-disable no-undef */
const PaymentPackage = require('../06. Payment Package');
const { expect } = require('chai');

describe('Testing class functionality.', () => {
    describe('Defining a class instance.', () => {
        it('Should not throw an error.', function () {
            const temp = () => new PaymentPackage('Test', 15);
            expect(temp).to.not.throw();
        });
        it('Should throw an error.', function () {
            const temp = () => new PaymentPackage('', 15);
            expect(temp).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = () => new PaymentPackage(false, 15);
            expect(temp).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = () => new PaymentPackage('Test', -1);
            expect(temp).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = () => new PaymentPackage('Test', 'Test2');
            expect(temp).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = () => new PaymentPackage('Test');
            expect(temp).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = () => new PaymentPackage();
            expect(temp).to.throw();
        });
    });

    describe('Check if an instance has all methods and properties.', () => {
        it('Check properties and toString method.', function () {
            const temp = new PaymentPackage('Test', 15);
            expect(Object.getPrototypeOf(temp).hasOwnProperty('name')).to.equal(true, 'No name property.');
            expect(Object.getPrototypeOf(temp).hasOwnProperty('value')).to.equal(true, 'No value property.');
            expect(Object.getPrototypeOf(temp).hasOwnProperty('VAT')).to.equal(true, 'No VAT property.');
            expect(Object.getPrototypeOf(temp).hasOwnProperty('active')).to.equal(true, 'No active property.');
            expect(Object.getPrototypeOf(temp).hasOwnProperty('toString')).to.equal(true, 'No toString method.');
        });
    });

    describe('Testing name accessor.', () => {
        it('Should return "Test".', function () {
            const temp = new PaymentPackage('Test', 15);
            expect(temp.name).to.equal('Test');
        });
        it('Should return "Book".', function () {
            const temp = new PaymentPackage('Test', 15);
            temp.name = 'Book';
            expect(temp.name).to.equal('Book');
        });
        it('Should throw an error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.name = false;
            expect(shouldThrow).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.name = '';
            expect(shouldThrow).to.throw();
        });
    });

    describe('Testing value accessor.', () => {
        it('Should return 15.', function () {
            const temp = new PaymentPackage('Test', 15);
            expect(temp.value).to.equal(15);
        });
        it('Should return 20.', function () {
            const temp = new PaymentPackage('Test', 15);
            temp.value = 20;
            expect(temp.value).to.equal(20);
        });
        it('Should return 0.', function () {
            const temp = new PaymentPackage('Test', 15);
            temp.value = 0;
            expect(temp.value).to.equal(0);
        });
        it('Should throw an error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.value = false;
            expect(shouldThrow).to.throw();
        });
        it('Should throw an error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.value = -1;
            expect(shouldThrow).to.throw();
        });
    });

    describe('Testing VAT accessor.', () => {
        it('Should return 20.', function () {
            const temp = new PaymentPackage('Test', 15);
            expect(temp.VAT).to.equal(20);
        });
        it('Should return 15.', function () {
            const temp = new PaymentPackage('Test', 15);
            temp.VAT = 15;
            expect(temp.VAT).to.equal(15);
        });
        it('Should return 0.', function () {
            const temp = new PaymentPackage('Test', 15);
            temp.VAT = 0;
            expect(temp.VAT).to.equal(0);
        });
        it('Should throw and error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.value = false;
            expect(shouldThrow).to.throw();
        });
        it('Should throw and error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.value = -1;
            expect(shouldThrow).to.throw();
        });
    });

    describe('Testing active accessor.', () => {
        it('Should return true.', function () {
            const temp = new PaymentPackage('Test', 15);
            expect(temp.active).to.equal(true);
        });
        it('Should return false.', function () {
            const temp = new PaymentPackage('Test', 15);
            temp.active = false;
            expect(temp.active).to.equal(false);
        });
        it('Should throw and error.', function () {
            const temp = new PaymentPackage('Test', 15);
            const shouldThrow = () => temp.active = 'pesho';
            expect(shouldThrow).to.throw();
        });
    });

    describe('Testing toString method.', () => {
        it('Test toString when active', function () {
            const temp = new PaymentPackage('Test', 150);
            const expected = [
                `Package: ${temp.name}` + (temp.active ? '' : ' (inactive)'),
                `- Value (excl. VAT): ${temp.value}`,
                `- Value (VAT ${temp.VAT}%): ${temp.value * (1 + temp.VAT / 100)}`
            ].join('\n');
            expect(temp.toString()).to.equal(expected);
        });
        it('Test toString when active', function () {
            const temp = new PaymentPackage('Test', 150);
            temp.VAT = 35;
            const expected = [
                `Package: ${temp.name}` + (temp.active ? '' : ' (inactive)'),
                `- Value (excl. VAT): ${temp.value}`,
                `- Value (VAT ${temp.VAT}%): ${temp.value * (1 + temp.VAT / 100)}`
            ].join('\n');
            expect(temp.toString()).to.equal(expected);
        });
        it('Test toString when inactive', function () {
            const temp = new PaymentPackage('Test', 150);
            temp.active = false;
            const expected = [
                `Package: ${temp.name}` + (temp.active ? '' : ' (inactive)'),
                `- Value (excl. VAT): ${temp.value}`,
                `- Value (VAT ${temp.VAT}%): ${temp.value * (1 + temp.VAT / 100)}`
            ].join('\n');
            expect(temp.toString()).to.equal(expected);
        });
    });
});
