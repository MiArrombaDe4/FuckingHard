import { buscarMedidasVisiveis } from '../Dados/Repositorio.js';
import { buscarFotoPerfil } from './RotacaoMidia.js';
import { renderizarGaleria, configurarGaleria } from './Galeria.js';

const ROTULOS_MEDIDAS = {
  bunda: 'Bunda',
  cintura: 'Cintura',
  coxas: 'Coxas',
  peitos: 'Peitos',
  buceta: 'Buceta',
  cu: 'Anal',
  tamanhoRola: 'Rola',
  grossuraRola: 'Grossura da rola',
  bolas: 'Bolas'
};

function renderizarResumoMedidas(medidas) {
  return medidas
    .slice(0, 6)
    .map((medida) => `<li><span>${ROTULOS_MEDIDAS[medida.chave] || medida.chave}</span><strong>${medida.value}</strong></li>`)
    .join('');
}

export function renderizarDetalhes(container, perfil) {
  if (!perfil) {
    container.innerHTML = '<p class="empty-state">Perfil não encontrado.</p>';
    return;
  }

  const { identidade, preferencias, experienciaSexual, descricaoCompleta, midia } = perfil;
  const medidas = buscarMedidasVisiveis(perfil);
  const capa = buscarFotoPerfil(midia);
  const progresso = Math.min(100, Math.max(10, Math.round((experienciaSexual.contagemSexo / 1000) * 100)));

  container.innerHTML = `
    <a href="./index.html" class="link">← Voltar</a>
    <article class="perfil perfil-rpg">
      <div class="perfil-stage">
        <div class="fundo-ambiente" aria-hidden="true"></div>

        <aside class="menu-perfil">
          <img class="avatar-mini" src="${capa}" alt="Avatar de ${identidade.nome}">
          <button class="botao-ui">Roupas</button>
          <button class="botao-ui">Banho</button>

          <section class="painel-ui">
            <h1>${identidade.nome}</h1>
            <p>Nível: ${Math.max(1, Math.floor(experienciaSexual.contagemSexo / 50))}</p>
            <div class="barra-status" role="img" aria-label="Progresso ${progresso}%">
              <span style="width:${progresso}%"></span>
            </div>
            <p>Clientes que fez gozar: ${experienciaSexual.rolasExperimentadas}</p>

            <ul class="stats-grid">
              ${renderizarResumoMedidas(medidas)}
            </ul>

            <h2>Habilidades</h2>
            <p>${(preferencias.fetiche || []).slice(0, 3).join(' • ') || 'Sem habilidades cadastradas.'}</p>
            <p>${descricaoCompleta.slice(0, 160)}...</p>

            <button class="botao-ui botao-centro">Biografia</button>
          </section>

          <button class="botao-ui botao-sair">Sair</button>
        </aside>

        <section class="acoes-laterais" aria-label="Ações rápidas">
          <button class="card-acao">💤<span>Dormir</span></button>
          <button class="card-acao">🎞️<span>Galeria</span></button>
          <button class="card-acao">📖<span>Diário</span></button>
        </section>

        <section class="painel-roupas">
          <header>
            <h2>${preferencias.roupaFavorita || 'Outfit padrão'}</h2>
            <button class="botao-ui">Variações</button>
          </header>
          <p>Modelo principal inspirado no layout de referência, mantendo os cartões em destaque.</p>
          ${renderizarGaleria(midia)}
          <button class="botao-ui">Roupa diária aleatória: Desligada</button>
        </section>

        <img class="personagem-destaque" src="${capa}" alt="${identidade.nome}">
      </div>
    </article>
  `;

  configurarGaleria(container);
}
