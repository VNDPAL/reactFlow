import { FC, MouseEventHandler } from "react";
import Popup from "reactjs-popup";
import ExistingIcon from "../../assets/icons/favfile.svg";
import "./DnDPopUpExisting.scss";

type DnDPopUpExistingProps = {
  onXmlChange: (evt: any) => void;
  openExistingPath: () => void;
  onRestore: () => void;
};

const DnDPopUpExisting: FC<DnDPopUpExistingProps> = ({
  onXmlChange,
  openExistingPath,
  onRestore,
}) => {
  return (
    <Popup
      trigger={
        <button className="DnDPopUp__trigger" title="open existing">
          <img src={ExistingIcon} alt="" />
        </button>
      }
      modal
    >
      {(close: MouseEventHandler<HTMLButtonElement> | undefined) => (
        <div className="DnDPopUp">
          <button className="DnDPopUp__close" onClick={close}>
            &times;
          </button>
          <div className="DnDPopUp__header">Open Existing Pathway</div>
          <div className="DnDPopUp__content">
            <input
              type="text"
              onChange={onXmlChange}
              placeholder="paste your xml here"
            />
          </div>
          <div className="DnDPopUp__actions">
            <button className="button" onClick={openExistingPath}>
              confirm
            </button>
            <button
              className="button"
              onClick={(evt) => {
                close?.(evt);
                onRestore();
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

export default DnDPopUpExisting;
