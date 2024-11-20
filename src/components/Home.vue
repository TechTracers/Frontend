<template>
  <div class="home-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">LockItem</div>
      <ul class="nav-links">
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/search">Search</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Inventory Section -->
      <div class="inventory-section">
        <h2>Inventory</h2>
        <div class="inventory-grid">
          <div
            v-for="product in products"
            :key="product.id"
            class="inventory-item"
            @click="selectProduct(product)"
          >
            <img :src="product.imageUrl" :alt="product.name" />
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">$ {{ product.price }}</p>
          </div>
        </div>
      </div>

      <!-- Product Detail Section -->
      <div v-if="selectedProduct" class="product-detail">
        <img :src="selectedProduct.imageUrl" :alt="selectedProduct.name" class="product-detail-image" />
        <h3>{{ selectedProduct.name }}</h3>
        <p class="rating">
          ⭐ {{ selectedProduct.rating }}/5 ({{ selectedProduct.reviews }} reviews)
        </p>
        <p><strong>Stock:</strong> Available ({{ selectedProduct.stock }} in stock)</p>
        <p><strong>Choose size:</strong></p>
        <div class="size-options">
          <button v-for="size in selectedProduct.sizes" :key="size" class="size-option">
            {{ size }}
          </button>
        </div>
        <p class="product-price">Price: $ {{ selectedProduct.price }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      products: [], // To store the fetched products
      selectedProduct: null // To store the selected product
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    selectProduct(product) {
      this.selectedProduct = product;
    }
  },
  mounted() {
    this.fetchProducts(); // Fetch products when the component is mounted
  }
};
</script>

<style scoped>
/* General Page Styles */
.home-page {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding: 1em 2em;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5em;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}

/* Main Content Layout */
.main-content {
  display: flex;
  margin-top: 80px;
  padding: 1em;
  gap: 2em;
}

/* Inventory Section */
.inventory-section {
  flex: 3; /* Occupies 3 parts of the available space */
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Six products per row */
  gap: 1em;
}

.inventory-item {
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1em;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.inventory-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.inventory-item img {
  max-width: 100%;
  border-radius: 4px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-top: 0.5em;
}

.product-price {
  font-size: 14px;
  color: #333;
}

/* Product Detail Section */
.product-detail {
  flex: 1; /* Occupies 1 part of the available space */
  border-left: 2px solid #ddd;
  padding-left: 1em;
}

.product-detail-image {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 1em;
}

.rating {
  font-size: 14px;
  margin-top: 1em;
}

.size-options {
  display: flex;
  gap: 0.5em;
  margin-top: 0.5em;
}

.size-option {
  padding: 0.5em 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.size-option:hover {
  background-color: #e0e0e0;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 1em;
}
</style>


