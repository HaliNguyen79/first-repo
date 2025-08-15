// write e function to calculate the sum of power to 2 of each element of an array.
function sumArray(numbers) {
  const convertNumbers = numbers.maps((number) => number * number);
  let sum = 0;
  for (let i = 0; i < convertNumbers.length; i++) {
    sum += convertNumbers[i];
  }
  return sum;
}

console.log(sumArray([1, 2, 3]));

async function userData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    data.forEach((person) => {
      console.log(person.name);
    });
  } catch (error) {
    console.log(error);
  }
}
//Create a button that, when clicked, increases a number shown on the screen by 1.