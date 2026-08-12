export const CHANNEL_URL = "https://www.youtube.com/@SarisTvEthiopia";
export const SOCIAL = {
  youtube: CHANNEL_URL,
  tiktok: "https://www.tiktok.com/@saristv",
  instagram: "https://www.instagram.com/saristvethiopia",
  facebook: "https://www.facebook.com/saristvethiopia",
};

export type Video = {
  id: string;
  title: string;
  amharic: string;
  category: "Real Estate" | "Cars" | "Electronics" | "Home" | "Health" | "Beauty";
  date: string;
};

export const videos: Video[] = [
  {
    id: "WpQjFUE1lBY",
    title: "Dental Specialty Clinic Prices in Addis Ababa",
    amharic: "የጥርስ ህክምና ዋጋ በአዲስ አበባ",
    category: "Health",
    date: "Latest",
  },
  {
    id: "WAembxxBj64",
    title: "EV & Fuel Car Prices in Ethiopia",
    amharic: "የሰሞኑን የኤሌክትሪክ እና የነዳጅ መኪኖች ዋጋ በኢትዮጵያ",
    category: "Cars",
    date: "This week",
  },
  {
    id: "Rwj_qUTXmGw",
    title: "Nail & Makeup Course Fees in Ethiopia",
    amharic: "የጥፍር እና ሜካፕ ሙያ መማር ለሚፈልጉ",
    category: "Beauty",
    date: "This week",
  },
  {
    id: "kiLCKj-OoYE",
    title: "Ceramic Tile Prices in Ethiopia Today",
    amharic: "የሴራሚክ ዋጋ በኢትዮጵያ",
    category: "Home",
    date: "This week",
  },
  {
    id: "B1AchMzgo2Y",
    title: "Prime Location Luxury Apartment in Sarbet, Addis Ababa",
    amharic: "ያለቀ አፓርትመንት በሳርቤት ከካናዳ ኢምባሲ ጎን",
    category: "Real Estate",
    date: "Recent",
  },
  {
    id: "xT8GW1Yi514",
    title: "Damla Real Estate — Villa from 7.6 Million Birr",
    amharic: "ከ6 ወር እስከ 1 አመት ውስጥ ቤት እና ሱቅ ቁልፍ ይቀበሉ",
    category: "Real Estate",
    date: "Recent",
  },
  {
    id: "w2eTTbCBkIQ",
    title: "Royal Foam — Sleep Comfort and Back Health",
    amharic: "ለምቹ እንቅልፍና ለጀርባ ጤና ትክክለኛው መላ",
    category: "Home",
    date: "Recent",
  },
  {
    id: "acwaLQJi1mI",
    title: "70,000 ETB Luxury Apartment Tour in Piassa",
    amharic: "በመሀል ፒያሳ በካሬ 70 ሺ ብር የሚሸጠው አፓርታማ",
    category: "Real Estate",
    date: "Recent",
  },
  {
    id: "yla0Wmt3ufg",
    title: "TV, Refrigerator, Oven & Washing Machine Prices",
    amharic: "የቲቪ፣ ፍሪጅ፣ ኦቨን እና ማጠቢያ ማሽን ዋጋ",
    category: "Electronics",
    date: "Recent",
  },
  {
    id: "gneEtOfVC6g",
    title: "Laptop and Accessories Prices in Addis Ababa 2026",
    amharic: "የላፕቶፕ እና አክሰሰሪ ዋጋ በአዲስ አበባ",
    category: "Electronics",
    date: "Recent",
  },
];

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;