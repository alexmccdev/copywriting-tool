import { useEffect } from 'react'

const useClickOutside = (ref: any, fn: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref?.current && !ref.current.contains(event.target)) {
                fn()
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, fn])
}

export default useClickOutside
