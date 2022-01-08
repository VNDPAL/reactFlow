import { FC } from "react";
import { Handle, Position } from "react-flow-renderer";
import "./CustomNode.scss";

const CustomNode: FC<any> = ({ data }) => {
  const HANDLES = [
    "Left",
    "Bottom",
    "Right",
    "Top",
    "TopLeft",
    "TopRight",
    "BottomLeft",
    "BottomRight",
  ];
  return (
    <div className="customnode">
      <img draggable={false} src={data.img} />
      <div className="customnode__text">{data.text}</div>
      <div>
        {HANDLES.map((handle: string) => (
          <Handle
            type="source"
            position={Position.Top}
            id={handle}
            key={handle}
            className="customnode__handle"
          />
        ))}
      </div>
    </div>
  );
};

export default CustomNode;
