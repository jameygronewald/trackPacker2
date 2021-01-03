import { createContext } from 'react';

interface UserContextState {
  user: null | object;
  isAuthenticated: boolean;
}

const userState: UserContextState = {
  user: null,
  isAuthenticated: false,
};

export const UserContext: React.Context<any> = createContext(userState);

// export const Store = createContext(initialState);

// const userReducer = (state: any, action: any): any => {
//     switch (action.type) {
//       default:
//         return state;
//     }
//   };

// export const StoreProvider = (props: any) => {
//     const [state, dispatch] = useReducer(userReducer, initialState);
//     return (
//       <Store.Provider value={{ state, dispatch }}>
//         {props.children}
//       </Store.Provider>
//     );
//   };
