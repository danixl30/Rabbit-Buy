import { useEffect, useState } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { UseFranchise } from '../../../../services/abstractions/franchise/franchise-service'
import { Franchise } from '../../../../services/abstractions/franchise/types/franchise'
import { FranchiseDetail } from '../../../../services/abstractions/franchise/types/franchise-detail'

export const useConsultFranchise = (
    service: UseFranchise,
    session: UseSession,
    toast: UseToast,
) => {
    const [selected, setSelected] = useState('')
    const [franchise, setFranchise] = useState<FranchiseDetail>()
    const [franchises, setFranchises] = useState<Franchise[]>([])
    const [loading, setLoading] = useState(false)

    const getFranchises = async () => {
        setLoading(true)
        try {
            const data = await service.getAll(session.getSession()!!)
            setFranchises(data)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
        setLoading(false)
    }

    const getFranchise = async () => {
        try {
            const data = await service.getDetail(
                session.getSession()!!,
                selected,
            )
            setFranchise(data)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
    }

    useEffect(() => {
        getFranchises()
    }, [])

    useEffect(() => {
        if (selected) {
            getFranchise()
        }
    }, [selected])

    const onClickFranchise = (e: Franchise) => setSelected(e.id)

    const onCloseDetail = () => setFranchise(undefined)

    return {
        franchises,
        franchise,
        onCloseDetail,
        onClickFranchise,
        loading,
    }
}
