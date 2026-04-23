import { useState, useRef } from 'react';

export default function PhotoCapture({ onGenerate, onBack }) {
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const fileRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target.result;
      setPreview(result);
      const base64 = result.split(',')[1];
      setImageData(base64);
    };
    reader.readAsDataURL(file);
  }

  function handleGenerate() {
    if (!imageData) return;
    onGenerate({ imageBase64: imageData, imageMimeType: mimeType });
  }

  return (
    <div className="lego-bg min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center p-5 pt-10">
        <button onClick={onBack} className="brick-btn w-12 h-12 bg-white rounded-2xl shadow-[0_4px_0_#ccc] flex items-center justify-center text-2xl">
          ←
        </button>
        <h2 className="font-fredoka text-3xl text-gray-900 ml-4">Take a Photo</h2>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pb-8 gap-5">
        {/* Image preview / upload area */}
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: preview ? 'transparent' : '#003580' }}
        >
          {preview ? (
            <img src={preview} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <span className="text-7xl">📷</span>
              <p className="font-fredoka text-white text-2xl">Tap to take a photo<br />or choose one!</p>
              <p className="font-nunito text-blue-200 text-sm">Works great with your phone camera</p>
            </div>
          )}
        </div>

        {/* Hidden file input — capture="environment" opens camera on mobile */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
        />

        {preview && (
          <>
            {/* Change photo button */}
            <button
              onClick={() => fileRef.current?.click()}
              className="brick-btn w-full max-w-sm py-4 bg-white text-gray-700 font-bold text-xl rounded-2xl shadow-[0_5px_0_#ccc]"
            >
              📷 Change Photo
            </button>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              className="brick-btn w-full max-w-sm py-5 font-fredoka text-2xl text-gray-900 rounded-2xl shadow-[0_6px_0_#c8a800]"
              style={{ backgroundColor: '#FFD700' }}
            >
              🧱 Build It! Let's Go!
            </button>
          </>
        )}

        {!preview && (
          <button
            onClick={() => fileRef.current?.click()}
            className="brick-btn w-full max-w-sm py-5 font-fredoka text-2xl text-gray-900 rounded-2xl shadow-[0_6px_0_#c8a800]"
            style={{ backgroundColor: '#FFD700' }}
          >
            📱 Open Camera
          </button>
        )}

        <p className="font-nunito text-gray-700 text-sm text-center">
          Try a toy, an animal, a car — anything!
        </p>
      </div>
    </div>
  );
}
