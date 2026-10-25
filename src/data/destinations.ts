export interface SideCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  heroImage: string;
  description: string;
  rating: number;
  duration: string;
  price: string;
  accentColor: string;
  sideCards: SideCard[];
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "INDONESIA",
    country: "Asia",
    heroImage:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1920&q=85&fit=crop",
    description:
      "As the largest archipelagic country in the world, Indonesia is blessed with so many different people, cultures, customs, traditions, artworks, food, animals, plants, landscapes, and everything that made it almost like 100 (or even 200) countries melted beautifully into one.",
    rating: 4.9,
    duration: "10–14 Days",
    price: "$1,200",
    accentColor: "#f97316",
    sideCards: [
      {
        id: "id-1",
        title: "Borobudur Temple",
        subtitle: "Central Java, Indonesia",
        image:
          "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80&fit=crop",
        tag: "Heritage",
      },
      {
        id: "id-2",
        title: "Raja Ampat Islands",
        subtitle: "West Papua, Indonesia",
        image:
          "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80&fit=crop",
        tag: "Nature",
      },
      {
        id: "id-3",
        title: "Komodo National Park",
        subtitle: "East Nusa Tenggara",
        image:
          "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&q=80&fit=crop",
        tag: "Wildlife",
      },
    ],
  },
  {
    id: 2,
    name: "THAILAND",
    country: "Asia",
    heroImage:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=85&fit=crop",
    description:
      "Thailand enchants visitors with its ornate shrines, pristine beaches, and the chaos of its beloved capital city. A land where ancient Buddhist temples rise alongside modern skyscrapers, where crystal waters lap at white-sand shores, and where every meal is a spectacular adventure in flavor.",
    rating: 4.8,
    duration: "7–10 Days",
    price: "$980",
    accentColor: "#3b82f6",
    sideCards: [
      {
        id: "th-1",
        title: "Wat Phra Kaew",
        subtitle: "Bangkok, Thailand",
        image:
          "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=80&fit=crop",
        tag: "Temple",
      },
      {
        id: "th-2",
        title: "Phi Phi Islands",
        subtitle: "Krabi Province",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop",
        tag: "Beach",
      },
      {
        id: "th-3",
        title: "Chiang Mai Mountains",
        subtitle: "Northern Thailand",
        image:
          "https://images.unsplash.com/photo-1571619671891-f433a21cc30a?w=600&q=80&fit=crop",
        tag: "Culture",
      },
    ],
  },
  {
    id: 3,
    name: "BALI",
    country: "Indonesia",
    heroImage:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=85&fit=crop",
    description:
      "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Spiritual and artistic, the island is famous for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island reverberates with the sound of gamelan and smells of incense — a place of ritual and dance.",
    rating: 4.9,
    duration: "8–12 Days",
    price: "$1,050",
    accentColor: "#10b981",
    sideCards: [
      {
        id: "bl-1",
        title: "Broken Beach",
        subtitle: "Nusa Penida, Bali",
        image:
          "https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80&fit=crop",
        tag: "Beach",
      },
      {
        id: "bl-2",
        title: "Tegalalang Rice Terraces",
        subtitle: "Ubud, Bali",
        image:
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80&fit=crop",
        tag: "Nature",
      },
      {
        id: "bl-3",
        title: "Uluwatu Temple",
        subtitle: "Pecatu, Bali",
        image:
          "https://images.unsplash.com/photo-1550570985-fd4a0e3f5b4c?w=600&q=80&fit=crop",
        tag: "Spiritual",
      },
    ],
  },
  {
    id: 4,
    name: "KERALA",
    country: "India",
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85&fit=crop",
    description:
      "Kerala, on India's tropical Malabar Coast, is one of the country's most popular tourist destinations. It's known for its backwaters — a network of canals, rivers, lakes, and inlets — as well as lush tea-covered hills, ancient spice plantations, and vibrant traditions of dance and Ayurveda healing.",
    rating: 4.7,
    duration: "6–9 Days",
    price: "$850",
    accentColor: "#8b5cf6",
    sideCards: [
      {
        id: "kr-1",
        title: "Alleppey Backwaters",
        subtitle: "Alappuzha, Kerala",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80&fit=crop",
        tag: "Nature",
      },
      {
        id: "kr-2",
        title: "Munnar Tea Gardens",
        subtitle: "Idukki, Kerala",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80&fit=crop",
        tag: "Hills",
      },
      {
        id: "kr-3",
        title: "Periyar Wildlife Reserve",
        subtitle: "Thekkady, Kerala",
        image:
          "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=80&fit=crop",
        tag: "Wildlife",
      },
    ],
  },
];
