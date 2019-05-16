
// All Related to String Manipulation
function capitalize(str) {
	if (str) {
		if(str.trim() != '' ) {
			return str.toLowerCase().split(' ').map(function(word) {
				return word.replace(word[0], word[0].toUpperCase());
			}).join(' ');
		}else{
			return ''
		}
	}
}
function setDefaultVal(value, defaultValue){
	return (value === undefined) ? defaultValue : value;
}





// All Related to Numbers
function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function numberWithCommas(number) {
	if (isNumeric(number))  {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return 0;
}
function convertHex (hex, opacity) {  //hex to rgba eg: convertHex(#63c2de, 10),
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}



export {
  // String
  capitalize,
  setDefaultVal,

  // Numbers
  randomNumber,
  numberWithCommas,
  convertHex

};
