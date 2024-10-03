import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../util/API_URL";
import {nanoid} from 'nanoid'


const handleAddMemberData = createAsyncThunk('handleAddMemberData', async(formdata) =>{
    const password = nanoid(7);
    const createdat = new Date()
    // creating the member created Date in Proper Formate
    const currentDate = createdat;
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    // creating the member created Date in Proper Formate
    const object = {
        formData : formdata,
        password : password,
        createdat : createdat,
        formatdate : formattedDate
    }
    const response = await axios.post(`${API_URL}/member`, object);
    if(response.data?.status === 200){
        return object;
    } else {
        return 
    }
});

const handleGetAllFileData = createAsyncThunk('handleGetAllFileData', async() => {
    const response = await axios.get(`${API_URL}/data`)
    if(response.data.status === 200) {
        return response.data.filedata
    } else {
        return
    }
});

const handleDeleteFile = createAsyncThunk('handleDeleteFile', async(formData)=>{
    const response = await axios.delete(`${API_URL}/data`, { data : { IDs : formData } });
    if(response.data.status === 200) {
        return formData;
    } else {
        return
    }
});

const handleDeleteMember = createAsyncThunk('handleDeleteMember', async(user) =>{
    const response = await axios.delete(`${API_URL}/member/${user?.member_email}`)
    if(response.data.status === 200) {
        return user
    } else {
        return
    }
});

const handleManageTags = createAsyncThunk('handleManageTags', async(formData) =>{
    const response = await axios.post(`${API_URL}/manage-tags`, formData)
    if(response.data.status === 200) {
        return formData;
    } else {
        return
    }
});

const handleGetAllData = createAsyncThunk('handleGetAllData', async() =>{
    const response = await axios.get(`${API_URL}/member`)
    return response.data || [];
});

const handleAddBankData = createAsyncThunk('handleAddBankData', async(formData)=>{
    const response = await axios.post(`${API_URL}/bank`, formData);
    if(response.data?.status === 200) {
        return formData;
    } else { 
        return
    }
});

const handleDeleteBank = createAsyncThunk('handleDeleteBank', async(formData) => {
    const response = await axios.delete(`${API_URL}/bank/${formData}`);
    if(response.data.status === 200){
        return formData
    } else { 
        return
    }
});

const handleData = createAsyncThunk('handleData', async(formData) =>{
    const response = await axios.post(`${API_URL}/data`, formData, { headers : { 'Content-Type' : 'multipart/form-data' } });
    console.log(response.data)
    if(response.data.status === 200) {
        return response.data.filedata;
    } else {
        return 
    }
}); 

const handleAddAction = createAsyncThunk('handleAddAction', async(formData)=>{
    const response = await axios.put(`${API_URL}/data`, { data : { action : formData } })
    console.log(response.data)
    if(response.data.status === 200) {
        return formData
    } else { 
        return
    }
});



const initialState = {
    member : [],
    bank : [],
    manageTags : [],
    file : [],
    isError : false,
    isFullfilled : false,
    isProcessing : false,
    isDataProcessing : false,
}

