import { FC, MouseEventHandler, useEffect, useState } from "react";
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
  const [pathwayList, setpathwayList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const handlePathwayNameChange = async (evt: any) => {
    const pathwayName = evt.target.value;
    const response = await fetch(
      "https://localhost:7259/GetDiagram?pathwayName=" + pathwayName
    );
    const data: any = response.json();
    const a = data.then((x: any) => {
      console.log(x, "then diagram");
      onXmlChange(x);
    });
  };

  useEffect(() => {
    openPopup && fetchDataFromBackend();
  }, [openPopup]);

  const fetchDataFromBackend = async () => {
    const response = await fetch("https://localhost:7259/GetPathways");
    const data: any = response.json();
    const a = data.then((x: any) => {
      console.log(x, "then");
      setpathwayList(() => x);
    });
  };

  return (
    <>
      <button
        className="DnDPopUp__trigger"
        title="open existing"
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        <img src={ExistingIcon} alt="" />
      </button>
      <Popup
        modal
        open={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        {(close: MouseEventHandler<HTMLButtonElement> | undefined) => (
          <div className="DnDPopUp">
            <button className="DnDPopUp__close" onClick={close}>
              &times;
            </button>
            <div className="DnDPopUp__header">Open Existing Pathway</div>
            <div className="DnDPopUp__content">
              {/* <input
              type="text"
              onChange={onXmlChange}
              placeholder="paste your xml here"
            /> */}
              <select onChange={handlePathwayNameChange}>
                <option value="">Select pathway</option>
                {pathwayList.map((pw: any, key: any) => (
                  <option key={key} value={pw}>
                    {pw}
                  </option>
                ))}
              </select>
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
    </>
  );
};

export default DnDPopUpExisting;
