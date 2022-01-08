import { FC, useEffect, useState } from "react";
import "./SidebarNode.scss";

type SidebarNodeProps = {
  curDisplayText: string;
  curNode: any;
  displayTextStateChanger: (curNode: any, val: string) => void;
};

const SidebarNode: FC<SidebarNodeProps> = ({
  curDisplayText,
  curNode,
  displayTextStateChanger,
}) => {
  const [displayText, setdisplayText] = useState("");

  useEffect(() => {
    setdisplayText(curDisplayText);
  }, [curDisplayText]);

  const onDisplayTextChange = (val: any) => {
    setdisplayText(val);
    displayTextStateChanger(curNode, val);
  };

  return (
    <aside className="sidebarnode">
      <div className="sidebarnode__title">Questions</div>
      <div className="sidebarnode__container">
        <div>
          <span>Display Text</span>
          <textarea
            value={displayText}
            onChange={(event) => onDisplayTextChange(event.target.value)}
          ></textarea>
        </div>
        <div>
          <span>Question Type</span>
          <select>
            <option value=" "> </option>
            <option value="Yes No Unknown">Yes No Unknown</option>
            <option value="Multi Select">Multi Select</option>
            <option value="Single Select">Single Select</option>
            <option value="Date">Date</option>
            <option value="Free Text">Free Text</option>
            <option value="Numeric">Numeric</option>
            <option value="Yes No">Yes No</option>
            <option value="Note">Note</option>
            <option value="Message">Message</option>
            <option value="BinaryStream">BinaryStream</option>
            <option value="Widget">Widget</option>
          </select>
        </div>
        <div>
          <span>Presentation Type</span>
          <select>
            <option value="Auto">Auto</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
        <div>
          <span>Display 'Other'</span> <input type="checkbox" />
        </div>
        <div>
          <span>Reference Tag</span> <input type="text" />
        </div>
        <div>
          <span>Sort Index</span>{" "}
          <input size={1} type="text" defaultValue={1} />
        </div>
        <div>
          <span>Answer Sorting</span>
          <select>
            <option value="Alphabetical">Alphabetical</option>
            <option value="Numeric List">Numeric List</option>
            <option value="As Specified">As Specified</option>
            <option value="Random">Random</option>
            <option value="Reverse  Alphabetical">Reverse Alphabetical</option>
          </select>
        </div>
        <div>
          <span>Is Required?</span> <input defaultValue={1} type="checkbox" />
        </div>
        <div>
          <span>Help Text</span> <input type="text" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarNode;
