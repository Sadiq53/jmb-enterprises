import axios from 'axios'
import {API_URL} from '../util/API_URL'
import {useDispatch} from 'react-redux'
import { handleAddMemberData } from '../redux/AdminDataSlice';

const dispatch = useDispatch();

const addMemberData = async(formData) =>{
    let response = await axios.post(`${API_URL}/member`, formData)
    if(response.data?.status === 200) {
        dispatch(handleAddMemberData(response.data));
        return true
    }
}

export {addMemberData};