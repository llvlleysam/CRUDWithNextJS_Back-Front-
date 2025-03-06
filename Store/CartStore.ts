import { OrderModel } from "@/Models/Order";
import { ProductModel } from "@/Models/Product";
import { create } from "zustand";


// تایپ موارد در داخل سبد خرید
type TCart = {
  cartItems: OrderModel[];
  totalCount: number;
  totalPrice: number;
};

// مقدار اولیه سبد خرید
const initial = {
  cartItems: [],
  totalCount: 0,
  totalPrice: 0,
};

// تعریف سبد خرید با پکیج Zustand
const cartStore = create<TCart>(() => initial);

// تعریف متدهای سبد خرید یا همون custom hooks
export default function useCartService() {
  // دریافت مقادیر سبد خرید از داخل zustand
  const { cartItems, totalCount, totalPrice } = cartStore();

  // تعریف متدهای سبد خرید و return مقادیر آن
  return {
    cartItems,
    totalCount,
    totalPrice,
    AddToCart: (item: OrderModel) => {
      const exist = cartItems.find((c) => c._id === item._id);
      const updateCartItem = exist
        ? cartItems.map((c) =>
            c._id === item._id ? { ...c, purchased: exist.purchased + 1 } : c
          )
        : [...cartItems, { ...item, purchased: 1 }];

      const { totalCount, totalPrice } = updateCartInfo(updateCartItem);
      cartStore.setState({ cartItems: updateCartItem, totalCount, totalPrice });
    },
    removeProduct: (item: ProductModel) => {
      const exist = cartItems.find((c) => c._id === item._id);
      if (!exist) return;

      const updateCartItem = cartItems
        .map((c) =>
          c._id === item._id ? { ...c, purchased: exist.purchased - 1 } : c
        )
        .filter((c) => c.purchased > 0);

      const { totalCount, totalPrice } = updateCartInfo(updateCartItem);

      cartStore.setState({ cartItems: updateCartItem, totalCount, totalPrice });

    },
    clearCart: () => {
      cartStore.setState({ cartItems: [], totalCount: 0, totalPrice: 0 });
    },
  };
}

// تعریف متد آپدیت تعداد کل و قیمت کل برای جلوگیری از دابلیکیت کد
const updateCartInfo = (updateCartItem: OrderModel[]) => {
  const totalCount = updateCartItem.reduce(
    (acc, item) => acc + item.purchased,
    0
  );
  const totalPrice = updateCartItem.reduce(
    (acc, item) => acc + item.purchased * item.price,
    0
  );
  // console.log(updateCartItem);
  // console.log(totalCount);
  return {
    totalCount,
    totalPrice,
  };
};
