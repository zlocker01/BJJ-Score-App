import { useEffect, useState } from "react";

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

  // save image on localStorage
  useEffect(() => {
    localStorage.setItem("image", JSON.stringify(image));
  }, [image]);

  // effect to get image from localStorage
  useEffect(() => {
    const localImage = JSON.parse(localStorage.getItem(image));
    if (localImage) {
      setImage(localImage);
    }
  }, [image]);

  return (
    <div>
      <h2>Imagen</h2>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "10%" }} />}
    </div>
  );
};
