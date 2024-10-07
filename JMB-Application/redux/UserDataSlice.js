import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk to fetch data
const handleGetData = createAsyncThunk('handleGetData', async () => {
    // const response = await fetch('https://jmb-server.onrender.com/admin/data', {
    //     method: "GET"
    // });
    // if (!response.ok) {
    //     throw new Error('Failed to fetch data');
    // }
    // const data = await response.json();
    // console.log(data)
    // let filteredData = data?.fileData;
    // const files = filteredData.map(({ data }) => data).flat();
    // return files;
});



const initialState = {
    files: [], // Store your files in an array
    status: 'idle', // For tracking request status
    error: null // For storing any error
};

const UserDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleGetData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(handleGetData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.status = 'succeeded';
                state.files = action.payload; // Assign the payload to the state
            })
            .addCase(handleGetData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture the error message
            });
    }
});

export default UserDataSlice.reducer;
export { handleGetData };
