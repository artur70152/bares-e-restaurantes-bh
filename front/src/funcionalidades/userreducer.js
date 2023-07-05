const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return action.payload;
    default:
      return state;
  }
}