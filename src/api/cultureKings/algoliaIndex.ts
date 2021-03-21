import algoliasearch from "algoliasearch";
import {
  CULTURE_KINGS_ALGOLIA_API_KEY,
  CULTURE_KINGS_ALGOLIA_APP_ID,
  CULTURE_KINGS_ALGOLIA_INDEX_NAME,
} from "./constants";

const client = algoliasearch(
  CULTURE_KINGS_ALGOLIA_APP_ID,
  CULTURE_KINGS_ALGOLIA_API_KEY
);
export const index = client.initIndex(CULTURE_KINGS_ALGOLIA_INDEX_NAME);
