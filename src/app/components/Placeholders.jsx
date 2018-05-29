import React from 'react'; 

export const Small = ({text, classname}) => {
    return(  
        text ? 
        <small className={`${ classname }`}>{text}</small> 
        :
        <div className={`${ classname }`}>
            <div className="ph-small loading-line" style={{ width:'75%' }}></div>
        </div>
    )
}

export const Medium = ({text, classname}) => (
        Array.isArray(text) ?
            <div>
                {
                    text.map((v,k)=> {
                        return(
                            <medium className={`${ classname }`}>{v}</medium> 
                        )
                    })
                }
            </div>
        : 
        text !=null ?
            <medium className={`${ classname }`}>{text}</medium> 
        :
        <div className={`${ classname }`}>
            <div className="ph-medium loading-line" style={{ width:'70%' }}></div>
            <div className="ph-medium loading-line" style={{ width:'55%' }}></div>
        </div>
    
)

export const Big = ({text, classname}) => (
    text != null ? 
    <big className={`${ classname }`}>{text}</big> 
    :
    <div className={`ph-big loading-line ${ classname }`} style={{ width:'70%' }}></div>
)