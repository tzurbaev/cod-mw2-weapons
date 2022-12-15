<template>
  <div class="py-8">
    <h1 class="text-5xl font-extrabold">Weapons</h1>
    <p class="mt-2 text-sm text-gray-700">
      Use this tool to check unlock path for any weapon in <span class="font-bold">Call of Duty: Modern Warfare II</span>.
    </p>
    <div class="bg-purple-300 rounded-md shadow-md p-4 my-8 space-y-4">
      <p class="font-bold text-lg">We launched new website!</p>
      <p>
        <a href="https://codarmory.com" target="_blank" rel="noopener noreferrer" class="font-bold underline">codarmory.com</a>
        is a complete weapons and attachments database for
        <strong>Call of Duty: Modern Warfare II</strong> & <strong>Call of Duty: Warzone 2.0</strong>
        and is already updated with <strong>Season 01 Reloaded</strong> content.
      </p>
      <p>Current website will stay as an archive but won't get any updates. Thank you for using it!</p>
    </div>
    <div class="my-8">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label for="weapon-search" class="block text-sm font-medium">Search</label>
          <div class="mt-1">
            <input v-model="search"
                   type="search"
                   id="weapon-search"
                   class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                   spellcheck="false"
            />
            <p class="mt-1 text-xs text-gray-600">
              <template v-if="!search">Filter weapons by typing name.</template>
              <a v-else href="javascript:;" class="inline-flex items-center text-xs hover:underline" @click="search = null">
                <XMarkIcon class="w-3 h-3" />
                <span>Reset Filter</span>
              </a>
            </p>
          </div>
        </div>
        <div>
          <Autocomplete label="Category" default-value="All Categories" :items="categories" v-model="category" />
          <p class="mt-1 text-xs text-gray-600">
            <template v-if="!category">Filter weapons by typing category name.</template>
            <a v-else href="javascript:;" class="inline-flex items-center text-xs hover:underline" @click="category = null">
              <XMarkIcon class="w-3 h-3" />
              <span>Reset Filter</span>
            </a>
          </p>
        </div>
        <div>
          <Autocomplete label="Platform" default-value="All Platforms" :items="platforms" v-model="platform" />
          <p class="mt-1 text-xs text-gray-600">
            <template v-if="!platform">Filter weapons by typing platform name.</template>
            <a v-else href="javascript:;" class="inline-flex items-center text-xs hover:underline" @click="platform = null">
              <XMarkIcon class="w-3 h-3" />
              <span>Reset Filter</span>
            </a>
          </p>
        </div>
      </div>
    </div>
    <WeaponsGridList :weapons="weapons" :has-filters="hasFilters" @reset="resetFilters" />
  </div>
</template>

<script setup lang="ts">
import { useCategories, usePlatforms, useWeapons } from '@/game/composables/weapons';
import WeaponsGridList from '@/game/components/WeaponsGridList.vue';
import Autocomplete from '@/components/Autocomplete.vue';
import { computed, ComputedRef, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const { categories } = useCategories();
const { platforms } = usePlatforms();

const search = ref(null);
const category = ref(null);
const platform = ref(null);
const { weapons } = useWeapons(search, category, platform);

const hasFilters: ComputedRef<boolean> = computed(() => !!search.value || !!category.value || !!platform.value);
const resetFilters = () => {
  search.value = null;
  category.value = null;
  platform.value = null;
};
</script>
