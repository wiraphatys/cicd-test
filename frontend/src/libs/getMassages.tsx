async function getMassages({url} : {url: string}) {

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return await response.json()
}

export { getMassages }