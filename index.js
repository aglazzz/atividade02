import express from 'express';

const host = "0.0.0.0";
const porta = 3000;
var listaProdutos = [];

const server = express();

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Menu Principal</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light text-center p-5">
            <h1 class="mb-4">Sistema de Cadastro de Produtos</h1>
            <a href="/cadastroProduto" class="btn btn-primary m-2">Cadastrar Produto</a>
            <a href="/listarProdutos" class="btn btn-secondary m-2">Listar Produtos</a>
        </body>
        </html>
    `);
});

server.get("/cadastroProduto", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Produto</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container mt-5 p-4 rounded shadow bg-white">
                <h2 class="mb-4 text-center">Cadastro de Produto</h2>
                <form method="POST" action="/adicionarProduto" class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Nome do Produto</label>
                        <input type="text" name="nome" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Categoria</label>
                        <select name="categoria" class="form-select" required>
                            <option value="">Selecione</option>
                            <option value="Medicamento">Medicamento</option>
                            <option value="Higiene">Higiene</option>
                            <option value="Cosmético">Cosmético</option>
                            <option value="Suplemento">Suplemento</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Preço (R$)</label>
                        <input type="number" step="0.01" name="preco" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Estoque</label>
                        <input type="number" name="estoque" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Fabricante</label>
                        <input type="text" name="fabricante" class="form-control">
                    </div>
                    <div class="col-12">
                        <label class="form-label">Descrição</label>
                        <textarea name="descricao" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="col-12 text-center mt-3">
                        <button class="btn btn-primary">Salvar</button>
                        <a href="/" class="btn btn-outline-secondary">Voltar</a>
                    </div>
                </form>
            </div>
        </body>
        </html>
    `);
});

server.post("/adicionarProduto", (req, res) => {
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const preco = req.body.preco;
    const estoque = req.body.estoque;
    const fabricante = req.body.fabricante;
    const descricao = req.body.descricao;

    listaProdutos.push({ nome, categoria, preco, estoque, fabricante, descricao });
    res.redirect("/listarProdutos");
});

server.get("/listarProdutos", (req, res) => {
    let conteudo = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Lista de Produtos</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container mt-5">
                <h2 class="text-center mb-4">Produtos Cadastrados</h2>
                <table class="table table-bordered table-striped text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Preço (R$)</th>
                            <th>Estoque</th>
                            <th>Fabricante</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    for(let i = 0; i < listaProdutos.length; i++){
        conteudo += `
            <tr>
                <td>${listaProdutos[i].nome}</td>
                <td>${listaProdutos[i].categoria}</td>
                <td>${listaProdutos[i].preco}</td>
                <td>${listaProdutos[i].estoque}</td>
                <td>${listaProdutos[i].fabricante}</td>
                <td>${listaProdutos[i].descricao}</td>
            </tr>
        `;
    }

    conteudo += `
    
                    </tbody>
                </table>
                <div class="text-center">
                    <a href="/cadastroProduto" class="btn btn-primary">Voltar</a>
                </div>
            </div>
        </body>
        </html>
    `;

    res.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});