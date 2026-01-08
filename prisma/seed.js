const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LOREM_DESC = `
  Experience the perfect blend of style and comfort with this premium item. 
  Designed for the modern individual, it features high-quality materials and meticulous attention to detail.
  
  Key Features:
  - Premium Fabric: Soft, breathable, and durable.
  - Modern Fit: Tailored to flatter your silhouette.
  - Versatile Style: Perfect for both casual and formal occasions.
  - Easy Care: Machine washable and resistant to shrinking.
  
  Whether you're heading to the office or a weekend outing, this piece will elevate your look effortlessly.
  Combine it with our other accessories for a complete ensemble.
`;

const MEN_PRODUCTS = [
  { title: "Classic White T-Shirt", price: 29000, img: "photo-1521572267360-ee0c2909d518" },
  { title: "Denim Trucker Jacket", price: 89000, img: "photo-1523205771623-e0faa4d2813d" },
  { title: "Slim Fit Chinos", price: 49000, img: "photo-1473966968600-fa801b869a1a" },
  { title: "Oxford Button-Down", price: 55000, img: "photo-1596755094514-f87e34085b2c" },
  { title: "Leather Biker Jacket", price: 250000, img: "photo-1487222477894-8943e31ef7b2" },
  { title: "Casual Hoodie Grey", price: 65000, img: "photo-1578587018452-892bacefd3f2" },
  { title: "Formal Navy Suit", price: 350000, img: "photo-1594938298603-c8148c4dae35" },
  { title: "Striped Polo Shirt", price: 42000, img: "photo-1626557981101-aae6f84aa6ff" },
];

const WOMEN_PRODUCTS = [
  { title: "Floral Summer Dress", price: 59000, img: "photo-1515372039744-b8f02a3ae446" },
  { title: "Elegant Silk Blouse", price: 78000, img: "photo-1564257631407-4deb1f99d992" },
  { title: "High-Waist Jeans", price: 62000, img: "photo-1541099649105-f69ad21f3246" },
  { title: "Cozy Knit Sweater", price: 54000, img: "photo-1576566588028-4147f3842f27" },
  { title: "Pleated Midi Skirt", price: 48000, img: "photo-1583496661160-fb5886a0aaaa" },
  { title: "Classic Trench Coat", price: 180000, img: "photo-1591047139829-d91aecb6caea" },
  { title: "Bohemian Maxi Dress", price: 85000, img: "photo-1496747611176-843222e1e57c" },
  { title: "Cropped Leather Jacket", price: 150000, img: "photo-1520975954732-35dd22299614" },
];

// UPDATED: 확실하게 작동하는 악세사리 이미지 ID로 교체
const ACC_PRODUCTS = [
  { title: "Minimalist Leather Watch", price: 120000, img: "photo-1522312346375-d1a52e2b99b3" },
  { title: "Classic Wayfarer Sunglasses", price: 150000, img: "photo-1572635196237-14b3f281503f" },
  { title: "Leather Crossbody Bag", price: 89000, img: "photo-1584917865442-de89df76afd3" },
  { title: "Canvas Backpack", price: 55000, img: "photo-1581605405669-fcdf81165afa" },
  { title: "Silver Chain Necklace", price: 45000, img: "photo-1611591437281-460bfbe1220a" },
  { title: "Wool Fedora Hat", price: 32000, img: "photo-1533055640609-24b498dfd74c" },
  { title: "Classic Leather Belt", price: 28000, img: "photo-1553531384-cc64ac80f931" },
  { title: "Designer Tote Bag", price: 95000, img: "photo-1591561954557-26941169b49e" },
];

async function main() {
  console.log("Start seeding...");

  // Reset DB
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const men = await prisma.category.create({ data: { name: "Men", slug: "men" } });
  const women = await prisma.category.create({ data: { name: "Women", slug: "women" } });
  const acc = await prisma.category.create({ data: { name: "Accessories", slug: "accessories" } });

  const createProducts = async (list, categoryId) => {
    for (const p of list) {
      await prisma.product.create({
        data: {
          title: p.title,
          slug: p.title.toLowerCase().replace(/ /g, "-") + "-" + Math.floor(Math.random() * 1000),
          description: LOREM_DESC,
          price: p.price,
          // Unsplash Source API 형식 사용 (ID 기반)
          images: `https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=800&q=80`,
          categoryId: categoryId,
        },
      });
    }
  };

  await createProducts(MEN_PRODUCTS, men.id);
  await createProducts(WOMEN_PRODUCTS, women.id);
  await createProducts(ACC_PRODUCTS, acc.id);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
