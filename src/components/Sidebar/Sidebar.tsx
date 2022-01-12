import { DragEvent, FC, useState } from "react";
import Popup from "reactjs-popup";
import { SidebarItems } from "../../common/const";
import DnDPopUpSave from "../DnDPopUpSave";
import DnDPopUpOpen from "../DnDPopUpOpen";
import DnDPopUpExisting from "../DnDPopUpExisting";
import "./Sidebar.scss";
import "reactjs-popup/dist/index.css";
import { getExistingPathway } from "../../common/util";

type SidebarProps = {
  ele: any;
  restore: any;
  rfInstance: any;
};

const Sidebar: FC<SidebarProps> = ({ ele, restore, rfInstance }) => {
  const [pathwayName, setpathwayName] = useState("");
  const [pathwayList, setpathwayList] = useState(
    JSON.parse(localStorage.getItem("reactFlow") || "[]")
  );
  const [selectedpathway, setselectedpathway] = useState("");
  const [existingpathway, setexistingpathway] = useState("");

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    img: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow/images", img);
    event.dataTransfer.effectAllowed = "move";
  };

  const openExistingPath = () => {
    const res = getExistingPathway(existingpathway);
    setpathwayList(() => res);
    localStorage.setItem("reactFlow", JSON.stringify(res));
    setselectedpathway("testFromExisting");
  };

  const onSave = () => {
    console.log(ele);
    let ls = JSON.parse(localStorage.getItem("reactFlow") || "[]");
    let pw = {
      pathwayName: pathwayName,
      pathway: rfInstance.toObject(),
    };
    ls.push(pw);
    setpathwayList(() => ls);
    localStorage.setItem("reactFlow", JSON.stringify(ls));
  };

  const onRestore = () => {
    console.log("restore", selectedpathway);
    restore(selectedpathway);
  };

  const handlePathwayNameChange = (evt: any) => {
    setpathwayName(evt.target.value);
  };

  const handleSelectedPathway = (evt: any) => {
    setselectedpathway(evt.target.value);
  };
  // const handleXmlChange = (evt: any) => {
  //   setexistingpathway(evt.target.value);
  // };
  const handleXmlChange = (evt: any) => {
    setexistingpathway(evt);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__title">Pathway Designer</div>

      <div className="sidebar__actions">
        <DnDPopUpSave onNameChange={handlePathwayNameChange} onSave={onSave} />
        <DnDPopUpOpen
          onPathwayChange={handleSelectedPathway}
          onRestore={onRestore}
          pathwayList={pathwayList}
        />
        <DnDPopUpExisting
          onRestore={onRestore}
          onXmlChange={handleXmlChange}
          openExistingPath={openExistingPath}
        />
      </div>
      <div className="sidebar__items">
        {SidebarItems.map(({ text, img }, i) => {
          return (
            <div
              className="sidebar__dndnode"
              onDragStart={(event) => onDragStart(event, text, img)}
              draggable
              key={i}
            >
              <img src={img} />
              <label>{text}</label>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
