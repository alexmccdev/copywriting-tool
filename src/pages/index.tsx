import CopywriteTextArea, { CopyData } from '@components/CopywriteTextArea'
import Layout from '@components/Layout'
import useLocalStorage from '@hooks/useLocalStorage'
import type { NextPage } from 'next'
import React, { useState } from 'react'

const Home: NextPage = () => {
    const [textAreas, setTextAreas] = useLocalStorage<CopyData[]>('copy-items', [
        { id: new Date().getTime(), title: '', copy: '', countType: 'word' },
    ])

    const [emojiMart, setEmojiMart] = useState<number | null>(null)

    return (
        <Layout title="Home" template="one-col">
            <div>
                {textAreas.map((ta) => (
                    <div key={ta.id}>
                        <CopywriteTextArea
                            onDelete={() => setTextAreas((prev) => prev.filter((x) => x !== ta))}
                            onUpdate={(updateData: CopyData) =>
                                setTextAreas((prev) =>
                                    prev.map((ta) => {
                                        if (ta.id === updateData.id) {
                                            return { ...ta, ...updateData }
                                        }

                                        return ta
                                    })
                                )
                            }
                            toggleEmojiMart={() =>
                                setEmojiMart((prev) => {
                                    return prev === ta.id ? null : ta.id
                                })
                            }
                            emojiMartVisible={ta.id === emojiMart}
                            data={ta}
                        />
                    </div>
                ))}
            </div>

            <div className="flex">
                <span
                    role="button"
                    className="p-2 text-white bg-black rounded-sm cursor-pointer"
                    onClick={() =>
                        setTextAreas((prev) => [
                            ...prev,
                            { id: new Date().getTime(), title: '', copy: '', countType: 'word' },
                        ])
                    }
                >
                    + Add new
                </span>
            </div>
        </Layout>
    )
}

export default Home
