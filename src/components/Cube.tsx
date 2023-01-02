import { useBox } from "@react-three/cannon";
import { Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import { CubeDataListAtom } from "../atoms/CubeDataListAtom";
import textures from "../images/textures";
import { useState } from "react";

export const Cube = ({
  position,
  textureName,
  addCube,
}: {
  position: [x: number, y: number, z: number];
  textureName: string;
  addCube: Function;
}) => {
  const [hoverFlag, setHoverFlag] = useState(false);
  const [cubeDataList, setCubeDataList] = useRecoilState(CubeDataListAtom);

  const [ref] = useBox<Mesh>(() => {
    return { type: "Static", position };
  });

  const texture = textures[textureName as keyof typeof textures];

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!e.faceIndex) {
      return;
    }
    const cubeFace = Math.floor(e.faceIndex / 2);
    console.log("cubeFace", cubeFace);

    const [x, y, z] = Object.values(ref.current!.position);
    // 先按 ctrl键 再按右键
    if (e.nativeEvent.ctrlKey) {
      const newCubeDataList = cubeDataList.filter((item) => {
        const [itemX, itemY, itemZ] = item.position;
        return itemX !== x || itemY !== y || itemZ !== z;
      });
      setCubeDataList(newCubeDataList);
      return;
    }
    if (cubeFace === 0) {
      addCube(x + 1, y, z);
      return;
    }
    if (cubeFace === 1) {
      addCube(x - 1, y, z);
      return;
    }
    if (cubeFace === 2) {
      addCube(x, y + 1, z);
      return;
    }
    if (cubeFace === 3) {
      addCube(x, y - 1, z);
      return;
    }
    if (cubeFace === 4) {
      addCube(x, y, z + 1);
      return;
    }
    if (cubeFace === 5) {
      addCube(x, y, z - 1);
      return;
    }
  };
  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHoverFlag(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoverFlag(false);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial
        map={texture}
        color={hoverFlag ? "grey" : "white"}
        opacity={textureName === "glassTexture" ? 0.7 : 1}
        transparent={true}
      />
    </mesh>
  );
};
