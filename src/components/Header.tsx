interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
    return (
        <header className="flex items-center justify-between w-full h-16 p-8 border-b">
            <h1 className="text-xl font-bold">Fuckin&apos; Copy Bro</h1>
            Settings
        </header>
    )
}

export default Header
