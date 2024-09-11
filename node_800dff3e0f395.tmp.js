const { select } = require('@inquirer/prompts');

const start = async () => {
  while (true) {
    const opcao = await select({
      message: 'Menu >',
      choices: [
        { name: 'Cadastrar', value: 'cadastrar' },
        { name: 'Sair', value: 'sair' },
      ],
    });

    switch (opcao) {
      case 'cadastrar':
        console.log('Cadastrando...');
        break;
      case 'listar':
        console.log('Listando...');
        break;
      case 'sair':
        return;
    }
  }
};

start();
