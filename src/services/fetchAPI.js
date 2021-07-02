const fetchAPI = async (API, chosenFilter, searchText) => {
  console.log(API + chosenFilter + searchText)
  try {
    const result = await fetch(API + chosenFilter + searchText).then((res) => res.json());
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default fetchAPI;
