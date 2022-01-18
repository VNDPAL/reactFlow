import { FC, useEffect, useState } from "react";
import "./SidebarConnection.scss";

type SidebarConnectionProps = {
  elementsStateChanger: any;
  curConnection: any;
  curConnectionText: string;
};

const SidebarConnection: FC<SidebarConnectionProps> = ({
  elementsStateChanger,
  curConnection,
  curConnectionText,
}) => {
  const [branchCondition, setbranchCondition] = useState("");
  const [source, setsource] = useState("");
  const [condition, setcondition] = useState("");
  const [expected, setexpected] = useState("");
  console.log(curConnection, "curConn");
  const onAddBranchCondition = () => {
    let srt = `${source} ${condition} ${expected}`;
    let bc = branchCondition ? `${branchCondition} \n` : ``;
    setbranchCondition(`${bc} ${srt}`);
    elementsStateChanger(curConnection, `${bc} ${srt}`);
  };

  const onBranchConditionChange = (val: any) => {
    setbranchCondition(val);
  };

  useEffect(() => {
    setbranchCondition(curConnectionText);
  }, [curConnectionText]);

  return (
    <aside className="sidebar-connection">
      <div className="sidebar-connection__heading">
        <h1>Branch Condition</h1>
      </div>
      <hr />
      <div className="sidebar-connection__content">
        <div className="sidebar-connection__condition">
          <h3>General Properties</h3>
          <div>
            <span>Sort Index</span>{" "}
            <input size={1} type="text" defaultValue={1} />
          </div>
          <div>
            <span>Is Else Branch?</span> <input type="checkbox" />
          </div>
          <div>
            <span>Create Beacon?</span> <input type="checkbox" />
          </div>
        </div>
        <div className="sidebar-connection__condition">
          <hr />
          <h3>Add New Condition</h3>

          <div>
            <select onChange={(event) => setsource(event.target.value)}>
              <option value=" "> </option>
              <option value="Context Key">Context Key</option>
              <option value="Qualifiers">Qualifiers</option>
              <option value="Review Responses">Review Responses</option>
              <option value="Determinations">Determinations</option>
              <option value="Static Value">Static Value</option>
              <option value="Current Response">Current Response</option>
              <option value="Plugin Result">Plugin Result</option>
              <option value="Resource">Resource</option>
            </select>
          </div>
          <div>
            <select>
              <option value=""> </option>
              <option value="selected Branch">selected Branch</option>
            </select>
          </div>
          <div>
            <select onChange={(event) => setcondition(event.target.value)}>
              <option value=" "> </option>
              <option value="EQUAL">EQUAL</option>
              <option value="CONTAIN">CONTAIN</option>
              <option value="GREATER THAN">GREATER THAN</option>
              <option value="GREATER THAN">LESS THAN</option>
              <option value="DEFINED">DEFINED</option>
              <option value="DATE DIFF">DATE DIFF</option>
              <option value="MONTH DIFF">MONTH DIFF</option>
              <option value="YEAR DIFF">YEAR DIFF</option>
              <option value="YEAR DIFF">YEAR DIFF</option>
              <option value="ADD">ADD</option>
              <option value="SUBSTRACT">SUBSTRACT</option>
              <option value="MULTIPLY">MULTIPLY</option>
              <option value="DIVIDE">DIVIDE</option>
              <option value="MERGE">MERGE</option>
              <option value="CONCAT">CONCAT</option>
              <option value="ROUND">ROUND</option>
              <option value="ADD DAYS">ADD DAYS</option>
              <option value="ADD BUSINESS DAYS">ADD BUSINESS DAYS</option>
              <option value="HOLIDAYS">HOLIDAYS</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              onChange={(event) => setexpected(event.target.value)}
            />
          </div>
          <div>
            <button onClick={onAddBranchCondition}>Add</button>
          </div>
        </div>
        <div className="sidebar-connection__condition">
          <hr />
          <h3>Branch Conditions</h3>

          <div>
            <textarea
              value={branchCondition}
              onChange={(event) => onBranchConditionChange(event.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarConnection;
