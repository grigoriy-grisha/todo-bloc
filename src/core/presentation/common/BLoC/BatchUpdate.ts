type UpdateCallback = () => void

/**
 * @description батчер обновлений,
 * отбрасывает все запросы на обновление, кроме последнего
 */
export class BatchUpdate {
  static hostTimeout = (callback: UpdateCallback) => setTimeout(callback, 0)
  static clearHostTimeout = (cancel?: number) => clearTimeout(cancel)

  private lastUpdate: UpdateCallback | null = null
  private scheduledIdTask: number | null = null

  scheduleUpdate(updateCallback: UpdateCallback) {
    this.lastUpdate = updateCallback
    this.flushUpdate()
  }

  /**
   *  @description Планиурет запрос на обновление
   */
  private flushUpdate = () => {
    if (this.scheduledIdTask) {
      BatchUpdate.clearHostTimeout(this.scheduledIdTask)
      this.scheduledIdTask = null
    }

    if (this.lastUpdate) {
      //@ts-ignore
      this.scheduledIdTask = BatchUpdate.hostTimeout(this.lastUpdate)
    }
  }
}
