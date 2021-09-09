import { EmojiData, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

interface IEmojiPickerProps {
    onSelect: (emoji: EmojiData) => void
}

const EmojiPicker: React.FC<IEmojiPickerProps> = (props) => {
    return <Picker title="Pick an emoji" emoji="point_up" onSelect={(emoji) => props.onSelect(emoji)} />
}

export default EmojiPicker
