'use client'
import { Activity, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'

const Navbar: React.FC = () => {
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <>
            <nav className='p-4 border-b shadow-lg flex justify-between items-center'>
                <div 
                    className='flex items-center gap-4 gap-x-2 px-3 cursor-pointer'
                    onClick={() => router.push('/')}
                >
                    <Activity />
                    <h1 className='text-2xl font-bold'>Musix</h1>
                </div>
                <div className='md:flex items-center gap-3 hidden'>
                    <Input
                        className='w-[30vw] rounded-2xl px-6 py-4' 
                        placeholder="What's in your mind?"
                    />
                    <Button variant={'outline'} className='rounded-full py-4'>
                        <Search />
                    </Button>
                </div>
                <div>
                    {mounted && (
                        <Button 
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            variant={'outline'}
                            className='rounded-full p-2'
                        >
                            {theme === 'light' ? <Sun /> : <Moon />}
                        </Button>
                    )}
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar