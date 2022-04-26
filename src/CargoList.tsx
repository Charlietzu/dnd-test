import React from 'react';
import Cargo from './Cargo';
import { ICargoInfo } from './types';

const CargoList = ({ cargos }: { cargos: ICargoInfo[] }): any => {
  return cargos.map((cargo: ICargoInfo, index: number) => (
    <Cargo cargo={cargo} index={index} key={cargo.id} />
  ));
};

export default CargoList;
