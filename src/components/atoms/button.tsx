import React from 'react';
import type { ButtonProps } from '../../types/button';

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  font = 'sans', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  color = '#007bff' // Color por defecto para primary
}) => {
  return (
    <button 
      // Un poquito irónico que limites el style afuera pero lo claves acá adentro, ¿no?
      style={{ padding: '8px 16px', borderRadius: '12px', background: color, cursor: 'pointer', border: 'none', color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center' }} 
    >
      {icon && iconPosition === 'left' && <span style={{ marginRight: '8px' }}>{icon}</span>}
      {label}
      {icon && iconPosition === 'right' && <span style={{ marginLeft: '8px' }}>{icon}</span>}
    </button>
  );
};