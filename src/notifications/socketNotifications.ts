import {ILotAttributes} from "../interfaces";
import {Web} from "../web";

/**
 * Socket.IO notifications
 */
export class SocketNotifications {
  /**
   * "lot" notification in "lots" room
   * @param lot Lot
   */
  public static lots_lot(lot: ILotAttributes): void {
    Web.instance.nsp.to("lots").emit("lot", {
      amount: lot.amount,
      buffer: lot.buffer,
      currency: lot.currency,
      finish: lot.finish,
      id: lot.id,
      participants: lot.participants,
      start: lot.start,
      startbid: lot.startbid,
      step: lot.step,
      strict: lot.strict,
      stuffid: lot.stuffid,
      type: lot.type,
      winbid: lot.winbid || undefined,
      winner: lot.winner || undefined,
    });
  }
}
