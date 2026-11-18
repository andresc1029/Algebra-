import { Fraction } from './Fraction';

export const createMatrix = (rows, cols, fill = 0) => 
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => Fraction.from(fill)));

export const cloneMatrix = (mat) => mat.map(row => row.map(val => Fraction.from(val)));