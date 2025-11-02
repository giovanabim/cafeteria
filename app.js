let section = document.getElementById("itens"); // secao do cardapio
let sectionCarrinho = document.getElementById("tabela-itens"); // secao do carrinho
let carrinhoData = []; // contem os dados mais importantes dos itens do carrinho
let carrinhoHTML = ""; // contém os elementos 
let resultados = "";

for (let item of cafes) { // renderiza os itens no cardapio
    resultados += `
    <div class="item" data-id="${item.id}">
        <img src="${item.foto}" alt="">  
        <div class="info">
            <h3 id="nome">${item.nome}</h3>
            <p id="descricao">${item.descricao}</p>
            <h4 id="preco">R$${item.preco}</h4>
            <button onclick="adicionarCarrinho(this)">Adicionar ao carrinho</button>
        </div>
    </div>`;
}
section.innerHTML = resultados;

function pesquisa() {
    resultados = "";
    section.innerHTML = resultados;

    let valorPesquisa = document.getElementById("pesquisa").value;
    valorPesquisa = valorPesquisa.toLowerCase();

    let nome = "";
    let descricao = "";

    for (let item of cafes) {
        nome = item.nome.toLowerCase();
        descricao = item.descricao.toLowerCase();

        if (nome.includes(valorPesquisa) || descricao.includes(valorPesquisa)) {
            resultados += `
            <div class="item" data-id="${item.id}">
                <img src="${item.foto}" alt="">  
                <div class="info">
                    <h3 id="nome">${item.nome}</h3>
                    <p id="descricao">${item.descricao}</p>
                    <h4 id="preco">R$${item.preco}</h4>
                    <button onclick="adicionarCarrinho(this)">Adicionar ao carrinho</button>
                </div>
            </div>`;
        }
    }
    if (!resultados) {
        resultados = '<div class="erro-pesquisa"><p>Nada encontrado.</p></div>';
    }
    section.innerHTML = resultados;
}

function adicionarCarrinho(botao) { // poderia so colocar o data-id logo

    let itemH = botao.closest('.item');
    let itemId = itemH.dataset.id; // pega o data-id do item

    let item = cafes.find(cafe => cafe.id == itemId); // procura o item na array cafes que tem esse id
    // se nao existir, vai adicionar
    if (!carrinhoData.find(cafe => cafe.id == item.id)) {
        carrinhoData.push({
            id: item.id,
            preco: item.preco,
            qty: 1
        });
        carrinhoHTML += `
        <tr data-id="${item.id}">
            <td id="nome-cell">
                <img src="${item.foto}" alt="">
                <p id="nome">${item.nome}</p>
            </td>
            <td>
                <p id="preco">R$${item.preco}</p>
            </td>
            <td>
                <input type="number" data-id="${item.id}" id="quantidade" value="1" onchange="atualizarQty(${item.id}, this.value)">
            </td>
            <td><button onclick="apagarItem(${item.id})">X</button></td>
        </tr>`;
    }    

    sectionCarrinho.innerHTML = carrinhoHTML;
    calcularTotal();
}

function atualizarQty(itemId, novaQty) {
    let item = carrinhoData.find(cafe => cafe.id == itemId);
    item.qty = parseInt(novaQty);
    calcularTotal();
}

function calcularTotal() {
    let soma = 0;
    for (let item of carrinhoData) {
        soma += item.qty * item.preco;
    }
    let total = document.getElementById('total');
    total.textContent = `R$${soma.toFixed(2)}`;
}

function apagarItem(itemId) {
    carrinhoData = carrinhoData.filter(item => item.id != itemId);

    document.querySelector(`tr[data-id="${itemId}"]`).remove();
    carrinhoHTML = sectionCarrinho.innerHTML;
    calcularTotal();
}

function limparCarrinho() {
    carrinhoData = [];
    sectionCarrinho.innerHTML = "";
    calcularTotal();
}