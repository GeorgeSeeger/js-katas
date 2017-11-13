var lastDigit = function(str1, str2){  
  if (parseInt(str2) === 0 ) return 1;
  var repeats = { "0" : [0],
                  "1" : [1],
                  "2" : [2,4,8,6],
                  "3" : [3,9,7,1],
                  "4" : [4,6],
                  "5" : [5, 0],
                  "6" : [6],
                  "7" : [7,9,3,1],
                  "8" : [8,4,2,6],
                  "9" : [9, 1]};
  
  var lastNum = str1[str1.length - 1];

  return repeats[lastNum][largeModulus(str2, parseInt(lastNum) - 1)];
} 

function largeModulus(str, mod) {
  var res = 0;
  for (var i = 0; i < str.length; i++) {
    res = (res * 10 + parseInt(str[i])) % mod;
  }
  return res;
}