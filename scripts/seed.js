const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Models (duplicated for standalone script context)
const DestinationSchema = new mongoose.Schema({
  name: String,
  country: String,
  description: String,
  longDescription: String,
  rating: Number,
  image: String
}, { timestamps: true });

const PackageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: String,
  location: String,
  rating: Number,
  image: String,
  includes: [String],
  description: String,
  isFeatured: Boolean
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  content: String,
  image: String
}, { timestamps: true });

const OfferSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  discount: String,
  ctaText: String,
  ctaLink: String,
  backgroundImage: String,
  isActive: Boolean
}, { timestamps: true });

const TeamSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String
}, { timestamps: true });

const Destination = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);

// Data
const testimonials = [
  { name: "Sarah Jenkins", role: "Adventure Enthusiast", content: "The most incredible experience of my life! Every detail was perfectly planned. The level of luxury was simply unmatched.", image: "/images/user-1.jpg" },
  { name: "David & Emma", role: "Luxury Travelers", content: "From the moment we landed until our departure, everything was seamless. Truly the best travel agency we have ever used.", image: "/images/user-2.jpg" },
  { name: "Michael Ross", role: "Solo Explorer", content: "I felt so taken care of throughout my solo journey. The personalized touch made me feel like royalty.", image: "/images/user-3.jpg" }
];

const teamData = [
  { name: "John Doe", role: "Founder & CEO", image: "/images/user-3.jpg" },
  { name: "Jane Smith", role: "Creative Director", image: "/images/user-1.jpg" },
  { name: "Robert Wilson", role: "Travel Consultant", image: "/images/user-2.jpg" },
];

const offer = {
  title: "Ready for Your Next Extraordinary Adventure?",
  subtitle: "Let us take you there. Book your personalized luxury travel package today and receive an exclusive 10% discount.",
  discount: "10%",
  ctaText: "Get Started",
  ctaLink: "/booking",
  backgroundImage: "/images/cta-bg.jpg",
  isActive: true
};

async function seed() {
  const envPath = path.resolve('.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const MONGODB_URI = envContent.split('MONGODB_URI=')[1]?.split('\n')[0].trim();

  if (!MONGODB_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  await Destination.deleteMany({});
  await Package.deleteMany({});
  await Testimonial.deleteMany({});
  await Offer.deleteMany({});
  await Team.deleteMany({});

  const destData = [
    { name: "Paris", country: "France", description: "Experience the breathtaking beauty of Paris, a jewel in France.", rating: 4.8, image: "/images/destination-1.jpg", longDescription: "Paris is one of the most sought-after destinations in the world." },
    { name: "Bali", country: "Indonesia", description: "Experience the breathtaking beauty of Bali, a jewel in Indonesia.", rating: 4.9, image: "/images/destination-2.jpg", longDescription: "Bali offers a unique blend of heritage, luxury, and natural beauty." },
    { name: "Dubai", country: "UAE", description: "Experience the breathtaking beauty of Dubai, a jewel in UAE.", rating: 4.7, image: "/images/destination-3.jpg", longDescription: "Dubai is known for luxury shopping, ultramodern architecture and a lively nightlife scene." },
    { name: "Santorini", country: "Greece", description: "Experience the breathtaking beauty of Santorini, a jewel in Greece.", rating: 4.9, image: "/images/destination-4.jpg", longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea." },
    { name: "Swiss Alps", country: "Switzerland", description: "Experience the breathtaking beauty of Swiss Alps, a jewel in Switzerland.", rating: 4.8, image: "/images/destination-5.jpg", longDescription: "The Swiss Alps are a high mountain range in Switzerland." },
    { name: "Great Wall", country: "China", description: "Experience the breathtaking beauty of Great Wall, a jewel in China.", rating: 4.7, image: "/images/destination-6.jpg", longDescription: "The Great Wall of China is a series of fortifications." }
  ];

  await Destination.insertMany(destData);
  console.log("Destinations seeded");

  const packData = destData.slice(0, 3).map((dest, i) => ({
    name: `Luxury ${dest.name} Retreat`,
    price: 2500 + (i * 500),
    duration: "7 Days, 6 Nights",
    location: dest.name,
    rating: 4.7 + (i * 0.1),
    image: `/images/package-${(i % 3) + 1}.jpg`,
    includes: ["Luxury Suite", "Roundtrip Airfare", "Daily Gourmet Breakfast", "Private Tour Guide", "All Activity Fees"],
    description: `Immerse yourself in our Luxury Retreat at ${dest.name}. This meticulously crafted package offers the perfect balance of luxury and local immersion.`,
    isFeatured: true
  }));

  await Package.insertMany(packData);
  console.log("Packages seeded");

  await Testimonial.insertMany(testimonials);
  console.log("Testimonials seeded");

  await Team.insertMany(teamData);
  console.log("Team seeded");

  await Offer.create(offer);
  console.log("Offer seeded");

  await mongoose.disconnect();
  console.log("Seeding complete. Disconnected.");
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
