import { Controller } from "react-hook-form";


export default function HookFormInput({
    name,
    control,
    type = 'text',
    placeholder = '',
    className = '',
    }: {
    name: string;
    control: any;
    type?: string;
    placeholder?: string;
    className?: string;
    }) {
    return (
        <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <input
            type={type}
            placeholder={placeholder}
            {...field}
            className={`text-black border p-2 rounded ${className}`}
            />
        )}
        />
    );
    }
