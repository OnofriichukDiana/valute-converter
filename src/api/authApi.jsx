import { actions } from '../redux/reducers'
import { api } from './api'

export const authApi = {
  me: () =>
    api(
      {
        url: `/auth/me`,
        method: 'GET',
        data: {},
      },
      (response) => actions.authActions.me(response.data),
    ),
  changeProfile: (publicProfileId, groupPublicProfileId) =>
    api(
      {
        url: `/auth/change-profile/${publicProfileId}${
          groupPublicProfileId ? `/${groupPublicProfileId}` : ``
        }`,
        method: 'PATCH',
        data: {},
      },
      (response) => actions.authActions.changeProfile(response.data),
    ),
  singOut: () =>
    api(
      {
        url: `/auth/sing-out`,
        method: 'PATCH',
        data: {},
      },
      (response) => actions.authActions.singOut(response.data),
    ),
}
