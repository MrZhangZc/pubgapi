import request from 'request-promise'
import api from './config'

const pubgkey = api.apiKey

export default class pubgApi {
    constructor() {
        this.api_endpoint = "https://api.playbattlegrounds.com";
        this.api_key = pubgkey;
    }

    async request(options) {
        options = Object.assign({}, options, { json: true }, {
            headers: {
                "Accept": "application/vnd.api+json",
                "Authorization": `Bearer ${this.api_key}`
            }})

        try {
            const response = await request(options)
            return response
        } catch (error) {
            console.error(error)
        }
    }

    async getCurrentSeason(region) {
        const url = `${this.api_endpoint}/shards/${region}/seasons`
        return this.request({ url: url })
    }

    async getPlayersInfo(region,nickname) {
        const url = `${this.api_endpoint}/shards/${region}/players?filter[playerNames]=${nickname}`
        return this.request({ url: url })
    }

    async getPlayerbyId(region, id) {
        const url = `${this.api_endpoint}/shards/${region}/players/${id}`
        return this.request({ url: url })
    }

    async getPlayerStats(region, id) {
        const url = `${this.api_endpoint}/shards/${region}/players/${id}/seasons/division.bro.official.2018-06`
        return this.request({ url: url })
    }
}