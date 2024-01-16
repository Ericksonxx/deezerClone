
//api key import
const apiKey = process.env.REACT_APP_RAPIDKEY;

//get from search
export const getFromArtist = async (searchText: string) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchText}`;
  if (apiKey) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      return(response.json())
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Key is not defined.');
  }
};

