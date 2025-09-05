import { connection } from './connection.js';

export async function listarProdutos() {
    const comando = `
        SELECT *
        FROM produto
    `;
    const [registros] = await connection.query(comando);
    return registros;
}

export async function consultarProduto(id) {
    const comando = `
        SELECT *
        FROM produto
        WHERE id = ?
    `;
    const [registros] = await connection.query(comando, [id]);
    return registros[0];
}

export async function filtrarProduto(nome) {
    const comando = `
        SELECT *
        FROM produto
        WHERE nome LIKE ?
    `;
    const [registros] = await connection.query(comando, [`%${nome}%`]);
    return registros;
}

export async function adicionarProduto(novoProduto) {
    const comando = `
        INSERT INTO produto (nome, preco, quantidade, subcategoria)
        VALUES (?, ?, ?, ?)
    `;
    const [info] = await connection.query(comando, [
        novoProduto.nome,
        novoProduto.preco,
        novoProduto.quantidade,
        novoProduto.subcategoria
    ]);
    return info.insertId;
}

export async function alterarProduto(id, novosDados) {
    const comando = `
        UPDATE produto
        SET nome = ?, preco = ?, quantidade = ?, subcategoria = ?
        WHERE id = ?
    `;
    await connection.query(comando, [
        novosDados.nome,
        novosDados.preco,
        novosDados.quantidade,
        novosDados.subcategoria,
        id
    ]);
}

export async function removerProduto(id) {
    const comando = `
        DELETE FROM produto
        WHERE id = ?
    `;
    await connection.query(comando, [id]);
}

export async function adicionarEstoque(id, quantidade) {
    const comando = `
        UPDATE produto
        SET quantidade = quantidade + ?
        WHERE id = ?
    `;
    await connection.query(comando, [quantidade, id]);
}

export async function retirarEstoque(id, quantidade) {
    const comando = `
        UPDATE produto
        SET quantidade = quantidade - ?
        WHERE id = ?
    `;
    await connection.query(comando, [quantidade, id]);
}
