import linkPathwaypic from "../../assets/images/linkPathwayIcons8.png";
import callPluginpic from "../../assets/images/callPluginicons8.svg";
import determinationpic from "../../assets/images/determinationIcons8.svg";
import superpic from "../../assets/images/superNodeicons8.svg";
import annotationpic from "../../assets/images/abcIcons8.svg";
import linkPagepic from "../../assets/images/pageIcons8.svg";
import questionNodesvg from "../../assets/icons/questionNode.svg";
import { NodeData } from "../type";

export const SidebarItems: NodeData[] = [
  {
    img: questionNodesvg,
    text: "Ask A Question(s)",
  },
  {
    img: linkPathwaypic,
    text: "Link to Pathway",
  },
  {
    img: callPluginpic,
    text: "Call A Plugin",
  },
  {
    img: determinationpic,
    text: "Add Determination",
  },
  {
    img: superpic,
    text: "Add a 'Super' Node",
  },
  {
    img: annotationpic,
    text: "Add an Annotation",
  },
  {
    img: linkPagepic,
    text: "Link to a Page",
  },
];
