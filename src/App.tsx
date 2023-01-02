import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { Cube } from "./components/Cube";
import "./App.css";
import { useRecoilState } from "recoil";
import { CubeDataListAtom } from "./atoms/CubeDataListAtom";
import { CubeData } from "./interfaces/CubeData";
import { nanoid } from "nanoid";
import { CubeTextureAtom } from "./atoms/CubeTextureAtom";
import { TextureSelector } from "./components/TextureSelector";
import { Menu } from "./components/Menu";

function App() {
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
      <Menu />
    </>
  );
}

export default App;
