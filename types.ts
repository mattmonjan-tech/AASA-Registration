
export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  district: string;
  state: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export interface ImageEditState {
  uploadedImages: string[];
  selectedImageIndex: number;
  editedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}