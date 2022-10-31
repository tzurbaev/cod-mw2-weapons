<template>
  <div class="py-8">
    <h1 class="text-5xl font-extrabold">Page Not Found</h1>
    <p class="mt-8">
      <router-link :to="{ name: 'home' }" class="text-indigo-600 hover:text-indigo-500 hover:underline">
        Back to Home Page
      </router-link>
    </p>
  </div>
</template>
