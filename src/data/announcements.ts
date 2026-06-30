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
export const announcements: Announcement[] = [];

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
