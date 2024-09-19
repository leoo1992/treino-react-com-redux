import { createSlice } from "@reduxjs/toolkit";


/**
 * CRIA UM SLICE COM UMA FUNCAO ASSINCRONA
 * @param {Object} config 
 * @param {String} config.name 
 * @param {Object} config.initialState 
 * @param {Object} config.reducers 
 * @param {Function} config.fetchConfig 
 */

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSucess(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSucess, fetchError } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    if (payload) {
      try {
        dispatch(fetchStarted());
        const { url, options } = config.fetchConfig(payload);
        const resp = await fetch(url, options);
        const data = await resp.json();

        if (!data?.message) {
          return dispatch(fetchSucess(data));
        } else {
          return dispatch(fetchError(data?.message));
        }
      } catch (error) {
        return dispatch(fetchError(error.message));
      }
    }
  };

  return { ...slice, asyncAction };
};

export default createAsyncSlice;
