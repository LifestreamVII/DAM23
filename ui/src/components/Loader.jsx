export default function Loader({fullscreen}) {

    return (
        <div className={`loader ${fullscreen ? 'loader--fullscreen' : ''}`}>
            <div className="spinner"></div>
        </div>
    )
}