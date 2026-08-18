const products = [
  // 💻 اللابتوبات
  {
    id: 1,
    name: "Lenovo IdeaPad 3",
    desc: "Intel Core i5 | RAM 8GB | SSD 256GB",
    price: 450,
    icon: "💻",
    cat: "laptop"
  },
  {
    id: 2,
    name: "HP Pavilion 15",
    desc: "Intel Core i5 | RAM 16GB | SSD 512GB",
    price: 650,
    icon: "💻",
    cat: "laptop"
  },
  {
    id: 3,
    name: "Dell Inspiron 15",
    desc: "Intel Core i7 | RAM 16GB | SSD 512GB",
    price: 780,
    icon: "💻",
    cat: "laptop"
  },
  {
    id: 4,
    name: "ASUS VivoBook 15",
    desc: "Intel Core i5 | RAM 8GB | SSD 512GB",
    price: 590,
    icon: "💻",
    cat: "laptop"
  },

  // 📱 الهواتف
  {
    id: 5,
    name: "iPhone 15",
    desc: "128GB | كاميرا متطورة | شاشة Super Retina",
    price: 799,
    icon: "📱",
    cat: "phone"
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    desc: "256GB | RAM 8GB | كاميرا احترافية",
    price: 749,
    icon: "📱",
    cat: "phone"
  },
  {
    id: 7,
    name: "Google Pixel 8",
    desc: "128GB | كاميرا ذكية | شاشة OLED",
    price: 599,
    icon: "📱",
    cat: "phone"
  },
  {
    id: 8,
    name: "Xiaomi 14",
    desc: "256GB | RAM 12GB | شحن سريع",
    price: 549,
    icon: "📱",
    cat: "phone"
  },

  // 🎧 الصوتيات
  {
    id: 9,
    name: "AirPods Pro 2",
    desc: "إلغاء ضوضاء نشط | شحن لاسلكي",
    price: 249,
    icon: "🎧",
    cat: "audio"
  },
  {
    id: 10,
    name: "Sony WH-1000XM5",
    desc: "سماعة لاسلكية | عزل ضوضاء متقدم",
    price: 399,
    icon: "🎧",
    cat: "audio"
  },
  {
    id: 11,
    name: "JBL Tune 770NC",
    desc: "صوت عالي الجودة | بطارية طويلة",
    price: 129,
    icon: "🎧",
    cat: "audio"
  },
  {
    id: 12,
    name: "Anker Soundcore",
    desc: "سماعة بلوتوث | صوت قوي وواضح",
    price: 89,
    icon: "🔊",
    cat: "audio"
  },

  // 🖱️ الملحقات
  {
    id: 13,
    name: "Logitech MX Master 3S",
    desc: "ماوس لاسلكي احترافي | دقة عالية",
    price: 99,
    icon: "🖱️",
    cat: "accessory"
  },
  {
    id: 14,
    name: "Mechanical Gaming Keyboard",
    desc: "لوحة مفاتيح ميكانيكية | إضاءة RGB",
    price: 75,
    icon: "⌨️",
    cat: "accessory"
  },
  {
    id: 15,
    name: "Ultra Monitor 24",
    desc: "شاشة 24 بوصة | Full HD | 75Hz",
    price: 220,
    icon: "🖥️",
    cat: "accessory"
  },
  {
    id: 16,
    name: "USB-C Hub",
    desc: "محول متعدد المنافذ | USB-C | HDMI",
    price: 45,
    icon: "🔌",
    cat: "accessory"
  },

  // ☁️ المنتجات الرقمية
  {
    id: 17,
    name: "Cloud Storage",
    desc: "مساحة تخزين سحابية آمنة",
    price: 30,
    icon: "☁️",
    cat: "digital"
  },
  {
    id: 18,
    name: "Design Software",
    desc: "برنامج تصميم احترافي للمصممين",
    price: 60,
    icon: "🎨",
    cat: "digital"
  },
  {
    id: 19,
    name: "Antivirus Pro",
    desc: "حماية متقدمة للأجهزة والملفات",
    price: 40,
    icon: "🛡️",
    cat: "digital"
  },
  {
    id: 20,
    name: "Office Suite",
    desc: "حزمة برامج مكتبية متكاملة",
    price: 70,
    icon: "📄",
    cat: "digital"
  }
];

let cart = [];

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const overlay = document.getElementById("cartOverlay");

function renderProducts(filter="all"){
  const list = filter==="all" ? products : products.filter(p=>p.cat===filter);
  grid.innerHTML = list.map(p=>`
    <article class="product-card">
     <div class="product-img">
  <img src="images/${p.id}.jpg" alt="${p.name}">
</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="product-bottom">
        <span class="price">$${p.price}</span>
        <button class="add-btn" onclick="addToCart(${p.id})">+ أضف للسلة</button>
      </div>
    </article>`).join("");
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  const found = cart.find(p=>p.id===id);
  if(found) found.qty++;
  else cart.push({...product,qty:1});
  updateCart();
}

function removeFromCart(id){
  cart = cart.filter(p=>p.id!==id);
  updateCart();
}

function updateCart(){
  const count = cart.reduce((sum,p)=>sum+p.qty,0);
  const total = cart.reduce((sum,p)=>sum+p.price*p.qty,0);
  cartCount.textContent = count;
  cartTotal.textContent = `$${total}`;
  cartItems.innerHTML = cart.length ? cart.map(p=>`
    <div class="cart-item">
      <div class="mini">${p.icon}</div>
      <div><strong>${p.name}</strong><small>الكمية: ${p.qty} × $${p.price}</small></div>
      <button class="remove" onclick="removeFromCart(${p.id})">حذف</button>
    </div>`).join("") : `<p style="text-align:center;color:#667085;padding:45px 0">السلة فارغة حاليًا.</p>`;
}

document.querySelectorAll(".category").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

document.getElementById("cartBtn").onclick=()=>overlay.classList.add("open");
document.getElementById("closeCart").onclick=()=>overlay.classList.remove("open");
overlay.addEventListener("click",e=>{if(e.target===overlay) overlay.classList.remove("open")});

document.getElementById("checkoutBtn").onclick=()=>{
  if(!cart.length) return alert("السلة فارغة، أضف منتجًا أولًا.");
  alert("تم تسجيل طلبك بنجاح! هذه نسخة تجريبية للمشروع.");
};

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  alert("تم إرسال رسالتك بنجاح! شكرًا لتواصلك مع DigitaL Store.");
  e.target.reset();
});

renderProducts();
updateCart();
