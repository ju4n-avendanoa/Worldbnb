export async function deletePhotos(photoId: string) {
  await fetch("/api/photos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(photoId),
  });
}
