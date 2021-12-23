import { DragEvent, Key, MouseEventHandler, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./Sidebar.css";
import "reactjs-popup/dist/index.css";
import pic from "../../assets/images/questionNode.jpg";
import linkPathwaypic from "../../assets/images/linkPathway.png";
import callPluginpic from "../../assets/images/callPlugin.jpg";
import determinationpic from "../../assets/images/determination.jpg";
import superpic from "../../assets/images/super.png";
import annotationpic from "../../assets/images/abc.webp";
import linkPagepic from "../../assets/images/linkPage.png";
// @ts-ignore
import xmlParserr from "react-xml-parser";

const Sidebar = ({ ele, restore, rfInstance }: any) => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    img: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow/images", img);
    event.dataTransfer.effectAllowed = "move";
  };

  const [pathwayName, setpathwayName] = useState("");
  const [pathwayList, setpathwayList] = useState(
    JSON.parse(localStorage.getItem("reactFlow") || "[]")
  );
  const [selectedpathway, setselectedpathway] = useState("");
  const [existingpathway, setexistingpathway] = useState("");
  
  const openExistingPath = () => {
//     const text = `<Diagram FileFormatVersion="3">    <Pages>      <Page ID="6a2832e5-a031-43ea-b6f3-40422c5dd4ff" Name="Page 1" Visibility="Visible">        <DesignerItems>          <DesignerItem>            <Left>350</Left>            <Top>15</Top>            <Width>NaN</Width>            <Height>NaN</Height>            <ID>d8badf53-ff73-44cc-9770-cc600441bf64</ID>            <zIndex>0</zIndex>            <PathwayNodeId>21026879</PathwayNodeId>            <PathwayNodeType>Determination, ReportingPoints, Questions</PathwayNodeType>            <Content>&lt;Image Source="pack://application:,,,/UPADS.PathwayDesigner;component/Images/Question.png" Tag="7" Width="40" IsHitTestVisible="False" Panel.ZIndex="-1" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" /&gt;</Content>            <IsPathwayRoot>true</IsPathwayRoot>            <IsPageRoot>true</IsPageRoot>            <DisplayText>How are you today?</DisplayText>          </DesignerItem>          <DesignerItem>            <Left>167</Left>            <Top>245</Top>            <Width>NaN</Width>            <Height>NaN</Height>            <ID>5e12d6f9-0b97-49bb-9d20-c8c5bf095b17</ID>            <zIndex>0</zIndex>            <PathwayNodeId>21026880</PathwayNodeId>            <PathwayNodeType>Determination, ReportingPoints, Questions</PathwayNodeType>            <Content>&lt;Image Source="pack://application:,,,/UPADS.PathwayDesigner;component/views/Images/Question.png" Tag="7" Width="40" IsHitTestVisible="False" Panel.ZIndex="-1" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" /&gt;</Content>            <IsPathwayRoot>false</IsPathwayRoot>            <IsPageRoot>false</IsPageRoot>            <DisplayText>Good I know</DisplayText>          </DesignerItem>          <DesignerItem>            <Left>429</Left>            <Top>253</Top>            <Width>NaN</Width>            <Height>NaN</Height>            <ID>697d1be1-9afd-4c5e-8560-670682228030</ID>            <zIndex>0</zIndex>            <PathwayNodeId>21026881</PathwayNodeId>            <PathwayNodeType>Determination, ReportingPoints</PathwayNodeType>            <Content>&lt;Image Source="pack://application:,,,/UPADS.PathwayDesigner;component/views/Images/Determination.png" Tag="3" Width="40" IsHitTestVisible="False" Panel.ZIndex="-1" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" /&gt;</Content>            <IsPathwayRoot>false</IsPathwayRoot>            <IsPageRoot>false</IsPageRoot>            <DisplayText>testtest-(11/23/2021 AddBusinessDays 3)  </DisplayText>          </DesignerItem>        </DesignerItems>        <PageLinks />        <Connections>          <Connection>            <SourceID>d8badf53-ff73-44cc-9770-cc600441bf64</SourceID>            <SinkID>5e12d6f9-0b97-49bb-9d20-c8c5bf095b17</SinkID>            <SourceConnectorName>Bottom</SourceConnectorName>            <SinkConnectorName>Top</SinkConnectorName>            <SourceArrowSymbol>None</SourceArrowSymbol>            <SinkArrowSymbol>Arrow</SinkArrowSymbol>            <zIndex>0</zIndex>            <DisplayBlockLeft>308.5</DisplayBlockLeft>            <DisplayBlockTop>181.96000671386719</DisplayBlockTop>            <DisplayBlockLeftOffset>0</DisplayBlockLeftOffset>            <DisplayBlockTopOffset>0</DisplayBlockTopOffset>            <BranchId>26413975</BranchId>            <DisplayText>3. Else</DisplayText>          </Connection>          <Connection>            <SourceID>d8badf53-ff73-44cc-9770-cc600441bf64</SourceID>            <SinkID>697d1be1-9afd-4c5e-8560-670682228030</SinkID>            <SourceConnectorName>BottomRight</SourceConnectorName>            <SinkConnectorName>Top</SinkConnectorName>            <SourceArrowSymbol>None</SourceArrowSymbol>            <SinkArrowSymbol>Arrow</SinkArrowSymbol>            <zIndex>0</zIndex>            <DisplayBlockLeft>465</DisplayBlockLeft>            <DisplayBlockTop>185.96000671386719</DisplayBlockTop>            <DisplayBlockLeftOffset>0</DisplayBlockLeftOffset>            <DisplayBlockTopOffset>0</DisplayBlockTopOffset>            <BranchId>26413976</BranchId>            <DisplayText>1. Review Responses (nameTag) CONTAIN Great  </DisplayText>          </Connection>        </Connections>        <Annotations />      </Page>    </Pages>  </Diagram>
// `;
    const text = existingpathway;
    const parser = new DOMParser();
    const xmlDoc: any = parser.parseFromString(text, "text/xml");
    console.log(xmlDoc);
    const a1 = parseXmlToJson(xmlDoc);
    const a2 = a1.Diagram;
    const a3 = a2.Pages.Page;
    const q1 = a3.Connections.Connection;
    console.log(q1);
    const a4 = a3.DesignerItems;
    const a5 = a4.DesignerItem;
    const b = a5.map((p: any) => ({
      data: { text: p.DisplayText, img: pic },
      id: p.ID,
      position: { x: p.Left, y: p.Top },
      type: "custom",
    }));

    const c = q1.map((p: any) => ({
      arrowHeadType: "arrowclosed",
      id: p.BranchId,
      label: "smoothstep",
      source: p.SourceID,
      sourceHandle: "bottomLeft",
      target: p.SinkID,
      targetHandle: "c",
      type: "smoothstep",
    }));

    c.forEach((w: any) => {
      b.push(w);
    });

    console.log(b);
    console.log(a5);

    let ls = JSON.parse(localStorage.getItem("reactFlow") || "[]");
    let pw = {
      pathwayName: "testFromExisting",
      pathway: {
        elements: b,
        position: [0, 0],
        zoom: 1,
      },
    };
    ls.push(pw);
    setpathwayList((state: any) => ls);
    localStorage.setItem("reactFlow", JSON.stringify(ls));
    setselectedpathway("testFromExisting");
  };

  function parseXmlToJson(xml: any) {
    try {
      var obj: any = {};
      if (xml.children.length > 0) {
        for (var i = 0; i < xml.children.length; i++) {
          var item = xml.children.item(i);
          var nodeName = item.nodeName;

          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = parseXmlToJson(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];

              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(parseXmlToJson(item));
          }
        }
      } else {
        obj = xml.textContent;
      }
      return obj;
    } catch (e: any) {
      console.log(e.message);
    }
  }

  const onSave = () => {
    console.log(ele);
    let ls = JSON.parse(localStorage.getItem("reactFlow") || "[]");
    let pw = {
      pathwayName: pathwayName,
      pathway: rfInstance.toObject(),
    };
    ls.push(pw);
    setpathwayList((state: any) => ls);
    localStorage.setItem("reactFlow", JSON.stringify(ls));
  };

  const onRestore = () => {
    console.log("restore", selectedpathway);
    restore(selectedpathway);
  };

  return (
    <aside>
      <div className="description">Pathway Designer</div>
      <div
        className="dndnode custom"
        onDragStart={(event) => onDragStart(event, "Ask A Question(s)", pic)}
        draggable
      >
        <img src={pic} />
        <label>Ask A Question(s)</label>
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) =>
          onDragStart(event, "Link to Pathway", linkPathwaypic)
        }
        draggable
      >
        <img src={linkPathwaypic} />
        <label>Link to Pathway</label>
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) =>
          onDragStart(event, "Call A Plugin", callPluginpic)
        }
        draggable
      >
        <img src={callPluginpic} />
        <label>Call A Plugin</label>
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) =>
          onDragStart(event, "Add Determination", determinationpic)
        }
        draggable
      >
        <img src={determinationpic} />
        <label>Add Determination</label>
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) =>
          onDragStart(event, "Add a 'Super' Node", superpic)
        }
        draggable
      >
        <img src={superpic} />
        <label>Add a 'Super' Node</label>
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) =>
          onDragStart(event, "Add an Annotation", annotationpic)
        }
        draggable
      >
        <img src={annotationpic} />
        <label>Add an Annotation</label>
      </div>
      <div
        className="dndnode custom"
        onDragStart={(event) =>
          onDragStart(event, "Link to a Page", linkPagepic)
        }
        draggable
      >
        <img src={linkPagepic} />
        <label>Link to a Page</label>
      </div>
      <div className="popUps">
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
        <Popup
          trigger={<button className="button">Existing Pathway </button>}
          modal
        >
          {(closeExistingPathway: any) => (
            <div className="modal">
              <button className="close" onClick={closeExistingPathway}>
                &times;
              </button>
              <div className="header"> Open Existing Pathway</div>
              <div className="content">
              <input type="text" onChange={(event) => setexistingpathway(event.target.value)} placeholder="paste your xml here" />
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    openExistingPath();
                  }}
                >
                  confirm
                </button>
                <button
                  className="button"
                  onClick={() => {
                    closeExistingPathway();
                    onRestore();
                  }}
                >
                  Open
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    closeExistingPathway();
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
