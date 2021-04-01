import { Injectable } from '@angular/core';

import { CacheKey } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  setItem = (key: CacheKey, data: unknown): void => {
    const dataToStore = JSON.stringify(data);

    localStorage.setItem(key, dataToStore);
  };

  getItem = <T>(key: CacheKey): T => {
    const dataToFromStorage = JSON.parse(
      localStorage.getItem(key) || '{}'
    ) as T;

    return dataToFromStorage;
  };

  deleteItem = (key: CacheKey): void => {
    localStorage.removeItem(key);
  };
}
