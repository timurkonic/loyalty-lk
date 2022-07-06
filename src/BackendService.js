const backendService = async (method, path, options) => {
    const apiPath = 'http://172.31.1.50:15001/api/v2';
    const params = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(options.body)
    }

    const response = await fetch (apiPath + path, params);
    const responseBody = await response.json();
    if (!response.ok) {
        throw (responseBody);
    }
    return responseBody;
}

export default backendService;