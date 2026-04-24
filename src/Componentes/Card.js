import { buscarFotoMenu } from './RotacaoMidia.js';

export function renderizarCards(container, perfils) {
  if (!perfils.length) {
    container.innerHTML = '<p class="empty-state">Nenhum perfil encontrado.</p>';
    return;
  }

  container.innerHTML = `
    <div class="cards-grid">
      ${perfils
        .map((perfil) => {
          const capa = buscarFotoMenu(perfil.midia);

          return `
            <article class="card">
              <img class="card-media-principal" src="${capa}" alt="${perfil.identidade.nome}" loading="lazy">
              <div class="card-body">
                <h3>${perfil.identidade.nome}</h3>
                <p class="subtitle">${perfil.descricaoCurta}</p>
              </div>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
}