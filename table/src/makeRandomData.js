import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i + 1);
  }
  return arr;
};

const newPerson = () => {
  return {
    date: `20${('0' + (Math.floor(Math.random() * 20))).slice(-2)}-${('0' + (Math.ceil(Math.random() * 12))).slice(-2)}-${('0' + (Math.ceil(Math.random() * 28))).slice(-2)}`,
    name: namor.generate({ words: 1, numbers: 0, saltLength: 0, subset: "manly"}),
    quantity: Math.floor(Math.random() * 1000),
    distance: Math.floor(Math.random() * 100),
  };
};

export function makeData(len = 2000) {
  return range(len).map(id => {
    return {...newPerson(), id}   
  });
}
