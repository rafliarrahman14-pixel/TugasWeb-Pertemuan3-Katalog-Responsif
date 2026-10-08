import "./style.css";

/* ================= PRODUCTS ================= */

const products = [
  {
    id: 1,
    brand: "YONEX",
    name: "Astrox 99 PRO",
    image: "/images/astrox-99-pro.jpg",
    category: "Rackets",
    price: 2600000,
    oldPrice: 2900000,
    discount: "-10%",
    badge: "BEST SELLER",
    rating: "4.9",
    reviews: 124
  },

  {
    id: 2,
    brand: "YONEX",
    name: "Astrox 88 D PRO",
    image: "/images/astrox-88-d-pro.jpg",
    category: "Rackets",
    price: 2400000,
    oldPrice: 2900000,
    discount: "-17%",
    badge: "SALE",
    rating: "4.8",
    reviews: 98
  },

  {
    id: 3,
    brand: "VICTOR",
    name: "Thruster K TK HMR L A",
    image: "/images/thruster-k.jpg",
    category: "Rackets",
    price: 580000,
    oldPrice: 775000,
    discount: "-25%",
    badge: "NEW",
    rating: "4.7",
    reviews: 76
  },

  {
    id: 4,
    brand: "YONEX",
    name: "Nanoray 70 Light",
    image: "/images/nanoray-70-light.jpg",
    category: "Rackets",
    price: 399000,
    oldPrice: 429000,
    discount: "-7%",
    badge: "SALE",
    rating: "4.8",
    reviews: 64
  },

  {
    id: 5,
    brand: "YONEX",
    name: "Astrox 99 Play",
    image: "/images/astrox-99-play.jpg",
    category: "Rackets",
    price: 835000,
    oldPrice: 879000,
    discount: "-5%",
    badge: "SALE",
    rating: "4.7",
    reviews: 58
  },

  {
    id: 6,
    brand: "YONEX",
    name: "Novadrive",
    image: "/images/novadrive.jpg",
    category: "Shoes",
    price: 499000,
    oldPrice: 529000,
    discount: "-6%",
    badge: "SALE",
    rating: "4.8",
    reviews: 112
  },

  {
    id: 7,
    brand: "VICTOR",
    name: "BR2103",
    image: "/images/victor-br2103.jpg",
    category: "Bags",
    price: 328000,
    oldPrice: 410000,
    discount: "-20%",
    badge: "SALE",
    rating: "4.6",
    reviews: 87
  },

  {
    id: 8,
    brand: "YONEX",
    name: "Power Cushion 10",
    image: "/images/power-cushion-10.jpg",
    category: "Shoes",
    price: 560000,
    oldPrice: 699000,
    discount: "-20%",
    badge: "SALE",
    rating: "4.7",
    reviews: 91
  }
];


/* ================= ELEMENTS ================= */

const productGrid = document.querySelector("#productGrid");
const noResult = document.querySelector("#noResult");

const searchInput = document.querySelector("#searchInput");
const mobileSearchInput =
  document.querySelector("#mobileSearchInput");

const sortSelect =
  document.querySelector("#sortSelect");

const filterButtons =
  document.querySelectorAll(".filter-btn");

const categoryButtons =
  document.querySelectorAll(".category-card");

const navbar =
  document.querySelector("#navbar");

const menuToggle =
  document.querySelector("#menuToggle");

const mobileNav =
  document.querySelector("#mobileNav");

const modal =
  document.querySelector("#productModal");

const modalClose =
  document.querySelector("#modalClose");

const modalImage =
  document.querySelector("#modalImage");

const modalBrand =
  document.querySelector("#modalBrand");

const modalName =
  document.querySelector("#modalName");

const modalRating =
  document.querySelector("#modalRating");

const modalPrice =
  document.querySelector("#modalPrice");

const modalCart =
  document.querySelector("#modalCart");

const cartCount =
  document.querySelector("#cartCount");

const mobileCartCount =
  document.querySelector("#mobileCartCount");

const toast =
  document.querySelector("#toast");

const toastMessage =
  document.querySelector("#toastMessage");


/* ================= STATE ================= */

let activeCategory = "All";
let searchKeyword = "";
let cart = 0;
let selectedProduct = null;


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}


/* ================= RENDER PRODUCTS ================= */

