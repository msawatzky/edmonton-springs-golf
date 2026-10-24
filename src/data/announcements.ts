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
    id: "closed-for-season-2026",
    order: 1,
    imageSrc: "/documents/announcements/closed-for-season-2026.svg",
    imageAlt:
      "Edmonton Springs Golf Course is closed for the season. The last day of the 2026 season was Wednesday, October 21, 2026. We will see you again in spring 2027. Call the Pro Shop at (780) 962-6500 with questions.",
    expiresOn: "2027-04-20"
  },
  {
    id: "fall-tee-times-2026",
    order: 2,
    imageSrc: "/documents/announcements/fall-tee-times-2026.svg",
    imageAlt:
      "Closed for maintenance on Monday, October 19, 2026. Last day of the 2026 season is Wednesday, October 21, 2026. Fall tee times use the crossover method from 11:00 am to 1:00 pm, then early groups cross over. From 3:15 to 4:15, 9 holes only. Fall special: a foursome playing 18 with carts pays $210 plus GST. All 4 players must pay at the till together.",
    expiresOn: "2026-10-22"
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
