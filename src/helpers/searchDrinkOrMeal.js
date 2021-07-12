import requestMeal, {
  requesIngredientsmeal,
  requesfirsLettertsmeal,
  requesIngredientDrink,
  requesfirsLettertDrink,
  requestDrink,
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
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    break;

  default:
    result = {};
  }

  return result;
}

export async function searchDrink(bullet, inputSearch) {
  let result;

  switch (bullet) {
  case 'ingredientes':
    result = await requesIngredientDrink(inputSearch);
    break;

  case 'nome':
    result = await requestDrink(inputSearch);
    break;

  case 'primeiraLetra':
    if (inputSearch.length === 1) {
      result = await requesfirsLettertDrink(inputSearch);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    break;

  default:
    result = {};
  }

  return result;
}
