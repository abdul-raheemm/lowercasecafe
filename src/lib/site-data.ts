import heroCafe from "@/assets/hero-cafe.jpg";
import heroPoster from "@/assets/heroplace.png";
import heroVideo from "@/assets/videos/herovid.mp4";
import coffee1 from "@/assets/coffee-1.jpg";
import food1 from "@/assets/food-1.jpg";
import dessert1 from "@/assets/dessert-1.jpg";
import barista from "@/assets/barista.jpg";
import exterior from "@/assets/exterior.jpg";
import beans from "@/assets/beans.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import pastries from "@/assets/pastries.jpg";

export const SITE = {
  name: "lowercase cafe",
  estYear: 2026,
  location: "Banjara Hills",
  address: "Road No. 12, Banjara Hills, Hyderabad, Telangana",
  phone: "+91 1234567890",
  email: "hello@lowercase.cafe",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Road+No.+12,+Banjara+Hills,+Hyderabad,+Telangana&output=embed",
} as const;

export const formatPrice = (price: number) => `₹${Math.round(price)}`;

export const IMAGES = {
  heroCafe,
  heroPoster,
  heroVideo,
  coffee1,
  food1,
  dessert1,
  barista,
  exterior,
  beans,
  interior1,
  interior2,
  pastries,
};

export type MenuCategory = "Coffee" | "Food" | "Desserts";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  tags?: string[];
  featured?: boolean;
  image?: string;
}

export const MENU: MenuItem[] = [
  { id: "espresso", name: "Single Origin Espresso", category: "Coffee", price: 220, description: "Ethiopian Yirgacheffe, notes of jasmine, bergamot & stone fruit.", tags: ["signature"], featured: true, image: coffee1 },
  { id: "flat-white", name: "Flat White", category: "Coffee", price: 280, description: "Double ristretto pulled through velvety steamed milk.", featured: true, image: barista },
  { id: "cortado", name: "Cortado", category: "Coffee", price: 250, description: "Espresso cut with warm milk in equal measure.", tags: ["classic"] },
  { id: "pour-over", name: "Chemex Pour-Over", category: "Coffee", price: 340, description: "Hand-brewed to order. Bright, clean, complex.", tags: ["seasonal"], featured: true },
  { id: "cold-brew", name: "Slow Cold Brew", category: "Coffee", price: 310, description: "18-hour steep, dark chocolate & molasses finish." },
  { id: "matcha", name: "Ceremonial Matcha", category: "Coffee", price: 340, description: "Stone-ground Uji matcha, whisked with oat or whole milk." },
  { id: "avo-toast", name: "Sourdough Avocado Toast", category: "Food", price: 480, description: "House sourdough, smashed avocado, chili crisp, soft herbs.", featured: true, image: food1 },
  { id: "eggs-benedict", name: "Wild Mushroom Benedict", category: "Food", price: 560, description: "Poached eggs, brown butter hollandaise, foraged mushrooms.", tags: ["brunch"] },
  { id: "grain-bowl", name: "Harvest Grain Bowl", category: "Food", price: 520, description: "Farro, roast squash, pomegranate, tahini, herbs.", tags: ["seasonal"] },
  { id: "grilled-cheese", name: "Aged Cheddar Melt", category: "Food", price: 450, description: "Three-year cheddar, caramelized onion, sourdough." },
  { id: "shakshuka", name: "Smoky Shakshuka", category: "Food", price: 490, description: "Slow-simmered tomato, peppers, baked eggs, sourdough soldiers.", featured: true },
  { id: "choco-tart", name: "Dark Chocolate Tart", category: "Desserts", price: 380, description: "70% single-origin ganache, gold leaf, sea salt.", tags: ["signature"], featured: true, image: dessert1 },
  { id: "olive-oil-cake", name: "Olive Oil & Citrus Cake", category: "Desserts", price: 320, description: "Extra-virgin olive oil, blood orange, whipped mascarpone." },
  { id: "croissant", name: "Butter Croissant", category: "Desserts", price: 240, description: "Laminated over 72 hours. Shatter-crisp, tender heart.", image: pastries },
  { id: "tiramisu", name: "House Tiramisu", category: "Desserts", price: 420, description: "Espresso-soaked savoiardi, mascarpone, cocoa dust." },
  { id: "canele", name: "Bordeaux Canelé", category: "Desserts", price: 220, description: "Rum & vanilla custard, dark caramelized shell." },
];

export interface Event {
  id: string;
  title: string;
  date: string; // ISO
  time: string;
  description: string;
  image: string;
  tag: string;
}

