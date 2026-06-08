import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryResponseDto } from 'src/app/category/interfaces/category-interfaces';
import { CategoryService } from 'src/app/category/services/category.service';


// ─── CLASS SE BAHAR — FILE LEVEL PE ───────────────────────────────────────────

const SIZE_GROUPS = {
  // T-Shirts / Tops / Hoodies / Sweatshirts
  tops: ['XS','S','M','L','XL','XXL','3XL','4XL','5XL','6XL'],

  // Jeans / Trousers / Pants (waist size)
  bottomsWaist: [
    '26','27','28','29','30','31','32','33','34','35','36','38','40','42','44'
  ],

  // Jeans / Pants (waist x length)
  bottomsWxL: [
    '28x30','28x32','30x30','30x32','30x34',
    '32x30','32x32','32x34','34x30','34x32','34x34','36x32','36x34'
  ],

  // Shalwar Kameez / Kurti (South Asian sizing)
  shalwarKameez: [
    'XS (34)','S (36)','M (38)','L (40)','XL (42)','XXL (44)',
    '3XL (46)','4XL (48)','5XL (50)',
    'Free Size'
  ],

  // Kurti numeric sizes
  kurtiNumeric: [
    '34','36','38','40','42','44','46','48','50'
  ],

  // Women Dresses / Frocks / Abayas
  womenDresses: [
    'XS','S','M','L','XL','XXL','3XL','4XL','5XL',
    '6','8','10','12','14','16','18','20',
    'Free Size'
  ],

  // Blouse / Choli sizes
  blouse: [
    '28','30','32','34','36','38','40','42','44','46',
    'XS','S','M','L','XL','XXL','Free Size'
  ],

  // Bra sizes
  bra: [
    '28A','28B','28C','28D',
    '30A','30B','30C','30D',
    '32A','32B','32C','32D','32DD','32DDD',
    '34A','34B','34C','34D','34DD','34DDD',
    '36A','36B','36C','36D','36DD',
    '38A','38B','38C','38D','38DD',
    '40B','40C','40D',
    'Free Size'
  ],

  // Underwear / Panties / Boxers / Briefs
  undergarments: [
    'XS','S','M','L','XL','XXL','3XL','4XL','Free Size'
  ],

  // Leggings / Tights / Stockings
  leggings: [
    'XS','S','M','L','XL','XXL','3XL',
    'S/M','M/L','L/XL','Free Size'
  ],

  // Hijab / Dupatta / Scarf
  hijab: [
    'Small (150x70 cm)','Medium (170x70 cm)','Large (200x70 cm)',
    'XL (220x75 cm)','Free Size'
  ],

  // Shoes / Footwear — Women
  shoesWomen: [
    'UK 3','UK 4','UK 5','UK 6','UK 7','UK 8',
    'EU 36','EU 37','EU 38','EU 39','EU 40','EU 41',
    'US 5','US 6','US 7','US 8','US 9','US 10'
  ],

  // Shoes / Footwear — Men
  shoesMen: [
    'UK 6','UK 7','UK 8','UK 9','UK 10','UK 11','UK 12',
    'EU 39','EU 40','EU 41','EU 42','EU 43','EU 44','EU 45','EU 46',
    'US 7','US 8','US 9','US 10','US 11','US 12','US 13'
  ],

  // Kids Clothing — Age based
  kidsAge: [
    '0–3 M','3–6 M','6–9 M','6–12 M','9–12 M',
    '12–18 M','18–24 M',
    '2–3 Y','3–4 Y','4–5 Y','5–6 Y',
    '6–7 Y','7–8 Y','8–9 Y','9–10 Y',
    '10–11 Y','11–12 Y','12–13 Y','13–14 Y'
  ],

  // Kids Clothing — Standard sizes
  kidsStandard: [
    'XS (3–4Y)','S (5–6Y)','M (7–8Y)','L (9–10Y)','XL (11–12Y)','XXL (13–14Y)'
  ],

  // Kids Shoes
  kidsShoes: [
    'UK 5C','UK 6C','UK 7C','UK 8C','UK 9C','UK 10C',
    'UK 11C','UK 12C','UK 13C','UK 1','UK 2','UK 3',
    'EU 21','EU 22','EU 23','EU 24','EU 25','EU 26',
    'EU 27','EU 28','EU 29','EU 30','EU 31','EU 32','EU 33','EU 34','EU 35'
  ],

  // Perfume / Fragrance — ml
  perfumeMl: [
    '5 ml','7.5 ml','10 ml','15 ml','20 ml','25 ml',
    '30 ml','35 ml','40 ml','50 ml','60 ml',
    '75 ml','80 ml','90 ml','100 ml',
    '120 ml','125 ml','150 ml','200 ml','250 ml'
  ],

  // Attar / Roll-on — ml
  attar: [
    '3 ml','5 ml','6 ml','8 ml','10 ml','12 ml',
    '15 ml','20 ml','25 ml','30 ml'
  ],

  // Skincare — ml
  skincareML: [
    '5 ml','10 ml','15 ml','20 ml','25 ml','30 ml',
    '50 ml','60 ml','75 ml','100 ml',
    '120 ml','125 ml','150 ml','175 ml',
    '200 ml','250 ml','300 ml','400 ml','500 ml','1 L'
  ],

  // Skincare — g (creams, masks, scrubs)
  skincareG: [
    '5 g','10 g','15 g','20 g','25 g','30 g',
    '50 g','60 g','75 g','100 g',
    '150 g','200 g','250 g','300 g','500 g'
  ],

  // Hair Care — ml / g
  hairCare: [
    '50 ml','100 ml','150 ml','200 ml','250 ml',
    '300 ml','400 ml','500 ml','750 ml','1 L',
    '50 g','100 g','200 g','300 g','500 g'
  ],

  // Nail Polish / Lip products — ml
  nailLip: [
    '3.5 ml','4 ml','5 ml','6 ml','7 ml','8 ml',
    '10 ml','12 ml','15 ml'
  ],

  // Makeup — g (foundation, powder, blush)
  makeupG: [
    '1 g','2 g','3 g','4 g','5 g','6 g','8 g',
    '10 g','12 g','15 g','20 g','25 g','30 g'
  ],

  // Jewelry — ring sizes
  ringSizes: [
    'Size 5','Size 6','Size 7','Size 8','Size 9','Size 10',
    'Size 11','Size 12',
    'EU 49','EU 51','EU 52','EU 54','EU 55','EU 57','EU 59','EU 61',
    'Free Size','Adjustable'
  ],

  // Jewelry — bracelet / bangle
  bangle: [
    '2.2 inch','2.4 inch','2.6 inch','2.8 inch',
    'XS','S','M','L','Free Size','Adjustable'
  ],

  // Bags / Purses
  bags: [
    'Mini','Small','Medium','Large','XL','Oversized'
  ],

  // Watches / Belts / Accessories
  accessories: [
    'XS','S','M','L','XL','Free Size','Adjustable',
    '28 inch','30 inch','32 inch','34 inch','36 inch','38 inch','40 inch','42 inch'
  ],

  // Caps / Hats
  caps: [
    'S/M (54–56 cm)','M/L (56–58 cm)','L/XL (58–60 cm)',
    'One Size','Free Size','Adjustable'
  ],

  // Gloves / Socks
  glovesSocks: [
    'XS','S','M','L','XL','XXL',
    'S/M','M/L','L/XL','Free Size'
  ],

  // Mattress / Bedding
  bedding: [
    'Single (90x190 cm)','Twin (99x190 cm)',
    'Double (135x190 cm)','Queen (150x200 cm)',
    'King (180x200 cm)','Super King (200x200 cm)'
  ],
};

