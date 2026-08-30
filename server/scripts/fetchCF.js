async function main(){
    const response1 = await fetch("https://codeforces.com/api/user.status?handle=Vasu.609");    
    // const response2 = await fetch("https://codeforces.com/api/user.info?handles=Vasu.609");
    const userSubmission = await response1.json();
    // const userProfile = await response2.json();

    //todo: implement filter to result to only verdict === 'OK'
    const requiredSubmission = userSubmission.result.filter(s => s.verdict === 'OK');

    //todo: dedupe by problem.contestID + '-' + prolem.index (use set or map)
    const uniqueResultMap = new Map(
        requiredSubmission.map(s => [`${s.problem.contestId} - ${s.problem.index}`, s])
    )
    

    //todo: log the count of unique solved problem and log just first 3 deduped problem (with rating and tags)
    const uniqueSubmissions = [...uniqueResultMap.values()];

    console.log('Unique solved count:', uniqueSubmissions.length);
    console.log(uniqueSubmissions.slice(0, 3).map(s =>({
        name: s.problem.name,
        rating: s.problem.rating,
        id: s.problem.contestId,
        index: s.problem.index,
        tags: s.problem.tags
    })))

    // fetch -> filter ok -> deduplicate -> count total number of problem solved -> log result

}

main();

