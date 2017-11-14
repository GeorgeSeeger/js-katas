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
  base = base.toString();
  expo = expo.toString();
  
  function endsInOne(base, expo) {
    return (base.toString().slice(-2, -1) * (expo % 10) + "1") % 100;
  }

  function endsInEvenN(base, expo) {
    var rem = base / 2;
    var oddPowerofXX24 = parseInt(expo / 10) % 2 == 1;
    var ans = (2 ** (expo % 10)) * (oddPowerofXX24 ? 24 : 76) * lastTwoDigits(rem, expo);
    return ans % 100;
  }

  switch (base.slice(-1)) {
    case "0":
      return (10 ** expo.slice(-1));
    case "1":
      return endsInOne(base, expo);
    case "5":
      return base[0] % 2 == 1 && expo % 2 == 1 
                    ? 75
                    : 25;
    case "9":
      return (base ** (expo % 2)) * endsInOne(base ** 2, parseInt(expo / 2));
    case "3":
    case "7":
      return (base ** (expo % 4)) * endsInOne(base ** 4, parseInt(expo / 4));
    case "2":
    case "4":
    case "6":
    case "8":
      return endsInEvenN(base, expo);
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
console.log(lastTwoDigits(56, 283)); //16
console.log(lastTwoDigits(33, 288)); //41
console.log(lastTwoDigits(19, 266)); //81
console.log(lastTwoDigits(71, 56747)); //91
console.log(lastTwoDigits(125, 28)); //25
console.log(lastTwoDigits(115, 35)); //75



