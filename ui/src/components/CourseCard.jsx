function truncateString(str, maxLength) {
    return str.substring(0, maxLength)
}

export default function CourseCard({course}) {

    const descrition = `${truncateString(course.description, 80)}...`

    return (
        <a href={`/cours/${course.id}`} className="course-card">
            <div className="course-card__preview"></div>
            <div className="course-card__content">
                <div className="course-card__properties">
                    <p className="course-card__type">{course.type} - {course.instrument}</p>
                    <p className="course-card__infos">{course.duration} <span>|</span> {course.difficulty}</p>
                </div>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__professor">{course.professor}</p>
                <p className="course-card__description">{descrition}</p>
            </div>
        </a>
    )
}