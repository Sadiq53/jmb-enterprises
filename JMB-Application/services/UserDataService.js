const handleGetData = async() =>{
    const response = await fetch('https://jmb-server.onrender.com/admin/data', {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    let filteredData = await data?.filedata;
    return filteredData;
}

const handleGetUserData = async(id) =>{
    const response = await fetch(`https://jmb-server.onrender.com/admin/login/:${id}`, {
        method : "GET"
    })
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    // console.log(data)
    return data?.result
}

export {handleGetData, handleGetUserData}