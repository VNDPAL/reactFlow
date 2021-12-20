import { DragEvent, Key, MouseEventHandler, useState } from "react";
import Popup from "reactjs-popup";
import "./Sidebar.css";
import "reactjs-popup/dist/index.css";

const Sidebar = ({ ele, restore, rfInstance }: any) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const [pathwayName, setpathwayName] = useState("");
  const [pathwayList, setpathwayList] = useState(
    JSON.parse(localStorage.getItem("reactFlow") || "[]")
  );
  const [selectedpathway, setselectedpathway] = useState("");

  const onSave = () => {
    console.log(ele);
    let ls = JSON.parse(localStorage.getItem("reactFlow") || "[]");
    let pw = {
      pathwayName: pathwayName,
      pathway: rfInstance.toObject(),
    };
    ls.push(pw);
    setpathwayList((state:any)=>ls);
    localStorage.setItem("reactFlow", JSON.stringify(ls));
  };
  const onRestore = () => {
    console.log("restore",selectedpathway);
    restore(selectedpathway);
  };

  return (
    <aside>
      <div className="description">Pathway Designer</div>
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
        <Popup trigger={<button className="button"> Save </button>} modal>
          {(close: any) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> Save Pathway</div>
              <div className="content">
                Enter Pathway Name
                <input
                  type="text"
                  onChange={(event) => setpathwayName(event.target.value)}
                ></input>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    onSave();
                    close();
                  }}
                >
                  Save Pathway
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  close modal
                </button>
              </div>
            </div>
          )}
        </Popup>

        <Popup
          trigger={<button className="button"> Open Pathway </button>}
          modal
        >
          {(closeSelectPathway: any) => (
            <div className="modal">
              <button className="close" onClick={closeSelectPathway}>
                &times;
              </button>
              <div className="header"> Open Pathway</div>
              <div className="content">
                <select
                  onChange={(event) => setselectedpathway(event.target.value)}
                >
                  <option value="">Select pathway</option>
                  {pathwayList.map((pw: any, key: any) => (
                    <option key={key} value={pw.pathwayName}>
                      {pw.pathwayName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    onRestore();
                    closeSelectPathway();
                  }}
                >
                  Open
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    closeSelectPathway();
                  }}
                >
                  close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </aside>
  );
};

export default Sidebar;
