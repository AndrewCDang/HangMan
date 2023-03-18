import { configureStore } from "@reduxjs/toolkit";
import hangManGameReducer from "./hangMan"

// set configure store function, storing reducer(s)
export default configureStore({
    reducer: {
        hangManGame : hangManGameReducer,
    },
})