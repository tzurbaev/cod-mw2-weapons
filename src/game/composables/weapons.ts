import { storeToRefs } from 'pinia';
import { useWeaponsStore } from '@/game/stores/weaponsStore';
import {
  computed, ComputedRef, ref, Ref, watch,
} from 'vue';
import {
  ExtendedWeapon, UnlockType, Weapon, WeaponCategory, WeaponPlatform,
} from '@/game/types';

export function useCategories() {
  const { categories } = storeToRefs(useWeaponsStore());

  return { categories };
}

export function usePlatforms() {
  const { platforms } = storeToRefs(useWeaponsStore());

  return { platforms };
}

export function useWeapon(id: ComputedRef<string | null | undefined>) {
  const { categories } = useCategories();
  const { platforms } = usePlatforms();
  const { weapons } = storeToRefs(useWeaponsStore());

  const weapon: ComputedRef<ExtendedWeapon | null> = computed(() => {
    if (!id.value) {
      return null;
    }

    const item: Weapon | undefined = weapons.value.find((current: Weapon) => current.id === id.value);

    if (item === undefined) {
      return null;
    }

    return getExtendedWeapon(item, weapons.value, categories.value, platforms.value, true);
  });

  return { weapon };
}

export function getExtendedWeapon(
  weapon: Weapon,
  weapons: Weapon[],
  categories: WeaponCategory[],
  platforms: WeaponPlatform[],
  withParent = true,
): ExtendedWeapon {
  const weaponCategory: WeaponCategory | undefined = categories.find((item: WeaponCategory) => item.id === weapon.category_id);
  const weaponPlatform: WeaponPlatform | undefined = weapon.platform_id !== null
    ? platforms.find((item: WeaponPlatform) => item.id === weapon.platform_id)
    : undefined;
  let parentWeapon;

  if (withParent && weapon.unlock_type === UnlockType.Weapon) {
    parentWeapon = weapons.find((item: Weapon) => item.id === weapon.unlock_id);
  }

  return {
    ...weapon,
    category: weaponCategory,
    platform: weaponPlatform,
    parent: parentWeapon !== undefined ? getExtendedWeapon(parentWeapon, weapons, categories, platforms, false) : null,
  };
}

export function useWeaponTree(weapon: ComputedRef<Weapon | null>) {
  const { categories } = useCategories();
  const { platforms } = usePlatforms();
  const { weapons } = storeToRefs(useWeaponsStore());
  const parent: Ref<ExtendedWeapon[]> = ref([]);
  const children: Ref<ExtendedWeapon[]> = ref([]);

  const findParent = (id: string | null) => {
    if (!id) {
      return;
    }

    const parentItem = weapons.value.find((item: Weapon) => item.id === id);

    if (!parentItem) {
      return;
    }

    parent.value.unshift(getExtendedWeapon(parentItem, weapons.value, categories.value, platforms.value, true));

    if (parentItem.unlock_type === UnlockType.Weapon) {
      findParent(parentItem.unlock_id);
    }
  };

  const findChildren = (id: string | null) => {
    if (!id) {
      return;
    }

    const childrenItems = weapons.value.filter((item: Weapon) => item.unlock_id === id);

    if (!childrenItems.length) {
      return;
    }

    childrenItems.forEach((child: Weapon) => {
      children.value.push(getExtendedWeapon(child, weapons.value, categories.value, platforms.value, true));
      findChildren(child.id);
    });
  };

  const generate = () => {
    parent.value = [];
    children.value = [];

    if (!weapon.value) {
      return;
    }

    findParent(weapon.value.unlock_id);
    findChildren(weapon.value.id);
  };

  watch(weapon, () => generate(), { immediate: true });

  return { parent, children };
}

export function useWeapons(search: Ref<string | null>, category: Ref<WeaponCategory | null>, platform: Ref<WeaponPlatform | null>) {
  const { categories } = useCategories();
  const { platforms } = usePlatforms();
  const { weapons: allWeapons } = storeToRefs(useWeaponsStore());

  const weapons: ComputedRef<ExtendedWeapon[]> = computed(() => {
    if (search.value === null && category.value === null && platform.value === null) {
      return allWeapons.value.map((weapon: Weapon) => getExtendedWeapon(weapon, allWeapons.value, categories.value, platforms.value));
    }

    return allWeapons.value.filter((weapon: Weapon) => {
      if (category.value !== null && weapon.category_id !== category.value.id) {
        return false;
      } else if (platform.value !== null && weapon.platform_id !== platform.value.id) {
        return false;
      } else if (search.value !== null && !(weapon.name.toLowerCase().includes(search.value?.toLowerCase()) || weapon.id.includes(search.value?.toLowerCase()))) {
        return false;
      }

      return true;
    }).map((weapon: Weapon) => getExtendedWeapon(weapon, allWeapons.value, categories.value, platforms.value));
  });

  return {
    weapons,
  };
}
