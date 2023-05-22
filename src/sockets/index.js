import { io } from 'socket.io-client'
import { SOCKET_URL } from 'constants/envConstants'

function SocketConfig() {
	const socket = io(SOCKET_URL, {
		rejectUnauthorized: false,
		path: '/socket',
	})

	return socket
}

export default SocketConfig
