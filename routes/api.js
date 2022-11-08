'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      
      if (initNum === 'invalid number' && returnUnit === 'invalid unit') {
        res.json('invalid number and unit');
      } else if (initNum === 'invalid number') {
        res.json('invalid number');
      } else if (returnUnit === 'invalid unit') {
        res.json('invalid unit');
      } else {
        let returnNum = convertHandler.convert(initNum, initUnit);
        let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  
        const response = {
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: string
        };
        
        res.json(response); 
      }
  });
};