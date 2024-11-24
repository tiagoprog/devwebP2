const params = new URLSearchParams(window.location.search);
const id = params.get("id");


const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados: ' + resposta.statusText);
        }
        return await resposta.json();
    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao carregar os dados.');
    }
};

const exibirDetalhes = (obj) => {

    const nome = document.createElement("h1");
    nome.innerHTML = obj.nome;
    document.body.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.src = obj.imagem;
    imagem.alt = `Foto de ${obj.nome}`;
    document.body.appendChild(imagem);

    const descri = document.createElement("p");
    descri.innerHTML = obj.detalhes;
    document.body.appendChild(descri);
};

pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`)
    .then(obj => {
        if (obj) {
            exibirDetalhes(obj);
        }
    });