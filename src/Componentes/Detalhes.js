import { renderizarGaleria } from './Galeria.js';

export function renderizarDetalhes(container, perfil) {
  container.innerHTML = `
    <section class="perfil-detalhes">
      <h1>${perfil.identidade.nome}</h1>
      <p>${perfil.descricaoCompleta}</p>

      ${renderizarGaleria(perfil.midia)}
    </section>
  `;
}