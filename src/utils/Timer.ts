interface TimeI {
    minutes : number,
    seconds : number,
  }

const Timer = (setTime:React.Dispatch<React.SetStateAction<TimeI>>) => {
    var returnId = setInterval(() => {
        let min:number=0,sec:number=0;
  
         setTime( (prev) => {
             min = prev.minutes;
             sec = prev.seconds;

             if(sec === 0) {
                 min = prev.minutes - 1;
                 sec = 60;
             }
             sec = sec - 1;
             return ({ minutes:min,seconds:sec})
         })
         if ((min === 0 && sec === 0) || (min < 0) ) {
           clearInterval(returnId)
           alert("Test is Over");
        }
     },1000) ;
   return returnId;
   }

export default Timer;