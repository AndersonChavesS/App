const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
  value: 'Tomar 3l de água por dia',
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: 'Digite a meta:' });

  if (meta.length === 0) {
    console.log('A meta não pode ser vazia!');
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      'Utilize as setas para navegar , espaço para selecionar e enter para confirmar',
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length === 0) {
    console.log('Nenhuma meta selecionada!');
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => m.value === resposta);
    meta.checked = true;
  });

  console.log('Meta(s) marcada(s) como concluída(s)!');
};

const MetasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length === 0) {
    console.log('Nenhuma meta realizada! =(');
    return;
  }

  await select({
    message: `${realizadas.length} Metas Realizadas`,
    choices: [...realizadas],
  });
};

const MetasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length === 0) {
    console.log('Nenhuma meta aberta! =)');
    return;
  }

  await select({
    message: `${abertas.length} Metas Abertas`,
    choices: [...abertas],
  });
};

const start = async () => {
  while (true) {
    const opcao = await select({
      message: 'Menu >',
      choices: [
        { name: 'Cadastrar', value: 'cadastrar' },
        { name: 'Listar metas', value: 'listar' },
        { name: 'Metas realizadas', value: 'realizadas' },
        { name: 'Metas abertas', value: 'abertas' },
        { name: 'Sair', value: 'sair' },
      ],
    });

    switch (opcao) {
      case 'cadastrar':
        await cadastrarMeta();
        console.log(metas);
        break;
      case 'listar':
        await listarMetas();
        break;
      case 'realizadas':
        await MetasRealizadas();
        break;
      case 'abertas':
        await MetasAbertas();
        break;
      case 'sair':
        console.log('Saindo... Até a próxima!');
        return;
    }
  }
};

start();
