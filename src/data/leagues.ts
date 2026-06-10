import type { LeagueApplicationConfig } from "./leagueApplications";
import { ladiesLeagueApplication, mensLeagueApplication } from "./leagueApplications";

const leagueRegistrationFeeNote = (league: "Men's League" | "Ladies League") =>
  `Registration fees are payable to the ${league}.`;

const leagueMembershipFeeNote = "Membership fees are payable to the Pro Shop.";

export interface LeagueCard {
  label: string;
  href: string;
  description: string;
  image: string;
}

export interface LeagueDetailRow {
  label: string;
  value: string;
}

export interface LeagueFeeSection {
  title: string;
  note?: string;
  rows: LeagueDetailRow[];
}

export interface LeagueSection {
  title: string;
  items: string[];
}

export interface LeagueCta {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
}

export interface LeaguePageData {
  title: string;
  slug: "mens" | "ladies";
  season: string;
  intro: string;
  atAGlance: LeagueDetailRow[];
  registrationSteps: string[];
  feeSections: LeagueFeeSection[];
  scheduleSections: LeagueSection[];
  highlightsTitle?: string;
  tournamentHighlights: string[];
  policies: LeagueSection[];
  contacts: LeagueDetailRow[];
  ctas: LeagueCta[];
  application: LeagueApplicationConfig;
}

export const leagueCards: LeagueCard[] = [
  {
    label: "Men's League",
    href: "/leagues/mens",
    description: "League details, events, and updates for men's play at Edmonton Springs.",
    image:
      "https://images.unsplash.com/photo-1629673120178-53a664eec9e8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwZ29sZmluZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    label: "Ladies League",
    href: "/leagues/ladies",
    description: "Schedules and announcements for ladies league nights and activities.",
    image: "https://images.pexels.com/photos/35320701/pexels-photo-35320701.jpeg"
  }
];

export const menLeague: LeaguePageData = {
  title: "Men's League",
  slug: "mens",
  season: "2026 Season",
  intro:
    "Edmonton Springs Men's League offers fixed tee times on your league day, tournament play, and a full season format built for friendly competition.",
  atAGlance: [
    { label: "League Days", value: "Wednesdays or Thursdays" },
    { label: "Season Window", value: "Starts April 20 for up to 26 rounds (through October 15)" },
    { label: "Typical Tee Times", value: "Wed 3:30-5:15 PM, Thu 1:30-5:30 PM" },
    { label: "Membership Fee Due Date", value: "May 15, 2026" }
  ],
  registrationSteps: [
    "If you are new to the league or did not play last year, complete the Men's League application form.",
    "Send your preferred day and tee-time window; include all names if registering as a foursome.",
    "If registering as a single or twosome, submit your preferred day and time and the organizers will place you.",
    "Pay the $75 league registration fee by e-transfer to esgmensleague@gmail.com.",
    "Pay league membership fees at the Pro Shop by May 15, 2026."
  ],
  feeSections: [
    {
      title: "League Registration Fee",
      note: `${leagueRegistrationFeeNote("Men's League")} Mandatory fee that covers prizes, year-end party costs, and official handicap scoring system setup. Pay by e-transfer to esgmensleague@gmail.com.`,
      rows: [{ label: "Registration Fee", value: "$75" }]
    },
    {
      title: "League Membership Fee",
      note: `${leagueMembershipFeeNote} Packages cover up to 26 rounds and are discounted from the regular $1,430 season equivalent. Nine-hole rates are intended for tee times after 5:30 PM.`,
      rows: [
        { label: "18 Holes with Cart", value: "$875" },
        { label: "18 Holes Walker", value: "$628" },
        { label: "9 Holes with Cart", value: "$594" },
        { label: "9 Holes Walker", value: "$433" }
      ]
    },
    {
      title: "Substitute Fees",
      rows: [
        { label: "Replacement Player (18 Holes)", value: "$10" },
        { label: "Replacement Player (9 Holes)", value: "$5" }
      ]
    }
  ],
  scheduleSections: [
    {
      title: "Weekly Tee-Time Blocks",
      items: [
        "Wednesday block: 3:30 PM to 5:15 PM (last tee time 5:15 PM).",
        "Thursday block: 1:30 PM to 5:30 PM.",
        "Each member receives a consistent weekly tee time on their selected day."
      ]
    }
  ],
  tournamentHighlights: [
    "June: Two-man best-ball tournament.",
    "August: Two-man best-ball tournament.",
    "September: Year-end stroke play tournament (likely Sunday).",
    "Tournament entries, prizes, and year-end festivities are included in league fees."
  ],
  policies: [
    {
      title: "Payments",
      items: [
        "League registration fee ($75) is paid by e-transfer to esgmensleague@gmail.com.",
        "League membership fees must be paid at the Pro Shop by May 15, 2026.",
        "If needed, membership fee payment arrangements must be made directly with the Pro Shop."
      ]
    },
    {
      title: "Substitutions",
      items: [
        "If you cannot attend your assigned day, you may send a substitute.",
        "Notify the course in advance when possible."
      ]
    }
  ],
  contacts: [
    { label: "Men's League Email", value: "esgmensleague@gmail.com" },
    { label: "Course Phone", value: "(780) 962-6500" }
  ],
  ctas: [
    { label: "Email Men's League Organizer", href: "mailto:esgmensleague@gmail.com", variant: "primary" },
    {
      label: "Book Tee Time",
      href: "https://edmontonsprings.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23",
      external: true
    },
    { label: "Contact Pro Shop", href: "/contact", variant: "secondary" }
  ],
  application: mensLeagueApplication
};

