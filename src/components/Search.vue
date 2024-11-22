<template>
   <div class="search-page">
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
         <!-- Search Bar -->
         <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search for a product..." />
         </div>

         <!-- Product Grid and Preview -->
         <div class="content-container">
            <!-- Product Grid -->
            <div class="product-grid">
               <div v-for="product in filteredProducts" :key="product.id" class="product-item"
                  @click="selectProduct(product)">
                  <img :src="product.imageUrl || 'https://via.placeholder.com/150'" :alt="product.name" />
                  <p class="product-name">{{ product.name }}</p>
                  <p class="product-price">$ {{ product.price }}</p>
               </div>
            </div>

            <!-- Product Preview -->
            <div v-if="selectedProduct" class="product-preview">
               <h3>{{ selectedProduct.name }}</h3>
               <img :src="selectedProduct.imageUrl || 'https://via.placeholder.com/150'" :alt="selectedProduct.name" />
               <p><strong>Price:</strong> $ {{ selectedProduct.price }}</p>
               <p><strong>Stock:</strong> {{ selectedProduct.stock }}</p>
               <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";

export default {
   name: "Search",
   data() {
      return {
         products: [], // List of all products
         filteredProducts: [], // List of products matching the search query
         searchQuery: "", // Query entered in the search bar
         selectedProduct: null // Product selected for preview
      };
   },
   watch: {
      searchQuery(newQuery) {
         // Filter products based on the search query
         this.filteredProducts = this.products.filter((product) =>
            product.name.toLowerCase().includes(newQuery.toLowerCase())
         );
      }
   },
   methods: {
      async fetchProducts() {
         try {
            const token = localStorage.getItem("authToken"); // Get the JWT token
            if (!token) {
               console.error("No token found. Redirecting to login.");
               this.$router.push("/login");
               return;
            }
            console.log("JWT Token being used:", token); // Debugging the token

            const response = await axios.get(
               "https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net/api/v1/products",
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            this.products = response.data;
            this.filteredProducts = this.products; // Initially, show all products
         } catch (error) {
            console.error("Error fetching products:", error.response?.data || error.message);
            alert("Failed to fetch products. Please try again.");
         }
      },
      selectProduct(product) {
         this.selectedProduct = product; // Set the selected product
      }
   },
   mounted() {
      this.fetchProducts(); // Fetch products when the component is mounted
   }
};
</script>


<style scoped>
/* Navbar Styles */
.navbar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #000;
   color: white;
   padding: 1em 2em;
   width: 100%;
   box-sizing: border-box;
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
   list-style: none;
   display: flex;
   gap: 1.5em;
}

.nav-links a {
   color: white;
   text-decoration: none;
}

.nav-links a:hover {
   text-decoration: underline;
}

/* Main Content */
.main-content {
   margin-top: 80px;
   /* Space for navbar */
   display: flex;
   flex-direction: column;
   gap: 1em;
   padding: 1em;
}

/* Search Bar */
.search-bar {
   display: flex;
   justify-content: center;
   margin-bottom: 1em;
}

.search-bar input {
   width: 100%;
   max-width: 400px;
   padding: 0.5em;
   font-size: 16px;
   border: 1px solid #ddd;
   border-radius: 8px;
   outline: none;
}

/* Product Grid and Preview */
.content-container {
   display: flex;
   gap: 2em;
   /* Space between grid and preview */
}

/* Product Grid */
.product-grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   gap: 1em;
   flex: 3;
   /* Takes more space */
}

.product-item {
   text-align: center;
   border: 1px solid #ddd;
   border-radius: 8px;
   padding: 1em;
   cursor: pointer;
   transition: box-shadow 0.3s ease;
}

.product-item:hover {
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-item img {
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

/* Product Preview */
.product-preview {
   flex: 1;
   /* Takes less space */
   border: 1px solid #ddd;
   border-radius: 8px;
   padding: 1em;
   text-align: center;
}

.product-preview img {
   max-width: 100%;
   border-radius: 4px;
   margin-bottom: 1em;
}

.product-preview p {
   margin: 0.5em 0;
}

.product-preview h3 {
   margin-bottom: 1em;
   font-size: 18px;
}
</style>
