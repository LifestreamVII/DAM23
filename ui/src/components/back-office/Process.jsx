export default function Process() {
    return (
       <div className="process">
            <Step current={true} name="programmation" />
            <Step current={false} name="Captation" />
            <Step current={false} name="Post-production" />
            <Step current={false} name="Editorial" />
            <Step current={false} name="Publication" />
       </div>
    )
}

export function Step({current, name}) {
    return (
        <div className={`step ${current ? 'step--current' : ''}`}>
            <span className="step__name">{name}</span>
            <svg className="step__arrow" viewBox="0 0 27 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 22.9994L24.789 20.697L4.81214 -9.69862e-07L1.70607e-06 4.60479L17.7652 23L9.79065e-08 41.3952L4.81214 46L24.789 25.303L27 22.9994Z" fill="black"/>
            </svg>
        </div>
    )
}