import CopywriteTextArea, { CopyData } from '@components/CopywriteTextArea'
import Layout from '@components/Layout'
import useLocalStorage from '@hooks/useLocalStorage'
import type { NextPage } from 'next'

const Home: NextPage = () => {
    const [textAreas, setTextAreas] = useLocalStorage<CopyData[]>('copy-items', [
        { id: new Date().getTime(), title: '', copy: '', countType: 'word' },
    ])

    return (
        <Layout title="Home" template="one-col">
            <div>
                {textAreas.map((ta) => (
                    <CopywriteTextArea
                        key={ta.id}
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
                        data={ta}
                    />
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
