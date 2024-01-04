import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useMaxSpeed, useMul } from './use-car';

export interface SensorData {
  v: number;
  s: number;

  lastTimestamp: number;
  point: number;
  // pendingPoint: number;
}

const DEFAULT_SENSOR_DATA = {
  v: 0,
  s: 0,

  lastTimestamp: 0,
  point: 0,
  // pendingPoint: 0,
};

const CUTOFF_SPEED = 0.1;

const SensorContext = React.createContext<SensorData>(DEFAULT_SENSOR_DATA);

export function useSensor() {
  return useContext(SensorContext);
}

type ReducerAction =
  | {
      type: 'v';
      v: number;
      maxSpeed: number;
      mul: number;
    }
  | {
      type: 'initPoint';
      point: number;
      pendingPoint: number;
      s: number;
    }
  | { type: 'harvestPoint' };

// Reducer for high resolution
function reducer(state: SensorData, action: ReducerAction) {
  if (action.type == 'v') {
    const newState = { ...state };
    newState.v = action.v;

    if (action.v > CUTOFF_SPEED && newState.lastTimestamp > 0) {
      newState.s += (action.v * (Date.now() - newState.lastTimestamp)) / 1000;

      const clampedV = Math.min(action.maxSpeed, action.v) / 3.6;
      newState.point +=
        (clampedV * (Date.now() - newState.lastTimestamp) * action.mul) / 1000;
      // newState.pendingPoint +=
      //   (clampedV * (Date.now() - newState.lastTimestamp) * action.mul) / 1000;

      window.localStorage.setItem('APEDRIVE_DISTANCE', newState.s.toFixed(4));
      window.localStorage.setItem('APEDRIVE_POINT', newState.point.toFixed(4));
      // window.localStorage.setItem(
      //   'APEDRIVE_POINT_PENDING',
      //   newState.pendingPoint.toFixed(4)
      // );
    }

    newState.lastTimestamp = Date.now();

    return newState;
  } else if (action.type == 'initPoint') {
    return {
      ...state,
      point: action.point,
      pendingPoint: action.pendingPoint,
      s: action.s,
    };
  }

  return state;
}

export function SensorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_SENSOR_DATA);

  const maxSpeed = useMaxSpeed();
  const mul = useMul();

  const parsePosition = useCallback<PositionCallback>(
    (position) => {
      if (position.coords.speed || position.coords.speed === 0) {
        // dispatchSet('v', position.coords.speed);
        dispatch({
          type: 'v',
          v: position.coords.speed,
          maxSpeed,
          mul,
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch({
        type: 'initPoint',
        point: parseFloat(window.localStorage.getItem('APEDRIVE_POINT') || '0'),
        pendingPoint: parseFloat(
          window.localStorage.getItem('APEDRIVE_POINT_PENDING') || '0'
        ),
        s: parseFloat(window.localStorage.getItem('APEDRIVE_DISTANCE') || '0'),
      });
    }

    const options = {
      enableHighAccuracy: true,
    };
    const watchId = navigator.geolocation.watchPosition(
      parsePosition,
      null,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <SensorContext.Provider value={state}>{children}</SensorContext.Provider>
  );
}
