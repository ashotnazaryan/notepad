import { createReducer, on } from '@ngrx/store';

import { LoadingActions } from '@shared/store/actions';

export const loadingFeatureKey = 'loading';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(LoadingActions.ShowLoading, (state) => ({
    ...state,
    loading: true
  })),

  on(LoadingActions.HideLoading, (state) => ({
    ...state,
    loading: false
  }))
);

export const selectLoadingFn = (state: State): State['loading'] =>
  state?.loading;
