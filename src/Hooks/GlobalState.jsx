import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  cars: [],
  winners: [],
};

const GlobalStateContext = createContext(initialState);

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CAR':
      return { ...state, cars: [...state.cars, action.payload] };
    case 'DELETE_CAR':
      return { ...state, cars: state.cars.filter(car => car.id !== action.payload) };
    case 'SET_WINNERS':
      return { ...state, winners: action.payload };
    case 'ADD_WINNER':
      return { ...state, winners: [...state.winners, action.payload] };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
