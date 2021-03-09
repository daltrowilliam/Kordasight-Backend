import { BaseDatabase } from "./BaseDatabase";
import { Image } from "../business/entities/Image";
import { CustomError } from "../business/error/CustomError";

export class ImageDatabase extends BaseDatabase {

   private static TABLE_NAME = "kordasights_images";

   private static toImageModel(image: any): Image {
      return new Image(
         image.id,
         image.subtitle,
         image.author,
         image.date,
         image.tags,
         image.file,
         image.collection
      );
   }


   public async registryImage(
      id: string,
      subtitle: string,
      author: string,
      date: string,
      tags: [],
      file: string,
      collection: string
   ): Promise<void> {
      try {
         await BaseDatabase.connection
            .insert({
               id,
               subtitle,
               author,
               date,
               tags,
               file,
               collection
            })
            .into(ImageDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }



   public async getImageById(id: string): Promise<Image> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${ImageDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `)

         return ImageDatabase.toImageModel(result[0][0]);

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getAllImages(): Promise<Image> {
      try {
         
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${ImageDatabase.TABLE_NAME};
         `)

         return result[0];

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async deleteImageById(id: string): Promise<any> {
      try {
         await BaseDatabase.connection.raw(`
            DELETE FROM ${ImageDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `)

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}