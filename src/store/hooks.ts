import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/store.types';
import { AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
