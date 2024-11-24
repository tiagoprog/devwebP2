const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
  };
  
  const exibe_jogadores = (jogadores) => {
    const container = document.getElementById('atletas-container');
    container.innerHTML = '';
  
    if (jogadores.length === 0) {
      container.innerHTML = '<p>Nenhum jogador encontrado nesta categoria.</p>';
      return;
    }
  
    jogadores.forEach((jogador) => {
      const jogadorDiv = document.createElement('div');
      jogadorDiv.classList.add('player');
  
      const nome = document.createElement("h2");
      nome.innerHTML = jogador.nome;
      jogadorDiv.appendChild(nome);
  
      const imagem = document.createElement("img");
      imagem.src = jogador.imagem;
      imagem.alt = `Foto de ${jogador.nome}`;
      jogadorDiv.appendChild(imagem);
  
      const descricao = document.createElement("p");
      descricao.innerHTML = jogador.detalhes;
      jogadorDiv.appendChild(descricao);
  
      const linkDetalhes = document.createElement("a");
      linkDetalhes.href = `detalhes.html?id=${jogador.id}`;
      linkDetalhes.innerHTML = "Saiba Mais";
      jogadorDiv.appendChild(linkDetalhes);
  
      container.appendChild(jogadorDiv);
    });
  };
  
  const buscarJogadores = (filtro) => {
    let url = '';
  
    switch (filtro) {
      case 'masculino':
        url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
        break;
      case 'feminino':
        url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
        break;
      case 'all':
        url = 'https://botafogo-atletas.mange.li/2024-1/all';
        break;
      default:
        return;
    }
  
    pega_json(url).then((dados) => {
      exibe_jogadores(dados);
    });
  };
  
  const filtrarAtletas = (filtro) => {
    const container = document.getElementById('atletas-container');
    const jogadores = container.getElementsByClassName('player');
  
    for (let i = 0; i < jogadores.length; i++) {
      const nomeJogador = jogadores[i].getElementsByTagName('h2')[0].innerText.toLowerCase();
      if (nomeJogador.includes(filtro.toLowerCase())) {
        jogadores[i].style.display = 'block';
      } else {
        jogadores[i].style.display = 'none';
      }
    }
  };
  
  export const carregaAtletas = () => {
    document.body.innerHTML = '';
    document.body.id = 'atletas-body';
    const header = document.createElement('div');
    header.classList.add('header');
  
    const titulo = document.createElement('h1');
    titulo.innerText = 'Atletas Botafogo 2024-1';
    header.appendChild(titulo);
  
    const sairBtn = document.createElement('button');
    sairBtn.innerText = 'Sair';
    sairBtn.classList.add('botao-sair');
    sairBtn.onclick = () => {
      sessionStorage.removeItem('auth');
      window.location.reload(); 
    };
  
    header.appendChild(sairBtn);
    document.body.appendChild(header);
  
    const barraPesquisa = document.createElement('input');
    barraPesquisa.type = 'text';
    barraPesquisa.classList.add('barra-pesquisa');
    barraPesquisa.placeholder = 'Pesquise atletas...';
    barraPesquisa.oninput = (e) => filtrarAtletas(e.target.value);
  
    document.body.appendChild(barraPesquisa);
  
    const botoes = document.createElement('div');
    botoes.classList.add('botoes-filtragem');
  
    const btnMasculino = document.createElement('button');
    btnMasculino.innerText = 'Masculino';
    btnMasculino.classList.add('botao-filtragem');
    btnMasculino.onclick = () => buscarJogadores('masculino');
  
    const btnFeminino = document.createElement('button');
    btnFeminino.innerText = 'Feminino';
    btnFeminino.classList.add('botao-filtragem');
    btnFeminino.onclick = () => buscarJogadores('feminino');
  
    const btnTodos = document.createElement('button');
    btnTodos.innerText = 'Elenco Geral';
    btnTodos.classList.add('botao-filtragem');
    btnTodos.onclick = () => buscarJogadores('all');
  
    botoes.appendChild(btnMasculino);
    botoes.appendChild(btnFeminino);
    botoes.appendChild(btnTodos);
    document.body.appendChild(botoes);
  
    const container = document.createElement('div');
    container.id = 'atletas-container';
    document.body.appendChild(container);
  
    buscarJogadores('all');
  };