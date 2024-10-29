import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cartItemControler',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: ((state, action)=>{
      console.log(action)
    })
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = CartSlice.actions

export default CartSlice.reducer