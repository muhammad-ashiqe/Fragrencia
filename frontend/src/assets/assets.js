import p1_1 from '../assets/1.1.webp';
import p1_2 from '../assets/1.2.webp';
import p1_3 from '../assets/1.3.webp';
import p1_4 from '../assets/1.4.webp';
import p2_1 from '../assets/2.1.webp';
import p2_2 from '../assets/2.2.webp';
import p2_3 from '../assets/2.3.webp';
import p2_4 from '../assets/2.4.webp';
import p3_1 from '../assets/3.1.webp';
import p3_2 from '../assets/3.2.webp';
import p3_3 from '../assets/3.3.webp';
import p3_4 from '../assets/3.4.webp';
import p4_1 from '../assets/4.1.webp';
import p4_2 from '../assets/4.2.webp';
import p4_3 from '../assets/4.3.webp';
import p4_4 from '../assets/4.4.webp';
import p5_1 from '../assets/5.1.webp';
import p5_2 from '../assets/5.2.jpg';
import p5_3 from '../assets/5.3.jpg';
import p5_4 from '../assets/5.4.webp';
import p6_1 from '../assets/6.1.webp';
import p6_2 from '../assets/6.2.webp';
import p6_3 from '../assets/6.3.webp';
import p6_4 from '../assets/6.4.webp';
import p7_1 from '../assets/7.1.webp';
import p7_2 from '../assets/7.2.webp';
import p7_3 from '../assets/7.3.webp';
import p7_4 from '../assets/7.4.webp';
import p8_1 from '../assets/8.1.webp';
import p8_2 from '../assets/8.2.webp';
import p8_3 from '../assets/8.3.webp';
import p8_4 from '../assets/8.4.webp';
import p9_1 from '../assets/9.1.webp';
import p9_2 from '../assets/9.2.webp';
import p9_3 from '../assets/9.3.webp';
import p9_4 from '../assets/9.4.webp';
import p10_1 from '../assets/10.1.jpg';
import p10_2 from '../assets/10.2.jpg';
import p10_3 from '../assets/10.3.jpg';
import p10_4 from '../assets/10.4.jpg';
import p11_1 from '../assets/11.1.webp';
import p11_2 from '../assets/11.2.jpg';
import p11_3 from '../assets/11.3.webp';
import p12_1 from '../assets/12.1.webp';
import p12_2 from '../assets/12.2.webp';
import p12_3 from '../assets/12.3.webp';
import p12_4 from '../assets/12.4.webp';



import hero from '../assets/hero.webp'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import menu_icon from './menu_icon.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import logo from "../assets/logo.png"
import support_img from "../assets/support_img.png"

export const assets = {
    hero,
    logo,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    menu_icon,
    razorpay_logo,
    stripe_logo,
    support_img,
    cross_icon
}

export const products = [
    {
        _id: "perfume1",
        name: "Dazler Brown Vintage",
        description: "A bold and exotic scent with spicy pepper and cardamom notes.",
        price: 3499,
        image: [p1_1, p1_2, p1_3, p1_4],
        category: "Men",
        subCategory: "spicy",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "perfume2",
        name: "Aqua Blue Intense",
        description: "A refreshing aquatic fragrance inspired by ocean waves.",
        price: 3999,
        image: [p2_1, p2_2, p2_3, p2_4],
        category: "Unisex",
        subCategory: "aquatic",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621346448,
        bestseller: false
    },
    {
        _id: "perfume3",
        name: "Citrus Punch",
        description: "A vibrant and zesty fragrance packed with citrusy goodness.",
        price: 3299,
        image: [p3_1, p3_2, p3_3, p3_4],
        category: "Women",
        subCategory: "citrus",
        sizes: ["50 ML", "100 ML"],
        date: 1716621347448,
        bestseller: true
    },
    {
        _id: "perfume4",
        name: "Ocean Drift",
        description: "An aquatic masterpiece with notes of sea breeze and salt.",
        price: 4499,
        image: [p4_1, p4_2, p4_3, p4_4],
        category: "Men",
        subCategory: "aquatic",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621348448,
        bestseller: false
    },
    {
        _id: "perfume5",
        name: "Amber Spice",
        description: "A rich and warm fragrance blending amber and exotic spices.",
        price: 3599,
        image: [p5_1, p5_2, p5_3, p5_4],
        category: "Women",
        subCategory: "spicy",
        sizes: ["50 ML", "100 ML"],
        date: 1716621349448,
        bestseller: true
    },
    {
        _id: "perfume6",
        name: "Citrus Sunrise",
        description: "A dazzling citrus aroma with hints of orange and lime.",
        price: 3299,
        image: [p6_1, p6_2, p6_3, p6_4],
        category: "Unisex",
        subCategory: "citrus",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621350448,
        bestseller: false
    },
    {
        _id: "perfume7",
        name: "Deep Blue Essence",
        description: "An aquatic blend with refreshing marine and watery notes.",
        price: 4699,
        image: [p7_1, p7_2, p7_3, p7_4],
        category: "Men",
        subCategory: "aquatic",
        sizes: ["50 ML", "100 ML"],
        date: 1716621351448,
        bestseller: true
    },
    {
        _id: "perfume8",
        name: "Spice Mystique",
        description: "A mysterious fragrance with a fusion of cinnamon and cloves.",
        price: 3799,
        image: [p8_1, p8_2, p8_3, p8_4],
        category: "Unisex",
        subCategory: "spicy",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621352448,
        bestseller: false
    },
    {
        _id: "perfume9",
        name: "Citrus Blossom",
        description: "A floral and citrus blend inspired by orange blossom gardens.",
        price: 3499,
        image: [p9_1, p9_2, p9_3, p9_4],
        category: "Women",
        subCategory: "citrus",
        sizes: ["50 ML", "100 ML"],
        date: 1716621353448,
        bestseller: true
    },
    {
        _id: "perfume10",
        name: "Marine Whisper",
        description: "An aquatic delight that evokes serenity and ocean vibes.",
        price: 4999,
        image: [p10_1, p10_2, p10_3, p10_4],
        category: "Unisex",
        subCategory: "aquatic",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621354448,
        bestseller: false
    },
    {
        _id: "perfume11",
        name: "Fiery Spice",
        description: "An intense and fiery scent with red pepper and vanilla undertones.",
        price: 3899,
        image: [p11_1, p11_2, p11_3],
        category: "Men",
        subCategory: "spicy",
        sizes: ["50 ML", "100 ML", "150 ML"],
        date: 1716621355448,
        bestseller: true
    },
    {
        _id: "perfume12",
        name: "Citrus Luxe",
        description: "A luxurious citrus fragrance with a touch of elegance.",
        price: 4599,
        image: [p12_1, p12_2, p12_3, p12_4],
        category: "Women",
        subCategory: "citrus",
        sizes: ["50 ML", "100 ML"],
        date: 1716621356448,
        bestseller: false
    }
];
