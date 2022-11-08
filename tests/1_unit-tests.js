const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('Whole number input', (done) => {
    let input = '50km';
    assert.equal(convertHandler.getNum(input), 50);
    done();
  });
  test('Decimal number input', (done) => {
    let input = '5.3mi';
    assert.equal(convertHandler.getNum(input), 5.3);
    done();
  });
  test('Fractional input', (done) => {
    let input = '3/5gal';
    assert.equal(convertHandler.getNum(input), 0.6);
    done();
  });
  test('Fractional input with decimal', (done) => {
    let input = '5.4/3mi';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });
  test('Double fraction input', (done) => {
    let input = '3/2/3lbs';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });
  test('No numerical input', (done) => {
    let input = 'L';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });
  test('Valid unit input', (done) => {
    const units = ['kg', 'mi', 'km', 'lbs', 'gal', 'L'];
    const input = ['kg', 'KG', 'mi', 'MI', 'km', 'KM', 'gal', 'GAL', 'lbs', 'LBS', 'l', 'L'];
    input.forEach((unit) => {
      assert.include(units, convertHandler.getUnit(unit));    
    });
    done();
  });
  test('Invalid unit input', (done) => {
    let input = '50cm';
    assert.equal(convertHandler.getReturnUnit(input), 'invalid unit');
    done();
  });
  test('Correct return unit', (done) => {
    const units = ['km', 'mi', 'kg', 'lbs', 'L', 'gal'];
    const returnUnit = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
    units.forEach((unit, i) => {
      assert.equal(convertHandler.getReturnUnit(unit), returnUnit[i]);
    });
    done();
  });
  test('Correct spelled-out string unit', (done) => {
    const units = ['km', 'mi', 'kg', 'lbs', 'L', 'gal'];
    const spelledOutUnits = ['kilometers', 'miles', 'kilograms', 'pounds', 'liters', 'gallons'];
    units.forEach((unit, i) => {
      assert.equal(convertHandler.spellOutUnit(unit), spelledOutUnits[i]);
    });
    done();
  });
  test('gal to L', (done) => {
    assert.equal(convertHandler.convert(5, 'gal'), 18.92705);
    done();
  });
  test('L to gal', (done) => {
    assert.equal(convertHandler.convert(5, 'L'), 1.32086);
    done();
  });
  test('mi to km', (done) => {
    assert.equal(convertHandler.convert(3.1, 'mi'), 4.98895);
    done();
  });
  test('km to mi', (done) => {
    assert.equal(convertHandler.convert(1/2, 'km'), 0.31069);
    done();
  });
  test('lbs to kg', (done) => {
    assert.equal(convertHandler.convert(5.4/3, 'lbs'), 0.81647);
    done();
  });
  test('kg to lbs', (done) => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    done();
  });
});