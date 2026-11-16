// OWNER: Member 4 - Nato. Image picker with a preview. The file is NOT uploaded anywhere yet.
import { useEffect, useState } from "react";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

function ImageUpload({ onChange }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("The image must be 2 MB or smaller.");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    onChange(file);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="image" className="text-sm font-medium text-slate-700">
        Property image
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="text-sm"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {preview && (
        <img
          src={preview}
          alt="Selected property preview"
          className="mt-2 h-40 w-full max-w-xs rounded-md object-cover"
        />
      )}
    </div>
  );
}

export default ImageUpload;
