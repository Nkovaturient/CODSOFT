import React from 'react'
import FeedsCard from '../FeedsCard'

const FeedsCategory = ({category, feed}) => {
  return (
    <>
    <div className="feeds-content" style={{marginTop: '65px'}}>
            <div className="feeds-content-header">
            <h3>{category}</h3> 
            </div>
            <div className="feeds-content-cards">
            { 
                feed.length > 0 && feed.map((item, index)=>{
                    return <FeedsCard key={index} id={item.id} 
                    title={item.title}
                     update={(item.updated).split("T")[0]} 
                      author={item.author.displayName? item.author.displayName : 'BlogX'} />
                })
            }
            </div>
        </div>
    </>
  )
}

export default FeedsCategory