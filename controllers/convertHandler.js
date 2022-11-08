function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex = /[a-z]+|[^a-z]+/gi
	  let result;
    result = input.match(regex)[0];
    let regexNum=/\d/
    
    if (!regexNum.test(result)){
      result = 1
    }
    if (result.toString().includes('/')) {
      let values = result.split('/')
      if (values.length>2) {
        return 'invalid number'
      }
      result = (values[0]/values[1]);
    }
    if (isNaN(result)) {
      return 'invalid number';
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-z]+$/i);
    if (!result) return '';
    if (result[0] === 'L')
      return result[0];
    if (result[0] === 'l')
      return result[0].toUpperCase();
	  return result[0].toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
  	let result;
  
  	switch(initUnit) {
  		case 'km':
  		case 'KM':
  			result = 'mi';
  			break;
  		case 'mi':
  		case 'MI':
  			result = 'km';
  			break;
  		case 'KG':
  		case 'kg':
  			result = 'lbs';
  			break;
  		case 'lbs':
  		case 'LBS':
  			result = 'kg';
  			break;
  		case 'gal':
  		case 'GAL':
  			result = 'L';
  			break;
  		case 'L':
  		case 'l':
  			result = 'gal';
  			break;
  		default:
  			return 'invalid unit';
  	}
  	return result;
  };

  this.spellOutUnit = function(unit) {
	  let result;

  	switch(unit) {
  		case 'km':
  		case 'KM':
  			result = 'kilometers';
  			break;
  		case 'mi':
  		case 'MI':
  			result = 'miles';
  			break;
  		case 'kg':
  		case 'KG':
  			result = 'kilograms';
  			break;
  		case 'lbs':
  		case 'LBS':
  			result = 'pounds';
  			break;
  		case 'gal':
  		case 'GAL':
  			result = 'gallons';
  			break;
  		case 'L':
  		case 'l':
  			result = 'liters';
  			break;
  		default:
  			return 'invalid unit';
  	}
  	return result;
  };
  
  this.convert = function(initNum, initUnit) {
  	const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
      
    let result;
    switch(initUnit) {
		  case 'km':
  		case 'KM':
  			result = (initNum / miToKm).toFixed(5);
  			break;
  		case 'mi':
  		case 'MI':
  			result = (initNum * miToKm).toFixed(5);
  			break;
  		case 'kg':
  		case 'KG':
  			result = (initNum / lbsToKg).toFixed(5);
  			break;
  		case 'lbs':
  		case 'LBS':
  			result = (initNum * lbsToKg).toFixed(5);
  			break;
  		case 'gal':
  		case 'GAL':
  			result = (initNum * galToL).toFixed(5);
  			break;
  		case 'L':
  		case 'l':
  			result = (initNum / galToL).toFixed(5);
  			break;
  		default:
  			return 'invalid unit';
	  }    
    return Number(result);  
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = '';

    result += initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
