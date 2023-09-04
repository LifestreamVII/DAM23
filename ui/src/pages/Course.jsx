import { useParams, Link } from "react-router-dom"
import video from "../assets/videos/plein-air-min.mp4"
import { useState } from "react"
import ChapterButton from "../components/ChapterButton"

const course = {
    id: 1,
    preview: "https://www.youtube.com/embed/9bZkp7q19f0",
    title: "Concerto No. 5 in A Major, 1st movement",
    compositor: "Wolfgang Amadeus Mozart",
    professor: "Miriam Fried",
    description: "Miriam Fried opens this masterclass with a discourse on Anatol Janos Toth's interpretation of a cadenza, underlining the importance of playing a clear ending by setting a trajectory from the very beginning. With this, they discuss the jovial and humorous character of the composition, and how to express this in student’s playing. Miriam Fried articulates that one should not ‘try too hard' and focus on simplicity in order to truly capture the comical nature of this concerto. Additionally, the professor and student touch upon harmony, the traditional classical shape of a phrase, bowing distribution, and the value of reflecting upon the kind of sound one needs to assert in order to communicate clear ideas to the orchestra and to the audience.",
    type: "Cours",
    instrument: "Piano",
    duration: 1.20,
    difficulty: "Difficile"
}

export default function Course() {

    const [currentChapter, setCurrentChapter] = useState(1)

    const id = useParams().id

    return (
        <div className="course container-center">
            <p className="course__professor">{course.professor}</p>
            <h1 className="course__title">{course.title}</h1>
            <h2 className="course__compositor">{course.compositor}</h2>
            <div className="course__video-wrapper">
                <video className="course__video" src={video} controls></video>
                <div className="course__chapters">
                    <ChapterButton currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} chapterTitle="Chapitre 1" />
                    <ChapterButton currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} chapterTitle="Chapitre 2" />
                    <ChapterButton currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} chapterTitle="Chapitre 3" />
                    <ChapterButton currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} chapterTitle="Chapitre 4" />
                    <ChapterButton currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} chapterTitle="Chapitre 5" />
                </div>
            </div>
            <section>
                <p className="course__description">{course.description}</p>
                <a href={`/course/${id}/sheet`} download className="btn btn--primary course__btn">Télécharger la partition</a>
            </section>
        </div>
    )
}