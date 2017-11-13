var lastDigit = function(arr) {
  if (arr.length === 0) return 1;
  if (arr.length === 1) return arr[0].toString().slice(-1);
  if (arr.length === 2) return lastDigitOfTwo(arr[0].toString(), arr[1].toString());
  var reduceWith = function(twoDigits) {
    return lastDigit(arr.slice(0, arr.length - 2).concat([parseInt(twoDigits.toString().slice(-2))]));
  }
  
  
  var base = arr.slice(-2, -1).toString().slice(-2).padStart(2, "0");
  var expo = arr.slice(-1).toString().slice(-2);
  return reduceWith(lastTwoDigits(base, expo));
}

var lastTwoDigits = function(base, expo) {
  var endsInOne = function(base, expo) {
    return (base[0] * expo.slice(-1) + "1").slice(-2);
  }
  base = base.toString();
  expo = expo.toString();
  switch (base.slice(-1)) {
    case "0":
      return (10 ** expo.slice(-1));
    case "1":
      return endsInOne(base, expo);
    case "5":
      var twos = base[0] % 2 == 1 && expo % 2 == 1 
                    ? 75
                    : 25;
      return (twoDigits);
    case "9":
      var twos = (base ** expo % 2) * endsInOne(base * 2, parseInt(expo / 2));
      return twos;
    case "3":
    case "7":
      var twos = (base ** expo % 4) * endsInOne(base * 4, parseInt(expo / 4));
      return twos;
    case "2":
    case "4":
    case "6":
    case "8":
      return 11;
  }
}


var lastDigitOfTwo = function(str1, str2){  
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

console.log(lastTwoDigits(64, 236)); //36
console.log(lastTwoDigits(2, 543)); //08
console.log(lastTwoDigits(62, 586)); //84
console.log(lastTwoDigits(56, 287)); //76
console.log(lastTwoDigits(33, 288)); //41
