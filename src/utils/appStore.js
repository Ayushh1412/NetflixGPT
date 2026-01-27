import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice"
import gptReducer from "./gptSlice"
import uiReducer from "./uiSlice"
import configReducer from "./configSlice";

const appStore = configureStore({
        reducer: {
            user : userReducer,
            movies : movieReducer,
            gptSearch : gptReducer,
            ui: uiReducer,
            config: configReducer,



        },
});

export default appStore;




