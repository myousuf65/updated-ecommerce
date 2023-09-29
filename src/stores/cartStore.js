import { create } from "zustand";

export const useCartStore = create(set => ({
    cartArray: [],
    addToCart: (newItem) => set((state) => ({
        cartArray: [...state.cartArray, {
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            image : newItem.image
        }]
    })),

    removeFromCart: (itemId) => set((state) => ({
        cartArray: state.cartArray.filter((item) => itemId !== item.id)
    }))

}))
