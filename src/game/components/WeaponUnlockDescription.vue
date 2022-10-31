<template>
  <span>
    <template v-if="weapon.unlock_type === UnlockType.Auto">
      Start playing to receive <span class="font-bold">{{ weapon.name }}</span> for free.
    </template>
    <template v-else-if="weapon.unlock_type === UnlockType.Level">
      Reach <span class="font-bold">Rank {{ weapon.unlock_level }}</span> to unlock <span class="font-bold">{{ weapon.name }}</span>.
    </template>
    <template v-else-if="weapon.unlock_type === UnlockType.Weapon && weapon.parent">
      Reach <span class="font-bold">Level {{ weapon.unlock_level }}</span> with <span class="font-bold">{{ weapon.parent.name }}</span>
      to unlock <span class="font-bold">{{ weapon.name }}</span>.
    </template>
  </span>
</template>

<script setup lang="ts">
import { ExtendedWeapon, UnlockType } from '@/game/types';

defineProps<{
  weapon: ExtendedWeapon;
}>();
</script>
