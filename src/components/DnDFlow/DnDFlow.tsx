import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Connection,
  Edge,
  Elements,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ConnectionLineType,
  ConnectionMode,
  isEdge,
  isNode,
  useZoomPanHelper,
} from "react-flow-renderer";
import Sidebar from "../Sidebar";
import closeIcon from "../../assets/icons/closeIcon.svg";
import "./DnDFlow.css";
import SidebarNode from "../SidebarNode";
import SidebarConnection from "../SidebarConnection";
import { isElement } from "react-dom/test-utils";
import pic from "../../assets/images/questionNode.jpg";

let id = 0;
const getId = () => `dndnode_${id++}`;
const initialElements: any = [
  {
    id: getId(),
    type: "custom",
    data: { text: "Ask A Question", img: pic },
    position: { x: 250, y: 5 },
  },
];

const DnDFlow = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [elements, setElements] = useState<any>(initialElements);
  const [nodeDetailsSidebar, setnodeDetailsSidebar] = useState<any>(false);
  const [connectionSidebar, setconnectionSidebar] = useState<any>(false);

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  const onConnect = (params: Edge<any> | Connection) => {
    setconnectionSidebar(() => true);
    setElements((els: any) => {
      let eles = addEdge(params, els);
      const clone = [...eles];
      let ele: any = clone.filter(
        (x: any) =>
          x.source === params.source &&
          x.sourceHandle === params.sourceHandle &&
          x.target == params.target &&
          x.targetHandle === params.targetHandle
      )[0];
      ele.type = "smoothstep";
      ele.label = "smoothstep";
      ele.arrowHeadType = "arrowclosed";
      let val = clone.filter(
        (x: any) =>
          !(
            x.source === params.source &&
            x.sourceHandle === params.sourceHandle &&
            x.target == params.target &&
            x.targetHandle === params.targetHandle
          )
      );
      val.push(ele);
      return val;
    });
  };

  const onElementsRemove = (elementsToRemove: Elements<any>) =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  const onNodeDoubleClick = (event: any, node: any) => {
    setElements((state: any) => {
      const clone = [...state];
      return clone.filter(
        (x) => x.id !== node.id && x.source !== node.id && x.target !== node.id
      );
    });
  };
  const onElementClick = (event: any, element: any) => {
    console.log(reactFlowInstance.toObject());
    if (isNode(element)) {
      setnodeDetailsSidebar(() => true);
      setconnectionSidebar(() => false);
    }
    if (isEdge(element)) {
      setnodeDetailsSidebar(() => false);
      setconnectionSidebar(() => true);
    }
  };

  const onPanelClick = () => {
    setnodeDetailsSidebar(() => false);
    setconnectionSidebar(() => false);
  };

  const onLoad = (_reactFlowInstance: any) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event: {
    preventDefault: () => void;
    dataTransfer: { dropEffect: string };
  }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: {
    preventDefault: () => void;
    dataTransfer: { getData: (arg0: string) => any };
    clientX: number;
    clientY: number;
  }) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const images = event.dataTransfer.getData("application/reactflow/images");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type: "custom",
      position,
      data: { text: type, img: images },
    };

    setElements((es: any) => es.concat(newNode));
  };

  const CustomNodeComponent = ({ data }: any) => {
    return (
      <div className="customNodeStyles">
        <img draggable={false} src={data.img} />
        <div>{data.text}</div>
        <Handle
          type="target"
          position={Position.Left}
          className="handleSelect"
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="d"
          className="handleSelect"
        />
        <Handle
          type="target"
          position={Position.Right}
          id="a"
          className="handleSelect"
        />
        <Handle
          type="target"
          position={Position.Top}
          id="c"
          className="handleSelect"
        />
        <Handle
          type="source"
          position={Position.Top}
          id="topLeft"
          style={{ left: "0%" }}
          className="handleSelect"
        />
        <Handle
          type="source"
          position={Position.Top}
          id="topRight"
          style={{ left: "100%" }}
          className="handleSelect"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottomLeft"
          style={{ left: "0%" }}
          className="handleSelect"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottomRight"
          style={{ left: "100%" }}
          className="handleSelect"
        />
      </div>
    );
  };

  const nodeTypes = {
    custom: CustomNodeComponent,
  };

  const onRestore = useCallback(
    (pathwayName: any) => {
      const restoreFlow = async () => {
        const ls: any = await JSON.parse(
          localStorage.getItem("reactFlow") || "[]"
        );
        let flow = ls.find((x: any) => x.pathwayName === pathwayName).pathway;
        if (flow) {
          const [x = 0, y = 0] = flow.position;
          setElements(flow.elements || []);
        }
      };

      restoreFlow();
    },
    [setElements]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar
          ele={elements}
          restore={onRestore}
          rfInstance={reactFlowInstance}
        />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeDoubleClick={onNodeDoubleClick}
            onElementClick={onElementClick}
            onPaneClick={onPanelClick}
          >
            <Controls />
            <Background variant={BackgroundVariant.Lines} />
          </ReactFlow>
        </div>
        {nodeDetailsSidebar ? <SidebarNode /> : ""}
        {connectionSidebar ? <SidebarConnection /> : ""}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
