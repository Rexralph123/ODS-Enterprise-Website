/* ============================================
   O.D.S Enterprise — Shared Data & Cart Logic
   Loaded on every page. Cart persists via localStorage
   so it carries across shop.html, cart.html, form.html etc.
   ============================================ */

/* Only two allowed values for product condition across the whole store. */
const CONDITIONS = ['Brand New', 'UK-Used'];

const PRODUCTS = [
  {
    id:1,
    name:"iPhone 15 ProMax",cat:"phones",condition:'Brand New',price:2099000.0,image:"images/iPhone_15_Pro_Max_Black_Titanium.webp",
    gallery:[
      "images/iPhone_15_Pro_Max_Black_Titanium.webp","images/iPhone_15_Pro_Max_Black_Titanium2.webp","images/iPhone_15_Pro_Max_Black_Titanium3.webp","images/iPhone_15_Pro_Max_Blue_Titanium4.webp"
    ],
    badge:"sale",desc:'6.7" AMOLED 256GB',specs:{Condition:'Brand New',Storage:'256GB',Display:'6.7" AMOLED',Camera:'50MP Triple',Battery:'5000mAh',Warranty:'1 Year'}
  },
  {
    id:2,name:'CYXG Wireless Earbuds',cat:'audio',condition:'Brand New',price:13200,image:'images/Q10 CYXG.JPG',
    badge:'sale', desc:'Two in one, ANC, 10hr battery',
    specs:{Condition:'Brand New','Battery Life':'10 Hours (with case)',Connectivity:'Bluetooth 5.3','Noise Cancellation':'Active (ANC)',Warranty:'6 Months'}
  },
  {
    id:3,name:'SmartWatch Series 8',cat:'wearables',condition:'Brand New',price:35000,image:'images/RW.jpg',
    badge:'new',desc:'Bluetooth Call Health & Multifunction Ultral8 - Black',
    specs:{Condition:'Brand New','Battery Life':'Up to 7 Days',Connectivity:'Bluetooth Call','Water Resistance':'IP67',Warranty:'6 Months'}
  },
  {
    id:4,name:'UltraBook Pro 14"',cat:'laptops',condition:'Brand New',price:420000, image:'images/Dell-Notebook.jpg',
    badge:null,desc:'i7, 16GB RAM, 512GB SSD',
    specs:{Condition:'Brand New',Processor:'Intel Core i7',RAM:'16GB',Storage:'512GB SSD',Warranty:'1 Year'}
  },
  {
    id:5,name:'Galaxy S24 Ultra',cat:'phones',condition:'Brand New',price:1230000,image:'images/SSP.webp',
    badge:'new',desc:'200MP camera, S Pen',
    specs:{Condition:'Brand New',Storage:'256GB',Display:'6.8" Dynamic AMOLED',Camera:'200MP Quad + S Pen',Battery:'5000mAh',Warranty:'1 Year'}
  },
  {
    id:6,name:'PowerBank 20000mAh',cat:'accessories',condition:'Brand New',price:18000,image:'images/ItelPB.webp',
    badge:null,desc:'65W fast charge',
    specs:{Condition:'Brand New',Capacity:'20000mAh',Output:'65W Fast Charge',Ports:'USB-C, USB-A',Warranty:'6 Months'}
  },
  {
    id:7,name:'Noise-Cancel Headphones',cat:'audio',condition:'Brand New',price:40500,image:'images/HPE.jpg',
    badge:null,desc:'Studio-quality sound',
    specs:{Condition:'Brand New','Battery Life':'20 Hours',Connectivity:'Bluetooth 5.0','Noise Cancellation':'Active (ANC)',Warranty:'6 Months'}
  },
  {
    id:8,name:'USB-C Hub 7-in-1',cat:'accessories',condition:'Brand New',price:14256,image:'images/TYC.jpg',
    badge:'sale',desc:'HDMI, USB 3.0, SD card',
    specs:{Condition:'Brand New',Ports:'HDMI, 2x USB 3.0, SD/TF Card',Output:'100W PD Passthrough',Warranty:'3 Months'}
  },
  {
    id:9,name:'FitBand Pro 5',cat:'wearables',condition:'Brand New',price:35000,image:'images/WWW.webp',
    badge:null,desc:'Sleep & fitness tracker',
    specs:{Condition:'Brand New','Battery Life':'Up to 10 Days',Connectivity:'Bluetooth','Water Resistance':'IP68',Warranty:'6 Months'}
  },
  {
    id:10,name:'Tablet Air 11IPAD 11TH GEN',cat:'accessories',condition:'Brand New',price:585000,image:'images/IPAD 11TH GEN.jpg',
    badge:'new',desc:'M2 chip, 128GB',
    specs:{Condition:'Brand New',Storage:'128GB',Chip:'Apple M2',Display:'10.9" Liquid Retina',Warranty:'1 Year'}
  },
  {
    id:11,name:'Redmi Note 13 Pro',cat:'phones',condition:'Brand New',price:750000,image:'images/s-l1600.webp',
    badge:'sale',desc:'200MP, 5000mAh',
    specs:{Condition:'Brand New',Storage:'256GB',Display:'6.67" AMOLED',Camera:'200MP',Battery:'5000mAh',Warranty:'1 Year'}
  },

  {
    id:12,name:'TWS Gaming Earbuds',cat:'audio',condition:'Brand New',price:28000,
    image:'images/TW b earbuds.jpg',
    /* Removed gallery — it was pointing at unrelated iPhone 11 photos
       and at broken paths ("images/Fan1/.jpg" style). Falls back to
       the single main image, same as most other products. */
    badge:null,desc:'Low latency, RGB',
    specs:{Condition:'Brand New','Battery Life':'24 Hours (with case)',Connectivity:'Bluetooth 5.3, Low Latency Mode',Warranty:'3 Months'}
  },

  {
    id:13,
    name:"iPhone 11", cat:"phones", condition:'UK-Used', price:199000,
    image:"images/iPhone 11_Uk.JPG", 
    gallery:[
      "images/iPhone 11_Uk.jpg",
      "images/iPhone11/back.jpg",
      "images/iPhone11/left.jpg",
      "images/iPhone11/right.jpg"
    ],
    badge:"sale", desc:"UK Used iPhone 11 in excellent condition with no cracks or faults.", 
      specs:{
      Condition:"UK Used",
      Storage:"64GB",
      Battery:"76%",
      SIM:"Physical SIM",
      Display:'6.1" Retina',
      Camera:"12MP Dual",
      Warranty:"7 Days"
    }
  },

  {
    id:14,name:'iPhone 17 Pro Max',cat:'phones',condition:'UK-Used',price:1980000,image:'images/iPhone 17_Pro_Max_Uk.jpg',
    badge:'sale',desc:'UK-Used, physical sim, BH: 100%, 512GB',
    specs:{Condition:'UK Used',Storage:'512GB',Battery:'100%',SIM:'Physical SIM',Display:'6.9" Super Retina XDR',Camera:'48MP Pro Triple',Warranty:'7 Days'}
  },
  {
    id:15,name:'iPhone 16',cat:'phones',condition:'Brand New',price:2540000,image:'images/iPhone_16.webp',
    badge:'new',desc:'physical sim, BH: 100%, 512GB',
    specs:{Condition:'Brand New',Storage:'512GB',Battery:'100%',SIM:'Physical SIM',Display:'6.1" Super Retina XDR',Camera:'48MP Dual',Warranty:'1 Year'}
  },
  {
    id:16,
    name:"iPhone 12",cat:"phones",condition:'Brand New',price:274000,image:"images/iphone-12.jpg",
    gallery:[
      "images/iphone-12.jpg","images/iPhone 12blue.webp","images/iPhone 12_p.webp","images/iPhone 12_red.webp"
    ],
    badge:"New",desc:"physical sim, BH: 100%, 128GB.",specs:{Condition:"Brand New",Storage:"128GB",Battery:"100%",SIM:"Physical SIM",Display:'6.1" Super Retina XDR',Camera:"12MP Dual",Warranty:"1 Year"}
  },
  {
    id:17,
    name:"iPhone 13",cat:"phones",condition:'Brand New',price:550000,image:"images/iPhone-13-Body.webp",
    gallery:[
      "images/iPhone-13.jpg","images/iphone-13c.jpg","images/iphone-13s.jpg","images/iphone 13-ft.jpg"
    ],
    badge:"sale",desc:"physical sim, BH: 100%, 128GB.",specs:{Condition:"Brand New",Storage:"128GB",Battery:"100%",SIM:"Physical SIM",Display:'6.1" Super Retina XDR',Camera:"12MP Dual",Warranty:"1 Year"}
  },
  {
    id:18,name:'iPhone 14',cat:'phones',condition:'UK-Used',price:575000,image:'images/iPhone 14_Uk.JPG',
    badge:'sale',desc:'physical sim + eSim, BH: 87%, 128GB',
    specs:{Condition:'UK Used',Storage:'128GB',Battery:'87%',SIM:'Physical SIM + eSIM',Display:'6.1" Super Retina XDR',Camera:'12MP Dual',Warranty:'7 Days'}
  },
  {
    id:19,name:'iPhone 15',cat:'phones',condition:'Brand New',price:850000,image:'images/iPhone 15.png',
    badge:'new',desc:'physical sim, BH:100%,128GB',
    specs:{Condition:'Brand New',Storage:'128GB',Battery:'100%',SIM:'Physical SIM',Display:'6.1" Super Retina XDR',Camera:'48MP Dual',Warranty:'1 Year'}
  },
  {
    id:20,name:'iPhone Air',cat:'phones',condition:'Brand New',price:3850000,image:'images/iPhone Air.png',
    badge:'new',desc:'physical sim, BH: 100%, 512GB',
    specs:{Condition:'Brand New',Storage:'512GB',Battery:'100%',SIM:'Physical SIM',Display:'6.5" Super Retina XDR',Camera:'48MP Dual',Warranty:'1 Year'}
  },
  {
    id:21,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:19000,image:'images/Bag_1.JPG',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:22,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:17000,image:'images/Bag_2.JPG',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:23,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:12900,image:'images/Bag_3.JPG',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:24,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:15400,image:'images/Bag_4.JPG',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:25,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:16700,image:'images/Bag_5.jpg',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:26,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:14000,image:'images/Bag_6.JPG',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:27,name:'Hand Bag',cat:'wearables',condition:'Brand New',price:18000,image:'images/Bag_7.jpg',
    badge:null,desc:'Made in china',
    specs:{Condition:'Brand New',Material:'PU Leather',Origin:'China',Warranty:'7 Days Return'}
  },
  {
    id:28,name:'Lenovo Yoga',cat:'laptops',condition:'Brand New',price:820000,image:'images/Lenovo Yoga Slim.JPG',
    badge:null,desc:'Slim 7, 16GB RAM, 256GB SSD',
    specs:{Condition:'Brand New',Processor:'Intel Core i5',RAM:'16GB',Storage:'256GB SSD',Warranty:'1 Week'}
  },
  {
    id:29,name:'Vacuum Bottle',cat:'accessories',condition:'Brand New',price:8781.52,image:'images/Vacuum Bottle.jpeg',
    badge:'sale',desc:'Vacuum Bottle',
    specs:{Condition:'Brand New',Capacity:'500ml',Material:'Stainless Steel',Warranty:'3 Months'}
  },
  {
    id:30,
    name:"Fan",cat:"accessories",condition:'Brand New',price:9000,image:"images/Fan.JPG",
    /* Removed broken gallery ("images/Fan1/.jpg", "images/Fan/right.jpg" —
       neither file exists; these were leftover placeholders). */
    badge:"sale",desc:"Brand New Fan in excellent condition with no faults.",specs:{Condition:"New",Capacity:"4Hrs",Material:"Plastic",Warranty:"1 Day"}
  },
  {
    id:31,
    name:"Bag",cat:"accessories",condition:'Brand New',price:13531.5,image:"images/Laptop Bag.JPG",
    badge:"sale",desc:"Brand New Bag in excellent condition with no faults.",specs:{Condition:"New",Capacity:"Nil",Material:"Cloth",Warranty:"1 Day"}
  },
  {
    id:32,
    name:"Fan",cat:"accessories",condition:'Brand New',price:9781.5,image:"images/Blow Fan.JPG",
    badge:"sale",desc:"Brand New Fan in excellent condition with no cracks or faults.",specs:{Condition:"New",Capacity:"4Hrs",Material:"Plastic",Warranty:"1 Day"}
  },
  {
    id:33,
    name:"Neck Fan",cat:"accessories",condition:'Brand New',price:7906.5,image:"images/Neck Fan.jpg",
    badge:"sale",desc:"Brand New Neck Fan in excellent condition with no cracks or faults.",specs:{Condition:"New",Capacity:"4Hrs",Material:"Plastic",Warranty:"1 Day"}
  },
  {
    id:34,
    name:"Fan",cat:"accessories",condition:'Brand New',price:43781.5,image:"images/Solar Fan.JPG",
    badge:"sale",desc:"Brand New Fan in excellent condition with no faults.",specs:{Condition:"New",Capacity:"4Hrs",Material:"Plastic",Warranty:"1 Day"}
  },
  {
    id:35,
    name:"Massaging Gun",cat:"accessories",condition:'Brand New',price:9406.5,image:"images/Massaging Gun.JPG",
    badge:"sale",desc:"Brand New Massaging Gun in excellent condition with no faults.",specs:{Condition:"New",Capacity:"4Hrs",Material:"Plastic",Warranty:"1 Day"}
  },
  {
    id:36,
    name:"Brush",cat:"accessories",condition:'Brand New',price:7906.5,image:"images/Brush.JPG",
    badge:"sale",desc:"Brand New Brush in excellent condition with no faults.",specs:{Condition:"New",Capacity:"4Hrs",Material:"Plastic",Warranty:"1 Day"}
  },
  {
    id:37,name:'HP Laptop 15',cat:'laptops',condition:'Brand New',price:528984.17,image:'images/HP Laptop 15-fd0xxx.jpg',
    badge:null,desc:'8GB SDRAM RAM | 256GB SSD Storage | 15.6-inch Full HD (1920 × 1080) IPS Display | Windows 11 | Touchscreen | 1× Thunderbolt USB Type-C Port | 2× USB Ports | HDMI Port | Wi-Fi | Bluetooth | Excellent Battery Life',
    specs:{Condition:'American Used',Processor:'Intel Core i3',RAM:'8GB',Storage:'256GB SSD',Warranty:'1 Week'}
  },
  {
    id:38,name:'HP ProBook 440 G8 Notebook PC',cat:'laptops',condition:'Brand New',price:643984.17,image:'images/HP ProBook 440 G8 Notebook PC.jpg',
    badge:null,desc:'11th Gen Intel® Core™ i7-1165G7 Processor (2.80GHz, Turbo Boost Technology) | 16GB DDR4 SDRAM RAM | 512GB SSD Storage | Windows 11 | 14.0-inch Full HD (1920 × 1080) Display | Backlit Keyboard | Fingerprint Reader | USB Type-C Port | Wi-Fi | Bluetooth | 3 × USB 4.0 Ports | HDMI Port | Headphone/Microphone Combo Jack | Excellent Battery Life',
    specs:{Condition:'American Used',Processor:'Intel Core i7',RAM:'16GB',Storage:'512GB SSD',Warranty:'1 Week'}
  },
  {
    id:39,name:'HP 250 G9 Notebook',cat:'laptops',condition:'Brand New',price:494484.17,image:'images/HP 250 G9 Notebook.jpg',
    badge:null,desc:'HP 250 G9 Notebook | 12th Gen Intel® Core™ i5-1235U Processor (1.30GHz, Turbo Boost Technology) | 16GB DDR4 SDRAM RAM (Upgradeable to 32GB) | 256GB SSD (Upgradeable to 1TB) | Intel® Iris® Plus Graphics | Windows 11 | 15.6-inch Full HD (1920 × 1080) Display | Backlit Keyboard | Wi-Fi | Bluetooth | 2 × USB 4.0 Ports | HDMI Port | Headphone/Microphone Combo Jack | Excellent Battery Life.',
    specs:{Condition:'American Used',Processor:'Intel Core i5',RAM:'16GB',Storage:'256GB SSD',Warranty:'1 Week'}
  },
  {
    id:40,name:'Apple MacBook Pro (2018)',cat:'laptops',condition:'Brand New',price:885000.00,image:'images/Apple MacBook Pro (2018).jpg',
    badge:null,desc:'15-inch | Intel® Core™ i9 Processor | 16GB RAM | 1TB SSD Storage | 4GB Dedicated Graphics | Retina Display | Touch Bar | Touch ID Fingerprint Sensor | macOS | Wi-Fi | Bluetooth | Backlit Magic Keyboard | Force Touch Trackpad | Thunderbolt 3 (USB-C) Ports | Comes with Original Charger',
    specs:{Condition:'American Used',Processor:'Intel Core i9',RAM:'16GB',Storage:'1TB SSD',Warranty:'1 Week'}
  },
  {
    id:41,name:'Sony PlayStation 5',cat:'accessories',condition:'Brand New',price:978984.86,image:'images/Ps5 Slim.jpg',
    badge:'new',desc:'PS5 Console | Ultra-High-Speed Custom SSD | AMD Zen 2 8-Core Processor | AMD RDNA 2 Graphics (Ray Tracing Support) | 4K Gaming up to 120Hz | 8K Output Support | HDR Technology | Tempest 3D AudioTech | Wi-Fi | Bluetooth 5.1 | Gigabit Ethernet | HDMI 2.1 | USB Type-C | USB Type-A Ports | Includes 2 DualSense Wireless Controllers (White & Pink) | Excellent Condition',
    specs:{Condition:'Excellent',Storage:'Custom Ultra-High-Speed SSD',Processor:'AMD Zen 2 8-Core',Connectivity:'Wi-Fi, Bluetooth 5.1, Gigabit Ethernet',Ports:'HDMI 2.1, USB-C, USB-A',Controllers:'2 DualSense Wireless Controllers (White & Pink)'}
  },

];

