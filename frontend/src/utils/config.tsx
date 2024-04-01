const config = {
    api: "https://massage-reserve-shop-api.vercel.app/api",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    }
}

export default config