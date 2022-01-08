import { FC, MouseEventHandler } from "react";
import Popup from "reactjs-popup";
import OpenIcon from "../../assets/icons/open.svg";
import "./DnDPopUpOpen.scss";

type DnDPopUpOpenProps = {
  onPathwayChange: (evt: any) => void;
  onRestore: () => void;
  pathwayList: any[];
};

const DnDPopUpOpen: FC<DnDPopUpOpenProps> = ({
  onPathwayChange,
  onRestore,
  pathwayList,
}) => {
  return (
    <Popup
      trigger={
        <button className="DnDPopUp__trigger" title="open">
          <img src={OpenIcon} alt="" />
        </button>
      }
      modal
    >
      {(close: MouseEventHandler<HTMLButtonElement> | undefined) => (
        <div className="DnDPopUp">
          <button className="DnDPopUp__close" onClick={close}>
            &times;
          </button>
          <div className="DnDPopUp__header">Open Pathway </div>
          <div className="DnDPopUp__content">
            <select onChange={onPathwayChange}>
              <option value="">Select pathway</option>
              {pathwayList.map((pw: any, key: any) => (
                <option key={key} value={pw.pathwayName}>
                  {pw.pathwayName}
                </option>
              ))}
            </select>
          </div>
          <div className="DnDPopUp__actions">
            <button
              className="button"
              onClick={(evt) => {
                onRestore();
                close?.(evt);
              }}
            >
              Open
            </button>
            <button className="button" onClick={close}>
              close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DnDPopUpOpen;
