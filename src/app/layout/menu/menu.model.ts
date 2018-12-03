
export interface BadgeItem {
  type: string;
  value: string;
}

export interface Menu {
  state?: string;
  name: string;
  type: string;
  fontSet?: string
  icon?: string;
  badge?: BadgeItem[];
  children?: Menu[];
}