import { OMDB_API_KEY, OMDB_API_URL } from "./constants";

export const searchMovieOMDB = async (movie) => {
    try {
        const data = await fetch(
             `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${movie}&type=movie`
        );
        const json = await data.json();
        return json.Search ? json.Search[0] : null; // Return first match or null
    } catch (e) {
        console.error("OMDB Search Error", e);
        return null;
    }
};
