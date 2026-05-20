import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
export type ButtonFont = 'sans' | 'mono' | 'serif';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'pill' | 'square';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'children'> {
  label?: string; 
  variant?: ButtonVariant;
  font?: ButtonFont;
  size?: ButtonSize;
  shape?: ButtonShape; 
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean; 
  fullWidth?: boolean; 
  color?: string; 
  
  // RECOMENDACIÓN: Si el botón es SOLO ícono (no hay label), obligar por accesibilidad a pasar un aria-label.
  // Como heredas de ButtonHTMLAttributes, 'aria-label' ya existe, pero está bueno documentarlo en tu equipo.
}