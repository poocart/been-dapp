// @flow

export const STORAGE_KEYS = {
  PRIVATE_KEY: 'pk',
  PROFILE: 'profile',
};

class StorageService {
  get(key: string, fallback?: any) {
    return localStorage.getItem(key) || fallback;
  }

  set(key: string, data: any) {
    return localStorage.setItem(key, data);
  }

  isStored(key: string) {
    return !!localStorage(key);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  reset() {
    localStorage.clear();
  }
}

export const Storage = new StorageService();
