export const SetIdle = (state) => ({
    ...state,
    status: state.status == "changed" ? "changed" : "idle",
})
