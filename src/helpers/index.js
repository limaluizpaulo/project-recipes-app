// Créditos à Lucas Martins - Turma 10 - Tribo B
export function invokeAlert(message, fn = alert) {
  fn(message);
}

export function urlToEmbed(url) {
  if (!url) return null;
  return `https://www.youtube.com/embed/${url.split('=')[1]}`;
}
