export default function arrangeTitle() {
  let title = '';
  const currentURL = window.location.href;
  if (currentURL.includes('comidas')) title = 'Comidas';
  if (currentURL.includes('bebidas')) title = 'Bebidas';
  if (currentURL.includes('explorar')) title = 'Explorar';
  if (currentURL.includes('receitas-feitas')) title = 'Receitas Feitas';
  if (currentURL.includes('explorar/bebidas')) title = 'Explorar Bebidas';
  if (currentURL.includes('explorar/comidas')) title = 'Explorar Comidas';
  if (currentURL.includes('perfil')) title = 'Perfil';
  if (currentURL.includes('receitas-favoritas')) title = 'Receitas Favoritas';
  if (currentURL.includes('comidas/ingredientes')) {
    title = 'Explorar Ingredientes';
  }
  if (currentURL.includes('bebidas/ingredientes')) {
    title = 'Explorar Ingredientes';
  }
  if (currentURL.includes('area')) {
    title = 'Explorar Origem';
  }
  if (currentURL.includes('receitas-favoritas')) title = 'Receitas Favoritas';

  return title;
}
