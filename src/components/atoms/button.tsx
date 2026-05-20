import React from 'react';
import type { ButtonProps } from '../../types/button';

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  font = 'sans', 
  size = 'md', 
  shape = 'default',      // Agregado
  icon, 
  iconPosition = 'left',
  isLoading = false,      // Agregado
  fullWidth = false,      // Agregado
  color,
  ...rest                 // ¡CRUCIAL! Acá vienen el onClick, type, disabled, aria-label, etc.
}) => {

  // Mapeos para darle funcionalidad real a los atributos que estaban de adorno
  const sizeStyles = {
    sm: { padding: '4px 8px', fontSize: '12px' },
    md: { padding: '8px 16px', fontSize: '14px' },
    lg: { padding: '12px 24px', fontSize: '16px' }
  };

  const shapeStyles = {
    default: '8px',
    pill: '9999px', // Para que quede totalmente redondeado en los bordes
    square: '0px'
  };

  const fontStyles = {
    sans: 'sans-serif',
    mono: 'monospace',
    serif: 'serif'
  };

  // Lógica para el color de fondo si no te pasan un color por prop
  const getBackgroundColor = () => {
    if (color) return color;
    const variantColors: Record<string, string> = {
      primary: '#007bff',
      secondary: '#6c757d',
      danger: '#dc3545',
      success: '#28a745',
      outline: 'transparent',
      ghost: 'transparent'
    };
    return variantColors[variant] || '#007bff';
  };

  // Determinar si el botón está deshabilitado
  const isDisabled = isLoading || rest.disabled;

  return (
    <button 
      {...rest} // Expandimos las props nativas para que el botón viva y respire
      disabled={isDisabled}
      style={{ 
        padding: sizeStyles[size].padding, 
        borderRadius: shapeStyles[shape], 
        background: getBackgroundColor(), 
        fontFamily: fontStyles[font],
        width: fullWidth ? '100%' : 'auto', // Lógica de fullWidth
        cursor: isDisabled ? 'not-allowed' : 'pointer', 
        border: variant === 'outline' ? '1px solid currentColor' : 'none', 
        color: variant === 'outline' || variant === 'ghost' ? (color || '#007bff') : '#fff', 
        fontSize: sizeStyles[size].fontSize, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', // Centra el contenido, vital si usas fullWidth
        opacity: isDisabled ? 0.6 : 1, // Feedback visual si está deshabilitado o cargando
        transition: 'all 0.2s ease-in-out'
      }} 
    >
      {/* Si está cargando, mostramos un indicador y ocultamos el ícono izquierdo temporalmente */}
      {isLoading && <span style={{ marginRight: label ? '8px' : '0' }}>⏳</span>}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span style={{ marginRight: label ? '8px' : '0' }}>{icon}</span>
      )}
      
      {label}
      
      {/* El ícono derecho sigue la misma lógica */}
      {!isLoading && icon && iconPosition === 'right' && (
        <span style={{ marginLeft: label ? '8px' : '0' }}>{icon}</span>
      )}
    </button>
  );
};