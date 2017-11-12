import db from '@/feathers/offline'
import feathersRestClient from '@/feathers/offline/restClient'

const translationsService = feathersRestClient.service('/translations')

self.addEventListener('sync', function (event) {
  event.waitUntil(
    processPendingActions()
  )
})

async function processPendingActions () {
  const pendingActions = await db.pendingActions.toArray()
  pendingActions.forEach(async (pendingAction) => {
    if (pendingAction.jwt) {
      await feathersRestClient.authenticate({strategy: 'jwt', accessToken: pendingAction.jwt})
    }
    if (pendingAction.type === 'translations/create') {
      await translationsService.create(pendingAction.payload)
    }
    if (pendingAction.type === 'translations/update') {
      await translationsService.update(pendingAction.payload[0], pendingAction.payload[1], pendingAction.payload[2])
    }
    if (pendingAction.type === 'translations/remove') {
      await translationsService.remove(pendingAction.payload)
    }
    await db.pendingActions.where('id').equals(pendingAction.id).delete()
  })
}
