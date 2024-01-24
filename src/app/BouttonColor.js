import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './globals.css';
import QRCode from 'qrcode.react';

const colorOptions = [
  { color: [181, 33, 45] },
  { color: [0, 46, 166, 1] },
  { color: [36, 179, 0, 1] },
  { color: [210, 0, 151, 1] },
  { color: [238, 200, 1, 1] },
  { color: [213, 0, 247, 1] },
];

function ButtonColor() {
  const [data, setData] = useState([]);
  const [api, setApi] = useState(null);
  const [nodesHidden, setNodesHidden] = useState(true);
  const [colorMenuVisible, setColorMenuVisible] = useState(false);
  const [qrCodeVisible, setQRCodeVisible] = useState(false);
  const [selectedColorLabel, setSelectedColorLabel] = useState(null);

  useEffect(() => {
    axios.get('https://api.sketchfab.com/v3/models/cd40c75e93344891812ae8b6af8a92e5')
      .then(response => setData(response.data))
      .catch(error => console.error(error));

    const iframe = document.querySelector('iframe');
    const uid = 'cd40c75e93344891812ae8b6af8a92e5';
    const client = new Sketchfab(iframe);

    client.init(uid, {
      autostart: 1,
      animation_autoplay: true,
      annotation: false,
      navigation: false,
      ui_animations: false,
      ui_controls: true,
      ui_inspector: false,
      ui_annotations: false,
      ui_ar: false,
      ui_vr: false,
      ui_fadeout: false,
      ui_fullscreen: false,
      ui_help: false,
      ui_infos: false,
      ui_qr_code: true,
      ui_ar_help: false,
      ui_settings: false,
      ui_watermark: false,
      ui_stop: false,
      ui_color: "35e0be",
      success: instance => {
        setApi(instance);
        instance.start();

        instance.addEventListener('viewerready', () => {
          console.log("ready")

          instance.getMaterialList((err, materials) => {
            let carColorMaterial = materials[5]
            let seatColorMaterial = materials[1]
            console.log(materials)

            carColorMaterial.channels.AlbedoPBR.color = [53 / 255 * 0.6, 224 / 255 * 0.6, 190 / 255 * 0.6];
            seatColorMaterial.channels.AlbedoPBR.color = [0 / 255 * 0.6, 22 / 255 * 0.6, 46 / 255 * 0.6];

            // instance.setMaterial(carColorMaterial);
            // instance.setMaterial(seatColorMaterial);
          })



        })
      },

    });
  }, []);

  const toggleNodes = () => {
    setNodesHidden(!nodesHidden);

    if (api) {
      if (!nodesHidden) {
        showNodes();
      } else {
        hideNodes();
      }
    }
  };

  const hideNodes = () => {
    if (api) {

      api.getNodeMap((err, nodes) => {
        if (!err) {
          for (const nodeId in nodes) {
            if (nodeId === '82' || nodeId === '21' || nodeId === '162') {

              api.hide(nodeId, (err) => {

              });
            }
          }
        }
      });
    }
  };

  const showNodes = () => {
    if (!api) {
      return;
    }

    api.getNodeMap((err, nodes) => {
      if (!err) {
        ['82', '21', '162'].forEach(nodeId => {
          if (nodes[nodeId]) {
            api.show(nodeId);
          }
        });
      }
    });
  };

  const changeColor = (color) => {
    if (api) {
      api.getMaterialList((err, materials) => {
        if (!err) {
          materials.forEach((materialToUpdate) => {
            if (materialToUpdate.name === 'Color') {
              materialToUpdate.channels.AlbedoPBR.color = [convertRGBtoLinear(color[0]), convertRGBtoLinear(color[1]), convertRGBtoLinear(color[2])];
              api.setMaterial(materialToUpdate, () => {
              });
            }
          });
        }
      });
    }
  };

  const toggleColorMenu = () => {
    setColorMenuVisible(!colorMenuVisible);
  };

  const toggleQRCode = () => {
    setQRCodeVisible(!qrCodeVisible);
  };

  function convertRGBtoLinear(color) {
    let value = color / 255;
    if (value <= 0 && value <= 0.04045) {
      return value / 12.92;
    } else {
      return ((value + 0.055) / 1.055) ** 2.4;
    }
  }


  return (
    <div className='relative bg-[#07172d]  items-center h-full'>


      <div className="flex gap-10 items-center flex-row  text-white text-[16px] justify-between p-10  h-[120px]">
        <div className='flex items-center flex-row md:flex-col cursor-pointer gap-3'>
          <label className='flex items-center relative w-max cursor-pointer select-none'>
            <input
              type='checkbox'
              className='appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white bg-white'
              checked={!nodesHidden}
              onChange={toggleNodes}
            />
            <span className='w-7 h-7 absolute rounded-full transform transition-transform bg-[#35e0be]' />
          </label>
          <p className='text-xs uppercase'>Touring pack</p>
        </div>

        <div className="flex flex-row gap-10">
          <div className='flex flex-col items-center cursor-pointer' onClick={toggleColorMenu}>
            <img src="/images/icon-color.svg" alt="" />
            <p className='mt-2 text-xs uppercase hidden md:block'>Color</p>
          </div>

          <div className='flex flex-col items-center cursor-pointer' onClick={toggleQRCode}>
            <img src="/images/icon-AR.svg" alt="" />
            <p className='mt-2 text-xs uppercase hidden md:block'>AR View</p>
          </div>
        </div>

      </div>











      <div className={`absolute w-full h-24 bottom-[119px] grid grid-cols-6  overflow-hidden transition-all ${colorMenuVisible ? "h-[40px]" : "h-[0px]"}`}>
        {colorOptions.map(option => (

          <div
            className='cursor-pointer hover:contrast-150'
            style={{
              backgroundColor: `rgba(${option.color[0]}, ${option.color[1]}, ${option.color[2]}, 1)`,
            }}
            onClick={() => {
              changeColor(option.color);
              setSelectedColorLabel(option.label);
            }}
          />
        ))}
      </div>



      <div className={`absolute w-full  bottom-[119px] overflow-hidden transition-all flex items-center justify-center bg-[#07172d] ${qrCodeVisible ? "h-[calc(100vh-118px)]" : "h-[0px]"}`}>

        <div className="">
          <h2 className='mb-1 text-lg font-semibold text-white'>Scan this QR code</h2>

          <div className='mt-4 flex justify-center'>
            <QRCode
              value='https://sketchfab.com/models/cd40c75e93344891812ae8b6af8a92e5/embed-ar'
              size={128}
            />
          </div>
        </div>
        <button
          className='absolute top-2 right-2 m-2 text-gray-500 hover:text-gray-800'
          onClick={toggleQRCode}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </button>
      </div>









    </div>
  );
}

export default ButtonColor;
