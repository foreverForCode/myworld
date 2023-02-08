import { useRecoilState } from "recoil";
import { CubeDataListAtom } from "../atoms/CubeDataListAtom";
import { useEffect } from "react";
import "./menu.less";

export const Menu = (props: { openGuide: () => void }) => {
  const [cubeDataList, setCubeDataList] = useRecoilState(CubeDataListAtom);

  const handleSaveBtnClick = () => {
    localStorage.setItem("cubeDataList", JSON.stringify(cubeDataList));
  };

  const handleResetBtnClick = () => {
    setCubeDataList([]);
  };

  useEffect(() => {
    let cubeDataListStr = localStorage.getItem("cubeDataList");
    if (!cubeDataListStr) {
      cubeDataListStr = "[]";
    }
    setCubeDataList(JSON.parse(cubeDataListStr));
  }, []);

  return (
    <div style={{ position: "absolute", left: "20px", top: "10px" }}>
      <button className="btn" onClick={handleSaveBtnClick}>
        Save
      </button>
      <button className="btn" onClick={handleResetBtnClick}>
        Reset
      </button>
      <button
        className="btn"
        onClick={() => {
          props.openGuide && props.openGuide();
        }}
      >
        操作指南
      </button>
    </div>
  );
};
