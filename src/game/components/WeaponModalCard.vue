<template>
  <a href="javascript:;"
     class="block rounded-md p-4 shadow-sm hover:shadow transition-shadow"
     :class="[current ? 'bg-indigo-100' : 'bg-gray-100']"
  >
    <p class="text-sm text-gray-600 mb-2">
      {{ weapon.name }}
    </p>
    <p class="text-lg text-gray-800">
      <WeaponUnlockDescription :weapon="weapon" />
    </p>
  </a>
</template>

<script setup lang="ts">
import { ExtendedWeapon } from '@/game/types';
import WeaponUnlockDescription from './WeaponUnlockDescription.vue';

defineProps<{
  weapon: ExtendedWeapon;
  current?: boolean | undefined;
}>();
</script>
