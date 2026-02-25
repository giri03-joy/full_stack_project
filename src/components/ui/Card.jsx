import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hoverable = false, ...props }) => {
    return (
        <div className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => (
    <div className={`card-header ${className}`}>
        <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="card-action">{action}</div>}
    </div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={`card-body ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`card-footer ${className}`}>
        {children}
    </div>
);

export default Card;
