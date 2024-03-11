import { configureStore } from "@reduxjs/toolkit";
import checkUser from "./slices/checkUser";

export default configureStore({
  reducer: {
    checkUser
  }
})
