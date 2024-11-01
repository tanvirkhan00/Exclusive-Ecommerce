import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './Components/slice/CartSlice'

export default configureStore({
    reducer: {
        cartItemsProvider: CartReducer
    },
})