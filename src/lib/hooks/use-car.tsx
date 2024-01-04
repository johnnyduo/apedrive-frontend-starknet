import React, { ReactNode, useCallback, useEffect, useState } from 'react';

export interface CarState {
  id: number;
  price: number;
  maxSpeed: number;
  mul: number;
}

const CarContext = React.createContext<{
  cars: CarState[];
  refreshCars: () => any;
}>({
  cars: [],
  refreshCars: () => {},
});

export function useCars() {
  return React.useContext(CarContext).cars;
}

export function useRefreshCars() {
  return React.useContext(CarContext).refreshCars;
}

export function useMaxSpeed() {
  const cars = useCars();

  return cars.reduce((acc, x) => Math.max(acc, x.maxSpeed), 80);
}

export function useMul() {
  const cars = useCars();

  return 1 + cars.reduce((acc, x) => acc + x.mul, 0);
}

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<CarState[]>([]);

  const refreshCars = useCallback(() => {
    setCars(JSON.parse(window.localStorage.getItem('APEDRIVE_CARS') || '[]'));
  }, [setCars]);

  useEffect(() => {
    refreshCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, refreshCars }}>
      {children}
    </CarContext.Provider>
  );
}
