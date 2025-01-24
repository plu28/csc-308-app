const index = require('./index');

// div tests
test('index.div: 10 / 2 = 5', () => {
  target = 5;
  value = index.div(10, 2);
  expect(target).toBe(value);
});

test('index.div: 1 / 0 = Infinity', () => {
  target = Infinity;
  value = index.div(1, 0);
  expect(target).toBe(value);
});

test('index.div: 0 / 1 = 0', () => {
  target = 0;
  value = index.div(0, 1);
  expect(target).toBe(value);
});

test('index.div: 150 / 15 = 10', () => {
  target = 10;
  value = index.div(150, 15);
  expect(target).toBe(value);
});

const test_structure = (target, value) => expect(target).toBe(value);

// containsNumbers tests
test('index.containsNumbers: text = "" -> false', () => {
  target = false;
  value = index.containsNumbers("");
  expect(target).toBe(value);
});
test('index.containsNumbers: text = "5" -> true', () => {
  target = true;
  value = index.containsNumbers("5");
  expect(target).toBe(value);
});
test('index.containsNumbers: text = "t" -> false', () => {
  target = false;
  value = index.containsNumbers("t");
  expect(target).toBe(value);

});
test('index.containsNumbers: text = "5start" -> true', () => {
  target = true;
  value = index.containsNumbers("5start");
  expect(target).toBe(value);

});
test('index.containsNumbers: text = "end5" -> true', () => {
  target = true;
  value = index.containsNumbers("end5");
  expect(target).toBe(value);

});
test('index.containsNumbers: text = "no numbers" -> false', () => {
  target = false;
  value = index.containsNumbers("no numbers");
  expect(target).toBe(value);

});
test('index.containsNumbers: text = "number 5" -> true', () => {
  target = true;
  value = index.containsNumbers("number 5");
  expect(target).toBe(value);

});
