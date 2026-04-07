import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon: Icon,
    className = '',
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;
    const widthClass = fullWidth ? 'btn-full' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
            {...props}
        >
            {Icon && <Icon className="btn-icon" size={size === 'sm' ? 16 : 20} />}
            {children}
        </button>
    );
};

export default Button;
