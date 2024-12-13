export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua 
                border-none rounded-full font-semibold text-xs text-white uppercase tracking-widest 
                hover:from-purpleMid hover:to-purpleTua hover:via-purpleTua
                active:from-purpleTua active:to-purpleTua
                focus:from-purpleMid focus:to-purpleTua
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