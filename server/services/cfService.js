//todo: add simple in-mem cache 

const cache = {};

async function getCFStats(handle){
    const cached =  cache[handle];

    if(cached && Date.now() < cached.expiresAt){
        console.log('Cache Hit: for', handle);
        return cached.data;

    }else{
        console.log('chache miss... fetching fresh data for', handle);
        const data = await fetchFromCF(handle);
        cache[handle] = {
            data,
            expiresAt: Date.now() + 10*60*1000
        }
        return data;
    }   
}

async function fetchFromCF(handle){

    const [response1, response2] = await Promise.all([
        fetch(`https://codeforces.com/api/user.status?handle=${handle}`),
        fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
    ]);

    const userSubmission = await response1.json();
    const userProfile = await response2.json();

    //todo: implement filter to result to only verdict === 'OK'
    const requiredSubmission = userSubmission.result.filter(s => s.verdict === 'OK');

    //todo: dedupe by problem.contestID + '-' + problem.index (use set or map)
    const uniqueResultMap = new Map(
        requiredSubmission.map(s => [`${s.problem.contestId} - ${s.problem.index}`, s])
    )
    

    //todo: log the count of unique solved problem and log just first 3 deduped problem (with rating and tags)
    const uniqueSubmissions = [...uniqueResultMap.values()];
    const profile = userProfile.result[0];

    const response = {
        username: profile.handle,
        rank: profile.rank || 'Unrated',
        rating: profile.rating || 0,
        problemSolved: uniqueSubmissions.length,
        problems: uniqueSubmissions.slice(0, 3).map(s => ({
            name: s.problem.name,
            rating: s.problem.rating,
            id: s.problem.contestId,
            index: s.problem.index,
            tags: s.problem.tags
        }))
    };

    return response;

    // fetch -> filter ok -> deduplicate -> count total number of problem solved -> log result

}


function logData(data) {
    console.log('');
    console.log('Username:', data.username);
    console.log('Rank:', data.rank);
    console.log('Rating:', data.rating);
    console.log('Unique solved count:', data.problemSolved);
    console.log('Problems:', data.problems);
}

async function run(handle){
    const data = await getCFStats(handle);
    logData(data);
}

module.exports = run;