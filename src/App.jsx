import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LogIn from "./Pages/LogIn";
import Wishlist from "./Pages/Wishlist";
import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import AccountPage from "./Pages/AccountPage";


function App() {

  let router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/wishList" element={<Wishlist />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkOut" element={<CheckOut />} />
      <Route path="/account" element={<AccountPage/>}></Route>
    </Route>
  ))

  return (
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
