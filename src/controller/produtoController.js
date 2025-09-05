import express from 'express';
import * as repo from '../repositories/produtoRepository.js';

const endpoint = express.Router();

endpoint.get('/produto', async (req, res) => {
    try {
        const produtos = await repo.listarProdutos();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
});

endpoint.get('/produto/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await repo.consultarProduto(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao consultar produto' });
    }
});

endpoint.get('/produto/filtro/nome', async (req, res) => {
    try {
        const nome = req.query.nome;
        const produtos = await repo.filtrarProduto(nome);
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao filtrar produtos' });
    }
});

endpoint.post('/produto', async (req, res) => {
    try {
        const novoProduto = req.body;
        const id = await repo.adicionarProduto(novoProduto);
        res.status(201).json({ newId: id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});

endpoint.put('/produto/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novosDados = req.body;
        await repo.alterarProduto(id, novosDados);
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

endpoint.delete('/produto/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await repo.removerProduto(id);
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover produto' });
    }
});

endpoint.patch('/produto/:id/adicionar', async (req, res) => {
    try {
        const id = req.params.id;
        const { quantidade } = req.body;
        await repo.adicionarEstoque(id, quantidade);
        res.json({ message: 'Estoque adicionado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar estoque' });
    }
});

endpoint.patch('/produto/:id/retirar', async (req, res) => {
    try {
        const id = req.params.id;
        const { quantidade } = req.body;
        await repo.retirarEstoque(id, quantidade);
        res.json({ message: 'Estoque retirado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao retirar estoque' });
    }
});

export default endpoint;
