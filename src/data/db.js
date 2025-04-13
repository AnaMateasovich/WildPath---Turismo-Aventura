export const recommendations = [
  {
    img: "/src/assets/ski-rec.jpg",
    alt: "Ski",
    ubi: "Bariloche, Río Negro",
    val: "★ 4.8 (320 opiniones)",
    title: "Aventura de Ski en la Patagonia",
    duration: "3 días / 2 noches",
    price: "$45.000",
  },
  {
    img: "/src/assets/camping-rec.jpg",
    alt: "Camping",
    ubi: "Valle de Calamuchita, Córdoba",
    val: "★ 4.6 (210 opiniones)",
    title: "Escapada de Camping en las Sierras",
    duration: "2 días / 1 noche",
    price: "$18.000",
  },
  {
    img: "/src/assets/ciclismo-rec.jpg",
    alt: "Ciclismo",
    ubi: "Mendoza y San Juan",
    val: "★ 4.7 (150 opiniones)",
    title: "Tour de Ciclismo entre Viñedos",
    duration: "1 día",
    price: "$12.000",
  },
  {
    img: "/src/assets/dive-rec.jpg",
    alt: "Buceo",
    ubi: "Puerto Madryn, Chubut",
    val: "★ 4.9 (380 opiniones)",
    title: "Buceo con lobos marinos",
    duration: "2 días",
    price: "$35.000",
  },
  {
    img: "/src/assets/kayak-rec.webp",
    alt: "Kayak",
    ubi: "Río Limay, Neuquén",
    val: "★ 4.5 (95 opiniones)",
    title: "Experiencia en Kayak por el Limay",
    duration: "1 día",
    price: "$10.000",
  },
  {
    img: "/src/assets/rafting-rec.jpg",
    alt: "Rafting",
    ubi: "Río Mendoza, Mendoza",
    val: "★ 4.8 (290 opiniones)",
    title: "Rafting extremo en la Cordillera",
    duration: "2 días / 1 noche",
    price: "$28.000",
  },
];

export const category = [
  {
    name: "Ski",
    description:
      "Río Negro (Bariloche), Neuquén (San Martín de los Andes), Mendoza (Las Leñas), Tierra del Fuego (Ushuaia)",
    img: "/src/assets/ski.jpg",
  },
  {
    name: "Camping",
    description:
      "Córdoba (Valle de Calamuchita), San Luis (Sierra de las Quijadas), Mendoza, Neuquén, Misiones",
    img: "/src/assets/camping.png",
  },
  {
    name: "Ciclismo",
    description: "Salta, Jujuy, Tucumán, Mendoza, Córdoba, San Juan",
    img: "/src/assets/ciclismo.jpg",
  },
  {
    name: "Buceo",
    description:
      "Chubut (Puerto Madryn), Buenos Aires (Mar del Plata), Tierra del Fuego (Canal Beagle)",
    img: "/src/assets/dive.jpg",
  },
  {
    name: "Kayak",
    description: "Neuquén, Río Negro, Chubut, Santa Cruz, Tierra del Fuego",
    img: "/src/assets/kayak.jpg",
  },
  {
    name: "Rafting",
    description:
      "Mendoza (río Mendoza), San Luis, Neuquén (río Aluminé), Salta (río Juramento)",
    img: "/src/assets/rafting.jpg",
  },
];

export const fakeSideInfo = [
  {
    id: 1,
    val: "Excelente 9,5",
    char: [
      { icon: "🚐", text: "Transporte ida y vuelta" },
      { icon: "🧭", text: "Guía profesional" },
      { icon: "🍱", text: "Almuerzo y snacks" },
      { icon: "🛶", text: "Equipo" },
      { icon: "🧾", text: "Seguro de viaje" },
    ],
    meetingPoints: "Terminal de buses, calle 123",
    nameComment: "Cameron Williamson",
    textComment:
      "Una experiencia increíble, el guía fue súper amable y todo estuvo perfectamente organizado. ¡Lo recomiendo totalmente!",
  },
];

export const fakeProductData = [
  {
    id: 1,
    title: "Aventura en Kayak en el Sur",
    location: "Bariloche, Río Negro",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    details: {
      level: "Intermedio",
      duration: "1 día entero. De 9:00 a 18:00",
      minAge: "12 años",
    },
    restrictions: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.`,
    images: [
      {
        id: 1,
        src: "/src/assets/kayak-rec.webp",
      },
      {
        id: 2,
        src: "/src/assets/kayak.jpg",
      },
      {
        id: 3,
        src: "/src/assets/kayak-rec.webp",
      },
      {
        id: 4,
        src: "/src/assets/kayak.jpg",
      },
      {
        id: 5,
        src: "/src/assets/kayak-rec.webp",
      },
      {
        id: 6,
        src: "/src/assets/kayak.jpg",
      },
      {
        id: 7,
        src: "/src/assets/kayak-rec.webp",
      },
      {
        id: 8,
        src: "/src/assets/kayak.jpg",
      },
      {
        id: 7,
        src: "/src/assets/kayak-rec.webp",
      },
    ],
    availability: [
      {
        date: "Viernes 5 de Abril 2025",
        capacity: 8,
        booked: 0,
        pricePerPerson: 165461,
      },
      {
        date: "Sábado 13 de Abril 2025",
        capacity: 5,
        booked: 0,
        pricePerPerson: 265423,
      },
      {
        date: "Miércoles 17 de Abril 2025",
        capacity: 2,
        booked: 0,
        pricePerPerson: 265448,
      },
      {
        date: "Domingo 21 de Abril 2025",
        capacity: 9,
        booked: 0,
        pricePerPerson: 258489,
      },
    ],
  },
];
