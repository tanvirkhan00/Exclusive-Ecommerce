import { configureStore } from '@reduxjs/toolkit'
import { CartSlice } from './Components/slice/CartSlice'

export default configureStore({
    reducer: {
        cartItemControler:  CartSlice,
    },
})