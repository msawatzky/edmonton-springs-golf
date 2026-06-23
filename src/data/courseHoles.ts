const mediaBase = (import.meta.env.PUBLIC_MEDIA_URL ?? "").replace(/\/$/, "");

const flyover = (file: string): string | undefined =>
  mediaBase ? `${mediaBase}/${file}` : undefined;

export interface CourseHole {
  hole: number;
  blue: number;
  white: number;
  red: number;
  menHcp: number;
  ladiesHcp: number;
  menPar: number;
  ladiesPar: number;
  description: string;
  flyoverVideo?: string;
}

export const courseHoles: CourseHole[] = [
  {
    hole: 1,
    blue: 526,
    white: 479,
    red: 418,
    menHcp: 11,
    ladiesHcp: 3,
    menPar: 5,
    ladiesPar: 5,
    flyoverVideo: flyover("h1.mp4"),
    description:
      "The opening hole sets the tone with a generous par 5 that rewards a well-placed tee shot. Players who find the fairway have a chance to reach the green in two, while the bunkers and slopes around the putting surface demand careful approach play.",
  },
  {
    hole: 2,
    blue: 395,
    white: 364,
    red: 278,
    menHcp: 3,
    ladiesHcp: 7,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h2.mp4"),
    description:
      "A strong par 4 that asks for accuracy off the tee. The fairway narrows as you approach the green, and the undulating putting surface makes birdie a rewarding but earned result.",
  },
  {
    hole: 3,
    blue: 469,
    white: 427,
    red: 318,
    menHcp: 17,
    ladiesHcp: 17,
    menPar: 5,
    ladiesPar: 5,
    flyoverVideo: flyover("h3.mp4"),
    description:
      "This reachable par 5 offers scoring opportunity for longer hitters while still presenting risk for aggressive lines. Position off the tee is key to setting up the best angle into the green.",
  },
  {
    hole: 4,
    blue: 372,
    white: 315,
    red: 238,
    menHcp: 5,
    ladiesHcp: 15,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h4.mp4"),
    description:
      "A classic par 4 where distance and placement both matter. The green is well guarded, and a missed approach can leave a tricky up-and-down from around the collar.",
  },
  {
    hole: 5,
    blue: 330,
    white: 325,
    red: 267,
    menHcp: 15,
    ladiesHcp: 13,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h5.mp4"),
    description:
      "A shorter par 4 that tempts players to attack the flag. Smart course management and a confident wedge game pay off on this scoring hole.",
  },
  {
    hole: 6,
    blue: 182,
    white: 160,
    red: 132,
    menHcp: 9,
    ladiesHcp: 5,
    menPar: 3,
    ladiesPar: 3,
    flyoverVideo: flyover("h6.mp4"),
    description:
      "The first par 3 on the course requires a precise iron to a well-protected green. Club selection can vary significantly depending on pin position and wind.",
  },
  {
    hole: 7,
    blue: 406,
    white: 363,
    red: 312,
    menHcp: 1,
    ladiesHcp: 1,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h7.mp4"),
    description:
      "The most demanding par 4 on the front nine. A solid drive is only the beginning — the approach must find the correct tier of this challenging green to avoid a difficult two-putt or worse.",
  },
  {
    hole: 8,
    blue: 170,
    white: 148,
    red: 130,
    menHcp: 13,
    ladiesHcp: 11,
    menPar: 3,
    ladiesPar: 3,
    flyoverVideo: flyover("h8.mp4"),
    description:
      "A scenic par 3 where distance control is everything. Take an extra club if the pin is tucked, and trust your read on the putting surface.",
  },
  {
    hole: 9,
    blue: 396,
    white: 331,
    red: 256,
    menHcp: 7,
    ladiesHcp: 9,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h9.mp4"),
    description:
      "The front nine closes with a par 4 that rewards a confident tee shot. A good drive opens up the green and gives players a chance to finish the outward half on a high note.",
  },
  {
    hole: 10,
    blue: 483,
    white: 434,
    red: 354,
    menHcp: 18,
    ladiesHcp: 18,
    menPar: 5,
    ladiesPar: 5,
    flyoverVideo: flyover("h10.mp4"),
    description:
      "The back nine opens with a long par 5 that winds through mature trees. Three well-judged shots can yield birdie, but trouble lurks for any wayward ball.",
  },
  {
    hole: 11,
    blue: 178,
    white: 143,
    red: 118,
    menHcp: 8,
    ladiesHcp: 14,
    menPar: 3,
    ladiesPar: 3,
    flyoverVideo: flyover("h11.mp4"),
    description:
      "A shorter par 3 that plays longer than the yardage suggests. The green accepts a running shot, but anything short or long makes par a test.",
  },
  {
    hole: 12,
    blue: 389,
    white: 335,
    red: 268,
    menHcp: 6,
    ladiesHcp: 6,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h12.mp4"),
    description:
      "A strategic par 4 where the ideal line off the tee depends on pin location. Players who find the fairway centre are rewarded with a straightforward approach.",
  },
  {
    hole: 13,
    blue: 171,
    white: 150,
    red: 112,
    menHcp: 12,
    ladiesHcp: 16,
    menPar: 3,
    ladiesPar: 3,
    flyoverVideo: flyover("h13.mp4"),
    description:
      "One of the course's signature par 3s. Take dead aim at the centre of the green and let the contours do the rest — a safe par is never a bad score here.",
  },
  {
    hole: 14,
    blue: 323,
    white: 313,
    red: 291,
    menHcp: 16,
    ladiesHcp: 10,
    menPar: 4,
    ladiesPar: 4,
    flyoverVideo: flyover("h14.mp4"),
    description:
      "A manageable par 4 that still requires focus. The green is approachable, but missing left or right leaves a delicate recovery from tight lies.",
  },
  {
    hole: 15,
    blue: 532,
    white: 512,
    red: 464,
    menHcp: 2,
    ladiesHcp: 2,
    menPar: 5,
    ladiesPar: 5,
    flyoverVideo: flyover("h15.mp4"),
    description:
      "The longest hole on the course and one of its sternest tests. Two perfect shots still leave a demanding third — this is a true three-shot par 5 for most players.",
  },
  {
    hole: 16,
    blue: 409,
    white: 368,
    red: 282,
    menHcp: 4,
    ladiesHcp: 4,
    menPar: 4,
    ladiesPar: 4,
    description:
      "A strong par 4 with a green that slopes subtly from back to front. A drive in the fairway sets up the best chance to attack the pin with confidence.",
  },
  {
    hole: 17,
    blue: 174,
    white: 156,
    red: 140,
    menHcp: 10,
    ladiesHcp: 12,
    menPar: 3,
    ladiesPar: 3,
    description:
      "A late par 3 where nerves and club selection collide. Trust the yardage, commit to the shot, and give yourself a chance to walk off with a hard-earned par.",
  },
  {
    hole: 18,
    blue: 474,
    white: 464,
    red: 406,
    menHcp: 14,
    ladiesHcp: 8,
    menPar: 5,
    ladiesPar: 5,
    description:
      "The closing par 5 offers a final scoring chance before the clubhouse. A well-struck drive and a smart lay-up can set up a birdie putt to cap a great round.",
  },
];

export const courseTotals = {
  out: { blue: 3246, white: 2912, red: 2349, par: 36 },
  in: { blue: 3133, white: 2875, red: 2435, par: 36 },
  total: { blue: 6379, white: 5787, red: 4784, par: 72 },
};
