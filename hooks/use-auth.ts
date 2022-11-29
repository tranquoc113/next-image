import { authApi } from '@/api'
import { LoginPayload } from '@/models'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export function useAuth(options?: Partial<PublicConfiguration>) {
	const {
		data: profile,
		error,
		mutate, // dùng để thay đổi data
	} = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000, // 1hr; bao nhiêu chỗ dùng để gọi api thì sau thời gian mới cho goi
		revalidateOnFocus: false,
		...options,
	})

	const firstLoading = profile === undefined && error === undefined

	async function login(payload: LoginPayload) {
		await authApi.login(payload)

		await mutate() // gọi lại api
	}

	async function logout() {
		await authApi.logout()
		mutate(null, false) // set null data và không gọi api
	}

	return {
		profile,
		error,
		login,
		logout,
		firstLoading,
	}
}