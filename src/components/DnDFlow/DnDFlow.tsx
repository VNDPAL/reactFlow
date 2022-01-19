import { useState, useRef, useCallback, useEffect, FC } from "react";
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
  ConnectionMode,
  isEdge,
  isNode,
  MiniMap,
} from "react-flow-renderer";
import Sidebar from "../Sidebar";
import SidebarNode from "../SidebarNode";
import SidebarConnection from "../SidebarConnection";
import { useInitElement } from "../../common/hooks";
import { getNode } from "../../common/util";
import { SidebarItems } from "../../common/const";
import CustomNode from "./CustomNode";
import "./DnDFlow.scss";

const DnDFlow: FC = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [id, nextId] = useInitElement();
  const [elements, setElements] = useState<any>([]);
  const [nodeDetailsSidebar, setnodeDetailsSidebar] = useState<any>(false);
  const [connectionSidebar, setconnectionSidebar] = useState<any>(false);
  const [currentConnection, setcurrentConnection] = useState<any>(null);
  const [currentConnectionText, setcurrentConnectionText] = useState<any>("");
  const [currentDisplayText, setcurrentDisplayText] = useState<any>("");
  const [currentNode, setcurrentNode] = useState<any>("");

  useEffect(() => {
    console.log(elements, "[elements]");
  }, [elements]);

  useEffect(() => {
    nextId();
    const [questionNode] = SidebarItems;
    const nodeData = getNode(
      id,
      "custom",
      { x: 250, y: 50 },
      { ...questionNode }
    );
    setElements([nodeData]);
  }, []);

  const onConnect = (params: Edge<any> | Connection) => {
    setcurrentConnection(params);
    setcurrentConnectionText("");
    setconnectionSidebar(() => false);
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
      ele.label = "";
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
    setconnectionSidebar(() => true);
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
    setnodeDetailsSidebar(() => false);
    setconnectionSidebar(() => false);
    if (isNode(element)) {
      setnodeDetailsSidebar(() => true);
      setcurrentNode(() => element.id);
      setcurrentDisplayText(
        () => elements.filter((x: any) => x.id == element.id)[0].data.text
      );
    }
    if (isEdge(element)) {
      setconnectionSidebar(() => true);
      setcurrentConnectionText(
        () => elements.filter((x: any) => x.id == element.id)[0].label
      );
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
    const newNode = getNode(id, "custom", position, {
      text: type,
      img: images,
    });

    setElements((es: any) => es.concat(newNode));

    nextId();
  };

  const setStateFromConnectionSidebar = useCallback(
    (params: any, eleVal: any) => {
      setcurrentConnectionText(eleVal);
      setElements((els: any) => {
        const clone = [...els];
        let ele: any = clone.filter(
          (x: any) =>
            x.source === params.source &&
            x.sourceHandle === params.sourceHandle &&
            x.target == params.target &&
            x.targetHandle === params.targetHandle
        )[0];
        ele.type = "smoothstep";
        ele.label = eleVal;
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
    },
    [setElements]
  );

  const setStateFromNodeSidebar = useCallback(
    (nodeId: any, textFromSidebar: any) => {
      setElements((els: any) => {
        const clone = [...els];
        let ele: any = clone.filter((x: any) => x.id === nodeId)[0];
        ele.data.text = textFromSidebar;
        let val = clone.filter((x: any) => !(x.id === nodeId));
        val.push(ele);
        return val;
      });
    },
    [setElements]
  );

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

  const onRestoreExisting = useCallback(
    (flow: any) => {
      const restoreFlow = async () => {
        const pathway = flow[0].pathway;
        const [x = 0, y = 0] = pathway.position;
        setElements(pathway.elements || []);
      };

      restoreFlow();
    },
    [setElements]
  );

  return (
    <div className="dndflow">
      {elements.length && (
        <ReactFlowProvider>
          <Sidebar
            ele={elements}
            restore={onRestore}
            restoreExisting={onRestoreExisting}
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
              nodeTypes={{
                custom: CustomNode,
              }}
              onNodeDoubleClick={onNodeDoubleClick}
              onElementClick={onElementClick}
              onPaneClick={onPanelClick}
              connectionMode={ConnectionMode.Loose}
            >
              <MiniMap
                nodeStrokeColor={(n: any) => {
                  if (n.style?.background) return n.style.background;
                  if (n.type === "input") return "#0041d0";
                  if (n.type === "output") return "#ff0072";
                  if (n.type === "default") return "#1a192b";
                  if (n.type === "custom") return "#0bed07";

                  return "#eee";
                }}
                nodeBorderRadius={3}
                nodeStrokeWidth={8}
              />
              <Controls />
              <Background variant={BackgroundVariant.Lines} />
            </ReactFlow>
          </div>
          {nodeDetailsSidebar && (
            <SidebarNode
              curDisplayText={currentDisplayText}
              curNode={currentNode}
              displayTextStateChanger={setStateFromNodeSidebar}
            />
          )}
          {connectionSidebar && (
            <SidebarConnection
              elementsStateChanger={setStateFromConnectionSidebar}
              curConnection={currentConnection}
              curConnectionText={currentConnectionText}
            />
          )}
        </ReactFlowProvider>
      )}
    </div>
  );
};

export default DnDFlow;
