//todo: add simple in-mem cache 

const cache = [];

cache['test'] = {
    data:'hellow', 
    expiresAt: Date.now() + 3000
}

function checkCache(key){
    const cached = cache[key];

    if(cached && Date.now() < cached.expiresAt){
        console.log('Cache Hit: ', cached.data);
    }else{
        console.log('Oops... Cache miss, data not found!!');
    }
}

checkCache('test');

setTimeout(() => {
    checkCache('test');
}, 3000);


// cache[handle] = {
//     data: someStatsObject,
//     expirestAt: Date.now() + 10 * 60 * 1000
// };


// function getCfHandle(handle){
//     const cached = cache[handle];

//     if(cached && Date.now () < cache.expirestAt){
//         console.log('cache hit');
//         return cached.data;
//     }

//     console.log('cache miss, fetching fresh data');

//     main();
// }



// async function main(){
//     const response1 = await fetch("https://codeforces.com/api/user.status?handle=Vasu.609");    
//     const response2 = await fetch("https://codeforces.com/api/user.info?handles=Vasu.609");
//     const userSubmission = await response1.json();
//     const userProfile = await response2.json();

//     //todo: implement filter to result to only verdict === 'OK'
//     const requiredSubmission = userSubmission.result.filter(s => s.verdict === 'OK');

//     //todo: dedupe by problem.contestID + '-' + problem.index (use set or map)
//     const uniqueResultMap = new Map(
//         requiredSubmission.map(s => [`${s.problem.contestId} - ${s.problem.index}`, s])
//     )
    

//     //todo: log the count of unique solved problem and log just first 3 deduped problem (with rating and tags)
//     const uniqueSubmissions = [...uniqueResultMap.values()];
//     const profile = userProfile.result[0];

//     console.log('Username: ', profile.handle);
//     console.log('Rank: ', profile.rank || 'Unrated');
//     console.log('Rating', profile.rating || 0);
//     console.log('Unique solved count:', uniqueSubmissions.length);
//     console.log(uniqueSubmissions.slice(0, 3).map(s =>({
//         name: s.problem.name,
//         rating: s.problem.rating,
//         id: s.problem.contestId,
//         index: s.problem.index,
//         tags: s.problem.tags
//     })))

//     // fetch -> filter ok -> deduplicate -> count total number of problem solved -> log result

// }
