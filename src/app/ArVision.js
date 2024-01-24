import './globals.css';
import QRCode from 'qrcode.react';


function ArVision() {
  return (
    <div className='border-2 rounded border-blue-500'>
      <div className="mt-4 flex justify-center">
        <QRCode
          value="https://sketchfab.com/models/cd40c75e93344891812ae8b6af8a92e5/embed-ar"
          size={128}
        />
      </div>
    </div>
  );
}

export default ArVision;
