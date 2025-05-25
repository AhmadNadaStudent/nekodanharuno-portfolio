import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    className?: string;
}

export default function AppLogo({ className }: AppLogoProps = {}) {
    return (
        <div className={`flex items-center ${className}`}>
            <div className="bg-primary flex aspect-square h-8 w-8 items-center justify-center rounded-md">
                <AppLogoIcon className="h-5 w-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-2 flex-1 text-left">
                <span className="font-display text-xl font-semibold">Nekodan</span>
            </div>
        </div>
    );
}
