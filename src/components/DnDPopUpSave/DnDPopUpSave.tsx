import { FC, MouseEventHandler } from "react";
import Popup from "reactjs-popup";
import SaveIcon from "../../assets/icons/save.svg";
import "./DnDPopUpSave.scss";

type DnDPopUpSaveProps = {
  onNameChange: (evt: any) => void;
  onSave: () => void;
};

const DnDPopUpSave: FC<DnDPopUpSaveProps> = ({ onNameChange, onSave }) => {
  return (
    <Popup
      trigger={
        <button className="DnDPopUp__trigger" title="save">
          <img src={SaveIcon} alt="" />
        </button>
      }
      modal
    >
      {(close: MouseEventHandler<HTMLButtonElement> | undefined) => (
        <div className="DnDPopUp">
          <button className="DnDPopUp__close" onClick={close}>
            &times;
          </button>
          <div className="DnDPopUp__header">Save Pathway</div>
          <div className="DnDPopUp__content">
            Enter Pathway Name
            <input type="text" onChange={onNameChange} />
          </div>
          <div className="DnDPopUp__actions">
            <button
              className="button"
              onClick={(evt) => {
                onSave();
                close?.(evt);
              }}
            >
              Save Pathway
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DnDPopUpSave;
