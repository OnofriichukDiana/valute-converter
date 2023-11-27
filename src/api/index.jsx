import { actions } from '../redux/reducers'
import { api } from './api'
import { crud } from './crud'

export { authApi } from './authApi'
export { mediaApi } from './mediaApi'

export const usersApi = crud('users', actions.usersActions, {
  updatePassword: ({ userId, oldPassword, newPassword }) =>
    api(
      {
        url: `/users/${userId}/update-password`,
        method: 'PATCH',
        data: { oldPassword, newPassword },
      },
      (response) => actions.usersActions.updatePassword(response.data),
    ),
})

export const publicProfilesApi = crud(
  'public-profiles',
  actions.publicProfilesActions,
  {
    hasAccess: (id) =>
      api(
        {
          url: `/public-profiles/${id}/has-access`,
          method: 'GET',
        },
        (response) => actions.publicProfilesActions.hasAccess(response.data),
      ),
  },
)

export const accountantsApi = crud('accountants', actions.accountantsActions, {
  getStatistic: (id) =>
    api(
      {
        url: `/accountants/${id}/get-statistic`,
        method: 'GET',
      },
      (response) => actions.accountantsActions.getStatistic(response.data),
    ),
  getAccountantsByEmail: (email) =>
    api(
      {
        url: `/accountants/by-email/${email}`,
        method: 'GET',
      },
      (response) =>
        actions.accountantsActions.accountantsByEmail(response.data),
    ),
  getAccountantsRecommendedToAuthUser: () =>
    api(
      {
        url: `/accountants/recommended-to-auth-user`,
        method: 'GET',
      },
      (response) =>
        actions.accountantsActions.accountantsRecommendedToAuthUser(
          response.data,
        ),
    ),
  addAccountantToGroup: ({ accountantGroupId, accountantId }) =>
    api(
      {
        url: `/accountants/${accountantGroupId}/${accountantId}/add-accountant-to-group`,
        method: 'POST',
      },
      (response) =>
        actions.accountantsActions.addAccountantToGroup(response.data),
    ),
  deleteAccountantFromGroup: ({ accountantGroupId, accountantId }) =>
    api(
      {
        url: `/accountants/${accountantGroupId}/${accountantId}/delete-accountant-from-group`,
        method: 'DELETE',
      },
      (response) =>
        actions.accountantsActions.deleteAccountantFromGroup(response.data),
    ),
})

export const accountantGroupsInvitesApi = crud(
  'accountant-groups-invites',
  actions.accountantGroupsInvitesActions,
)

export const accountantsToAddressesApi = crud(
  'accountants-to-addresses',
  actions.accountantsToAddressesActions,
)

export const companiesApi = crud('companies', actions.companiesActions, {
  getCompaniesByEmail: (email) =>
    api(
      {
        url: `/companies/by-email/${email}`,
        method: 'GET',
      },
      (response) => actions.companiesActions.companiesByEmail(response.data),
    ),
  getCompaniesRecommendedToAuthUser: () =>
    api(
      {
        url: `/companies/recommended-to-auth-user`,
        method: 'GET',
      },
      (response) =>
        actions.companiesActions.companiessRecommendedToAuthUser(response.data),
    ),
})

export const companiesToAccountantsApi = crud(
  'companies-to-accountants',
  actions.companiesToAccountantsActions,
)

export const companiesToAccountantsInvitesApi = crud(
  'companies-to-accountants-invites',
  actions.companiesToAccountantsInvitesActions,
)

export const addressesApi = crud('addresses', actions.addressesActions)

export const invoicesApi = crud('invoices', actions.invoicesActions, {
  generetePdf: (id) =>
    api(
      {
        url: `/invoices/${id}/generate-pdf`,
        method: 'GET',
        responseType: 'blob',
      },
      (response) => {
        const url = URL.createObjectURL(response.data)
        return actions.invoicesActions.generetePdf(url)
      },
    ),

  getStatistic: (accountantId) =>
    api(
      {
        url: `/invoices/get-statistic-for-accountant/${accountantId}`,
        method: 'GET',
      },
      (response) => {
        return actions.invoicesActions.getStatistic(response.data)
      },
    ),
})

