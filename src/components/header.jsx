import { UserButton } from "@stackframe/stack";



export default function Header() {
    return (
        <header className="flex justify-between items-center p-6">
            <h1 className="font-bold text-2xl"></h1>
            <UserButton />
        </header>
    );
}


