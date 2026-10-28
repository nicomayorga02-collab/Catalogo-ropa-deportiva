// Listado de Productos basado en el catálogo de Siempre Wow
const products = [
  {
    id: 1,
    title: "Chaqueta Lila",
    category: "chaquetas",
    price: 25.00,
    colors: ["Lila"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Leggins con Faja",
    category: "leggins",
    price: 18.00,
    colors: ["Negro"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Enterizo Azul Marino",
    category: "enterizos",
    price: 28.00,
    colors: ["Azul Marino"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Top + Falda",
    category: "conjuntos",
    price: 22.00,
    colors: ["Fucsia", "Azul Rey", "Rojo"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Enterizo Roma",
    category: "enterizos",
    price: 30.00,
    colors: ["Azul Petróleo", "Negro"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Conjunto Deportivo",
    category: "conjuntos",
    price: 24.00,
    colors: ["Negro"],
    image: "https://images.unsplash.com/photo-1483721074892-4a85d9063664?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "Top + Leggins",
    category: "conjuntos",
    price: 26.00,
    colors: ["Negro", "Azul Rey"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "Leggins Sublimado / 3D / Unicolor",
    category: "leggins",
    price: 15.00,
    colors: ["Azul", "Negro", "Rosado"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    title: "Enterizo Clásico",
    category: "enterizos",
    price: 27.00,
    colors: ["Negro", "Azul Marino"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    title: "Vestido Deportivo",
    category: "vestidos",
    price: 25.00,
    colors: ["Negro"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
  }
];

// Estado global
let selectedProduct = null;
let selectedColor = "";
let selectedSize = "M";
let currentCategory = "todos";

// DOM
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categoryContainer = document.getElementById("categoryContainer");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");
const sizeContainer = document.getElementById("sizeContainer");

// Renderizado de tarjetas
function renderProducts() {
  const query = searchInput.value.toLowerCase();
  
  const filtered = products.filter(item => {
    const matchesCat = currentCategory === "todos" || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(query) || item.colors.some(c => c.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  productsGrid.innerHTML = filtered.map(item => `
    <div class="product-card" onclick="openModal(${item.id})">
      <div class="image-wrapper">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="card-details">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-color-preview">${item.colors.join(" | ")}</p>
        <span class="card-price-badge">$${item.price.toFixed(2)}</span>
      </div>
    </div>
  `).join("");
}

// Abrir Modal de Producto
function openModal(id) {
  selectedProduct = products.find(p => p.id === id);
  if (!selectedProduct) return;

  selectedColor = selectedProduct.colors[0];
  selectedSize = "M";

  document.getElementById("modalImg").src = selectedProduct.image;
  document.getElementById("modalCategory").textContent = selectedProduct.category.toUpperCase();
  document.getElementById("modalTitle").textContent = selectedProduct.title;
  
  // CORREGIDO: comillas invertidas agregadas
  document.getElementById("modalPrice").textContent = `$${selectedProduct.price.toFixed(2)}`;

  // Renderizar opciones de color
  const colorContainer = document.getElementById("colorContainer");
  colorContainer.innerHTML = selectedProduct.colors.map(color => `
    <button class="color-chip ${color === selectedColor ? 'active' : ''}" onclick="selectColor('${color}')">${color}</button>
  `).join("");

  // Restablecer selección de tallas
  const sizeBtns = sizeContainer.querySelectorAll(".size-btn");
  sizeBtns.forEach(btn => {
    btn.classList.toggle("active", btn.textContent === selectedSize);
  });

  productModal.classList.add("active");
  
  // Re-renderizar iconos por si hay elementos dinámicos
  if (window.lucide) lucide.createIcons();
}

function selectColor(color) {
  selectedColor = color;
  const chips = document.querySelectorAll(".color-chip");
  chips.forEach(chip => {
    chip.classList.toggle("active", chip.textContent === color);
  });
}

// Evento para cambio de tallas
sizeContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("size-btn")) {
    sizeContainer.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    selectedSize = e.target.textContent;
  }
});

// Cerrar Modal
closeModalBtn.onclick = () => productModal.classList.remove("active");
productModal.onclick = (e) => {
  if (e.target === productModal) productModal.classList.remove("active");
};

// Filtro por categorías
categoryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("pill")) {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    e.target.classList.add("active");
    currentCategory = e.target.dataset.cat;
    renderProducts();
  }
});

// Buscador dinámico
searchInput.addEventListener("input", renderProducts);

// Redirección a WhatsApp
document.getElementById("wsBtn").onclick = () => {
  if (!selectedProduct) return;
  const phone = "584120000000"; // Reemplazar por número real
  const text = `¡Hola Siempre Wow! 👋 Deseo realizar un pedido:\n\n📌 *Producto:* ${selectedProduct.title}\n🎨 *Color:* ${selectedColor}\n📏 *Talla:* ${selectedSize}\n💰 *Precio:* $${selectedProduct.price.toFixed(2)}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
};

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  if (window.lucide) lucide.createIcons();
});