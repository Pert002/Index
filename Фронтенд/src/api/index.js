import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:4444',
    headers: {
        'accept': 'application/json',
    },
});

let API


export function getApiInstance() {
   if (!API) {
       API = new Api()
   }

   return API
}

export class Api {
    constructor() {
        this.client = client
    }
    jointIndex(selectedYear, selectedQuarter) {
        return this.client.get(`/jointIndex/${selectedYear}/${selectedQuarter}`)
    }

    separateIndex(selectedYear, selectedQuarter) {
        return this.client.get(`/separateIndex/${selectedYear}/${selectedQuarter}`)
    }

    regionIndex(selectedYear, selectedQuarter, selectedRegion) {
        return this.client.get(`/regionIndex/${selectedYear}/${selectedQuarter}/${selectedRegion}`)
    }

    branchIndex(selectedYear, selectedQuarter, selectedBranch) {
        return this.client.get(`/branchIndex/${selectedYear}/${selectedQuarter}/${selectedBranch}`)
    }

    revenueIndex(selectedYear, selectedQuarter, selectedRevenue) {
        return this.client.get(`/revenueIndex/${selectedYear}/${selectedQuarter}/${selectedRevenue}`)
    }

    forumTopics(token) {
        return this.client.get(`/forum`, {
            headers: {
                'authorization': `${token}`
            }
        })
    }

    forumMessages(token, _id) {
        return this.client.get(`/forum/${_id}`, {
            headers: {
                'authorization': `${token}`
            }
        })
    }

    sendNewForum(token, title, author) {
        return this.client.post(`/forum`, {title, author}, {
            headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    sendNewMessage(token, id, message, author) {
        return this.client.post(`/forum/${id}`, {message, author}, {
            headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    deleteTopic(id, token) {
        return this.client.delete(`/forum/topic/${id}`, {
            headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    deleteMessage(id, token, message) {
        return this.client.delete(`/forum/${id}`, {
            headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                message: message
            }
        })
    }
}