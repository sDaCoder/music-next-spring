'use client'
import { Activity, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

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
                    <h1 className='text-2xl font-bold'>sToones</h1>
                </div>
                <div>
                    {mounted && (
                        <Button 
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            variant={'outline'}
                            className='rounded-full'
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