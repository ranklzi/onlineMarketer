'use strict';


var generateGuid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
});
console.log('guiddddddddddddddddddddddddddd');
console.log(generateGuid());

exports.generateGuid = function() {
	function s4() {
    	return Math.floor((1 + Math.random()) * 0x10000)
          	.toString(16)
       		.substring(1);
  	}

  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
};