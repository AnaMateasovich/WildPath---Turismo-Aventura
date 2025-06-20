import axios from "axios";
import imageCompression from "browser-image-compression";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";
import api from "../axios";

export const saveEnterprise = async (enterprise, selectedEnterpriseId) => {
  if (selectedEnterpriseId) return selectedEnterpriseId;
  const token = localStorage.getItem("token");

  const res = await api.post(`${API_URL}/admin/enterprises`, enterprise, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = localStorage.getItem("token");

  const res = await api.post(`${API_URL}/admin/packages`, packageData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = localStorage.getItem("token");

  return api.post(`${API_URL}/admin/includes/bulk`, formDataIncludes, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = localStorage.getItem("token");

  return api.post(`${API_URL}/admin/packages/images`, formDataImages, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveDatesAvailable = async (datesAvailable, packageId) => {
  const data = datesAvailable.map((date) => ({ ...date, packageId }));
  const token = localStorage.getItem("token");

  return api.post(`${API_URL}/admin/datesavailable`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveRequirements = async (requirements, packageId) => {
  const data = requirements.map((req) => ({ ...req, packageId }));
  const token = localStorage.getItem("token");

  return api.post(`${API_URL}/admin/requirements`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const saveSchedule = async (schedule, packageId) {
//   const data = schedule.map((req) => )
// }
