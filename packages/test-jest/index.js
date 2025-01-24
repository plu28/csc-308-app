
function div (a, b){
  return a / b;
}

function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    char = text.charAt(i);
    // javascript treats whitespace as a number for some reason
    if (!isNaN(char) && char !== ' ') return true;
  }
  return false;
}

exports.div = div;
exports.containsNumbers = containsNumbers;
