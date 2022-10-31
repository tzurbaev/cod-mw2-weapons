export enum UnlockType {
  Auto = 'auto',
  Weapon = 'weapon',
  Level = 'level',
}

export interface WeaponCategory {
  id: string;
  name: string;
}

export interface WeaponPlatform {
  id: string;
  name: string;
}

export interface Weapon {
  id: string;
  category_id: string;
  platform_id: string | null;
  name: string;
  unlock_type: UnlockType;
  unlock_id: string | null;
  unlock_level: number | null;
}

export interface ExtendedWeapon extends Weapon {
  category: WeaponCategory | undefined;
  platform: WeaponPlatform | undefined;
  parent: ExtendedWeapon | null;
}

export interface WeaponsState {
  categories: WeaponCategory[];
  platforms: WeaponPlatform[];
  weapons: Weapon[];
}
