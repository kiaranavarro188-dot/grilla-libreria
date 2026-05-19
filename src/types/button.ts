import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
export type ButtonFont = 'sans' | 'mono' | 'serif';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'pill' | 'square';

// Heredamos todo lo nativo, pero prohibimos style y children para tener control total
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'children'> {
  label?: string; // Ahora es opcional por si quieren un botón que sea SOLO ícono
  variant?: ButtonVariant;
  font?: ButtonFont;
  size?: ButtonSize;
  shape?: ButtonShape; // <--- Controlar la forma sin dar acceso a borderRadius
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean; // <--- Estado de carga
  fullWidth?: boolean; // <--- Ocupar el 100% del contenedor
  color?: string; // <--- Permitir personalizar el fondo sin exponer style completo 
}
