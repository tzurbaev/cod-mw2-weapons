<template>
  <div v-if="weapons.length > 0">
    <div class="mb-4 sm:flex sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-medium text-gray-900">{{ weapons.length }} Weapon{{ weapons.length > 1 ? 's' : '' }}</h2>
        <p class="mt-1 text-sm text-gray-700">Click or tap on weapon card to view unlock path.</p>
      </div>
      <div v-if="hasFilters" class="mt-2 sm:mt-0">
        <a href="javascript:;" class="inline-flex items-center text-sm text-gray-700 hover:underline" @click="$emit('reset')">
          <XMarkIcon class="w-4 h-4" />
          <span>Reset Filters</span>
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <WeaponGridListItem v-for="weapon in weapons" :key="weapon.id" :weapon="weapon" @open="openWeaponModal" />
    </div>

    <WeaponModal :open="modalIsOpen" :weapon="modalWeapon" @close="closeWeaponModal" @switch="openWeaponModal" />
  </div>
  <div v-else>
    <h3 class="text-2xl font-medium text-gray-900">No weapons</h3>
    <p class="mt-1 text-sm text-gray-500">No weapons were found with selected filters.</p>
    <div class="mt-6">
      <button @click="$emit('reset')" type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExtendedWeapon } from '@/game/types';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { Ref, ref } from 'vue';
import WeaponModal from '@/game/components/WeaponModal.vue';
import WeaponGridListItem from './WeaponGridListItem.vue';

defineEmits(['reset']);
defineProps<{
  weapons: ExtendedWeapon[];
  hasFilters: boolean;
}>();

const modalIsOpen: Ref<boolean> = ref(false);
const modalWeapon: Ref<ExtendedWeapon | null> = ref(null);
const openWeaponModal = (weapon: ExtendedWeapon) => {
  modalWeapon.value = weapon;
  modalIsOpen.value = true;
};
const closeWeaponModal = () => {
  modalIsOpen.value = false;
};
</script>
