import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/firebase";

export const uploadImageAndGetUrl = async (
  path: string,
  base64Image: string,
): Promise<string> => {
  console.log({ base64Image });
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64Image, "data_url");
  return await getDownloadURL(storageRef);
};
