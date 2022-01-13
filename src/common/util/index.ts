import linkPathwaypic from "../../assets/images/linkPathwayIcons8.png";
import callPluginpic from "../../assets/images/callPluginicons8.svg";
import determinationpic from "../../assets/images/determinationIcons8.svg";
import superpic from "../../assets/images/superNodeicons8.svg";
import annotationpic from "../../assets/images/abcIcons8.svg";
import linkPagepic from "../../assets/images/pageIcons8.svg";
import questionNodesvg from "../../assets/icons/questionNode.svg";
import { NodeData, NodePosition, NodeType } from "../type";

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

const getExistingPathway = (existingpathway: any) => {
  //     const text = `<Diagram FileFormatVersion="3">    <Pages>      <Page ID="6a2832e5-a031-43ea-b6f3-40422c5dd4ff" Name="Page 1" Visibility="Visible">        <DesignerItems>          <DesignerItem>            <Left>350</Left>            <Top>15</Top>            <Width>NaN</Width>            <Height>NaN</Height>            <ID>d8badf53-ff73-44cc-9770-cc600441bf64</ID>            <zIndex>0</zIndex>            <PathwayNodeId>21026879</PathwayNodeId>            <PathwayNodeType>Determination, ReportingPoints, Questions</PathwayNodeType>            <Content>&lt;Image Source="pack://application:,,,/UPADS.PathwayDesigner;component/Images/Question.png" Tag="7" Width="40" IsHitTestVisible="False" Panel.ZIndex="-1" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" /&gt;</Content>            <IsPathwayRoot>true</IsPathwayRoot>            <IsPageRoot>true</IsPageRoot>            <DisplayText>How are you today?</DisplayText>          </DesignerItem>          <DesignerItem>            <Left>167</Left>            <Top>245</Top>            <Width>NaN</Width>            <Height>NaN</Height>            <ID>5e12d6f9-0b97-49bb-9d20-c8c5bf095b17</ID>            <zIndex>0</zIndex>            <PathwayNodeId>21026880</PathwayNodeId>            <PathwayNodeType>Determination, ReportingPoints, Questions</PathwayNodeType>            <Content>&lt;Image Source="pack://application:,,,/UPADS.PathwayDesigner;component/views/Images/Question.png" Tag="7" Width="40" IsHitTestVisible="False" Panel.ZIndex="-1" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" /&gt;</Content>            <IsPathwayRoot>false</IsPathwayRoot>            <IsPageRoot>false</IsPageRoot>            <DisplayText>Good I know</DisplayText>          </DesignerItem>          <DesignerItem>            <Left>429</Left>            <Top>253</Top>            <Width>NaN</Width>            <Height>NaN</Height>            <ID>697d1be1-9afd-4c5e-8560-670682228030</ID>            <zIndex>0</zIndex>            <PathwayNodeId>21026881</PathwayNodeId>            <PathwayNodeType>Determination, ReportingPoints</PathwayNodeType>            <Content>&lt;Image Source="pack://application:,,,/UPADS.PathwayDesigner;component/views/Images/Determination.png" Tag="3" Width="40" IsHitTestVisible="False" Panel.ZIndex="-1" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" /&gt;</Content>            <IsPathwayRoot>false</IsPathwayRoot>            <IsPageRoot>false</IsPageRoot>            <DisplayText>testtest-(11/23/2021 AddBusinessDays 3)  </DisplayText>          </DesignerItem>        </DesignerItems>        <PageLinks />        <Connections>          <Connection>            <SourceID>d8badf53-ff73-44cc-9770-cc600441bf64</SourceID>            <SinkID>5e12d6f9-0b97-49bb-9d20-c8c5bf095b17</SinkID>            <SourceConnectorName>Bottom</SourceConnectorName>            <SinkConnectorName>Top</SinkConnectorName>            <SourceArrowSymbol>None</SourceArrowSymbol>            <SinkArrowSymbol>Arrow</SinkArrowSymbol>            <zIndex>0</zIndex>            <DisplayBlockLeft>308.5</DisplayBlockLeft>            <DisplayBlockTop>181.96000671386719</DisplayBlockTop>            <DisplayBlockLeftOffset>0</DisplayBlockLeftOffset>            <DisplayBlockTopOffset>0</DisplayBlockTopOffset>            <BranchId>26413975</BranchId>            <DisplayText>3. Else</DisplayText>          </Connection>          <Connection>            <SourceID>d8badf53-ff73-44cc-9770-cc600441bf64</SourceID>            <SinkID>697d1be1-9afd-4c5e-8560-670682228030</SinkID>            <SourceConnectorName>BottomRight</SourceConnectorName>            <SinkConnectorName>Top</SinkConnectorName>            <SourceArrowSymbol>None</SourceArrowSymbol>            <SinkArrowSymbol>Arrow</SinkArrowSymbol>            <zIndex>0</zIndex>            <DisplayBlockLeft>465</DisplayBlockLeft>            <DisplayBlockTop>185.96000671386719</DisplayBlockTop>            <DisplayBlockLeftOffset>0</DisplayBlockLeftOffset>            <DisplayBlockTopOffset>0</DisplayBlockTopOffset>            <BranchId>26413976</BranchId>            <DisplayText>1. Review Responses (nameTag) CONTAIN Great  </DisplayText>          </Connection>        </Connections>        <Annotations />      </Page>    </Pages>  </Diagram>
  // `;
  const text = existingpathway;
  const parser = new DOMParser();
  const xmlDoc: any = parser.parseFromString(text, "text/xml");
  console.log(xmlDoc);
  const a1 = parseXmlToJson(xmlDoc);
  const a2 = a1.Diagram;
  let a3 = a2.Pages.Page;
  if (a3.length) {
    a3 = a3[0];
  }
  const q1 = a3.Connections.Connection;
  console.log("[mine]", q1);
  const a4 = a3.DesignerItems;
  const a5 = a4.DesignerItem;
  const b = a5.map((p: any) => ({
    data: {
      text: p.DisplayText.split(" ").slice(1).join(" "),
      img: p.Content.includes("Question.png")
        ? questionNodesvg
        : p.Content.includes("Plugin.png")
        ? callPluginpic
        : p.Content.includes("Determination.png")
        ? determinationpic
        : superpic,
    },
    id: p.ID,
    position: { x: p.Left, y: p.Top },
    type: "custom",
  }));

  const c = q1.map((p: any) => ({
    arrowHeadType: "arrowclosed",
    id: p.BranchId,
    label: "smoothstep",
    source: p.SourceID,
    sourceHandle: p.SourceConnectorName,
    target: p.SinkID,
    targetHandle: p.SinkConnectorName,
    type: "smoothstep",
  }));

  c.forEach((w: any) => {
    b.push(w);
  });

  console.log(b);
  console.log(a5);

  let ls = JSON.parse(localStorage.getItem("reactFlow") || "[]");
  ls = ls.filter((x: any) => x.pathwayName !== "testFromExisting");
  let pw = {
    pathwayName: "testFromExisting",
    pathway: {
      elements: b,
      position: [0, 0],
      zoom: 1,
    },
  };
  ls.push(pw);
  return ls;
};

const getNode = (
  id: string,
  type: string,
  position: NodePosition,
  data: NodeData
) => {
  return {
    id,
    type,
    position,
    data,
  };
};

export { parseXmlToJson, getExistingPathway, getNode };
