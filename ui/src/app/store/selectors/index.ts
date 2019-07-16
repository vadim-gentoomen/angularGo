import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from '../reducers/auth-reducer';
import * as fromAuth from '../reducers/auth-reducer';
import * as fromLoginPage from '@app/store/reducers/login-page.reducer';

// export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
//
// export const selectAuthStatusState = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.status
// );
//
//
// export const selectLoginPageState = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.loginPage
// );
//
// export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
// export const getLoggedIn = createSelector(getUser, user => !!user);
//
// export const getLoginPageError = createSelector(
//   selectLoginPageState,
//   fromLoginPage.getError
// );
//
// export const getLoginPagePending = createSelector(
//   selectLoginPageState,
//   fromLoginPage.getPending
// );
