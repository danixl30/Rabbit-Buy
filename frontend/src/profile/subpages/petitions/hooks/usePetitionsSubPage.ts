import { useState, useEffect } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UserState } from '../../../../global-state/user/UserContext'
import { UsePetition } from '../../../../services/abstractions/petition/petition-service'
import { Petition } from '../../../../services/abstractions/petition/types/petition'

export const usePetitionsSubPage = (
    service: UsePetition,
    session: UseSession,
    state: UserState,
) => {
    const [term, setTerm] = useState('')
    const [petitions, setPetions] = useState<Petition[]>([])
    const [page, setPage] = useState(1)
    const [isTop, setIsTop] = useState(false)

    const onSubmit = (value: string) => setTerm(value)

    const onGetMore = () => setPage(page + 1)

    const getPetition = async () => {
        if (state.user?.role === 'PROVIDER') {
            try {
                const data = await service.getFranchise(
                    session.getSession()!!,
                    page,
                )
                if (data.length < 1) setIsTop(true)
                setPetions([...petitions, ...data])
            } catch (e) {
                console.log(e)
            }
            return
        }
        try {
            const data = await service.getClient(session.getSession()!!, page)
            if (data.length < 1) setIsTop(true)
            setPetions([...petitions, ...data])
        } catch (e) {
            console.log(e)
        }
    }

    const getPetitionByTerm = async () => {
        if (state.user?.role === 'PROVIDER') {
            try {
                const data = await service.getFranchiseTerm(
                    session.getSession()!!,
                    page,
                    term,
                )
                if (data.length < 1) setIsTop(true)
                setPetions([...petitions, ...data])
            } catch (e) {
                console.log(e)
            }
            return
        }
        try {
            const data = await service.getClientTerm(
                session.getSession()!!,
                page,
                term,
            )
            if (data.length < 1) setIsTop(true)
            setPetions([...petitions, ...data])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (page < 2) return
        if (!term) getPetition()
        else getPetitionByTerm()
    }, [page])

    useEffect(() => {
        setPage(1)
        setPetions([])
        if (!term) getPetition()
        else getPetitionByTerm()
    }, [term])

    useEffect(() => {
        if (!term) getPetition()
        else getPetitionByTerm()
    }, [])

    return {
        onGetMore,
        onSubmit,
        isTop,
        petitions,
    }
}
