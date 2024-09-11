const start = () => {
  while (true) {
    let opcao = 'sair';
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
