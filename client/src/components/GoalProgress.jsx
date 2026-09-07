import {useState, useEffect} from "react";


function GoalProgress(){
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() =>{
        const today = new Date().toISOString().split('T')[0];
        
        fetch(`http://localhost:5000/api/goal/:${today}`)
        .then((res) =>{
            if(!res.ok) throw new Error('Error while fetching today CF Stats');
            return res.json();
        })
        .then((json) =>{
            setProgress(json);
            setLoading(false);
        })  
        .catch((e) => {
            setError(e);
            setLoading(false);
            console.error('Unexpected error occured while fetcing the progress');
        })
    }, [date]);


    if(loading == true){
        return <div>Loading your Progress...</div>
    }  

    if(error != null){
        return <div>Unexpected error occured: {error.message}</div>
    }

    if(!progress){
        return <div>No progress found.</div>
    }

  return(
    <div>
       <h2>{progress.rating}</h2>
       <h2>{progress.solved}</h2>
       <h2>{progress.required}</h2>
       <p>{progress.met}</p>

    </div>
  )

}

export default GoalProgress;