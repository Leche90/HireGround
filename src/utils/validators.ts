export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
export const isNotEmpty = (value: string | null | undefined): boolean => 
    value != null && value.trim().length > 0;
  