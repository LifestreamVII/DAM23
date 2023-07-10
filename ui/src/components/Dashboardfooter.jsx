import React from 'react';

const styles = {
    container :{
        padding: 'auto',
        backgroundColor: '#f5f5f5',
    },
    p: {
        textalign:'center',
    },
};

function Dashboardfooter(){
    return(
        <footer className='Dashboardfooter'>
            <div style={styles.container} className='container'>
            <p style={styles.p}>Saline Royale Academy</p>
            </div>
        </footer>
    );
}
export default Dashboardfooter;