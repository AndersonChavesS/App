// arrays, objetos
let meta = {
  value: 'ler um livro por mês',
  address: 2,
  checked: true,
  log: (info) => {
    console.log(info);
  },
};

meta.value = 'não é mais ler um livro'
meta.log(meta.value);

// function // arrow function
// const criarMeta = () => {};

// function criarMeta() {} // function declaration
