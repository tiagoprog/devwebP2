import { hex_sha256 } from './sha256-min.mjs';
import { carregaAtletas } from './codigo.js';

const testaSenha = (senha) => {
  const senhaCorreta = 'senha';
  const senhaCorretaHash = hex_sha256(senhaCorreta);

  if (hex_sha256(senha) === senhaCorretaHash) {
    sessionStorage.setItem('auth', 'true');
    carregaAtletas(); 
  } else {
    alert('Senha incorreta! Tente novamente.');
  }
};

const configuraEntrada = () => {
  sessionStorage.setItem('screen', 'login');
  document.body.innerHTML = '';
  document.body.id = 'login-body';

  const container = document.createElement('div');
  container.id = 'container-entrada';

  const imagemDiv = document.createElement('div');
  imagemDiv.classList.add('imagem-div');
  const imagem = document.createElement('img');
  imagem.src = 'escudo.png';
  imagem.alt = 'Imagem de login';
  imagemDiv.appendChild(imagem);

  const loginDiv = document.createElement('div');
  loginDiv.classList.add('login-div');

  const titulo = document.createElement('h1');
  titulo.innerHTML = 'Bem-vindo!';
  titulo.classList.add('titulo');

  const texto = document.createElement('p');
  texto.innerHTML = 'Feito pelo aluno: Tiago Macedo';
  texto.classList.add('texto');

  const inputSenha = document.createElement('input');
  inputSenha.id = 'input-senha';
  inputSenha.placeholder = 'Digite a senha';
  inputSenha.type = 'password';
  inputSenha.classList.add('input-senha');

  const senhaCorretaDisplay = document.createElement('p');
  senhaCorretaDisplay.innerHTML = `Senha correta: <strong>senha</strong>`;
  senhaCorretaDisplay.classList.add('senha-correta-display');

  const botaoLogin = document.createElement('button');
  botaoLogin.innerHTML = 'Entrar';
  botaoLogin.classList.add('botao-login');
  botaoLogin.onclick = () => testaSenha(inputSenha.value);

  loginDiv.appendChild(titulo);
  loginDiv.appendChild(texto);
  loginDiv.appendChild(inputSenha);
  loginDiv.appendChild(senhaCorretaDisplay);
  loginDiv.appendChild(botaoLogin);

  container.appendChild(imagemDiv);
  container.appendChild(loginDiv);

  document.body.appendChild(container);
};

configuraEntrada();