import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Modal, Select } from "antd";

import getCroppedImg from "../../../utils/cropImage";

const aspectRatios: IAspectRatios[] = [
  // { name: '4:3', value: 4 / 3, },
  // { name: '3:2', value: 3 / 2, },
  { name: '1:1', value: 1 / 1, },
  // { name: '2:3', value: 2 / 3, },
  // { name: '3:4', value: 3 / 4, },
];

interface IAspectRatios {
  name: string;
  value: number;
}

interface Props {
  visible: boolean;
  loading: boolean;
  image: string | ArrayBuffer | null | any;
  save: (file: File) => void;
  close?: () => void;
}

export const CropModal = ({ close, image, save, visible, loading }: Props) => {
  const [aspectRatioSelected, setAspectRatioSelected] = useState<IAspectRatios>(aspectRatios[0]);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image as string,
        croppedAreaPixels,
        rotation
      )
      save(croppedImage as File)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <Modal
      open={visible}
      onCancel={close}
      confirmLoading={loading}
      onOk={() => saveCroppedImage()}
      cancelText='Cancelar'
      okText='Confirmar'
      title='Crop Image'
    >
      <div
        style={{
          position: 'relative',
          height: 'calc(90vh - 300px)',
          width: '100%',
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatioSelected.value}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </Modal >
  )
}