import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cartItemsProvider',
  initialState: {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : []
  },
  reducers: {
    addToCart: (state, action) => {
      let find = state.cartItems.findIndex((item) => item.id == action.payload.id)
      if(find !== -1){
        state.cartItems[find].qty += 1;
      } else{
        state.cartItems = [...state.cartItems, action.payload]
        localStorage.setItem('cart', JSON.stringify(state.cartItems))
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart } = CartSlice.actions

export default CartSlice.reducer