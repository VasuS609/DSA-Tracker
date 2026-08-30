async function main(){
    const response1 = await fetch("https://codeforces.com/api/user.status?handle=Vasu.609");    
    const response2 = await fetch("https://codeforces.com/api/user.info?handles=Vasu.609");
    
    const userSubmission = await response1.json();
    // const userProfile = await response2.json();

    //todo: implement filter to result to only verdict === 'OK'
    let filteredSubmission = userSubmission.result.filter(s => s.verdict === 'OK');

    //todo: dedupe by problem.contestID + '-' + prolem.index (use set or map)
    const uniqueMap = new Map(
        filteredSubmission.map(s => [`${s.problem.contestId} - ${s.problem.index}`, s])
    )

    //todo: log the count of unique solved problem and log just first 3 deduped problem (with rating and tags)
    const uniqueSubmission = [...uniqueMap.values()];

    console.log('Unique solved count:', uniqueSubmission.length);
    console.log(uniqueSubmission.slice(0, 4).map(s =>({
        name: s.problem.name,
        rating: s.problem.rating,
        tags: s.problem.tags
    })))
}

main();