export const EVENTS: Event[] = [
  { id: "cupping", title: "Ethiopia Cupping Session", date: "2026-08-14", time: "6:30 PM", description: "Guided tasting of four Ethiopian micro-lots with our head roaster.", image: beans, tag: "Tasting" },
  { id: "vinyl", title: "Vinyl Sundays: Jazz Edition", date: "2026-08-17", time: "4:00 PM", description: "An afternoon of Blue Note classics on the analog rig. Slow drinks, deep grooves.", image: interior1, tag: "Music" },
  { id: "latte-art", title: "Latte Art Throwdown", date: "2026-08-22", time: "7:00 PM", description: "City baristas compete pour-by-pour. Bring your loudest cheer.", image: barista, tag: "Community" },
  { id: "supper", title: "Autumn Supper Club", date: "2026-09-05", time: "7:30 PM", description: "Five-course seasonal menu paired with natural wines from small growers.", image: food1, tag: "Dinner" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: "The best flat white I've had outside Melbourne. The room feels like a novel you don't want to close.", name: "Amara Okoye", role: "Designer" },
  { quote: "I moved my writing desk here three months ago. My editor thinks I've been on retreat.", name: "Julian Reyes", role: "Author" },
  { quote: "Warm, unhurried, and quietly excellent. The tart with gold leaf is worth the trip alone.", name: "Priya Kaul", role: "Food critic, The Kettle" },
  { quote: "Every corner is a Pinterest board. Every sip is better than the corner looks.", name: "Noor Halabi", role: "Photographer" },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
  category: string;
  content: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "art-of-slow-coffee",
    title: "The Art of Slow Coffee",
    excerpt: "Why we still hand-pour every Chemex — and what those extra four minutes buy you.",
    author: "Elena Marquez",
    date: "2026-07-14",
    readTime: "6 min read",
    cover: coffee1,
    category: "Craft",
    content: [
      "There is a small, quiet ritual that happens at the pour-over bar every morning at 7:04 AM. The kettle clicks. Water settles at 96°C. Someone weighs 22 grams of coffee onto a small brass scale and looks at it, briefly, the way a jeweler looks at a stone.",
      "The point of slow coffee is not slowness for its own sake. It is a small refusal — a stubbornness about what a cup can be when nobody rushes it.",
      "In our roastery we cup every lot three times before it goes on the menu. The first cup tells us what the bean is. The second tells us what it wants to become. The third tells us whether we can get it there with just water and patience.",
      "So yes, the Chemex takes four extra minutes. In those four minutes, if you let them, a whole small world happens.",
    ],
  },
  {
    slug: "vintage-industrial-vibe",
    title: "Building a Room That Feels Old on Purpose",
    excerpt: "Notes on Edison bulbs, reclaimed oak, and why every good café is really a stage set.",
    author: "Rafael Ortiz",
    date: "2026-06-28",
    readTime: "5 min read",
    cover: interior2,
    category: "Design",
    content: [
      "When we started sketching the room, we kept coming back to one word: patina. Not fake patina — the kind that gets faked with sandpaper and stain. Real patina. The kind that only time gives, or that a very careful designer coaxes out of honest materials.",
      "We chose reclaimed oak from a Pennsylvania barn built in 1902. We rewired brass sconces we found in a flea market outside Ghent. The concrete floor was hand-troweled over three weekends by a father-and-son team who mostly build swimming pools.",
      "A café is a stage. The customer is the actor. Everything we chose was chosen to make the actor look better in the light.",
    ],
  },
  {
    slug: "seasonal-menu-autumn",
    title: "What's On the Autumn Menu",
    excerpt: "Roast squash, brown butter, foraged mushrooms — and one dessert we've been chasing for years.",
    author: "Elena Marquez",
    date: "2026-08-02",
    readTime: "4 min read",
    cover: dessert1,
    category: "Menu",
    content: [
      "Every three months we tear the menu apart. Not every dish leaves — the flat white is not going anywhere — but the kitchen resets, and the walk-in gets a new personality.",
      "This autumn we are leaning warm. Roast delicata squash with tahini and pomegranate. A wild mushroom benedict with brown butter hollandaise so glossy it looks almost lacquered. And a dark chocolate tart with gold leaf and finishing salt that we have quietly been trying to get right for six years.",
      "Come hungry. Stay for the tart.",
    ],
  },
];

export const GALLERY: { src: string; alt: string; category: "Interior" | "Exterior" | "Food" }[] = [
  { src: interior1, alt: "Cozy leather armchair beside a bookshelf lit by an Edison bulb", category: "Interior" },
  { src: interior2, alt: "Wide view of café interior with arched windows and hanging bulbs", category: "Interior" },
  { src: heroCafe, alt: "Café room with arched brick windows and warm amber light", category: "Interior" },
  { src: exterior, alt: "Café facade at dusk with lit archway and string lights", category: "Exterior" },
  { src: pastries, alt: "Croissants and pastries in a vintage display case", category: "Food" },
  { src: coffee1, alt: "Flat white latte art on a wooden board, top-down", category: "Food" },
  { src: food1, alt: "Sourdough avocado toast on a ceramic plate", category: "Food" },
  { src: dessert1, alt: "Dark chocolate tart with gold leaf", category: "Food" },
  { src: beans, alt: "Roasted coffee beans spilling from a burlap sack", category: "Food" },
  { src: barista, alt: "Barista pouring milk into an espresso cup", category: "Interior" },
];