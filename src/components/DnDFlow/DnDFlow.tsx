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
} from "react-flow-renderer";
import Sidebar from "../Sidebar";
import closeIcon from '../../assets/icons/closeIcon.svg';
import "./DnDFlow.css";
import SidebarNode from "../SidebarNode";
import SidebarConnection from "../SidebarConnection";
import { isElement } from "react-dom/test-utils";

let id = 0;
const getId = () => `dndnode_${id++}`;
const initialElements: any = [
  {
    id: getId(),
    type: "custom",
    data: { text: "Main Node" },
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
    setconnectionSidebar(()=>true);
    setElements((els: any) => addEdge(params, els));
  };

  const onElementsRemove = (elementsToRemove: Elements<any>) =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  const onNodeDoubleClick = (event: any, node: any) => {
    setElements((state:any) => {
        const clone = [...state];
        return clone.filter((x)=>x.id!==node.id && x.source !== node.id && x.target !== node.id);
    });
  };
  const onElementClick = (event: any,element:any) => {
      if(isNode(element))
      {
          setnodeDetailsSidebar(()=>true);
          setconnectionSidebar(()=>false);
      }
      if(isEdge(element))
      {
        setElements((state:any) => {
            const clone = [...state];
            let ele = clone.filter((x)=>x.id===element.id)[0];
            ele.type = 'smoothstep';
            ele.label = 'smoothstep';
            ele.arrowHeadType = 'arrowclosed';
            ele.style = {'color':'red'};
            let val = clone.filter((x)=>x.id !== element.id);
            val.push(ele);
            return val;
        });
        setnodeDetailsSidebar(()=>false);
        setconnectionSidebar(()=>true); 
      }
  };

  const onPanelClick = () =>{
        setnodeDetailsSidebar(()=>false)
        setconnectionSidebar(()=>false)
  }

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
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type:'custom',
      position,
      data: { text: type },
    };

    setElements((es: any) => es.concat(newNode));
  };

  const customNodeStyles = {
    background: "#9CA8B3",
    color: "#FFF",
    padding: 10,
    width:'170px',
    height:'25px'
  };

  const CustomNodeComponent = ({data}:any) => {
    return (
      <div style={customNodeStyles}>
        <div>{data.text}</div>
        <Handle
          type="target"
          position={Position.Left}
          style={{ borderRadius: 0 }}
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="d"
          style={{ borderRadius: 0 }}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="a"
          style={{ borderRadius: 0 }}
        />
        <Handle
          type="target"
          position={Position.Top}
          id="c"
          style={{ borderRadius: 0 }}
        />
        <Handle
          type="source"
          position={Position.Top}
          id="topLeft"
          style={{ left: "0%", borderRadius: 0 }}
        />
        <Handle
          type="source"
          position={Position.Top}
          id="topRight"
          style={{ left: "100%", borderRadius: 0 }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottomLeft"
          style={{ left: "0%", borderRadius: 0 }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottomRight"
          style={{ left: "100%", borderRadius: 0 }}
        />
      </div>
    );
  };

  const nodeTypes = {
    custom: CustomNodeComponent,
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar ele={elements} stateChanger={setElements}/>
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
        {nodeDetailsSidebar?<SidebarNode />:''}
        {connectionSidebar?<SidebarConnection />:''}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
