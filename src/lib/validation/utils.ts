// utils.ts

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Password must be at least 8 characters long and include at least one special character
  const passwordRegex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(password);
}
