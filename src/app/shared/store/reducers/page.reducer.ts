import { createReducer, on } from '@ngrx/store';

import { ModulePage } from '@shared/models/route';
import { PageActions } from '@shared/store/actions';

export const pageFeatureKey = 'page';

export interface State {
  page: ModulePage;
}

const initialState: State = {
  page: {},
};

export const reducer = createReducer(
  initialState,
  on(PageActions.SetPage, (state, page) => ({
    ...state,
    page,
  }))
);

export const selectPage = (state: State) => state.page;