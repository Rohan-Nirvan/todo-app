import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";

export const store = configureStore({
  reducer, // TODO: separate reducer field
});

// ✅ These are for typing useSelector & useDispatch properly
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
