import produtoController from './controller/produtoController.js';

export function adicionarRotas(api) {
    api.use(produtoController);
}
