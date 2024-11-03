import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Components/Slice/CartSlice'


export default configureStore({
  reducer: {
    product: productReducer
  }
})