import {MediaCard, NewItemCard} from "../../components/back-office/ItemCard"
import PopUp from "../../components/back-office/PopUp"
import { useParams } from "react-router-dom"

export default function Medias({children}) {
    return (
        <div className="medias">
            <h1 className="back-office__title"><span>Médias</span></h1>
            <MediasList />
            {children}
        </div>
    )
}

export function MediasList() {
        
    return (
        <section className="back-office__container">
            <NewItemCard page="medias" text="Nouveau média" />
            <MediaCard id="1" name="video-masterclasse.mp4" description="Masterclasse de Miriam Fried" mime="mp4" size="50 Mo" />
            <MediaCard id="2" name="video-masterclasse.mp4" description="Masterclasse de Miriam Fried" mime="mp4" size="50 Mo" />
            <MediaCard id="3" name="video-masterclasse.mp4" description="Masterclasse de Miriam Fried" mime="mp4" size="50 Mo" />
            <MediaCard id="4" name="video-masterclasse.mp4" description="Masterclasse de Miriam Fried" mime="mp4" size="50 Mo" />
            <MediaCard id="5" name="video-masterclasse.mp4" description="Masterclasse de Miriam Fried" mime="mp4" size="50 Mo" />
        </section>
    )
}

export function Media() {

    const { id } = useParams()

    return (
        <Medias>
            <PopUp>
                <div className="pop-up__element">
                    <p><span className="pop-up__subtitle">mp4</span> - 54 Mo</p>
                    <h2 className="pop-up__title">Masterclasse de Miriam Fried</h2>
                    <a className="pop-up__file pop-up__text" href="file" download><strong>DOWNLOAD</strong> - [File name]</a>
                </div>
            </PopUp>
        </Medias>
    )
}