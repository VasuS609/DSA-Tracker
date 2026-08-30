async function main(){
    const response1 = await fetch("https://codeforces.com/api/user.status?handle=Vasu.609");    
    const response2 = await fetch("https://codeforces.com/api/user.info?handles=Vasu.609");
    
    const data1 = await response1.json();
    const data2 = await response2.json();

    console.log(data1, '\n');
    console.log(data2);
}

main();