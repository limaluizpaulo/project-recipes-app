function checkboxesChecked(params) {
  const { missingIngredients, checked, setChecked } = params;
  if (missingIngredients && !checked) {
    const unmarkedCheckboxes = missingIngredients.filter((element) => element === '');
    if (checked === null) {
      setChecked(unmarkedCheckboxes.length);
    }
  }
}

export default checkboxesChecked;
