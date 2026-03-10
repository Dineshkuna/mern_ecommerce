import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Configure axios with credentials
axios.defaults.withCredentials = true;

// Fetch All Products

export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error While Fetching the products ",
      );
    }
  },
);

// Create Products

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "/api/v1/admin/product/create",
        productData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error While Creating the product ",
      );
    }
  },
);

// Update Products

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        formData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product Update Failed",
      );
    }
  },
);


// delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
      return {productId};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product Update Failed",
      );
    }
  },
);



// Fetch all Users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/users`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);


// Get Single User
export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/users/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch single users",
      );
    }
  },
);


 

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    success: false,
    loading: false,
    error: null,
    product: {},
    deleting: {},
    users:[],
    user:{}
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error While Fetching the products";
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products.push(action.payload.product);
        console.log(state.products);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error While Creating the product";
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;

        const updatedProduct = action.payload.product;

        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product,
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Product Update Failed";
      });


      builder
      .addCase(deleteProduct.pending, (state,action) => {
        const productId=action.meta.arg
        state.deleting[productId] = true;
        
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.productId
        state.deleting[productId] = false;
        state.products = state.products.filter(product => product._id !== productId); 
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const productId=action.meta.arg
        state.deleting[productId] = false;
        state.error = action.payload?.message || "Product Deletion Failed";
      });


      builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });


      
      builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Single users";
      });
  },
});

export const { removeErrors, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;
