import requestMeal, {
  requesIngredientsmeal,
  requesfirsLettertsmeal,
} from './requests';

export async function searchMeal(bullet, inputSearch) {
  let result;
  switch (bullet) {
  case 'ingredientes':
    result = await requesIngredientsmeal(inputSearch);
    break;
  case 'nome':
    result = await requestMeal(inputSearch);
    break;
  case 'primeiraLetra':
    if (inputSearch.length === 1) {
      result = await requesfirsLettertsmeal(inputSearch);
    }
    global.alert('Sua busca deve conter somente 1 (um) caracter');
    break;
  default:
    result = 'retornei nada';
  }

  return result;
}

export async function searchDrink(bullet, inputSearch) {
  console.log(bullet, inputSearch);
  return 0;
}
