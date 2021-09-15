interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
    return (
        <header className="flex items-center justify-between w-full h-16 p-8 border-b">
            <h1 className="text-xl font-bold">{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
        </header>
    )
}

export default Header
