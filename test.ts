let i = 2;

try {
  if (i == 1) {
  } else {
    throw new Error('hello');
  }
} catch (err) {
  console.log("hello");
  throw err;
}
