<template>
  <Listbox as="div" v-model="value">
    <ListboxLabel class="block text-sm font-medium">{{ label }}</ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
        <span class="block truncate">{{ value?.name || defaultValue }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="item in options" :key="`${prefix}-${item.id}`" :value="item" v-slot="{ active, selected }">
            <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.name }}</span>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { WeaponCategory } from '@/game/types';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  label: string;
  defaultValue: string;
  modelValue: WeaponCategory | null;
  items: { id: string; name: string; }[];
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val: WeaponCategory | null) => emit('update:modelValue', !val || val?.id === 'all-items' ? null : val),
});

const prefix = `Selector-${Math.random().toString().replace('.', '')}`;
const options = computed(() => [
  { id: 'all-items', name: props.defaultValue },
  ...props.items,
]);
</script>
