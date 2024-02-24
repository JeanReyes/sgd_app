export const formatPrice = (number: any) => {
    return Number(number).toLocaleString('es-CL'); // Puedes ajustar el idioma según tus necesidades
};

export const formatDateToDdMmYyyy = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}-${month}-${year}`;
  }