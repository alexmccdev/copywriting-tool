import React, { useEffect, useState } from 'react'
import { HiOutlineClipboardCopy, HiOutlineEmojiHappy, HiOutlineTrash } from 'react-icons/hi'

interface ICopywriteTextAreaProps {
    onDelete: () => void
    onUpdate: (updateData: CopyData) => void
    data: CopyData
}

export type CopyData = {
    id: number
    title: string
    copy: string
    countType: 'word' | 'char' | 'charSpace'
}

const CopywriteTextArea: React.FC<ICopywriteTextAreaProps> = ({ onDelete, onUpdate, data }) => {
    const [title, setTitle] = useState<string>(data.title)
    const [copy, setCopy] = useState<string>(data.copy)
    const [countType, setCountType] = useState<'word' | 'char' | 'charSpace'>(data.countType)

    const [wordCount, setWordCount] = useState<number>(0)
    const [charCount, setCharCount] = useState<number>(0)
    const [charSpaceCount, setCharSpaceCount] = useState<number>(0)

    const [copied, setCopied] = useState<boolean>(false)
    const [emojiVisible, setEmojiVisible] = useState<boolean>(false)

    useEffect(() => {
        setWordCount(copy.match(/(\w+)/g)?.length || 0)
        setCharCount(copy.replace(/\s+/g, '').length)
        setCharSpaceCount(copy.length)
    }, [copy])

    const displayCopied = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const handleUpdate = () => {
        onUpdate({ id: data.id, copy, title, countType })
    }

    useEffect(() => {
        handleUpdate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, copy, countType])

    return (
        <div className="flex p-8 my-4 border-b">
            <div className="flex flex-col w-1/6">
                <input
                    type="text"
                    className="flex-grow-0 p-2 border-b"
                    placeholder="Copy title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p className="p-2 text-3xl">
                    {countType === 'word' && wordCount}
                    {countType === 'char' && charCount}
                    {countType === 'charSpace' && charSpaceCount}
                </p>
            </div>

            <textarea
                className="flex-grow w-full p-2 mx-8 border rounded-sm"
                placeholder="Your copy here..."
                value={copy}
                onChange={(e) => setCopy(e.target.value)}
                spellCheck={true}
            />
            <div className="flex flex-col">
                <select
                    className="p-2 border rounded-sm"
                    value={countType}
                    onChange={(e) => setCountType(e.target.value as 'word' | 'char' | 'charSpace')}
                >
                    <option value="word">Word</option>
                    <option value="charSpace">Characters + spaces</option>
                    <option value="char">Characters - spaces</option>
                </select>
                <div className="flex justify-end mt-8">
                    <div className="relative flex h-full p-2 rounded-full cursor-pointer">
                        <span
                            role="button"
                            className=""
                            onClick={() => {
                                navigator.clipboard.writeText(copy)
                                displayCopied()
                            }}
                        >
                            <HiOutlineClipboardCopy size={'1.5rem'} />
                        </span>
                        <div
                            className={`transition-opacity duration-150 ease-out text-xs p-2 absolute flex justify-center rounded-sm top-10 -left-4 -right-3 bg-black dark:bg-white dark:text-black text-gray-200 ${
                                copied ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            Copied!
                        </div>
                    </div>
                    <span
                        role="button"
                        className="flex items-center h-full p-2 rounded-full cursor-pointer"
                        onClick={onDelete}
                    >
                        <HiOutlineTrash size={'1.5rem'} />
                    </span>
                    <span
                        role="button"
                        className="flex items-center h-full p-2 rounded-full cursor-pointer"
                        onClick={() => setEmojiVisible((prev) => !prev)}
                    >
                        <HiOutlineEmojiHappy size={'1.5rem'} />
                    </span>
                    {/* <div
                        className={`absolute ${
                            emojiVisible ? 'transition-all h-full opacity-100 mt-12' : 'opacity-0 h-0 transition-all'
                        }`}
                    >
                        <EmojiPicker />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CopywriteTextArea
