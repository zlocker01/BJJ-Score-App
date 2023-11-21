import { useState } from "react";

export const Image = () => {
  const [image, setImage] = useState(null);

  // handle image uploads
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>Imagen</h3>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt='score ligue image' style={{ maxWidth: "10%" }} />}
    </div>
  );
};
