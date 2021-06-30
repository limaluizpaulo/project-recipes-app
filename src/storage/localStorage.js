export function saveMealsToken() {
  localStorage.setItem('mealsToken', 1);
}

export function saveCockTailsToken() {
  localStorage.setItem('cocktailsToken', 1);
}

export function saveUserEmail(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getMealsToken() {
  return localStorage.getItem('mealsToken');
}

export function getCockTailsToken() {
  return localStorage.getItem('cocktailsToken');
}

export function getUserEmail() {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}
