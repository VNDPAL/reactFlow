import { DragEvent } from "react";
import "./Sidebar.css";

const Sidebar = ({ele,restore,rfInstance}:any) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onSave = ()=>{
      console.log(ele);
      localStorage.setItem('reactFlow',JSON.stringify(rfInstance.toObject()));
  };
  const onRestore = ()=>{
    console.log('restore');
    restore();
  };

  return (
    <aside>
      <div className="description">
        Pathway Designer
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Ask A Question")}
        draggable
      >
        Ask A Question
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Add A Determination")}
        draggable
      >
        Add A Determination
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Add A Plugin")}
        draggable
      >
        Add A Plugin
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Link To Pathway")}
        draggable
      >
        Link To Pathway
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Link To Page")}
        draggable
      >
        Link To Page
      </div>
      <div>
      <button onClick={()=>onSave()}>save</button>
      <button onClick={()=>onRestore()}>restore</button>
      </div>
      
    </aside>
  );
};

export default Sidebar;
