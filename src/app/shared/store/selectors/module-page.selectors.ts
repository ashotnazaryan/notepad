import { createSelector } from '@ngrx/store';

import { selectModulePageState } from '../reducers';
import { State } from '../reducers/module-page.reducer';

const selectModulePageFn = (state: State): State['modulePage'] =>
  state?.modulePage;

export const selectModulePage = createSelector(
  selectModulePageState,
  selectModulePageFn
);
