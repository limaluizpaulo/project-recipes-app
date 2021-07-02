const fetchAPI = async (API, chosenFilter, searchText) => {
  try {
    const result = await fetch(API + chosenFilter + searchText).then((res) => res.json());
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAPI;
