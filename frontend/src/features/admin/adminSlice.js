
import  { createSlice } from '@reduxjs/toolkit'

// Fetch All Products


export const fetchAdminProducts = createAsyncThunk(
  'admin/fetchAdminProducts',
  async (_, { rejectWithValue }) => {
    try {
      
      const {data}  = await axios.get('/api/v1/admin/products')

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error While Fetching the products '
      )
    }
  }
)



const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        success:false,
        loading: false,
        error: null,
               
    },
    reducers: {
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=false
        }
    }
    })

    export const { removeErrors, removeSuccess } = adminSlice.actions
    export default adminSlice.reducer