import { api } from './api'

export const crud = (name, actions, requests = [], host) => {
  return {
    getOne: (id, relations = []) =>
      api(
        {
          url: `/${name}/${id}?${relations.reduce(
            (p, c) => p + 'relations[]=' + c + '&',
            '',
          )}`,
          method: 'GET',
          data: {},
        },
        (response) => actions.retrieve(response.data),
        host,
      ),

    getList: (args = {}) => {
      const { page, limit, filters = {}, sorts = [], relations = [] } = args

      let params = []
      if (!!page) params.push(`page=${page}&`)
      if (!!limit) params.push(`limit=${limit}&`)
      for (const key in filters) {
        if (Array.isArray(filters[key])) {
          for (const v of filters[key]) {
            params.push(key + '[]=' + encodeURIComponent(v) + '&')
          }
        } else {
          params.push(key + '=' + encodeURIComponent(filters[key]) + '&')
        }
      }

      params.push(sorts.reduce((p, c) => p + 'sorts[]=' + c + '&', ''))

      params.push(relations.reduce((p, c) => p + 'relations[]=' + c + '&', ''))

      return api(
        {
          url: `/${name}?${params.reduce(
            (previos, param) => previos + param,
            '',
          )}`,
          method: 'GET',
          data: {},
        },
        (response) => actions.list(response.data),
        host,
      )
    },

    create: (entity) =>
      api(
        {
          url: `/${name}`,
          method: 'POST',
          data: entity,
        },
        (response) => actions.create(response.data),
        host,
      ),

    update: (id, entity) =>
      api(
        {
          url: `/${name}/${id}`,
          method: 'PATCH',
          data: entity,
        },
        (response) => actions.update(response.data),
        host,
      ),

    delete: (id) =>
      api(
        {
          url: `/${name}/${id}`,
          method: 'DELETE',
        },
        (response) => actions.delete(response.data),
        host,
      ),

    ...requests,
  }
}
