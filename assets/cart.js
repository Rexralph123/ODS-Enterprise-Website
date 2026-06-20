/* ============================================
   O.D.S Enterprise — Shared Data & Cart Logic
   Loaded on every page. Cart persists via localStorage
   so it carries across shop.html, cart.html, checkout.html etc.
   ============================================ */

const PRODUCTS = [
  {id:1,name:'ProMax X15 Smartphone',cat:'phones',price:189000,emoji:'📱',badge:'new',desc:'6.7" AMOLED, 256GB'},
  {id:2,name:'BudPro Wireless Earbuds',cat:'audio',price:45000,emoji:'🎧',badge:'sale',desc:'ANC, 30hr battery'},
  {id:3,name:'SmartWatch Series 8',cat:'wearables',price:98000,emoji:'⌚',badge:'new',desc:'Health tracking, GPS'},
  {id:4,name:'UltraBook Pro 14"',cat:'laptops',price:420000,emoji:'💻',badge:null,desc:'i7, 16GB RAM, 512GB SSD'},
  {id:5,name:'Galaxy S24 Ultra',cat:'phones',price:215000,emoji:'📲',badge:'new',desc:'200MP camera, S Pen'},
  {id:6,name:'PowerBank 20000mAh',cat:'accessories',price:18000,emoji:'🔋',badge:null,desc:'65W fast charge'},
  {id:7,name:'Noise-Cancel Headphones',cat:'audio',price:72000,emoji:'🎵',badge:null,desc:'Studio-quality sound'},
  {id:8,name:'USB-C Hub 7-in-1',cat:'accessories',price:22000,emoji:'🔌',badge:'sale',desc:'HDMI, USB 3.0, SD card'},
  {id:9,name:'FitBand Pro 5',cat:'wearables',price:35000,emoji:'🏃',badge:null,desc:'Sleep & fitness tracker'},
  {id:10,name:'Tablet Air 11"',cat:'accessories',price:185000,emoji:'📟',badge:'new',desc:'M2 chip, 128GB'},
  {id:11,name:'Redmi Note 13 Pro',cat:'phones',price:125000,emoji:'📱',badge:'sale',desc:'200MP, 5000mAh'},
  {id:12,name:'TWS Gaming Earbuds',cat:'audio',price:28000,emoji:'🎮',badge:null,desc:'Low latency, RGB'},
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
