<template>
  <a href="javascript:;"
     class="relative rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white border border-gray-200 p-4"
     @click="$emit('open', weapon)"
  >
    <h3 class="text-sm font-bold text-gray-900">{{ weapon.name }}</h3>
    <p class="text-xs text-gray-900 flex items-center gap-2">
      <template v-if="weapon.unlock_type === UnlockType.Auto">
        <CheckCircleIcon class="w-4 h-4" />
        <span>Starting Weapon</span>
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
      <template v-else-if="weapon.unlock_type === UnlockType.BattlePass">
        <span class="font-bold text-xs">Battle Pass</span>
        <span>Season 0{{ weapon.unlock_level }}</span>
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.DMZ">
        <span class="font-bold text-xs">DMZ</span>
        <span>{{ weapon.unlock_id }}</span>
      </template>
    </p>
    <div class="w-full flex items-center rounded-lg mt-4 bg-[#1a1919] justify-center h-28">
      <img :src="`/images/icons/weapons/${weapon.id}.webp`"
           :alt="weapon.name"
           class="max-h-12 max-w-[70%] grayscale"
      />
    </div>
    <div v-if="weapon.category || weapon.platform" class="mt-4 text-xs text-gray-500">
      <p v-if="weapon.category" class="font-bold">
        {{ weapon.category.name }}
      </p>
      <p v-if="weapon.platform">
        {{ weapon.platform.name }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ExtendedWeapon, UnlockType } from '@/game/types';
import {
  CheckCircleIcon, StarIcon, ArrowTrendingUpIcon,
} from '@heroicons/vue/24/outline';

defineProps<{
  weapon: ExtendedWeapon;
}>();

defineEmits(['open']);
</script>
