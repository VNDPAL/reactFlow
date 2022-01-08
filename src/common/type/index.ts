export type NodeType = {
  id: string;
  type: string;
  position: NodePosition;
  data: NodeData;
};

export type NodeData = {
  text: string;
  img: string;
};

export type NodePosition = {
  x: number;
  y: number;
};
