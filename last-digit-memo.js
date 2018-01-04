var memo = { "1": {"offset": 0, "vals": ['1']},
            "01": {"offset": 0, "loopLength": 0, "vals": ['01']}, };


var lastDigit = function(arr) {
  if (arr.length === 0) return 1;
  if (arr.length === 1) return +arr[0].toString().slice(-1);
  console.log(arr);
  var base = arr.slice(-2, -1).toString().slice(-2);
  var expo = arr.slice(-1).toString().slice(-2);  
  return lastDigit(arr.slice(0, arr.length - 2).concat([lastTwoDigits(base, expo, memo)]));
}

var lastTwoDigits = (base, expo, memo) => {
  if (expo === "0") return 1;
  if (expo.slice(-2, 1) === "0") expo = (+expo + 100).toString();
  if (!!memo[base]) {
    var res = memo[base];
    var offset = res.offset;
    if (res.vals.length == 1){ return res.vals[0]; }
    if (expo < res.vals.length){ return res.vals[expo - 1]; }
    var index = ((expo - offset) % res.loopLength - 1 + res.loopLength ) % res.loopLength + offset;
    return res.vals[index];
  } else {
    var vals = [];
    var val = base.slice(-2)
    var indice = val;
    while (true){
      vals.push(val);
      val = val === '00' ? val : (val * indice).toString().slice(-2);

      if (vals.includes(val)) {
        memo[base] = {
          "offset": vals.indexOf(val),
          "loopLength": vals.length - vals.indexOf(val),
          "vals": vals
        }
        break;
      }
    }
    return lastTwoDigits(base, expo, memo);
  }
}

// console.log(lastTwoDigits("64" , 236, memo)); //36
// console.log(lastTwoDigits("2"  , 543, memo)); //8
// console.log(lastTwoDigits("62" , 586, memo)); //84
// console.log(lastTwoDigits("56" , 283, memo)); //16
// console.log(lastTwoDigits("33" , 288, memo)); //41
// console.log(lastTwoDigits("19" , 266, memo)); //81
// console.log(lastTwoDigits("71" , 56747, memo)); //91
// console.log(lastTwoDigits("125", 28, memo)); //25
// console.log(lastTwoDigits("115", 35, memo)); //75
// console.log(lastTwoDigits("30", "21", memo)) //00
// console.log(lastTwoDigits("12", "00", memo)) //x6
console.log(lastTwoDigits("01", "2", memo)) //01
// console.log(lastDigit([2,2,2,101,2]));
// console.log(lastTwoDigits("12", 30, memo))
console.log(memo);