export interface SheetItem {
    name: string;
    description: string;
    price: string;
    category: string;
    available: boolean;
}

export interface SheetPromo {
    name: string;
    description: string;
    price: string;
    rules: string;
    active: boolean;
}

export interface RestaurantData {
    items: SheetItem[];
    promos: SheetPromo[];
    lastUpdate: Date;
    formattedMenu: string;
    formattedPromos: string;
}
