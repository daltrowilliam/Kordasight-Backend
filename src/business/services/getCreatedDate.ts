/* Esta função retorna a data de criação de um elemento.
Deve ser informado 1 ou 2 como parâmetros para os respectivos formatos

// Formatação de saída da data
created_at: new Date(result[0].created_at).toLocaleDateString(),

*/

export const getCreatedDate = (
    format: number
 ): string => {
 
    const date = new Date();
    const day = date.getDate();           
    const month = date.getMonth() + 1;    
    const year = date.getFullYear();
    let created_date: string = ""
 
    switch (format) {
       case 1:
          created_date = year + '/' + month + '/' + day
          break;
       case 2:
          created_date = day + '/' + month + '/' + year
          break;
       default:
          created_date = year + '/' + month + '/' + day
          break;
    }
 
    return created_date
 }