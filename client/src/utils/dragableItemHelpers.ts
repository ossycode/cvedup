import { DraggableItem } from "./interface";

const grid = 10;

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid,
  background: isDragging && "gray",
  ...draggableStyle,
});
