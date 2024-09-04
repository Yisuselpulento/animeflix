export function formatDate(isoDate) {
    const date = new Date(isoDate);
  
 
    const day = date.getUTCDate();
    const month = date.toLocaleString('es-ES', { month: 'long' }); 
    const year = date.getUTCFullYear();
  

    return `${day} de ${month} de ${year}`;
  }
  
