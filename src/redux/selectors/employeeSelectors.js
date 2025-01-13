export const selectEmployees = (state) => state.employee?.employees || [];
export const selectLoading = (state) => state.employee?.loading || false;
export const selectError = (state) => state.employee?.error || null;
