export interface Announcement {
  id: string;
  /** Lower numbers appear first in the carousel */
  order: number;
  imageSrc: string;
  imageAlt: string;
  /** First calendar day this announcement is hidden (YYYY-MM-DD). */
  expiresOn: string;
}

/**
 * Add or remove posters here. Set `expiresOn` to the first day the poster should stop showing.
 * Posters with `expiresOn: "2026-07-02"` are visible through July 1, 2026.
 */
export const announcements: Announcement[] = [
  {
    id: "july-1-hole-in-one",
    order: 1,
    imageSrc: "/documents/announcements/july-1-hole-in-one.png",
    imageAlt:
      "July 1st Hole in One Challenge at Edmonton Springs Golf — $10,000 prize with a $10 minimum donation to 880 CHED Santas Anonymous",
    expiresOn: "2026-07-02"
  },
  {
    id: "early-risers-baileys",
    order: 2,
    imageSrc: "/documents/announcements/early-risers-baileys.png",
    imageAlt:
      "Early Risers promotion — coffee and Baileys or a non-alcoholic beverage with an 18-hole green fee and power cart from 7–9 AM, starting Wednesday June 24th",
    expiresOn: "2026-07-02"
  }
];

export const ANNOUNCEMENTS_AUTO_SHOWN_KEY = "esg-announcements-auto-shown";

export function getActiveAnnouncements(items: Announcement[], now: Date = new Date()): Announcement[] {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  return items
    .filter((item) => {
      const expiry = new Date(`${item.expiresOn}T00:00:00`);
      return today < expiry;
    })
    .sort((a, b) => a.order - b.order);
}
