import { forwardRef, useState, useRef, useEffect } from 'react'
import { data as emojiList } from '../data'
import EmojiSearch from './emojiSearch'
import EmojiButton from './emojiButton'
import styles from './emojiPicker.module.scss'

export function EmojiPicker(props, inputRef) {
  const [isOpen, setIsOpen] = useState(false)
  const [emojis, setEmojis] = useState(emojiList)

  const containerRef = useRef(null)

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setEmojis([...emojiList])
      }
    })
  }, [])

  function handleOnClickOpen() {
    setIsOpen(!isOpen)
  }

  function handleOnSearch(e) {
    const q = e.target.value.toLowerCase()
    //console.log(q)
    if (!!q) {
      const search = emojiList.filter((emoji) => {
        return (
          emoji.name.toLowerCase().includes(q) |
          emoji.keywords.toLowerCase().includes(q)
        )
      })

      //console.log(search)
      setEmojis(search)
    } else {
      setEmojis(emojiList)
    }
  }

  function handleOnClickEmoji(emoji) {
    //console.log(emoji)
    const cursorPos = inputRef.current.selectionStart
    const text = inputRef.current.value
    const prev = text.slice(0, cursorPos)
    const next = text.slice(cursorPos)
    const newText = prev + emoji.symbol + next

    inputRef.current.value = newText
    inputRef.current.selectionStart = cursorPos + emoji.symbol.length
    inputRef.current.selectionEnd = inputRef.current.selectionStart
    inputRef.current.focus()
  }

  /*
  function EmojiPickerContainer() {
    return (
      <div>
        <EmojiSearch onSearch={handleOnSearch} />
        <div>
          {emojiList.map((emoji) => (
            <div key={emoji.symbol}>{emoji.symbol}</div>
          ))}
        </div>
      </div>
    )
  }
  */

  return (
    <div ref={containerRef} className={styles.inputContainer}>
      <button onClick={handleOnClickOpen} className={styles.emojiPickerButton}>
        😊
      </button>
      {isOpen ? (
        <div className={styles.emojiPickerContainer}>
          <EmojiSearch onSearch={handleOnSearch} />
          <div className={styles.emojisList}>
            {emojis.map((emoji) => (
              <EmojiButton
                key={emoji.symbol}
                emoji={emoji}
                onClick={handleOnClickEmoji}
              />
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default forwardRef(EmojiPicker)
