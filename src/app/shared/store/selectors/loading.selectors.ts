import { createSelector } from '@ngrx/store';

import { selectLoadingState } from '../reducers';
import { State } from '../reducers/loading.reducer';

const selectLoadingFn = (state: State): State['loading'] => state?.loading;

export const selectLoading = createSelector(
  selectLoadingState,
  selectLoadingFn
);
