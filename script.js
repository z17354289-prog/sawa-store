const products = [
  // 💻 اللابتوبات
  {
    id: 1,
    name: "Lenovo IdeaPad 3",
    desc: "Intel Core i5 | RAM 8GB | SSD 256GB",
    price: 1499,
    icon: "💻",
    cat: "laptop"
  },
  {
    id: 2,
    name: "HP Pavilion 15",
    desc: "Intel Core i5 | RAM 16GB | SSD 512GB",
    price: 1899,   
    icon: "💻",
    cat: "laptop"
  },
  {
    id: 3,
    name: "Dell Inspiron 15",
    desc: "Intel Core i7 | RAM 16GB | SSD 512GB",
    price: 2299,
    icon: "💻",
    cat: "laptop"
  },
  {
    id: 4,
    name: "ASUS VivoBook 15",
    desc: "Intel Core i5 | RAM 8GB | SSD 512GB",
    price: 1999,
    icon: "💻",
    cat: "laptop"
  },

  // 📱 الهواتف
  {
    id: 5,
    name: "iPhone 15",
    desc: "128GB | كاميرا متطورة | شاشة Super Retina",
    price: 1899,
    icon: "📱",
    cat: "phone"
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    desc: "256GB | RAM 8GB | كاميرا احترافية",
    price: 2199,
    icon: "📱",
    cat: "phone"
  },
  {
    id: 7,
    name: "Google Pixel 8",
    desc: "128GB | كاميرا ذكية | شاشة OLED",
    price: 1499,
    icon: "📱",
    cat: "phone"
  },
  {
    id: 8,
    name: "Xiaomi 14",
    desc: "256GB | RAM 12GB | شحن سريع",
    price: 1899,
    icon: "📱",
    cat: "phone"
  },

  // 🎧 الصوتيات
  {
    id: 9,
    name: "AirPods Pro 2",
    desc: "إلغاء ضوضاء نشط | شحن لاسلكي",
    price: 699,
    icon: "🎧",
    cat: "audio"
  },
  {
    id: 10,
    name: "Sony WH-1000XM5",
    desc: "سماعة لاسلكية | عزل ضوضاء متقدم",
    price: 999,
    icon: "🎧",
    cat: "audio"
  },
  {
    id: 11,
    name: "JBL Tune 770NC",
    desc: "صوت عالي الجودة | بطارية طويلة",
    price: 399,
    icon: "🎧",
    cat: "audio"
  },
  {
    id: 12,
    name: "Anker Soundcore",
    desc: "سماعة بلوتوث | صوت قوي وواضح",
    price: 299,
    icon: "🔊",
    cat: "audio"
  },

  // 🖱️ الملحقات
  {
    id: 13,
    name: "Logitech MX Master 3S",
    desc: "ماوس لاسلكي احترافي | دقة عالية",
    price: 399,
    icon: "🖱️",
    cat: "accessory"
  },
  {
    id: 14,
    name: "Mechanical Gaming Keyboard",
    desc: "لوحة مفاتيح ميكانيكية | إضاءة RGB",
    price: 249,
    icon: "⌨️",
    cat: "accessory"
  },
  {
    id: 15,
    name: "Ultra Monitor 24",
    desc: "شاشة 24 بوصة | Full HD | 75Hz",
    price: 499,
    icon: "🖥️",
    cat: "accessory"
  },
  {
    id: 16,
    name: "USB-C Hub",
    desc: "محول متعدد المنافذ | USB-C | HDMI",
    price: 129,
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
    price: 50,
    icon: "🎨",
    cat: "digital"
  },
  {
    id: 19,
    name: "Antivirus Pro",
    desc: "حماية متقدمة للأجهزة والملفات",
    price: 35,
    icon: "🛡️",
    cat: "digital"
  },
  {
    id: 20,
    name: "Office Suite",
    desc: "حزمة برامج مكتبية متكاملة",
    price: 60,
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

// ===== سعر الصرف: الريال السعودي مقابل الريال اليمني (405) =====
const SAR_TO_YER = 405;

function priceDisplay(sar) {
  const yer = Math.round(sar * SAR_TO_YER);

  return `
    <div style="display:flex;flex-direction:column;gap:3px;">
      <strong style="font-size:18px;color:#1e3a8a;">
        SAR ${sar.toLocaleString()}
      </strong>
      <small style="font-size:12px;color:#667085;">
        ≈ YER ${yer.toLocaleString()}
      </small>
    </div>
  `;
}

function renderProducts(filter="all"){
  const list = filter==="all"
    ? products
    : products.filter(p=>p.cat===filter);

  if(!grid) return;

  grid.innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-img">
        <img src="images/${p.id}.jpg" alt="${p.name}">
      </div>

      <h3>${p.name}</h3>
      <p>${p.desc}</p>

      <div class="product-bottom">
        <span class="price">
          ${priceDisplay(p.price)}
        </span>

        <button class="add-btn" onclick="addToCart(${p.id})">
          + أضف للسلة
        </button>
      </div>
    </article>
  `).join("");
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
  if(!cartCount || !cartItems || !cartTotal) return;

  const count = cart.reduce((sum,p)=>sum+p.qty,0);
  const total = cart.reduce((sum,p)=>sum+p.price*p.qty,0);

  cartCount.textContent = count;

  const totalYER = Math.round(total * SAR_TO_YER);

  cartTotal.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:3px;">
      <strong>SAR ${total.toLocaleString()}</strong>
      <small style="font-size:12px;color:#667085;">
        ≈ YER ${totalYER.toLocaleString()}
      </small>
    </div>
  `;

  cartItems.innerHTML = cart.length
    ? cart.map(p=>{
        const yer = Math.round(p.price * SAR_TO_YER);

        return `
          <div class="cart-item">
            <div class="mini">${p.icon}</div>

            <div>
              <strong>${p.name}</strong>

              <small>
                الكمية: ${p.qty} × SAR ${p.price.toLocaleString()}
                <br>
                ≈ YER ${yer.toLocaleString()}
              </small>
            </div>

            <button class="remove" onclick="removeFromCart(${p.id})">
              حذف
            </button>
          </div>
        `;
      }).join("")
    : `<p style="text-align:center;color:#667085;padding:45px 0">
         السلة فارغة حاليًا.
       </p>`;
}

document.querySelectorAll(".category").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

const cartBtnEl = document.getElementById("cartBtn");
const closeCartEl = document.getElementById("closeCart");
if(cartBtnEl && overlay) cartBtnEl.onclick=()=>overlay.classList.add("open");
if(closeCartEl && overlay) closeCartEl.onclick=()=>overlay.classList.remove("open");
if(overlay) overlay.addEventListener("click",e=>{if(e.target===overlay) overlay.classList.remove("open")});

const checkoutBtnEl = document.getElementById("checkoutBtn");
const closeCheckoutEl = document.getElementById("closeCheckout");
const checkoutModalEl = document.getElementById("checkoutModal");

if(checkoutBtnEl && checkoutModalEl && overlay){
  checkoutBtnEl.onclick=()=>{
    if(!cart.length) return alert("السلة فارغة، أضف منتجاً أولاً.");
    overlay.classList.remove("open");
    checkoutModalEl.style.display="flex";
  };
}
if(closeCheckoutEl && checkoutModalEl){
  closeCheckoutEl.onclick=()=>{
    checkoutModalEl.style.display="none";
  };
}

const checkoutFormEl = document.getElementById("checkoutForm");
if(checkoutFormEl){
  checkoutFormEl.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(!cart.length){
      alert("السلة فارغة، أضف منتجاً أولاً.");
      return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const note = document.getElementById("customerNote").value.trim();

    const totalSAR = cart.reduce((sum,p)=>sum + p.price * p.qty, 0);
    const totalYER = Math.round(totalSAR * SAR_TO_YER);

    const order = {
      id: "TZ-" + Date.now(),
      date: new Date().toLocaleString("ar-YE"),
      name,
      phone,
      address,
      note,
      items: cart.map(p=>({
        id:p.id,
        name:p.name,
        qty:p.qty,
        priceSAR:p.price,
        priceYER: Math.round(p.price * SAR_TO_YER),
        totalSAR:p.price*p.qty,
        totalYER:Math.round(p.price*p.qty * SAR_TO_YER)
      })),
      totalSAR,
      totalYER,
      status:"جديد"
    };

    try {
      const localOrders = JSON.parse(localStorage.getItem("tz_orders") || "[]");
      localOrders.unshift(order);
      localStorage.setItem("tz_orders", JSON.stringify(localOrders));
    } catch(e) {}

    fetch("/api/orders", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(order)
    }).catch(()=>{});

    let message = `🛒 *طلب جديد من متجر DigitaL Store*\n\n`;
    message += `👤 *اسم العميل:* ${name}\n`;
    message += `📱 *رقم الهاتف:* ${phone}\n`;
    message += `📍 *العنوان:* ${address}\n`;
    if(note) message += `📝 *ملاحظات:* ${note}\n`;
    message += `\n📦 *تفاصيل الطلب:*\n`;

    cart.forEach((p,index)=>{
      const itemSAR = p.price * p.qty;
      const itemYER = Math.round(itemSAR * SAR_TO_YER);
      message += `${index + 1}. ${p.name}\n`;
      message += `   🔢 الكمية: ${p.qty}\n`;
      message += `   💵 السعر: SAR ${p.price.toLocaleString()} (≈ YER ${(p.price * SAR_TO_YER).toLocaleString()})\n`;
      message += `   💰 الإجمالي: SAR ${itemSAR.toLocaleString()} (≈ YER ${itemYER.toLocaleString()})\n\n`;
    });

    message += `💰 *إجمالي الطلب الكلي:*\n`;
    message += `▪️ SAR ${totalSAR.toLocaleString()}\n`;
    message += `▪️ YER ${totalYER.toLocaleString()}\n\n`;
    message += `🆔 رقم الطلب: ${order.id}`;

    const whatsappNumber = "967782956036";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    alert("✅ تم تسجيل الطلب وفتح واتساب لإرساله.");

    if(checkoutModalEl) checkoutModalEl.style.display="none";
    e.target.reset();
    cart=[];
    updateCart();
  });
}

const contactFormEl = document.getElementById("contactForm");
if(contactFormEl){
  contactFormEl.addEventListener("submit",e=>{
    e.preventDefault();
    const fields = e.target.querySelectorAll("input, textarea");
    const name = fields[0].value.trim();
    const email = fields[1].value.trim();
    const text = fields[2].value.trim();

    const msg = `📩 *رسالة جديدة من موقع DigitaL Store*\n\n👤 الاسم: ${name}\n📧 البريد: ${email}\n📝 الرسالة: ${text}`;
    const url = `https://wa.me/967782956036?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    e.target.reset();
  });
}

renderProducts();
updateCart();