export const ladiesLeague: LeaguePageData = {
  title: "Ladies League",
  slug: "ladies",
  season: "2026 Season",
  intro:
    "The Ladies League is a 9-hole Monday fun league focused on social play, prizes, and a welcoming team format.",
  atAGlance: [
    { label: "League Day", value: "Mondays (excluding statutory holidays)" },
    { label: "Season Start", value: "May 11, 2026" },
    { label: "Total Rounds", value: "16 rounds plus year-end tournament" },
    { label: "Typical Tee Times", value: "Approximately 4:00 PM to 6:15 PM" },
    { label: "Payment Deadline", value: "May 11, 2026" }
  ],
  registrationSteps: [
    "Complete the Ladies League registration form (every member, new and returning).",
    "Submit preferred teammates and multiple tee-time options when registering.",
    "If you are registering solo, the league will place you on a team.",
    "Pay the league registration fee and league membership fee by May 11, 2026.",
    "Watch for final teams, confirmed tee times, and housekeeping rules before season launch."
  ],
  feeSections: [
    {
      title: "League Registration Fee",
      note: `${leagueRegistrationFeeNote("Ladies League")} Non-refundable fee used for prizes, banquet costs, and league goodie bags.`,
      rows: [{ label: "Registration Fee (Cash Only)", value: "$50" }]
    },
    {
      title: "League Membership Fee",
      note: `${leagueMembershipFeeNote} Non-refundable fee for 16 league rounds and year-end tournament play (includes a half cart for weekend tournament play).`,
      rows: [
        { label: "With Cart", value: "$400 + GST" },
        { label: "Walking", value: "$295 + GST" }
      ]
    },
    {
      title: "Holiday Monday Optional Rate",
      note: "Available on Mondays when league play is paused for statutory holidays.",
      rows: [{ label: "9 Holes Reduced Rate", value: "$23 + tax" }]
    }
  ],
  scheduleSections: [
    {
      title: "League Dates (Mondays)",
      items: [
        "May 11 and May 25 (registration day and first round on May 11).",
        "June 1, 8, 15, 22, and 29.",
        "July 6, 13, 20, and 27.",
        "August 10, 17, 24, and 31.",
        "Sunday, September 13 (16th and final league round; time to be confirmed)."
      ]
    },
    {
      title: "Year-End Tournament",
      items: ["Date to be announced."]
    }
  ],
  highlightsTitle: "League Highlights",
  tournamentHighlights: [
    "Weekly lucky draws and hole prizes begin May 11.",
    "Front and back nines alternate throughout the season.",
    "Scoring is optional in this fun league format."
  ],
  policies: [
    {
      title: "Registration and Teaming",
      items: [
        "Registration is first come, first served.",
        "Each team keeps the same Monday tee time.",
        "Estimated tee times are spaced in approximately 9-minute intervals and may adjust with registration volume."
      ]
    },
    {
      title: "Payment Handling",
      items: [
        "League registration fees are payable to the Ladies League.",
        "League membership fees are payable to the Pro Shop; cash and credit cards are accepted.",
        "If you cannot pay by May 11, contact the organizers in advance."
      ]
    }
  ],
  contacts: [
    { label: "Ladies League Email", value: "Ladiesleague@edmontonspringsgolf.com" },
    { label: "League Leads", value: "Mary Bauer (President), Shirley Simser (Vice President)" },
    { label: "Course Phone", value: "(780) 962-6500" }
  ],
  ctas: [
    { label: "Email Ladies League", href: "mailto:Ladiesleague@edmontonspringsgolf.com", variant: "primary" },
    {
      label: "Book Tee Time",
      href: "https://edmontonsprings.cps.golf/onlineresweb/search-teetime?TeeOffTimeMin=0&TeeOffTimeMax=23",
      external: true
    },
    { label: "Contact Pro Shop", href: "/contact", variant: "secondary" }
  ],
  application: ladiesLeagueApplication
};
