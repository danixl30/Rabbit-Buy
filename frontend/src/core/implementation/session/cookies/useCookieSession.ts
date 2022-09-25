import { UseSession } from '../../../abstractions/session/session'
import Cookies from 'js-cookie'

const SESSION_KEY = 'session'
export const useCookieSession = (): UseSession => {
    const getSession = () => Cookies.get(SESSION_KEY)

    const createSession = (data: string) => {
        if (getSession()) throw new Error('Session already in use')
        Cookies.set(SESSION_KEY, data, {
            sameSite: 'strict',
        })
    }

    const deleteSession = () => Cookies.remove(SESSION_KEY)

    return {
        getSession,
        createSession,
        deleteSession,
    }
}
