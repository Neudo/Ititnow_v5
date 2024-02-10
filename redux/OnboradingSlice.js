import { createStore, applyMiddleware } from 'redux';
import {createSlice} from "@reduxjs/toolkit";

export const onboradingSlice = createSlice({
  name: 'onborading',
    initialState: {
        value: false,
    },
})
