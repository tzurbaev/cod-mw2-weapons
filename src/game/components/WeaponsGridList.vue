<template>
  <div v-if="weapons.length > 0">
    <h2 class="text-2xl font-medium text-gray-900 mb-4">{{ weapons.length }} Weapon{{ weapons.length > 1 ? 's' : '' }}</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div v-for="weapon in weapons"
           :key="weapon.id"
           class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-300"
      >
        <a href="javascript:;" class="focus:outline-none" @click="openWeaponModal(weapon)">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-bold text-gray-900">{{ weapon.name }}</p>
          <div class="text-sm text-gray-900 flex items-center gap-2">
            <template v-if="weapon.unlock_type === UnlockType.Auto">
              <CheckCircleIcon class="w-4 h-4" />
              <span>Start Weapon</span>
            </template>
            <template v-else-if="weapon.unlock_type === UnlockType.Level">
              <StarIcon class="w-4 h-4" />
              <span>Rank {{ weapon.unlock_level }}</span>
            </template>
            <template v-else-if="weapon.unlock_type === UnlockType.Weapon">
              <ArrowTrendingUpIcon class="w-4 h-4" />
              <span v-if="weapon.parent"><span class="font-medium">{{ weapon.parent.name }}</span> Level {{ weapon.unlock_level }}</span>
              <span v-else>{{ weapon.unlock_id }} Level {{ weapon.unlock_level }}</span>
            </template>
          </div>
          <p v-if="weapon.category" class="mt-4 text-sm text-gray-500">
            {{ weapon.category.name }}
          </p>
          <p v-if="weapon.platform" class="text-sm text-gray-500">
            {{ weapon.platform.name }}
          </p>
        </a>
      </div>
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
import { UnlockType, ExtendedWeapon } from '@/game/types';
import { CheckCircleIcon, StarIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/outline';
import { Ref, ref } from 'vue';
import WeaponModal from '@/game/components/WeaponModal.vue';

defineEmits(['reset']);
defineProps<{
  weapons: ExtendedWeapon[];
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
