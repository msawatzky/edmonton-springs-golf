export interface LeagueApplicationField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export interface LeagueApplicationSidebarSection {
  title?: string;
  paragraphs?: string[];
  rows?: Array<{ label: string; value: string }>;
}

export interface LeagueApplicationConfig {
  /** Formspree endpoint, e.g. https://formspree.io/f/your-form-id */
  formspreeAction: string;
  modalTitle: string;
  buttonLabel: string;
  submitLabel?: string;
  fields: LeagueApplicationField[];
  sidebarTitle?: string;
  sidebarSections: LeagueApplicationSidebarSection[];
}

/** Replace with your Formspree form URLs when ready. */
export const FORMSPREE_MENS_LEAGUE = import.meta.env.PUBLIC_FORMSPREE_MENS_LEAGUE ?? "";
export const FORMSPREE_LADIES_LEAGUE = import.meta.env.PUBLIC_FORMSPREE_LADIES_LEAGUE ?? "";

export const mensLeagueApplication: LeagueApplicationConfig = {
  formspreeAction: FORMSPREE_MENS_LEAGUE,
  modalTitle: "Men's League Application",
  buttonLabel: "Apply for Men's League",
  submitLabel: "Send Application",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "address", label: "Address", type: "text" },
    { name: "city_postal_code", label: "City, Postal Code", type: "text" },
    {
      name: "handicap_and_other_information",
      label: "Current Handicap and Other Information",
      type: "textarea",
      required: true,
      rows: 4,
      placeholder: "Include your current handicap, preferred league day, tee-time preferences, and foursome details if applicable."
    }
  ],
  sidebarTitle: "Fees & Contact",
  sidebarSections: [
    {
      title: "Club Membership Fee",
      rows: [{ label: "Membership Fee", value: "$75" }],
      paragraphs: ["Pay by e-transfer to esgmensleague@gmail.com."]
    },
    {
      title: "Season Green Fees (Huge Savings!)",
      paragraphs: [
        "Lock in your golf for up to 26 weeks at a massive discount compared to regular course rates ($1,430 regular fee).",
        "Green fees must be paid at the Pro Shop."
      ],
      rows: [
        { label: "18 Holes with Cart", value: "$875" },
        { label: "18 Holes (Walker)", value: "$628" },
        { label: "9 Holes with Cart", value: "$594" },
        { label: "9 Holes (Walker)", value: "$433" }
      ]
    },
    {
      paragraphs: ["9-hole fees are for those who require a tee-time after 5:30 PM."]
    },
    {
      title: "Contact",
      paragraphs: [
        "Edmonton Springs Golf Course: (780) 962-6500",
        "Club President Brian Stecyk: (780) 953-0111",
        "Email: esgmensleague@gmail.com"
      ]
    }
  ]
};

export const ladiesLeagueApplication: LeagueApplicationConfig = {
  formspreeAction: FORMSPREE_LADIES_LEAGUE,
  modalTitle: "Ladies League Application",
  buttonLabel: "Apply for Ladies League",
  submitLabel: "Send Application",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "address", label: "Address", type: "text" },
    { name: "city_postal_code", label: "City, Postal Code", type: "text" },
    {
      name: "other_information",
      label: "Other Information?",
      type: "textarea",
      rows: 4,
      placeholder:
        "Please indicate which ladies you want on your team and a few tee times that would be best for you and your team members."
    }
  ],
  sidebarTitle: "Fees & Contact",
  sidebarSections: [
    {
      title: "League Fees",
      rows: [{ label: "Registration Fee", value: "$50" }]
    },
    {
      title: "Contact",
      paragraphs: [
        "Edmonton Springs Golf Course: (780) 962-6500",
        "Club Presidents Mary and Shirley",
        "Email: Ladiesleague@edmontonspringsgolf.com"
      ]
    },
    {
      paragraphs: [
        "Please indicate which ladies you want on your team and a few tee times that would be best for you and your team members."
      ]
    }
  ]
};
