<template>
  <Combobox as="div" v-model="value" nullable>
    <ComboboxLabel class="block text-sm font-medium text-gray-700">{{ label }}</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                     @change="query = $event.target.value"
                     :display-value="(item: any) => item?.name || ''"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="options.length > 0"
                       class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption v-for="item in options"
                        :key="`${prefix}-${item.id}`"
                        :value="item"
                        as="template"
                        v-slot="{ active, selected }"
        >
          <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ item.name }}
            </span>

            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  label: string;
  defaultValue: string;
  modelValue: any;
  items: { id: string; name: string; }[];
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val: any) => emit('update:modelValue', !val || val?.id === 'all-items' ? null : val),
});

const prefix = `Selector-${Math.random().toString().replace('.', '')}`;
const query = ref('');
watch(value, () => {
  if (!value.value) {
    query.value = '';
  }
});

const options = computed(() => {
  if (!query.value) {
    return props.items;
  }

  const lowerCased = query.value.toLowerCase();

  return props.items.filter((item: any) => {
    if (item.name.toLowerCase().includes(lowerCased) || item.id.toLowerCase().includes(lowerCased)) {
      return true;
    } else if (typeof item.alias === 'undefined' || !item.alias) {
      return false;
    }

    return item.alias.toLowerCase().includes(lowerCased);
  });
});
</script>
