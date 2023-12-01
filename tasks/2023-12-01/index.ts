export class GiftRegistry {
  private gifts: Map<number, Set<string>>;

  constructor() {
    this.gifts = new Map();
  }

  addGift(childId: number, gift: string): void {
    if (!this.gifts.has(childId)) {
      this.gifts.set(childId, new Set());
    }
    this.gifts.get(childId)?.add(gift);
  }

  removeGift(childId: number, gift: string): void {
    if (!this.gifts.has(childId) || !this.gifts.get(childId)?.has(gift)) {
      throw new Error("Gift not found");
    }
    this.gifts.get(childId)?.delete(gift);
  }

  getGiftsForChild(childId: number): string[] {
    return this.gifts.get(childId) ? Array.from(this.gifts.get(childId)!) : [];
  }
}
