import { actions } from '../redux/reducers'
import { api } from './api'

export const mediaApi = {
  upload: (data, params = {}) =>
    api(
      {
        url: '/media',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          'Content-Length': params['Content-Length'],
        },
      },
      (response) => actions.mediaActions.upload(response.data),
      import.meta.env.VITE_MEDIA_API_HOST,
    ),
}
