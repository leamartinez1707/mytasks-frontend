const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="text-red-500 font-bold text-sm"
        >{children}</div>
    )
}

export default ErrorMessage