import { useRecoilState } from "recoil";
import { CubeDataListAtom } from "../atoms/CubeDataListAtom";
import { useEffect } from "react";

export const Menu = () => {
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
      <button style={{ marginRight: "10px" }} onClick={handleSaveBtnClick}>
        Save
      </button>
      <button onClick={handleResetBtnClick}>Reset</button>
    </div>
  );
};
