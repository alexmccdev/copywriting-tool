import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

interface IEmojiPickerProps {}

const EmojiPicker: React.FC<IEmojiPickerProps> = (props) => {
    return <Picker title="Pick an emoji" emoji="point_up" />
}

export default EmojiPicker