function renderProducts() {

  let filteredProducts = [...products];

  /* FILTER CATEGORY */

  if (activeCategory !== "All") {
    filteredProducts =
      filteredProducts.filter(
        product =>
          product.category === activeCategory
      );
  }

  /* SEARCH */

  if (searchKeyword.trim() !== "") {

    const keyword =
      searchKeyword.toLowerCase();

    filteredProducts =
      filteredProducts.filter(product =>

        product.name
          .toLowerCase()
          .includes(keyword)

        ||

        product.brand
          .toLowerCase()
          .includes(keyword)

        ||

        product.category
          .toLowerCase()
          .includes(keyword)

      );
  }

  /* SORT */

  if (sortSelect.value === "low") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sortSelect.value === "high") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  productGrid.innerHTML = "";


  if (filteredProducts.length === 0) {

    noResult.style.display = "block";

    return;

  }


  noResult.style.display = "none";


  filteredProducts.forEach(product => {

    const card =
      document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />

        <span class="product-badge ${
          product.badge === "SALE"
            ? "sale"
            : product.badge === "NEW"
              ? "new"
              : ""
        }">
          ${product.badge}
        </span>

        <button
          class="wishlist"
          data-wishlist="${product.id}"
          aria-label="Tambah wishlist"
        >
          ♡
        </button>

      </div>


      <div class="product-info">

        <span class="product-brand">
          ${product.brand}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="rating">

          <span class="rating-star">
            ★
          </span>

          <span>
            ${product.rating} (${product.reviews})
          </span>

        </div>


        <div class="price-row">

          ${
            product.oldPrice
              ? `
                <span class="old-price">
                  ${formatPrice(product.oldPrice)}
                </span>
              `
              : ""
          }

          <span class="price">
            ${formatPrice(product.price)}
          </span>

          ${
            product.discount
              ? `
                <span class="discount">
                  ${product.discount}
                </span>
              `
              : ""
          }

        </div>


        <button
          class="view-button"
          data-product="${product.id}"
        >
          View Product →
        </button>

      </div>
    `;


    productGrid.appendChild(card);

  });

}


/* ================= FILTER ================= */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    activeCategory =
      button.dataset.filter;

    renderProducts();

  });

});


/* ================= CATEGORY ================= */

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    const category =
      button.dataset.category;

    const filterButton =
      document.querySelector(
        `[data-filter="${category}"]`
      );

    if (filterButton) {

      filterButton.click();

      document
        .querySelector("#products")
        .scrollIntoView({
          behavior: "smooth"
        });

    } else {

      showToast(
        `${category} akan segera hadir.`
      );

    }

  });

});


/* ================= SEARCH ================= */

function handleSearch(value) {

  searchKeyword = value;

  renderProducts();

}


searchInput.addEventListener(
  "input",
  event => {
    handleSearch(event.target.value);
  }
);


mobileSearchInput.addEventListener(
  "input",
  event => {
    handleSearch(event.target.value);
  }
);


/* ================= SORT ================= */

sortSelect.addEventListener(
  "change",
  renderProducts
);


/* ================= PRODUCT MODAL ================= */

productGrid.addEventListener(
  "click",
  event => {

    const productButton =
      event.target.closest(
        "[data-product]"
      );

    const wishlistButton =
      event.target.closest(
        "[data-wishlist]"
      );


    /* WISHLIST */

    if (wishlistButton) {

      wishlistButton.classList.toggle(
        "active"
      );

      wishlistButton.textContent =
        wishlistButton.classList.contains(
          "active"
        )
          ? "♥"
          : "♡";

      showToast(
        wishlistButton.classList.contains(
          "active"
        )
          ? "Ditambahkan ke wishlist."
          : "Dihapus dari wishlist."
      );

      return;
    }


    /* PRODUCT MODAL */

    if (!productButton) return;

    const productId =
      Number(
        productButton.dataset.product
      );

    selectedProduct =
      products.find(
        product =>
          product.id === productId
      );

    if (!selectedProduct) return;


    modalImage.src =
      selectedProduct.image;

    modalImage.alt =
      selectedProduct.name;

    modalBrand.textContent =
      selectedProduct.brand;

    modalName.textContent =
      selectedProduct.name;

    modalRating.textContent =
      `★ ${selectedProduct.rating} (${selectedProduct.reviews} reviews)`;

    modalPrice.textContent =
      formatPrice(
        selectedProduct.price
      );


    modal.classList.add("show");

    document.body.style.overflow =
      "hidden";

  }
);


/* ================= CLOSE MODAL ================= */

function closeModal() {

  modal.classList.remove("show");

  document.body.style.overflow =
    "";

}


modalClose.addEventListener(
  "click",
  closeModal
);


modal.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {
      closeModal();
    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {
      closeModal();
    }

  }
);


/* ================= CART ================= */

function updateCart() {

  cartCount.textContent =
    cart;

  mobileCartCount.textContent =
    cart;

}


function addToCart(product) {

  cart++;

  updateCart();

  showToast(
    `${product.name} ditambahkan ke keranjang.`
  );

}


modalCart.addEventListener(
  "click",
  () => {

    if (!selectedProduct) return;

    addToCart(
      selectedProduct
    );

    closeModal();

  }
);


/* ================= TOAST ================= */

let toastTimer;

function showToast(message) {

  toastMessage.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2200);

}


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener(
  "click",
  () => {

    menuToggle.classList.toggle(
      "open"
    );

    mobileNav.classList.toggle(
      "show"
    );

  }
);


mobileNav
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        menuToggle.classList.remove(
          "open"
        );

        mobileNav.classList.remove(
          "show"
        );

      }
    );

  });


/* ================= NAVBAR SCROLL ================= */

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 20) {

      navbar.classList.add(
        "scrolled"
      );

    } else {

      navbar.classList.remove(
        "scrolled"
      );

    }

  }
);


/* ================= NEWSLETTER ================= */

const newsletterButton =
  document.querySelector(
    "#newsletterButton"
  );

const emailInput =
  document.querySelector(
    "#emailInput"
  );


newsletterButton.addEventListener(
  "click",
  () => {

    const email =
      emailInput.value.trim();


    if (!email) {

      showToast(
        "Masukkan email terlebih dahulu."
      );

      return;

    }


    if (!email.includes("@")) {

      showToast(
        "Format email belum benar."
      );

      return;

    }


    emailInput.value = "";

    showToast(
      "Berhasil berlangganan newsletter!"
    );

  }
);


/* ================= INITIAL RENDER ================= */

renderProducts();
updateCart();