export type TeamMember = {
  slug: string;
  name: string;
  biv?: string;
  role: string;
  bio: string[];
  phone?: string;
  email: string;
  image: string;
};

// Overgenomen uit https://frerevastgoed.be/nl/over-ons — echte bios, geen invulling.
export const TEAM: TeamMember[] = [
  {
    slug: "bernard-frere",
    name: "Bernard Frère",
    biv: "509.917",
    role: "Oprichter",
    bio: [
      "Na zijn functie als verkoopdirecteur bij een toonaangevend vastgoedkantoor achtte Bernard het moment aangebroken om zijn jarenlange ervaring en marktkennis aan te wenden voor de oprichting van Frère Vastgoed.",
      "Met een duidelijke visie en doelgerichte aanpak begeleidt hij klanten bij hun vastgoedtransacties en streeft hij steeds naar het beste resultaat.",
    ],
    phone: "+32 479 36 28 47",
    email: "bernard@frerevastgoed.be",
    image: "/images/team/bernard-frere.jpg",
  },
  {
    slug: "illya-buttgereit",
    name: "Illya Buttgereit",
    biv: "513.452",
    role: "Vastgoedmakelaar",
    bio: [
      "Na zijn stage bij een verhuurkantoor groeide Illya uit tot een gedreven vastgoedmakelaar en vastgoedexpert. Hij staat bekend om zijn zorgvuldige dossieropvolging en zijn betrokken aanpak.",
      "In 2023 was Illya mee betrokken bij de opstart van Frère Vastgoed, waar hij zijn engagement en expertise dagelijks inzet.",
    ],
    phone: "+32 471 09 20 43",
    email: "illya@frerevastgoed.be",
    image: "/images/team/illya-buttgereit.jpg",
  },
  {
    slug: "vincenzo-giacomazza",
    name: "Vincenzo Giacomazza",
    biv: "519.660",
    role: "Vastgoedmakelaar",
    bio: [
      "Na het afronden van zijn studies startte Vincenzo onmiddellijk met zijn BIV-stage, vastberaden om zich verder te ontwikkelen binnen de vastgoedsector.",
      "Vincenzo staat bekend om zijn betrokken, correcte en transparante aanpak, met veel belang voor duidelijke communicatie en persoonlijke begeleiding.",
    ],
    phone: "+32 477 25 13 26",
    email: "vincenzo@frerevastgoed.be",
    image: "/images/team/vincenzo-giacomazza.jpg",
  },
  {
    slug: "cheyenna-meyers",
    name: "Cheyenna Meyers",
    role: "Back office",
    bio: [
      "Na waardevolle ervaring binnen zowel de notariële als vastgoedsector beschikt Cheyenna over een sterke administratieve en juridische basis. Als rechterhand van Bernard bewaakt zij elk dossier van opstart tot afhandeling.",
    ],
    phone: "+32 89 391 555",
    email: "back-office@frerevastgoed.be",
    image: "/images/team/cheyenna-meyers.jpg",
  },
];
