import React from 'react';
import './Input.css';

const Input = React.forwardRef(({
    label,
    error,
    hint,
    icon: Icon,
    fullWidth = true,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`input-wrapper ${fullWidth ? 'input-full' : ''} ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-container">
                {Icon && <Icon className="input-icon" size={18} />}
                <input
                    ref={ref}
                    className={`input-field ${Icon ? 'has-icon' : ''} ${error ? 'is-error' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
            {hint && !error && <span className="input-hint">{hint}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
