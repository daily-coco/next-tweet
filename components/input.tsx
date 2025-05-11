import { InputHTMLAttributes } from 'react';

interface IInputProps {
  name: string;
  erros?: string[];
  updatedFields?: string[];
}

export default function Input({
  name,
  erros = [],
  updatedFields = [],
  className = '',
  ...rest
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const isUpdated = updatedFields.includes(name);
  const highlightStyle = isUpdated ? 'border-green-500 bg-green-50' : '';
  return (
    <div className='flex flex-col gap-2'>
      {/* Input */}
      <input
        id={name}
        name={name}
        {...rest}
        className={`${highlightStyle} ${className}`}
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