export const fileManagerDirectoriesApi = crud(
  'file-manager-directories',
  actions.fileManagerDirectoriesActions,
)

export const fileManagerFilesApi = crud(
  'file-manager-files',
  actions.fileManagerFilesActions,
)

export const eventsApi = crud('events', actions.eventsActions)

export const commentsApi = crud('comments', actions.commentsActions)

export const postsApi = crud('posts', actions.postsActions)

export const calendarEventsApi = crud(
  'calendar-events',
  actions.calendarEventsActions,
  {
    saveCalendarEvents: (body) =>
      api(
        {
          url: `/calendar-events/save`,
          method: 'POST',
          data: body,
        },
        (response) =>
          actions.calendarEventsActions.saveCalendarEvents(response.data),
      ),
    deleteCalendarEvents: (calendarEventId, accountantId) =>
      api(
        {
          url: `/calendar-events/${calendarEventId}/${accountantId}/delete-calendar-events`,
          method: 'DELETE',
        },
        (response) =>
          actions.calendarEventsActions.deleteCalendarEvents(response.data),
      ),
  },
)

export const notificationsApi = crud(
  'notifications',
  actions.notificationsActions,
)

export const notificationFilesApi = crud(
  'notification-files',
  actions.notificationFilesActions,
)

export const calendarEventParticipantsApi = crud(
  'calendar-event-participants',
  actions.calendarEventParticipantsActions,
)

export const chatMessagesApi = crud(
  'chat-messages',
  actions.chatMessagesActions,
  {
    getAllAvaiableChats: () =>
      api(
        {
          url: `/chat-messages/get-all-avaiable-chats`,
          method: 'GET',
        },
        (response) => {
          return actions.chatMessagesActions.getAllAvaiableChats(response.data)
        },
      ),
    markAllAsViewed: (businessProfileId) =>
      api(
        {
          url: `/chat-messages/${businessProfileId}/mark-all-as-viewed`,
          method: 'PATCH',
        },
        (response) => {
          return actions.chatMessagesActions.markAllAsViewed(response.data)
        },
      ),
  },
)

export const chatMessageFilesApi = crud(
  'chat-message-files',
  actions.chatMessageFilesActions,
)

export const BusinessProfileDocumentsApi = crud(
  'business-profile-documents',
  actions.businessProfileDocumentsActions,
)

export const BusinessProfileTransactionsApi = crud(
  'business-profile-transactions',
  actions.businessProfileTransactionsActions,
)

export const MeetRoomsApi = crud('meet-rooms', actions.meetRoomsActions)
export const MeetRoomParticipantsApi = crud(
  'meet-room-participants',
  actions.meetRoomParticipantsActions,
)
export const contentCategoriesApi = crud(
  'content-categories',
  actions.contentCategoriesActions,
)

export const contentPagesApi = crud(
  'content-pages',
  actions.contentPagesActions,
)
export const calendarSchedulesApi = crud(
  'calendar-schedules',
  actions.calendarSchedulesActions,
)
export const absencesApi = crud('absences', actions.absencesActions)

export const tasksApi = crud('tasks', actions.tasksActions, {
  changePosition: (data) =>
    api(
      {
        url: `/tasks/change-position`,
        method: 'POST',
        data,
      },
      (response) => {
        return actions.taskStatusesActions.changePosition(response.data)
      },
    ),
})
export const taskStatusesApi = crud(
  'task-statuses',
  actions.taskStatusesActions,
  {
    changePosition: (data) =>
      api(
        {
          url: `/task-statuses/change-position`,
          method: 'PATCH',
          data,
        },
        (response) => {
          return actions.taskStatusesActions.changePosition(response.data)
        },
      ),
  },
)
export const taskFilesApi = crud('task-files', actions.taskFilesActions)
export const taskCommentsApi = crud(
  'task-comments',
  actions.taskCommentsActions,
)
export const taskCommentFilesApi = crud(
  'task-comment-files',
  actions.taskCommentFilesActions,
)