const allSizes: { label: string; value: string; disabled?: boolean }[] = [

  // ── T-Shirts / Tops / Hoodies ──
  { label: '── T-Shirts / Tops / Hoodies ──', value: '__tops__', disabled: true },
  ...SIZE_GROUPS.tops.map(s => ({ label: s, value: s })),

  // ── Jeans / Trousers (Waist) ──
  { label: '── Jeans / Trousers — Waist ──', value: '__waist__', disabled: true },
  ...SIZE_GROUPS.bottomsWaist.map(s => ({ label: s, value: `W-${s}` })),

  // ── Jeans (Waist x Length) ──
  { label: '── Jeans — Waist × Length ──', value: '__wxl__', disabled: true },
  ...SIZE_GROUPS.bottomsWxL.map(s => ({ label: s, value: `WxL-${s}` })),

  // ── Shalwar Kameez / Kurti ──
  { label: '── Shalwar Kameez / Kurti ──', value: '__sk__', disabled: true },
  ...SIZE_GROUPS.shalwarKameez.map(s => ({ label: s, value: `SK-${s}` })),

  // ── Kurti Numeric ──
  { label: '── Kurti — Numeric ──', value: '__kn__', disabled: true },
  ...SIZE_GROUPS.kurtiNumeric.map(s => ({ label: s, value: `KN-${s}` })),

  // ── Women Dresses / Frocks / Abayas ──
  { label: '── Women Dresses / Frocks / Abayas ──', value: '__wd__', disabled: true },
  ...SIZE_GROUPS.womenDresses.map(s => ({ label: s, value: `WD-${s}` })),

  // ── Blouse / Choli ──
  { label: '── Blouse / Choli ──', value: '__bl__', disabled: true },
  ...SIZE_GROUPS.blouse.map(s => ({ label: s, value: `BL-${s}` })),

  // ── Bra ──
  { label: '── Bra ──', value: '__bra__', disabled: true },
  ...SIZE_GROUPS.bra.map(s => ({ label: s, value: `Bra-${s}` })),

  // ── Undergarments ──
  { label: '── Undergarments / Lingerie ──', value: '__ug__', disabled: true },
  ...SIZE_GROUPS.undergarments.map(s => ({ label: s, value: `UG-${s}` })),

  // ── Leggings / Tights ──
  { label: '── Leggings / Tights / Stockings ──', value: '__leg__', disabled: true },
  ...SIZE_GROUPS.leggings.map(s => ({ label: s, value: `LEG-${s}` })),

  // ── Hijab / Dupatta ──
  { label: '── Hijab / Dupatta / Scarf ──', value: '__hij__', disabled: true },
  ...SIZE_GROUPS.hijab.map(s => ({ label: s, value: `HIJ-${s}` })),

  // ── Women Shoes ──
  { label: '── Shoes — Women ──', value: '__sw__', disabled: true },
  ...SIZE_GROUPS.shoesWomen.map(s => ({ label: s, value: `SW-${s}` })),

  // ── Men Shoes ──
  { label: '── Shoes — Men ──', value: '__sm__', disabled: true },
  ...SIZE_GROUPS.shoesMen.map(s => ({ label: s, value: `SM-${s}` })),

  // ── Kids Clothing (Age) ──
  { label: '── Kids Clothing — Age ──', value: '__ka__', disabled: true },
  ...SIZE_GROUPS.kidsAge.map(s => ({ label: s, value: `KA-${s}` })),

  // ── Kids Clothing (Standard) ──
  { label: '── Kids Clothing — Standard ──', value: '__ks__', disabled: true },
  ...SIZE_GROUPS.kidsStandard.map(s => ({ label: s, value: `KS-${s}` })),

  // ── Kids Shoes ──
  { label: '── Kids Shoes ──', value: '__ksh__', disabled: true },
  ...SIZE_GROUPS.kidsShoes.map(s => ({ label: s, value: `KSH-${s}` })),

  // ── Perfume / Fragrance ──
  { label: '── Perfume / Fragrance (ml) ──', value: '__perf__', disabled: true },
  ...SIZE_GROUPS.perfumeMl.map(s => ({ label: s, value: `Perf-${s}` })),

  // ── Attar / Roll-on ──
  { label: '── Attar / Roll-on (ml) ──', value: '__att__', disabled: true },
  ...SIZE_GROUPS.attar.map(s => ({ label: s, value: `Att-${s}` })),

  // ── Skincare (ml) ──
  { label: '── Skincare / Lotion / Serum (ml) ──', value: '__skml__', disabled: true },
  ...SIZE_GROUPS.skincareML.map(s => ({ label: s, value: `SK-ML-${s}` })),

  // ── Skincare (g) ──
  { label: '── Skincare / Cream / Mask (g) ──', value: '__skg__', disabled: true },
  ...SIZE_GROUPS.skincareG.map(s => ({ label: s, value: `SK-G-${s}` })),

  // ── Hair Care ──
  { label: '── Hair Care (ml / g) ──', value: '__hair__', disabled: true },
  ...SIZE_GROUPS.hairCare.map(s => ({ label: s, value: `Hair-${s}` })),

  // ── Nail / Lip ──
  { label: '── Nail Polish / Lip Products (ml) ──', value: '__nail__', disabled: true },
  ...SIZE_GROUPS.nailLip.map(s => ({ label: s, value: `NL-${s}` })),

  // ── Makeup (g) ──
  { label: '── Makeup — Foundation / Powder (g) ──', value: '__mkp__', disabled: true },
  ...SIZE_GROUPS.makeupG.map(s => ({ label: s, value: `MKP-${s}` })),

  // ── Ring Sizes ──
  { label: '── Jewelry — Ring Sizes ──', value: '__ring__', disabled: true },
  ...SIZE_GROUPS.ringSizes.map(s => ({ label: s, value: `Ring-${s}` })),

  // ── Bangle / Bracelet ──
  { label: '── Jewelry — Bangle / Bracelet ──', value: '__bng__', disabled: true },
  ...SIZE_GROUPS.bangle.map(s => ({ label: s, value: `Bng-${s}` })),

  // ── Bags ──
  { label: '── Bags / Purses ──', value: '__bag__', disabled: true },
  ...SIZE_GROUPS.bags.map(s => ({ label: s, value: `Bag-${s}` })),

  // ── Accessories / Belts ──
  { label: '── Accessories / Belts / Watches ──', value: '__acc__', disabled: true },
  ...SIZE_GROUPS.accessories.map(s => ({ label: s, value: `Acc-${s}` })),

  // ── Caps / Hats ──
  { label: '── Caps / Hats ──', value: '__cap__', disabled: true },
  ...SIZE_GROUPS.caps.map(s => ({ label: s, value: `Cap-${s}` })),

  // ── Gloves / Socks ──
  { label: '── Gloves / Socks ──', value: '__gs__', disabled: true },
  ...SIZE_GROUPS.glovesSocks.map(s => ({ label: s, value: `GS-${s}` })),

  // ── Bedding ──
  { label: '── Mattress / Bedding ──', value: '__bed__', disabled: true },
  ...SIZE_GROUPS.bedding.map(s => ({ label: s, value: `Bed-${s}` })),
];

