import Cache = GoogleAppsScript.Cache.Cache;

export class ScriptCache {
  private scriptCache: Cache;

  constructor() {
    this.scriptCache = CacheService.getScriptCache();
  }

  storeInCache(key: string, value: string): void {
    this.scriptCache.put(key, value, 3600);
  }

  retrieveFromCache(key: string): string {
    return <string>this.scriptCache.get(key);
  }

  clearCache(key: string): void {
    CacheService.getScriptCache().remove(key);
  }
}
