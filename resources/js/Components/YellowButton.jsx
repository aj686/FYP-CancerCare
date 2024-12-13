export default function YellowButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400
                border-none rounded-full font-semibold text-xs text-purpleTua uppercase tracking-widest 
                hover:from-yellow-300 hover:to-yellow-500 hover:via-yellow-400
                active:from-yellow-400 active:to-yellow-500
                focus:from-yellow-300 focus:to-yellow-400
                focus-visible:outline-none
                disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-400
                transition-all duration-300 ease-in-out ${
                    disabled && 'opacity-40 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}