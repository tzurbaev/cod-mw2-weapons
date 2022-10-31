<template>
  <div class="py-8">
    <h1 class="text-5xl font-extrabold">Weapons</h1>
    <p class="mt-2 text-sm text-gray-700">
      Use this tool to check unlock path for any weapon in <span class="font-bold">Call of Duty: Modern Warfare II</span>.
    </p>
    <div class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label for="weapon-search" class="block text-sm font-medium">Search</label>
        <div class="mt-1">
          <input v-model="search" type="search" id="weapon-search" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      </div>
      <div>
        <Selector label="Category" default-value="All Categories" :items="categories" v-model="category" />
      </div>
      <div>
        <Selector label="Platform" default-value="All Platforms" :items="platforms" v-model="platform" />
      </div>
    </div>
    <WeaponsGridList :weapons="weapons" @reset="resetFilters" />
  </div>
</template>

<script setup lang="ts">
import { useCategories, usePlatforms, useWeapons } from '@/game/composables/weapons';
import WeaponsGridList from '@/game/components/WeaponsGridList.vue';
import Selector from '@/components/Selector.vue';
import { ref } from 'vue';

const { categories } = useCategories();
const { platforms } = usePlatforms();

const search = ref(null);
const category = ref(null);
const platform = ref(null);
const { weapons } = useWeapons(search, category, platform);

const resetFilters = () => {
  search.value = null;
  category.value = null;
  platform.value = null;
};
</script>
