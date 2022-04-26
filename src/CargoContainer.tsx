import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd';
import { ICargoInfo } from './types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CargoList from './CargoList';
import { GRID } from './constants';

const getCargos = (count: number, offset: number = 0): ICargoInfo[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `id-${k + offset}`,
    content: `Cargo ${k + offset}`,
  }));

const reorder = (
  cargoList: ICargoInfo[],
  startIndex: number,
  endIndex: number,
): ICargoInfo[] => {
  const result: ICargoInfo[] = [...cargoList];
  const [removed]: ICargoInfo[] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: ICargoInfo[],
  destination: ICargoInfo[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
) => {
  const sourceClone: ICargoInfo[] = Array.from(source);
  const destClone: ICargoInfo[] = Array.from(destination);
  const [removed]: ICargoInfo[] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250,
  border: '1px solid red',
});

const CargoContainer = () => {
  const [state, setState] = useState([getCargos(10), getCargos(5, 10)]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceIndex: number = +source.droppableId;
    const destinationIndex: number = +destination.droppableId;

    if (sourceIndex === destinationIndex) {
      const items: ICargoInfo[] = reorder(
        state[sourceIndex],
        source.index,
        destination.index,
      );

      const newState: any = [...state];

      newState[sourceIndex] = items;
      setState(newState);
    } else {
      const result: any = move(
        state[sourceIndex],
        state[destinationIndex],
        source,
        destination,
      );

      const newState: any = [...state];

      newState[sourceIndex] = result[sourceIndex];
      newState[destinationIndex] = result[destinationIndex];
      setState(newState);
    }
  };

  return (
    <>
      <div>
        <button type="button" onClick={() => setState([...state, []])}>
          Add new List
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.map((cargoList: ICargoInfo[], index: number) => (
          <Droppable key={index} droppableId={`${index}`}>
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot,
            ) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <CargoList cargos={cargoList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </>
  );
};

export default CargoContainer;
