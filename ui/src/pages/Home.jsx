import CourseCard from "../components/CourseCard";
import headerImg from "../assets/images/header-image-min.jpg";
import Carousel from "../components/Carousel";

const pianoCourse = {
    id: 1,
    preview: "https://www.youtube.com/embed/9bZkp7q19f0",
    title: "Concerto No. 5 in A Major, 1st movement",
    professor: "Miriam Fried",
    description: "Miriam Fried opens this masterclass with a discourse on Anatol Janos Toth's interpretation of a cadenza, underlining the importance of playing a clear ending by setting a trajectory from the very beginning. With this, they discuss the jovial and humorous character of the composition, and how to express this in student’s playing. Miriam Fried articulates that one should not ‘try too hard' and focus on simplicity in order to truly capture the comical nature of this concerto. Additionally, the professor and student touch upon harmony, the traditional classical shape of a phrase, bowing distribution, and the value of reflecting upon the kind of sound one needs to assert in order to communicate clear ideas to the orchestra and to the audience.",
    type: "Cours",
    instrument: "Piano",
    duration: 1.20,
    difficulty: "Difficile"
}

export default function Home() {

    return (
        <div className="home">
            <header className="home__header">
                <img className="home__hero" src={headerImg} alt="" />
                <h1>Faites partie des meilleurs musiciens au monde</h1>
            </header>
            <main className="home__content">
                <section>
                    <h2 className="container-center">Nouveautés</h2>
                    <Carousel>
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                        <CourseCard course={pianoCourse} />
                    </Carousel>
                </section>
            </main>
        </div>
    )
}
