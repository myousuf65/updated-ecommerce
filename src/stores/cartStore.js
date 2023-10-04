import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartArray: [],
      addToCart: (newItem) =>
        set((state) => ({
          cartArray: [
            ...state.cartArray,
            {
              id: newItem.id,
              name: newItem.name,
              price: newItem.price,
              image: newItem.image
            }
          ]
        })),

      removeFromCart: (itemId) =>
        set((state) => ({
          cartArray: state.cartArray.filter((item) => itemId !== item.id)
        }))
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
