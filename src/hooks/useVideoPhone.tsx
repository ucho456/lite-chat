import React from "react";

const useVideoPhone = () => {
  const getMedia = async () => {
    const constraints = { audio: true, video: true };

    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return { getMedia };
};

export default useVideoPhone;
