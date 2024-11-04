import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const CartSlice = createSlice({
  name: 'product',
  initialState: {
    CartItem: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    WishListItem: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) :[]
  },
  reducers: {
    addToCart: ((state, action) => {
      let find = state.CartItem.findIndex((item) => item.id === action.payload.id)

      if (find == -1) {
        state.CartItem = [...state.CartItem, action.payload]
        localStorage.setItem("cart", JSON.stringify(state.CartItem))

      } else {
        state.CartItem[find].qty += 1
        localStorage.setItem("cart", JSON.stringify(state.CartItem))
      }
      toast("Added Successfull")
    }),
    increment: ((state, action) => {
      state.CartItem[action.payload].qty += 1
      localStorage.setItem("cart", JSON.stringify(state.CartItem))
    }),

    decrement: ((state, action) => {
      if (state.CartItem[action.payload].qty > 1) {
        state.CartItem[action.payload].qty -= 1
      }
      localStorage.setItem("cart", JSON.stringify(state.CartItem))
    }),
    deletProduct: ((state, action) => {
      state.CartItem.splice(action.payload, 1)
      localStorage.setItem("cart", JSON.stringify(state.CartItem))
      toast("Delete Successfull")
    }),
    WishListProduct:((state, action) => {
      let find =state.WishListItem.findIndex((item) => item.id == action.payload.id)
      
      if ( find == -1) {
        state.WishListItem = [...state.WishListItem, action.payload]
        localStorage.setItem("wishlist", JSON.stringify(state.WishListItem))
        toast("Added Successfull")
      } else {
        alert("Opps! Sorry , Already Added")
      }
    }),
    deletItem: ((state, action) => {
      state.WishListItem.splice(action.payload, 1)
      localStorage.setItem("wishlist", JSON.stringify(state.WishListItem))
      alert("Delete Item")
    }),
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, increment, decrement, deletProduct,WishListProduct, deletItem } = CartSlice.actions

export default CartSlice.reducer