const ALL_SIZE_OPTIONS = allSizes;

const ALL_COLOR_OPTIONS = [
  // ── Whites & Neutrals ──
  { label: 'White',           value: 'White' },
  { label: 'Off White',       value: 'Off White' },
  { label: 'Cream',           value: 'Cream' },
  { label: 'Ivory',           value: 'Ivory' },
  { label: 'Linen',           value: 'Linen' },
  { label: 'Beige',           value: 'Beige' },
  { label: 'Champagne',       value: 'Champagne' },
  { label: 'Pearl',           value: 'Pearl' },
  { label: 'Snow',            value: 'Snow' },
  { label: 'Vanilla',         value: 'Vanilla' },

  // ── Pinks ──
  { label: 'Baby Pink',       value: 'Baby Pink' },
  { label: 'Blush Pink',      value: 'Blush Pink' },
  { label: 'Pastel Pink',     value: 'Pastel Pink' },
  { label: 'Light Pink',      value: 'Light Pink' },
  { label: 'Rose',            value: 'Rose' },
  { label: 'Rose Gold',       value: 'Rose Gold' },
  { label: 'Hot Pink',        value: 'Hot Pink' },
  { label: 'Deep Pink',       value: 'Deep Pink' },
  { label: 'Neon Pink',       value: 'Neon Pink' },
  { label: 'Magenta',         value: 'Magenta' },
  { label: 'Fuchsia',         value: 'Fuchsia' },
  { label: 'Dusty Rose',      value: 'Dusty Rose' },
  { label: 'Mauve',           value: 'Mauve' },
  { label: 'Blush',           value: 'Blush' },
  { label: 'Flamingo',        value: 'Flamingo' },
  { label: 'Bubblegum',       value: 'Bubblegum' },

  // ── Reds ──
  { label: 'Crimson',         value: 'Crimson' },
  { label: 'Red',             value: 'Red' },
  { label: 'Bright Red',      value: 'Bright Red' },
  { label: 'Scarlet',         value: 'Scarlet' },
  { label: 'Cherry',          value: 'Cherry' },
  { label: 'Tomato',          value: 'Tomato' },
  { label: 'Coral Red',       value: 'Coral Red' },
  { label: 'Maroon',          value: 'Maroon' },
  { label: 'Dark Red',        value: 'Dark Red' },
  { label: 'Wine',            value: 'Wine' },
  { label: 'Burgundy',        value: 'Burgundy' },
  { label: 'Rust',            value: 'Rust' },
  { label: 'Brick Red',       value: 'Brick Red' },
  { label: 'Blood Red',       value: 'Blood Red' },

  // ── Purples ──
  { label: 'Lavender',        value: 'Lavender' },
  { label: 'Lilac',           value: 'Lilac' },
  { label: 'Pastel Purple',   value: 'Pastel Purple' },
  { label: 'Orchid',          value: 'Orchid' },
  { label: 'Amethyst',        value: 'Amethyst' },
  { label: 'Periwinkle',      value: 'Periwinkle' },
  { label: 'Violet',          value: 'Violet' },
  { label: 'Purple',          value: 'Purple' },
  { label: 'Dark Purple',     value: 'Dark Purple' },
  { label: 'Indigo',          value: 'Indigo' },
  { label: 'Dark Plum',       value: 'Dark Plum' },
  { label: 'Plum',            value: 'Plum' },
  { label: 'Grape',           value: 'Grape' },
  { label: 'Eggplant',        value: 'Eggplant' },

  // ── Blues ──
  { label: 'Baby Blue',       value: 'Baby Blue' },
  { label: 'Powder Blue',     value: 'Powder Blue' },
  { label: 'Pastel Blue',     value: 'Pastel Blue' },
  { label: 'Sky Blue',        value: 'Sky Blue' },
  { label: 'Light Blue',      value: 'Light Blue' },
  { label: 'Cornflower Blue', value: 'Cornflower Blue' },
  { label: 'Dodger Blue',     value: 'Dodger Blue' },
  { label: 'Denim',           value: 'Denim' },
  { label: 'Steel Blue',      value: 'Steel Blue' },
  { label: 'Royal Blue',      value: 'Royal Blue' },
  { label: 'Cobalt',          value: 'Cobalt' },
  { label: 'Sapphire',        value: 'Sapphire' },
  { label: 'Dark Blue',       value: 'Dark Blue' },
  { label: 'Navy',            value: 'Navy' },
  { label: 'Midnight Blue',   value: 'Midnight Blue' },
  { label: 'Ice Blue',        value: 'Ice Blue' },

  // ── Greens ──
  { label: 'Mint',            value: 'Mint' },
  { label: 'Mint Green',      value: 'Mint Green' },
  { label: 'Pastel Green',    value: 'Pastel Green' },
  { label: 'Light Green',     value: 'Light Green' },
  { label: 'Lime Green',      value: 'Lime Green' },
  { label: 'Apple Green',     value: 'Apple Green' },
  { label: 'Neon Green',      value: 'Neon Green' },
  { label: 'Sage',            value: 'Sage' },
  { label: 'Pistachio',       value: 'Pistachio' },
  { label: 'Sea Green',       value: 'Sea Green' },
  { label: 'Emerald',         value: 'Emerald' },
  { label: 'Jade',            value: 'Jade' },
  { label: 'Forest Green',    value: 'Forest Green' },
  { label: 'Dark Green',      value: 'Dark Green' },
  { label: 'Olive',           value: 'Olive' },
  { label: 'Olive Green',     value: 'Olive Green' },
  { label: 'Bottle Green',    value: 'Bottle Green' },
  { label: 'Hunter Green',    value: 'Hunter Green' },
  { label: 'Moss Green',      value: 'Moss Green' },
  { label: 'Khaki Green',     value: 'Khaki Green' },

  // ── Yellows ──
  { label: 'Light Yellow',    value: 'Light Yellow' },
  { label: 'Pastel Yellow',   value: 'Pastel Yellow' },
  { label: 'Yellow',          value: 'Yellow' },
  { label: 'Lemon',           value: 'Lemon' },
  { label: 'Neon Yellow',     value: 'Neon Yellow' },
  { label: 'Mustard',         value: 'Mustard' },
  { label: 'Gold',            value: 'Gold' },
  { label: 'Amber',           value: 'Amber' },
  { label: 'Honey',           value: 'Honey' },
  { label: 'Saffron',         value: 'Saffron' },

  // ── Oranges ──
  { label: 'Peach',           value: 'Peach' },
  { label: 'Apricot',         value: 'Apricot' },
  { label: 'Light Orange',    value: 'Light Orange' },
  { label: 'Orange',          value: 'Orange' },
  { label: 'Dark Orange',     value: 'Dark Orange' },
  { label: 'Coral',           value: 'Coral' },
  { label: 'Salmon',          value: 'Salmon' },
  { label: 'Burnt Orange',    value: 'Burnt Orange' },
  { label: 'Terracotta',      value: 'Terracotta' },
  { label: 'Pumpkin',         value: 'Pumpkin' },
  { label: 'Mango',           value: 'Mango' },

  // ── Browns & Nudes ──
  { label: 'Nude',            value: 'Nude' },
  { label: 'Skin',            value: 'Skin' },
  { label: 'Sand',            value: 'Sand' },
  { label: 'Tan',             value: 'Tan' },
  { label: 'Camel',           value: 'Camel' },
  { label: 'Khaki',           value: 'Khaki' },
  { label: 'Wheat',           value: 'Wheat' },
  { label: 'Bronze',          value: 'Bronze' },
  { label: 'Copper',          value: 'Copper' },
  { label: 'Brown',           value: 'Brown' },
  { label: 'Light Brown',     value: 'Light Brown' },
  { label: 'Dark Brown',      value: 'Dark Brown' },
  { label: 'Chocolate',       value: 'Chocolate' },
  { label: 'Mocha',           value: 'Mocha' },
  { label: 'Coffee',          value: 'Coffee' },
  { label: 'Chestnut',        value: 'Chestnut' },
  { label: 'Walnut',          value: 'Walnut' },
  { label: 'Toffee',          value: 'Toffee' },

  // ── Teals & Cyans ──
  { label: 'Pale Turquoise',  value: 'Pale Turquoise' },
  { label: 'Turquoise',       value: 'Turquoise' },
  { label: 'Aqua',            value: 'Aqua' },
  { label: 'Cyan',            value: 'Cyan' },
  { label: 'Teal',            value: 'Teal' },
  { label: 'Dark Teal',       value: 'Dark Teal' },
  { label: 'Sea Foam',        value: 'Sea Foam' },
  { label: 'Aquamarine',      value: 'Aquamarine' },
  { label: 'Peacock Blue',    value: 'Peacock Blue' },

  // ── Grays ──
  { label: 'White Smoke',     value: 'White Smoke' },
  { label: 'Light Gray',      value: 'Light Gray' },
  { label: 'Silver',          value: 'Silver' },
  { label: 'Gray',            value: 'Gray' },
  { label: 'Dark Gray',       value: 'Dark Gray' },
  { label: 'Slate',           value: 'Slate' },
  { label: 'Charcoal',        value: 'Charcoal' },
  { label: 'Ash',             value: 'Ash' },
  { label: 'Steel Gray',      value: 'Steel Gray' },
  { label: 'Gunmetal',        value: 'Gunmetal' },

  // ── Blacks ──
  { label: 'Off Black',       value: 'Off Black' },
  { label: 'Black',           value: 'Black' },
  { label: 'Jet Black',       value: 'Jet Black' },

  // ── Metallics / Special ──
  { label: 'Metallic Gold',   value: 'Metallic Gold' },
  { label: 'Metallic Silver', value: 'Metallic Silver' },
  { label: 'Metallic Rose',   value: 'Metallic Rose' },
  { label: 'Metallic Blue',   value: 'Metallic Blue' },
  { label: 'Glitter',         value: 'Glitter' },
  { label: 'Holographic',     value: 'Holographic' },
  { label: 'Multi Color',     value: 'Multi Color' },
  { label: 'Printed',         value: 'Printed' },
  { label: 'Tie Dye',         value: 'Tie Dye' },
  { label: 'Ombre',           value: 'Ombre' },
  { label: 'Striped',         value: 'Striped' },
  { label: 'Checkered',       value: 'Checkered' },
  { label: 'Floral',          value: 'Floral' },
];



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  isSubmitting = false;
  categories: CategoryResponseDto[] = [];
  selectedFile: File | null = null;
  previewUrl: string | null = null;

    // ✅ Class properties — file-level constants ko reference kar rahe hain
  sizeOptions  = ALL_SIZE_OPTIONS;
  colorOptions = ALL_COLOR_OPTIONS;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private message: NzMessageService
  ) {
    this.productForm = this.fb.group({
      name:        ['', Validators.required],
      description: [''],
      price:       [null, Validators.required],
      categoryId:  [null],
      stockQty:    [null, Validators.required],
      sku:         [''],
      brand:       [''],
      sizes:       [[]],
      colors:      [[]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.categoryService.getAllCategoriesByTenant(user.tenantId).subscribe({
      next: (res) => {
        if (res.success && res.data) this.categories = res.data.items;
      },
      error: () => this.message.error('Failed to load categories.')
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      Object.values(this.productForm.controls).forEach(c => {
        c.markAsDirty();
        c.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    const v = this.productForm.value;
    console.log('SIZES:', v.sizes);
    console.log('COLORS:', v.colors);

    this.isSubmitting = true;
    const user = JSON.parse(localStorage.getItem('user')!);
    const formData = new FormData();

    formData.append('tenantId',    user.tenantId);
    formData.append('name',        v.name);
    formData.append('description', v.description || '');
    formData.append('price',       v.price);
    formData.append('stockQty',    v.stockQty);

    if (v.categoryId)    formData.append('categoryId', v.categoryId);
    if (v.sku?.trim())   formData.append('sku',         v.sku.trim());
    if (v.brand?.trim()) formData.append('brand',       v.brand.trim());

    // ✅ Form se directly sizes/colors
    if (v.sizes?.length > 0)
      v.sizes.forEach((s: string) => formData.append('sizes', s));

    if (v.colors?.length > 0)
      v.colors.forEach((c: string) => formData.append('colors', c));

    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.message.success('Product created successfully');
          this.productForm.reset({ sizes: [], colors: [] });
          this.selectedFile = null;
          this.previewUrl   = null;
        } else {
          this.message.error(res.message || 'Failed to create product');
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.message.error('Server error occurred.');
      }
    });
  }
}