export class Image {
    constructor(
       public readonly id: string,
       public readonly subtitle: string,
       public readonly author: string,
       public readonly date: string,
       public readonly tags: [],
       public readonly file: string,
       public readonly collection: string,
    ) { }
 
 }
 
 export interface ImageInputDTO {
   subtitle: string;
   author: string;
   tags: [];
   file: string;
   collection: string
 }
 
 export interface AuthenticationData {
    id: string;
 }

