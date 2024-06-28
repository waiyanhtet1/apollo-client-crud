import { gql } from "@apollo/client";

export const GET_ALL_FILMS = gql`
  query Films($first: Int) {
    allFilms(first: $first) {
      films {
        id
        title
        director
        episodeID
      }
      totalCount
    }
  }
`;

export const ALL_CHARACTERS = gql`
  query People($first: Int) {
    allPeople(first: $first) {
      people {
        id
        name
        homeworld {
          name
        }
        species {
          name
        }
      }
      totalCount
    }
  }
`;
