import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { Cube } from "./components/Cube";
import "./App.less";
import { useRecoilState } from "recoil";
import { CubeDataListAtom } from "./atoms/CubeDataListAtom";
import { CubeData } from "./interfaces/CubeData";
import { nanoid } from "nanoid";
import { CubeTextureAtom } from "./atoms/CubeTextureAtom";
import { TextureSelector } from "./components/TextureSelector";
import { Menu } from "./components/Menu";

function App() {
  const [guideStatus, setGuideStatus] = useState<boolean>(true);
  const [cubeDataList, setCubeDataList] = useRecoilState(CubeDataListAtom);
  const [cubeTexture, setCubeTexture] = useRecoilState(CubeTextureAtom);
  const addCube = (x: number, y: number, z: number) => {
    const newCube: CubeData = {
      id: nanoid(),
      position: [x, y, z],
      textureName: cubeTexture,
    };

    setCubeDataList((prev) => prev.concat(newCube));
  };
  return (
    <>
      <Canvas>
        <Sky />
        {/* 光源 */}
        <ambientLight intensity={0.5} />
        <PointerLockControls />
        <Physics>
          <Ground addCube={addCube} />
          <Player />
          {cubeDataList.map((cubeData) => (
            <Cube
              key={cubeData.id}
              position={cubeData.position}
              textureName={cubeData.textureName}
              addCube={addCube}
            />
          ))}
        </Physics>
      </Canvas>
      <div className="center">+</div>
      <TextureSelector />
      <Menu
        openGuide={() => {
          setGuideStatus(true);
        }}
      />
      {guideStatus && (
        <div className="guide_container">
          <div
            className="del_btn"
            onClick={() => {
              setGuideStatus(false);
            }}
          >
            X
          </div>
          <div className="g_center">操作指南</div>
          <div>1. 按ESC键退出游戏模式</div>
          <div>2. W S A D为上下左右方向键</div>
          <div>3. Space为跳起</div>
          <div>4. 1 2 3 4 5 选择不同的方块</div>
          <div>5. 按住Ctrl键点击方块为删除功能</div>
        </div>
      )}
    </>
  );
}

export default App;
