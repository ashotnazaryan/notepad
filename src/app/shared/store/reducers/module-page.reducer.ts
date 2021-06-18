import { createReducer, on } from '@ngrx/store';

import { ModulePage } from '@core/models';
import { ModulePageActions } from '@shared/store/actions';

export const modulePageFeatureKey = 'module-page';

export interface State {
  modulePage: ModulePage;
}

const initialState: State = {
  modulePage: {
    module: '',
    page: ''
  }
};

export const reducer = createReducer(
  initialState,
  on(ModulePageActions.SetModulePage, (state, modulePage) => ({
    ...state,
    modulePage
  }))
);
