<template>
  <div id="app">
    <div class="wrapper main-layout">
      <header class="header full">
        <img class="logo" src="@/assets/logo.png" alt="" />
        <nav id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/toy">Toys</router-link> |
          <router-link to="/reviews">Reviews</router-link> |
          <router-link to="/dashboard">Dashboard</router-link> |
          <router-link to="/about">About</router-link> 
        </nav>
      </header>
      <img class="bg-img full" src="@/assets/BG-img.jpg">
      <router-view />
    </div>
    <footer class="footer full">Coffeeright By Dekel Livyani &copy;</footer>
  </div>
</template>


<script>
export default {};
</script>
