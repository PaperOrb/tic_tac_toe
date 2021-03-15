function detect(nestedArr) {
  let victory = nestedArr.some((arr) => {
    return arr.every((int) => {
      return int === 1;
    });
  });
  return victory;
}

let testVar = detect([
  [2, 1],
  [1, 2],
]);

console.log(testVar);
