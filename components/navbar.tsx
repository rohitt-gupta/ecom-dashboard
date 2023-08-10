import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

export const Navbar = () => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <div>Switcher</div>
        <MainNav />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};
