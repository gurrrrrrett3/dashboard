import Utils from "../../utils";

export default class UpdateManager {
  public updateFunctions: Map<
    string,
    {
      update: Function;
      interval: NodeJS.Timer;
      delay: number;
    }
  > = new Map();

  constructor() {}

  public addUpdateFunction(update: Function, interval: number): string {
    const key = Utils.randomKey(10);

    this.updateFunctions.set(key, {
      update: update,
      delay: interval,
      interval: setInterval(() => {
        update();
      }, interval),
    });

    return key;
  }

  public removeUpdateFunction(key: string): void {
    const update = this.updateFunctions.get(key);
    if (update) {
      clearInterval(update.interval);
      this.updateFunctions.delete(key);
    }
  }
}
