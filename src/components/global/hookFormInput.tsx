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
            render={({ field, fieldState }) => (
                <div>
                    <input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className={`text-black border p-2 rounded w-full ${fieldState.error ? 'border-red-500' : ''} ${className}`}
                    />
                    {fieldState.error && (
                        <span className="text-xs text-red-600">{fieldState.error.message}</span>
                    )}
                </div>
            )}
        />
    );
}
