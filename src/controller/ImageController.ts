import { Request, Response } from "express";
import { ImageInputDTO } from "../business/entities/Image";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { ImageBusiness } from "../business/ImageBusiness";
import { ImageDatabase } from "../data/ImageDatabase";

const imageBusiness = new ImageBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new ImageDatabase()
);

export class ImageController {
   async registryImage(req: Request, res: Response) {
      try {

         const { authorization } = req.headers

         const input: ImageInputDTO = {
            subtitle: req.body.subtitle,
            author: req.body.author,
            tags: req.body.tags,
            file: req.body.file,
            collection: req.body.collection
         }

         const registry = await imageBusiness.registryImage(input, authorization);

         res.status(200).send({ registry });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }



   async getImageById(req: Request, res: Response) {

      try {

         const id = req.params.id;

         const image = await imageBusiness.getImageById(id);

         res.status(200).send({ image });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }



async getAllImages(req: Request, res: Response) {

   try {

      const images = await imageBusiness.getAllImages();

      res.status(200).send({ images });

   } catch (error) {
      res
         .status(error.statusCode || 400)
         .send({ error: error.message });
   }
}

}