const AdminDataSlice = createSlice({
    name : 'adminData',
    initialState,
    reducers : {
        resetState : (state) =>{
            state.isError = false;
            state.isFullfilled = false;
        },
    },
    extraReducers : builder =>{
        builder.addCase(handleAddMemberData.fulfilled, (state, action) =>{
            if(action?.payload) {
                const {password, createdat, formatdate, formData} = action?.payload;
                const {member_name, member_phone, member_email, address} = formData
                const data = {
                    member_name : member_name,
                    member_email : member_email,
                    member_phone : member_phone,
                    password : password,
                    createdat : createdat,
                    formatdate : formatdate,
                    address : address
                }
                state.member?.push(data);
                state.isFullfilled = true;
                state.isProcessing = false
            } else {
                state.isError = true
                state.isProcessing = false
            }
        });
        builder.addCase(handleAddMemberData.pending, (state, action) =>{
            state.isProcessing = true
        });
        builder.addCase(handleGetAllData.fulfilled, (state, action) =>{
            state.member = action.payload?.memberData;
            state.bank = action.payload?.bankData;
            state.manageTags = action.payload?.manageTags;
            state.isDataProcessing = false;
        });
        builder.addCase(handleGetAllFileData.fulfilled, (state, action) =>{
            if(action?.payload) {
                state.file = action.payload;
                state.isProcessing = false;
                state.isError = false;
            } else {
                state.isError = true;
                state.isProcessing = false;
            }
        });
        builder.addCase(handleGetAllData.pending, (state, action) =>{
            state.isDataProcessing = true
        });
        builder.addCase(handleGetAllFileData.pending, (state, action) =>{
            state.isProcessing = true
        });
        builder.addCase(handleGetAllFileData.rejected, (state, action) =>{
            state.isError = true;
            state.isProcessing = false
        });
        builder.addCase(handleAddBankData.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.bank?.push(action.payload);
                state.isFullfilled = true;
                state.isProcessing = false
            } else {
                state.isError = true
                state.isProcessing = false
            }
        });
        builder.addCase(handleDeleteBank.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.bank = state?.bank?.filter(value => value._id != action?.payload)
                state.isFullfilled = true;
                state.isProcessing = false
            } else {
                state.isError = true
                state.isProcessing = false
            }
        });
        builder.addCase(handleAddBankData.pending, (state, action)=>{
            state.isProcessing = true
        });
        builder.addCase(handleDeleteBank.pending, (state, action)=>{
            state.isProcessing = true
        });
        builder.addCase(handleManageTags.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.manageTags?.push(action.payload);
                state.isFullfilled = true;
                state.isProcessing = false
            } else {
                state.isError = true
                state.isProcessing = false
            }
        });
        builder.addCase(handleManageTags.pending, (state, action)=>{
            state.isProcessing = true
        });
        builder.addCase(handleDeleteMember.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.member = state.member?.filter(value => value?.member_email != action.payload.member_email)
                state.isFullfilled = true;
                state.isProcessing = false
            } else {
                state.isError = true
                state.isProcessing = false
            }
        });
        builder.addCase(handleDeleteMember.pending, (state, action)=>{
            state.isProcessing = true
        });
        builder.addCase(handleData.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.file?.push(action.payload)
                state.isFullfilled = true;
                state.isProcessing = false;
            } else {
                state.isError = true;
                state.isProcessing = false;
            }
        });
        builder.addCase(handleData.pending, (state, action)=>{
            state.isProcessing = true;
        });
        builder.addCase(handleDeleteFile.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.file = state.file?.filter(value => !action?.payload?.includes(value?._id))
                state.isFullfilled = true;
                state.isProcessing = false;
            } else {
                state.isError = true;
            }
        });
        builder.addCase(handleDeleteFile.pending, (state, action)=>{
            state.isProcessing = true;
        });
        builder.addCase(handleAddAction.fulfilled, (state, action) => {
            if (action?.payload) {
                const { actionStatus, agreementNumber, fileName, actionTime } = action.payload;
        
                // Update the state by mapping over the file array
                state.file = state.file.map(file => {
                    if (file.name === fileName) {
                        // Update the data array within the matched file
                        return {
                            ...file,
                            data: file.data.map(value => {
                                if (value.AGREEMENTNO === agreementNumber) {
                                    // Update the ACTION property and the corresponding time field
                                    let updatedValue = { ...value, ACTION: actionStatus };
        
                                    // Check the actionStatus and add time to the appropriate field
                                    if (actionStatus === 'Hold') {
                                        updatedValue = { ...updatedValue, HOLD: actionTime };
                                    } else if (actionStatus === 'Release') {
                                        updatedValue = { ...updatedValue, RELEASE: actionTime };
                                    } else if (actionStatus === 'In Yard') {
                                        updatedValue = { ...updatedValue, IN_YARD: actionTime };
                                    }
        
                                    return updatedValue;
                                }
                                return value; // Return unchanged item if no match
                            })
                        };
                    }
                    return file; // Return unchanged file if it doesn't match
                });
        
                state.isFullfilled = true;
                state.isProcessing = false;
            } else {
                state.isProcessing = false;
                state.isError = true;
            }
        });
        
        builder.addCase(handleAddAction.pending, (state, action) => {
                state.isProcessing = true;
        });
    }
})

export default AdminDataSlice.reducer;
export  {handleAddMemberData, handleGetAllData, handleAddBankData, handleManageTags, handleData, handleDeleteMember, handleDeleteFile, handleDeleteBank, handleAddAction, handleGetAllFileData};
export const {resetState} = AdminDataSlice.actions
