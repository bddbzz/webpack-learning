export default function add(a, b) {
  const i = a.length - 1;
  const j = b.length - 1;
  let ret = '';
  let carry = 0;
  while (i >= 0 || j >= 0) {
    let x = 0;
    let y = 0;
    let sum = 0;
    if (i >= 0) {
      x = a[i] - '0';
    }
    if (j >= 0) {
      y = b[i] - '0';
    }
    sum = x + y;
    if (sum >= 10) {
      sum -= 10;
      carry = 1;
    } else {
      carry = 0;
    }
    ret += sum;
  }
  if (carry > 0) {
    ret = carry + ret;
  }
  return ret;
}
