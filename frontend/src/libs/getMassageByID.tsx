import config from "@/utils/config"

async function getMassageByID({ mid }: { mid: string }) {

    const response = await fetch(`${config.api}/massages/${mid}`)
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return await response.json()
}

export default getMassageByID