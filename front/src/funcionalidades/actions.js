export const signInRequest = (email, password) => {
    return {
      type: 'SIGN_IN_REQUEST',
      payload: { email, password }
    };
  };
  
  export const signInSuccess = (token, user) => {
    return {
      type: 'SIGN_IN_SUCCESS',
      payload: { token, user }
    };
  };
  
  export const signInFailure = (error) => {
    return {
      type: 'SIGN_IN_FAILURE',
      payload: { error }
    };

    
  };
  export function saveUser(user) {
    return {
      type: 'SAVE_USER',
      payload: user,
    };
  }
  export function signout() {
    return {
      type: 'SIGN_OUT',

    };
  }