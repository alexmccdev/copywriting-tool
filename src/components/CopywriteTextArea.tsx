import { BaseEmoji } from 'emoji-mart'
import GraphemeSplitter from 'grapheme-splitter'
import React, { useEffect, useState } from 'react'
import { HiOutlineClipboardCopy, HiOutlineEmojiHappy, HiOutlineTrash } from 'react-icons/hi'
import EmojiPicker from './EmojiPicker'

interface ICopywriteTextAreaProps {
    onDelete: () => void
    onUpdate: (updateData: CopyData) => void
    toggleEmojiMart: () => void
    emojiMartVisible: boolean
    data: CopyData
}

export type CopyData = {
    id: number
    title: string
    copy: string
    countType: 'word' | 'char' | 'charSpace'
}

const CopywriteTextArea: React.FC<ICopywriteTextAreaProps> = ({
    onDelete,
    onUpdate,
    toggleEmojiMart,
    emojiMartVisible,
    data,
}) => {
    const [title, setTitle] = useState<string>(data.title)
    const [copy, setCopy] = useState<string>(data.copy)
    const [countType, setCountType] = useState<'word' | 'char' | 'charSpace'>(data.countType)

    const [wordCount, setWordCount] = useState<number>(0)
    const [charCount, setCharCount] = useState<number>(0)
    const [charSpaceCount, setCharSpaceCount] = useState<number>(0)

    const [copied, setCopied] = useState<boolean>(false)

    useEffect(() => {
        const splitter = new GraphemeSplitter()
        setWordCount(copy.replace(/\s+/g, ' ').trim().split(' ')?.length || 0)
        setCharCount(splitter.countGraphemes(copy.replace(/\s+/g, '')))
        setCharSpaceCount(splitter.countGraphemes(copy))
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
        <div className="flex py-8 border-b">
            <div className="flex flex-col w-1/6">
                <input
                    type="text"
                    className="flex-grow-0 p-2 text-xl border-b"
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
                    <div className="relative">
                        <span
                            role="button"
                            className="flex items-center h-full p-2 rounded-full cursor-pointer"
                            onClick={toggleEmojiMart}
                        >
                            <HiOutlineEmojiHappy size={'1.5rem'} />
                        </span>
                        <div className={`absolute right-0 z-50 top-12 ${!emojiMartVisible ? 'hidden' : 'visible'}`}>
                            <EmojiPicker
                                onSelect={(emoji) => {
                                    setCopy((prev) => (prev += (emoji as BaseEmoji).native))
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CopywriteTextArea
