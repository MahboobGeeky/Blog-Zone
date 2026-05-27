import React, {useId} from 'react'


const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
            className='mb-1 inline-block pl-1 text-sm font-medium text-slate-700'
            htmlFor={id}>
                {label}
            </label>}
            
            <input type={type} 
            className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
 
