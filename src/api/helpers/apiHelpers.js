import axios from "axios";
import { category } from "../../data/db";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";
import imageCompression from "browser-image-compression";

export const saveEnterprise = async (enterprise, selectedEnterpriseId) => {
  if (selectedEnterpriseId) return selectedEnterpriseId;

  const res = await axios.post(`${API_URL}/enterprises`, enterprise);
  return res.data.id;
};

export const savePackage = async (pack, enterpriseId) => {
  const packageData = {
    name: pack.name,
    categoryId: Number(pack.category),
    placeId: Number(pack.place),
    duration: pack.duration,
    latitude: pack.latitude,
    longitude: pack.longitude,
    locationAddress: pack.locationAddress,
    pricePerPerson: parseFloat(pack.pricePerPerson),
    difficulty: pack.difficulty,
    discount: pack.discount,
    cancelPolicy: pack.cancelPolicy,
    description: pack.description,
    enterpriseId,
  };

  const res = await axios.post(`${API_URL}/packages`, packageData);
  return res.data.id;
};

export const saveIncludes = async (packageIncludes, packageId) => {
  const formDataIncludes = new FormData();

  const jsonBlob = new Blob(
    [
      JSON.stringify(
        packageIncludes.map((include) => ({
          packageId,
          description: include.item,
        }))
      ),
    ],
    { type: "application/json" }
  );
  formDataIncludes.append("data", jsonBlob);

  for (const include of packageIncludes) {
    if (include.icon) {
      const compressedIcon = await imageCompression(include.icon, {
        fileType: "image/webp",
        maxSizeMB: 0.1,
        maxWidthOrHeight: 30,
        quality: 70,
        useWebWorker: true,
      });

      const originalName = include.icon.name?.split(".")[0] || "icon";
      const iconFile = new File([compressedIcon], `${originalName}.webp`, {
        type: "image/webp",
      });

      formDataIncludes.append("icon", iconFile);
    }
  }
  return axios.post(`${API_URL}/includes/bulk`, formDataIncludes);
};

export const saveImages = async (images, packageId) => {
  const formDataImages = new FormData();

  for (const image of images) {
    const compressed = await imageCompression(image, {
      fileType: "image/webp",
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const originalName = image.name?.split(".")[0] || "image";
    const file = new File([compressed], `${originalName}.webp`, {
      type: "image/webp",
    });

    formDataImages.append("file", file);
  }

  formDataImages.append("packageId", packageId);
  return axios.post(`${API_URL}/packages/images`, formDataImages);
};

export const saveDatesAvailable = async (datesAvailable, packageId) => {
  const data = datesAvailable.map((date) => ({ ...date, packageId }));
  return axios.post(`${API_URL}/datesavailable`, data);
};

export const saveRequirements = async (requirements, packageId) => {
  const data = requirements.map((req) => ({ ...req, packageId }));
  return axios.post(`${API_URL}/requirements`, data);
};


// export const saveSchedule = async (schedule, packageId) {
//   const data = schedule.map((req) => )
// }
