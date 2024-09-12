const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require('fs').promises;

let mensagem = 'Seja bem-vindo(a) ao App de metas!';

let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile('metas.json', 'utf-8');
    metas = JSON.parse(dados);
  } catch (error) {
    metas = [];
  }
};

const salvarMetas = async () => {
  await fs.writeFile('metas.json', JSON.stringify(metas, null, 2));
};

const cadastrarMeta = async () => {
  const meta = await input({ message: 'Digite a meta:' });

  if (meta.length === 0) {
    mensagem = 'A meta não pode ser vazia!';
    return;
  }

  metas.push({ value: meta, checked: false });
  mensagem = 'Meta cadastrada com sucesso!';
};

const listarMetas = async () => {
  if (metas.length === 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }

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
    mensagem = 'Nenhuma meta selecionada!';
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => m.value === resposta);
    meta.checked = true;
  });

  mensagem = 'Meta(s) marcada(s) como concluída(s)!';
};

const metasRealizadas = async () => {
  if (metas.length === 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }

  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length === 0) {
    meta = 'Nenhuma meta realizada! =(';
    return;
  }

  await select({
    message: `${realizadas.length} Metas Realizadas`,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if (metas.length === 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }

  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length === 0) {
    mensagem = 'Nenhuma meta aberta! =)';
    return;
  }

  await select({
    message: `${abertas.length} Metas Abertas`,
    choices: [...abertas],
  });
};

const deletarMetas = async () => {
  if (metas.length === 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }

  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });
  const itemsADeletar = await checkbox({
    message: 'Selecione as metas que deseja deletar',
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itemsADeletar.length === 0) {
    mensagem = 'Nenhuma meta selecionada para deletar!';
    return;
  }

  itemsADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value !== item;
    });
  });

  mensagem = 'Meta(s) deletada(s) com sucesso!';
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem !== '') {
    console.log(mensagem);
    console.log('');
    mensagem = '';
  }
};

const start = async () => {
  await carregarMetas();

  while (true) {
    mostrarMensagem();
    await salvarMetas();

    const opcao = await select({
      message: 'Menu >',
      choices: [
        { name: 'Cadastrar', value: 'cadastrar' },
        { name: 'Listar metas', value: 'listar' },
        { name: 'Metas realizadas', value: 'realizadas' },
        { name: 'Metas abertas', value: 'abertas' },
        { name: 'Deletar metas', value: 'deletar' },
        { name: 'Sair', value: 'sair' },
      ],
    });

    switch (opcao) {
      case 'cadastrar':
        await cadastrarMeta();
        break;
      case 'listar':
        await listarMetas();
        break;
      case 'realizadas':
        await metasRealizadas();
        break;
      case 'abertas':
        await metasAbertas();
        break;
      case 'deletar':
        await deletarMetas();
        break;
      case 'sair':
        console.log('Saindo... Até a próxima!');
        return;
    }
  }
};

start();
