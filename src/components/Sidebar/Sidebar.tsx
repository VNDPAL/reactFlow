import { DragEvent, Key, MouseEventHandler, useState } from "react";
import Popup from "reactjs-popup";
import "./Sidebar.css";
import "reactjs-popup/dist/index.css";
import pic from '../../assets/images/questionNode.jpg';
import linkPathwaypic from '../../assets/images/linkPathway.png';
import callPluginpic from '../../assets/images/callPlugin.jpg';
import determinationpic from '../../assets/images/determination.jpg';
import superpic from '../../assets/images/super.png';
import annotationpic from '../../assets/images/abc.webp';
import linkPagepic from '../../assets/images/linkPage.png';

const Sidebar = ({ ele, restore, rfInstance }: any) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string,img:string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow/images", img);
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
        onDragStart={(event) => onDragStart(event, "Ask A Question(s)",pic)}
        draggable
      >
        <img src={pic} />
        <label>Ask A Question(s)</label> 
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Link to Pathway",linkPathwaypic)}
        draggable
      >
        <img src={linkPathwaypic} />
        <label>Link to Pathway</label> 
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Call A Plugin",callPluginpic)}
        draggable
      >
        <img src={callPluginpic} />
        <label>Call A Plugin</label> 
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Add Determination",determinationpic)}
        draggable
      >
        <img src={determinationpic} />
        <label>Add Determination</label> 
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Add a 'Super' Node",superpic)}
        draggable
      >
        <img src={superpic} />
        <label>Add a 'Super' Node</label> 
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Add an Annotation",annotationpic)}
        draggable
      >
        <img src={annotationpic} />
        <label>Add an Annotation</label> 
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Link to a Page",linkPagepic)}
        draggable
      >
        <img src={linkPagepic} />
        <label>Link to a Page</label> 
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
