
export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<string> => {
  const response = await fetch('/api/edit-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64Image,
      prompt: prompt,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to process image');
  }

  const data = await response.json();
  return data.imageUrl;
};
