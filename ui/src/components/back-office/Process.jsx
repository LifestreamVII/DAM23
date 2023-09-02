import { Link, useParams } from "react-router-dom"

const steps = [
	"programmation",
	"captation",
	"post-production",
	"editorial",
	"publication"
]

export function GetStepsNavigation() {

	const { step } = useParams()

	const currentStep = steps.indexOf(step)
	const previousStep = currentStep < 1 ? currentStep : steps[currentStep - 1]
	const nextStep = currentStep > steps.length - 2 ? "" : steps[currentStep + 1]
	const isFirst = currentStep < 1
	const isLast= currentStep > steps.length - 2

	return (
		{
			previous: previousStep,
			next: nextStep,
			isFirst,
			isLast,
			current: step
		}
	)
}

export default function Process() {

	const { step } = useParams()

	return (
		<div className="process">
			{steps.map((item, index) => <Step key={index} name={item} current={step === item} />)}
		</div>
	)
}

export function Step({current, name}) {

    const { id } = useParams()
	const location = `/admin/projects`

	return (
		<Link to={`/admin/projects/${id}/${name}`} state={{ from: location }} className={`step ${current ? 'step--current' : ''}`}>
			<span className="step__name">{name}</span>
			<svg className="step__arrow" viewBox="0 0 27 46" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M27 22.9994L24.789 20.697L4.81214 -9.69862e-07L1.70607e-06 4.60479L17.7652 23L9.79065e-08 41.3952L4.81214 46L24.789 25.303L27 22.9994Z" fill="black"/>
			</svg>
		</Link>
	)
}