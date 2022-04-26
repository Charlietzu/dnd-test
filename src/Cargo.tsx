import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import type { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { ICargoInfo } from "./types";
import { GRID } from "./constants";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    marginBottom: `${GRID}px`,
    width: 200,
    border: '1px solid lightgrey',
    padding: `${GRID}px`,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

const Cargo = ({ cargo, index }: { cargo: ICargoInfo, index: number}): JSX.Element => {
    return (
        <Draggable draggableId={cargo.id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot ) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    {cargo.content}
                </div>
            )}
        </Draggable>
    )
}

export default Cargo;