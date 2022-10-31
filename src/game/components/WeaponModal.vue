<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 md:scale-100" leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <DialogPanel class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div class="rounded-lg relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8" @click="$emit('close')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div v-if="weapon" class="w-full">
                  <h2 class="text-4xl font-extrabold text-gray-900">
                    {{ weapon.name }}
                  </h2>
                  <p v-if="weapon.category" class="mt-3 font-medium text-gray-500">
                    {{ weapon.category.name }}
                    <template v-if="weapon.platform"> | {{ weapon.platform.name }}</template>
                  </p>

                  <div class="mt-6">
                    <h3 class="text-xl text-gray-900">Path to {{ weapon.name }}</h3>
                    <div class="mt-3 space-y-3">
                      <WeaponModalCard v-for="parentItem in parent"
                                       :key="`Weapon-${weapon.id}-Parent-${parentItem.id}`"
                                       :weapon="parentItem"
                                       @click="$emit('switch', parentItem)"
                      />

                      <WeaponModalCard :weapon="weapon" :current="true" />
                    </div>
                  </div>

                  <div v-if="children.length > 0" class="mt-6">
                    <h3 class="text-xl text-gray-900">
                      Available next
                    </h3>
                    <div class="mt-3 space-y-3">
                      <WeaponModalCard v-for="child in children"
                                       :key="`Weapon-${weapon.id}-Children-${child.id}`"
                                       :weapon="child"
                                       @click="$emit('switch', child)"
                      />
                    </div>
                  </div>
                  <p v-else-if="parent.length > 0" class="text-sm text-gray-700 mt-3">
                    {{ weapon.name }} is the last weapon in chain.
                  </p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ExtendedWeapon } from '@/game/types';
import { useWeaponTree } from '@/game/composables/weapons';
import { computed } from 'vue';
import WeaponModalCard from './WeaponModalCard.vue';

defineEmits(['close', 'switch']);
const props = defineProps<{
  weapon: ExtendedWeapon | null;
  open: boolean;
}>();
const currentWeapon = computed(() => props.weapon);
const { parent, children } = useWeaponTree(currentWeapon);
</script>