const ORDERS = [
  {id:'ODS-2024-48291',date:'Jun 12, 2026',status:'Delivered',items:'Galaxy S24 Ultra, USB-C Hub',total:237000},
  {id:'ODS-2024-37104',date:'May 28, 2026',status:'Delivered',items:'BudPro Wireless Earbuds × 2',total:90000},
  {id:'ODS-2024-29874',date:'May 5, 2026',status:'Delivered',items:'SmartWatch Series 8',total:98000},
];

/* ---------- Cart persistence (localStorage) ---------- */
function getCart(){
  try{ return JSON.parse(localStorage.getItem('ods_cart')) || {}; }
  catch(e){ return {}; }
}
function saveCart(cart){
  localStorage.setItem('ods_cart', JSON.stringify(cart));
  updateCartBadge();
}
function fmt(n){ return '₦'+n.toLocaleString(); }

function addToCart(id){
  const cart = getCart();
  cart[id] = (cart[id]||0)+1;
  saveCart(cart);
  showToast('Added to cart');
}

/* Buy Now: add the item to the cart so it's included in the order, then
   send the shopper straight to the order/checkout form instead of just
   opening the cart drawer. The product id is passed along as a query
   param so form.html can preselect / highlight it if it wants to. */
function buyNow(id){
  addToCart(id);
  window.location.href = 'form.html?product=' + encodeURIComponent(id);
}


function changeQty(id, delta){
  const cart = getCart();
  cart[id] = (cart[id]||0)+delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart(cart);
  if(typeof renderCart === 'function') renderCart();
}

function removeItem(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  if(typeof renderCart === 'function') renderCart();
}

function updateCartBadge(){
  const cart = getCart();
  const total = Object.values(cart).reduce((a,b)=>a+b,0);
  document.querySelectorAll('#cart-count').forEach(el=> el.textContent = total );
}

function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2000);
}

/* ---------- Nav active state ---------- */
function setActiveNav(page){
  document.querySelectorAll('.nav-btn').forEach(b=>{
    if(b.dataset.page === page) b.classList.add('active');
    else b.classList.remove('active');
  });
}

/* Run on every page load */
document.addEventListener('DOMContentLoaded', updateCartBadge);