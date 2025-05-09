import { InputHTMLAttributes } from 'react';

interface IInputProps {
    name: string;
    erros?: string[];
}

export default function Input({
    erros = [],
    ...rest
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className='flex flex-col gap-2'>
            {/* Input */}
            <input
                type='text'
                {...rest}
                className='px-2 bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400'
            />
            {/* validation MSG */}
            {erros?.map((error, index) => (
                <p key={index} className='text-red-500 font-medium'>
                    {error}
                </p>
            ))}
        </div>
    );
}
