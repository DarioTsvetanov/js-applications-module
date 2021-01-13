/* eslint-disable no-undef */
const Warehouse = require('../07. Warehouse');
const { expect } = require('chai');

describe('Empty warehouse revision.', () => {
    let test;
    beforeEach(() => {
        test = new Warehouse(5);
    });
    it('revision throw error', () => {
        expect(test.revision()).to.equal('The warehouse is empty');
    }); 
});

describe('Testing Warehouse class.', () => {
    describe('Creating an instance of the class.', () => {
        it('Should not throw.', function () {
            const test = () => new Warehouse(5);
            expect(test).to.not.throw();
        });
        it('Should throw.', function () {
            const test = () => new Warehouse(0);
            expect(test).to.throw('Invalid given warehouse space');
        });
        it('Should throw.', function () {
            const test = () => new Warehouse(-1);
            expect(test).to.throw('Invalid given warehouse space');
        });
        it('Should throw.', function () {
            const test = () => new Warehouse('str');
            expect(test).to.throw('Invalid given warehouse space');
        });
        it('Should throw.', function () {
            const test = () => new Warehouse('');
            expect(test).to.throw('Invalid given warehouse space');
        });
    });

    describe('Testing addProduct.', () => {
        it('Adding food.', function () {
            const test = new Warehouse(100);
            expect(test.capacity).to.equal(100);
            expect(test.addProduct('Food', 'Apple', 10)).to.equal(test.availableProducts.Food);
            expect(test.availableProducts.Food).to.deep.equal({ Apple: 10 });
            expect(test.addProduct('Food', 'Apple', 10)).to.equal(test.availableProducts.Food);
            expect(test.availableProducts.Food).to.deep.equal({ Apple: 20 });
            expect(test.addProduct('Food', 'Balls', 15)).to.equal(test.availableProducts.Food);
            expect(test.availableProducts.Food).to.deep.equal({ Apple: 20, Balls: 15 });
        });
        it('Adding drink.', function () {
            const test = new Warehouse(100);
            expect(test.capacity).to.equal(100);
            expect(test.addProduct('Drink', 'Beer', 10)).to.equal(test.availableProducts.Drink);
            expect(test.availableProducts.Drink).to.deep.equal({ Beer: 10 });
            expect(test.addProduct('Drink', 'Beer', 10)).to.equal(test.availableProducts.Drink);
            expect(test.availableProducts.Drink).to.deep.equal({ Beer: 20 });
            expect(test.addProduct('Drink', 'Cola', 15)).to.equal(test.availableProducts.Drink);
            expect(test.availableProducts.Drink).to.deep.equal({ Beer: 20, Cola: 15 });
        });
        it('Adding food.', function () {
            const test = new Warehouse(10);
            expect(test.addProduct('Food', 'Apple', 10)).to.equal(test.availableProducts.Food);
            expect(test.availableProducts.Food).to.deep.equal({ Apple: 10 });
            const shouldThrow = () => test.addProduct('Food', 'Apple', 1);
            expect(shouldThrow).to.throw('There is not enough space or the warehouse is already full');
        });
        it('Adding drink.', function () {
            const test = new Warehouse(10);
            expect(test.addProduct('Drink', 'Beer', 10)).to.equal(test.availableProducts.Drink);
            expect(test.availableProducts.Drink).to.deep.equal({ Beer: 10 });
        });
        it('Not enough space test.', function () {
            const test = new Warehouse(10);
            const shouldThrow = () => test.addProduct('Food', 'Apple', 11);
            expect(shouldThrow).to.throw('There is not enough space or the warehouse is already full');
        });
        it('Not enough space test.', function () {
            const test = new Warehouse(10);
            const shouldThrow = () => test.addProduct('Drink', 'Beer', 11);
            expect(shouldThrow).to.throw('There is not enough space or the warehouse is already full');
        });
    });

    describe('Testing orderProducts.', () => {
        it('Sort Food.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 15);
            test.addProduct('Food', 'Balls', 10);
            test.addProduct('Food', 'Spagheti', 25);
            test.orderProducts('Food');
            expect(test.availableProducts.Food).to.deep.equal({ Spagheti: 25, Apple: 15, Balls: 10 });
            test.addProduct('Food', 'Butter', 20);
            expect(test.availableProducts.Food).to.deep.equal({ Spagheti: 25, Apple: 15, Balls: 10, Butter: 20 });
        });
        it('Sort Drink.', function () {
            const test = new Warehouse(100);
            test.addProduct('Drink', 'Beer', 15);
            test.addProduct('Drink', 'Balls', 10);
            test.addProduct('Drink', 'Cola', 25);
            test.orderProducts('Drink');
            expect(test.availableProducts.Drink).to.deep.equal({ Cola: 25, Beer: 15, Balls: 10 });
        });
    });

    describe('Testing occupiedCapacity,', () => {
        it('Test capacity,', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 15);
            test.addProduct('Food', 'Apple', 25);
            test.addProduct('Drink', 'Beer', 15);
            expect(test.occupiedCapacity()).to.equal(55);
        });
        it('Test capacity,', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 15);
            test.addProduct('Drink', 'Beer', 85);
            expect(test.occupiedCapacity()).to.equal(100);
        });
        it('Test empty capacity,', function () {
            const test = new Warehouse(100);
            expect(test.occupiedCapacity()).to.equal(0);
        });
    });

    describe('Testing revision.', () => {
        it('Test empty warehouse.', function () {
            const test = new Warehouse(100);
            expect(test.revision()).to.equal('The warehouse is empty');
        });
        it('Test warehouse with products.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 10);
            test.addProduct('Food', 'Balls', 8);
            test.addProduct('Drink', 'Beer', 11);
            const expected = [
                'Product type - [Food]',
                '- Apple 10',
                '- Balls 8',
                'Product type - [Drink]',
                '- Beer 11',
            ];
            expect(test.revision()).to.equal(expected.join('\n'));
        });
        it('Test warehouse with products.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 10);
            test.addProduct('Food', 'Balls', 8);
            const expected = [
                'Product type - [Food]',
                '- Apple 10',
                '- Balls 8',
                'Product type - [Drink]'
            ];
            expect(test.revision()).to.equal(expected.join('\n'));
        });
        it('Test warehouse with products.', function () {
            const test = new Warehouse(100);
            test.addProduct('Drink', 'Beer', 10);
            test.addProduct('Drink', 'Cola', 8);
            test.addProduct('Drink', 'Wine', 20);
            test.orderProducts('Drink');
            const expected = [
                'Product type - [Food]',
                'Product type - [Drink]',
                '- Wine 20',
                '- Beer 10',
                '- Cola 8'
            ];
            expect(test.revision()).to.equal(expected.join('\n'));
        });
        it('Test warehouse with products.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 10);
            test.addProduct('Food', 'Balls', 8);
            test.addProduct('Food', 'Spagheti', 15);
            test.orderProducts('Food');
            const expected = [
                'Product type - [Food]',
                '- Spagheti 15',
                '- Apple 10',
                '- Balls 8',
                'Product type - [Drink]'
            ];
            expect(test.revision()).to.equal(expected.join('\n'));
        });
    });

    describe('Testing scrapeAProduct.', () => {
        it('Product should not exist.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 5);
            test.addProduct('Drink', 'Beer', 5);
            const shouldThrow = () => test.scrapeAProduct('Balls', 10);
            expect(shouldThrow).to.throw('Balls do not exists');
        });
        it('Product should be scraped.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 5);
            test.addProduct('Drink', 'Beer', 5);
            expect(test.scrapeAProduct('Apple', 4)).to.deep.equal({ Apple: 1 });
        });
        it('Product should be reset.', function () {
            const test = new Warehouse(100);
            test.addProduct('Food', 'Apple', 5);
            test.addProduct('Drink', 'Beer', 5);
            expect(test.scrapeAProduct('Beer', 7)).to.deep.equal({ Beer: 0 });
            expect(test.scrapeAProduct('Apple', 7)).to.deep.equal({ Apple: 0 });
        });
    });
});