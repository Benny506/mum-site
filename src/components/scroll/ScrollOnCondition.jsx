import React, { useEffect } from "react";


export default function ScrollOnCondition(props){
    const { scrollCondition, scrollRef } = props
    
    useEffect(() => {
        if(scrollCondition){
            window.scrollTo(0, 0)
        }

        if(scrollRef){
            scrollRef.scrollTo(0, 0)
        
        }

    }, [scrollCondition])

    return (
        <div>
            {
                ...props.children
            }
        </div>
    )
}