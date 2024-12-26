export default function trim(string, toBeTrimmed) {
  if (typeof string !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let start = 0;
  let end = string.length - 1;

  while (start <= end && string[start] === toBeTrimmed) {
    start++;
  }

  while (end >= start && string[end] === toBeTrimmed) {
    end--;
  }

  return string.substring(start, end + 1);
}
