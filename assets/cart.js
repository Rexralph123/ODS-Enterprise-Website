/* ============================================
   O.D.S Enterprise — Shared Data & Cart Logic
   Loaded on every page. Cart persists via localStorage
   so it carries across shop.html, cart.html, checkout.html etc.
   ============================================ */

const PRODUCTS = [
{id: 1, name: 'ProMax X15 Smartphone', cat: 'phones', price: 189000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', badge: 'new', desc: '6.7" AMOLED, 256GB'}, 
 {id:2,name:'BudPro Wireless Earbuds',cat:'audio',price:45000,image:'images/Q10 CYXG.JPG',badge:'sale',desc:'ANC, 30hr battery'},
  {id:3,name:'SmartWatch Series 8',cat:'wearables',price:98000,emoji:'⌚',badge:'new',desc:'Health tracking, GPS'},
  {id:4,name:'UltraBook Pro 14"',cat:'laptops',price:420000,image: 'images/Lenovo Yoga Slim 7.jpg',badge:null,desc:'i7, 16GB RAM, 512GB SSD'},
  {id:5,name:'Galaxy S24 Ultra',cat:'phones',price:215000,emoji:'📲',badge:'new',desc:'200MP camera, S Pen'},
  {id:6,name:'PowerBank 20000mAh',cat:'accessories',price:18000,emoji:'🔋',badge:null,desc:'65W fast charge'},
  {id:7,name:'Noise-Cancel Headphones',cat:'audio',price:72000,emoji:'🎵',badge:null,desc:'Studio-quality sound'},
  {id:8,name:'USB-C Hub 7-in-1',cat:'accessories',price:22000,emoji:'🔌',badge:'sale',desc:'HDMI, USB 3.0, SD card'},
  {id:9,name:'FitBand Pro 5',cat:'wearables',price:35000,emoji:'🏃',badge:null,desc:'Sleep & fitness tracker'},
  {id:10,name:'Tablet Air 11IPAD 11TH GEN',cat:'accessories',price:185000,image: 'images/IPAD 11TH GEN.jpg',badge:'new',desc:'M2 chip, 128GB'},
  {id:11,name:'Redmi Note 13 Pro',cat:'phones',price:125000,emoji:'📱',badge:'sale',desc:'200MP, 5000mAh'},
  {id:12,name:'TWS Gaming Earbuds',cat:'audio',price:28000,image: 'images/T13 Plus.jpg',badge:null,desc:'Low latency, RGB'},
  {id:13,name:'iPhone 11',cat:'phones',price:199000,image: 'images/iPhone 11_Uk.jpg',badge:'sale',desc:'UK-Used, Battery Health: 76%, 64GB'},
  {id:14,name:'iPhone 17 Pro Max',cat:'phones',price:1980000,image: 'images/iPhone 17_Pro_Max_Uk.jpg',badge:'sale',desc:'UK-Used, physical sim,  BH: 100%, 512GB'},
  {id:15,name:'iPhone 16',cat:'phones',price:2540000,image: 'images/iPhone_16.webp',badge:'new',desc:'physical sim,  BH: 100%, 512GB'},
  {id:16,name:'iPhone 12',cat:'phones',price:274000,image: 'images/iPhone 12blue.webp',badge:'new',desc:'physical sim,  BH: 100%, 128GB'},
  {id:17,name:'iPhone 13',cat:'phones',price:550000,image: 'images/iPhone 13-blue.webp',badge:'new',desc:'physical sim,  BH: 100%, 128GB'},
  {id:18,name:'iPhone 14',cat:'phones',price:575000,image: 'images/iPhone 14_Uk.jpg',badge:'sale',desc:'physical sim + eSim,  BH: 87%, 128GB'},
  {id:19,name:'iPhone 15',cat:'phones',price:850000,image: 'images/iPhone 15.png',badge:'new',badge:'new',desc:'physical sim,  BH: 100%, 128GB'},
  {id:20,name:'iPhone Air',cat:'phones',price:3850000,image: 'images/iPhone Air.png',badge:'new',desc:'physical sim,  BH: 100%, 512GB'},
  {id:21,name:'Hand Bag',cat:'wearables',price:19000,image: 'images/Bag_1.jpg',badge:null,desc:'Made in china'},
  {id:22,name:'Hand Bag',cat:'wearables',price:17000,image: 'images/Bag_2.jpg',badge:null,desc:'Made in china'},
  {id:23,name:'Hand Bag',cat:'wearables',price:12900,image: 'images/Bag_3.jpg',badge:null,desc:'Made in china'},
  {id:24,name:'Hand Bag',cat:'wearables',price:15400,image: 'images/Bag_4.jpg',badge:null,desc:'Made in china'},
  {id:25,name:'Hand Bag',cat:'wearables',price:16700,image: 'images/Bag_5.jpg',badge:null,desc:'Made in china'},
  {id:26,name:'Hand Bag',cat:'wearables',price:14000,image: 'images/Bag_6.jpg',badge:null,desc:'Made in china'},
  {id:27,name:'Hand Bag',cat:'wearables',price:18000,image: 'images/Bag_7.jpg',badge:null,desc:'Made in china'},
  {id:28,name:'Lenovo Yoga',cat:'laptops',price:820000,image: 'images/Lenovo Yoga Slim 7.jpg',badge:null,desc:'Slim 7, 16GB RAM, 256GB SSD'},
  {id:29,name:'Vacuum Bottle',cat:'accessories',price:6000,image: 'images/Vacuum Bottle.jpeg',badge:'sale',desc:'Vacuum Bottle'},

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

function buyNow(id){
  const cart = getCart();
  cart[id] = (cart[id]||0)+1;
  saveCart(cart);
  window.location.href = 'checkout.html';
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
