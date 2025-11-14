import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getInsurancePolicies, 
  createInsurancePolicy, 
  updateInsurancePolicy, 
  deleteInsurancePolicy 
} from '../../api';

export const fetchPolicies = createAsyncThunk(
  'policies/fetchPolicies',
  async (_, { rejectWithValue }) => {
    try {
      const policies = await getInsurancePolicies();
      return policies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPolicy = createAsyncThunk(
  'policies/createPolicy',
  async (policyData, { rejectWithValue }) => {
    try {
      const newPolicy = await createInsurancePolicy(policyData);
      return newPolicy;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePolicy = createAsyncThunk(
  'policies/updatePolicy',
  async ({ policyId, policyData }, { rejectWithValue }) => {
    try {
      const updatedPolicy = await updateInsurancePolicy(policyId, policyData);
      return updatedPolicy;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePolicy = createAsyncThunk(
  'policies/deletePolicy',
  async (policyId, { rejectWithValue }) => {
    try {
      await deleteInsurancePolicy(policyId);
      return policyId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const policiesSlice = createSlice({
  name: 'policies',
  initialState: {
    items: [],
    loading: false,
    error: null,
    editingPolicy: null,
  },
  reducers: {
    setEditingPolicy: (state, action) => {
      state.editingPolicy = action.payload;
    },
    clearEditingPolicy: (state) => {
      state.editingPolicy = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    addPolicyLocal: (state, action) => {
      state.items.push(action.payload);
    },
    updatePolicyLocal: (state, action) => {
      const index = state.items.findIndex(policy => policy.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removePolicyLocal: (state, action) => {
      state.items = state.items.filter(policy => policy.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPolicy.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.meta.arg.clientName) {
          state.items = state.items.filter(policy => 
            policy.clientName !== action.meta.arg.clientName
          );
        }
      })
      .addCase(updatePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePolicy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePolicy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setEditingPolicy, 
  clearEditingPolicy, 
  clearError,
  addPolicyLocal,
  updatePolicyLocal,
  removePolicyLocal
} = policiesSlice.actions;
export default policiesSlice.reducer;