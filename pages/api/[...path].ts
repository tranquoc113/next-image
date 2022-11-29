import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

// type Data = {
// 	name: string
// }

export const config = {
	api: {
		bodyParser: false, //đẩy lên server luôn đi, không muốn xem đâu
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise((resolve) => { // chờ xí nha client
		// convert cookies to header Authorization
		const cookies = new Cookies(req, res)
		const accessToken = cookies.get('access_token')
		if (accessToken) {
			req.headers.Authorization = `Bearer ${accessToken}`
		}

		// don't send cookies to API server
		req.headers.cookie = ''

		// /api/students
		// https://js-post-api.herokuapp.com/api/students

		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false,// trả về cho client luôn đi
		})

		proxy.once('proxyRes', () => {//lắng nghe server trả về
			resolve(true)
		})
	})
}