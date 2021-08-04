interface SearchResult {
  id: string;
  name: string;
}

interface Action {
  type: string;
  payload: string | number | SearchResult[] | null;
}

export const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';
export const searchTermChanged = (value: string): Action => ({
  type: SEARCH_TERM_CHANGED,
  payload: value,
});

export const SEARCH_TERM_SELECTED = 'SEARCH_TERM_SELECTED';
export const searchTermSelected = (value: string): Action => ({
  type: SEARCH_TERM_SELECTED,
  payload: value,
});

export const SEARCH_RESULTS_CHANGED = 'SEARCH_RESULTS_CHANGED';
export const searchResultsChanged = (results: SearchResult[]): Action => ({
  type: SEARCH_RESULTS_CHANGED,
  payload: results,
});

export const RESULT_SELECTED = 'RESULT_SELECTED';
export const resultSelected = (index: number): Action => ({
  type: RESULT_SELECTED,
  payload: index,
});

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const clearSearchResults = (): Action => ({
  type: CLEAR_SEARCH_RESULTS,
  payload: null,
});

export interface GeocoderState {
  term: string;
  results: SearchResult[];
  index: number;
  searchMode: boolean;
}

export const initialState: GeocoderState = {
  term: '',
  results: [],
  index: -1,
  searchMode: true,
};

export const reducer = (state: GeocoderState, action: Action): GeocoderState => {
  switch (action.type) {
    case SEARCH_TERM_CHANGED:
      return {
        ...state,
        // @ts-ignore
        term: action.payload,
        indeobjectobjectx: -1,
        results: [],
        searchMode: true,
      };

    case SEARCH_TERM_SELECTED:
      return {
        ...state,
        // @ts-ignore
        term: action.payload,
        index: -1,
        searchMode: false,
      };

    case SEARCH_RESULTS_CHANGED:
      return {
        ...state,
        index: -1,
        // @ts-ignore
        results: [...action.payload],
      };

    case RESULT_SELECTED:
      return {
        ...state,
        // @ts-ignore
        term: action.payload === -1 ? '' : state.results[action.payload].name,
        // @ts-ignore
        index: action.payload,
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        index: -1,
        results: [],
      };

    default:
      return state;
  }
};
