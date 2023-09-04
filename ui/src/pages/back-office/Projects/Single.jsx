import Process, {GetStepsNavigation} from "../../../components/back-office/Process";
import PopUp from "../../../components/back-office/PopUp";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import useFetchUrl from "../../../hooks/useFetchUrl";
import { useQuery } from 'react-query'
import Loader from "../../../components/Loader";
import { messageBoxContext } from "../../../contexts/MessageBoxContext";
import Input from "../../../components/Input";
import Projects from "./Page";

export default function Project() {

    const { id } = useParams()

    const [message, setMessage] = useContext(messageBoxContext)
    const {isLast, current} = GetStepsNavigation()
    const [files, setFiles] = useState([])

    const fetchUrl = useFetchUrl()
    const navigate = useNavigate()

    function getProjectById() {
        return fetchUrl(
            `http://localhost:90/project/${id}`,
            'GET',
            {
                'Content-type': 'application/json'
            },
        ).then(response => {
            if(response.project)
                response.project.steps.map((step, index) => {
                    if(step.name !== response.project.currentStep)
                        return
                    setFiles(step.files)          
                })
                return response.project
        })
    }

    const { isLoading, isError, data, error } = useQuery('project', getProjectById)

    if (isLoading) return <Loader />
    
    if (isError) {
        setMessage(error.message)
        return
    }

    if (data.currentStep !== current) {
        navigate(`/admin/projects/${id}/${data.currentStep}`)
        return <Loader />
    }
    
    return (
        <Projects>
            <PopUp>
                <div className="pop-up__element">
                    <h3 className="pop-up__subtitle">{data.completion}</h3>
                    <h2 className="pop-up__title">{data.title}</h2>
                    <p className="pop-up__text">{data.description}</p>
                    <Process />
                    <Input type="file" value={files} setValue={setFiles}>Files</Input>
                    {files.map((file, index) => <p key={index}>{file}</p>)}
                </div>
                <div className="pop-up__buttons">
                    {/* <Link to={`/admin/projects/${id}/${previous}`} className={`btn btn--secondary ${isFirst ? 'btn--disabled' : "" }`}>Précedent</Link> */}
                    <Link to={`/admin/projects/${id}/${current}/task`} state={{ from: "/admin/projects/" }} className={`btn btn--full ${isLast ? 'btn--disabled' : "" }`}>{isLast ? 'Publier le projet' : 'Ajouter un fichier'}</Link>
                </div>
            </PopUp>
        </Projects>
    )
}