export default function ChapterButton({currentChapter, setCurrentChapter, chapterTitle}) {

    const isCurrent = currentChapter === chapterTitle

    return (
        <button className={`chapter-button ${isCurrent ? 'chapter-button--current' : ''}`} onClick={() => { setCurrentChapter(chapterTitle)}}>{chapterTitle}</button>
    )
}