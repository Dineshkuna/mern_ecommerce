import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


// Register API

export const register = createAsyncThunk('user/register', async (userData, {rejectWithValue}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }    
    }
        const {data} = await axios.post('/api/v1/register', userData, config);
        console.log('Registration data')
        return data;   
}
catch(error){
        return rejectWithValue(error.response?.data || 'Registration failed. Please try again later');

    }

}


)

export const login = createAsyncThunk('user/login', async ({email,password}, {rejectWithValue}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }    
    }
        const {data} = await axios.post('/api/v1/login', {email,password}, config);
        console.log('Login data',data)
        return data;   
}
catch(error){
        return rejectWithValue(error.response?.data || 'Login failed. Please try again later');

    }

}


)


export const loadUser = createAsyncThunk('user/loadUser', async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get('/api/v1/profile',{
            withCredentials: true
        });
        
        return data;    

    }catch(error){
        return rejectWithValue(error.response?.data || 'Failed to load user data. Please try again later');
    }

})


export const logout = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('/api/v1/logout',{
            withCredentials: true
        });
        
        return data;    

    }catch(error){
        return rejectWithValue(error.response?.data || 'Failed to load user data. Please try again later');
    }

})


export const updateProfile = createAsyncThunk('user/updateProfile', async (userData, {rejectWithValue}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }    
    }
        const {data} = await axios.put('/api/v1/profile/update',userData,config);
        
        return data;    

    }catch(error){
        return rejectWithValue(error.response?.data || {message: 'Failed to update profile. Please try again later'});
    }

})



export const updatePassword = createAsyncThunk('user/updatePassword', async (formData, {rejectWithValue}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }    
    }
        const {data} = await axios.put('/api/v1/password/update',formData,config);
        
        return data;    

    }catch(error){
        return rejectWithValue(error.response?.data || 'profile updatePassword failed');
    }

})


export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (emailData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/api/v1/password/forgot',
        emailData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);



export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        userData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      return data

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Reset password failed'
      )
    }
  }
)



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: false,
        message: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Register cases
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload?.user || null;
            state.success = action.payload.success;
            state.isAuthenticated = Boolean(action.payload?.user);
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Registration failed. Please try again later';
            state.user = null;
            state.isAuthenticated = false;
        })

         // Login cases
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload?.user || null;
            state.success = action.payload.success;
            state.isAuthenticated = Boolean(action.payload?.user);
            console.log(state.user);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Login failed. Please try again later';
            state.user = null;
            state.isAuthenticated = false;
        })


         // Loading user cases
        builder
        .addCase(loadUser.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload?.user || null;
            
            state.isAuthenticated = Boolean(action.payload?.user);
           
        })
        .addCase(loadUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'loadUser failed. Please try again later';
            state.user = null;
            state.isAuthenticated = false;
        })


         // Logout user cases
        builder
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user =  null;
            state.isAuthenticated = false;
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to load user profile';
           
        })



         // Update user cases
        builder
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user =  action.payload?.user || null;
            state.success =  action.payload?.success 
            state.message =  action.payload?.message 
           
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'profile update failed. Please try again later';
           
        })



        // Update User Password cases
        builder
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success =  action.payload?.success 

           
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'profile updatePassword failed.';
           
        })



         // Forgot Password cases
        builder
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success =  action.payload?.success 
            state.message =  action.payload?.message 

           
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Email sent failed.';
           
        })


        // Reset Password cases
        builder
        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
           
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
  state.loading = false
  state.success = action.payload?.success
  state.user = null
  state.isAuthenticated = false
})

.addCase(resetPassword.rejected, (state, action) => {
  state.loading = false
  state.error = action.payload || 'Reset password failed'
})
    }
});

export const { removeErrors, removeSuccess } = userSlice.actions;

export default userSlice.reducer;