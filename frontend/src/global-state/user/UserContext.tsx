import { createContext, useState, ReactNode } from 'react'
import { Optional } from '../../utils/types/optional'
import { User } from './types/user'

export type UserState = {
    user: Optional<User>
    putUser(user: User): void
}

export const UserContext = createContext<Optional<UserState>>(undefined)

export type UserStateProviderProps = {
    children: ReactNode | ReactNode[]
}

const userTest = {
    username: 'test1',
    email: 'test@mail.com',
    id: '1',
    role: 'PROVIDER',
}

export const UserStateProvider = (props: UserStateProviderProps) => {
    const [user, setUser] = useState<User>(userTest)

    const putUser = (user: User) => setUser(user)

    return (
        <UserContext.Provider
            value={{
                user,
                putUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
