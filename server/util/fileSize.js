export default function unhumanize(text) {
  var powers = { kb: 1, mb: 2, gb: 3, tb: 4 };

  var res = text.split(" ");

  var val = res[0] * Math.pow(1024, powers[res[1]]);
  console.log(val);
  return val;
}
