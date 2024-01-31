import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { result } from "lodash";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request: Request) {
  const data = await request.formData();
  const images = data.getAll("photos");
  const folderName = "Places_airbnb";
  if (
    !images ||
    images.length === 0 ||
    !images.every((img) => img instanceof File)
  ) {
    return NextResponse.json(
      { error: "No se proporcionaron archivos de imagen válidos" },
      { status: 400 }
    );
  }

  async function getImageBuffer(image: File): Promise<Buffer> {
    const arrayBuffer = await image.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
  try {
    const uploadPromises = images.map(async (image) => {
      if (image instanceof File) {
        const fileBuffer = await getImageBuffer(image);

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: folderName,
              },
              (err, result) => {
                if (err) reject(err);
                resolve(result);
              }
            )
            .end(fileBuffer);
        });
      } else {
        throw new Error("No se proporcionó un archivo de imagen válido");
      }
    });

    const results = await Promise.all(uploadPromises);

    console.log(results);
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
