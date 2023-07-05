const initialState = {
    token: null,
    user: null,

  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_IN_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
       
        };
      case 'SIGN_IN_FAILURE':
        return {
          ...state,
          error: action.payload.error
        };
      case 'SIGN_OUT':
        return {
          ...state,
          token: null,
          user: null,
    
        };
      default:
        return state;
    }
  };
  

  
  export default authReducer;