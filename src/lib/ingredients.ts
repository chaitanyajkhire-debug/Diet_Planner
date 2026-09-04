import type { IngredientEntry } from '@/types'

/**
 * Bilingual (Marathi script + transliteration) ingredient dictionary.
 * Search matches against english name, marathi script, transliteration, and aliases.
 */
export const INGREDIENT_DICTIONARY: IngredientEntry[] = [
  { id: 'onion', english: 'Onion', marathi: 'कांदा', transliteration: 'Kanda', aliases: ['kanda', 'kaanda'], category: 'vegetable', vegetarian: true },
  { id: 'potato', english: 'Potato', marathi: 'बटाटा', transliteration: 'Batata', aliases: ['batata', 'aloo', 'alu'], category: 'vegetable', vegetarian: true },
  { id: 'tomato', english: 'Tomato', marathi: 'टोमॅटो', transliteration: 'Tomato', aliases: ['tamatar'], category: 'vegetable', vegetarian: true },
  { id: 'sorghum', english: 'Sorghum', marathi: 'ज्वारी', transliteration: 'Jowar', aliases: ['jowar', 'jwari'], category: 'grain', vegetarian: true },
  { id: 'pearl-millet', english: 'Pearl Millet', marathi: 'बाजरी', transliteration: 'Bajri', aliases: ['bajra', 'bajri'], category: 'grain', vegetarian: true },
  { id: 'flattened-rice', english: 'Flattened Rice', marathi: 'पोहे', transliteration: 'Poha', aliases: ['poha', 'pohe'], category: 'grain', vegetarian: true },
  { id: 'fenugreek-leaves', english: 'Fenugreek Leaves', marathi: 'मेथी', transliteration: 'Methi', aliases: ['methi', 'fenugreek'], category: 'vegetable', vegetarian: true },
  { id: 'moth-beans', english: 'Moth Beans', marathi: 'मटकी', transliteration: 'Matki', aliases: ['matki', 'moth'], category: 'legume', vegetarian: true },
  { id: 'rice', english: 'Rice', marathi: 'तांदूळ', transliteration: 'Tandul', aliases: ['tandul', 'chawal', 'bhaat'], category: 'grain', vegetarian: true },
  { id: 'wheat-flour', english: 'Wheat Flour', marathi: 'गहू / कणीक', transliteration: 'Gahu / Kanik', aliases: ['gahu', 'kanik', 'atta'], category: 'grain', vegetarian: true },
  { id: 'chickpea-flour', english: 'Chickpea Flour', marathi: 'बेसन', transliteration: 'Besan', aliases: ['besan', 'gram flour'], category: 'legume', vegetarian: true },
  { id: 'toor-dal', english: 'Pigeon Pea Lentils', marathi: 'तूर डाळ', transliteration: 'Toor Dal', aliases: ['toor dal', 'tur dal', 'arhar dal'], category: 'legume', vegetarian: true },
  { id: 'moong-dal', english: 'Split Green Gram', marathi: 'मूग डाळ', transliteration: 'Moong Dal', aliases: ['moong dal', 'mung dal'], category: 'legume', vegetarian: true },
  { id: 'chana-dal', english: 'Split Bengal Gram', marathi: 'चणा डाळ', transliteration: 'Chana Dal', aliases: ['chana dal', 'harbara dal'], category: 'legume', vegetarian: true },
  { id: 'chickpeas', english: 'Chickpeas', marathi: 'हरभरा / चणे', transliteration: 'Harbhara / Chane', aliases: ['harbhara', 'chana', 'chole', 'kabuli chana'], category: 'legume', vegetarian: true },
  { id: 'peanuts', english: 'Peanuts', marathi: 'शेंगदाणे', transliteration: 'Shengdane', aliases: ['shengdane', 'groundnut'], category: 'legume', vegetarian: true },
  { id: 'coconut', english: 'Coconut', marathi: 'नारळ / खोबरं', transliteration: 'Naral / Khobra', aliases: ['naral', 'khobra', 'nariyal'], category: 'other', vegetarian: true },
  { id: 'green-chilli', english: 'Green Chilli', marathi: 'हिरवी मिरची', transliteration: 'Hirvi Mirchi', aliases: ['mirchi', 'mirch'], category: 'spice', vegetarian: true },
  { id: 'ginger', english: 'Ginger', marathi: 'आले', transliteration: 'Aale', aliases: ['aale', 'adrak'], category: 'spice', vegetarian: true },
  { id: 'garlic', english: 'Garlic', marathi: 'लसूण', transliteration: 'Lasun', aliases: ['lasun', 'lehsun'], category: 'spice', vegetarian: true },
  { id: 'coriander-leaves', english: 'Coriander Leaves', marathi: 'कोथिंबीर', transliteration: 'Kothimbir', aliases: ['kothimbir', 'dhania', 'cilantro'], category: 'vegetable', vegetarian: true },
  { id: 'curry-leaves', english: 'Curry Leaves', marathi: 'कढीपत्ता', transliteration: 'Kadhipatta', aliases: ['kadhipatta', 'curry patta'], category: 'spice', vegetarian: true },
  { id: 'turmeric', english: 'Turmeric', marathi: 'हळद', transliteration: 'Halad', aliases: ['halad', 'haldi'], category: 'spice', vegetarian: true },
  { id: 'mustard-seeds', english: 'Mustard Seeds', marathi: 'मोहरी', transliteration: 'Mohri', aliases: ['mohri', 'rai'], category: 'spice', vegetarian: true },
  { id: 'cumin-seeds', english: 'Cumin Seeds', marathi: 'जिरे', transliteration: 'Jeere', aliases: ['jeere', 'jeera'], category: 'spice', vegetarian: true },
  { id: 'eggplant', english: 'Eggplant', marathi: 'वांगे', transliteration: 'Vange', aliases: ['vange', 'baingan', 'brinjal'], category: 'vegetable', vegetarian: true },
  { id: 'okra', english: 'Okra', marathi: 'भेंडी', transliteration: 'Bhendi', aliases: ['bhendi', 'bhindi', 'lady finger'], category: 'vegetable', vegetarian: true },
  { id: 'bottle-gourd', english: 'Bottle Gourd', marathi: 'दुधी भोपळा', transliteration: 'Dudhi Bhopla', aliases: ['dudhi', 'lauki'], category: 'vegetable', vegetarian: true },
  { id: 'ridge-gourd', english: 'Ridge Gourd', marathi: 'दोडका', transliteration: 'Dodka', aliases: ['dodka', 'turai'], category: 'vegetable', vegetarian: true },
  { id: 'spinach', english: 'Spinach', marathi: 'पालक', transliteration: 'Palak', aliases: ['palak'], category: 'vegetable', vegetarian: true },
  { id: 'cauliflower', english: 'Cauliflower', marathi: 'फ्लॉवर', transliteration: 'Flower', aliases: ['flower', 'gobi'], category: 'vegetable', vegetarian: true },
  { id: 'cabbage', english: 'Cabbage', marathi: 'कोबी', transliteration: 'Kobi', aliases: ['kobi', 'patta gobi'], category: 'vegetable', vegetarian: true },
  { id: 'green-peas', english: 'Green Peas', marathi: 'वाटाणा', transliteration: 'Vatana', aliases: ['vatana', 'matar'], category: 'legume', vegetarian: true },
  { id: 'cluster-beans', english: 'Cluster Beans', marathi: 'गवार', transliteration: 'Gavar', aliases: ['gavar', 'gavaar'], category: 'vegetable', vegetarian: true },
  { id: 'colocasia-leaves', english: 'Colocasia Leaves', marathi: 'अळूची पाने', transliteration: 'Aluchi Pane', aliases: ['alu vadi', 'aluchi pane'], category: 'vegetable', vegetarian: true },
  { id: 'milk', english: 'Milk', marathi: 'दूध', transliteration: 'Dudh', aliases: ['dudh', 'doodh'], category: 'dairy', vegetarian: true },
  { id: 'curd', english: 'Curd / Yogurt', marathi: 'दही', transliteration: 'Dahi', aliases: ['dahi', 'yogurt', 'curd'], category: 'dairy', vegetarian: true },
  { id: 'paneer', english: 'Paneer', marathi: 'पनीर', transliteration: 'Paneer', aliases: ['paneer', 'cottage cheese'], category: 'dairy', vegetarian: true },
  { id: 'ghee', english: 'Ghee', marathi: 'तूप', transliteration: 'Tup', aliases: ['tup', 'ghee'], category: 'dairy', vegetarian: true },
  { id: 'buttermilk', english: 'Buttermilk', marathi: 'ताक', transliteration: 'Taak', aliases: ['taak', 'chaas'], category: 'dairy', vegetarian: true },
  { id: 'egg', english: 'Egg', marathi: 'अंडे', transliteration: 'Ande', aliases: ['ande', 'anda'], category: 'protein', vegetarian: false },
  { id: 'chicken', english: 'Chicken', marathi: 'चिकन', transliteration: 'Chicken', aliases: ['chicken', 'kombdi'], category: 'protein', vegetarian: false },
  { id: 'mutton', english: 'Mutton', marathi: 'मटण', transliteration: 'Mutton', aliases: ['mutton', 'lamb', 'goat'], category: 'protein', vegetarian: false },
  { id: 'fish', english: 'Fish', marathi: 'मासे', transliteration: 'Mase', aliases: ['mase', 'machhi'], category: 'protein', vegetarian: false },
  { id: 'prawns', english: 'Prawns', marathi: 'कोळंबी', transliteration: 'Kolambi', aliases: ['kolambi', 'shrimp'], category: 'protein', vegetarian: false },
  { id: 'banana', english: 'Banana', marathi: 'केळे', transliteration: 'Kele', aliases: ['kele', 'kela'], category: 'fruit', vegetarian: true },
  { id: 'mango', english: 'Mango', marathi: 'आंबा', transliteration: 'Aamba', aliases: ['aamba', 'aam'], category: 'fruit', vegetarian: true },
  { id: 'apple', english: 'Apple', marathi: 'सफरचंद', transliteration: 'Safarchand', aliases: ['safarchand', 'seb'], category: 'fruit', vegetarian: true },
  { id: 'lemon', english: 'Lemon', marathi: 'लिंबू', transliteration: 'Limbu', aliases: ['limbu', 'nimbu'], category: 'fruit', vegetarian: true },
  { id: 'jaggery', english: 'Jaggery', marathi: 'गूळ', transliteration: 'Gul', aliases: ['gul', 'gud'], category: 'other', vegetarian: true },
  { id: 'tamarind', english: 'Tamarind', marathi: 'चिंच', transliteration: 'Chinch', aliases: ['chinch', 'imli'], category: 'other', vegetarian: true },
  { id: 'oats', english: 'Oats', marathi: 'ओट्स', transliteration: 'Oats', aliases: ['oats'], category: 'grain', vegetarian: true },
  { id: 'quinoa', english: 'Quinoa', marathi: 'क्विनोआ', transliteration: 'Quinoa', aliases: ['quinoa'], category: 'grain', vegetarian: true },
  { id: 'sprouts', english: 'Mixed Sprouts', marathi: 'मोड आलेले कडधान्य', transliteration: 'Mod Aalele Kadhdhanya', aliases: ['sprouts', 'usal'], category: 'legume', vegetarian: true },
  { id: 'sweet-potato', english: 'Sweet Potato', marathi: 'रताळे', transliteration: 'Ratale', aliases: ['ratale', 'shakarkand'], category: 'vegetable', vegetarian: true },
  { id: 'capsicum', english: 'Capsicum', marathi: 'सिमला मिरची', transliteration: 'Simla Mirchi', aliases: ['simla mirchi', 'bell pepper'], category: 'vegetable', vegetarian: true },
  { id: 'broccoli', english: 'Broccoli', marathi: 'ब्रोकोली', transliteration: 'Broccoli', aliases: ['broccoli'], category: 'vegetable', vegetarian: true },
  { id: 'mushroom', english: 'Mushroom', marathi: 'अळिंबी', transliteration: 'Alimbi', aliases: ['mushroom', 'alimbi'], category: 'vegetable', vegetarian: true },
  { id: 'tofu', english: 'Tofu', marathi: 'टोफू', transliteration: 'Tofu', aliases: ['tofu'], category: 'protein', vegetarian: true },
  { id: 'almonds', english: 'Almonds', marathi: 'बदाम', transliteration: 'Badam', aliases: ['badam'], category: 'other', vegetarian: true },
  { id: 'walnuts', english: 'Walnuts', marathi: 'अक्रोड', transliteration: 'Akrod', aliases: ['akrod'], category: 'other', vegetarian: true },
  { id: 'flax-seeds', english: 'Flax Seeds', marathi: 'जवस', transliteration: 'Javas', aliases: ['javas', 'alsi'], category: 'other', vegetarian: true },
  { id: 'sesame-seeds', english: 'Sesame Seeds', marathi: 'तीळ', transliteration: 'Til', aliases: ['til'], category: 'other', vegetarian: true },
  { id: 'olive-oil', english: 'Olive Oil', marathi: 'ऑलिव्ह तेल', transliteration: 'Olive Tel', aliases: ['olive oil'], category: 'other', vegetarian: true },
  { id: 'oil', english: 'Cooking Oil', marathi: 'तेल', transliteration: 'Tel', aliases: ['tel', 'oil'], category: 'other', vegetarian: true },
]

export const INGREDIENT_MAP = new Map(INGREDIENT_DICTIONARY.map((i) => [i.id, i]))

export function ingredientLabel(entry: IngredientEntry): string {
  const scriptPart = [entry.transliteration, entry.marathi].filter(Boolean).join(' / ')
  return scriptPart ? `${entry.english} (${scriptPart})` : entry.english
}

export function searchIngredients(query: string, dietType?: 'vegetarian' | 'non-vegetarian'): IngredientEntry[] {
  const q = query.trim().toLowerCase()
  const pool = dietType === 'vegetarian' ? INGREDIENT_DICTIONARY.filter((i) => i.vegetarian) : INGREDIENT_DICTIONARY

  if (!q) return pool.slice(0, 8)

  return pool
    .filter((entry) => {
      const haystacks = [entry.english, entry.marathi, entry.transliteration, ...entry.aliases]
        .filter(Boolean)
        .map((s) => s!.toLowerCase())
      return haystacks.some((h) => h.includes(q))
    })
    .sort((a, b) => {
      const aStarts = a.english.toLowerCase().startsWith(q) ? 0 : 1
      const bStarts = b.english.toLowerCase().startsWith(q) ? 0 : 1
      return aStarts - bStarts
    })
    .slice(0, 10)
}
