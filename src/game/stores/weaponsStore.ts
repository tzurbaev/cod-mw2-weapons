import { defineStore } from 'pinia';
import game from '@/game/data/game.json';
import { WeaponsState } from '@/game/types';

export const useWeaponsStore = defineStore({
  id: 'game:weapons',
  state: () => ({
    categories: game.categories,
    platforms: game.platforms,
    weapons: game.weapons,
  }) as WeaponsState,
});
