function itensMidia(midia) {
  const valido = (src) => typeof src === 'string' && src.trim();

  const imagens = (midia.imagens || []).filter(valido);
  const gifs = (midia.gifs || []).filter(valido);

  return [...imagens, ...gifs];
}

export function renderizarGaleria(midia) {
  const itens = itensMidia(midia);

  if (!itens.length) {
    return '<p class="empty-state">Nenhuma mídia cadastrada.</p>';
  }

  return `
    <section class="media-grid">
      <h2>Mídia</h2>

      <div class="profile-media-grid">
        ${itens
          .map(
            (src) => `
              <img class="media-thumb" src="${src}" loading="lazy">
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

export function configurarGaleria() {
  // sem clique, sem modal
}