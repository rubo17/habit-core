export const STORES = {
  HABITS: 'habits',
  SYNC_QUEUE: 'sync-queue',
  HABIT_LOGS: 'habit-logs',
  CATEGORIES: 'categories',
  USER_SYNC_QUEUE: 'user-sync-queue',
} as const

type StoreName = typeof STORES[keyof typeof STORES]

const DB_NAME = 'habit_core'
const DB_VERSION = 4

const STORE_DEFINITIONS: { name: StoreName; options: IDBObjectStoreParameters }[] = [
  { name: STORES.HABITS, options: { keyPath: 'id' } },
  { name: STORES.SYNC_QUEUE, options: { autoIncrement: true } },
  { name: STORES.HABIT_LOGS, options: { keyPath: 'id' } },
  { name: STORES.CATEGORIES, options: { keyPath: 'id' } },
  { name: STORES.USER_SYNC_QUEUE, options: { autoIncrement: true } },
]

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      for (const { name, options } of STORE_DEFINITIONS) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, options)
        }
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function dbGetAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result as T[])
    req.onerror = () => reject(req.error)
  })
}

export async function dbPutAll<T>(store: StoreName, items: T[]): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    const s = tx.objectStore(store)
    s.clear()
    for (const item of items) s.put(item)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function dbPut<T>(store: StoreName, item: T): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).put(item)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function dbDelete(store: StoreName, key: IDBValidKey): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function dbGet<T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).get(key)
    req.onsuccess = () => resolve(req.result as T | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function dbAdd<T>(store: StoreName, item: T): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).add(item)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function dbClear(store: StoreName): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
