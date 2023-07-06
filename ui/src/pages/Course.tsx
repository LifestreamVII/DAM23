import { useParams } from "react-router-dom"
import video from "../assets/videos/plein-air-min.mp4"

export type CourseProps = {
    id: number,
    preview: string,
    title: string,
    professor: string,
    compositor: string,
    description: string,
    type: string,
    instrument: string,
    duration: number,
    difficulty: string
}

const course: CourseProps = {
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

    const id = useParams<{id: string}>().id

    return (
        <div className="course container-center">
            <h2 className="course__professor">{course.professor}</h2>
            <h1 className="course__title">{course.title}</h1>
            <h1 className="course__compositor">{course.compositor}</h1>

            <p className="course__description">{course.description}</p>
        </div>
    )
}