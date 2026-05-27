import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {

    return (
        <button type={type} className={`rounded-xl px-5 py-3 text-base font-medium shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
